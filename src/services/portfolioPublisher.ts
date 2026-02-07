import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PortfolioPublisher {
  /**
   * Publish portfolio at showwork.app/username or /u/<id>
   */
  async publishPortfolio(portfolioId: string, userId: string): Promise<any> {
    const portfolio = await prisma.portfolio.update({
      where: { id: portfolioId, userId },
      data: {
        isPublished: true,
        isPublic: true,
        url: await this.generateUrl(userId, portfolioId),
        lastUpdated: new Date()
      }
    });

    // Optional: Trigger static site generation via Vercel webhook
    await this.triggerDeployment(portfolioId);

    return portfolio;
  }

  /**
   * Unpublish portfolio
   */
  async unpublishPortfolio(portfolioId: string, userId: string): Promise<any> {
    return await prisma.portfolio.update({
      where: { id: portfolioId, userId },
      data: {
        isPublished: false,
        lastUpdated: new Date()
      }
    });
  }

  /**
   * Save portfolio version for history
   */
  async saveVersion(portfolioId: string, userId: string): Promise<any> {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId, userId }
    });

    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    // Create new version
    const newVersion = await prisma.portfolio.create({
      data: {
        userId: portfolio.userId,
        name: portfolio.name,
        description: portfolio.description,
        url: `${portfolio.url}-v${portfolio.version + 1}`,
        templateId: portfolio.templateId,
        config: portfolio.config,
        customData: portfolio.customData,
        version: portfolio.version + 1,
        parentVersionId: portfolio.id,
        isPublic: false,
        isPublished: false
      }
    });

    // Update parent portfolio version number
    await prisma.portfolio.update({
      where: { id: portfolioId },
      data: { version: portfolio.version + 1 }
    });

    return newVersion;
  }

  private async generateUrl(userId: string, portfolioId: string): Promise<string> {
    // Get username from user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    });

    // Generate URL: /portfolio/username or /u/portfolioId
    if (user?.email) {
      const username = user.email.split('@')[0];
      return `/portfolio/${username}`;
    }

    return `/portfolio/${portfolioId}`;
  }

  private async triggerDeployment(portfolioId: string): Promise<void> {
    // Call Vercel deployment webhook if configured
    if (process.env.VERCEL_DEPLOY_HOOK) {
      try {
        await fetch(process.env.VERCEL_DEPLOY_HOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ portfolioId })
        });
      } catch (error) {
        console.warn('Failed to trigger deployment:', error);
        // Don't throw - deployment is optional
      }
    }
  }

  /**
   * Get published portfolio by URL
   */
  async getPublishedPortfolio(url: string): Promise<any | null> {
    return await prisma.portfolio.findFirst({
      where: {
        url,
        isPublished: true,
        isPublic: true
      },
      include: {
        template: true,
        projects: {
          where: { visibility: 'PUBLIC' },
          orderBy: { order: 'asc' }
        }
      }
    });
  }
}

