import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LoginModal } from "@/components/auth/LoginModal";
import type {
  PortfolioTemplate,
} from "../../types/portfolio";

interface PortfolioSelectorProps {
  userData: any;
  projects: any[];
  onTemplateSelect: (template: PortfolioTemplate) => void;
  isDemo?: boolean;
}

const INTEGRATED_TEMPLATES: PortfolioTemplate[] = [
  {
    id: "api-engineer",
    name: "API-First Portfolio",
    description: "Showcase RESTful and GraphQL APIs",
    previewUrl: "/portfolio/demo/api-engineer",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 2, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 3, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "recommended-fullstack",
    name: "Full-Stack Developer",
    description: "High-fidelity mock for showcasing your absolute best work",
    previewUrl: "/portfolio/demo/recommended-fullstack",
    layout: "modern",
    isPopular: true,
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'SkillsMain', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'experience', type: 'resume', variant: 'ResumeMain', isVisible: true, order: 4, title: 'Experience', content: '', isRequired: true },
      { id: 'education', type: 'resume', variant: 'ResumeMain', isVisible: true, order: 5, title: 'Education', content: '', isRequired: true },
      { id: 'blogs', type: 'blogs', variant: 'BlogsMain', isVisible: true, order: 6, title: 'Blogs', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 7, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "modern-dev",
    name: "Modern Developer",
    description: "Interactive portfolio with sleek animations",
    previewUrl: "/portfolio/demo/modern-dev",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'SkillsMain', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean, playful design with photo stacks and toolbox",
    previewUrl: "/portfolio/demo/modern-minimalist",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'SkillsMain', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "microservices-architect",
    name: "Microservices Architect",
    description: "Premium cinematic design for backend & distributed systems experts",
    previewUrl: "/portfolio/demo/microservices-architect",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'stats', type: 'about', variant: 'StatsMain', isVisible: true, order: 2, title: 'Stats', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "cloud-architect",
    name: "Cloud Architect",
    description: "Premium Stitch layout with iridescent accents and high-fidelity mockups",
    previewUrl: "/portfolio/demo/cloud-architect",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMain', isVisible: true, order: 2, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMain', isVisible: true, order: 3, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "infra-architect",
    name: "DevOps Portfolio",
    description: "High-consequence DevOps design with 3D animations and cloud schematics",
    previewUrl: "/portfolio/demo/infra-architect",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderDevOps', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroDevOps', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsDevOps', isVisible: true, order: 2, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterDevOps', isVisible: true, order: 3, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "reliability-engineer",
    name: "Reliability Engineer",
    description: "High-availability SRE design with live monitoring visualizations",
    previewUrl: "/portfolio/demo/reliability-engineer",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderSRE', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroSRE', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'SkillsSRE', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsSRE', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterSRE', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "data-pipeline-engineer",
    name: "Data Pipeline Engineer",
    description: "High-throughput data engineering design with animated SVG pipeline architecture and live performance metrics.",
    previewUrl: "/portfolio/demo/data-pipeline-engineer",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderPipeline', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroPipeline', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'ArchitecturePipeline', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsPipeline', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterPipeline', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "mobile-engineer",
    name: "Mobile App Showcase",
    description: "Warm, premium mobile app showcase with 3D device mockups.",
    previewUrl: "/portfolio/demo/mobile-engineer",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMobile', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMobile', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'SkillsMobile', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMobile', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMobile', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "analytics-engineer",
    name: "Analytics Dashboard",
    description: "High-fidelity tactical terminal for Data Analytics Engineers.",
    previewUrl: "/portfolio/demo/analytics-engineer",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderAnalytics', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroAnalytics', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'GridAnalytics', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsAnalytics', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterAnalytics', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "blockchain-dev",
    name: "Blockchain Architect",
    description: "Clean, professional blockchain centric portfolio with Bitcoin orange accents and cryptographic themes.",
    previewUrl: "/portfolio/demo/blockchain-dev",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderBlockchain', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroBlockchain', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'GridBlockchain', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsBlockchain', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterBlockchain', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "mlops-pipeline",
    name: "MLOps Professional",
    description: "Bold, high-impact design for Machine Learning and Data Science experts with a focus on production metrics and automated pipelines.",
    previewUrl: "/portfolio/demo/mlops-pipeline",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderMLOps', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroMLOps', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'CapabilitiesMLOps', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsMLOps', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterMLOps', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "open-source-portfolio",
    name: "Open Source Maintainer",
    description: "GitHub-inspired dark mode portfolio for open source maintainers and community leaders.",
    previewUrl: "/portfolio/demo/open-source-portfolio",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderOS', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroOS', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'GridOS', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsOS', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterOS', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "security-architect-v2",
    name: "Strategic Security Engineer",
    description: "Premium application security design with interactive shields, circuit textures, and strategic compliance metrics.",
    previewUrl: "/portfolio/demo/security-architect-v2",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderSecurity', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroSecurity', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'ExpertiseSecurity', isVisible: true, order: 2, title: 'Skills', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'CasesSecurity', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterSecurity', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "research-portfolio",
    name: "ML Research Portfolio",
    description: "Editorial research portfolio with interactive radial SVG navigation, animated spoke diagrams, and count-up metrics.",
    previewUrl: "/portfolio/demo/research-portfolio",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderResearch', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'HeroResearch', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'skills', type: 'skills', variant: 'StackResearch', isVisible: true, order: 2, title: 'Stack', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsResearch', isVisible: true, order: 3, title: 'Projects', content: '', isRequired: true },
      { id: 'footer', type: 'footer', variant: 'FooterResearch', isVisible: true, order: 4, title: 'Footer', content: '', isRequired: true },
    ]
  },
  {
    id: "cli-portfolio",
    name: "CLI Terminal Portfolio",
    description: "Interactive terminal portfolio with boot sequence, filesystem navigation, command processor, tab completion, and command history.",
    previewUrl: "/portfolio/demo/cli-portfolio",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderCLI', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'AboutCLI', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsCLI', isVisible: true, order: 2, title: 'Projects', content: '', isRequired: true },
    ]
  },
  {
    id: "systems-programming",
    name: "Desktop OS Portfolio",
    description: "Web-based desktop environment with draggable windows, dock, and menu bar.",
    previewUrl: "/portfolio/demo/systems-programming",
    layout: "modern",
    templateEngine: "section",
    sections: [
      { id: 'header', type: 'header', variant: 'HeaderOS', isVisible: true, order: 0, title: 'Header', content: '', isRequired: true },
      { id: 'about', type: 'about', variant: 'AboutOS', isVisible: true, order: 1, title: 'About', content: '', isRequired: true },
      { id: 'projects', type: 'projects', variant: 'ProjectsOS', isVisible: true, order: 2, title: 'Projects', content: '', isRequired: true },
    ]
  }
];



