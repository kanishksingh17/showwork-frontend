import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Sparkles,
  ArrowLeft,
  FileText,
  Rocket,
  Layout as LucideLayout,
  Zap,
  Linkedin,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import type { PortfolioTemplate, UserPortfolio, JobRole } from "../types/portfolio";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { PortfolioSelector } from "../components/portfolio/PortfolioSelector";
import { PortfolioTemplateInner } from "../components/portfolio/templates/PortfolioTemplate";
import { ModernPortfolioEditor } from "../components/portfolio/ModernPortfolioEditor";
import { LoginModal } from "@/components/auth/LoginModal";
import { usePortfolioDispatch } from "@/store/portfolio/hooks";
import { setSections, updateUserData, changeWebsitePageComponentContent } from "@/store/portfolio/portfolioSlice";

type BuilderStep = "landing" | "template-preview" | "preparation" | "customizer" | "preview";

interface PortfolioBuilderProps {
  isDemo?: boolean;
}

export default function PortfolioBuilder({ isDemo = false }: PortfolioBuilderProps) {
  const dispatch = usePortfolioDispatch();
  const [currentStep, setCurrentStep] = useState<BuilderStep>("landing");
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null);
  const [detectedJobRole, setDetectedJobRole] = useState<JobRole | null>(null);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTypingSection, setCurrentTypingSection] = useState("");
  const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [preparationProgress, setPreparationProgress] = useState(0);

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
    if (isDemo) {
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
        // Fallback
        const authRes = await fetch("/api/auth/me", { credentials: "include" });
        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData.success && authData.user) {
            const user = authData.user;
            setUserData({ id: user._id || user.id || "current-user", name: user.name || "Developer", skills: [], socials: {} });
          }
        }
      } catch (e) { }
    };
    loadData();
  }, [isDemo]);

  // Fetch PROJECTS
  useEffect(() => {
    if (isDemo) { setFetchedProjects([]); return; }
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
  }, [isDemo]);

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

  const generateFullPortfolio = async () => {
    if (!selectedTemplate || !userData) return;
    setIsGenerating(true);
    setPreparationProgress(5);

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
      const projectsToUse = fetchedProjects.length > 0 ? fetchedProjects : projects;

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
          else { setSelectedTemplate(t); setCurrentStep("template-preview"); }
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
                  <div className="flex-1 relative group">
                    {selectedTemplate.previewUrl ? (
                      <iframe
                        src={
                          selectedTemplate.id === 'recommended-fullstack'
                            ? selectedTemplate.previewUrl
                            : `${selectedTemplate.previewUrl}?username=raj-singh`
                        }
                        className="w-full h-full border-0"
                        title="Template Preview"
                      />
                    ) : (
                      <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 custom-scrollbar">
                        <PortfolioTemplateInner userData={userData} projects={fetchedProjects.length > 0 ? fetchedProjects : projects} />
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
          <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white"><Rocket /></div>
                <div><h2 className="text-2xl font-bold">Prepare Your Portfolio</h2><p className="text-gray-500">Fast review before we launch the AI.</p></div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-xl bg-gray-50 border"><div className="flex items-center gap-2 font-bold text-gray-700"><LucideLayout size={18} className="text-emerald-500" /> Projects</div><span className="text-xs text-gray-500">{fetchedProjects.length} Synced</span></div>
                <div className="p-4 rounded-xl bg-gray-50 border"><div className="flex items-center gap-2 font-bold text-gray-700"><Linkedin size={18} className="text-blue-500" /> LinkedIn</div><span className="text-xs text-gray-500">{userData?.socials?.linkedin ? 'Connected' : 'Missing'}</span></div>
              </div>
              <div className="mb-8 p-10 border-2 border-dashed rounded-3xl flex flex-col items-center gap-4 relative bg-gray-50">
                <FileText className="w-10 h-10 text-blue-600" /><div className="text-center"><h3 className="font-bold">Upload Resume (PDF)</h3><p className="text-xs text-gray-500">Enhance AI context with your achievements.</p></div>
                <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer" onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  setIsGenerating(true);
                  const fd = new FormData(); fd.append('resume', f);
                  try {
                    const r = await fetch('/api/resume/upload', { method: 'POST', body: fd, credentials: 'include' });
                    if (r.ok) toast.success("Resume processed!");
                  } catch (e) { toast.error("Upload failed."); }
                  finally { setIsGenerating(false); }
                }} />
              </div>
              <Button onClick={generateFullPortfolio} className="w-full h-14 rounded-2xl bg-blue-600 gap-2 font-bold"><Sparkles /> Launch AI Engine</Button>
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
                projects={fetchedProjects.length > 0 ? fetchedProjects : projects}
                jobRole={detectedJobRole}
                onSave={async () => {
                  if (!selectedTemplate) return;
                  const res = await fetch("/api/portfolio/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ templateId: selectedTemplate.id, userId: userData?.id, userData, projects: fetchedProjects }) });
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
        <div className={`flex-1 flex flex-col min-h-0 ${currentStep === "template-preview" ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"}`}>
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
