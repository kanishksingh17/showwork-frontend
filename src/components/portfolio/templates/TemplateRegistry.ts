/**
 * Portfolio Template Registry
 * Defines available templates and their section configurations
 */

export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    sections: {
        header: string;     // e.g., 'Header01', 'Header02', 'Header03'
        about: string;      // e.g., 'Hero01', 'Hero02'
        skills: string;     // e.g., 'Skills01'
        certifications?: string;
        projects: string;
        footer: string;
    };
}

export const TEMPLATE_REGISTRY: TemplateConfig[] = [
    {
        id: 'modern-dev',
        name: 'Modern Developer',
        description: 'Clean, professional template with centered header and gradient accents',
        sections: {
            header: 'Header01',
            about: 'Hero01',
            skills: 'Skills01',
            certifications: 'Cert01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'minimal-pro',
        name: 'Minimal Professional',
        description: 'Minimalist design with pill-style navigation',
        sections: {
            header: 'Header02',
            about: 'Hero02',
            skills: 'Skills01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'gradient-hero',
        name: 'Gradient Hero',
        description: 'Bold gradient header with full-width design',
        sections: {
            header: 'Header03',
            about: 'Hero01',
            skills: 'Skills01',
            certifications: 'Cert01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
];

/**
 * Get a template configuration by ID
 */
export function getTemplate(id: string): TemplateConfig | undefined {
    return TEMPLATE_REGISTRY.find(t => t.id === id);
}

/**
 * Get all available templates
 */
export function getAllTemplates(): TemplateConfig[] {
    return TEMPLATE_REGISTRY;
}
