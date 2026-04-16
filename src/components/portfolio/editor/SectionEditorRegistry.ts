import { 
    Layout, 
    Type, 
    AlignLeft, 
    List, 
    Hash, 
    Activity, 
    Globe, 
    Zap,
    ShieldCheck,
    History,
    Cloud,
    Terminal,
    TerminalSquare,
    Cpu,
    Network
} from 'lucide-react';

export interface EditorField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'tag-list' | 'object-list' | 'icon' | 'select';
    placeholder?: string;
    defaultValue?: any;
    hint?: string;
    // For object-list types (e.g. metrics)
    itemFields?: EditorField[];
    // For select types
    options?: { label: string; value: string }[];
}

export interface SectionEditorConfig {
    variant: string;
    fields: EditorField[];
}

export const SECTION_EDITOR_REGISTRY: Record<string, EditorField[]> = {
    // TEMPLATE 07 - DEVOPS
    'HeroDevOps': [
        { id: 'eyebrow', label: 'Eyebrow Text', type: 'text', defaultValue: 'Senior DevOps Engineer', placeholder: 'e.g. Lead Systems Engineer' },
        { id: 'headlineLine1', label: 'Headline Line 1', type: 'text', defaultValue: 'Infrastructure', placeholder: 'Infrastructure' },
        { id: 'headlineLine2', label: 'Headline Line 2', type: 'text', defaultValue: 'at Scale.', placeholder: 'at Scale.' },
        { id: 'subtitle', label: 'Subtitle Serif Text', type: 'text', defaultValue: 'Built to survive production.', placeholder: 'Built to survive production.' },
        { id: 'bio', label: 'Main Bio', type: 'textarea', defaultValue: 'I design and operate infrastructure that supports millions of requests per day — from GitOps pipelines to multi-cloud architectures.' },
        { 
            id: 'stats', 
            label: 'Performance Metrics', 
            type: 'object-list',
            itemFields: [
                { id: 'label', label: 'Metric Name', type: 'text' },
                { id: 'val', label: 'Value', type: 'text' },
                { id: 'icon', label: 'Icon Type', type: 'select', options: [
                    { label: 'Shield', value: 'shield' },
                    { label: 'Zap', value: 'zap' },
                    { label: 'Clock', value: 'clock' },
                    { label: 'Cloud', value: 'cloud' },
                ]}
            ],
            defaultValue: [
                { val: "99.97%", label: "Uptime SLO", icon: "shield" },
                { val: "<4min", label: "Avg Deploy Time", icon: "zap" },
                { val: "8yrs", label: "Experience", icon: "clock" },
                { val: "3 CSPs", label: "AWS · GCP · Azure", icon: "cloud" }
            ]
        }
    ],

    // TEMPLATE 08 - STRATEGIC SRE
    'HeroStrategic': [
        { id: 'eyebrow', label: 'Strategy Eyebrow', type: 'text', defaultValue: 'Operational Integrity at Scale' },
        { id: 'monolith1', label: 'Large Headline 1', type: 'text', defaultValue: 'RESILIENT' },
        { id: 'monolith2', label: 'Large Headline 2 (Outlined)', type: 'text', defaultValue: 'GROWTH' },
        { id: 'challengeLabel', label: 'Challenge Label', type: 'text', defaultValue: 'The Challenge' },
        { id: 'challengeText', label: 'Challenge Statement', type: 'textarea', defaultValue: 'Complexity scales faster than manual oversight. Traditional ops are the bottleneck of modern innovation.' },
        { id: 'shiftLabel', label: 'Shift Label', type: 'text', defaultValue: 'The Strategic Shift' },
        { id: 'shiftText', label: 'Shift Statement', type: 'textarea', defaultValue: 'We treat reliability as a product feature, engineering resilience directly into the core infrastructure.' }
    ],

    // TEMPLATE 09 - DATA PIPELINE
    'HeroPipeline': [
        { id: 'name', label: 'Engineer Name', type: 'text', defaultValue: 'Kanishk Singh' },
        { id: 'tagline', label: 'Bottom Tagline', type: 'text', defaultValue: 'Architecting high-throughput data pipelines for the modern enterprise.' }
    ],
    'ArchitecturePipeline': [
        { id: 'eyebrow', label: 'Section Label', type: 'text', defaultValue: '// 02 — STACK' },
        { id: 'titleLine1', label: 'Title Line 1', type: 'text', defaultValue: 'PIPELINE' },
        { id: 'titleLine2', label: 'Title Line 2', type: 'text', defaultValue: 'ARCHITECTURE' },
        { 
            id: 'layers', 
            label: 'Pipeline Layers', 
            type: 'object-list',
            itemFields: [
                { id: 'label', label: 'Layer Name', type: 'text' },
                { id: 'items', label: 'Technologies (JSON Array String)', type: 'text', hint: 'e.g. Kafka Topics, Debezium CDC' }
            ],
            defaultValue: [
                { label: 'INGEST', items: 'Kafka Topics, Debezium CDC, Kinesis Streams, REST Webhooks' },
                { label: 'PROCESS', items: 'Spark Streaming, Flink Jobs, Schema Registry, Data Contracts' },
                { label: 'STORE', items: 'Delta Lake, Silver Layer, Gold Layer, Snowflake DW' },
                { label: 'SERVE', items: 'Looker / Grafana, ML Feature Store, Data APIs, PagerDuty' }
            ]
        }
    ],

    // TEMPLATE 12 - BLOCKCHAIN
    'HeroBlockchain': [
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', defaultValue: 'Available for Smart Contract Audits' },
        { id: 'titleLine1', label: 'Title Line 1', type: 'text', defaultValue: 'Code.' },
        { id: 'titleLine2', label: 'Title Line 2 (Highlighted)', type: 'text', defaultValue: 'Consensus.' },
        { id: 'titleLine3', label: 'Title Line 3', type: 'text', defaultValue: 'Cryptography.' },
        { id: 'bio', label: 'Bio', type: 'textarea', defaultValue: 'I engineer digital scarcity and programmable value.' },
        { id: 'marqueeStats', label: 'Marquee Stats (String List)', type: 'tag-list', defaultValue: ["8+ Years Experience", "$500M+ TVL Secured", "40+ Smart Contracts Deployed"] },
        { id: 'aboutTitle1', label: 'About Title 1', type: 'text', defaultValue: 'Bring' },
        { id: 'aboutTitleHighlight', label: 'About Title Highlight', type: 'text', defaultValue: 'Trustless' },
        { id: 'aboutTitle2', label: 'About Title 2', type: 'text', defaultValue: 'Logic' },
        { id: 'metric1Value', label: 'Metric 1 Value', type: 'text', defaultValue: '98' },
        { id: 'metric1Label', label: 'Metric 1 Label', type: 'text', defaultValue: 'Audit Score Average' }
    ],

    // TEMPLATE 13 - MLOPS
    'HeroMLOps': [
        { id: 'headline', label: 'ML Headline', type: 'text', defaultValue: 'Production-Grade ML Systems' },
        { id: 'subheadline', label: 'ML Subheadline', type: 'text', defaultValue: 'Engineering intelligence at scale.' },
        { id: 'bio', label: 'Short Bio', type: 'textarea', defaultValue: 'I bridge the gap between model research and robust production systems.' }
    ],
    'CapabilitiesMLOps': [
        { 
            id: 'capabilities', 
            label: 'Core Capabilities', 
            type: 'object-list',
            itemFields: [
                { id: 'title', label: 'Title', type: 'text' },
                { id: 'description', label: 'Description', type: 'textarea' },
                { id: 'icon', label: 'Material Icon Name', type: 'text' }
            ],
            defaultValue: [
                { title: 'Automated Training Pipelines', description: 'End-to-end orchestration of model training workflows...', icon: 'model_training' },
                { title: 'CI/CD for ML', description: 'Seamless integration and delivery pipelines...', icon: 'integration_instructions' }
            ]
        },
        { id: 'metric1Value', label: 'Uptime Value', type: 'text', defaultValue: '99.9%' },
        { id: 'metric2Value', label: 'Latency Value', type: 'text', defaultValue: '120' },
        { id: 'metric3Value', label: 'Models Value', type: 'text', defaultValue: '20+' }
    ],

    // TEMPLATE 16 - RESEARCH
    'HeroResearch': [
        { id: 'title', label: 'Hero Title', type: 'textarea', defaultValue: 'Research-Driven\nMachine Learning\nSystems' },
        { id: 'statement', label: 'Big Statement', type: 'textarea', defaultValue: 'I reproduce landmark ML papers and scale them to production.' },
        { id: 'metric1Value', label: 'Papers Count', type: 'text', defaultValue: '12' },
        { id: 'metric2Value', label: 'Models Count', type: 'text', defaultValue: '4' }
    ],

    // TEMPLATE 18 - OS
    'AboutOS': [
        { id: 'name', label: 'Display Name', type: 'text', defaultValue: 'Kanishk Mehta' },
        { id: 'headline', label: 'Professional Role', type: 'text', defaultValue: 'Principal Systems Engineer' },
        { id: 'location', label: 'Location', type: 'text', defaultValue: 'Bengaluru, India' },
        { id: 'bio', label: 'Detailed Bio (Markdown-ish)', type: 'textarea', defaultValue: 'Principal Systems Engineer focusing on low-level optimization.' }
    ],

    // TEMPLATE 17 - CLI
    'HeroCLI': [
        { id: 'hostname', label: 'System Hostname', type: 'text', defaultValue: 'system' },
        { id: 'bootMessage', label: 'Custom Boot Message', type: 'text', defaultValue: 'Portfolio v1.0' },
        { id: 'userSlug', label: 'Username Slug', type: 'text', defaultValue: 'developer' }
    ],

    // RESUME SECTIONS
    'PersonalInfo': [
        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Kanishk Singh' },
        { id: 'title', label: 'Professional Title', type: 'text', placeholder: 'Senior Software Engineer' },
        { id: 'email', label: 'Email Address', type: 'text', placeholder: 'kanishk@showwork.ai' },
        { id: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA' },
        { id: 'bio', label: 'Professional Summary', type: 'textarea', placeholder: 'Architecting scalable systems...' },
    ],
    'ExperienceResume': [
        { 
            id: 'experiences', 
            label: 'Experience History', 
            type: 'object-list',
            itemFields: [
                { id: 'companyName', label: 'Company Name', type: 'text' },
                { id: 'title', label: 'Job Title', type: 'text' },
                { id: 'startDate', label: 'Start Date', type: 'text' },
                { id: 'endDate', label: 'End Date', type: 'text' },
                { id: 'description', label: 'Responsibilities', type: 'textarea' },
            ]
        }
    ],
    'EducationResume': [
        { 
            id: 'education', 
            label: 'Education History', 
            type: 'object-list',
            itemFields: [
                { id: 'schoolName', label: 'School Name', type: 'text' },
                { id: 'degreeName', label: 'Degree', type: 'text' },
                { id: 'description', label: 'Additional Info', type: 'textarea' },
            ]
        }
    ],
    'SkillsResume': [
        { id: 'techStack', label: 'Technical Skills', type: 'tag-list', placeholder: 'React, Node.js, etc.' }
    ],

    // TEMPLATE 10 - MOBILE DEV
    'HeroMobile': [
        { id: 'headline', label: 'Hero Headline', type: 'text', defaultValue: 'Mobile Apps. Built to Ship.' },
        { id: 'availableText', label: 'Availability Badge', type: 'text', defaultValue: 'Available for new projects' },
        { id: 'bio', label: 'Hero Bio', type: 'textarea', defaultValue: 'I engineer cross-platform mobile applications that users actually keep.' },
        { id: 'appStoreName', label: 'Featured App Name', type: 'text', defaultValue: 'TrackFlow — Fitness' },
        { id: 'appStoreCategory', label: 'Featured Category', type: 'text', defaultValue: 'Health & Fitness · Latest App' },
        { id: 'appStoreRating', label: 'App Rating', type: 'text', defaultValue: '4.9' },
        { id: 'appStoreDownloads', label: 'Downloads', type: 'text', defaultValue: '2.1M' }
    ],

    // TEMPLATE 06 - ARCHITECT
    'HeroMain': [
        { id: 'headlineLine1', label: 'Headline Line 1', type: 'text', defaultValue: 'Building' },
        { id: 'headlineLine2', label: 'Headline Line 2', type: 'text', defaultValue: 'Digital Foundations' },
        { id: 'description', label: 'Hero Description', type: 'textarea', defaultValue: 'Minimalist architecture for complex systems. We focus on scalability and clean abstractions.' }
    ],

    // TEMPLATE 11 - DATA COMMAND
    'HeroAnalytics': [
        { id: 'tagline', label: 'System Tagline', type: 'text', defaultValue: 'Central Command v2.4' },
        { id: 'headlineLine1', label: 'Headline 1', type: 'text', defaultValue: 'DATA.' },
        { id: 'headlineLine2', label: 'Headline 2', type: 'text', defaultValue: 'CLARITY.' },
        { id: 'headlineLine3', label: 'Headline 3', type: 'text', defaultValue: 'IMPACT.' },
        { id: 'bio', label: 'Main Bio', type: 'textarea', defaultValue: 'Senior Data Analyst & Analytics Engineer building robust infrastructures that turn chaotic data into high-fidelity business intelligence.' },
        { id: 'integrityValue', label: 'Integrity Value', type: 'text', defaultValue: '99.98%' },
        { id: 'integrityLabel', label: 'Integrity Label', type: 'text', defaultValue: 'Data Pipeline Uptime' }
    ]
};
