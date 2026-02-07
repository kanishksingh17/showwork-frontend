import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectSelector } from "./ProjectSelector";
import { PlatformSelector } from "./PlatformSelector";
import { ContentPreview } from "./ContentPreview";
import { PostCardsGrid } from "./PostCardsGrid";
import { GitHubFileTree } from "@/components/GitHubFileTree";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Sparkles,
  Send,
  Loader2,
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
  Star,
  Image,
} from "lucide-react";
import { RedditIcon } from "@/components/BrandIcons";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { GeneratedContent } from "@/lib/services/contentGenerator";

// Image component with fallback handling
function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className
}: {
  src?: string | undefined;
  fallbackSrc?: string | undefined;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError && fallbackSrc && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError && imgSrc === fallbackSrc) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-xs text-gray-500">{alt}</span>
      </div>
    );
  }

  if (!imgSrc) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-xs text-gray-500">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => setHasError(false)}
    />
  );
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  status?: 'Draft' | 'Pending' | 'Published' | 'In Progress';
  dueDate?: string;
  progress?: number;
}

const mockProjects: Project[] = [
  // In Progress (3)
  {
    id: "mock-1",
    name: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with real-time analytics.",
    technologies: ["React", "Tailwind", "Node.js"],
    tags: ["Dashboard", "SaaS"],
    status: 'In Progress',
    progress: 65,
    dueDate: "Two days ago"
  },
  {
    id: "mock-2",
    name: "AI Content Generator",
    description: "Generates social media posts using OpenAI GPT-4 API.",
    technologies: ["Next.js", "OpenAI", "TypeScript"],
    tags: ["AI", "Tool"],
    status: 'In Progress',
    progress: 40,
    dueDate: "Tomorrow"
  },
  {
    id: "mock-3",
    name: "Finance Tracker App",
    description: "Mobile-first application for tracking personal expenses and investments.",
    technologies: ["React Native", "Firebase"],
    tags: ["Finance", "Mobile"],
    status: 'In Progress',
    progress: 80,
    dueDate: "Next Week"
  },
  // Pending (2)
  {
    id: "mock-4",
    name: "Portfolio V2",
    description: "Redesign of personal portfolio with 3D elements.",
    technologies: ["Three.js", "React"],
    tags: ["Portfolio", "3D"],
    status: 'Pending',
    progress: 10,
    dueDate: "Next Month"
  },
  {
    id: "mock-5",
    name: "Task Management Tool",
    description: "Kanban board style task manager for small teams.",
    technologies: ["Vue.js", "Supabase"],
    tags: ["Productivity", "Tool"],
    status: 'Pending',
    progress: 5,
    dueDate: "In 2 weeks"
  },
  // Published (4)
  {
    id: "mock-6",
    name: "Weather Widget Pro",
    description: "Embeddable weather widget with beautiful animations.",
    technologies: ["JavaScript", "CSS"],
    tags: ["Widget", "Weather"],
    status: 'Published',
    progress: 100,
    dueDate: "Completed"
  },
  {
    id: "mock-7",
    name: "Recipe Finder",
    description: "Find recipes based on ingredients you have at home.",
    technologies: ["React", "Spoonacular API"],
    tags: ["Food", "Search"],
    status: 'Published',
    progress: 100,
    dueDate: "Completed"
  },
  {
    id: "mock-8",
    name: "Fitness Social Network",
    description: "Connect with workout buddies and share progress.",
    technologies: ["MERN Stack"],
    tags: ["Social", "Fitness"],
    status: 'Published',
    progress: 100,
    dueDate: "Completed"
  },
  {
    id: "mock-9",
    name: "Crypto Price Tracker",
    description: "Real-time cryptocurrency price tracking and alerts.",
    technologies: ["Angular", "CoinGecko API"],
    tags: ["Crypto", "Finance"],
    status: 'Published',
    progress: 100,
    dueDate: "Completed"
  },
  // Draft (3)
  {
    id: "mock-10",
    name: "Travel Blog Platform",
    description: "A blog platform designed specifically for travel influencers.",
    technologies: ["Next.js", "MDX"],
    tags: ["Blog", "Travel"],
    status: 'Draft',
    progress: 25,
    dueDate: "No deadline"
  },
  {
    id: "mock-11",
    name: "Learning Management System",
    description: "Platform for creating and selling online courses.",
    technologies: ["Ruby on Rails", "PostgreSQL"],
    tags: ["Education", "SaaS"],
    status: 'Draft',
    progress: 15,
    dueDate: "No deadline"
  },
  {
    id: "mock-12",
    name: "Smart Home Controller",
    description: "IoT dashboard for controlling smart home devices.",
    technologies: ["IoT", "React"],
    tags: ["IoT", "Home Automation"],
    status: 'Draft',
    progress: 5,
    dueDate: "No deadline"
  }
];

interface IntegrationStatus {
  platform: string;
  connected: boolean;
  expired: boolean;
}

const platforms = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    color: "#0077B5",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <Twitter className="w-5 h-5" />,
    color: "#1DA1F2",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    color: "#333",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    color: "#E4405F",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
    color: "#1877F2",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: <RedditIcon className="w-5 h-5" />,
    color: "#FF4500",
  },
];

