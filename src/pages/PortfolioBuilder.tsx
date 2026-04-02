import { useState, useEffect, useMemo } from "react";
import { Button } from "../components/ui/button";
import {
  Sparkles,
  ArrowLeft,
  Briefcase,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import type { PortfolioTemplate, UserPortfolio, JobRole } from "../types/portfolio";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { PortfolioSelector } from "../components/portfolio/PortfolioSelector";
import { ModernPortfolioEditor } from "../components/portfolio/ModernPortfolioEditor";
import { LoginModal } from "@/components/auth/LoginModal";
import { usePortfolioDispatch } from "@/store/portfolio/hooks";
import { selectTemplate, setSections, updateUserData, changeWebsitePageComponentContent } from "@/store/portfolio/portfolioSlice";
import { useAuth } from "@/contexts/useAuth";
import { PortfolioDemoPreview } from "./PortfolioDemo";

type BuilderStep = "landing" | "template-preview" | "preparation" | "customizer" | "preview";

interface PortfolioBuilderProps {
  isDemo?: boolean;
}

const BASE_PREVIEW_USER = {
  id: "preview-user",
  name: "Raj Singh",
  email: "raj@example.com",
  bio: "Engineer focused on shipping reliable products with strong UX and measurable impact.",
  tagline: "Full-Stack Engineer",
  username: "rajsingh",
  techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  skills: [
    { name: "TypeScript", percentage: 92, category: "programming" },
    { name: "React", percentage: 90, category: "frontend" },
    { name: "Node.js", percentage: 88, category: "backend" },
    { name: "System Design", percentage: 84, category: "architecture" },
  ],
  socials: {
    github: "https://github.com/soumyajit4419",
    linkedin: "https://www.linkedin.com/in/soumyajit4419/",
    twitter: "https://x.com/rajsingh",
  },
  hasResume: true,
};

const TEMPLATE_PREVIEW_CONTENT: Record<string, { tagline: string; bio: string; projects: Array<any> }> = {
  "recommended-fullstack": {
    tagline: "Full-Stack Developer",
    bio: "Builds performant web products end-to-end with clean architecture and product focus.",
    projects: [
      { id: "p-fs-1", name: "Growth Commerce", description: "Checkout funnel with 18% higher conversion.", technologies: ["React", "Node.js", "PostgreSQL"] },
      { id: "p-fs-2", name: "Realtime Ops", description: "Operations dashboard with websocket alerts.", technologies: ["TypeScript", "Socket.io", "Redis"] },
    ],
  },
  "api-engineer": {
    tagline: "API Engineer",
    bio: "Designs resilient REST and GraphQL APIs with excellent developer experience.",
    projects: [
      { id: "p-api-1", name: "Payments API", description: "Idempotent payment workflows and audit trails.", technologies: ["Node.js", "OpenAPI", "PostgreSQL"] },
      { id: "p-api-2", name: "Partner Graph", description: "GraphQL federation for multi-domain data.", technologies: ["GraphQL", "Apollo", "TypeScript"] },
    ],
  },
  "modern-dev": {
    tagline: "Frontend Engineer",
    bio: "Creates delightful interfaces with strong accessibility and performance baselines.",
    projects: [
      { id: "p-fe-1", name: "Design System", description: "Reusable UI primitives across products.", technologies: ["React", "Tailwind", "Storybook"] },
      { id: "p-fe-2", name: "Marketing Studio", description: "Animated landing pages with CMS tooling.", technologies: ["Next.js", "Framer Motion", "MDX"] },
    ],
  },
  "modern-minimalist": {
    tagline: "Product Engineer",
    bio: "Ships focused user flows with clean visual systems and maintainable code.",
    projects: [
      { id: "p-mm-1", name: "Creator Hub", description: "Portfolio manager with publishing workflows.", technologies: ["React", "TypeScript", "Supabase"] },
      { id: "p-mm-2", name: "Client Portal", description: "Lightweight client collaboration dashboard.", technologies: ["Vite", "TanStack Query", "Zod"] },
    ],
  },
  "microservices-architect": {
    tagline: "Distributed Systems Architect",
    bio: "Leads service decomposition, observability, and reliability at scale.",
    projects: [
      { id: "p-ms-1", name: "Order Mesh", description: "Domain-driven microservices for order lifecycle.", technologies: ["Go", "gRPC", "Kafka"] },
      { id: "p-ms-2", name: "Traffic Router", description: "Canary and progressive rollout controller.", technologies: ["Kubernetes", "Envoy", "Prometheus"] },
    ],
  },
  "cloud-architect": {
    tagline: "Cloud Architect",
    bio: "Builds secure cloud platforms with strong cost and reliability controls.",
    projects: [
      { id: "p-ca-1", name: "Platform Blueprint", description: "Multi-account IaC reference architecture.", technologies: ["AWS", "Terraform", "GitHub Actions"] },
      { id: "p-ca-2", name: "FinOps Guardrails", description: "Budget anomaly detection with policy automation.", technologies: ["Lambda", "Athena", "CloudWatch"] },
    ],
  },
  "infra-architect": {
    tagline: "DevOps Architect",
    bio: "Designs CI/CD and infra standards for fast, safe delivery.",
    projects: [
      { id: "p-devops-1", name: "Release Factory", description: "Standardized pipelines for 40+ services.", technologies: ["ArgoCD", "Helm", "Kubernetes"] },
      { id: "p-devops-2", name: "Drift Sentinel", description: "Infrastructure drift detection and remediation.", technologies: ["Terraform", "OPA", "Python"] },
    ],
  },
  "reliability-engineer": {
    tagline: "Site Reliability Engineer",
    bio: "Improves availability with SLOs, automation, and incident excellence.",
    projects: [
      { id: "p-sre-1", name: "SLO Control Center", description: "Service-level objective monitoring and alerts.", technologies: ["Prometheus", "Grafana", "Alertmanager"] },
      { id: "p-sre-2", name: "Incident Timeline", description: "Automated incident command and postmortems.", technologies: ["PagerDuty", "Slack API", "Node.js"] },
    ],
  },
  "data-pipeline-engineer": {
    tagline: "Data Engineer",
    bio: "Builds reliable data pipelines for analytics and ML workloads.",
    projects: [
      { id: "p-de-1", name: "Streaming Lakehouse", description: "Near-real-time ingestion and transformations.", technologies: ["Kafka", "dbt", "Snowflake"] },
      { id: "p-de-2", name: "Quality Gates", description: "Data contracts and quality assertions pipeline.", technologies: ["Airflow", "Great Expectations", "Python"] },
    ],
  },
  "mobile-engineer": {
    tagline: "Mobile Engineer",
    bio: "Builds polished mobile apps with strong performance and offline support.",
    projects: [
      { id: "p-mobile-1", name: "Habit Mobile", description: "Cross-platform app with offline sync.", technologies: ["React Native", "Expo", "SQLite"] },
      { id: "p-mobile-2", name: "Travel Wallet", description: "Secure itinerary and expense tracker.", technologies: ["Flutter", "Firebase", "Dart"] },
    ],
  },
  "analytics-engineer": {
    tagline: "Analytics Engineer",
    bio: "Turns raw data into trusted metrics and executive-ready dashboards.",
    projects: [
      { id: "p-analytics-1", name: "Revenue Model", description: "Unified revenue mart and KPI layer.", technologies: ["dbt", "BigQuery", "Looker"] },
      { id: "p-analytics-2", name: "Funnel Observatory", description: "Lifecycle funnel monitoring suite.", technologies: ["SQL", "Metabase", "Airbyte"] },
    ],
  },
  "blockchain-dev": {
    tagline: "Blockchain Engineer",
    bio: "Designs secure smart contracts and production-grade web3 integrations.",
    projects: [
      { id: "p-chain-1", name: "Vault Protocol", description: "Audited staking and reward contracts.", technologies: ["Solidity", "Foundry", "Ethers.js"] },
      { id: "p-chain-2", name: "Wallet Gateway", description: "Multi-chain wallet connect orchestration.", technologies: ["TypeScript", "wagmi", "viem"] },
    ],
  },
  "mlops-pipeline": {
    tagline: "MLOps Engineer",
    bio: "Operationalizes ML with repeatable training and safe model delivery.",
    projects: [
      { id: "p-mlops-1", name: "Model Release Train", description: "Versioned model training and rollout gates.", technologies: ["MLflow", "Kubernetes", "Python"] },
      { id: "p-mlops-2", name: "Drift Radar", description: "Live drift detection and retraining triggers.", technologies: ["Evidently", "FastAPI", "PostgreSQL"] },
    ],
  },
  "open-source-portfolio": {
    tagline: "Open Source Maintainer",
    bio: "Maintains tooling used by developers across multiple ecosystems.",
    projects: [
      { id: "p-oss-1", name: "CLI Toolkit", description: "Open-source CLI utilities with plugin system.", technologies: ["Node.js", "TypeScript", "pnpm"] },
      { id: "p-oss-2", name: "UI Starter", description: "Accessible component starter for teams.", technologies: ["React", "Radix", "Vitest"] },
    ],
  },
  "security-architect-v2": {
    tagline: "Application Security Engineer",
    bio: "Builds secure-by-default systems with practical threat modeling.",
    projects: [
      { id: "p-sec-1", name: "Threat Mapper", description: "Threat model automation and risk scoring.", technologies: ["OWASP", "Node.js", "Neo4j"] },
      { id: "p-sec-2", name: "Policy Shield", description: "Runtime policy checks in CI/CD.", technologies: ["OPA", "GitHub Actions", "Rego"] },
    ],
  },
  "research-portfolio": {
    tagline: "ML Research Engineer",
    bio: "Explores model architectures and publishes reproducible experiments.",
    projects: [
      { id: "p-research-1", name: "Sparse Attention Lab", description: "Efficiency experiments for long-context models.", technologies: ["PyTorch", "JAX", "WandB"] },
      { id: "p-research-2", name: "Benchmark Suite", description: "Evaluation harness for model variants.", technologies: ["Python", "HuggingFace", "Docker"] },
    ],
  },
  "cli-portfolio": {
    tagline: "Developer Tools Engineer",
    bio: "Builds terminal-first tooling that accelerates developer workflows.",
    projects: [
      { id: "p-cli-1", name: "Terminal Portfolio", description: "Interactive shell-like portfolio experience.", technologies: ["React", "xterm.js", "TypeScript"] },
      { id: "p-cli-2", name: "Repo Scout", description: "CLI repo insights with markdown exports.", technologies: ["Go", "Cobra", "SQLite"] },
    ],
  },
  "systems-programming": {
    tagline: "Systems Engineer",
    bio: "Builds high-performance systems and desktop-like web experiences.",
    projects: [
      { id: "p-sys-1", name: "Web Desktop", description: "Window manager and dock in browser runtime.", technologies: ["TypeScript", "Canvas", "Web Workers"] },
      { id: "p-sys-2", name: "Memory Profiler", description: "Low-overhead profiling toolkit.", technologies: ["Rust", "WASM", "D3"] },
    ],
  },
};

const getTemplatePreviewData = (templateId: string | undefined) => {
  const key = templateId || "recommended-fullstack";
  const template = TEMPLATE_PREVIEW_CONTENT[key] || TEMPLATE_PREVIEW_CONTENT["recommended-fullstack"];
  const userData = {
    ...BASE_PREVIEW_USER,
    tagline: template.tagline,
    bio: template.bio,
  };

  return {
    userData,
    projects: template.projects,
  };
};

export default function PortfolioBuilder({ isDemo = false }: PortfolioBuilderProps) {
  const dispatch = usePortfolioDispatch();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<BuilderStep>("landing");
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null);
  const [detectedJobRole, setDetectedJobRole] = useState<JobRole | null>(null);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTypingSection, setCurrentTypingSection] = useState("");
  const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [preparationProgress, setPreparationProgress] = useState(0);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [hasResumeFile, setHasResumeFile] = useState(false);
  const [resumeFileData, setResumeFileData] = useState<{name: string, sizeStr: string} | null>(null);
  const isSelectionPreviewStep = currentStep === "landing" || currentStep === "template-preview";
  const previewData = useMemo(() => getTemplatePreviewData(selectedTemplate?.id), [selectedTemplate?.id]);
  const showcasedProjects = useMemo(
    () => fetchedProjects.filter((p) => p.showcase),
    [fetchedProjects],
  );

  // Real user data
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email?: string;
    bio?: string;
    tagline?: string;
    username?: string;
    techStack?: string[];
    skills: Array<{ name: string; percentage: number; category: string }>;
    quizResults?: Array<{ technology: string; score: number; attempts: number }>;
    socials?: { github?: string; linkedin?: string; twitter?: string };
    hasResume?: boolean;
  } | null>(null);

  // Mock projects fallback
  const projects = [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution",
      technologies: ["React", "Node.js", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Real-time task management tool",
      technologies: ["React", "Socket.io", "Express"],
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      featured: true,
    },
  ];

  // Fetch USER data
  useEffect(() => {
    if (isDemo || isSelectionPreviewStep) {
      setUserData({ id: "demo-user", name: "Demo User", skills: [] });
      return;
    }
    const loadData = async () => {
      try {
        const response = await fetch("/api/portfolio/profile", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            const user = data.user;
            setUserData({
              id: user._id || user.id || "current-user",
              name: user.name || "Developer",
              email: user.email || "",
              bio: user.bio || user.tagline || "",
              tagline: user.tagline || "",
              username: user.username || "",
              skills: (user.skills || []).map((s: any) => ({
                name: typeof s === "string" ? s : (s.name || ""),
                percentage: typeof s === "string" ? 0 : (s.percentage || 0),
                category: typeof s === "string" ? "programming" : (s.category || "programming"),
              })),
              techStack: user.techStack || [],
              quizResults: user.quizResults || [],
              socials: {
                github: user.socials?.github || "",
                linkedin: user.socials?.linkedin || "",
                twitter: user.socials?.twitter || "",
              },
              hasResume: !!user.resumeUrl,
            });
            return;
          }
        }
        // Fallback to app-level auth context user
        if (user) {
          setUserData({
            id: (user._id as string) || (user.id as string) || "current-user",
            name: (user.name as string) || "Developer",
            email: user.email as string | undefined,
            bio: user.bio as string | undefined,
            username: user.username as string | undefined,
            techStack: (user.techStack as string[]) || [],
            skills: [],
            socials: {},
          });
        }
      } catch (e) { }
    };
    loadData();
  }, [isDemo, user, isSelectionPreviewStep]);

  // Fetch PROJECTS
  useEffect(() => {
    // Keep template selection preview static; defer project fetching until build steps.
    if (isDemo || isSelectionPreviewStep) {
      setFetchedProjects([]);
      return;
    }
    const load = async () => {
      try {
        const res = await fetch("/api/projects?limit=50", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.projects) {
            setFetchedProjects(data.data.projects.map((p: any) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              technologies: p.technologies || [],
              imageUrl: p.imageUrl || null,
              isFeatured: p.featured || false,
              showcase: p.showcase || false,
            })));
          }
        }
      } catch (e) { }
    };
    load();
  }, [isDemo, isSelectionPreviewStep]);

  // Sync Job Role
  useEffect(() => {
    if (userData) {
      setDetectedJobRole({
        id: "detected",
        title: userData.tagline || "Software Developer",
        industry: "Tech",
        skills: userData.techStack || ["React"],
        experienceLevel: "mid",
        description: userData.bio || "Full-stack developer",
      });
    }
  }, [userData]);

  const handleStartOver = () => {
    setCurrentStep("landing");
    setSelectedTemplate(null);
    setDetectedJobRole(null);
    setUserPortfolio(null);
  };

  const handleResumeFile = async (file: File) => {
    setHasResumeFile(true);
    const kb = (file.size / 1024).toFixed(0);
    const sizeStr = file.size > 1048576 ? (file.size/1048576).toFixed(1) + ' MB' : kb + ' KB';
    setResumeFileData({ name: file.name, sizeStr });
    
    setIsGenerating(true);
    const fd = new FormData();
    fd.append('resume', file);
    try {
      const r = await fetch('/api/resume/upload', { method: 'POST', body: fd, credentials: 'include' });
      if (r.ok) toast.success("Resume processed!");
    } catch (e) { toast.error("Upload failed."); }
    finally { setIsGenerating(false); }
  };

  const generateFullPortfolio = async () => {
    if (!selectedTemplate || !userData) return;
    setIsGenerating(true);
    setPreparationProgress(5);

    if (linkedinUrl) {
      try {
        await fetch('/api/linkedin/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ url: linkedinUrl })
        });
      } catch (e) {
        toast.error("Failed to scrape LinkedIn profile. Proceeding anyway.");
      }
    }

    if (selectedTemplate.templateEngine === 'external') {
      try {
        await fetch('/api/auth/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ selectedTemplate: selectedTemplate.id }),
        });
        setPreparationProgress(100);
        setCurrentStep("customizer");
      } catch (e) { setCurrentStep("customizer"); }
      finally { setIsGenerating(false); }
      return;
    }

    try {
      const { PortfolioAIService } = await import("../services/portfolio-ai-service");
      const aiService = new PortfolioAIService();
      const projectsToUse = showcasedProjects;

      if (projectsToUse.length === 0) {
        toast.error("No showcased projects found. Please mark projects as showcased in the Showcase tab first.");
        setCurrentStep("preparation");
        setIsGenerating(false);
        return;
      }

      setPreparationProgress(20);
      const filledSections = await Promise.all((selectedTemplate.sections || []).map(async (section, idx, arr) => {
        if (section.type === 'header' || section.type === 'footer') return section;
        setPreparationProgress(Math.floor(20 + (idx / arr.length) * 70));
        setCurrentTypingSection(section.type.toUpperCase());
        try {
          const content = await aiService.generatePortfolioContent(section.type, detectedJobRole!, userData, projectsToUse);
          return { ...section, content, isVisible: true };
        } catch (e) { return section; }
      }));

      setPreparationProgress(100);
      const portfolio: UserPortfolio = {
        id: `p-${Date.now()}`,
        userId: userData.id,
        templateId: selectedTemplate.id,
        sections: filledSections,
        customizations: { colors: { primary: '#3b82f6', secondary: '#1e40af', accent: '#8b5cf6', background: '#ffffff', text: '#1f2937' }, fonts: { heading: 'Inter', body: 'Inter' }, layout: { spacing: 'normal', alignment: 'left' }, socialLinks: [] },
        createdAt: new Date(), updatedAt: new Date()
      };
      setUserPortfolio(portfolio);
      filledSections.forEach(s => dispatch(changeWebsitePageComponentContent({ componentId: s.id, content: s.content, merge: true })));
      dispatch(setSections(filledSections));
      dispatch(updateUserData(userData as any));
      setCurrentStep("customizer");
    } catch (e) { toast.error("Generation failed."); }
    finally { setIsGenerating(false); }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "landing":
        return <PortfolioSelector userData={userData} projects={fetchedProjects.length > 0 ? fetchedProjects : projects} onTemplateSelect={(t) => {
          if (isDemo) setShowLoginModal(true);
          else {
            setSelectedTemplate(t);
            dispatch(selectTemplate(t.id)); // Sync to Redux
            setCurrentStep("template-preview");
          }
        }} isDemo={isDemo} />;

      case "template-preview":
        return (
          <div className="w-full h-full flex flex-col bg-gray-50/50 dark:bg-gray-900/50">
            {selectedTemplate && (
              <>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between sticky top-0 z-20">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep("landing")} className="gap-2 -ml-2">
                      <ArrowLeft size={16} /> Templates
                    </Button>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />
                    <div className="hidden sm:block">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{selectedTemplate.name}</h3>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Preview Mode</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleStartOver} className="rounded-full text-xs">
                      Start Over
                    </Button>
                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
                    <Button
                      onClick={() => setCurrentStep("preparation")}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-9 text-sm font-bold shadow-lg shadow-blue-500/20 gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      Use Template
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800">
                  <div className="flex-1 relative group flex flex-col overflow-hidden">
                    {selectedTemplate.templateEngine === 'external' && selectedTemplate.previewUrl ? (
                      <iframe
                        src={selectedTemplate.previewUrl}
                        className="w-full h-full border-0"
                        title="Template Preview"
                      />
                    ) : (
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <PortfolioDemoPreview
                          templateId={selectedTemplate.id}
                          userData={previewData.userData}
                          projects={previewData.projects}
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case "preparation":
        return (
          <div className="flex flex-col items-center flex-1 px-4 py-8 sm:px-6 sm:py-10 no-scrollbar" style={{ backgroundColor: '#F7F6F3', fontFamily: "'DM Sans', sans-serif", msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              :root {
                --bg:         #F7F6F3;
                --surface:    #FFFFFF;
                --border:     rgba(0,0,0,0.07);
                --border-mid: rgba(0,0,0,0.11);
                --text-1:     #111110;
                --text-2:     #6B6860;
                --text-3:     #9E9C97;
                --accent:     #2B5EE8;
                --accent-dim: rgba(43,94,232,0.08);
                --accent-dim2:rgba(43,94,232,0.15);
                --green:      #14A05C;
                --green-bg:   rgba(20,160,92,0.08);
                --radius-sm:  6px;
                --radius:     10px;
                --radius-lg:  16px;
                --shadow-sm:  0 1px 2px rgba(0,0,0,0.06);
                --shadow:     0 2px 8px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.06);
                --shadow-lg:  0 8px 24px rgba(0,0,0,0.09), 0 0 1px rgba(0,0,0,0.05);
              }
              .prep-card { background: var(--surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); width: 100%; max-width: 672px; overflow: hidden; animation: rise 0.5s cubic-bezier(0.16,1,0.3,1) both; }
              @keyframes rise { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
              .prep-header { padding: 20px 24px 0; }
              .prep-header-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
              .prep-icon-mark { width: 34px; height: 34px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
              .prep-product-label { font-size: 11.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); }
              .prep-h1 { font-family: 'Instrument Serif', Georgia, serif; font-size: 24px; font-weight: 400; color: var(--text-1); line-height: 1.25; letter-spacing: -0.3px; margin: 0; }
              .prep-h1 em { font-style: italic; color: var(--accent); }
              .prep-subtitle { margin-top: 4px; font-size: 13.5px; color: var(--text-2); font-weight: 300; line-height: 1.4; margin-bottom: 0; }
              .prep-progress-row { display: flex; align-items: center; gap: 10px; margin-top: 22px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
              .prep-progress-track { flex: 1; height: 3px; background: var(--border-mid); border-radius: 99px; overflow: hidden; }
              .prep-progress-fill { height: 100%; background: var(--accent); border-radius: 99px; transition: width 0.6s cubic-bezier(0.16,1,0.3,1); }
              .prep-progress-label { font-size: 12px; color: var(--text-3); white-space: nowrap; }
              .prep-body { padding: 0 24px; }
              .prep-section { padding: 16px 0; border-bottom: 1px solid var(--border); }
              .prep-section:last-child { border-bottom: none; }
              .prep-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
              .prep-section-label { font-size: 11.5px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-3); }
              .prep-stat-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--green-bg); color: var(--green); font-size: 12px; font-weight: 500; padding: 3px 9px; border-radius: 99px; animation: fadeIn 0.4s 0.3s both; }
              @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
              .prep-stat-badge::before { content: ''; width: 6px; height: 6px; background: var(--green); border-radius: 50%; display: block; }
              .prep-projects-row { display: flex; align-items: center; gap: 12px; }
              .prep-projects-icon { width: 36px; height: 36px; background: var(--bg); border-radius: var(--radius-sm); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
              .prep-projects-icon svg { width:16px; height:16px; color: var(--text-2); }
              .prep-projects-info { flex: 1; text-align: left; }
              .prep-projects-name { font-size: 14px; font-weight: 500; color: var(--text-1); }
              .prep-projects-sub { font-size: 12px; color: var(--text-3); margin-top: 1px; }
              .prep-field { display: flex; flex-direction: column; gap: 6px; text-align: left; }
              .prep-field label { font-size: 12.5px; font-weight: 500; color: var(--text-2); }
              .prep-input-wrap { position: relative; display: flex; align-items: center; }
              .prep-input-wrap svg.prep-input-icon { position: absolute; left: 12px; width: 15px; height: 15px; color: var(--text-3); pointer-events: none; flex-shrink: 0; }
              .prep-input-wrap input { width: 100%; height: 40px; padding: 0 12px 0 36px; background: var(--bg); border: 1px solid var(--border-mid); border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; color: var(--text-1); outline: none; transition: border-color 0.15s, box-shadow 0.15s, background 0.15s; -webkit-appearance: none; }
              .prep-input-wrap input::placeholder { color: var(--text-3); }
              .prep-input-wrap input:focus { background: var(--surface); border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
              .prep-field-helper { font-size: 12px; color: var(--text-3); line-height: 1.4; }
              .prep-upload-zone { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--bg); border: 1.5px dashed var(--border-mid); border-radius: var(--radius); cursor: pointer; transition: border-color 0.15s, background 0.15s; position: relative; }
              .prep-upload-zone:hover { border-color: var(--accent); background: var(--accent-dim); }
              .prep-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
              .prep-upload-icon-wrap { width: 38px; height: 38px; background: var(--surface); border-radius: var(--radius-sm); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: var(--shadow-sm); transition: box-shadow 0.15s; }
              .prep-upload-zone:hover .prep-upload-icon-wrap { box-shadow: var(--shadow); }
              .prep-upload-icon-wrap svg { width: 16px; height: 16px; color: var(--text-2); }
              .prep-upload-text { flex: 1; text-align: left; }
              .prep-upload-title { font-size: 13.5px; font-weight: 500; color: var(--text-1); }
              .prep-upload-sub { font-size: 12px; color: var(--text-3); margin-top: 1px; }
              .prep-upload-cta { font-size: 12px; font-weight: 500; color: var(--accent); white-space: nowrap; }
              .prep-upload-zone.uploaded { border-style: solid; border-color: var(--green); background: var(--green-bg); }
              .prep-upload-zone.uploaded .prep-upload-icon-wrap { border-color: rgba(20,160,92,0.2); }
              .prep-upload-zone.uploaded svg.file-icon { color: var(--green); }
              .prep-file-name { font-size: 13.5px; font-weight: 500; color: var(--text-1); }
              .prep-file-size { font-size: 12px; color: var(--text-3); margin-top: 1px; }
              .prep-check-badge { width: 22px; height: 22px; background: var(--green); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
              .prep-check-badge svg { width: 12px; height: 12px; }
              .prep-footer { padding: 16px 24px 20px; }
              .prep-cta-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 44px; background: var(--accent); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 500; letter-spacing: -0.1px; border: none; border-radius: var(--radius); cursor: pointer; transition: background 0.15s, transform 0.12s, box-shadow 0.15s; box-shadow: 0 1px 2px rgba(43,94,232,0.3), 0 4px 12px rgba(43,94,232,0.18); position: relative; overflow: hidden; }
              .prep-cta-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent); pointer-events: none; }
              .prep-cta-btn:hover { background: #1f4fd6; box-shadow: 0 1px 2px rgba(43,94,232,0.4), 0 6px 16px rgba(43,94,232,0.24); transform: translateY(-1px); }
              .prep-cta-btn:active { transform: translateY(0); }
              .prep-cta-hint { text-align: center; margin-top: 11px; font-size: 12px; color: var(--text-3); margin-bottom: 0; }
            `}</style>
            
            <div className="prep-card">
              <div className="prep-header">
                <div className="prep-header-meta">
                  <div className="prep-icon-mark">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2L10 6H14L11 9L12 13L8 10.5L4 13L5 9L2 6H6L8 2Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h1 className="prep-h1">Prepare your <em>portfolio</em></h1>
                <p className="prep-subtitle">Connect your sources. We'll handle the rest before your session starts.</p>
              </div>

              <div className="prep-body">
                <div className="prep-section">
                  <div className="prep-section-header">
                    <span className="prep-section-label">Projects</span>
                    <span className="prep-stat-badge">{showcasedProjects.length} showcased</span>
                  </div>
                  <div className="prep-projects-row">
                    <div className="prep-projects-icon">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="3" width="14" height="10" rx="2"/>
                        <path d="M5 3V2.5C5 1.67 5.67 1 6.5 1H9.5C10.33 1 11 1.67 11 2.5V3"/>
                        <line x1="1" y1="7" x2="15" y2="7"/>
                      </svg>
                    </div>
                    <div className="prep-projects-info">
                      <div className="prep-projects-name">GitHub Projects</div>
                      <div className="prep-projects-sub">Repositories, contributions & activity</div>
                    </div>
                  </div>
                </div>

                <div className="prep-section">
                  <div className="prep-section-header">
                    <span className="prep-section-label">Profile Sources</span>
                  </div>
                  <div className="prep-field" style={{ marginBottom: '16px' }}>
                    <label htmlFor="linkedin">LinkedIn Profile</label>
                    <div className="prep-input-wrap">
                      <svg className="prep-input-icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2h3.5v11.5H2V2zM3.75 1a1.75 1.75 0 110 3.5A1.75 1.75 0 013.75 1zM7 6.5h3.3v1.6h.05C10.85 7 11.9 6.3 13.4 6.3c2.6 0 3.1 1.7 3.1 3.9v4.3H13v-3.8c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v3.9H7V6.5z"/>
                      </svg>
                      <input type="text" id="linkedin" placeholder="linkedin.com/in/your-handle" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                    </div>
                    <span className="prep-field-helper">Used to pull your experience, skills & endorsements.</span>
                  </div>

                  <div className="prep-field">
                    <label>Résumé</label>
                    <div className={`prep-upload-zone ${hasResumeFile ? 'uploaded' : ''}`} onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }} onDragLeave={(e) => { e.preventDefault(); if (!hasResumeFile) { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = ''; } }} onDrop={async (e) => { e.preventDefault(); const file = e.dataTransfer.files?.[0]; if (file && file.type === 'application/pdf') { handleResumeFile(file); } else { e.currentTarget.style.borderColor = 'tomato'; setTimeout(() => { if(e.currentTarget) e.currentTarget.style.borderColor = ''; }, 1200); } }}>
                      <input type="file" accept=".pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleResumeFile(f); }} />
                      <div className="prep-upload-icon-wrap">
                        <svg className="file-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', color: hasResumeFile ? 'var(--green)' : 'var(--text-2)' }}>
                          <path d="M9 1H3.5C2.67 1 2 1.67 2 2.5v11c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5V6L9 1z"/>
                          <polyline points="9 1 9 6 14 6"/>
                        </svg>
                      </div>
                      <div className="prep-upload-text">
                        {!hasResumeFile ? (
                          <>
                            <div className="prep-upload-title">Upload résumé (PDF)</div>
                            <div className="prep-upload-sub">Adds achievements & context to your profile</div>
                          </>
                        ) : (
                          <>
                            <div className="prep-file-name">{resumeFileData?.name || "Resume uploaded"}</div>
                            <div className="prep-file-size">{resumeFileData?.sizeStr || ""}</div>
                          </>
                        )}
                      </div>
                      {!hasResumeFile && <span className="prep-upload-cta">Browse</span>}
                      {hasResumeFile && (
                        <div className="prep-check-badge">
                          <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3"/></svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="prep-footer">
                <button className="prep-cta-btn" onClick={generateFullPortfolio} disabled={isGenerating}>
                  {isGenerating ? (
                    <Sparkles className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px', flexShrink: 0 }}>
                      <path d="M8 1.5L9.8 5.7H14.3L10.8 8.3L12.1 12.5L8 9.9L3.9 12.5L5.2 8.3L1.7 5.7H6.2L8 1.5Z"/>
                    </svg>
                  )}
                  {isGenerating ? "Preparing..." : "Launch AI Engine"}
                </button>
                <p className="prep-cta-hint">Your data stays private and is never stored beyond this session.</p>
              </div>
            </div>
          </div>
        );

      case "customizer":
        return (
          <div className="w-full h-full">
            {selectedTemplate && (
              <ModernPortfolioEditor
                template={selectedTemplate}
                userData={userData || { id: "user", name: "Dev", skills: [], socials: {} }}
                projects={showcasedProjects}
                jobRole={detectedJobRole}
                onSave={async () => {
                  if (!selectedTemplate) return;
                  const res = await fetch("/api/portfolio/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ templateId: selectedTemplate.id, userId: userData?.id, userData, projects: showcasedProjects }) });
                  const d = await res.json();
                  if (d.success && d.url) window.open(d.url, '_blank');
                }}
                onPublish={async () => { }}
                onClose={() => setCurrentStep("template-preview")}
              />
            )}
          </div>
        );

      case "preview":
        return (
          <div className="w-full h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between"><h2 className="font-bold">Portfolio Live Preview</h2><Button onClick={() => window.open(userPortfolio?.deploymentUrl, '_blank')}>View Site</Button></div>
            <iframe src={userPortfolio?.deploymentUrl} className="flex-1 w-full border-0" />
          </div>
        );
      default: return null;
    }
  };

  return (
    <UnifiedLayout activePage="portfolio" showSidebar={currentStep !== 'customizer'} showAuthButtons={isDemo}>
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
        {currentStep !== "landing" && currentStep !== "customizer" && currentStep !== "template-preview" && (
          <div className="px-6 py-3 border-b flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setCurrentStep("landing")} className="gap-2"><ArrowLeft size={16} /> Back</Button>
            <Button variant="outline" size="sm" onClick={handleStartOver}>Start Over</Button>
          </div>
        )}
        <div className={`flex-1 flex flex-col min-h-0 ${(currentStep === "template-preview" || currentStep === "customizer") ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"}`}>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
              <div className="relative"><div className="absolute -inset-4 bg-blue-500/20 blur-2xl animate-pulse rounded-full" /><div className="relative w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border"><Sparkles className="w-10 h-10 text-blue-600 animate-pulse" /></div></div>
              <div className="text-center font-bold text-2xl">Crafting Your Identity</div>
              <p className="text-gray-500">{currentTypingSection ? `Building ${currentTypingSection}...` : "Optimizing metadata..."}</p>
              <div className="w-full max-w-sm space-y-2"><div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all" style={{ width: `${preparationProgress}%` }} /></div><div className="flex justify-between text-[10px] uppercase font-bold text-gray-400"><span>Progress</span><span>{preparationProgress}%</span></div></div>
              <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"><Zap size={14} /> AI is perfecting your narrative</div>
            </div>
          ) : renderStep()}
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onLoginSuccess={() => (window.location.href = '/login')} />
    </UnifiedLayout>
  );
}
