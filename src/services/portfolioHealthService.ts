/**
 * Portfolio Health Scoring Service
 * FAANG-calibrated portfolio health assessment with GitHub integration and AI analysis
 */

import { githubAnalyticsService, GitHubRepoStats } from "./githubAnalyticsService";
import { aiAnalysisService, AIScore, ImpactMetrics } from "./aiAnalysisService";
import { safeLogger } from "@/utils/redaction";
import crypto from "crypto";

// Scoring version - increment on algorithm changes
export const SCORING_VERSION = "2025.11.faang.v1";

export interface PortfolioHealthScore {
  scoringVersion: string;
  overall: number;
  status: "Excellent" | "Good" | "Fair" | "Needs Work";
  breakdown: {
    technicalSkills: number;
    projectQuality: number;
    portfolioPresentation: number;
    experience: number;
    industryAlignment: number;
    certifications: number;
  };
  recommendedImprovements: string[];
  lastComputedAt: string;
  sources: {
    github: boolean;
    ai: boolean;
    cacheHit: boolean;
  };
  explanations?: Record<string, {
    score: number;
    evidence: string[];
    reasoning: string;
  }>;
}

export interface PortfolioData {
  id: string;
  name: string;
  description?: string;
  isPublished: boolean;
  templateId?: string;
  config?: any;
  projects: ProjectData[];
  user?: {
    bio?: string;
    avatar?: string;
    experience?: number; // years of experience
    certifications?: string[];
  };
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  tags: string[];
  domain?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

class PortfolioHealthService {
  private readonly WEIGHTS = {
    technicalSkills: 0.2,
    projectQuality: 0.25,
    portfolioPresentation: 0.15,
    experience: 0.15,
    industryAlignment: 0.15,
    certifications: 0.1,
  };

  // Cache for GitHub stats and AI analysis (24 hour TTL)
  private githubStatsCache = new Map<string, { data: GitHubRepoStats | null; timestamp: number; etag?: string }>();
  private aiAnalysisCache = new Map<string, { data: AIScore; timestamp: number }>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Generate deterministic cache key for portfolio
   */
  private generateCacheKey(
    userId: string,
    githubUrls: string[],
    profileUpdatedAt: string,
  ): string {
    const hashInput = `${userId}:${githubUrls.sort().join(",")}:${profileUpdatedAt}`;
    const hash = crypto.createHash("sha256").update(hashInput).digest("hex").substring(0, 16);
    return `portfolio:${userId}:v${SCORING_VERSION}:${hash}`;
  }

  /**
   * Decay function for recency (smooth vs binary)
   */
  private calculateRecencyDecay(daysSinceUpdate: number): number {
    // Exponential decay: exp(-days/180)
    // Returns 1.0 for recent, ~0.37 at 180 days, ~0.14 at 360 days
    return Math.exp(-daysSinceUpdate / 180);
  }

