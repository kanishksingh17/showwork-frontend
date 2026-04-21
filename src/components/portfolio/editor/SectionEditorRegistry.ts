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
    ],
    'PhilosophyDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '01 / Philosophy' },
        { id: 'h2', label: 'Main Headline', type: 'text', defaultValue: 'Infrastructure is an engineering discipline.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: 'Not a cost center. Not an afterthought.' },
        { id: 'body', label: 'Principles Statement', type: 'textarea', defaultValue: 'I operate from a set of hard-won principles: that toil is a systems failure, that runbooks are technical debt in disguise, and that every manual operation is an automation waiting to be written.' },
        { 
            id: 'principles', 
            label: 'Core Principles', 
            type: 'object-list',
            itemFields: [
                { id: 'id', label: 'ID (e.g. P-01)', type: 'text' },
                { id: 'title', label: 'Principle Title', type: 'text' },
                { id: 'desc', label: 'Description', type: 'textarea' }
            ],
            defaultValue: [
                { id: "P-01", title: "Immutable by default, mutable by exception.", desc: "Infrastructure state is declared, versioned, and applied — never mutated in-place." },
                { id: "P-02", title: "Failure is a design input, not an edge case.", desc: "Chaos engineering is practiced quarterly. Blast radius is a first-class design constraint." }
            ]
        }
    ],
    'AutomationDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '02 / CI/CD & Automation' },
        { id: 'h2', label: 'Headline', type: 'text', defaultValue: 'Deploy in minutes. Rollback in seconds.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: 'Pipeline architecture that ships trust, not just code.' },
        { id: 'body', label: 'Context Statement', type: 'textarea', defaultValue: 'I architect CI/CD systems as first-class infrastructure: GitOps-native, policy-enforced, and observable end-to-end.' },
        { id: 'techTags', label: 'Technologies', type: 'tag-list', defaultValue: ["ArgoCD", "GitHub Actions", "Tekton", "Helm"] },
        { 
            id: 'metrics', 
            label: 'Performance Stats', 
            type: 'object-list',
            itemFields: [
                { id: 'val', label: 'Value', type: 'text' },
                { id: 'label', label: 'Label', type: 'text' }
            ],
            defaultValue: [
                { val: "12×", label: "Deploys / Day" },
                { val: "3.8m", label: "Avg Pipeline Duration" }
            ]
        }
    ],
    'ArchitectureDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '03 / Cloud Architecture' },
        { id: 'h2', label: 'Headline', type: 'text', defaultValue: 'Multi-cloud. Multi-region. Zero single points.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: 'Infrastructure that survives an AZ going dark.' },
        { id: 'body', label: 'Architectural Philosophy', type: 'textarea', defaultValue: 'I architect for active-active, not active-passive. Every region is a complete system, not a failover target.' },
        { 
            id: 'capabilities', 
            label: 'Cloud Capabilities', 
            type: 'object-list',
            itemFields: [
                { id: 'title', label: 'Capability Title', type: 'text' },
                { id: 'desc', label: 'Description', type: 'textarea' }
            ],
            defaultValue: [
                { title: "Terraform at Scale", desc: "Modular IaC with remote state locking and Atlantis for PR-driven plans." },
                { title: "Kubernetes Operations", desc: "Fleet management across EKS, GKE, AKS. KEDA autoscaling." }
            ]
        }
    ],
    'ObservabilityDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '04 / Observability' },
        { id: 'h2', label: 'Headline', type: 'text', defaultValue: 'Know before your users know.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: "The three pillars aren't optional." },
        { id: 'body', label: 'Telemetry Statement', type: 'textarea', defaultValue: 'I build observability as infrastructure, not as tooling sprinkled on top. Unified telemetry collection via OpenTelemetry.' },
    ],
    'SREDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '05 / Reliability Engineering (SRE)' },
        { id: 'h2', label: 'Headline', type: 'text', defaultValue: 'Incidents are a systems problem.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: 'Not a people problem. Never a people problem.' },
        { id: 'body', label: 'Discipline Statement', type: 'textarea', defaultValue: 'I practice SRE as an engineering discipline. Error budgets are contractual commitments.' },
        { 
            id: 'slos', 
            label: 'Service Level Objectives', 
            type: 'object-list',
            itemFields: [
                { id: 'name', label: 'SLO Name', type: 'text' },
                { id: 'target', label: 'Target %', type: 'text' },
                { id: 'current', label: 'Current Status', type: 'text' },
                { id: 'fill', label: 'Bar Fill % (0-100)', type: 'number' }
            ],
            defaultValue: [
                { name: "API Availability", target: "99.95%", current: "99.97%", fill: 100 },
                { name: "P99 Latency <250ms", target: "99.0%", current: "99.3%", fill: 94 }
            ]
        }
    ],
    'CostDevOps': [
        { id: 'num', label: 'Section Number', type: 'text', defaultValue: '06 / Cost Efficiency' },
        { id: 'h2', label: 'Headline', type: 'text', defaultValue: 'Cloud bills are an engineering output.' },
        { id: 'sub', label: 'Sub-headline', type: 'text', defaultValue: 'Not a finance department problem.' },
        { 
            id: 'savings', 
            label: 'Efficiency Wins', 
            type: 'object-list',
            itemFields: [
                { id: 'saving', label: 'Saving Amount (e.g. ↓ 47%)', type: 'text' },
                { id: 'title', label: 'Optimization Name', type: 'text' },
                { id: 'desc', label: 'Methodology', type: 'textarea' }
            ],
            defaultValue: [
                { saving: "↓ 47%", title: "Compute Rightsizing", desc: "Automated rightsizing via AWS Compute Optimizer + Karpenter bin-packing." },
                { saving: "↓ 63%", title: "Storage Tiering Automation", desc: "Intelligent S3 lifecycle policies based on access patterns." }
            ]
        }
    ],
    'SkillsDevOps': [
        { id: 'techSlugs', label: 'Technical Stack', type: 'tag-list', placeholder: 'kubernetes, docker, terraform...', hint: 'Enter slugs from SimpleIcons. Each icon will appear in your stack grid.' }
    ],
    'ProjectsDevOps': [
        { 
            id: 'manualProjects', 
            label: 'Pinned Repositories', 
            type: 'object-list',
            itemFields: [
                { id: 'title', label: 'Repo Name', type: 'text' },
                { id: 'description', label: 'Short Description', type: 'textarea' },
                { id: 'stars', label: 'Stars Count', type: 'text' },
                { id: 'tech', label: 'Primary Language', type: 'text' }
            ],
            defaultValue: [
                { title: 'vite-plugin-bundle', description: 'Zero-config Vite plugin for optimized bundle splitting.', stars: '4.2k', tech: 'TypeScript' }
            ]
        }
    ],
    'ResumeDevOps': [
        {
            id: 'metrics',
            label: 'GitHub Metrics',
            type: 'object-list',
            itemFields: [
                { id: 'label', label: 'Label', type: 'text' },
                { id: 'value', label: 'Value', type: 'text' }
            ],
            defaultValue: [
                { label: 'Stars across repos', value: '15.2k' },
                { label: 'Weekly downloads', value: '1.2M' },
                { label: 'Issues resolved', value: '3k+' },
                { label: 'Contributors', value: '200+' }
            ]
        },
        { id: 'followers', label: 'Followers Count', type: 'text', defaultValue: '2.4k' },
        { id: 'following', label: 'Following Count', type: 'text', defaultValue: '318' }
    ],
    'ContactDevOps': [
        { id: 'email', label: 'Contact Email', type: 'text' },
        { id: 'company', label: 'Company / Organization', type: 'text' },
        { id: 'location', label: 'Location', type: 'text' }
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
        { id: 'bio', label: 'Detailed Bio (Markdown-ish)', type: 'textarea', defaultValue: 'Principal Systems Engineer focusing on low-level optimization.' },
        { id: 'wallpaperUrl', label: 'Wallpaper URL', type: 'text', defaultValue: '' },
        { id: 'wallpaperMode', label: 'Wallpaper Mode', type: 'select', options: [
            { label: 'Presets', value: 'preset' },
            { label: 'Custom', value: 'custom' }
        ]}
    ],

    // TEMPLATE 17 - CLI
    'HeroCLI': [
        { id: 'hostname', label: 'System Hostname', type: 'text', defaultValue: 'system' },
        { id: 'bootMessage', label: 'Custom Boot Message', type: 'text', defaultValue: 'Portfolio v1.0' },
        { id: 'userSlug', label: 'Username Slug', type: 'text', defaultValue: 'developer' }
    ],

    'SkillsOS': [
        { id: 'techSlugs', label: 'Technical Stack', type: 'tag-list', placeholder: 'react, nodedotjs, rust...', hint: 'Enter slugs from SimpleIcons. Each icon will appear as an app on your desktop.' }
    ],
    'ProjectsOS': [
        { 
            id: 'manualProjects', 
            label: 'Project Windows', 
            type: 'object-list',
            itemFields: [
                { id: 'name', label: 'Window ID (Lower)', type: 'text' },
                { id: 'title', label: 'Display Title', type: 'text' },
                { id: 'description', label: 'Details', type: 'textarea' },
                { id: 'tech', label: 'Tech Stack', type: 'text' }
            ],
            defaultValue: [
                { name: 'kernel', title: 'Linux Patch', description: 'Sample kernel patch', tech: 'C, Kernel' }
            ]
        }
    ],
    'ResumeOS': [
        {
            id: 'experiences',
            label: 'Career History',
            type: 'object-list',
            itemFields: [
                { id: 'period', label: 'Time Period', type: 'text' },
                { id: 'company', label: 'Employer', type: 'text' },
                { id: 'title', label: 'Role', type: 'text' },
                { id: 'description', label: 'Key Outcome', type: 'textarea' }
            ],
            defaultValue: [
                { period: '2023 – Present', company: 'Razorpay', title: 'Systems Engineer', description: 'Optimized payment pipelines.' }
            ]
        }
    ],
    'ContactOS': [
        { id: 'email', label: 'Support Email', type: 'text', defaultValue: 'hello@example.dev' },
        { id: 'socialLinks', label: 'Social Profile IDs', type: 'tag-list', hint: 'github, twitter, linkedin' }
    ],

    // TEMPLATE 17 - CLI

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
    ],
    'Hero01': [
        { id: 'profession', label: 'Profession/Role', type: 'text', defaultValue: 'Professional Javascript Developer' },
        { id: 'headline', label: 'Main Headline', type: 'textarea', defaultValue: 'Providing value for Business Growth through code.' },
        { id: 'bio', label: 'Professional Bio', type: 'textarea', defaultValue: 'I design and build high-performance web applications with a focus on user experience and scalable architecture.' },
        { id: 'logo', label: 'Brand Logo URL', type: 'text', placeholder: 'e.g. https://domain.com/logo.png', hint: 'Updates the icon in the hero and site header.' },
        { 
            id: 'socialLinks', 
            label: 'Quick Connect Links', 
            type: 'object-list',
            itemFields: [
                { id: 'platform', label: 'Platform', type: 'select', options: [
                    { label: 'GitHub', value: 'github' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Email', value: 'email' },
                    { label: 'Other', value: 'other' }
                ]},
                { id: 'url', label: 'Profile Link', type: 'text' }
            ],
            defaultValue: [
                { platform: 'github', url: 'https://github.com' },
                { platform: 'linkedin', url: 'https://linkedin.com' }
            ]
        }
    ],
    'FeaturedProjects01': [
        { 
            id: 'manualProjects', 
            label: 'Pinned Highlights', 
            type: 'object-list',
            itemFields: [
                { id: 'name', label: 'Project Name', type: 'text' },
                { id: 'image', label: 'Image URL', type: 'text' }
            ],
            defaultValue: [
                { name: "Ecommerce", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800" },
                { name: "Web animated series", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800" }
            ]
        }
    ],
    'SocialBlocks01': [
        { id: 'ctaText', label: 'Call to Action', type: 'text', defaultValue: 'Let\'s build something together.' },
        { 
            id: 'socials', 
            label: 'Quick Links', 
            type: 'object-list',
            itemFields: [
                { id: 'platform', label: 'Platform (e.g. GitHub)', type: 'text' },
                { id: 'url', label: 'Link URL', type: 'text' },
                { id: 'label', label: 'Button Title', type: 'text' }
            ],
            defaultValue: [
                { platform: "GitHub", url: "https://github.com/milton", label: "View Profile" },
                { platform: "Email", url: "mailto:hello@milton.dev", label: "Say Hello" }
            ]
        }
    ],
    'Experience01': [
        { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Relevant Experience' },
        { 
            id: 'experiences', 
            label: 'Career Milestones', 
            type: 'object-list',
            itemFields: [
                { id: 'company', label: 'Company', type: 'text' },
                { id: 'role', label: 'Role', type: 'text' },
                { id: 'period', label: 'Duration', type: 'text' },
                { id: 'description', label: 'Contribution', type: 'textarea' }
            ],
            defaultValue: [
                { company: "ShowWork", role: "Senior Developer", period: "2023 - Present", description: "Lead frontend architect for portfolio builder." }
            ]
        }
    ],
    'Projects01': [
        { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'Recent Works' },
        { 
            id: 'manualProjects', 
            label: 'Project Cards', 
            type: 'object-list',
            itemFields: [
                { id: 'name', label: 'Project Name', type: 'text' },
                { id: 'description', label: 'Tagline', type: 'text' },
                { id: 'category', label: 'Category', type: 'text' },
                { id: 'image', label: 'Image URL', type: 'text' },
                { id: 'liveUrl', label: 'Live Link', type: 'text' }
            ],
            defaultValue: [
                { name: "SaaS Dashboard", description: "Internal tool for data tracking", category: "Full-Stack", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200", liveUrl: "https://google.com" }
            ]
        }
    ],
    'Testimonials01': [
        { id: 'title', label: 'Section Title', type: 'text', defaultValue: 'What people say about me' },
        { 
            id: 'testimonials', 
            label: 'Client feedback', 
            type: 'object-list',
            itemFields: [
                { id: 'text', label: 'Testimonial Text', type: 'textarea' },
                { id: 'author', label: 'Name', type: 'text' },
                { id: 'role', label: 'Role', type: 'text' }
            ],
            defaultValue: [
                { text: "An absolute pleasure to work with...", author: "Sarah Johnson", role: "Product Manager" },
                { text: "Outstanding commitment to quality...", author: "David Chen", role: "Senior Developer" }
            ]
        }
    ],
};
