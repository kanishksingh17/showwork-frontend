import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LoginModal } from "@/components/auth/LoginModal";
import type {
  PortfolioTemplate,
  JobRole,
} from "../../types/portfolio";

interface PortfolioSelectorProps {
  userData: any;
  projects: any[];
  onTemplateSelect: (template: PortfolioTemplate) => void;
  onJobRoleDetected: (jobRole: JobRole) => void;
  isDemo?: boolean;
}

const MOCK_TEMPLATES: PortfolioTemplate[] = [
  {
    id: "modern-dev",
    name: "Modern Developer",
    description: "Clean, professional template perfect for software developers",
    jobRoles: ["Software Developer", "Full Stack Developer", "Frontend Developer"],
    industries: ["Technology", "Software"],
    layout: "modern",
    sections: [
      { id: "hero", type: "hero", title: "Hero Section", content: "", isRequired: true, order: 1 },
      { id: "about", type: "about", title: "About Me", content: "", isRequired: true, order: 2 },
      { id: "projects", type: "projects", title: "Projects", content: "", isRequired: true, order: 3 },
      { id: "skills", type: "skills", title: "Skills", content: "", isRequired: true, order: 4 },
      { id: "contact", type: "contact", title: "Contact", content: "", isRequired: true, order: 5 },
    ],
    preview: "/templates/modern-dev-preview.jpg",
    isPopular: true,
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Bold, creative template for designers and artists",
    jobRoles: ["UI/UX Designer", "Graphic Designer", "Creative Director"],
    industries: ["Design", "Creative", "Marketing"],
    layout: "creative",
    sections: [
      { id: "hero", type: "hero", title: "Hero Section", content: "", isRequired: true, order: 1 },
      { id: "portfolio", type: "projects", title: "Portfolio", content: "", isRequired: true, order: 2 },
      { id: "about", type: "about", title: "About", content: "", isRequired: true, order: 3 },
      { id: "skills", type: "skills", title: "Skills", content: "", isRequired: true, order: 4 },
      { id: "testimonials", type: "testimonials", title: "Testimonials", content: "", isRequired: false, order: 5 },
    ],
    preview: "/templates/creative-designer-preview.jpg",
    isPopular: true,
  },
  {
    id: "professional-exec",
    name: "Executive Professional",
    description: "Sophisticated template for executives and senior professionals",
    jobRoles: ["CEO", "CTO", "VP Engineering", "Senior Manager"],
    industries: ["Technology", "Finance", "Consulting", "Healthcare"],
    layout: "professional",
    sections: [
      { id: "hero", type: "hero", title: "Executive Summary", content: "", isRequired: true, order: 1 },
      { id: "experience", type: "experience", title: "Experience", content: "", isRequired: true, order: 2 },
      { id: "achievements", type: "projects", title: "Key Achievements", content: "", isRequired: true, order: 3 },
      { id: "education", type: "education", title: "Education", content: "", isRequired: true, order: 4 },
      { id: "contact", type: "contact", title: "Contact", content: "", isRequired: true, order: 5 },
    ],
    preview: "/templates/professional-exec-preview.jpg",
    isPopular: false,
  },
  {
    id: "recommended-fullstack",
    name: "Full-Stack Developer",
    description: "High-fidelity mock for showcasing your absolute best work",
    jobRoles: ["Full Stack Developer", "Software Engineer", "MERN Developer"],
    industries: ["Technology", "Software", "Web Development"],
    layout: "modern",
    sections: [
      { id: "hero", type: "about", title: "Hero", content: "", isRequired: true, order: 1, variant: "HeroMain" },
      { id: "skills", type: "skills", title: "Skills", content: "", isRequired: true, order: 2, variant: "SkillsMain" },
      { id: "projects", type: "projects", title: "Projects", content: "", isRequired: true, order: 3, variant: "ProjectsMain" },
      { id: "resume", type: "resume", title: "Resume", content: "", isRequired: true, order: 4, variant: "ResumeMain" },
      { id: "contact", type: "contact", title: "Contact", content: "", isRequired: true, order: 5, variant: "ContactMain" },
      { id: "footer", type: "footer", title: "Footer", content: "", isRequired: true, order: 6, variant: "FooterMain" },
      { id: "footer", type: "footer", title: "Footer", content: "", isRequired: true, order: 6, variant: "FooterMain" },
    ],
    theme: {
      primary: "#cd5ff8",
      secondary: "#623686",
      font: "Inter",
      mode: "dark"
    },
    preview: "/templates/recommended-fullstack.jpg",
    previewUrl: "/portfolio/demo/",
    isPopular: true,
  },
  {
    id: "api-engineer",
    name: "API-First Portfolio",
    description: "Showcase RESTful and GraphQL APIs",
    jobRoles: ["Backend Developer", "API Engineer", "Microservices Engineer"],
    industries: ["Technology", "Backend", "Services"],
    layout: "modern",
    sections: [
      { id: "hero", type: "hero", title: "Hero", content: "", isRequired: true, order: 1 },
      { id: "about", type: "about", title: "About", content: "", isRequired: true, order: 2 },
      { id: "projects", type: "projects", title: "Projects", content: "", isRequired: true, order: 3 },
      { id: "contact", type: "contact", title: "Contact", content: "", isRequired: true, order: 4 },
    ],
    preview: "/templates/backend.png",
    isPopular: false
  },
];

