import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Sparkles,
  ArrowLeft,
  Zap,
  FileText,
  Download,
  Share2,
  History,
  CheckCircle2,
} from "lucide-react";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { useAuth } from "@/contexts/useAuth";
import { ResumeModern } from "@/components/portfolio/templates/resume/ResumeModern";
import { ResumeMinimal } from "@/components/portfolio/templates/resume/ResumeMinimal";
import { LoginModal } from "@/components/auth/LoginModal";
import { ResumeTemplatesPanel } from "@/components/portfolio/editor/panels/ResumeTemplatesPanel";
import { BlockSettingsPanel } from "@/components/portfolio/editor/panels/BlockSettingsPanel";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ResumeStep = "landing" | "preparation" | "editor" | "preview";

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
  category: "modern" | "minimal" | "professional" | "creative";
  isPopular?: boolean;
}

const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Sleek sidebar layout with high technical focus and skill visualization.",
    category: "modern",
    isPopular: true,
  },
  {
    id: "minimal",
    name: "Minimalist Clean",
    description: "Traditional one-column layout optimized for ATS and readability.",
    category: "minimal",
  },
  {
      id: "professional",
      name: "Executive Impact",
      description: "Designed for senior roles emphasizing leadership and measurable impact.",
      category: "professional",
  },
  {
      id: "creative",
      name: "Designer Edge",
      description: "Bold typography and creative layouts for designers and frontend experts.",
      category: "creative",
  }
];

