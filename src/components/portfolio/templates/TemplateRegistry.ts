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
        id: 'recommended-fullstack',
        name: 'Full-Stack Developer',
        description: 'Modern, clean portfolio with a focus on activities and blogs',
        sections: {
            header: 'Header01',
            about: 'Hero01',
            skills: 'Skills01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'modern-minimalist',
        name: 'Modern Minimalist',
        description: 'Clean, playful design with photo stacks and toolbox',
        sections: {
            header: 'Header02',
            about: 'Hero02',
            skills: 'Skills01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'api-engineer',
        name: 'API First',
        description: 'Technical, high-performance design for backend and API engineers',
        sections: {
            header: 'Header01',
            about: 'Hero01',
            skills: 'Skills01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'microservices-architect',
        name: 'Microservices Architect',
        description: 'Premium, cinematic design for expert systems architects with video integration.',
        sections: {
            header: 'Header01',
            about: 'Hero01',
            skills: 'Skills01',
            projects: 'Projects01',
            footer: 'Footer01',
        },
    },
    {
        id: 'cloud-architect',
        name: 'Cloud Architect',
        description: 'High-fidelity Stitch layout with iridescent accents and monochrome display typography.',
        sections: {
            header: 'HeaderMain',
            about: 'HeroMain',
            skills: 'SkillsMain',
            projects: 'ProjectsMain',
            footer: 'FooterMain',
        },
    },
    {
        id: 'infra-architect',
        name: 'DevOps Portfolio',
        description: 'High-consequence DevOps design with 3D stack animations, automated pipelines, and cloud schematic visualizations.',
        sections: {
            header: 'HeaderDevOps',
            about: 'HeroDevOps',
            skills: 'SkillsDevOps',
            projects: 'ProjectsDevOps',
            footer: 'FooterDevOps',
        },
    },
    {
        id: 'reliability-engineer',
        name: 'Strategic SRE Portfolio',
        description: 'Executive-level briefing design for SRE professionals with high-impact monolith typography and strategic integrity metrics.',
        sections: {
            header: 'HeaderStrategic',
            about: 'HeroStrategic',
            skills: 'ValuesStrategic',
            projects: 'EcosystemStrategic',
            footer: 'FooterStrategic',
        },
    },
    {
        id: 'data-pipeline-engineer',
        name: 'Data Pipeline Engineer',
        description: 'High-throughput data engineering design with animated SVG pipeline architecture and live performance metrics.',
        sections: {
            header: 'HeaderPipeline',
            about: 'HeroPipeline',
            skills: 'ArchitecturePipeline',
            projects: 'ProjectsPipeline',
            footer: 'FooterPipeline',
        },
    },
    {
        id: 'mobile-engineer',
        name: 'Mobile App Showcase',
        description: 'Warm, premium mobile app showcase with 3D device mockups.',
        sections: {
            header: 'HeaderMobile',
            about: 'HeroMobile',
            skills: 'SkillsMobile',
            projects: 'ProjectsMobile',
            footer: 'FooterMobile',
        },
    },
    {
        id: 'analytics-engineer',
        name: 'Analytics Dashboard',
        description: 'High-fidelity tactical terminal for Data Analytics Engineers.',
        sections: {
            header: 'HeaderAnalytics',
            about: 'HeroAnalytics',
            skills: 'GridAnalytics',
            projects: 'ProjectsAnalytics',
            footer: 'FooterAnalytics',
        },
    },
    {
        id: 'blockchain-dev',
        name: 'Blockchain Architect',
        description: 'Clean, professional blockchain centric portfolio with Bitcoin orange accents and cryptographic themes.',
        sections: {
            header: 'HeaderBlockchain',
            about: 'HeroBlockchain',
            skills: 'GridBlockchain',
            projects: 'ProjectsBlockchain',
            footer: 'FooterBlockchain',
        },
    },
    {
        id: 'mlops-pipeline',
        name: 'MLOps Professional',
        description: 'Bold, high-impact design for Machine Learning and Data Science experts with a focus on production metrics and automated pipelines.',
        sections: {
            header: 'HeaderMLOps',
            about: 'HeroMLOps',
            skills: 'CapabilitiesMLOps',
            projects: 'ProjectsMLOps',
            footer: 'FooterMLOps',
        },
    },
    {
        id: 'open-source-portfolio',
        name: 'Open Source Maintainer',
        description: 'GitHub-inspired dark mode portfolio for open source maintainers and community leaders.',
        sections: {
            header: 'HeaderOS',
            about: 'HeroOS',
            skills: 'GridOS',
            projects: 'ProjectsOS',
            footer: 'FooterOS',
        },
    },
    {
        id: 'security-architect-v2',
        name: 'Strategic Security Engineer',
        description: 'Premium application security design with interactive shields, circuit textures, and strategic compliance metrics.',
        sections: {
            header: 'HeaderSecurity',
            about: 'HeroSecurity',
            skills: 'ExpertiseSecurity',
            projects: 'CasesSecurity',
            footer: 'FooterSecurity',
        },
    },
    {
        id: 'research-portfolio',
        name: 'ML Research Portfolio',
        description: 'Editorial research portfolio with interactive radial SVG navigation, animated spoke diagrams, scroll-triggered reveals, and count-up metrics. Built for ML research engineers.',
        sections: {
            header: 'HeaderResearch',
            about: 'HeroResearch',
            skills: 'StackResearch',
            projects: 'ProjectsResearch',
            footer: 'FooterResearch',
        },
    },
    {
        id: 'cli-portfolio',
        name: 'CLI Terminal Portfolio',
        description: 'Full interactive terminal portfolio with boot sequence, filesystem navigation (ls/cd/cat), command processor, tab completion, and command history. Built for systems engineers.',
        sections: {
            header: 'HeaderCLI',
            about: 'AboutCLI',
            skills: 'SkillsCLI',
            projects: 'ProjectsCLI',
            footer: 'FooterCLI',
        },
    },
    {
        id: 'systems-programming',
        name: 'Desktop OS Portfolio',
        description: 'Full interactive web-based desktop environment with window manager, dock, and menu bar. Built for systems programmers and OS enthusiasts.',
        sections: {
            header: 'HeaderOS',
            about: 'AboutOS',
            skills: 'SkillsOS',
            projects: 'ProjectsOS',
            footer: 'FooterOS',
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