const ImageScrollPreview: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-slate-900 relative rounded-t-xl group-hover/card:rounded-t-xl">
      <div
        className="w-full transition-transform ease-linear"
        style={{
          // Use a simulated height or aspect ratio.
          // For a real implementation, the image should be a long screenshot.
          // Here we assume the image is long and we translate it up.
          // We'll use a class to trigger the scroll on hover.
          transitionDuration: '5000ms'
        }}
      >
        <img
          src={src}
          alt="Template Preview"
          className="w-full h-auto object-cover object-top transition-transform ease-linear transform translate-y-0 hover:-translate-y-[calc(100%-250px)]" // Adjust 250px to match container height
          style={{ minHeight: '100%', transitionDuration: '4000ms' }}
        />
      </div>
    </div>
  );
};
// Note: The hover effect is better handled on the parent or using a state if we want strict "hover card -> scroll image" behavior.
// The previous implementation used context of the card hover.
// Let's refine this to accept an `isHovering` prop or handle it internally.

const ScrollableThumbnail: React.FC<{ src: string }> = ({ src }) => {
  // We'll reuse the name but change implementation to CSS image scroll
  // This requires the parent to pass "isHovering" or we handle strictly CSS

  // To ensure it scrolls to the VERY bottom, we use translateY.
  // The container is fixed height (e.g. 240px from parent).
  // The image is tall.
  // transform: translateY(-100%) moves it completely out.
  // We want translateY(containerHeight - imageHeight).

  return (
    <div className="w-full h-full overflow-hidden bg-slate-900 relative rounded-t-xl">
      <img
        src={src}
        alt="preview"
        className="w-full object-cover object-top transition-all ease-in-out"
        style={{
          transformOrigin: 'top',
          transitionDuration: '3000ms'
        }}
      />
      {/*
               We need to use a CSS trick because we don't know the exact height in JS easily without refs.
               Tailwind 'group-hover' from the parent card can work if we add 'group' to the parent.
               The parent already has 'group'.
            */}
      <style>{`
                .group:hover .scroll-image {
                    transform: translateY(calc(-100% + 240px)); /* 240px is approx height of container */
                }
            `}</style>
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={src}
          className="w-full h-auto scroll-image transition-transform ease-linear"
          style={{ willChange: 'transform', transitionDuration: '5000ms' }}
        />
      </div>
      {/* To avoid double rendering of img, we just use one. */}
    </div>
  );
};

// simpler version
const CSSScrollableThumbnail: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-slate-900 relative rounded-t-xl">
      <div
        className="w-full h-full bg-top transition-all ease-in-out group-hover:bg-bottom"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          transitionDuration: '5000ms' // Slower scroll for better visibility
        }}
      />
    </div>
  );
};