// Preview & Publish Modal Component
function PreviewPublishModal({
  generatedContent,
  platforms,
  isLoading,
  selectedPlatforms,
  canPublish,
  publishMutation,
  onPublish,
  onClose,
  onRegenerate,
  isRegenerating,
  onEdit,
}: {
  generatedContent: Record<string, GeneratedContent>;
  platforms: Array<{ id: string; name: string; icon: React.ReactNode; color: string }>;
  isLoading: boolean;
  selectedPlatforms: string[];
  canPublish: boolean;
  publishMutation: { isPending: boolean };
  onPublish: () => void;
  onClose: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  onEdit: (platform: string, content: GeneratedContent) => void;
}) {
  // Lock background scroll when modal is open
  useEffect(() => {
    // Save the original overflow value
    const originalOverflow = document.body.style.overflow;

    // Lock the background scroll
    document.body.style.overflow = 'hidden';

    // Restore the original overflow when component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 bg-black/50"
    >
      {/* Centered Container */}
      <div className="w-full max-w-[95vw] h-[85vh] sm:h-[90vh] flex flex-col gap-2 sm:gap-3 p-2 sm:p-3">
        {/* Header with Publish Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 flex-shrink-0"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className={cn(
                "px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 flex-shrink-0",
                isRegenerating
                  ? "bg-gray-400/50 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500/80 hover:bg-blue-600 text-white hover:scale-105"
              )}
            >
              {isRegenerating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="hidden sm:inline">Regenerating...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Regenerate</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-500/80 hover:bg-gray-600 text-white transition-colors flex-shrink-0"
            >
              Close
            </button>
          </div>

          {!canPublish && (
            <div className="flex-1 p-2 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-xs text-yellow-100 backdrop-blur-sm max-w-xs hidden sm:block">
              <p className="truncate">⚠️ Cannot publish</p>
            </div>
          )}

          <button
            onClick={onPublish}
            disabled={!canPublish}
            className={cn(
              "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-auto",
              canPublish
                ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl hover:scale-105 text-white"
                : "bg-gray-500/50 cursor-not-allowed opacity-50 text-gray-300"
            )}
          >
            {publishMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? "s" : ""}</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Post Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full flex-1 min-h-0 overflow-y-auto"
        >
          <PostCardsGrid
            generatedContent={generatedContent}
            platforms={platforms}
            isLoading={isLoading}
            onEdit={onEdit}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CrossPostComposer() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [useAI, setUseAI] = useState(true); // Default to AI generation for unique content
  const [generatedContent, setGeneratedContent] = useState<
    Record<string, GeneratedContent>
  >({});
  const [publishedResults, setPublishedResults] = useState<Array<{
    platform: string;
    success: boolean;
    url?: string;
    postId?: string;
    error?: string;
  }>>([]);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [projectMedia, setProjectMedia] = useState<Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
    category: string;
  }>>([]);
  const [projectTeamMembers, setProjectTeamMembers] = useState<Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>>([]);
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<Set<string>>(new Set());
  const [projectFeatures, setProjectFeatures] = useState<string[]>([]);
  const [isFileTreeLoading, setIsFileTreeLoading] = useState(false);
  const hasInitializedMedia = useRef(false);

  // Fetch project details (media, team members, features) when project is selected
  const { data: projectDetails, isLoading: projectDetailsLoading } = useQuery({
    queryKey: ['projectDetails', selectedProject?.id],
    queryFn: async () => {
      if (!selectedProject?.id) return null;

      // Fetch project details from backend
      const response = await fetch(`/api/content/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          projectId: selectedProject.id,
          platforms: ['linkedin'], // Just to get project data, we don't need actual content
          useAI: false, // Don't generate content, just get project data
        }),
      });

      if (!response.ok) {
        console.warn('⚠️ Could not fetch project details');
        return null;
      }

      const data = await response.json();
      return data.project || null;
    },
    enabled: !!selectedProject?.id,
    staleTime: 30000, // Cache for 30 seconds
  });

  // Extract GitHub owner/repo if project has GitHub URL
  const getGitHubInfo = () => {
    if (!selectedProject?.githubUrl) return null;
    const match = selectedProject.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return null;
    const [, owner, repo] = match;
    return { owner, repo: repo.replace('.git', '') };
  };

  const githubInfo = getGitHubInfo();

  // Reset initialization flag when project changes
  useEffect(() => {
    hasInitializedMedia.current = false;
  }, [selectedProject?.id]);

  // Debug: Log useAI state changes
  useEffect(() => {
    console.log('🤖 [DEBUG] useAI state changed to:', useAI);
  }, [useAI]);

  // Update media, team members, and features when project details are fetched
  useEffect(() => {
    if (projectDetails) {
      if (projectDetails.mediaFiles) {
        setProjectMedia(() => {
          const newMediaIds = new Set(projectDetails.mediaFiles.map((mf: any) => mf.id));

          // No auto-selection - user must manually select images
          // Only validate existing selections if media list changes
          setSelectedMedia((prevSelected) => {
            if (prevSelected.size > 0) {
              // Validate existing selections still exist in the new media list
              const validSelections = Array.from(prevSelected).filter(id => newMediaIds.has(id));
              if (validSelections.length !== prevSelected.size) {
                // Some selected media no longer exists, update the selection
                return new Set(validSelections);
              }
            }
            // Keep existing selection (or empty if nothing selected)
            return prevSelected;
          });

          // Mark as initialized to prevent any auto-selection
          if (!hasInitializedMedia.current) {
            hasInitializedMedia.current = true;
          }

          return projectDetails.mediaFiles;
        });
      }
      if (projectDetails.teamMembers) {
        setProjectTeamMembers(projectDetails.teamMembers);
      }
      if (projectDetails.features) {
        setProjectFeatures(projectDetails.features);
      } else if (selectedProject?.tags) {
        // Fallback to tags if features not available
        setProjectFeatures(selectedProject.tags);
      }
      // Mark file tree as loaded when project details are loaded (if no GitHub repo)
      // If there's a GitHub repo, the onLoadComplete callback will handle it
      if (!githubInfo) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsFileTreeLoading(false);
        }, 100);
      }
    }
  }, [projectDetails, selectedProject, githubInfo]);

  // Also clear loading state when project details finish loading (even if no data)
  useEffect(() => {
    if (!projectDetailsLoading) {
      // If no GitHub repo, clear loading immediately
      if (!githubInfo) {
        setIsFileTreeLoading(false);
        return;
      }
      // If there's a GitHub repo, wait a bit for it to load, then clear
      // This is a fallback in case onLoadComplete doesn't fire
      const timeout = setTimeout(() => {
        console.log('Project details loaded, clearing file tree loading state');
        setIsFileTreeLoading(false);
      }, 2000); // 2 second timeout - reduced from 3
      return () => clearTimeout(timeout);
    }
  }, [projectDetailsLoading, githubInfo]);

  // Reset loading state when project is deselected
  useEffect(() => {
    if (!selectedProject) {
      setIsFileTreeLoading(false);
    }
  }, [selectedProject]);

  // Fallback: Clear loading state after a maximum timeout
  useEffect(() => {
    if (selectedProject && (projectDetailsLoading || isFileTreeLoading)) {
      const maxTimeout = setTimeout(() => {
        console.warn('Loading timeout - clearing loading state');
        setIsFileTreeLoading(false);
      }, 10000); // 10 second maximum timeout
      return () => clearTimeout(maxTimeout);
    }
    return undefined;
  }, [selectedProject, projectDetailsLoading, isFileTreeLoading]);

  // Fetch integration status
  const { data: integrationStatus, refetch: refetchIntegrationStatus } = useQuery<{
    success: boolean;
    statuses: Array<{
      platform: string;
      connected: boolean;
      expired: boolean;
    }>;
  }>({
    queryKey: ["integrationStatus"],
    queryFn: async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/integrations/status`, {
        credentials: "include",
      });
      if (!response.ok) {
        console.warn("⚠️ Failed to fetch integration status");
        return { success: false, statuses: [] };
      }
      const data = await response.json();
      console.log("📊 Integration status fetched:", data);
      return data;
    },
    staleTime: 5000, // Cache for 5 seconds (reduced from 30)
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
  });

  // Refetch integration status when component mounts (in case user just connected)
  useEffect(() => {
    refetchIntegrationStatus();
  }, [refetchIntegrationStatus]);

  // Get connected platforms
  const connectedPlatforms = integrationStatus?.statuses
    ?.filter((s) => s.connected && !s.expired)
    .map((s) => s.platform.toLowerCase()) || [];

  // Check if selected platforms are connected
  const unconnectedPlatforms = selectedPlatforms.filter(
    (platform) => !connectedPlatforms.includes(platform.toLowerCase())
  );

  // Debug logging
  useEffect(() => {
    if (integrationStatus?.statuses) {
      console.log("🔍 Integration Status Debug:", {
        allStatuses: integrationStatus.statuses,
        connectedPlatforms,
        selectedPlatforms,
        unconnectedPlatforms,
      });
    }
  }, [integrationStatus, connectedPlatforms, selectedPlatforms, unconnectedPlatforms]);

  // Fetch projects
  const { data: projectsData, isLoading: projectsLoading } = useQuery<{
    success: boolean;
    data: { projects: Project[] };
    count: number;
  }>({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log("📡 CrossPostComposer: Fetching projects...");
      const response = await fetch("/api/projects", {
        credentials: "include", // Include cookies for session-based auth
      });
      if (!response.ok) {
        console.error("❌ CrossPostComposer: Projects API error:", response.status);
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ CrossPostComposer: Projects API response:", {
        success: data.success,
        hasData: !!data.data,
        hasProjects: !!(data.data?.projects),
        projectCount: data.data?.projects?.length || 0,
      });

      // Filter to only show published projects
      const allProjects = data.data?.projects || data.projects || [];
      const publishedProjects = allProjects.filter((project: Project) => {
        // Include projects that are published, or if status is missing assume it's visible
        return (project as any).status === 'published' ||
          !(project as any).status ||
          (project as any).visibility === 'public' ||
          !(project as any).visibility;
      });

      console.log(`📦 CrossPostComposer: ${allProjects.length} total, ${publishedProjects.length} published`);

      return {
        ...data,
        data: {
          projects: publishedProjects,
        },
      };
    },
  });

  // Fetch integration statuses
  const { data: statusData } = useQuery<{
    success: boolean;
    statuses: IntegrationStatus[];
  }>({
    queryKey: ["integrationStatus"],
    queryFn: async () => {
      const response = await fetch("/api/integrations/status");
      if (!response.ok) throw new Error("Failed to fetch status");
      return response.json();
    },
  });

  // Generate content mutation
  const generateMutation = useMutation({
    mutationFn: async ({
      projectId,
      platforms,
      customMessage,
      useAI,
      mediaUrls,
    }: {
      projectId: string;
      platforms: string[];
      customMessage?: string;
      useAI: boolean;
      mediaUrls?: string[];
    }) => {
      console.log("🚀 Generating content:", { projectId, platforms, useAI, mediaUrls });
      console.log("🤖 [DEBUG] useAI value being sent:", useAI, "Type:", typeof useAI);

      const response = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for session-based auth
        body: JSON.stringify({
          projectId,
          platforms,
          customMessage,
          useAI,
          mediaUrls,
        }),
      });

      console.log("📡 Response status:", response.status);
      const data = await response.json();
      console.log("📡 Response data:", data);

      if (!response.ok) {
        const errorMessage = data.error || data.message || "Failed to generate content";
        console.error("❌ Generation error:", errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.content || !Array.isArray(data.content)) {
        console.error("❌ Invalid response format:", data);
        throw new Error("Invalid response format from server");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      console.log("✅ Content generated successfully:", data);
      console.log("📸 Selected media URLs from request:", variables.mediaUrls);
      console.log("📸 Media URLs count:", variables.mediaUrls?.length || 0);

      const contentMap: Record<string, GeneratedContent> = {};
      data.content.forEach((content: GeneratedContent) => {
        console.log(`📸 Platform ${content.platform}: Before update - mediaUrls:`, content.mediaUrls);
        console.log(`📸 Platform ${content.platform}: Variables mediaUrls:`, variables.mediaUrls);

        // Always use the selected mediaUrls from the request - don't merge, replace
        // This ensures ALL selected images are included
        if (variables.mediaUrls && variables.mediaUrls.length > 0) {
          // Use the selected mediaUrls directly - these are what the user chose
          content.mediaUrls = [...variables.mediaUrls];
          console.log(`📸 Platform ${content.platform}: After update - Using ${content.mediaUrls.length} media URLs from selection:`, content.mediaUrls);
        } else if (content.mediaUrls && content.mediaUrls.length > 0) {
          // If no mediaUrls in request but response has some, keep them
          console.log(`📸 Platform ${content.platform}: Using ${content.mediaUrls.length} media URLs from response:`, content.mediaUrls);
        } else {
          console.log(`📸 Platform ${content.platform}: No media URLs available`);
        }
        contentMap[content.platform] = content;
      });

      console.log("📸 Final contentMap:", contentMap);
      // Verify all mediaUrls are preserved before setting state
      Object.entries(contentMap).forEach(([platform, content]) => {
        console.log(`✅ Final check - Platform ${platform}: ${content.mediaUrls?.length || 0} media URLs:`, content.mediaUrls);
      });
      setGeneratedContent(contentMap);

      // Store project media and team members from response
      if (data.project) {
        if (data.project.mediaFiles) {
          const newMediaIds = new Set(data.project.mediaFiles.map((mf: any) => mf.id));

          setProjectMedia(data.project.mediaFiles);

          // Preserve existing selections - don't reset on content generation
          // Never auto-select - user must manually choose images
          setSelectedMedia((prevSelected) => {
            if (prevSelected.size > 0) {
              // Validate existing selections still exist in the new media list
              const validSelections = Array.from(prevSelected).filter(id => newMediaIds.has(id));
              if (validSelections.length !== prevSelected.size) {
                // Some selected media no longer exists, update the selection
                return new Set(validSelections);
              }
            }
            // Keep existing selection (never auto-select)
            return prevSelected;
          });
        }
        if (data.project.teamMembers) {
          setProjectTeamMembers(data.project.teamMembers);
        }
      }
      toast.success("Content generated successfully!");
      // Reset error state to allow regeneration
      generateMutation.reset();
    },
    onError: (error: Error) => {
      console.error("❌ Content generation failed:", error);
      toast.error(`Failed to generate content: ${error.message}`);
      // Don't reset mutation on error - let user see the error and try again
    },
  });

  // Publish mutation
  const publishMutation = useMutation({
    mutationFn: async (contentByPlatform: Record<string, { message: string; mediaUrls?: string[]; metadata?: any }>) => {
      if (!selectedProject || !selectedProject.id) {
        console.error("❌ No project selected or project ID missing:", { selectedProject });
        throw new Error("No project selected. Please select a project first.");
      }

      if (!selectedPlatforms || selectedPlatforms.length === 0) {
        console.error("❌ No platforms selected:", { selectedPlatforms });
        throw new Error("No platforms selected. Please select at least one platform.");
      }

      if (!Array.isArray(selectedPlatforms)) {
        console.error("❌ Platforms is not an array:", { selectedPlatforms, type: typeof selectedPlatforms });
        throw new Error("Platforms must be an array.");
      }

      if (!contentByPlatform || Object.keys(contentByPlatform).length === 0) {
        console.error("❌ No content to publish:", { contentByPlatform, keys: Object.keys(contentByPlatform || {}) });
        throw new Error("No content to publish. Please generate content first.");
      }

      // Validate that contentByPlatform has content for all selected platforms
      const missingContentPlatforms = selectedPlatforms.filter(p => !contentByPlatform[p] || !contentByPlatform[p].message);
      if (missingContentPlatforms.length > 0) {
        console.error("❌ Missing content for platforms:", missingContentPlatforms);
        throw new Error(`Missing content for: ${missingContentPlatforms.join(', ')}. Please regenerate.`);
      }

      console.log("📤 Publishing content:", {
        projectId: selectedProject.id,
        platforms: selectedPlatforms,
        contentPlatforms: Object.keys(contentByPlatform),
        contentDetails: Object.entries(contentByPlatform).map(([platform, content]) => ({
          platform,
          hasMessage: !!content.message,
          messageLength: content.message?.length || 0,
          hasMetadata: !!content.metadata,
        })),
      });

      const requestBody = {
        projectId: selectedProject.id,
        platforms: selectedPlatforms,
        contentByPlatform,
        publishNow: true,
      };

      // Check payload size before sending
      const payloadString = JSON.stringify(requestBody);
      const payloadSizeMB = (new Blob([payloadString]).size / (1024 * 1024)).toFixed(2);
      console.log("📡 Sending publish request:", {
        url: "/api/content/publish-batch",
        method: "POST",
        bodyKeys: Object.keys(requestBody),
        contentPlatforms: Object.keys(requestBody.contentByPlatform),
        projectId: requestBody.projectId,
        platforms: requestBody.platforms,
        platformsIsArray: Array.isArray(requestBody.platforms),
        contentByPlatformKeys: Object.keys(requestBody.contentByPlatform || {}),
        payloadSizeMB: `${payloadSizeMB} MB`,
        requestBodyStringified: payloadString.substring(0, 500),
      });

      // Warn if payload is getting large
      if (parseFloat(payloadSizeMB) > 40) {
        console.warn(`⚠️ Large payload detected: ${payloadSizeMB} MB. Consider optimizing media URLs.`);
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/content/publish-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for session-based auth
        body: JSON.stringify(requestBody),
      });

      console.log("📡 Publish response status:", response.status);
      console.log("📡 Publish response headers:", Object.fromEntries(response.headers.entries()));

      let data;
      try {
        data = await response.json();
        console.log("📡 Publish response data:", data);
      } catch (parseError) {
        console.error("❌ Failed to parse response JSON:", parseError);
        const text = await response.text();
        console.error("❌ Response text:", text);
        throw new Error(`Server returned ${response.status} ${response.statusText}. ${text}`);
      }

      if (!response.ok) {
        console.error("❌ Publish failed with status:", response.status);
        console.error("❌ Response data:", data);

        const errorMessage = data.error || data.message || data.details || `Failed to publish (${response.status})`;
        const missingPlatforms = data.missingPlatforms || [];

        // Log validation details if available
        if (data.hasProjectId !== undefined || data.hasPlatforms !== undefined) {
          console.error("❌ Validation details:", {
            hasProjectId: data.hasProjectId,
            hasPlatforms: data.hasPlatforms,
            isPlatformsArray: data.isPlatformsArray,
            hasContentByPlatform: data.hasContentByPlatform,
            platformsType: data.platformsType,
            platformsValue: data.platformsValue,
            contentByPlatformType: data.contentByPlatformType,
            contentByPlatformKeys: data.contentByPlatformKeys,
          });

          // Show user-friendly validation error
          const validationErrors: string[] = [];
          if (!data.hasProjectId) validationErrors.push("Project ID is missing");
          if (!data.hasPlatforms) validationErrors.push("Platforms are missing");
          if (!data.isPlatformsArray) validationErrors.push("Platforms must be an array");
          if (!data.hasContentByPlatform) validationErrors.push("Content is missing");

          if (validationErrors.length > 0) {
            toast.error(`Validation failed: ${validationErrors.join(', ')}`, { duration: 8000 });
            throw new Error(validationErrors.join(', '));
          }
        }

        if (missingPlatforms.length > 0) {
          // Create error with structured data for better handling
          const error = new Error(`${errorMessage}. Missing tokens for: ${missingPlatforms.join(', ')}. Please connect your accounts in Settings.`) as Error & { missingPlatforms?: string[] };
          error.missingPlatforms = missingPlatforms;
          throw error;
        }

        console.error("❌ Publish error:", errorMessage);
        throw new Error(errorMessage);
      }
      return data;
    },
    onSuccess: (data) => {
      console.log("✅ Publish successful:", data);
      const successCount = data.summary?.successful || 0;
      const totalCount = data.summary?.total || 0;
      const results = data.results || [];

      // Store results and show modal
      setPublishedResults(results);
      setShowPublishModal(true);

      // Show toast notification
      if (successCount === totalCount) {
        toast.success(`Successfully posted to all ${totalCount} platform(s)! Click to view posts.`, {
          duration: 5000,
          action: {
            label: "View Posts",
            onClick: () => setShowPublishModal(true),
          },
        });
      } else {
        const failedPlatforms = results
          .filter((r: any) => !r.success)
          .map((r: any) => r.platform)
          .join(', ');

        toast.warning(
          `Posted to ${successCount} of ${totalCount} platforms. Some failed.`,
          {
            duration: 6000,
            action: {
              label: "View Details",
              onClick: () => setShowPublishModal(true),
            },
          }
        );
      }

      // Reset form only if all succeeded
      if (successCount === totalCount) {
        // Don't reset immediately - let user see the results first
        // Reset after modal is closed
      }

      // Reset mutation to allow republishing
      publishMutation.reset();
    },
    onError: (error: Error) => {
      console.error("❌ Publish error:", error);

      // Check if error has missingPlatforms property (from structured error)
      const missingPlatforms = (error as any).missingPlatforms || [];

      // Also try to extract from error message as fallback
      let extractedPlatforms: string[] = [];
      if (missingPlatforms.length === 0) {
        const platformMatch = error.message.match(/Missing tokens for: ([^.]+?)(?:\.|$)/);
        if (platformMatch) {
          extractedPlatforms = platformMatch[1].split(',').map(p => p.trim());
        }
      }

      const allMissingPlatforms = missingPlatforms.length > 0 ? missingPlatforms : extractedPlatforms;

      // Check if error is about missing tokens
      if (error.message.includes("Missing tokens") || error.message.includes("Missing or expired tokens") || allMissingPlatforms.length > 0) {
        const platformText = allMissingPlatforms.length > 0
          ? allMissingPlatforms.join(', ')
          : 'Some platforms';

        toast.error(
          `Cannot publish: ${platformText} need${allMissingPlatforms.length === 1 ? 's' : ''} to be connected.`,
          {
            duration: 8000,
            action: {
              label: "Connect Accounts",
              onClick: () => navigate("/integrations"),
            },
          }
        );
      } else {
        toast.error(`Publishing failed: ${error.message}`, { duration: 6000 });
      }
      // Don't reset - allow user to see error and try again
    },
  });

  const handleGenerate = () => {
    if (!selectedProject) {
      toast.error("Please select a project first");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    // Clear old generated content when regenerating
    setGeneratedContent({});

    // Get selected media URLs before generating
    // Convert relative URLs to absolute URLs if needed
    const selectedMediaUrls = Array.from(selectedMedia)
      .map(id => {
        const media = projectMedia.find(m => m.id === id);
        if (!media) {
          console.warn(`⚠️ Media with id ${id} not found in projectMedia`);
          return null;
        }
        if (!media.url) {
          console.warn(`⚠️ Media with id ${id} has no URL:`, media);
          return null;
        }
        // If URL is relative (starts with /), convert to absolute
        let finalUrl = media.url;
        if (media.url.startsWith('/')) {
          const baseUrl = window.location.origin;
          finalUrl = `${baseUrl}${media.url}`;
        }
        console.log(`✅ Media ${id} URL:`, finalUrl);
        return finalUrl;
      })
      .filter(Boolean) as string[];

    console.log('📸 Generating content with selected media:', {
      selectedMediaCount: selectedMedia.size,
      selectedMediaIds: Array.from(selectedMedia),
      projectMediaCount: projectMedia.length,
      selectedMediaUrls: selectedMediaUrls,
      mediaUrlsCount: selectedMediaUrls.length,
      allProjectMedia: projectMedia.map(m => ({ id: m.id, url: m.url, name: m.name }))
    });

    // Debug: Log the useAI state before sending
    console.log('🤖 AI Enhancement toggle state:', useAI);
    console.log('🤖 Sending useAI:', useAI, 'to backend');

    generateMutation.mutate({
      projectId: selectedProject.id,
      platforms: selectedPlatforms,
      customMessage: customMessage ? customMessage : undefined,
      useAI: useAI, // Pass the state value
      mediaUrls: selectedMediaUrls.length > 0 ? selectedMediaUrls : undefined,
    });
  };

  const handlePublish = () => {
    if (Object.keys(generatedContent).length === 0) {
      toast.error("Please generate content first");
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }

    // Check if selected platforms are connected
    if (unconnectedPlatforms.length > 0) {
      toast.error(
        `Please connect ${unconnectedPlatforms.join(', ')} in Settings > Integrations before publishing.`,
        {
          duration: 8000,
          action: {
            label: "Go to Integrations",
            onClick: () => navigate("/integrations"),
          },
        }
      );
      return;
    }

    console.log("📤 Preparing to publish content:", {
      platforms: selectedPlatforms,
      generatedContentKeys: Object.keys(generatedContent),
    });

    const contentByPlatform: Record<string, { message: string; mediaUrls?: string[]; metadata?: any }> = {};
    const missingPlatforms: string[] = [];

    // Get selected media URLs
    // Convert relative URLs to absolute URLs if needed
    const selectedMediaUrls = Array.from(selectedMedia)
      .map(id => {
        const media = projectMedia.find(m => m.id === id);
        if (!media?.url) return null;
        // If URL is relative (starts with /), convert to absolute
        if (media.url.startsWith('/')) {
          const baseUrl = window.location.origin;
          return `${baseUrl}${media.url}`;
        }
        return media.url;
      })
      .filter(Boolean) as string[];

    // Get selected team member names for LinkedIn mentions
    const selectedTeamMemberNames = Array.from(selectedTeamMembers)
      .map(id => projectTeamMembers.find(tm => tm.id === id)?.name)
      .filter(Boolean) as string[];

    selectedPlatforms.forEach((platform) => {
      const content = generatedContent[platform];
      if (content && content.message) {
        console.log(`   Platform ${platform}:`, {
          hasMessage: !!content.message,
          messageLength: content.message?.length || 0,
          hasMetadata: !!content.metadata,
          hasTitle: !!content.metadata?.title,
        });

        let message = content.message;

        // Add team member mentions for LinkedIn
        if (platform === 'linkedin' && selectedTeamMemberNames.length > 0) {
          const mentions = selectedTeamMemberNames.map(name => {
            // LinkedIn mentions format: @[Full Name] or just the name
            // Note: Actual LinkedIn mentions require LinkedIn profile URLs or URNs
            // For now, we'll add them as text mentions
            return name;
          }).join(', ');
          message = `${message}\n\nBuilt with ${mentions}`;
        }

        // Combine selected media with existing mediaUrls
        const allMediaUrls = [
          ...(content.mediaUrls || []),
          ...selectedMediaUrls,
        ];

        contentByPlatform[platform] = {
          message,
          mediaUrls: allMediaUrls.length > 0 ? allMediaUrls : undefined,
          metadata: content.metadata || {}, // Include metadata (for Reddit title)
        };
      } else {
        console.warn(`⚠️ No content found for platform: ${platform}`);
        missingPlatforms.push(platform);
      }
    });

    // Check if we have content for all selected platforms
    if (missingPlatforms.length > 0) {
      toast.error(`No content generated for: ${missingPlatforms.join(', ')}. Please regenerate.`);
      return;
    }

    if (Object.keys(contentByPlatform).length === 0) {
      toast.error("No content to publish. Please generate content first.");
      return;
    }

    // Validate that all content has messages
    const platformsWithoutMessages = Object.entries(contentByPlatform)
      .filter(([platform, content]) => !content.message || content.message.trim().length === 0)
      .map(([platform]) => platform);

    if (platformsWithoutMessages.length > 0) {
      toast.error(`Content for ${platformsWithoutMessages.join(', ')} is empty. Please regenerate.`);
      return;
    }

    console.log("📤 Content by platform:", Object.keys(contentByPlatform));
    console.log("📤 Publishing with:", {
      projectId: selectedProject?.id,
      platforms: selectedPlatforms,
      contentPlatforms: Object.keys(contentByPlatform),
    });

    publishMutation.mutate(contentByPlatform);
  };

  const handleEditContent = (platform: string, newMessage: string) => {
    setGeneratedContent((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        message: newMessage,
        metadata: {
          ...prev[platform].metadata,
          characterCount: newMessage.length,
        },
      },
    }));
  };

  const canGenerate =
    selectedProject !== null &&
    selectedPlatforms.length > 0 &&
    !generateMutation.isPending; // Allow regeneration anytime (not just on errors)

  const canPublish =
    Object.keys(generatedContent).length > 0 &&
    selectedPlatforms.length > 0 &&
    selectedPlatforms.every((p) => generatedContent[p]?.message) &&
    !publishMutation.isPending;

  // Debug: Log canPublish status
  useEffect(() => {
    const hasContent = Object.keys(generatedContent).length > 0;
    const hasPlatforms = selectedPlatforms.length > 0;
    const allHaveMessages = selectedPlatforms.every((p) => generatedContent[p]?.message);
    const notPending = !publishMutation.isPending;

    console.log('🔍 canPublish check:', {
      hasContent,
      hasPlatforms,
      allHaveMessages,
      notPending,
      canPublish,
      generatedContentKeys: Object.keys(generatedContent),
      selectedPlatforms,
      platformMessages: selectedPlatforms.map(p => ({
        platform: p,
        hasMessage: !!generatedContent[p]?.message,
        messageLength: generatedContent[p]?.message?.length || 0
      }))
    });
  }, [generatedContent, selectedPlatforms, publishMutation.isPending, canPublish]);

  return (
    <div className="w-full max-w-full overflow-hidden p-4 md:p-6 box-border h-full flex flex-col">


      <AnimatePresence mode="wait">
        {!selectedProject ? (
          // Step 1: Project Selection
          <motion.div
            key="project-selection"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-full box-border h-full flex flex-col"
          >
            <ProjectSelector
              projects={[...mockProjects, ...(projectsData?.data?.projects || [])]}
              selectedProject={selectedProject}
              onSelect={(project) => {
                // Set loading state immediately when project is selected
                // Temporarily disabled: setIsFileTreeLoading(true);
                setIsFileTreeLoading(false); // Skip loading since file tree is disabled
                setSelectedProject(project);
                setShowGitHubTree(false); // Disable GitHub tree loading
                setSelectedFiles(new Set());
                // Reset media and team member selections when project changes
                setProjectMedia([]);
                setProjectTeamMembers([]);
                setSelectedMedia(new Set());
                setSelectedTeamMembers(new Set());
                setGeneratedContent({});
              }}
              isLoading={projectsLoading}
            />
            {/* {!projectsLoading && (!projectsData?.data?.projects || projectsData.data.projects.length === 0) && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ No published projects found. Please publish a project in your showcase section first.
                </p>
              </div>
            )} */}
          </motion.div>
        ) : (
          // Step 2: Split View - File Tree on Left, Options on Right
          <motion.div
            key="project-details"
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -20 }}
            transition={{ duration: 0.5, ease: "circInOut" }}
            className="space-y-6 h-full flex flex-col"
          >
            {/* Loading State - Show centered while data is loading */}
            {(projectDetailsLoading || isFileTreeLoading) ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
              >
                <TextShimmerWave
                  as="h2"
                  className="text-4xl font-bold text-gray-900"
                  duration={1.5}
                  zDistance={15}
                  xDistance={3}
                  yDistance={-3}
                  spread={1.2}
                >
                  All set to share soon
                </TextShimmerWave>

                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />

                <div className="text-center space-y-2">
                  <TextShimmerWave
                    as="h3"
                    className="text-2xl font-semibold text-gray-800"
                    duration={1.5}
                    zDistance={10}
                    xDistance={2}
                    yDistance={-2}
                    spread={1.1}
                  >
                    Organising your project for posting
                  </TextShimmerWave>
                  <p className="text-sm text-gray-600">Loading repository file tree and project details...</p>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Unified Screen - All sections in one card - Only show when loaded */}
                <Card className="bg-white shadow-lg border-gray-200 w-full max-w-full overflow-hidden box-border h-full flex flex-col">
                  <CardContent className="p-3 md:p-4 lg:p-6 overflow-x-hidden overflow-y-auto box-border max-w-full flex-1 min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3 md:gap-4 lg:gap-6 w-full max-w-full box-border">
                      {/* Left Side: GitHub File Tree and Generate Content */}
                      <div className="space-y-4 w-full min-w-0 overflow-hidden box-border">
                        {/* Generate Content Section - Moved to top of left column */}
                        <div className="w-full max-w-full overflow-hidden box-border">
                          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap w-full max-w-full">
                            <h3 className="text-gray-900 text-base font-semibold flex-shrink-0">Generate Content</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedProject(null);
                                setSelectedPlatforms([]);
                                setGeneratedContent({});
                                setCustomMessage("");
                                setSelectedFiles(new Set());
                                setSelectedMedia(new Set());
                                setSelectedTeamMembers(new Set());
                              }}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-shrink-0 text-xs sm:text-sm"
                            >
                              ← Back to Project Selection
                            </Button>
                          </div>
                          <div className="space-y-3 w-full max-w-full">
                            <div>
                              <Label htmlFor="custom-message" className="mb-2 block text-gray-700">
                                Custom Message (Optional)
                              </Label>
                              <Textarea
                                id="custom-message"
                                placeholder="Add a custom message that will be incorporated into the generated posts..."
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                rows={3}
                                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 w-full resize-none"
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <Switch
                                id="use-ai"
                                checked={useAI}
                                onCheckedChange={(checked) => {
                                  console.log('🤖 AI Enhancement toggle changed:', checked);
                                  setUseAI(checked);
                                }}
                              />
                              <Label htmlFor="use-ai" className="flex items-center gap-2 text-gray-700">
                                <Sparkles className="w-4 h-4" />
                                Use AI Enhancement
                                {useAI ? (
                                  <span className="text-xs text-green-600 font-medium">(Enabled)</span>
                                ) : (
                                  <span className="text-xs text-gray-500 font-medium">(Disabled)</span>
                                )}
                              </Label>
                            </div>

                            <Button
                              onClick={handleGenerate}
                              disabled={!canGenerate}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              {generateMutation.isPending ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Generate Content
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Repository File Tree - Temporarily disabled to prevent resource exhaustion */}
                        {false && githubInfo ? (
                          <div>
                            <div className="mb-2">
                              <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2 mb-1">
                                <Github className="w-5 h-5" />
                                Repository File Tree
                              </h3>
                              <p className="text-xs text-gray-600">
                                Select files or folders to include in your post
                              </p>
                            </div>
                            <div className="max-h-[450px] overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                              {githubInfo ? (
                                <GitHubFileTree
                                  owner={githubInfo.owner}
                                  repo={githubInfo.repo}
                                  onFileSelect={(files) => {
                                    setSelectedFiles(files);
                                    console.log('Selected files:', Array.from(files));
                                  }}
                                  onLoadComplete={() => {
                                    console.log('GitHub file tree loaded');
                                    setIsFileTreeLoading(false);
                                  }}
                                />
                              ) : (
                                <div className="text-center py-8 text-sm text-gray-500">
                                  GitHub repository information missing.
                                </div>
                              )}
                            </div>
                            {selectedFiles.size > 0 && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm font-medium text-blue-900 mb-2">
                                  {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
                                </p>
                                <div className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                                  {Array.from(selectedFiles).slice(0, 10).map((path) => (
                                    <div key={path} className="truncate font-mono">{path}</div>
                                  ))}
                                  {selectedFiles.size > 10 && (
                                    <div className="text-gray-500">... and {selectedFiles.size - 10} more</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : githubInfo ? (
                          <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                            <Github className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-1">
                              Repository file tree loading is temporarily disabled
                            </p>
                            <p className="text-xs text-gray-500">
                              GitHub repository: {githubInfo.owner}/{githubInfo.repo}
                            </p>
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-sm text-gray-600">
                              No GitHub repository linked to this project
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Side: Features, Media, Team, and Platform Options */}
                      <div className="space-y-6 w-full min-w-0 overflow-hidden box-border">
                        {/* Project Features */}
                        {projectFeatures.length > 0 && (
                          <div className="w-full max-w-full overflow-hidden box-border">
                            <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2 mb-3">
                              <Star className="w-4 h-4" />
                              Project Features
                            </h3>
                            <div className="flex flex-wrap gap-2 w-full max-w-full">
                              {projectFeatures.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-300 break-words max-w-full">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Media Files */}
                        {projectDetailsLoading ? (
                          <div className="p-6 text-center">
                            <Loader2 className="w-4 h-4 animate-spin inline mr-2 text-gray-600" />
                            <span className="text-sm text-gray-600">Loading project media...</span>
                          </div>
                        ) : projectMedia.length > 0 ? (
                          <div className="w-full max-w-full overflow-hidden box-border">
                            <div className="flex items-center justify-between mb-3 w-full max-w-full">
                              <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Project Media ({projectMedia.length})
                              </h3>
                              {selectedMedia.size > 0 && (
                                <span className="text-sm text-blue-600 font-medium flex-shrink-0">
                                  {selectedMedia.size} selected
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-3 w-full max-w-full">
                              Click to select multiple media items to include in your post
                            </p>
                            {projectMedia.length > 1 && (
                              <div className="flex gap-2 mb-3 w-full max-w-full">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMedia(new Set(projectMedia.map(m => m.id)));
                                  }}
                                  className="text-xs h-7 flex-shrink-0"
                                >
                                  Select All
                                </Button>
                                {selectedMedia.size > 0 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedMedia(new Set());
                                    }}
                                    className="text-xs h-7 flex-shrink-0"
                                  >
                                    Clear All
                                  </Button>
                                )}
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-full box-border">
                              {projectMedia.map((media) => (
                                <div
                                  key={media.id}
                                  className={cn(
                                    "relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all group",
                                    selectedMedia.has(media.id)
                                      ? 'border-blue-500 ring-2 ring-blue-200 shadow-md'
                                      : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                                  )}
                                  onClick={() => {
                                    const newSelected = new Set(selectedMedia);
                                    if (newSelected.has(media.id)) {
                                      newSelected.delete(media.id);
                                    } else {
                                      newSelected.add(media.id);
                                    }
                                    setSelectedMedia(newSelected);
                                  }}
                                >
                                  {media.category === 'IMAGES' || media.type?.startsWith('image/') ? (
                                    <ImageWithFallback
                                      src={media.thumbnailUrl ? media.thumbnailUrl : (media.url ? media.url : undefined)}
                                      fallbackSrc={media.url ? media.url : undefined}
                                      alt={media.name}
                                      className="w-full h-24 object-cover"
                                    />
                                  ) : media.category === 'VIDEOS' || media.type?.startsWith('video/') ? (
                                    <div className="w-full h-24 bg-gray-100 relative overflow-hidden">
                                      {media.thumbnailUrl ? (
                                        <ImageWithFallback
                                          src={media.thumbnailUrl}
                                          fallbackSrc={media.url ? media.url : undefined}
                                          alt={media.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <video
                                          src={media.url}
                                          className="w-full h-full object-cover"
                                          muted
                                          playsInline
                                          onLoadedMetadata={(e) => {
                                            // Try to capture a frame as thumbnail
                                            const video = e.target as HTMLVideoElement;
                                            video.currentTime = 0.1; // Seek to 0.1 seconds
                                          }}
                                        />
                                      )}
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
                                      <span className="text-xs text-gray-600">{media.name}</span>
                                    </div>
                                  )}
                                  {selectedMedia.has(media.id) && (
                                    <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1.5 shadow-lg z-10">
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                  {/* Selection overlay for better visual feedback */}
                                  {selectedMedia.has(media.id) && (
                                    <div className="absolute inset-0 bg-blue-500/5 pointer-events-none rounded-lg" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* Team Members */}
                        {projectDetailsLoading ? (
                          <div className="p-6 text-center">
                            <Loader2 className="w-4 h-4 animate-spin inline mr-2 text-gray-600" />
                            <span className="text-sm text-gray-600">Loading team members...</span>
                          </div>
                        ) : projectTeamMembers.length > 0 ? (
                          <div className="w-full max-w-full overflow-hidden box-border">
                            <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2 mb-3">
                              <Linkedin className="w-4 h-4" />
                              Team Members ({projectTeamMembers.length})
                            </h3>
                            <div className="space-y-2 w-full max-w-full">
                              {projectTeamMembers.map((member) => (
                                <div
                                  key={member.id}
                                  className={cn(
                                    "flex items-center gap-3 p-2 border rounded-lg cursor-pointer transition-all",
                                    selectedTeamMembers.has(member.id)
                                      ? 'border-purple-500 bg-purple-50'
                                      : 'border-gray-300 hover:border-gray-400'
                                  )}
                                  onClick={() => {
                                    const newSelected = new Set(selectedTeamMembers);
                                    if (newSelected.has(member.id)) {
                                      newSelected.delete(member.id);
                                    } else {
                                      newSelected.add(member.id);
                                    }
                                    setSelectedTeamMembers(newSelected);
                                  }}
                                >
                                  {member.avatar ? (
                                    <img
                                      src={member.avatar}
                                      alt={member.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                      <span className="text-xs font-medium text-purple-700">
                                        {member.name.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-900">{member.name}</p>
                                    <p className="text-xs text-gray-600">{member.role}</p>
                                  </div>
                                  {selectedTeamMembers.has(member.id) && (
                                    <CheckCircle className="w-4 h-4 text-purple-600" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {/* Platform Selection */}
                        <div className="w-full max-w-full overflow-hidden box-border">
                          <h3 className="text-gray-900 text-base font-semibold mb-3">Select Platforms</h3>
                          <div className="w-full max-w-full overflow-hidden">
                            <PlatformSelector
                              platforms={platforms}
                              selectedPlatforms={selectedPlatforms}
                              onToggle={(platform) => {
                                setSelectedPlatforms((prev) =>
                                  prev.includes(platform)
                                    ? prev.filter((p) => p !== platform)
                                    : [...prev, platform]
                                );
                              }}
                              statuses={statusData?.statuses || []}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        )
        }
      </AnimatePresence >

      {/* Connection Status Warning - Only show when project is selected */}
      {
        selectedProject && unconnectedPlatforms.length > 0 && selectedPlatforms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full max-w-full box-border"
          >
            <Card className="border-yellow-500 bg-yellow-50 shadow-lg w-full max-w-full overflow-hidden box-border">
              <CardContent className="pt-6 overflow-x-hidden w-full max-w-full box-border">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-900 mb-1">
                      Platform Accounts Not Connected
                    </h3>
                    <p className="text-sm text-yellow-800 mb-3">
                      You need to connect your {unconnectedPlatforms.join(', ')} account{unconnectedPlatforms.length > 1 ? 's' : ''} before publishing.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/integrations")}
                        className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
                      >
                        Connect Accounts
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          refetchIntegrationStatus();
                          toast.info("Refreshing connection status...");
                        }}
                        className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Status
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      }

      {/* Step 4: Preview & Publish - Only show when content is generated */}
      {
        selectedProject && Object.keys(generatedContent).length > 0 && (
          <PreviewPublishModal
            generatedContent={generatedContent}
            platforms={platforms}
            isLoading={generateMutation.isPending}
            selectedPlatforms={selectedPlatforms}
            canPublish={canPublish}
            publishMutation={publishMutation}
            onPublish={handlePublish}
            onClose={() => setGeneratedContent({})}
            onRegenerate={handleGenerate}
            isRegenerating={generateMutation.isPending}
            onEdit={(platform, content) => {
              setGeneratedContent(prev => ({
                ...prev,
                [platform]: content
              }));
            }}
          />
        )
      }

      {/* Publish Results Modal */}
      <Dialog open={showPublishModal} onOpenChange={setShowPublishModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Publishing Results
            </DialogTitle>
            <DialogDescription>
              {publishedResults.filter(r => r.success).length > 0
                ? "Your posts have been published! Click the links below to view them on each platform."
                : "Publishing completed with some issues. See details below."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {publishedResults.map((result, index) => {
              const platform = platforms.find(p => p.id === result.platform);
              const platformName = platform?.name || result.platform;
              const platformIcon = platform?.icon;

              return (
                <Card
                  key={index}
                  className={`border-2 ${result.success
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                    }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${result.success ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                          }`}>
                          {result.success ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {platformIcon && <span className="text-lg">{platformIcon}</span>}
                            <h4 className="font-semibold">{platformName}</h4>
                            {result.success && (
                              <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">
                                Published
                              </span>
                            )}
                          </div>

                          {result.success ? (
                            <div className="space-y-2">
                              {result.url ? (
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Your post is live!
                                  </p>
                                  <Button
                                    onClick={() => window.open(result.url, '_blank', 'noopener,noreferrer')}
                                    className="w-full sm:w-auto"
                                    variant={result.success ? "default" : "outline"}
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View on {platformName}
                                  </Button>
                                </div>
                              ) : result.postId ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Published successfully (Post ID: {result.postId})
                                </p>
                              ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Published successfully!
                                </p>
                              )}
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
                                Failed to publish
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {result.error || 'Unknown error occurred'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                // Reset form if all succeeded
                const allSuccess = publishedResults.every(r => r.success);
                if (allSuccess) {
                  setSelectedProject(null);
                  setSelectedPlatforms([]);
                  setGeneratedContent({});
                  setCustomMessage("");
                }
                setShowPublishModal(false);
                setPublishedResults([]);
              }}
            >
              Close
            </Button>
            {publishedResults.filter(r => r.success && r.url).length > 0 && (
              <Button
                onClick={() => {
                  // Open all successful posts in new tabs
                  publishedResults
                    .filter(r => r.success && r.url)
                    .forEach(r => {
                      window.open(r.url, '_blank', 'noopener,noreferrer');
                    });
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open All ({publishedResults.filter(r => r.success && r.url).length})
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
}