export default function ResumeBuilder({ isDemo = false }: { isDemo?: boolean }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  // Auto-redirect from demo to main route if already logged in - wait for stability
  useEffect(() => {
    if (isDemo && isAuthenticated && !isLoading) {
      navigate("/resume", { replace: true });
    }
  }, [isDemo, isAuthenticated, isLoading, navigate]);

  const [currentStep, setCurrentStep] = useState<ResumeStep>("landing");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [preparationProgress, setPreparationProgress] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sections" | "templates">("sections");

  // Mock user data for the resume - Use generic defaults if NOT authenticated
  const [userData] = useState<any>({
    name: isAuthenticated ? (user?.name || "Kanishk Singh") : "Demo User",
    email: isAuthenticated ? (user?.email || "kanishk@example.com") : "demo@showwork.ai",
    title: isAuthenticated ? (user?.title || "Software Developer") : "Full-stack Developer",
    bio: "Full-stack developer with experience in modern web technologies including React, Node.js, and TypeScript.",
    techStack: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB"],
    experience: [
      {
        companyName: "TechCorp",
        title: "Senior Developer",
        startDate: "2021",
        endDate: "Present",
        description: "Leading the frontend team and architecting core product features.",
      },
    ],
    education: [
      {
        schoolName: "University of Technology",
        degreeName: "B.S. in Computer Science",
        description: "Specialized in Distributed Systems.",
      },
    ],
  });

  const categories = [
    { id: "all", label: "All" },
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
    { id: "professional", label: "Professional" },
    { id: "creative", label: "Creative" },
  ];

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "all") return RESUME_TEMPLATES;
    return RESUME_TEMPLATES.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  const handleStartBuilding = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setCurrentStep("preparation");
    setPreparationProgress(0);
    
    // Simulate AI preparation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep("editor");
        }, 500);
      }
      setPreparationProgress(progress);
    }, 200);
  };

  // Robust mock data for high-quality template previews
  const PREVIEW_MOCK_DATA = {
    name: "Alex Rivera",
    title: "Senior Full Stack Engineer",
    email: "alex.rivera@example.com",
    bio: "Visionary Full Stack Engineer with 8+ years of experience in architecting scalable web applications. Expert in React ecosystems, Node.js microservices, and cloud-native deployments. Proven track record of leading high-performing teams to deliver mission-critical software solutions that drive user engagement and business growth.",
    techStack: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "PostgreSQL", "Next.js"],
    experience: [
      {
        companyName: "CloudScale Solutions",
        title: "Lead Systems Architect",
        startDate: "2020",
        endDate: "Present",
        description: "Orchestrated the migration of legacy monolithic architecture to high-performance microservices, resulting in a 40% reduction in server costs and 2x faster deployment cycles. Mentored a team of 12 engineers and established core development standards.",
      },
      {
        companyName: "Innovate Digital",
        title: "Senior Full Stack Developer",
        startDate: "2017",
        endDate: "2020",
        description: "Spearheaded the development of a real-time data visualization platform used by Fortune 500 clients. Optimized frontend performance reducing TBT by 60% and improved search rankings through advanced SSR techniques.",
      }
    ],
    education: [
      {
        schoolName: "Stanford University",
        degreeName: "M.S. in Computer Science",
        description: "Concentration in Distributed Systems and Human-Computer Interaction.",
      }
    ],
    socialLinks: {
      github: "arivera-dev",
      linkedin: "alexrivera-pro"
    }
  };

  const PREVIEW_MOCK_PROJECTS = [
    {
      name: "Nexus Framework",
      description: "An open-source reactive state management library with over 15k monthly downloads.",
      resumeBullet: "Engineered a high-performance state management library using Proxy-based observation, achieving 30% faster updates than industry standards.",
      technologies: ["TypeScript", "Monorepo", "CI/CD"]
    },
    {
      name: "EcoPay Gateway",
      description: "A secure, blockchain-integrated payment processor for sustainable commerce.",
      resumeBullet: "Architected a secure payment gateway processing $2M+ in monthly transactions with 99.99% uptime and zero security breaches.",
      technologies: ["Node.js", "Solidity", "Redis"]
    }
  ];

  const renderLanding = () => (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8 overflow-y-auto no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      {/* Header (EXACT MATCH) */}
      <header className="text-center mb-8 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Choose Your Style
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Your Resume tells a story. Choose how it's presented to recruiters and hiring managers.
        </p>
      </header>

      {/* Detected Job Role Card (EXACT MATCH) - Only show if authenticated */}
      {isAuthenticated && (
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
                {userData.title}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                Full-stack developer with experience in modern web technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {userData.techStack.map((tech: string) => (
                  <span key={tech} className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Domain Tabs (EXACT MATCH) */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-2 p-1 bg-white dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 max-w-full px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

        {/* Template Grid (EXACT MATCH) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
           {/* Blank Canvas */}
           <div className="group flex flex-col gap-3 cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginModal(true);
                    return;
                  }
                  // Start blank canvas logic if any
                }}>
            <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Blank Canvas</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Start from scratch with a clean slate</p>
            </div>
            <div className="aspect-[3.6/4] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 transition-colors">
                    <FileText className="w-8 h-8" />
                </div>
            </div>
          </div>

          {filteredTemplates.map((template) => (
            <div key={template.id} className="group flex flex-col gap-3 cursor-pointer" 
                 onClick={() => { 
                   if (!isAuthenticated) {
                     setShowLoginModal(true);
                     return;
                   }
                   setSelectedTemplate(template.id); 
                   handleStartBuilding(); 
                 }}>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-0.5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{template.name}</h3>
                  {template.isPopular && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                      <Sparkles className="w-2 h-2" />
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{template.description}</p>
              </div>
              
              <div 
                className={`aspect-[3.6/4] relative rounded-xl border transition-all duration-300 overflow-hidden ${
                  selectedTemplate === template.id 
                    ? "border-emerald-500 ring-2 ring-emerald-500/20" 
                    : "border-slate-200 dark:border-slate-800 group-hover:shadow-lg group-hover:-translate-y-1"
                }`}
              >
                {/* Template Preview Content - FILLED WITH MOCK DATA */}
                <div className="w-full h-full bg-[#f8fafc] dark:bg-slate-900 p-4">
                   <div className="w-full h-full border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden relative">
                      <div className="p-4 scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none">
                          {template.id === 'modern' ? (
                              <ResumeModern userData={PREVIEW_MOCK_DATA} projects={PREVIEW_MOCK_PROJECTS} />
                          ) : (
                              <ResumeMinimal userData={PREVIEW_MOCK_DATA} projects={PREVIEW_MOCK_PROJECTS} />
                          )}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
                         <Button className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all bg-white text-slate-900 hover:bg-white rounded-full px-6 shadow-xl font-bold border border-slate-200">
                             Use Style
                         </Button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );

  const renderPreparation = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#F7F6F3] dark:bg-slate-950 p-6 no-scrollbar">
       <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-6 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Preparing Your Resume</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">AI is tailoring your content to perfection...</p>
            
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 ease-out" 
                style={{ width: `${preparationProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Processing</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{Math.round(preparationProgress)}%</span>
            </div>
          </div>
       </div>
    </div>
  );

  const renderEditor = () => (
    <div className="flex h-full bg-slate-50 dark:bg-slate-950">
      {/* Control Panel */}
      <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-sm z-10 transition-all duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={() => setCurrentStep("landing")} className="gap-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
              <ArrowLeft size={16} /> Styles
          </Button>
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Editor</h3>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab("sections")}
                  className={`p-1.5 rounded-md transition-all ${activeTab === "sections" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500"}`}
                  title="Edit Sections"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab("templates")}
                  className={`p-1.5 rounded-md transition-all ${activeTab === "templates" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500"}`}
                  title="Switch Template"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          {activeTab === "sections" ? (
            <>
              {activeSection ? (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveSection(null)} 
                    className="mb-4 text-xs text-blue-600 font-bold hover:text-blue-700 p-0 h-auto"
                  >
                    <ArrowLeft className="w-3 h-3 mr-1" /> BACK TO ALL SECTIONS
                  </Button>
                  <BlockSettingsPanel 
                    activeSection={{
                        id: activeSection,
                        type: activeSection === 'PersonalInfo' ? 'about' : (activeSection === 'SkillsResume' ? 'skills' : 'resume'),
                        variant: activeSection,
                        customData: {
                          ...userData,
                          experiences: userData.experience,
                          educations: userData.education
                        }
                    }} 
                  />
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
                      AI is monitoring your changes to ensure ATS compatibility and professional tone.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Quick Tools</h4>
                      <Button className="w-full justify-start gap-3 bg-indigo-600 text-white hover:bg-indigo-700 border-0 shadow-lg shadow-indigo-500/20 h-11 rounded-xl">
                          <Zap className="w-4 h-4" />
                          <span className="text-xs">Enhance with AI</span>
                      </Button>
                  </div>

                  <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Resume Sections</h4>
                      {[
                        { id: "PersonalInfo", label: "Personal Info" },
                        { id: "ExperienceResume", label: "Experience" },
                        { id: "EducationResume", label: "Education" },
                        { id: "SkillsResume", label: "Skills & Expertise" }
                      ].map(section => (
                           <div 
                            key={section.id} 
                            onClick={() => setActiveSection(section.id)}
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer group"
                          >
                              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{section.label}</span>
                              <div className="w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-500 transition-all" />
                              </div>
                           </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="animate-in slide-in-from-left-4 duration-300">
              <ResumeTemplatesPanel />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl h-14 font-bold gap-3 shadow-xl group">
              <Download className="w-5 h-5 group-hover:bounce" />
              Download PDF
          </Button>
        </div>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
             <div className="flex items-center gap-4">
                <div className="text-xs font-bold px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">LIVE PREVIEW</div>
                <span className="text-slate-400 dark:text-slate-600 text-sm italic">Changes are saved automatically</span>
             </div>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full gap-2 border-slate-200 dark:border-slate-800">
                    <Share2 size={14} /> Share Link
                </Button>
                <Button variant="outline" size="sm" className="rounded-full gap-2 border-slate-200 dark:border-slate-800">
                    <History size={14} /> Versions
                </Button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-200/40 dark:bg-slate-950/40 no-scrollbar">
              <div className="w-full max-w-[850px] bg-white shadow-2xl rounded-sm aspect-[1/1.414] overflow-hidden sticky top-8">
                  {selectedTemplate === "modern" ? (
                      <ResumeModern userData={userData} projects={[]} />
                  ) : (
                      <ResumeMinimal userData={userData} projects={[]} />
                  )}
              </div>
          </div>
      </main>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case "landing": return renderLanding();
      case "preparation": return renderPreparation();
      case "editor": return renderEditor();
      default: return renderLanding();
    }
  };

  return (
    <UnifiedLayout activePage="resume" isDemo={isDemo}>
      <div className="flex-1 h-full overflow-hidden flex flex-col">
        {renderStep()}
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        title="Ready to build your Resume?"
        description="Join thousands of developers who have landed their dream jobs. Log in or create an account to start building with any of our professional templates."
      />
    </UnifiedLayout>
  );
}