const ImageScrollPreview: React.FC<{ src: string }> = ({ src }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="w-full overflow-hidden bg-white relative rounded-t-xl"
      style={{ height: '240px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt="Template Preview"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transition: 'transform 6000ms linear',
          transform: hovered ? 'translateY(calc(-100% + 240px))' : 'translateY(0)',
          willChange: 'transform',
          imageRendering: 'auto',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x800?text=Template+Preview';
        }}
      />
      {/* Fade out at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    </div>
  );
};


export const PortfolioSelector: React.FC<PortfolioSelectorProps> = ({
  userData,
  projects,
  onTemplateSelect,
  isDemo = false,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [templates, setTemplates] = useState<PortfolioTemplate[]>(INTEGRATED_TEMPLATES);

  useEffect(() => {
    setTemplates(INTEGRATED_TEMPLATES);
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
    infra: ['DevOps Engineer', 'Cloud Architect', 'Cloud Engineer', 'Site Reliability Engineer (SRE)', 'Infrastructure Engineer', 'Build & Release Engineer'],
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
      preview: (
        <ImageScrollPreview src="/templates/fullstack-preview.png" />
      ),
      tech: 'MERN • Blockchain • GraphQL',
      bgClass: 'bg-white',
      isDark: false,
    },

    // WEB DOMAIN
    {
      id: 'modern-dev',
      title: 'Modern Developer',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Clean, playful design with photo stacks and toolbox (Modern Developer)',
      preview: (
        <ImageScrollPreview src="/templates/minimalist-preview.png" />
      ),
      tech: 'React • Tailwind',
      bgClass: 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10',
    },
    {
      id: 'modern-minimalist',
      title: 'Modern Minimalist',
      domain: 'web',
      roles: domainRoles.web,
      description: 'Clean, playful design with photo stacks and toolbox',
      preview: (
        <ImageScrollPreview src="/templates/minimalist-preview.png" />
      ),
      tech: 'Framer • Glassmorphism',
      bgClass: 'bg-white',
    },

    // BACKEND DOMAIN
    {
      id: 'api-engineer',
      title: 'API-First Portfolio',
      domain: 'backend',
      roles: domainRoles.backend,
      description: 'Showcase RESTful and GraphQL APIs',
      preview: (
        <div className="h-full w-full bg-slate-50 border-t border-slate-200 p-4 font-mono text-xs text-blue-600 flex flex-col">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="text-slate-500 font-sans font-medium">API Gateway</div>
          </div>
          <div className="space-y-1 flex-grow">
            <div><span className="text-purple-600">GET</span> <span className="text-slate-700">/api/v1/users</span></div>
            <div><span className="text-green-600">POST</span> <span className="text-slate-700">/api/v1/auth</span></div>
            <div><span className="text-blue-600">PUT</span> <span className="text-slate-700">/api/v1/profile</span></div>
            <div className="text-slate-400 mt-2">// Response: 200 OK</div>
          </div>
        </div>
      ),
      tech: 'Node.js • Express',
      bgClass: 'bg-white',
    },
    {
      id: 'microservices-architect',
      title: 'Microservices Architect',
      domain: 'backend',
      roles: domainRoles.backend,
      description: 'Distributed systems and service mesh with cinematic video',
      preview: (
        <div className="h-full w-full relative overflow-hidden flex items-center justify-center bg-slate-900 rounded-lg">
          <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#D9FF3F] flex items-center justify-center mb-2">
              <span className="text-[#D9FF3F] text-xs">VIDEO</span>
            </div>
            <span className="text-[10px] text-white/60 font-mono">ANIMATED BG</span>
          </div>
        </div>
      ),
      tech: 'Video • Premium',
      bgClass: 'bg-slate-950',
      isDark: true,
    },

    // INFRA DOMAIN
    {
      id: 'infra-architect',
      title: 'DevOps Portfolio',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'The definitive portfolio for DevOps engineers. High-consequence design with 3D animations and cloud schematics.',
      preview: (
        <div className="h-full w-full bg-[#050507] rounded-lg overflow-hidden flex flex-col p-4 border border-purple-500/30 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <div className="h-1 w-12 bg-white/10 rounded"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-purple-500/50 rounded rotate-45 flex items-center justify-center">
                <div className="w-8 h-8 border border-purple-500/30 rounded"></div>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              <div className="h-1 flex-1 bg-green-500/40 rounded"></div>
              <div className="h-1 flex-1 bg-green-500/40 rounded"></div>
              <div className="h-1 flex-1 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      ),
      tech: 'Framer • 3D Canvas • AWS',
      bgClass: 'bg-[#050507]',
      isDark: true,
    },
    {
      id: 'cloud-architect',
      title: 'Cloud Architect',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'High-fidelity Stitch layout with iridescent accents and monochrome display typography.',
      preview: (
        <div className="h-full w-full bg-black rounded-lg overflow-hidden flex flex-col p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded bg-gradient-to-br from-[#6EE7F7] to-[#B56EF7]" />
            <div className="w-12 h-1 bg-white/10 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-black/10" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/20 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-2/3" />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6EE7F7] to-[#B56EF7] opacity-60 blur-sm" />
          </div>
        </div>
      ),
      tech: 'AWS • Web3 • Premium',
      bgClass: 'bg-black',
      isDark: true,
    },

    {
      id: 'reliability-engineer',
      title: 'Reliability Engineer',
      domain: 'infra',
      roles: domainRoles.infra,
      description: 'High-availability SRE design with live monitoring visualizations and incident response frameworks.',
      preview: (
        <div className="h-full w-full p-4 flex flex-col gap-2">
          <div className="flex gap-1 items-end h-16">
            <div className="flex-1 bg-emerald-500/30 rounded-t h-[40%]"></div>
            <div className="flex-1 bg-emerald-500/30 rounded-t h-[60%]"></div>
            <div className="flex-1 bg-emerald-500/30 rounded-t h-[45%]"></div>
            <div className="flex-1 bg-emerald-500/30 rounded-t h-[70%]"></div>
            <div className="flex-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-t h-[90%]"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
            <div className="text-[10px] font-mono text-emerald-500 font-bold uppercase">System Active :: 100%</div>
          </div>
        </div>
      ),
      tech: 'SRE • Observability',
      bgClass: 'bg-white dark:bg-[#1a1a1a]',
    },

    // DATA DOMAIN
    {
      id: 'data-pipeline-engineer',
      title: 'Data Pipeline Engineer',
      domain: 'data',
      roles: domainRoles.data,
      description: 'High-throughput data engineering design with SVG animations',
      preview: (
        <div className="h-full w-full bg-[#0D1117] p-4 flex items-center justify-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#F5720A]/20 to-transparent"></div>
          <div className="flex gap-2 relative z-10 items-center">
            <div className="w-8 h-8 rounded border border-[#F5720A]/40 flex items-center justify-center bg-black/50 text-[10px]">⚡</div>
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#F5720A] to-[#00D4FF]"></div>
            <div className="w-8 h-8 rounded border border-[#00D4FF]/40 flex items-center justify-center bg-black/50 text-[10px]">🏔</div>
          </div>
        </div>
      ),
      tech: 'Kafka • Spark • Flink',
      bgClass: 'bg-[#050608]',
      isDark: true,
    },
    {
      id: 'analytics-engineer',
      title: 'Analytics Dashboard',
      domain: 'data',
      roles: domainRoles.data,
      description: 'High-fidelity tactical terminal for Data Analytics Engineers.',
      preview: (
        <div className="h-full w-full bg-[#05050A] text-gray-200 flex flex-col items-center justify-start pt-2 pb-12 p-2 relative overflow-hidden font-inter text-[8px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none"></div>

          {/* Mock Dashboard Grid */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm relative z-10 w-[95%]">

            {/* System Integrity */}
            <div className="bg-[#0D0D18]/80 border border-white/10 rounded p-1.5 backdrop-blur shadow-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-1">
                <span className="text-[5px] font-mono text-gray-500">SYSTEM INTEGRITY</span>
                <div className="h-1 w-1 bg-green-500 rounded-full shadow-[0_0_4px_#22c55e]"></div>
              </div>
              <div className="text-[14px] font-mono text-white leading-none">99.98%</div>
              <div className="flex gap-0.5 h-3 mt-1 items-end">
                <div className="flex-1 bg-green-500/30 h-full"></div>
                <div className="flex-1 bg-green-500/50 h-3/4"></div>
                <div className="flex-1 bg-[#7C3AED]/50 h-5/6"></div>
                <div className="flex-1 bg-green-500/80 h-full"></div>
              </div>
            </div>

            {/* Live Pipeline Stream */}
            <div className="bg-[#0D0D18]/80 border border-white/10 rounded p-1.5 backdrop-blur shadow-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-1">
                <span className="text-[5px] font-mono text-gray-500">LIVE STREAM</span>
                <span className="text-[6px] text-[#7C3AED]">♦</span>
              </div>
              <div className="font-mono text-[5px] text-gray-400 space-y-0.5">
                <div className="flex justify-between"><span>[STREAM]</span><span className="text-green-400">SUCCESS</span></div>
                <div>FETCHING data...</div>
                <div className="text-[#7C3AED]">Loading to DB...</div>
              </div>
            </div>

            {/* Central Typography Header */}
            <div className="col-span-2 flex flex-col items-center justify-center py-2">
              <div className="text-[18px] font-mono font-bold leading-tight tracking-tight text-white text-center" style={{ textShadow: '1px 1px 0px rgba(124, 58, 237, 0.4)' }}>
                DATA.<br />
                <span className="text-gray-400">CLARITY.</span><br />
                IMPACT.
              </div>
            </div>

            {/* Bottom Row Modals */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div className="bg-[#0D0D18]/80 border border-white/10 rounded p-1.5 flex items-center gap-1">
                <div className="bg-[#7C3AED]/20 p-1 rounded"><div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full"></div></div>
                <div><div className="text-[5px] text-gray-500">STACK</div><div className="text-[6px] text-white font-bold">dbt+Snowflake</div></div>
              </div>
              <div className="bg-[#0D0D18]/80 border border-white/10 rounded p-1.5 flex items-center gap-1">
                <div className="bg-[#06B6D4]/20 p-1 rounded"><div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full"></div></div>
                <div><div className="text-[5px] text-gray-500">IMPACT</div><div className="text-[6px] text-white font-bold">$2.5M Rev</div></div>
              </div>
            </div>

          </div>
        </div>
      ),
      tech: 'dbt • Snowflake • Airflow • React',
      bgClass: 'bg-[#030305]',
      isDark: true,
    },

    // AI DOMAIN
    {
      id: 'research-portfolio',
      title: 'ML Research Portfolio',
      domain: 'ai',
      roles: domainRoles.ai,
      description: 'Editorial research portfolio with radial SVG navigation and animated starburst diagrams.',
      preview: (
        <div className="relative h-full w-full overflow-hidden" style={{ background: '#EDECEA' }}>
          {/* Radial spokes SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i / 36) * 2 * Math.PI - Math.PI / 2;
              const len = 55 + (Math.sin(i * 2.4) * 0.5 + 0.5) * 30;
              return (
                <line
                  key={i}
                  x1="100" y1="80"
                  x2={100 + Math.cos(angle) * len}
                  y2={80 + Math.sin(angle) * len}
                  stroke={i % 7 === 0 ? '#5B8DB8' : '#C0C0BB'}
                  strokeWidth={i % 7 === 0 ? 0.9 : 0.45}
                  opacity={0.55 + (Math.sin(i) * 0.5 + 0.5) * 0.35}
                />
              );
            })}
            {/* Center dot */}
            <circle cx="100" cy="80" r="3" fill="#5B8DB8" />
            {/* Endpoint dots on accent spokes */}
            {Array.from({ length: 6 }).map((_, i) => {
              const idx = i * 7;
              const angle = (idx / 36) * 2 * Math.PI - Math.PI / 2;
              const len = 55 + (Math.sin(idx * 2.4) * 0.5 + 0.5) * 30;
              return <circle key={i} cx={100 + Math.cos(angle) * len} cy={80 + Math.sin(angle) * len} r="1.5" fill="#5B8DB8" opacity="0.8" />;
            })}
          </svg>

          {/* Nav labels */}
          <div className="absolute" style={{ top: '10%', left: '18%', fontSize: '6px', fontFamily: 'monospace', color: '#5B8DB8', letterSpacing: '1px' }}>[PAPERS]</div>
          <div className="absolute" style={{ top: '10%', right: '10%', fontSize: '6px', fontFamily: 'monospace', color: '#5B8DB8', letterSpacing: '1px' }}>[MODELS]</div>
          <div className="absolute" style={{ bottom: '12%', left: '12%', fontSize: '6px', fontFamily: 'monospace', color: '#5B8DB8', letterSpacing: '1px' }}>[DATASETS]</div>
          <div className="absolute" style={{ bottom: '12%', right: '10%', fontSize: '6px', fontFamily: 'monospace', color: '#5B8DB8', letterSpacing: '1px' }}>[RESULTS]</div>

          {/* Bottom-left title */}
          <div className="absolute" style={{ bottom: '28%', left: '8%', fontSize: '9px', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
            Research-<br />Driven ML
          </div>

          {/* Bottom-right location */}
          <div className="absolute" style={{ bottom: '28%', right: '8%', fontSize: '8px', fontWeight: 900, color: '#1A1A1A', textAlign: 'right', lineHeight: 1.2 }}>
            Ready<br />to Work
          </div>

          {/* Spinning asterisk top-left */}
          <div className="absolute" style={{ top: '8%', left: '6%', fontSize: '14px', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>✳</div>

          {/* Bottom chrome bar */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-2 py-1" style={{ borderTop: '1px solid #C8C7C3', background: '#E2E1DD' }}>
            <div style={{ fontSize: '5px', fontFamily: 'monospace', letterSpacing: '1px', color: '#7A7A7A', textTransform: 'uppercase' }}>MENU</div>
            <div style={{ fontSize: '5px', fontFamily: 'monospace', letterSpacing: '1px', color: '#7A7A7A', textTransform: 'uppercase' }}>↳ GET IN TOUCH</div>
          </div>
        </div>
      ),
      tech: 'PyTorch • JAX • Hugging Face',
      bgClass: 'bg-[#EDECEA]',
      isDark: false,
    },

    {
      id: 'mlops-pipeline',
      title: 'MLOps Professional',
      domain: 'ai',
      roles: domainRoles.ai,
      description: 'Bold, high-impact design for Machine Learning and Data Science experts.',
      preview: (
        <div className="h-full w-full bg-[#FFD147] p-4 flex flex-col justify-between rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="h-1 w-8 bg-black/20 rounded"></div>
          </div>
          <div className="text-[10px] font-bold text-black">MLOps Professional</div>
          <div className="flex gap-1">
            <div className="h-4 w-4 bg-purple-500/20 rounded"></div>
            <div className="h-4 w-4 bg-cyan-500/20 rounded"></div>
          </div>
        </div>
      ),
      tech: 'MLOps • React • Tailwind',
      bgClass: 'bg-[#FFD147]',
    },

    // MOBILE DOMAIN
    {
      id: 'mobile-engineer',
      title: 'Mobile App Showcase',
      domain: 'mobile',
      roles: domainRoles.mobile,
      description: 'Warm, premium mobile app showcase with 3D device mockups.',
      preview: (
        <div className="h-full w-full bg-[#fdf5ed] p-4 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#F5720A]/20 to-transparent"></div>
          <div className="flex gap-2 relative z-10 w-full items-center justify-center">
            <div className="w-8 h-12 rounded bg-slate-900 border border-slate-700 -rotate-12 translate-y-2"></div>
            <div className="w-10 h-16 rounded bg-slate-900 border border-slate-700 z-10"></div>
            <div className="w-8 h-12 rounded bg-slate-900 border border-slate-700 rotate-12 translate-y-2"></div>
          </div>
        </div>
      ),
      tech: 'React Native • Swift • Kotlin',
      bgClass: 'bg-white',
    },

    // SYSTEMS DOMAIN
    {
      id: 'systems-programming',
      title: 'Systems Portfolio',
      domain: 'systems',
      roles: domainRoles.systems,
      description: 'Web-based desktop environment with draggable windows, dock, and menu bar.',
      preview: (
        <div className="h-full w-full bg-[#D8D4CC] relative overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 right-0 h-4 bg-white/60 backdrop-blur-md border-b border-black/10 flex items-center px-2 z-20">
            <div className="text-[6px] font-bold text-black/80">⌘ Portfolio</div>
          </div>
          <div className="absolute top-8 left-4 w-3/4 h-3/4 bg-[#F7F5F2] rounded-md shadow-lg border border-black/10 flex flex-col overflow-hidden z-10">
            <div className="h-4 bg-[#EFECE8] border-b border-black/10 flex items-center px-1.5 gap-1 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#28CA41]"></div>
            </div>
            <div className="flex-1 p-2 flex gap-2">
              <div className="w-8 h-8 rounded bg-blue-500/20 shrink-0"></div>
              <div className="space-y-1 w-full mt-1">
                <div className="h-1.5 bg-black/80 rounded w-1/2"></div>
                <div className="h-1 bg-black/40 rounded w-3/4"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 h-6 bg-white/60 backdrop-blur-md rounded-full px-2 items-center border border-white z-20 shadow-md">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-300 to-blue-500"></div>
            <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-300 to-orange-500"></div>
          </div>
        </div>
      ),
      tech: 'DOM • Framer • Canvas',
      bgClass: 'bg-[#D8D4CC]',
      isDark: false,
    },

    // SECURITY DOMAIN
    {
      id: 'security-architect-v2',
      title: 'Security Portfolio',
      domain: 'security',
      roles: domainRoles.security,
      description: 'Strategic AppSec design with interactive shields and compliance metrics.',
      preview: (
        <div className="h-full w-full bg-white dark:bg-slate-900 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black text-xs font-bold">🛡️</div>
            <div className="flex-1 h-2 bg-emerald-500 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-12 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-500 text-[8px] font-bold">98%</div>
            <div className="flex-1 space-y-1">
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded text-[8px] flex items-center justify-center font-bold">OWASP</div>
            <div className="h-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded text-[8px] flex items-center justify-center font-bold">ISO 27001</div>
          </div>
        </div>
      ),
      tech: 'AppSec • Compliance • Shield-V2',
      bgClass: 'bg-white dark:bg-slate-900',
      isDark: true,
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
      id: 'open-source-portfolio',
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
      id: 'cli-portfolio',
      title: 'CLI Terminal Portfolio',
      domain: 'devtools',
      roles: domainRoles.devtools,
      description: 'Interactive terminal portfolio with boot sequence, ls/cd/cat, and command history',
      preview: (
        <div className="h-full w-full bg-[#0C0C0C] p-3 font-mono text-[9px] leading-relaxed overflow-hidden">
          <div className="text-[#5C5C5C]">[ OK ] Started Portfolio Service v1.0.</div>
          <div className="text-[#5C5C5C] mb-1">──────────────────────────────────</div>
          <div className="text-[#33FF66]"><span className="text-[#20C24C]">dev</span><span className="text-[#5C5C5C]">@</span><span className="text-[#20C24C]">system</span><span className="text-[#5C5C5C]">:</span><span className="text-[#5DA9FF]">~</span><span className="text-[#33FF66]">$ </span><span className="text-[#E2E2E2]">help</span></div>
          <div className="text-[#B8B8B8] pl-2">about · projects · skills</div>
          <div className="text-[#B8B8B8] pl-2">experience · contact</div>
          <div className="text-[#33FF66] mt-1"><span className="text-[#20C24C]">dev</span><span className="text-[#5C5C5C]">@</span><span className="text-[#20C24C]">system</span><span className="text-[#5C5C5C]">:</span><span className="text-[#5DA9FF]">~</span><span className="text-[#33FF66]">$ </span><span className="text-[#E2E2E2]">sudo hire-me</span></div>
          <div className="text-[#33FF66]">✓ HIRE_APPROVED=1</div>
        </div>
      ),
      tech: 'Terminal • eBPF • Systems',
      bgClass: 'bg-[#0C0C0C]',
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
            onClick={() => {
              onTemplateSelect(templates.find(t => t.id === card.id) || templates[0]);
            }}
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
                      onTemplateSelect(templates.find(t => t.id === card.id) || templates[0]);
                    }
                  }}
                  className={`${!isDemo && (card as any).isRecommended ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg`}
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
