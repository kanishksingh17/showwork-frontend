import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowDown,
  RefreshCw,
  Search,
  Grid3X3,
  List,
  Download,
  Trash2,
  Star,
  Globe,
  Lock,
  EyeOff,
  Code,
  BarChart,
  PieChart,
  Github,
  Zap,
  Plus,
  Eye,
  CheckCircle,
  Edit3,
  ArrowUp,
  ArrowUpDown,
  Package,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/auth/LoginModal";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string;
  descriptionCanonical?: string;
  descriptionShort?: string;
  resumeBullet?: string;
  status: "draft" | "pending" | "published" | "in-progress" | "saved" | "pending_review";
  lastUpdated: string;
  category: string;
  views?: number;
  submittedAt?: string;
  visibility?: "public" | "private" | "unlisted";
  tags?: string[];
  technologies?: string[];
  media?: any[];
  codeQualityScore?: number;
  likes?: number;
  githubUrl?: string;
  liveUrl?: string;
  showcase?: boolean;
  mediaFiles?: any[];
  teamMembers?: any[];
}

interface ShowcaseDashboardProps {
  onBackToDashboard?: () => void;
  onCreateProject?: () => void;
  onEditProject?: (projectId: string) => void;
  isDemo?: boolean;
  showcase?: boolean;
}

const detectProjectDomain = (language?: string, technologies: string[] = []) => {
  const allTags = [language, ...technologies].map(t => t?.toLowerCase()).filter(Boolean);

  if (allTags.some(t => ['python', 'r', 'jupyter', 'pytorch', 'tensorflow', 'numpy', 'pandas'].includes(t!))) {
    return "Data Science & AI";
  }
  if (allTags.some(t => ['solidity', 'blockchain', 'ethereum', 'web3', 'rust'].includes(t!))) {
    return "Web3 & Blockchain";
  }
  if (allTags.some(t => ['android', 'kotlin', 'swift', 'ios', 'flutter', 'react native'].includes(t!))) {
    return "Mobile Development";
  }
  if (allTags.some(t => ['unity', 'unreal', 'game'].includes(t!))) {
    return "Game Development";
  }
  if (allTags.some(t => ['c', 'cpp', 'arduino', 'embedded', 'raspberry pi'].includes(t!))) {
    return "Embedded Systems";
  }
  if (allTags.some(t => ['javascript', 'typescript', 'react', 'next.js', 'html', 'css', 'vue', 'angular'].includes(t!))) {
    return "Web Development";
  }

  return language || "Software Development";
};

