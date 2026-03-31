import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  CheckCircle,
  Info,
  Image,
  Code,
  Zap,
  Group,
  Cloud,
  X,
  Plus,
  UserPlus,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FileText,
  Loader2,
  Github,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import MediaUploader from "@/components/media/MediaUploader";
import type { MediaFile } from "@/types/project";
import GitHubScraper from "@/components/GitHubScraper";
import { UnifiedLayout } from "@/components/UnifiedLayout";
import { toast } from "sonner";

interface ProjectFormData {
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string;
  features: string[];
  teamMembers: string[];
  mediaUrl?: string;
  customUrl?: string;
  commentsEnabled?: boolean;
  publicVisibility?: boolean;
  status?: string;
}

// MediaFile interface is now imported from @/types/project

export default function ManualProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const effectiveId = id || location.state?.projectData?.id || location.state?.projectData?._id;
  const isEdit = Boolean(effectiveId);

  const [currentSection, setCurrentSection] = useState(0);
  const [isScraping, setIsScraping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [enhancingFieldName, setEnhancingFieldName] = useState<string | null>(null);

  // Initialize from location state if available (for GitHub import)
  const initialData = location.state?.projectData ? {
    name: location.state.projectData.name || "",
    description: location.state.projectData.description || "",
    githubUrl: location.state.projectData.githubUrl || "",
    liveUrl: location.state.projectData.liveUrl || "",
    techStack: Array.isArray(location.state.projectData.technologies)
      ? location.state.projectData.technologies.map((t: any) => typeof t === 'string' ? t : t.name).join(", ")
      : (location.state.projectData.techStack || ""),
    features: location.state.projectData.features || location.state.projectData.tags || [],
    teamMembers: location.state.projectData.teamMembers || [],
    mediaUrl: location.state.projectData.image || location.state.projectData.mediaUrl || "",
    customUrl: "",
    commentsEnabled: true,
    publicVisibility: true,
    status: location.state.projectData.status || "draft",
  } : {
    name: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    techStack: "",
    features: [],
    teamMembers: [],
    customUrl: "",
    commentsEnabled: true,
    publicVisibility: true,
    status: "draft",
  };

  const initialDataRef = useRef(initialData);

  const [formData, setFormData] = useState<ProjectFormData>(
    initialDataRef.current,
  );
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaUrl, setMediaUrl] = useState(initialDataRef.current.mediaUrl || "");

  // Load project for editing
  useEffect(() => {
    if (isEdit && id && !location.state?.projectData) {
      const fetchProject = async () => {
        setIsScraping(true);
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
          const res = await fetch(`${apiBaseUrl}/api/projects`, {
            credentials: 'include'
          });
          if (res.ok) {
            const result = await res.json();
            const projects = result.data?.projects || [];
            const project = projects.find((p: any) => p.id === effectiveId || p._id === effectiveId);
            if (project) {
              setFormData({
                name: project.title || project.name || "",
                description: project.description || "",
                githubUrl: project.githubUrl || "",
                liveUrl: project.liveUrl || "",
                techStack: Array.isArray(project.technologies)
                  ? project.technologies.map((t: any) => typeof t === 'string' ? t : t.name).join(", ")
                  : "",
                features: project.tags || project.features || [],
                teamMembers: project.teamMembers || [],
                customUrl: project.customUrl || "",
                commentsEnabled: project.commentsEnabled ?? true,
                publicVisibility: project.visibility === 'public',
                status: project.status || "draft",
              });
              setMediaUrl(project.image || "");
            }
          }
        } catch (err) {
          console.error("Failed to fetch project:", err);
        } finally {
          setIsScraping(false);
        }
      };
      fetchProject();
    }
  }, [isEdit, id, effectiveId, location.state]);

  const [newFeature, setNewFeature] = useState("");
  const [newTeamMember, setNewTeamMember] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [previewEnabled, setPreviewEnabled] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState("");
  const paletteQueryRef = useRef<HTMLInputElement | null>(null);
  const saveTimeoutRef = useRef<any>(null);
  const [particles, setParticles] = useState<
    Array<{ id: string; x: number; y: number; delay: number }>
  >([]);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [backendProjectId, setBackendProjectId] = useState<string | null>(effectiveId || null);
  const saveToBackendRef = useRef<(isPublishing?: boolean) => Promise<string | null>>(async () => null);

  // Manual save function for immediate persistence
  const saveDraft = useCallback(() => {
    const draftData = {
      formData,
      mediaFiles,
      mediaUrl,
      currentSection,
      completedSections,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("manual-project-draft", JSON.stringify(draftData));

    // Also save to backend (debounced)
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveToBackendRef.current();
    }, 1000);
  }, [
    completedSections,
    currentSection,
    formData,
    mediaFiles,
    mediaUrl,
  ]);

  // Simulate upload (for keyboard shortcut)
  const simulateUpload = useCallback(() => {
    const url = prompt("Paste an image or demo URL (simulated upload)");
    if (url) {
      setMediaUrl(url);
      saveDraft();
    }
  }, [saveDraft]);

  // Command palette commands
  const commands = [
    {
      id: "publish",
      title: "Publish Project",
      shortcut: "⌘P / Ctrl+P",
      handler: () => {
        setShowPublishModal(true);
        setIsPaletteOpen(false);
      },
    },
    {
      id: "upload",
      title: "Upload Media",
      shortcut: "⌘U / Ctrl+U",
      handler: () => {
        simulateUpload();
        setIsPaletteOpen(false);
      },
    },
    {
      id: "togglePreview",
      title: "Toggle Preview",
      shortcut: "⌘M / Ctrl+M",
      handler: () => {
        setPreviewEnabled((v) => !v);
        setIsPaletteOpen(false);
      },
    },
    {
      id: "save",
      title: "Save Draft",
      shortcut: "⌘S / Ctrl+S",
      handler: () => {
        saveDraft();
        showSaveNotification();
        setIsPaletteOpen(false);
      },
    },
  ];

  const sections = [
    { id: "project-info", label: "Project Info", icon: Info },
    { id: "media-demo", label: "Media & Demo", icon: Image },
    { id: "tech-stack", label: "Tech Stack", icon: Code },
    { id: "features", label: "Features", icon: Zap },
    { id: "team", label: "Team", icon: Group },
  ];

  // Enhanced auto-save functionality with immediate save on changes
  useEffect(() => {
    const autoSave = () => {
      const draftData = {
        formData,
        mediaFiles,
        mediaUrl,
        currentSection,
        completedSections,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("manual-project-draft", JSON.stringify(draftData));
    };

    // Save immediately on any change
    autoSave();

    // Also save periodically as backup
    const interval = setInterval(autoSave, 3000);
    return () => clearInterval(interval);
  }, [formData, mediaFiles, mediaUrl, currentSection, completedSections]);

  // Keyboard shortcuts
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const meta = e.ctrlKey || e.metaKey;
      // Open palette: Cmd/Ctrl+K
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen(true);
        setTimeout(() => paletteQueryRef.current?.focus(), 50);
        return;
      }
      // Publish: Cmd/Ctrl+P
      if (meta && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setShowPublishModal(true);
        return;
      }
      // Upload: Cmd/Ctrl+U
      if (meta && e.key.toLowerCase() === "u") {
        e.preventDefault();
        simulateUpload();
        return;
      }
      // Toggle Preview: Cmd/Ctrl+M
      if (meta && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setPreviewEnabled((v) => !v);
        return;
      }
      // Save Draft: Cmd/Ctrl+S
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveDraft();
        showSaveNotification();
        return;
      }
      // Close palette on Escape
      if (e.key === "Escape" && isPaletteOpen) {
        setIsPaletteOpen(false);
        setPaletteFilter("");
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    isPaletteOpen,
    formData,
    mediaFiles,
    mediaUrl,
    saveDraft,
    simulateUpload,
  ]);

  // Load draft on mount with enhanced restoration
  useEffect(() => {
    const savedDraft = localStorage.getItem("manual-project-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft.formData || initialDataRef.current);
        setMediaFiles(draft.mediaFiles || []);
        setMediaUrl(draft.mediaUrl || "");
        setCurrentSection(draft.currentSection || 0);
        setCompletedSections(draft.completedSections || []);

        // Show a subtle notification that draft was restored
        if (draft.timestamp) {
          const draftAge =
            new Date().getTime() - new Date(draft.timestamp).getTime();
          const hoursAgo = Math.floor(draftAge / (1000 * 60 * 60));
          if (hoursAgo > 0) {
            console.log(`Draft restored from ${hoursAgo} hour(s) ago`);
          }
        }
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Show save notification
  const showSaveNotification = () => {
    const el = document.createElement("div");
    el.textContent = "Draft saved";
    el.style.position = "fixed";
    el.style.right = "20px";
    el.style.bottom = "20px";
    el.style.padding = "10px 14px";
    el.style.background = "rgba(0,0,0,0.8)";
    el.style.color = "white";
    el.style.borderRadius = "8px";
    el.style.zIndex = "9999";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  };

  const handleInputChange = (
    field: keyof ProjectFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Save immediately on any input change
    setTimeout(() => saveDraft(), 100);

    // Remove auto-advance logic to prevent unwanted jumping between sections
    // Users can manually navigate between sections using the step buttons
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");

      // Save immediately after adding feature
      setTimeout(() => saveDraft(), 100);

      // Create particle effect
      createParticleBurst(300, 150);
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
    // Save immediately after removing feature
    setTimeout(() => saveDraft(), 100);
  };

  const addTeamMember = () => {
    if (
      newTeamMember.trim() &&
      !formData.teamMembers.includes(newTeamMember.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newTeamMember.trim()],
      }));
      setNewTeamMember("");

      // Save immediately after adding team member
      setTimeout(() => saveDraft(), 100);

      // Create particle effect
      createParticleBurst(350, 180);
    }
  };

  const removeTeamMember = (member: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m !== member),
    }));
    // Save immediately after removing team member
    setTimeout(() => saveDraft(), 100);
  };

  const handleMediaUpload = (files: MediaFile[]) => {
    setMediaFiles(files);
    // Save immediately after adding media files
    setTimeout(() => saveDraft(), 100);

    // Create particle effect on upload
    createParticleBurst(400, 200);
  };


  async function saveToBackend(isPublishing = false) {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      const technologies = formData.techStack
        ? formData.techStack.split(/[\n,]+/).map(tech => ({
          name: tech.trim(),
          category: 'Other',
          proficiency: 0
        })).filter(tech => tech.name.length > 0)
        : [];

      const imageUrl = mediaFiles.length > 0 && mediaFiles[0]?.url
        ? mediaFiles[0].url
        : mediaUrl || '';

      const projectPayload = {
        id: backendProjectId || undefined,
        title: formData.name || 'Untitled Project',
        name: formData.name || 'Untitled Project',
        description: formData.description || '',
        technologies: technologies,
        githubUrl: formData.githubUrl || '',
        liveUrl: formData.liveUrl || '',
        image: imageUrl,
        status: isPublishing ? 'published' : (formData.status || 'draft'),
        tags: formData.features || [],
        category: 'Web Development',
        visibility: formData.publicVisibility ? 'public' : 'private',
        mediaFiles: mediaFiles,
      };

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectPayload),
      });

      if (response.ok) {
        const result = await response.json();
        const savedProject = result.data?.project || result.project || result.data || {};
        const newId = savedProject.id || savedProject._id;
        if (newId) {
          setBackendProjectId(newId);
          return newId;
        }
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to save project to backend:", error);
      return null;
    }
  }

  saveToBackendRef.current = saveToBackend;

  // Handle GitHub scraping data
  const handleGitHubDataScraped = (data: {
    name: string;
    description: string;
    languages: Record<string, number>;
    topics: string[];
    homepage?: string;
  }) => {
    setIsScraping(true);

    // Auto-fill form fields from scraped data
    setFormData((prev) => ({
      ...prev,
      name: prev.name || data.name || "",
      description: prev.description || data.description || "",
      // Convert languages object to tech stack string
      techStack: prev.techStack || Object.keys(data.languages).slice(0, 5).join(", "),
      status: "pending_review",
    }));

    // Save immediately after scraping
    setTimeout(() => {
      saveDraft();
      saveToBackend(); // Also save to backend after scraping
      setIsScraping(false);
    }, 100);
  };

  const createParticleBurst = (x: number, y: number) => {
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: `particle-${Date.now()}-${i}`,
      x,
      y,
      delay: i * 50,
    }));
    setParticles((prev) => [...prev, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id)),
      );
    }, 1000);
  };

  const handleAIAnalyze = async () => {
    if (!formData.githubUrl) {
      toast.error("Please enter a GitHub URL first");
      return;
    }

    setIsAnalyzing(true);
    toast.info("AI Analysis started...");
    try {
      console.log("AI: Analyzing repo:", formData.githubUrl);
      const response = await fetch(`/api/ai/generate-from-repo?url=${encodeURIComponent(formData.githubUrl)}`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log("AI: Analysis response:", data);

      if (data.success && data.data) {
        const analysis = data.data;
        console.log("AI: Analysis data:", analysis);
        setFormData((prev) => ({
          ...prev,
          name: analysis.name || prev.name,
          description: analysis.description || analysis.summary || prev.description,
          techStack: analysis.techStack ? analysis.techStack.join(", ") : prev.techStack,
          features: Array.from(new Set([...prev.features, ...(analysis.features || [])])),
        }));
        toast.success("AI analysis complete! Fields pre-filled.");
        // Create success effect
        createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);
      } else {
        throw new Error(data.message || "Failed to analyze repository");
      }
    } catch (error) {
      console.error("AI Analysis Error:", error);
      toast.error("AI analysis failed. Please fill manually.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAIEnhanceField = async (field: "name" | "description") => {
    const content = formData[field];
    if (!content) {
      toast.error(`Please enter some ${field} content first`);
      return;
    }

    setEnhancingFieldName(field);
    toast.info(`Enhancing project ${field}...`);
    try {
      console.log(`AI: Enhancing field ${field}:`, content);
      const response = await fetch("/api/ai/enhance-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ section: field, content }),
      });
      const data = await response.json();
      console.log("AI: Enhancement response:", data);

      if (data.success && data.data.section) {
        setFormData((prev) => ({
          ...prev,
          [field]: data.data.section,
        }));
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} enhanced!`);
        createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);
      } else {
        throw new Error(data.message || "Failed to enhance field");
      }
    } catch (error) {
      console.error("AI Enhancement Error:", error);
      toast.error("AI enhancement failed.");
    } finally {
      setEnhancingFieldName(null);
    }
  };


  const handlePublish = async () => {
    try {
      setIsScraping(true); // Reuse for loading state

      const newId = await saveToBackend(true);

      if (newId) {
        console.log("✅ Project published successfully:", newId);

        // Clear draft after successful publish
        localStorage.removeItem("manual-project-draft");

        // Show success message
        toast.success('Project published successfully! Redirecting to showcase...');

        // Navigate to showcase
        setTimeout(() => navigate("/showcase"), 1500);
      } else {
        throw new Error('Failed to save project');
      }
    } catch (error) {
      console.error("❌ Error publishing project:", error);
      toast.error(`Failed to publish project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsScraping(false);
    }
  };

  const goToSection = (sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      setCurrentSection(sectionIndex);
      // Save the navigation change
      setTimeout(() => saveDraft(), 100);
    }
  };

  const renderStepper = () => (
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="relative flex-1 text-center cursor-pointer"
          onClick={() => goToSection(index)}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-all duration-500 relative z-10 hover:scale-110",
              completedSections.includes(index)
                ? "bg-green-500 text-white shadow-lg shadow-green-500/50 animate-bounce"
                : index === currentSection
                  ? "bg-blue-500 text-white animate-pulse shadow-lg shadow-blue-500/30"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600",
            )}
          >
            {completedSections.includes(index) ? (
              <CheckCircle className="w-5 h-5 animate-pulse" />
            ) : (
              <section.icon className="w-5 h-5" />
            )}
          </div>
          <p
            className={cn(
              "text-xs mt-2 transition-colors duration-300",
              completedSections.includes(index)
                ? "text-primary font-semibold"
                : index === currentSection
                  ? "text-primary font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
            )}
          >
            {section.label}
          </p>
          {index < sections.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
              {completedSections.includes(index) && (
                <div className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full animate-pulse" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderProjectInfo = () => (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Project Info</h3>
      <div className="relative">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-500">
            Project Name *
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => handleAIEnhanceField("name")}
            disabled={enhancingFieldName === "name" || !formData.name}
          >
            {enhancingFieldName === "name" ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3 mr-1" />
            )}
            Enhance
          </Button>
        </div>
        <Input
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter your project name"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-500">
            Project Description (Markdown Supported)
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => handleAIEnhanceField("description")}
            disabled={enhancingFieldName === "description" || !formData.description}
          >
            {enhancingFieldName === "description" ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3 mr-1" />
            )}
            Enhance
          </Button>
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Write your project description using Markdown..."
          rows={8}
          className="font-mono text-sm"
        />
        <div className="flex justify-end text-xs text-gray-500 mt-1">
          <FileText className="w-4 h-4 mr-1" />
          Markdown support
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Github className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Input
              value={formData.githubUrl}
              onChange={(e) => handleInputChange("githubUrl", e.target.value)}
              className="pl-12 flex-1"
              placeholder="https://github.com/username/repo"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAIAnalyze}
              disabled={isAnalyzing || !formData.githubUrl}
              className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 whitespace-nowrap"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              Analyze with AI
            </Button>
          </div>
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-10">
            GitHub URL
          </label>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Zap className="w-6 h-6 text-gray-400" />
          </div>
          <Input
            value={formData.liveUrl}
            onChange={(e) => handleInputChange("liveUrl", e.target.value)}
            className="pl-12"
            placeholder="https://your-project-link.com"
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-10">
            Live URL
          </label>
        </div>

        {/* GitHub Scraper Component */}
        {formData.githubUrl && formData.githubUrl.includes("github.com") && (
          <GitHubScraper
            url={formData.githubUrl}
            onDataScraped={handleGitHubDataScraped}
            className="mt-4"
          />
        )}
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 flex-1 justify-center">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Step {currentSection + 1} of {sections.length}
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <Button
            onClick={() => {
              if (currentSection < sections.length - 1) {
                setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
              }
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderMediaDemo = () => (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Media & Demo</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Media / Demo URL
          </label>
          <Input
            value={mediaUrl}
            onChange={(e) => {
              setMediaUrl(e.target.value);
              setTimeout(() => saveDraft(), 100);
            }}
            placeholder="Image or demo URL"
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-2">
            Tip: Press <strong>⌘U</strong> / <strong>Ctrl+U</strong> to simulate
            upload (keyboard shortcut).
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Or Upload Files
          </label>
          <MediaUploader
            projectId="manual-project-form"
            onFilesUploaded={handleMediaUpload}
            onError={(error) => console.error("Media upload error:", error)}
            maxFiles={10}
            maxFileSize={100}
            allowedTypes={["image/*", "video/*", "audio/*", "application/pdf"]}
            className="w-full"
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          onClick={() =>
            setCurrentSection((prev) => Math.max(prev - 1, 0))
          }
          disabled={currentSection === 0}
          className="flex items-center gap-2 px-6 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Step {currentSection + 1} of {sections.length}
          </span>
        </div>

        <Button
          onClick={() => {
            if (currentSection < sections.length - 1) {
              setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
            }
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderTechStack = () => (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Tech Stack</h3>
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">
          List technologies (one per line, supports JSON/YAML)
        </label>
        <Textarea
          value={formData.techStack}
          onChange={(e) => handleInputChange("techStack", e.target.value)}
          placeholder='Example:
- React
- TailwindCSS
Or JSON: {"frontend": ["React", "Vue"]}'
          rows={10}
          className="bg-gray-900 text-green-300 font-mono text-sm border border-gray-700"
        />
        <div className="flex justify-end text-xs text-gray-500 mt-1">
          <Code className="w-4 h-4 mr-1" />
          Inline Code Editor
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Features</h3>
      <div className="space-y-4">
        {formData.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={true}
              readOnly
              className="h-5 w-5 text-primary rounded-md"
            />
            <label className="text-base">{feature}</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFeature(feature)}
              className="text-gray-500 hover:text-red-500 ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="relative">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder=" "
            className="peer"
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">
            Add new feature...
          </label>
          <Button
            variant="ghost"
            size="sm"
            className="absolute inset-y-0 right-0 pr-3"
            onClick={addFeature}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl">Team</h3>
      <div className="space-y-4">
        {formData.teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium">
                {member.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{member}</p>
              <p className="text-xs text-gray-500">Team Member</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTeamMember(member)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="relative">
          <Input
            value={newTeamMember}
            onChange={(e) => setNewTeamMember(e.target.value)}
            placeholder=" "
            className="peer"
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2">
            Add team member by email...
          </label>
          <Button
            variant="ghost"
            size="sm"
            className="absolute inset-y-0 right-0 pr-3"
            onClick={addTeamMember}
          >
            <UserPlus className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );


  const renderLivePreview = () => (
    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-4 shadow-lg mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Live Preview</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={previewEnabled ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewEnabled((v) => !v)}
            className="px-2 py-1"
          >
            {previewEnabled ? "Hide" : "Show"}
          </Button>
          <div className="flex items-center gap-1 bg-gray-200/50 dark:bg-gray-900/50 p-1 rounded-lg">
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
              className="p-1.5"
            >
              <Monitor className="w-5 h-5" />
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
              className="p-1.5"
            >
              <Smartphone className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4",
          previewMode === "mobile"
            ? "aspect-[9/16] max-w-xs mx-auto"
            : "aspect-[16/9]",
        )}
      >
        {previewEnabled ? (
          <div className="space-y-3">
            <h4 className="text-xl font-semibold">
              {formData.name || "Untitled project"}
            </h4>
            <p className="text-sm text-gray-500">
              {formData.techStack || "No tech stack specified"}
            </p>
            {(mediaUrl || (mediaFiles.length > 0)) && (
              <div className="space-y-4">
                {mediaUrl && !mediaFiles.some(f => f.url === mediaUrl) && (
                  <div className="rounded-lg overflow-hidden border border-gray-100">
                    <img
                      src={mediaUrl}
                      alt="Project preview"
                      className="w-full max-h-64 object-contain bg-gray-50"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}

                {mediaFiles.map((file, idx) => (
                  <div key={file.id || idx} className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 p-2">
                    {file.type.startsWith('image/') ? (
                      <img src={file.url} alt={file.name} className="w-full max-h-64 object-contain" />
                    ) : file.type.startsWith('video/') ? (
                      <video src={file.url} controls className="w-full max-h-64" />
                    ) : file.type.startsWith('audio/') ? (
                      <div className="p-4">
                        <p className="text-xs font-medium mb-2 truncate">{file.name}</p>
                        <audio src={file.url} controls className="w-full" />
                      </div>
                    ) : (
                      <div className="p-4 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">Document File</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="prose max-w-none prose-sm dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {formData.description || "No description yet..."}
              </ReactMarkdown>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              GitHub: {formData.githubUrl || "—"}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400 text-center py-8">
            Preview is hidden. Press <strong>⌘M</strong> / <strong>Ctrl+M</strong>{" "}
            to toggle.
          </div>
        )}
      </div>
    </div>
  );

  const renderCommandPalette = () => {
    return (
      <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-4 shadow-lg flex-1 flex flex-col">
        <h3 className="font-semibold mb-3">
          Command Palette (
          <kbd className="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
            ⌘K
          </kbd>
          )
        </h3>
        <div className="text-sm text-gray-600 mb-3">
          Try: <span className="font-mono">⌘K</span> to open. Then type to filter
          commands. Shortcuts: <span className="font-mono">⌘P</span> Publish,{" "}
          <span className="font-mono">⌘U</span> Upload,{" "}
          <span className="font-mono">⌘M</span> Toggle Preview.
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 text-sm">
          {commands.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg"
            >
              <div>{c.title}</div>
              <div className="text-xs text-gray-500">{c.shortcut}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <UnifiedLayout activePage="showcase">
      {/* Particle Effects */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full pointer-events-none animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}ms`,
            animationDuration: "1s",
          }}
        />
      ))}

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 flex flex-col h-full min-h-0">
            {/* Header */}
            <header className="flex justify-between items-center mb-4 relative flex-shrink-0">
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/showcase")}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Showcase
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Showcase / {isEdit ? "Edit Project" : "Add New Project"}
                </p>
                <h2 className="text-3xl font-bold">{isEdit ? "Edit Project" : "Add New Project"}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Cloud className="w-4 h-4" />
                  <span>Draft saved automatically</span>
                  <span className="mx-1">•</span>
                  <button className="hover:underline">Version History</button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsPaletteOpen(true)}
                  className="flex items-center gap-2"
                >
                  ⌘K
                </Button>
                <Button
                  onClick={() => setShowPublishModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <span>Publish Project</span>
                </Button>

                {/* Commented out AI Assistant button as requested
                <Button
                  variant="ghost"
                  onClick={() => navigate("/showcase/add")}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  <Sparkles className="w-4 h-4" />
                  Try AI Assistant
                </Button>
                */}
              </div>
              <div className="absolute -top-8 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(currentSection / (sections.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </header>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto pr-2 min-h-0">
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-6 pb-32">
                {renderStepper()}

                <div className="space-y-4">
                  {currentSection === 0 && renderProjectInfo()}
                  {currentSection === 1 && renderMediaDemo()}
                  {currentSection === 2 && renderTechStack()}
                  {currentSection === 3 && renderFeatures()}
                  {currentSection === 4 && renderTeam()}
                </div>

                {/* Navigation Buttons - Hide for Project Info (0) and Media Demo (1) since they have their own navigation */}
                {(currentSection !== 0 && currentSection !== 1) && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentSection((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentSection === 0}
                      className="flex items-center gap-2 px-6 py-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Step {currentSection + 1} of {sections.length}
                      </span>
                    </div>

                    {currentSection < sections.length - 1 ? (
                      <Button
                        onClick={() =>
                          setCurrentSection((prev) =>
                            Math.min(prev + 1, sections.length - 1),
                          )
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShowPublishModal(true)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Publish Project
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 lg:sticky top-8 self-start flex flex-col h-full">
            {renderLivePreview()}
            {renderCommandPalette()}
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      {isPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-8">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsPaletteOpen(false)}
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
            <div className="flex items-center gap-3">
              <Input
                ref={paletteQueryRef}
                value={paletteFilter}
                onChange={(e) => setPaletteFilter(e.target.value)}
                placeholder="Type a command..."
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setPaletteFilter("");
                  paletteQueryRef.current?.focus();
                }}
              >
                Clear
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPaletteOpen(false)}
              >
                Close
              </Button>
            </div>

            <div className="mt-3 max-h-64 overflow-auto">
              {(() => {
                const filtered = commands.filter((c) =>
                  c.title.toLowerCase().includes(paletteFilter.trim().toLowerCase()),
                );
                if (filtered.length === 0 && paletteFilter.trim()) {
                  return (
                    <div className="p-3 text-sm text-gray-500">
                      No commands match "{paletteFilter}"
                    </div>
                  );
                }
                return filtered.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      c.handler();
                      setIsPaletteOpen(false);
                      setPaletteFilter("");
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-gray-400">{c.shortcut}</div>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300">
            <h3 className="text-xl font-bold text-center">Ready to Publish?</h3>
            <p className="text-center text-gray-500 mt-2">
              Let's double-check a few things first.
            </p>
            <ul className="space-y-3 mt-6">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Project Name & Description</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>At least one media file</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-orange-400" />
                <span>Tech stack added</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gray-400" />
                <span>Custom URL (Optional)</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                onClick={handlePublish}
                disabled={isScraping}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScraping ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                    Publishing...
                  </>
                ) : (
                  'Publish Now'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPublishModal(false)}
                disabled={isScraping}
                className="w-full"
              >
                Continue Editing
              </Button>
            </div>
          </div>
        </div>
      )}
    </UnifiedLayout>
  );
}
