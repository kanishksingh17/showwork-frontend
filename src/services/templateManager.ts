import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface TemplateMetadata {
  id: string;
  name: string;
  previewUrl: string | null;
  roleTags: string[]; // jobRoles
  tags: string[];
  layoutJson: any; // Your JSON schema
  isPopular: boolean;
  category: string;
  industry: string[];
  downloads: number;
  rating: number;
  description?: string | null;
}

export class TemplateManager {
  /**
   * Get templates filtered by job role
   */
  async getTemplates(role?: string): Promise<TemplateMetadata[]> {
    const where: any = { isPublic: true };
    
    if (role) {
      where.roleTags = { has: role };
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: [
        { isPopular: 'desc' },
        { downloads: 'desc' },
        { rating: 'desc' }
      ],
      take: 50
    });

    return templates.map(t => ({
      id: t.id,
      name: t.name,
      previewUrl: t.previewUrl || null,
      roleTags: (t.roleTags as string[]) || [],
      tags: (t.tags as string[]) || [],
      layoutJson: t.layoutJson || t.config || {},
      isPopular: t.isPopular || false,
      category: t.category,
      industry: t.industry || [],
      downloads: t.downloads,
      rating: t.rating,
      description: t.description || null
    }));
  }

  /**
   * Get template by ID with full layout JSON
   */
  async getTemplateById(id: string): Promise<TemplateMetadata | null> {
    const template = await prisma.template.findUnique({
      where: { id }
    });

    if (!template) return null;

    return {
      id: template.id,
      name: template.name,
      previewUrl: template.previewUrl || null,
      roleTags: (template.roleTags as string[]) || [],
      tags: (template.tags as string[]) || [],
      layoutJson: template.layoutJson || template.config || {},
      isPopular: template.isPopular || false,
      category: template.category,
      industry: template.industry || [],
      downloads: template.downloads,
      rating: template.rating,
      description: template.description || null
    };
  }

  /**
   * Store new template
   */
  async createTemplate(
    metadata: Omit<TemplateMetadata, 'id' | 'downloads' | 'rating'>
  ): Promise<TemplateMetadata> {
    const template = await prisma.template.create({
      data: {
        name: metadata.name,
        previewUrl: metadata.previewUrl,
        roleTags: metadata.roleTags,
        tags: metadata.tags,
        layoutJson: metadata.layoutJson,
        isPopular: metadata.isPopular,
        category: metadata.category as any,
        industry: metadata.industry,
        description: metadata.description,
        isPublic: true,
        config: metadata.layoutJson // Store in both places for compatibility
      }
    });

    return {
      ...metadata,
      id: template.id,
      downloads: 0,
      rating: 0
    };
  }

  /**
   * Update template metadata
   */
  async updateTemplate(
    id: string,
    updates: Partial<Omit<TemplateMetadata, 'id' | 'downloads' | 'rating'>>
  ): Promise<TemplateMetadata | null> {
    const template = await prisma.template.update({
      where: { id },
      data: {
        ...(updates.name && { name: updates.name }),
        ...(updates.previewUrl !== undefined && { previewUrl: updates.previewUrl }),
        ...(updates.roleTags && { roleTags: updates.roleTags }),
        ...(updates.tags && { tags: updates.tags }),
        ...(updates.layoutJson && { 
          layoutJson: updates.layoutJson,
          config: updates.layoutJson // Keep in sync
        }),
        ...(updates.isPopular !== undefined && { isPopular: updates.isPopular }),
        ...(updates.description !== undefined && { description: updates.description })
      }
    });

    if (!template) return null;

    return {
      id: template.id,
      name: template.name,
      previewUrl: template.previewUrl || null,
      roleTags: (template.roleTags as string[]) || [],
      tags: (template.tags as string[]) || [],
      layoutJson: template.layoutJson || template.config || {},
      isPopular: template.isPopular || false,
      category: template.category,
      industry: template.industry || [],
      downloads: template.downloads,
      rating: template.rating,
      description: template.description || null
    };
  }
}

