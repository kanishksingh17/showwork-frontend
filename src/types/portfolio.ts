// Portfolio type definitions
export interface JobRole {
  id: string;
  title: string;
  industry: string;
  skills: string[];
  experienceLevel: "entry" | "mid" | "senior" | "lead";
  description: string;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  theme?: {
    primary: string;
    secondary: string;
    font: string;
    mode?: 'light' | 'dark';
  };
  // Legacy fields (make optional)
  jobRoles?: string[];
  industries?: string[];
  layout?: "modern" | "creative" | "professional" | "minimal";
  sections?: PortfolioSection[];
  preview?: string;
  isPopular?: boolean;

  // Template engine discriminator
  // 'section'  → AI-composed, uses sections[] array (future drag-and-drop builder)
  // 'external' → Standalone Next.js app, fetches its own data via previewUrl
  templateEngine?: 'section' | 'external';

  // New fields for file-based templates
  thumbnailUrl?: string;
  previewUrl?: string;
  framework?: string;
  type?: string;
  role?: string;
  tags?: string[];
  roleTags?: string[];
  industry?: string[];
  is3D?: boolean;
  hasAnimations?: boolean;
  suggested?: boolean;
  category?: string;
}

export interface PortfolioSection {
  id: string;
  type:
  | "header"
  | "hero"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "contact"
  | "resume"
  | "footer"
  | "testimonials";
  title: string;
  content: string;
  isRequired: boolean;
  isVisible: boolean;
  order: number;
  variant?: string;
  customData?: any;
}

export interface UserPortfolio {
  id: string;
  userId: string;
  templateId: string;
  jobRole?: JobRole;
  sections?: PortfolioSection[];
  customizations?: PortfolioCustomization;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  content?: any;
  theme?: any;
  deploymentUrl?: string;
}

export interface PortfolioCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    spacing: "compact" | "normal" | "spacious";
    alignment: "left" | "center" | "right";
  };
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform:
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "website"
  | "email";
  url: string;
  isAutoFetched: boolean;
  isVisible: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  type?: string;
  url: string;
  thumbnailUrl?: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
  showcase?: boolean;
  mediaFiles?: MediaFile[];
  teamMembers?: TeamMember[];
  relevanceScore: number; // AI-calculated relevance to job role
}

// AI-powered template recommendation
export interface AIRecommendation {
  templateId: string;
  confidence: number; // 0-1 confidence score
  reasons: string[]; // Why this template is recommended
  suggestedCustomizations: Partial<PortfolioCustomization>;
}
