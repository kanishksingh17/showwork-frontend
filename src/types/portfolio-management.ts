export interface ManagedPortfolio {
    id: string;
    name: string;
    templateId: string;
    templateName: string;
    status: 'active' | 'draft' | 'archived';
    isPrimary: boolean;
    lastModified: Date;
    publishedUrl?: string;
    linkedResumes: string[];
    thumbnail?: string;
}

export interface ResumeVersion {
    id: string;
    title: string;
    targetRole: string;
    industry: string;
    isCurrent: boolean;
    fileUrl?: string;
    linkedPortfolioId?: string;
    linkedApplicationId?: string; // Link resume to specific application
    createdAt: Date;
    updatedAt: Date;
    notes: string;
    atsScore?: number;
    targetJobCompany?: string;
    isGeneric?: boolean;
    criticalGaps?: string[];
    versionNumber?: string;
    improvementPercent?: number;
}

export interface TailoringSuggestion {
    type: 'keyword' | 'section' | 'skill';
    category: string;
    currentText?: string;
    suggestedText: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}

export interface TailoringResult {
    resumeId: string;
    applicationId: string;
    originalAtsScore: number;
    projectedAtsScore: number;
    suggestions: TailoringSuggestion[];
    missingKeywords: string[];
    createdAt: Date;
}

export interface ProjectTarget {
    id: string;
    companyName: string;
    position: string;
    status: 'preparing' | 'applied' | 'interview' | 'offer' | 'rejected';
    portfolioId?: string;
    resumeId?: string;
    applicationDate?: Date;
    deadline?: Date;
    notes: string;
    priority: 'low' | 'medium' | 'high';
}

export interface CareerGoal {
    id: string;
    title: string;
    description: string;
    targetDate: Date;
    progress: number; // 0-100
    completed: boolean;
    milestones: string[];
    category: 'skill' | 'application' | 'networking' | 'other';
}

export interface PortfolioManagementData {
    portfolios: ManagedPortfolio[];
    resumes: ResumeVersion[];
    targets: ProjectTarget[];
    goals: CareerGoal[];
}