export const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({
  userData,
  projects,
  onTemplateSelect,
  onJobRoleDetected,
  isDemo = false,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [templates, setTemplates] = useState<PortfolioTemplate[]>(MOCK_TEMPLATES);

  useEffect(() => {
    setTemplates(MOCK_TEMPLATES);
  }, [userData, projects]);

  const domains = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'backend', label: 'Backend' },
    { id: 'infra', label: 'Infra' },
    { id: 'data', label: 'Data' },
    { id: 'ai', label: 'AI' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'systems', label: 'Systems' },
    { id: 'security', label: 'Security' },
    { id: 'web3', label: 'Web3' },
    { id: 'devtools', label: 'Dev Tools' },
  ];

  const [selectedDomain, setSelectedDomain] = useState('all');

  const domainRoles = {
    web: ['Frontend Developer', 'Full-Stack Developer', 'Web Engineer', 'UI Engineer'],
    backend: ['Backend Developer', 'API Engineer', 'Microservices Engineer', 'Distributed Systems Engineer'],
    infra: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer (SRE)', 'Infrastructure Engineer', 'Build & Release Engineer'],
    data: ['Data Engineer', 'Analytics Engineer', 'ETL Engineer', 'Database Engineer'],
    ai: ['Machine Learning Engineer', 'AI Engineer', 'MLOps Engineer', 'Research Engineer', 'Prompt Engineer'],
    mobile: ['Android Developer', 'iOS Developer', 'Flutter Developer', 'React Native Developer'],
    systems: ['Systems Programmer', 'Embedded Systems Engineer', 'Firmware Developer', 'Kernel Developer'],
    security: ['Security Engineer', 'Application Security Engineer', 'DevSecOps Engineer', 'Penetration Testing Engineer'],
    web3: ['Blockchain Developer', 'Smart Contract Engineer', 'Protocol Engineer'],
    devtools: ['Open Source Maintainer', 'SDK Engineer', 'CLI Tool Developer', 'Framework Engineer', 'Developer Advocate'],
  };

  const templateCards = [
    // Blank Template
    {
      id: 'blank',
      title: 'Blank Canvas',
      domain: 'all',
      roles: ['All Roles'],
      description: 'Start from scratch with a clean slate',
      preview: (
        <div className="w-16 h-16 text-slate-200 dark:text-slate-800">
          <svg className="w-full h-full opacity-50" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        </div>
      ),
      tech: '',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // RECOMMENDED TEMPLATE (Based on Job Role Detection)
    {
      id: 'recommended-fullstack',
      title: 'Full-Stack Developer',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Perfect for showcasing both frontend and backend skills',
      isRecommended: true,
      preview: <CSSScrollableThumbnail src="/templates/fullstack.png" />,
      tech: 'MERN • Blockchain • GraphQL',
      bgClass: 'bg-[#1b1a2e]',
      isDark: true,
    },

    // WEB DOMAIN
    {
      id: 'ui-first',
      title: 'UI-First Portfolio',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Showcase your design skills with interactive components',
      preview: (
        <div className="h-full w-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 space-y-2">
          <div className="h-8 bg-white dark:bg-slate-800 rounded shadow-sm"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded"></div>
            <div className="h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded"></div>
          </div>
          <div className="h-12 bg-white dark:bg-slate-800 rounded shadow-sm"></div>
        </div>
      ),
      tech: 'React • Tailwind',
      bgClass: 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10',
    },
    {
      id: 'component-library',
      title: 'Component Library',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Display your reusable component collection',
      preview: (
        <div className="h-full w-full p-4 space-y-3">
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-blue-500 rounded-lg"></div>
            <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            <div className="w-12 h-12 bg-purple-500 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      ),
      tech: 'Storybook • React',
      bgClass: 'bg-white dark:bg-slate-900',
    },
    {
      id: 'performance-focused',
      title: 'Performance-Focused',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Highlight optimization and speed metrics',
      preview: (
        <div className="h-full w-full p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-green-500">98</div>
            <div className="flex-1 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-1">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-3/5"></div>
          </div>
        </div>
      ),
      tech: 'Next.js • Lighthouse',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // BACKEND DOMAIN
    {
      id: 'api-engineer',
      title: 'API-First Portfolio',
      domain: 'backend',
      roles: domainRoles.backend,
      description: 'Showcase RESTful and GraphQL APIs',
      preview: <CSSScrollableThumbnail src="/templates/backend.png" />,
      tech: 'Node.js • Express',
      bgClass: 'bg-slate-100 dark:bg-slate-800/40',
    },
    {
      id: 'microservices',
      title: 'Microservices Architecture',
      domain: 'backend',
      roles: domainRoles.backend,
      description: 'Distributed systems and service mesh',
      preview: (
        <div className="h-full w-full p-4">
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-xs">Auth</div>
            <div className="bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-xs">API</div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center text-xs">DB</div>
          </div>
        </div>
      ),
      tech: 'Docker • K8s',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // INFRA DOMAIN
    {
      id: 'devops-portfolio',
      title: 'DevOps Portfolio',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'CI/CD pipelines and automation',
      preview: (
        <div className="h-full w-full border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
            <div className="flex-1 h-1 bg-green-500"></div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Build → Test → Deploy</div>
        </div>
      ),
      tech: 'GitHub Actions • Jenkins',
      bgClass: 'bg-white dark:bg-slate-900',
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Architecture',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'Multi-cloud infrastructure designs',
      preview: (
        <div className="h-full w-full p-4 space-y-2">
          <div className="h-6 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center text-xs">AWS</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
            <div className="h-12 bg-green-100 dark:bg-green-900/30 rounded"></div>
          </div>
        </div>
      ),
      tech: 'AWS • Terraform',
      bgClass: 'bg-white dark:bg-slate-900',
    },
    {
      id: 'sre-monitoring',
      title: 'Reliability & Monitoring',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'SRE practices and observability',
      preview: (
        <div className="h-full w-full p-4">
          <div className="flex gap-1 items-end h-16">
            <div className="flex-1 bg-green-500/30 rounded-t h-[60%]"></div>
            <div className="flex-1 bg-green-500/30 rounded-t h-[80%]"></div>
            <div className="flex-1 bg-green-500/30 rounded-t h-[100%]"></div>
            <div className="flex-1 bg-green-500/30 rounded-t h-[70%]"></div>
          </div>
          <div className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400">99.9% Uptime</div>
        </div>
      ),
      tech: 'Prometheus • Grafana',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // DATA DOMAIN
    {
      id: 'data-engineer',
      title: 'Data Pipeline Portfolio',
      domain: 'data',
      roles: domainRoles.data,
      description: 'ETL workflows and data processing',
      preview: (
        <div className="h-full w-full p-4">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-blue-500 rounded"></div>
            <div className="flex-1 h-1 bg-blue-500"></div>
            <div className="w-12 h-12 bg-purple-500 rounded"></div>
            <div className="flex-1 h-1 bg-purple-500"></div>
            <div className="w-12 h-12 bg-green-500 rounded"></div>
          </div>
        </div>
      ),
      tech: 'Apache Spark • Airflow',
      bgClass: 'bg-white dark:bg-slate-900',
    },
    {
      id: 'analytics-engineer',
      title: 'Analytics Dashboard',
      domain: 'data',
      roles: domainRoles.data,
      description: 'Data visualization and insights',
      preview: (
        <div className="space-y-3 p-4">
          <div className="flex gap-1 items-end h-16">
            <div className="flex-1 bg-blue-500/20 rounded-t h-[40%]"></div>
            <div className="flex-1 bg-blue-500/20 rounded-t h-[60%]"></div>
            <div className="flex-1 bg-blue-500/20 rounded-t h-[100%]"></div>
            <div className="flex-1 bg-blue-500/20 rounded-t h-[80%]"></div>
          </div>
        </div>
      ),
      tech: 'Python • SQL • Tableau',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // AI DOMAIN
    {
      id: 'ml-research',
      title: 'Research-Driven Portfolio',
      domain: 'ai',
      roles: domainRoles.ai,
      description: 'ML research and paper implementations',
      preview: (
        <>
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="grid grid-cols-8 gap-1 rotate-12 -translate-x-10 -translate-y-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="text-[8px] text-blue-500 font-mono leading-none">
                  {i % 4 === 0 ? '01010101' : i % 4 === 1 ? '11001100' : i % 4 === 2 ? '01101101' : '10101010'}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center px-4">
            <div className="text-white text-sm font-mono">neural_network.py</div>
            <div className="text-xs text-blue-400 mt-1">Accuracy: 94.2%</div>
          </div>
        </>
      ),
      tech: 'PyTorch • TensorFlow',
      bgClass: 'bg-slate-900',
      isDark: true,
    },
    {
      id: 'mlops-pipeline',
      title: 'MLOps Pipeline',
      domain: 'ai',
      roles: domainRoles.ai,
      description: 'Model deployment and monitoring',
      preview: (
        <div className="h-full w-full p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-xs bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">Train</div>
            <div className="flex-1 h-1 bg-purple-500"></div>
            <div className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">Deploy</div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Model v2.3.1</div>
        </div>
      ),
      tech: 'MLflow • Kubeflow',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // MOBILE DOMAIN
    {
      id: 'mobile-apps',
      title: 'Mobile App Showcase',
      domain: 'mobile',
      roles: domainRoles.mobile,
      description: 'Native and cross-platform apps',
      preview: (
        <div className="h-full w-full p-4 flex items-center justify-center">
          <div className="w-20 h-32 bg-slate-800 dark:bg-slate-700 rounded-lg border-4 border-slate-900 dark:border-slate-600 p-2">
            <div className="h-full bg-white dark:bg-slate-800 rounded space-y-1">
              <div className="h-4 bg-blue-500 rounded"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      ),
      tech: 'React Native • Flutter',
      bgClass: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800',
    },

    // SYSTEMS DOMAIN
    {
      id: 'systems-programming',
      title: 'Systems Portfolio',
      domain: 'systems',
      roles: domainRoles.systems,
      description: 'Low-level programming and embedded systems',
      preview: (
        <div className="h-full w-full bg-black p-4 font-mono text-xs text-green-400">
          <div className="space-y-1">
            <div>$ kernel_module.c</div>
            <div className="text-slate-500">// Embedded systems</div>
            <div>void init() {'{'}</div>
            <div className="pl-4">setup_hardware();</div>
            <div>{'}'}</div>
          </div>
        </div>
      ),
      tech: 'C • Rust • Assembly',
      bgClass: 'bg-slate-900',
      isDark: true,
    },

    // SECURITY DOMAIN
    {
      id: 'security-portfolio',
      title: 'Security Engineer',
      domain: 'security',
      roles: domainRoles.security,
      description: 'AppSec and penetration testing',
      preview: (
        <div className="h-full w-full p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">🔒</div>
            <div className="flex-1 h-2 bg-green-500 rounded"></div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Vulnerability Assessment</div>
          <div className="grid grid-cols-3 gap-1">
            <div className="h-8 bg-green-100 dark:bg-green-900/30 rounded text-center text-xs flex items-center justify-center">✓</div>
            <div className="h-8 bg-green-100 dark:bg-green-900/30 rounded text-center text-xs flex items-center justify-center">✓</div>
            <div className="h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded text-center text-xs flex items-center justify-center">!</div>
          </div>
        </div>
      ),
      tech: 'OWASP • Burp Suite',
      bgClass: 'bg-white dark:bg-slate-900',
    },

    // WEB3 DOMAIN
    {
      id: 'blockchain-dev',
      title: 'Blockchain Portfolio',
      domain: 'web3',
      roles: domainRoles.web3,
      description: 'Smart contracts and DApps',
      preview: (
        <div className="h-full w-full p-4">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded opacity-80"></div>
            ))}
          </div>
        </div>
      ),
      tech: 'Solidity • Web3.js',
      bgClass: 'bg-slate-900',
      isDark: true,
    },

    // DEV TOOLS DOMAIN
    {
      id: 'open-source',
      title: 'Open Source Maintainer',
      domain: 'devtools',
      roles: domainRoles.devtools,
      description: 'OSS contributions and projects',
      preview: (
        <div className="h-full w-full p-4 space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <div className="flex-1">
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded mb-1"></div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ),
      tech: 'GitHub • npm',
      bgClass: 'bg-white dark:bg-slate-900',
    },
    {
      id: 'cli-tools',
      title: 'CLI Tool Portfolio',
      domain: 'devtools',
      roles: domainRoles.devtools,
      description: 'Command-line utilities and tools',
      preview: (
        <div className="h-full w-full bg-black p-4 font-mono text-xs text-green-400">
          <div className="space-y-1">
            <div>$ my-cli --help</div>
            <div className="text-slate-500">Usage: my-cli [options]</div>
            <div className="text-blue-400">  -v, --version</div>
            <div className="text-blue-400">  -h, --help</div>
          </div>
        </div>
      ),
      tech: 'Node.js • Go',
      bgClass: 'bg-slate-900',
      isDark: true,
    },
  ];

  const filteredCards = selectedDomain === 'all'
    ? templateCards
    : templateCards.filter(card => card.domain === selectedDomain || card.domain === 'all');

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
      {/* Header */}
      <header className="text-center mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Choose Your Domain
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Your GitHub tells a story. Choose how it's presented to recruiters and the community.
        </p>
      </header>

      {/* Mock Job Role Detection - Static Example (AI detection disabled) - Hidden in demo mode */}
      {!isDemo && (
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-700 dark:text-green-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                Detected Job Role
              </h3>
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                Software Developer
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                Full-stack developer with experience in modern web technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB'].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Domain Tabs */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-2 p-1 bg-white dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 max-w-full px-2">
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${selectedDomain === domain.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
              >
                {domain.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="group relative flex flex-col cursor-pointer"
            onClick={() => onTemplateSelect(templates.find(t => t.id === card.id) || templates[0])}
          >
            <div className="mb-3">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="text-center text-lg font-semibold">{card.title}</h3>
                {!isDemo && (card as any).isRecommended && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Recommended
                  </span>
                )}
              </div>
              {card.description && (
                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              )}
            </div>
            <div className={`flex-1 min-h-[240px] rounded-xl ${!isDemo && (card as any).isRecommended ? 'border-2 border-green-500 dark:border-green-400' : 'border border-slate-200 dark:border-slate-800'} ${card.bgClass} shadow-sm transition-all group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden relative ${card.id === 'blank' ? 'flex items-center justify-center p-6' : 'p-4'} ${card.id === 'ml-research' || card.id === 'systems-programming' || card.id === 'blockchain-dev' || card.id === 'cli-tools' || card.id === 'recommended-fullstack' ? 'flex items-center justify-center' : ''}`}>
              {card.preview}

              {/* Create Button */}
              <div className={`absolute bottom-4 right-4 flex items-center gap-2 ${card.id === 'blank' ? 'opacity-0 group-hover:opacity-100 transition-opacity' : ''}`}>
                {card.tech && (
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${(card as any).isDark ? 'text-slate-500 bg-black/50' : 'text-slate-400 bg-white/80 dark:bg-slate-800/80'} px-2 py-1 rounded`}>
                    {card.tech}
                  </span>
                )}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isDemo) {
                      setShowLoginModal(true);
                    } else {
                      const template = templates.find(t => t.id === card.id) || templates[0];
                      if (template) onTemplateSelect(template);
                    }
                  }}
                  className={`${(card as any).isRecommended ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg`}
                >
                  <span className="text-sm">+</span> Create
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-20 text-center">
        <Button
          variant="outline"
          className="px-8 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          View More Templates
        </Button>
      </div>

      {/* Login Modal for Demo Mode */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          window.location.href = '/login';
        }}
      />
    </div>
  );
};