  /**
   * Normalize and clamp score to 0-100
   */
  private normalizeScore(score: number): number {
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Main method to compute portfolio health score with FAANG-grade enhancements
   */
  async computePortfolioHealth(
    portfolio: PortfolioData,
    githubAccessToken?: string,
  ): Promise<PortfolioHealthScore> {
    const startTime = Date.now();

    try {
      const projects = portfolio.projects || [];

      // Gather enhanced data from GitHub and AI
      const enhancedData = await this.gatherPortfolioData(
        portfolio,
        projects,
        githubAccessToken,
      );

      // Calculate individual component scores with enhanced metrics
      const scores = {
        technicalSkills: await this.evaluateTechnicalSkillsEnhanced(
          portfolio,
          projects,
          enhancedData,
        ),
        projectQuality: await this.evaluateProjectQualityEnhanced(
          projects,
          enhancedData,
        ),
        portfolioPresentation: this.evaluatePresentationEnhanced(
          portfolio,
          projects,
        ),
        experience: await this.evaluateExperienceEnhanced(
          portfolio,
          projects,
          enhancedData,
        ),
        industryAlignment: this.evaluateIndustryAlignmentEnhanced(
          portfolio,
          projects,
          enhancedData,
        ),
        certifications: this.evaluateCertifications(portfolio),
      };

      // Normalize all scores before weighting
      const normalizedScores = {
        technicalSkills: this.normalizeScore(scores.technicalSkills),
        projectQuality: this.normalizeScore(scores.projectQuality),
        portfolioPresentation: this.normalizeScore(scores.portfolioPresentation),
        experience: this.normalizeScore(scores.experience),
        industryAlignment: this.normalizeScore(scores.industryAlignment),
        certifications: this.normalizeScore(scores.certifications),
      };

      // Calculate weighted overall score
      const overall = this.calculateOverallScore(normalizedScores);

      // Generate AI-powered recommendations (with fallback)
      let recommendedImprovements: string[] = [];
      let aiUsed = false;
      try {
        recommendedImprovements = await aiAnalysisService.generateRecommendations(normalizedScores);
        aiUsed = true;
      } catch (error) {
        safeLogger.warn("AI recommendation generation failed, using fallback", error);
        recommendedImprovements = this.buildRecommendations(normalizedScores, portfolio, projects);
      }

      // Determine status
      const status = this.getStatusFromScore(overall);

      // Track data sources
      const githubUrls = projects.map((p) => p.githubUrl).filter(Boolean) as string[];
      const sources = {
        github: enhancedData.githubStats.size > 0,
        ai: aiUsed && enhancedData.aiScores.size > 0,
        cacheHit: false, // Will be set by caller if using cached data
      };

      const result: PortfolioHealthScore = {
        scoringVersion: SCORING_VERSION,
        overall: this.normalizeScore(overall),
        status,
        breakdown: normalizedScores,
        recommendedImprovements,
        lastComputedAt: new Date().toISOString(),
        sources,
      };

      const duration = Date.now() - startTime;
      safeLogger.log(
        `Portfolio health computed in ${duration}ms for portfolio ${portfolio.id}: ${overall}/100 (v${SCORING_VERSION})`,
      );

      return result;
    } catch (error) {
      console.error("Error computing portfolio health:", error);
      throw new Error("Failed to compute portfolio health");
    }
  }

  /**
   * Gather enhanced data from GitHub and AI analysis
   */
  private async gatherPortfolioData(
    portfolio: PortfolioData,
    projects: ProjectData[],
    githubAccessToken?: string,
  ): Promise<{
    githubStats: Map<string, GitHubRepoStats | null>;
    aiScores: Map<string, AIScore>;
    impactMetrics: Map<string, ImpactMetrics>;
  }> {
    const githubStats = new Map<string, GitHubRepoStats | null>();
    const aiScores = new Map<string, AIScore>();
    const impactMetrics = new Map<string, ImpactMetrics>();

    // Process projects in parallel (with rate limiting consideration)
    const projectPromises = projects.map(async (project) => {
      const projectId = project.id;

      // Fetch GitHub stats if GitHub URL exists
      if (project.githubUrl) {
        const cacheKey = `github_${projectId}`;
        const cached = this.githubStatsCache.get(cacheKey);
        const now = Date.now();

        if (cached && now - cached.timestamp < this.CACHE_TTL) {
          githubStats.set(projectId, cached.data);
        } else {
          const githubInfo = githubAnalyticsService.extractGitHubInfo(project.githubUrl);
          if (githubInfo) {
            const stats = await githubAnalyticsService.getRepoStats(
              githubInfo.owner,
              githubInfo.repo,
              githubAccessToken,
            );
            githubStats.set(projectId, stats);
            this.githubStatsCache.set(cacheKey, { data: stats, timestamp: now });
          }
        }
      }

      // Analyze description with AI
      const aiCacheKey = `ai_${projectId}`;
      const aiCached = this.aiAnalysisCache.get(aiCacheKey);
      const now = Date.now();

      if (aiCached && now - aiCached.timestamp < this.CACHE_TTL) {
        aiScores.set(projectId, aiCached.data);
      } else {
        const aiScore = await aiAnalysisService.analyzeProjectDescription(
          project.description,
          project.name,
        );
        aiScores.set(projectId, aiScore);
        this.aiAnalysisCache.set(aiCacheKey, { data: aiScore, timestamp: now });
      }

      // Extract impact metrics
      const impact = aiAnalysisService.extractImpactMetrics(project.description);
      impactMetrics.set(projectId, impact);
    });

    await Promise.allSettled(projectPromises);

    return { githubStats, aiScores, impactMetrics };
  }

  /**
   * Evaluate technical skills with FAANG-grade enhancements
   */
  private async evaluateTechnicalSkillsEnhanced(
    portfolio: PortfolioData,
    projects: ProjectData[],
    enhancedData: {
      githubStats: Map<string, GitHubRepoStats | null>;
      aiScores: Map<string, AIScore>;
      impactMetrics: Map<string, ImpactMetrics>;
    },
  ): Promise<number> {
    if (projects.length === 0) return 0;

    // Calculate code quality score from GitHub (40% weight)
    const codeQualityScores: number[] = [];
    projects.forEach((project) => {
      const githubStats = enhancedData.githubStats.get(project.id);
      if (githubStats) {
        const qualityScore = githubAnalyticsService.calculateCodeQualityScore(githubStats);
        codeQualityScores.push(qualityScore);
      }
    });
    const avgCodeQuality = codeQualityScores.length > 0
      ? codeQualityScores.reduce((sum, score) => sum + score, 0) / codeQualityScores.length
      : 0;

    // Technology diversity score (20% weight)
    const allTechnologies = projects.flatMap((p) => p.technologies);
    const uniqueTechnologies = new Set(allTechnologies);
    const techDiversityScore = Math.min(uniqueTechnologies.size * 5, 100);

    // Project complexity score (20% weight)
    const complexityScores: number[] = [];
    projects.forEach((project) => {
      const githubStats = enhancedData.githubStats.get(project.id);
      if (githubStats) {
        const complexityScore = githubAnalyticsService.calculateComplexityScore(githubStats);
        complexityScores.push(complexityScore);
      }
    });
    const avgComplexity = complexityScores.length > 0
      ? complexityScores.reduce((sum, score) => sum + score, 0) / complexityScores.length
      : 0;

    // Architecture documentation score (20% weight)
    const architectureScores: number[] = [];
    projects.forEach((project) => {
      const aiScore = enhancedData.aiScores.get(project.id);
      if (aiScore) {
        architectureScores.push(aiScore.architectureThinking);
      }
    });
    const avgArchitecture = architectureScores.length > 0
      ? architectureScores.reduce((sum, score) => sum + score, 0) / architectureScores.length
      : 0;

    // Calculate weighted technical skills score
    const technicalSkills = Math.round(
      avgCodeQuality * 0.4 +
      techDiversityScore * 0.2 +
      avgComplexity * 0.2 +
      avgArchitecture * 0.2,
    );

    return Math.min(technicalSkills, 100);
  }

  /**
   * Legacy method - kept for backward compatibility
   */
  private evaluateTechnicalSkills(
    portfolio: PortfolioData,
    projects: ProjectData[],
  ): number {
    if (projects.length === 0) return 0;

    const allTechnologies = projects.flatMap((p) => p.technologies);
    const uniqueTechnologies = new Set(allTechnologies);

    // Base score from technology diversity
    let score = Math.min(uniqueTechnologies.size * 5, 40); // Max 40 points for diversity

    // Bonus for full-stack indicators
    const hasFrontend = allTechnologies.some((tech) =>
      [
        "react",
        "vue",
        "angular",
        "javascript",
        "typescript",
        "html",
        "css",
      ].includes(tech.toLowerCase()),
    );
    const hasBackend = allTechnologies.some((tech) =>
      ["node", "express", "python", "java", "c#", "php", "ruby", "go"].includes(
        tech.toLowerCase(),
      ),
    );
    const hasDatabase = allTechnologies.some((tech) =>
      ["mysql", "postgresql", "mongodb", "redis", "sqlite"].includes(
        tech.toLowerCase(),
      ),
    );

    if (hasFrontend && hasBackend) score += 20; // Full-stack bonus
    if (hasDatabase) score += 10; // Database knowledge
    if (hasFrontend) score += 10; // Frontend skills
    if (hasBackend) score += 10; // Backend skills

    // Bonus for modern/advanced technologies
    const modernTechs = [
      "typescript",
      "docker",
      "kubernetes",
      "graphql",
      "microservices",
    ];
    const modernCount = allTechnologies.filter((tech) =>
      modernTechs.includes(tech.toLowerCase()),
    ).length;
    score += Math.min(modernCount * 5, 20); // Max 20 points for modern techs

    return Math.min(Math.round(score), 100);
  }

  /**
   * Evaluate project quality with FAANG-grade enhancements
   */
  private async evaluateProjectQualityEnhanced(
    projects: ProjectData[],
    enhancedData: {
      githubStats: Map<string, GitHubRepoStats | null>;
      aiScores: Map<string, AIScore>;
      impactMetrics: Map<string, ImpactMetrics>;
    },
  ): Promise<number> {
    if (projects.length === 0) return 0;

    const qualityScores = projects.map((project) => {
      const aiScore = enhancedData.aiScores.get(project.id);
      const impactMetrics = enhancedData.impactMetrics.get(project.id);
      const githubStats = enhancedData.githubStats.get(project.id);

      // Description quality (20% weight) - from AI analysis
      const descriptionQuality = aiScore?.descriptionQuality || 0;

      // Media presence (10% weight)
      const mediaPresence = project.imageUrl ? 100 : 0;

      // Live demo validity (10% weight) - check if URL exists
      const liveDemoValidity = project.liveUrl ? 100 : 0;

      // GitHub link (10% weight)
      const githubLink = project.githubUrl ? 100 : 0;

      // Technology tags (10% weight)
      const technologyTags = Math.min(project.technologies.length * 10, 100);

      // Quantified impact (20% weight) - from AI extraction
      const quantifiedImpact = impactMetrics?.impactScore || 0;

      // Recency bonus (10% weight) - using decay function
      const daysSinceUpdate =
        (Date.now() - new Date(project.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      const recencyDecay = this.calculateRecencyDecay(daysSinceUpdate);
      const recencyBonus = Math.round(recencyDecay * 100);

      // Test coverage presence (10% weight)
      const testCoveragePresence = githubStats?.hasTests ? 100 : 0;

      // Calculate weighted project quality
      const projectQuality = Math.round(
        descriptionQuality * 0.2 +
        mediaPresence * 0.1 +
        liveDemoValidity * 0.1 +
        githubLink * 0.1 +
        technologyTags * 0.1 +
        quantifiedImpact * 0.2 +
        recencyBonus * 0.1 +
        testCoveragePresence * 0.1,
      );

      return Math.min(projectQuality, 100);
    });

    // Return average quality score
    return Math.round(
      qualityScores.reduce((sum, score) => sum + score, 0) /
        qualityScores.length,
    );
  }

  /**
   * Legacy method - kept for backward compatibility
   */
  private evaluateProjectQuality(projects: ProjectData[]): number {
    if (projects.length === 0) return 0;

    const qualityScores = projects.map((project) => {
      let score = 0;

      // Description quality (0-20 points)
      const descLength = project.description.length;
      if (descLength > 200) score += 20;
      else if (descLength > 100) score += 15;
      else if (descLength > 50) score += 10;

      // Media presence (0-20 points)
      if (project.imageUrl) score += 20;

      // Live demo (0-20 points)
      if (project.liveUrl) score += 20;

      // GitHub link (0-15 points)
      if (project.githubUrl) score += 15;

      // Technology tags (0-15 points)
      score += Math.min(project.technologies.length * 3, 15);

      // Recency bonus (0-10 points)
      const daysSinceUpdate =
        (Date.now() - new Date(project.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSinceUpdate < 30) score += 10;
      else if (daysSinceUpdate < 90) score += 5;

      return Math.min(score, 100);
    });

    // Return average quality score
    return Math.round(
      qualityScores.reduce((sum, score) => sum + score, 0) /
        qualityScores.length,
    );
  }

  /**
   * Evaluate portfolio presentation with consistency check
   */
  private evaluatePresentationEnhanced(
    portfolio: PortfolioData,
    projects: ProjectData[],
  ): number {
    // Completeness score (40% weight)
    let completenessScore = 0;
    if (portfolio.name) completenessScore += 10;
    if (portfolio.description && portfolio.description.length > 50) completenessScore += 20;
    if (portfolio.templateId) completenessScore += 20;
    if (portfolio.isPublished) completenessScore += 30;
    if (portfolio.user) {
      if (portfolio.user.bio && portfolio.user.bio.length > 50) completenessScore += 10;
      if (portfolio.user.avatar) completenessScore += 10;
    }

    // Consistency across projects (30% weight)
    let consistencyScore = 0;
    if (projects.length > 0) {
      const projectsWithImages = projects.filter((p) => p.imageUrl).length;
      const projectsWithDescriptions = projects.filter((p) => p.description.length > 100).length;
      const projectsWithGithub = projects.filter((p) => p.githubUrl).length;
      const projectsWithLive = projects.filter((p) => p.liveUrl).length;

      const imageConsistency = (projectsWithImages / projects.length) * 100;
      const descConsistency = (projectsWithDescriptions / projects.length) * 100;
      const githubConsistency = (projectsWithGithub / projects.length) * 100;
      const liveConsistency = (projectsWithLive / projects.length) * 100;

      consistencyScore = Math.round(
        (imageConsistency + descConsistency + githubConsistency + liveConsistency) / 4,
      );
    }

    // Published status (30% weight)
    const publishedStatus = portfolio.isPublished ? 100 : 0;

    // Calculate weighted presentation score
    const presentationScore = Math.round(
      completenessScore * 0.4 +
      consistencyScore * 0.3 +
      publishedStatus * 0.3,
    );

    return Math.min(presentationScore, 100);
  }

  /**
   * Legacy method - kept for backward compatibility
   */
  private evaluatePresentation(portfolio: PortfolioData): number {
    let score = 0;

    // Basic info (0-30 points)
    if (portfolio.name) score += 10;
    if (portfolio.description && portfolio.description.length > 50) score += 20;

    // Template selection (0-20 points)
    if (portfolio.templateId) score += 20;

    // Published status (0-30 points)
    if (portfolio.isPublished) score += 30;

    // User profile completeness (0-20 points)
    if (portfolio.user) {
      if (portfolio.user.bio && portfolio.user.bio.length > 50) score += 10;
      if (portfolio.user.avatar) score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Evaluate experience with GitHub contribution activity
   */
  private async evaluateExperienceEnhanced(
    portfolio: PortfolioData,
    projects: ProjectData[],
    enhancedData: {
      githubStats: Map<string, GitHubRepoStats | null>;
      aiScores: Map<string, AIScore>;
      impactMetrics: Map<string, ImpactMetrics>;
    },
  ): Promise<number> {
    // Project count score (30% weight)
    const projectCount = projects.length;
    let projectCountScore = 0;
    if (projectCount >= 5) projectCountScore = 100;
    else if (projectCount >= 3) projectCountScore = 75;
    else if (projectCount >= 1) projectCountScore = 50;

    // Years of experience score (30% weight)
    let yearsExperienceScore = 0;
    if (portfolio.user?.experience) {
      const years = portfolio.user.experience;
      if (years >= 5) yearsExperienceScore = 100;
      else if (years >= 3) yearsExperienceScore = 70;
      else if (years >= 1) yearsExperienceScore = 40;
    }

    // Project diversity score (20% weight)
    const domains = new Set(projects.map((p) => p.domain).filter(Boolean));
    let projectDiversityScore = 0;
    if (domains.size >= 3) projectDiversityScore = 100;
    else if (domains.size >= 2) projectDiversityScore = 70;
    else if (domains.size >= 1) projectDiversityScore = 40;

    // Contribution activity score (20% weight) - from GitHub
    let contributionActivityScore = 0;
    let totalCommits = 0;
    let activeRepos = 0;
    enhancedData.githubStats.forEach((stats) => {
      if (stats) {
        totalCommits += stats.commits || 0;
        if (stats.commits > 0) activeRepos++;
      }
    });

    if (totalCommits > 100) contributionActivityScore = 100;
    else if (totalCommits > 50) contributionActivityScore = 75;
    else if (totalCommits > 20) contributionActivityScore = 50;
    else if (totalCommits > 0) contributionActivityScore = 30;

    // Calculate weighted experience score
    const experienceScore = Math.round(
      projectCountScore * 0.3 +
      yearsExperienceScore * 0.3 +
      projectDiversityScore * 0.2 +
      contributionActivityScore * 0.2,
    );

    return Math.min(experienceScore, 100);
  }

  /**
   * Legacy method - kept for backward compatibility
   */
  private evaluateExperience(
    portfolio: PortfolioData,
    projects: ProjectData[],
  ): number {
    let score = 0;

    // Project count (0-40 points)
    const projectCount = projects.length;
    if (projectCount >= 5) score += 40;
    else if (projectCount >= 3) score += 30;
    else if (projectCount >= 1) score += 20;

    // Explicit experience years (0-30 points)
    if (portfolio.user?.experience) {
      const years = portfolio.user.experience;
      if (years >= 5) score += 30;
      else if (years >= 3) score += 20;
      else if (years >= 1) score += 10;
    }

    // Project diversity (0-30 points)
    const domains = new Set(projects.map((p) => p.domain).filter(Boolean));
    if (domains.size >= 3) score += 30;
    else if (domains.size >= 2) score += 20;
    else if (domains.size >= 1) score += 10;

    return Math.min(score, 100);
  }

  /**
   * Evaluate industry alignment with FAANG-level role fit
   */
  private evaluateIndustryAlignmentEnhanced(
    portfolio: PortfolioData,
    projects: ProjectData[],
    enhancedData: {
      githubStats: Map<string, GitHubRepoStats | null>;
      aiScores: Map<string, AIScore>;
      impactMetrics: Map<string, ImpactMetrics>;
    },
  ): number {
    if (projects.length === 0) return 0;

    // Domain consistency (40% weight)
    const domains = projects.map((p) => p.domain).filter(Boolean);
    let domainConsistency = 50; // Neutral if no domains
    if (domains.length > 0) {
      const domainCounts: Record<string, number> = {};
      domains.forEach((domain) => {
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      });
      const maxDomainCount = Math.max(...Object.values(domainCounts));
      domainConsistency = Math.round((maxDomainCount / domains.length) * 100);
    }

    // Tech stack role fit (30% weight) - check for FAANG-relevant techs
    const allTechnologies = projects.flatMap((p) => p.technologies);
    const faangTechs = [
      "react",
      "typescript",
      "python",
      "java",
      "go",
      "kubernetes",
      "docker",
      "aws",
      "gcp",
      "azure",
      "graphql",
      "microservices",
      "distributed systems",
    ];
    const faangTechCount = allTechnologies.filter((tech) =>
      faangTechs.includes(tech.toLowerCase()),
    ).length;
    const techStackRoleFit = Math.min((faangTechCount / projects.length) * 30, 100);

    // AI innovation presence (20% weight)
    let aiInnovationPresence = 0;
    enhancedData.aiScores.forEach((aiScore) => {
      if (aiScore.technicalDepth > 70) aiInnovationPresence += 20;
    });
    aiInnovationPresence = Math.min(aiInnovationPresence, 100);

    // Scalability thinking (10% weight)
    let scalabilityThinking = 0;
    enhancedData.aiScores.forEach((aiScore) => {
      if (aiScore.architectureThinking > 60) scalabilityThinking += 25;
    });
    scalabilityThinking = Math.min(scalabilityThinking, 100);

    // Calculate weighted industry alignment score
    const industryAlignment = Math.round(
      domainConsistency * 0.4 +
      techStackRoleFit * 0.3 +
      aiInnovationPresence * 0.2 +
      scalabilityThinking * 0.1,
    );

    return Math.min(industryAlignment, 100);
  }

  /**
   * Legacy method - kept for backward compatibility
   */
  private evaluateIndustryAlignment(
    portfolio: PortfolioData,
    projects: ProjectData[],
  ): number {
    if (projects.length === 0) return 0;

    // For now, give bonus for domain consistency
    const domains = projects.map((p) => p.domain).filter(Boolean);
    if (domains.length === 0) return 50; // Neutral if no domains

    // Check for domain consistency
    const domainCounts: Record<string, number> = {};
    domains.forEach((domain) => {
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });

    const maxDomainCount = Math.max(...Object.values(domainCounts));
    const consistency = maxDomainCount / domains.length;

    // Score based on consistency (0-100)
    return Math.round(consistency * 100);
  }

  /**
   * Evaluate certifications
   */
  private evaluateCertifications(portfolio: PortfolioData): number {
    const certifications = portfolio.user?.certifications || [];

    if (certifications.length === 0) return 0;

    // Base score from certification count
    let score = Math.min(certifications.length * 20, 60);

    // Bonus for relevant certifications
    const relevantCerts = certifications.filter(
      (cert) =>
        cert.toLowerCase().includes("aws") ||
        cert.toLowerCase().includes("azure") ||
        cert.toLowerCase().includes("google") ||
        cert.toLowerCase().includes("microsoft") ||
        cert.toLowerCase().includes("react") ||
        cert.toLowerCase().includes("node"),
    );

    score += Math.min(relevantCerts.length * 10, 40);

    return Math.min(score, 100);
  }

  /**
   * Calculate overall weighted score
   */
  private calculateOverallScore(
    scores: PortfolioHealthScore["breakdown"],
  ): number {
    let weightedSum = 0;
    let totalWeight = 0;

    Object.entries(scores).forEach(([key, score]) => {
      const weight = this.WEIGHTS[key as keyof typeof this.WEIGHTS];
      weightedSum += score * weight;
      totalWeight += weight;
    });

    return Math.round(weightedSum / totalWeight);
  }

  /**
   * Generate improvement recommendations (now handled by AI service)
   * Legacy method kept for backward compatibility
   */
  private buildRecommendations(
    scores: PortfolioHealthScore["breakdown"],
    portfolio: PortfolioData,
    projects: ProjectData[],
  ): string[] {
    const recommendations: string[] = [];

    if (scores.technicalSkills < 60) {
      recommendations.push("Add more diverse technologies to your projects");
      recommendations.push("Include both frontend and backend technologies");
    }

    if (scores.projectQuality < 60) {
      recommendations.push("Add detailed descriptions to your projects");
      recommendations.push("Include live demos and GitHub links");
      recommendations.push("Add screenshots or images to showcase your work");
    }

    if (scores.portfolioPresentation < 60) {
      recommendations.push("Complete your portfolio description");
      recommendations.push("Choose a professional template");
      recommendations.push("Publish your portfolio to make it visible");
    }

    if (scores.experience < 60) {
      recommendations.push("Add more projects to showcase your experience");
      recommendations.push("Include projects from different domains");
    }

    if (scores.industryAlignment < 60) {
      recommendations.push("Focus on projects within your target industry");
      recommendations.push(
        "Ensure project domains align with your career goals",
      );
    }

    if (scores.certifications < 40) {
      recommendations.push("Consider earning relevant certifications");
      recommendations.push("Add any existing certifications to your profile");
    }

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  /**
   * Get status label from score
   */
  private getStatusFromScore(score: number): PortfolioHealthScore["status"] {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Work";
  }
}

export const portfolioHealthService = new PortfolioHealthService();