const ShowcaseDashboard = ({
  onBackToDashboard,
  onCreateProject,
  onEditProject,
  isDemo = false,
}: ShowcaseDashboardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);

  // Determine current page based on route
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/analytics") return "analytics";
    if (path === "/community") return "community";
    if (path === "/dashboard") return "dashboard";
    if (path === "/showcase") return "showcase";
    return "showcase"; // default
  };

  const currentPage = getCurrentPage();

  // Sorting and filtering state
  const [sortField, setSortField] = useState<
    "name" | "lastUpdated" | "views" | "status" | "codeQualityScore" | "likes"
  >("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    navigate("/dashboard");
    // Optionally refresh data if remaining on the same page
  };
  const [showAnalytics, setShowAnalytics] = useState(false);



  const [isGitHubConnected, setIsGitHubConnected] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isFetchingGithub, setIsFetchingGithub] = useState(false);
  const [githubRepos, setGithubRepos] = useState<Project[]>([]);

  // Parallelize status check and project loading for faster initialization
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/integrations/status");
      if (res.ok) {
        const data = await res.json();
        const github = data.statuses?.find((s: any) => s.platform === "github");
        const connected = !!github?.connected;
        setIsGitHubConnected(connected);
        if (!connected) setGithubRepos([]);
        return connected;
      }
    } catch (err) {
      console.error("Status check failed:", err);
    }
    return false;
  };

  const fetchPrimaryProjects = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${apiBaseUrl}/api/projects`, { credentials: 'include' });
      if (res.ok) {
        const result = await res.json();
        const rawProjects = result.projects || result.data?.projects || [];
        const mapped = rawProjects.map((p: any) => {
          const technologies = (p.technologies || [])
            .map((t: any) => {
              if (typeof t === 'string') return t;
              if (t && typeof t === 'object' && t.name) {
                return t.name;
              }
              return null;
            })
            .filter((t: string | null): t is string => t !== null && t !== "");

          return {
            id: p.id || p._id,
            name: p.name || p.title,
            description: p.description,
            status: p.status || "draft",
            lastUpdated: p.updatedAt || p.createdAt || new Date().toISOString(),
            category: p.category && p.category !== "Web Development" ? p.category : detectProjectDomain(p.language, technologies),
            githubUrl: p.githubUrl,
            visibility: p.visibility || "public",
            tags: p.tags || [],
            technologies: technologies,
            showcase: p.showcase,
            descriptionCanonical: p.descriptionCanonical || p.description,
            descriptionShort: p.descriptionShort || p.description,
            resumeBullet: p.resumeBullet
          };
        });
        setProjects(mapped);
        return mapped;
      }
    } catch (err) {
      console.error("Projects fetch failed:", err);
    }
    return [];
  };

  const initializeShowcase = async () => {
    if (isDemo) {
      setIsLoadingData(false);
      return;
    }

    setIsLoadingData(true);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    try {
      console.log("🚀 Initializing showcase data...");

      // Run both in parallel but allow them to finish whenever
      const [isConnected, apiProjects] = await Promise.all([
        fetchStatus(),
        fetchPrimaryProjects()
      ]);

      // Release global loading once both primary tracks are done
      setIsLoadingData(false);

      // Stage 2: Background sync for GitHub repos if connected
      const lastSync = sessionStorage.getItem('last_github_sync');
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;

      if (isConnected && (!lastSync || now - parseInt(lastSync) > oneHour)) {
        sessionStorage.setItem('last_github_sync', now.toString());
        fetchGitHubRepos(apiProjects);
      }

      // Automatically trigger a silent category fix on every initialization for debugging
      // fetch(`${apiBaseUrl}/api/projects/fix-categories`, {
      //   method: 'POST',
      //   credentials: 'include'
      // }).catch(err => console.error("Auto category fix failed:", err));

      // Trigger systematic content enhancement for projects missing variants
      // fetch(`${apiBaseUrl}/api/projects/systematic-fix`, {
      //   method: 'POST',
      //   credentials: 'include'
      // }).then(res => {
      //   if (res.ok) {
      //     // Success - projects are being enhanced in background
      //     setTimeout(fetchPrimaryProjects, 2000);
      //   }
      // }).catch(err => console.error("Systematic project fix failed:", err));

      // Trigger systematic profile enhancement
      // fetch(`${apiBaseUrl}/api/user/systematic-fix`, {
      //   method: 'POST',
      //   credentials: 'include'
      // }).catch(err => console.error("Systematic user fix failed:", err));

    } catch (error) {
      console.error("❌ Error initializing showcase:", error);
      setIsLoadingData(false);
    }
  };


  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const handleToggleShowcase = async (project: Project) => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const newShowcaseValue = !project.showcase;

      // Update local state immediately for snappy UI
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, showcase: newShowcaseValue } : p));

      const response = await fetch(`${apiBaseUrl}/api/projects/toggle-showcase`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          showcase: newShowcaseValue
        }),
      });

      if (!response.ok) {
        // Rollback
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, showcase: !newShowcaseValue } : p));
        console.error("Failed to toggle showcase:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to toggle showcase:", error);
    }
  };

  const handleEnhanceWithAI = async (project: Project) => {
    if (isEnhancing) return;
    setIsEnhancing(project.id);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/projects/enhance?id=${project.id}`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        const updatedProject = result.data;
        setProjects(prev => prev.map(p => p.id === project.id ? {
          ...p,
          technologies: updatedProject.technologies,
          tags: updatedProject.tags
        } : p));
      } else {
        const error = await response.json();
        console.error(`Enhancement failed: ${error.message}`);
      }
    } finally {
      setIsEnhancing(null);
    }
  };

  const fetchGitHubRepos = async (existingProjects?: Project[]) => {
    if (isFetchingGithub) return;
    setIsFetchingGithub(true);
    try {
      console.log("📂 Background sync: Fetching GitHub repositories...");
      const res = await fetch("/api/integrations/github/repos");
      if (!res.ok) throw new Error("Failed to fetch repos");
      const result = await res.json();
      const repos = Array.isArray(result) ? result : (result.repos || []);

      const importedUrls = new Set((existingProjects || projects).map(p => p.githubUrl?.toLowerCase()));

      const mappedRepos: Project[] = repos
        .map((repo: any) => {
          const domain = detectProjectDomain(repo.language, []);
          return {
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description || "Project from GitHub",
            status: "pending_review" as const,
            lastUpdated: repo.updated_at,
            category: domain,
            githubUrl: repo.html_url,
            visibility: repo.private ? "private" : "public",
            tags: [repo.language].filter(Boolean),
            isGithubRepo: true
          };
        })
        .filter((repo: Project) => !repo.githubUrl || !importedUrls.has(repo.githubUrl.toLowerCase()));

      setGithubRepos(mappedRepos);

      // Backend now auto-syncs repos into projects. Refresh the main list immediately.
      if ((result.syncedCount || 0) > 0 || mappedRepos.length > 0) {
        await fetchPrimaryProjects();
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
    } finally {
      setIsFetchingGithub(false);
    }
  };



  const handleImportAndEdit = async (project: Project) => {
    setIsLoadingData(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      const payload = {
        title: project.name,
        description: project.description,
        githubUrl: project.githubUrl,
        technologies: project.technologies || project.tags || [],
        status: 'pending_review',
        visibility: project.visibility || 'public',
        category: project.category
      };

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const projectData = result.data?.project || result.data;
        if (projectData && (projectData.id || projectData._id)) {
          const newId = projectData.id || projectData._id;
          // Use the manual form route
          navigate(`/showcase/manual-add`, {
            state: {
              projectData: {
                ...project,
                id: newId
              }
            }
          });
          return;
        }
      }

      // Fallback
      navigate(`/showcase/manual-add`, { state: { projectData: project } });
    } catch (error) {
      console.error("Failed to import project before editing:", error);
      navigate(`/showcase/manual-add`, { state: { projectData: project } });
    } finally {
      setIsLoadingData(false);
    }
  };

  const loadProjects = initializeShowcase;



  // Load projects from API on component mount
  useEffect(() => {
    initializeShowcase();
  }, [isDemo]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates by randomly updating view counts
      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project.status === "published" && Math.random() > 0.7) {
            return {
              ...project,
              views: (project.views || 0) + Math.floor(Math.random() * 5) + 1,
              lastUpdated: "Just now",
            };
          }
          return project;
        }),
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          (project.tags &&
            project.tags.some((tag) => tag.toLowerCase().includes(query))) ||
          (project.technologies &&
            project.technologies.some((tech) =>
              tech.toLowerCase().includes(query),
            ));
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== "all" && project.status !== statusFilter)
        return false;

      // Category filter
      if (categoryFilter !== "all" && project.category !== categoryFilter)
        return false;

      // Visibility filter
      if (visibilityFilter !== "all" && project.visibility !== visibilityFilter)
        return false;

      return true;
    });

    // Sort projects
    return filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "lastUpdated":
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
        case "views":
          aValue = a.views || 0;
          bValue = b.views || 0;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "codeQualityScore":
          aValue = a.codeQualityScore || 0;
          bValue = b.codeQualityScore || 0;
          break;
        case "likes":
          aValue = a.likes || 0;
          bValue = b.likes || 0;
          break;
        default:
          return 0;
      }

      // Primary sort: published first
      const aStatus = (a.status || '').toLowerCase();
      const bStatus = (b.status || '').toLowerCase();

      if (aStatus === 'published' && bStatus !== 'published') return -1;
      if (aStatus !== 'published' && bStatus === 'published') return 1;

      // Secondary sort: by selected field
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }, [
    projects,
    searchQuery,
    statusFilter,
    categoryFilter,
    visibilityFilter,
    sortField,
    sortDirection,
  ]);

  const handleSort = (
    field:
      | "name"
      | "lastUpdated"
      | "views"
      | "status"
      | "codeQualityScore"
      | "likes",
  ) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId],
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredAndSortedProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredAndSortedProjects.map((p) => p.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProjects.length === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedProjects.length} project(s)? This action cannot be undone.`)) {
      return;
    }

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      console.log(`🗑️  Deleting ${selectedProjects.length} project(s)...`);

      // Delete each project via API
      const deletePromises = selectedProjects.map(async (projectId) => {
        const response = await fetch(`${apiBaseUrl}/api/projects/${projectId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(`Failed to delete project ${projectId}: ${errorData.error || response.statusText}`);
        }

        return response.json();
      });

      await Promise.all(deletePromises);

      console.log("✅ All projects deleted successfully");

      // Refresh projects from API to ensure consistency
      await loadProjects();

      // Clear selection
      setSelectedProjects([]);

      // Show success message
      alert(`Successfully deleted ${selectedProjects.length} project(s)!`);
    } catch (error) {
      console.error("❌ Error deleting projects:", error);
      alert(`Failed to delete projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleBulkExport = () => {
    if (selectedProjects.length === 0) return;

    const selectedProjectsData = projects.filter((p) =>
      selectedProjects.includes(p.id),
    );
    const dataStr = JSON.stringify(selectedProjectsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects-export.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      // Reload projects from API
      await loadProjects();
    } catch (error) {
      console.error("❌ Error refreshing projects:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const savedProjects = filteredAndSortedProjects.filter(
    (p) => p.status === "draft",
  );
  const submittedProjects = filteredAndSortedProjects.filter(
    (p) => p.status !== "draft",
  );

  // Analytics data
  const analyticsData = useMemo(() => {
    const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);
    const avgCodeQuality =
      projects.length > 0
        ? projects.reduce((sum, p) => sum + (p.codeQualityScore || 0), 0) /
        projects.length
        : 0;

    const statusCounts = projects.reduce(
      (acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const categoryCounts = projects.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalViews,
      totalLikes,
      avgCodeQuality: Math.round(avgCodeQuality),
      statusCounts,
      categoryCounts,
      totalProjects: projects.length,
      publishedProjects: statusCounts.published || 0,
      draftProjects: statusCounts.draft || 0,
    };
  }, [projects]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge
            variant="secondary"
            className="bg-[#292e38] text-white hover:bg-[#3c4453] whitespace-nowrap flex-shrink-0"
          >
            Draft
          </Badge>
        );
      case "pending":
      case "pending_review":
        return (
          <Badge
            variant="outline"
            className="border-orange-200 text-orange-700 bg-orange-100 flex items-center gap-1 whitespace-nowrap flex-shrink-0"
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            Pending Review
          </Badge>
        );
      case "published":
        return (
          <Badge
            variant="outline"
            className="border-[#10B981] text-[#10B981] bg-[#10B981]/10 whitespace-nowrap flex-shrink-0"
          >
            Published
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="border-[#8B5CF6] text-[#8B5CF6] bg-[#8B5CF6]/10 whitespace-nowrap flex-shrink-0"
          >
            In Progress
          </Badge>
        );
      case "saved":
        return (
          <Badge
            variant="outline"
            className="border-[#6366F1] text-[#6366F1] bg-[#6366F1]/10 whitespace-nowrap flex-shrink-0"
          >
            Saved
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="border-[#10B981] text-[#10B981] bg-[#10B981]/10 whitespace-nowrap flex-shrink-0"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getVisibilityIcon = (visibility?: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="w-4 h-4 text-green-600" />;
      case "private":
        return <Lock className="w-4 h-4 text-gray-600" />;
      case "unlisted":
        return <EyeOff className="w-4 h-4 text-yellow-600" />;
      default:
        return <Globe className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <UnifiedLayout activePage="showcase" showAuthButtons={isDemo}>
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                <span>
                  {currentPage === "analytics"
                    ? "Analytics"
                    : currentPage === "community"
                      ? "Community"
                      : "Showcase"}
                </span>
                <span className="mx-2">/</span>
                <span className="text-gray-900">
                  {currentPage === "analytics"
                    ? "Dashboard"
                    : currentPage === "community"
                      ? "Community Hub"
                      : "My Projects"}
                </span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentPage === "analytics"
                  ? "Analytics Dashboard"
                  : currentPage === "community"
                    ? "Community Hub"
                    : "My Projects"}
              </h1>
              <p className="text-sm text-gray-500">
                {currentPage === "analytics"
                  ? "Track your project performance and insights"
                  : currentPage === "community"
                    ? "Connect with other developers and share your work"
                    : "Manage and showcase your portfolio projects"}
              </p>
            </div>
            {currentPage === "showcase" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="flex items-center gap-2"
                >
                  <BarChart className="w-4 h-4" />
                  {showAnalytics ? "Hide Analytics" : "Show Analytics"}
                </Button>

                <Button

                  onClick={() => {
                    if (isDemo) {
                      setIsLoginModalOpen(true);
                      return;
                    }
                    navigate("/showcase/quick-add");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mr-2"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Add
                </Button>
                <Button
                  onClick={() => {
                    if (isDemo) {
                      setIsLoginModalOpen(true);
                      return;
                    }
                    navigate("/showcase/add");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>

                {isGitHubConnected && (
                  <Button
                    variant="outline"
                    onClick={() => fetchGitHubRepos()}
                    disabled={isFetchingGithub}
                    className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <RefreshCw className={cn("w-4 h-4", isFetchingGithub && "animate-spin")} />
                    {isFetchingGithub ? "Syncing..." : "Sync Repos"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        {currentPage === "showcase" && (
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="Desktop App">Desktop App</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Machine Learning">
                      Machine Learning
                    </SelectItem>
                    <SelectItem value="Game Development">
                      Game Development
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentPage === "analytics" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Analytics Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-900">
                      Total Views
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">1,234</p>
                    <p className="text-xs text-blue-600">
                      +12% from last month
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-900">
                      Engagement Rate
                    </h3>
                    <p className="text-2xl font-bold text-green-600">85%</p>
                    <p className="text-xs text-green-600">
                      +5% from last month
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-purple-900">
                      Active Projects
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-xs text-purple-600">3 new this week</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Trends
                </h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    Chart visualization coming soon...
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentPage === "community" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Community Hub
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">
                      Featured Projects
                    </h3>
                    <p className="text-sm opacity-90">
                      Discover amazing work from the community
                    </p>
                    <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                      Explore
                    </button>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">
                      Developer Forums
                    </h3>
                    <p className="text-sm opacity-90">
                      Connect and discuss with fellow developers
                    </p>
                    <button className="mt-4 bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                      Join Discussion
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        John Doe shared a new project
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      SM
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Sarah Miller commented on your project
                      </p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "showcase" && (
            <>
              {/* Analytics Section */}
              {showAnalytics && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Total Views
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                              {analyticsData.totalViews.toLocaleString()}
                            </p>
                          </div>
                          <Eye className="w-8 h-8 text-blue-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Total Likes
                            </p>
                            <p className="text-2xl font-bold text-red-600">
                              {analyticsData.totalLikes.toLocaleString()}
                            </p>
                          </div>
                          <Star className="w-8 h-8 text-red-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Avg Code Quality
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              {analyticsData.avgCodeQuality}%
                            </p>
                          </div>
                          <Code className="w-8 h-8 text-green-400" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Published
                            </p>
                            <p className="text-2xl font-bold text-purple-600">
                              {analyticsData.publishedProjects}
                            </p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-purple-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="w-5 h-5" />
                          Projects by Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(analyticsData.statusCounts).map(
                            ([status, count]) => (
                              <div
                                key={status}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(status)}
                                  <span className="text-sm text-gray-600 capitalize">
                                    {status}
                                  </span>
                                </div>
                                <span className="text-sm font-medium">
                                  {count}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart className="w-5 h-5" />
                          Projects by Category
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(analyticsData.categoryCounts).map(
                            ([category, count]) => (
                              <div
                                key={category}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm text-gray-600">
                                  {category}
                                </span>
                                <span className="text-sm font-medium">
                                  {count}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Additional Filters */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex gap-2">
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending_review">Pending Review</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={visibilityFilter}
                        onValueChange={setVisibilityFilter}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Visibility</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedProjects.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {selectedProjects.length} selected
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBulkExport}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBulkDelete}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Projects Display */}
              <div className="space-y-6">
                {/* Localized Loading State */}
                {isLoadingData && projects.length === 0 && (
                  <Card className="border-dashed border-2 p-12 mb-8 bg-white dark:bg-slate-800/50">
                    <CardContent className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center animate-pulse">
                          {isGitHubConnected ? (
                            <Github className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-bounce" />
                          ) : (
                            <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                        {isGitHubConnected && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white dark:border-slate-800">
                            <RefreshCw className="w-3 h-3 text-white animate-spin" />
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {isGitHubConnected ? "Fetching your GitHub projects..." : "Loading your showcase..."}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-8">
                        {isGitHubConnected
                          ? "We're syncing your repositories to help you build your showcase faster."
                          : "Please wait while we prepare your project dashboard."}
                      </p>

                      <div className="flex gap-4 opacity-50 pointer-events-none">
                        <div className="w-32 h-10 bg-gray-100 dark:bg-slate-700 rounded"></div>
                        <div className="w-32 h-10 bg-gray-100 dark:bg-slate-700 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isLoadingData && projects.length > 0 && (
                  <div className="flex items-center justify-center py-6 bg-blue-50/30 rounded-xl border border-blue-100/50 mb-6">
                    <RefreshCw className="w-5 h-5 text-blue-500 animate-spin mr-3" />
                    <span className="text-sm font-medium text-blue-700">Checking for updates...</span>
                  </div>
                )}



                {/* Empty State */}
                {!isLoadingData && projects.length === 0 && (
                  <Card className="border-dashed border-2 p-12 mb-8 bg-white dark:bg-slate-800/50">
                    <CardContent className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                        <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Get started with your showcase
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                        Your professional portfolio is currently empty. Connect your GitHub account to import projects automatically or add your best work manually.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => {
                            if (isDemo) {
                              setIsLoginModalOpen(true);
                              return;
                            }
                            // Trigger GitHub connect - navigate to integrations or directly to auth
                            window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/github/connect`;
                          }}
                          className="bg-gray-900 hover:bg-black text-white px-8 h-11"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Connect GitHub
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (isDemo) {
                              setIsLoginModalOpen(true);
                              return;
                            }
                            navigate("/showcase/add");
                          }}
                          className="px-8 h-11"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project Manually
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Filtered Empty State */}
                {!isLoadingData && projects.length > 0 && filteredAndSortedProjects.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <Search className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                        setVisibilityFilter("all");
                      }}
                      className="mt-2 text-blue-600"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
                {filteredAndSortedProjects.filter(p => p.status === 'published').length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-gray-900 text-2xl font-bold">
                        Published Projects ({filteredAndSortedProjects.filter(p => p.status === 'published').length})
                      </h2>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRefresh}
                          disabled={isRefreshing}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <RefreshCw
                            className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                          />
                          Refresh
                        </Button>
                      </div>
                    </div>

                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAndSortedProjects.filter(p => p.status === 'published').map((project) => (
                          <Card
                            key={project.id}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4 flex flex-col h-full">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedProjects.includes(
                                      project.id,
                                    )}
                                    onChange={() =>
                                      handleSelectProject(project.id)
                                    }
                                    className="rounded"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">
                                      {project.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {project.category}
                                    </p>
                                    {project.submittedAt && (
                                      <p className="text-xs text-gray-400">
                                        Submitted {project.submittedAt}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {getVisibilityIcon(project.visibility)}
                                  {getStatusBadge(project.status)}
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {project.description}
                              </p>

                              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-3">
                                  {project.views && (
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      {project.views.toLocaleString()}
                                    </span>
                                  )}
                                  {project.likes && (
                                    <span className="flex items-center gap-1">
                                      <Star className="w-3 h-3" />
                                      {project.likes}
                                    </span>
                                  )}
                                  {project.codeQualityScore && (
                                    <span className="flex items-center gap-1">
                                      <Code className="w-3 h-3" />
                                      {project.codeQualityScore}%
                                    </span>
                                  )}
                                </div>
                                <span>
                                  {new Date(
                                    project.lastUpdated,
                                  ).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="flex gap-2 flex-nowrap mt-auto pt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    navigate(`/showcase/view/${project.id}`)
                                  }
                                  className="flex-1 flex items-center justify-center gap-1 h-8"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleImportAndEdit(project)}
                                  className="h-8 w-8 p-0 flex items-center justify-center shrink-0"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-6 py-4 text-left">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedProjects.length ===
                                    submittedProjects.length &&
                                    submittedProjects.length > 0
                                  }
                                  onChange={() =>
                                    setSelectedProjects(
                                      submittedProjects.map((p) => p.id),
                                    )
                                  }
                                  className="rounded"
                                />
                              </th>
                              <th
                                className="px-6 py-4 text-left text-gray-900 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("name")}
                              >
                                <div className="flex items-center gap-2">
                                  Project
                                  {sortField === "name" &&
                                    (sortDirection === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : (
                                      <ArrowDown className="w-4 h-4" />
                                    ))}
                                  {sortField !== "name" && (
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-gray-900 text-sm font-medium">
                                Description
                              </th>
                              <th
                                className="px-6 py-4 text-left text-gray-900 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("status")}
                              >
                                <div className="flex items-center gap-2">
                                  Status
                                  {sortField === "status" &&
                                    (sortDirection === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : (
                                      <ArrowDown className="w-4 h-4" />
                                    ))}
                                  {sortField !== "status" && (
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </th>
                              <th
                                className="px-6 py-4 text-left text-gray-900 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("views")}
                              >
                                <div className="flex items-center gap-2">
                                  Views
                                  {sortField === "views" &&
                                    (sortDirection === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : (
                                      <ArrowDown className="w-4 h-4" />
                                    ))}
                                  {sortField !== "views" && (
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-gray-500 text-sm font-medium">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredAndSortedProjects.filter(p => p.status === 'published').map((project) => (
                              <tr
                                key={project.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedProjects.includes(
                                      project.id,
                                    )}
                                    onChange={() =>
                                      handleSelectProject(project.id)
                                    }
                                    className="rounded"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    {getVisibilityIcon(project.visibility)}
                                    <div>
                                      <div className="text-gray-900 font-medium">
                                        {project.name}
                                      </div>
                                      <div className="text-gray-500 text-sm">
                                        {project.category}
                                      </div>
                                      {project.submittedAt && (
                                        <div className="text-gray-500 text-xs mt-1">
                                          Submitted {project.submittedAt}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm max-w-md">
                                  {project.description}
                                </td>
                                <td className="px-6 py-4">
                                  {getStatusBadge(project.status)}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-gray-500 text-sm">
                                    {project.views ? (
                                      <span className="text-gray-900 font-medium">
                                        {project.views.toLocaleString()}
                                      </span>
                                    ) : (
                                      <span className="text-gray-500">-</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => navigate(`/showcase/view/${project.id}`)}
                                      className="flex-1"
                                    >
                                      <Eye className="w-3.5 h-3.5 mr-2" />
                                      View
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => navigate(`/showcase/edit/${project.id}`)}
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* All Other Projects */}
                {filteredAndSortedProjects.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-gray-900 text-2xl font-bold">
                        All Projects ({filteredAndSortedProjects.length})
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAll}
                        className="text-sm"
                      >
                        {selectedProjects.length === filteredAndSortedProjects.length
                          ? "Deselect All"
                          : "Select All"}
                      </Button>
                    </div>

                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAndSortedProjects
                          .map((project) => (
                            <Card
                              key={project.id}
                              className="hover:shadow-md transition-shadow"
                            >
                              <CardContent className="p-4 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={selectedProjects.includes(
                                        project.id,
                                      )}
                                      onChange={() =>
                                        handleSelectProject(project.id)
                                      }
                                      className="rounded"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-gray-900 line-clamp-1">
                                          {project.name}
                                        </h3>
                                        {project.githubUrl && (
                                          <div title="Imported from GitHub">
                                            <Github className="w-3.5 h-3.5 text-gray-400" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                                          {project.category}
                                        </span>
                                        {project.technologies?.slice(0, 3).map((tech: any) => (
                                          <span key={tech.id || tech.name || tech} className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                                            {tech.name || tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-1">
                                      {getVisibilityIcon(project.visibility)}
                                      {getStatusBadge(project.status)}
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                      <Switch
                                        id={`showcase-${project.id}`}
                                        checked={project.showcase}
                                        onCheckedChange={() => handleToggleShowcase(project)}
                                      />
                                      <Label htmlFor={`showcase-${project.id}`} className="text-[10px] font-bold uppercase text-gray-500 cursor-pointer">Showcase</Label>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {project.description}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                  <div className="flex items-center gap-3">
                                    {project.views && (
                                      <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {project.views}
                                      </span>
                                    )}
                                    {project.likes && (
                                      <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {project.likes}
                                      </span>
                                    )}
                                    {project.codeQualityScore && (
                                      <span className="flex items-center gap-1">
                                        <Code className="w-3 h-3" />
                                        {project.codeQualityScore}%
                                      </span>
                                    )}
                                  </div>
                                  <span>
                                    {(() => {
                                      const d = new Date(project.lastUpdated);
                                      return isNaN(d.getTime()) ? 'No Date' : d.toLocaleDateString();
                                    })()}
                                  </span>
                                </div>

                                <div className="flex gap-2 flex-nowrap mt-auto pt-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/showcase/edit/${project.id}`)}
                                    className="flex-1 flex items-center justify-center gap-1 h-8"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/showcase/view/${project.id}`)}
                                    className="h-8 w-8 p-0 flex items-center justify-center shrink-0"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="px-6 py-4 text-left">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedProjects.length ===
                                    savedProjects.length &&
                                    savedProjects.length > 0
                                  }
                                  onChange={handleSelectAll}
                                  className="rounded"
                                />
                              </th>
                              <th
                                className="px-6 py-4 text-left text-gray-900 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("name")}
                              >
                                <div className="flex items-center gap-2">
                                  Project
                                  {sortField === "name" &&
                                    (sortDirection === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : (
                                      <ArrowDown className="w-4 h-4" />
                                    ))}
                                  {sortField !== "name" && (
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-gray-900 text-sm font-medium">
                                Description
                              </th>
                              <th
                                className="px-6 py-4 text-left text-gray-900 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("status")}
                              >
                                <div className="flex items-center gap-2">
                                  Status
                                  {sortField === "status" &&
                                    (sortDirection === "asc" ? (
                                      <ArrowUp className="w-4 h-4" />
                                    ) : (
                                      <ArrowDown className="w-4 h-4" />
                                    ))}
                                  {sortField !== "status" && (
                                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-gray-900 text-sm font-medium">
                                Showcase
                              </th>
                              <th className="px-6 py-4 text-left text-gray-500 text-sm font-medium">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {filteredAndSortedProjects.map((project) => (
                              <tr
                                key={project.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedProjects.includes(
                                      project.id,
                                    )}
                                    onChange={() =>
                                      handleSelectProject(project.id)
                                    }
                                    className="rounded"
                                  />
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    {getVisibilityIcon(project.visibility)}
                                    <div>
                                      <div className="text-gray-900 font-medium">
                                        {project.name}
                                      </div>
                                      <div className="text-gray-500 text-sm">
                                        {project.category}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm max-w-md">
                                  {project.description}
                                </td>
                                <td className="px-6 py-4">
                                  {getStatusBadge(project.status)}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id={`showcase-list-${project.id}`}
                                      checked={project.showcase}
                                      onCheckedChange={() => handleToggleShowcase(project)}
                                    />
                                    <Label htmlFor={`showcase-list-${project.id}`} className="text-[10px] font-bold uppercase text-gray-500 cursor-pointer">Showcase</Label>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/showcase/edit/${project.id}`,
                                        )
                                      }
                                      className="text-[#1E3A8A] hover:text-[#1D4ED8] font-medium text-sm transition-colors flex items-center gap-2"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                      {project.status === "draft"
                                        ? "Continue"
                                        : "Edit"}
                                    </button>
                                    <button
                                      onClick={() =>
                                        navigate(`/showcase/view/${project.id}`)
                                      }
                                      className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors flex items-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      View
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </UnifiedLayout>
  );
};

export default ShowcaseDashboard;
