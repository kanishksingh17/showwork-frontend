import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  Heart,
  Box,
  Send,
  Users,
  Share2,
  TrendingUp,
  Plus,
  Upload,
  Linkedin,
  Twitter,
  Facebook,
  Github,
  Instagram,
} from "lucide-react";
import { RedditIcon } from "@/components/BrandIcons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PortfolioHealthCard from "../components/PortfolioHealth/PortfolioHealthCard";
import PortfolioInsightsCard from "../components/PortfolioHealth/PortfolioInsightsCard";
import { ThemeToggle } from "../components/ThemeToggle";

import { UnifiedSidebar } from "../components/UnifiedSidebar";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { usePortfolioHealth } from "../hooks/usePortfolioHealth";
import { ProfileCard } from "../components/ProfileCard";
import { MiniBarChart } from "../components/MiniBarChart";
import { ShowWorkSearchBar } from "../components/ShowWorkSearchBar";
import { SocialPostPreview } from "../components/SocialPostPreview";
import { useAuth } from "@/contexts/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  interface ProjectItem {
    id: string;
    _id?: string;
    name?: string;
    title?: string;
    description?: string;
    status?: string;
    visibility?: string;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  }

  const [analytics, setAnalytics] = useState<{
    totalReach: number;
    engagement: number;
    totalViews: number;
    recentProjects: ProjectItem[];
    publishedProjects: number;
    socialMediaPosts?: number;
    socialMediaReach?: number;
  }>({
    totalReach: 0,
    engagement: 0,
    totalViews: 0,
    recentProjects: [],
    publishedProjects: 0,
    socialMediaPosts: 0,
    socialMediaReach: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<'day' | 'month' | 'year'>('day');

  const getChartData = (type: 'reach' | 'engagement') => {
    if (timeRange === 'day') {
      return type === 'reach' ? [
        { label: "Mon", value: 120, date: "Mon" },
        { label: "Tue", value: 200, date: "Tue" },
        { label: "Wed", value: 150, date: "Wed" },
        { label: "Thu", value: 300, date: "Thu" },
        { label: "Fri", value: 250, date: "Fri" },
        { label: "Sat", value: 400, date: "Sat" },
        { label: "Sun", value: 380, date: "Sun" },
      ] : [
        { label: "Mon", value: 2.5, date: "Mon" },
        { label: "Tue", value: 3.0, date: "Tue" },
        { label: "Wed", value: 4.5, date: "Wed" },
        { label: "Thu", value: 3.8, date: "Thu" },
        { label: "Fri", value: 5.2, date: "Fri" },
        { label: "Sat", value: 4.8, date: "Sat" },
        { label: "Sun", value: 4.5, date: "Sun" },
      ];
    } else if (timeRange === 'month') {
      return type === 'reach' ? [
        { label: "Jan", value: 1200, date: "Jan" },
        { label: "Feb", value: 1500, date: "Feb" },
        { label: "Mar", value: 1300, date: "Mar" },
        { label: "Apr", value: 1800, date: "Apr" },
        { label: "May", value: 2200, date: "May" },
        { label: "Jun", value: 2500, date: "Jun" },
        { label: "Jul", value: 2100, date: "Jul" },
        { label: "Aug", value: 2800, date: "Aug" },
        { label: "Sep", value: 3000, date: "Sep" },
        { label: "Oct", value: 3200, date: "Oct" },
        { label: "Nov", value: 2900, date: "Nov" },
        { label: "Dec", value: 3500, date: "Dec" },
      ] : [
        { label: "Jan", value: 3.5, date: "Jan" },
        { label: "Feb", value: 4.0, date: "Feb" },
        { label: "Mar", value: 3.8, date: "Mar" },
        { label: "Apr", value: 4.5, date: "Apr" },
        { label: "May", value: 5.0, date: "May" },
        { label: "Jun", value: 5.5, date: "Jun" },
        { label: "Jul", value: 5.2, date: "Jun" },
        { label: "Aug", value: 5.8, date: "Aug" },
        { label: "Sep", value: 6.0, date: "Sep" },
        { label: "Oct", value: 6.2, date: "Oct" },
        { label: "Nov", value: 5.9, date: "Nov" },
        { label: "Dec", value: 6.5, date: "Dec" },
      ];
    } else {
      // Year
      return type === 'reach' ? [
        { label: "2024", value: 15000, date: "2024" },
        { label: "2025", value: 25000, date: "2025" },
        { label: "2026", value: 35000, date: "2026" },
        { label: "2027", value: 45000, date: "2027" },
        { label: "2028", value: 60000, date: "2028" },
      ] : [
        { label: "2024", value: 4.2, date: "2024" },
        { label: "2025", value: 5.5, date: "2025" },
        { label: "2026", value: 6.8, date: "2026" },
        { label: "2027", value: 7.5, date: "2027" },
        { label: "2028", value: 8.2, date: "2028" },
      ];
    }
  };

  // Initialize userProfile from localStorage immediately for faster UI
  const initializeProfileFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        return {
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          username: userData.username,
          bio: userData.bio,
          techStack: userData.techStack,
          platformPreferences: userData.platformPreferences,
          createdAt: userData.createdAt,
          profileCompleted: userData.profileCompleted,
        };
      }
    } catch (error) {
      console.error("❌ Error initializing profile from localStorage:", error);
    }
    return null;
  };

  const [userProfile, setUserProfile] = useState<{
    name?: string;
    email?: string;
    avatar?: string;
    username?: string;
    bio?: string;
    techStack?: string[];
    platformPreferences?: string[];
    createdAt?: string;
    profileCompleted?: boolean;
  } | null>(initializeProfileFromStorage());

  const [recentPublishedPosts, setRecentPublishedPosts] = useState<Array<{
    id: string;
    projectName: string;
    projectImage?: string;
    platforms: string[];
    publishedAt: string;
    results: Array<{ platform: string; url?: string }>;
    content?: string; // Post content/message
  }>>([]);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [hoveredPost, setHoveredPost] = useState<{
    post: typeof recentPublishedPosts[0];
    platform: string;
    position: { x: number; y: number };
  } | null>(null);

  // Portfolio health hook
  const {
    data: portfolioHealth,
    loading: healthLoading,
    error: healthError,
    recompute: recomputeHealth,
  } = usePortfolioHealth();

  const resolvedUserProfile = user
    ? {
      name: user.name as string | undefined,
      email: user.email as string | undefined,
      avatar: (user.avatar || user.image) as string | undefined,
      username: user.username as string | undefined,
      bio: user.bio as string | undefined,
      techStack: user.techStack as string[] | undefined,
      platformPreferences: user.platformPreferences as string[] | undefined,
      createdAt: user.createdAt as string | undefined,
      profileCompleted: user.profileCompleted as boolean | undefined,
    }
    : userProfile;

  const fetchDashboardProjects = useCallback(async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    interface ProjectData {
      id?: string;
      _id?: string;
      name?: string;
      title?: string;
      description?: string;
      status?: string;
      visibility?: string;
      technologies?: string[];
      githubUrl?: string;
      liveUrl?: string;
      imageUrl?: string;
      image?: string;
      createdAt?: Date | string;
      updatedAt?: Date | string;
    }

    const response = await fetch(`${apiBaseUrl}/api/projects`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard projects');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Invalid projects response from server');
    }
    
    // Ensure projects is at least an empty array
    const rawProjects = data.data?.projects || data.projects || [];
    
    const apiProjects: ProjectItem[] = rawProjects.map((project: ProjectData) => ({
      id: project.id || project._id?.toString() || '',
      name: project.name || project.title || 'Untitled Project',
      description: project.description || '',
      status: project.status?.toLowerCase() || 'draft',
      visibility: project.visibility?.toLowerCase() || 'private',
      technologies: project.technologies || [],
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl || project.image || '',
      createdAt: project.createdAt || new Date(),
      updatedAt: project.updatedAt || new Date(),
    }));

    const publishedProjects = apiProjects.filter(
      (project) =>
        project.status === "published" || !project.status || project.visibility === "public",
    );

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const startOfThisWeek = new Date(now);
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfThisWeek.setDate(diff);
    startOfThisWeek.setHours(0, 0, 0, 0);

    const thisMonthProjects = publishedProjects.filter((project) => {
      const createdAt = new Date(project.createdAt || new Date());
      return createdAt >= startOfThisMonth;
    });

    const lastMonthProjects = publishedProjects.filter((project) => {
      const createdAt = new Date(project.createdAt || new Date());
      return createdAt >= startOfLastMonth && createdAt < startOfThisMonth;
    });

    const thisWeekProjects = publishedProjects.filter((project) => {
      const createdAt = new Date(project.createdAt || new Date());
      return createdAt >= startOfThisWeek;
    });

    return {
      recentProjects: publishedProjects.slice(0, 5),
      publishedProjects: publishedProjects.length,
      projectsThisMonth: thisMonthProjects.length,
      projectsLastMonth: lastMonthProjects.length,
      projectsThisWeek: thisWeekProjects.length,
    };
  }, []);

  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
    error: projectsQueryError,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ["projects", location.pathname],
    queryFn: fetchDashboardProjects,
    staleTime: 300000,
  });

  const loading = projectsLoading;
  const projectsThisMonth = projectsData?.projectsThisMonth ?? 0;
  const dashboardPublishedProjects = projectsData?.publishedProjects ?? 0;
  const dashboardRecentProjects = projectsData?.recentProjects ?? [];

  // Load analytics data (separate from projects)
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Fetch analytics data from multiple sources
        const [analyticsResponse, socialMediaResponse, publishedPostsResponse] = await Promise.allSettled([
          fetch("/api/dashboard/portfolio-metrics", { credentials: "include" }),
          fetch("/api/analytics/social-media-overview", { credentials: "include" }),
          fetch("/api/analytics/published-posts?limit=10", { credentials: "include" }),
        ]);

        // Handle portfolio analytics
        if (
          analyticsResponse.status === "fulfilled" &&
          analyticsResponse.value.ok
        ) {
          const analyticsData = await analyticsResponse.value.json();
          setAnalytics((prev) => ({
            ...prev,
            totalReach: analyticsData.data?.totalReach || 0,
            engagement: analyticsData.data?.engagementRate || 0,
            totalViews: analyticsData.data?.profileViews || 0,
            // Include social media metrics if available
            ...(analyticsData.data?.socialMedia && {
              socialMediaReach: analyticsData.data.socialMedia.totalReach || 0,
              socialMediaPosts: analyticsData.data.socialMedia.totalPosts || 0,
            }),
          }));
        }

        // Handle social media overview
        if (
          socialMediaResponse.status === "fulfilled" &&
          socialMediaResponse.value.ok
        ) {
          const socialData = await socialMediaResponse.value.json();
          console.log('📊 Social media overview response:', socialData);
          if (socialData.success) {
            setAnalytics((prev) => ({
              ...prev,
              totalReach: (prev.totalReach || 0) + (socialData.overview?.totalReach || 0),
              socialMediaPosts: socialData.overview?.totalPosts || 0,
            }));
            console.log('📊 Updated analytics with social posts:', socialData.overview?.totalPosts);
          }
        } else {
          console.warn('⚠️ Social media overview failed:', socialMediaResponse.status === 'rejected' ? socialMediaResponse.reason : 'Response not OK');
        }

        // Handle published posts (for recent content display)
        if (
          publishedPostsResponse.status === "fulfilled" &&
          publishedPostsResponse.value.ok
        ) {
          const postsData = await publishedPostsResponse.value.json();
          if (postsData.success && postsData.posts) {
            console.log('📊 Recent published posts:', postsData.posts.length);
            // Transform posts to ensure project data is available
            const transformedPosts = await Promise.all(
              (postsData.posts || []).map(async (post: {
                projectName?: string;
                projectImage?: string;
                projectId?: string;
                project?: { name?: string; title?: string; imageUrl?: string; media?: Array<{ url?: string }> };
                platforms: string[];
                publishedAt: string;
                results: Array<{ platform: string; url?: string }>;
                content?: string;
                id: string;
              }) => {
                // If projectName is missing, try to fetch it from projectId
                if (!post.projectName && post.projectId) {
                  try {
                    const projectResponse = await fetch(
                      `/api/projects/${post.projectId}`,
                      { credentials: "include" }
                    );
                    if (projectResponse.ok) {
                      const projectData = await projectResponse.json();
                      if (projectData.success && projectData.project) {
                        post.projectName = projectData.project.name || projectData.project.title || "Unknown Project";
                        post.projectImage = projectData.project.imageUrl || projectData.project.media?.[0]?.url || post.projectImage;
                      }
                    }
                  } catch (error) {
                    console.warn('Failed to fetch project data:', error);
                  }
                }
                // Fallback if still no project name
                if (!post.projectName) {
                  post.projectName = post.project?.name || post.project?.title || "Unknown Project";
                  const projectImageUrl = post.project?.imageUrl || post.project?.media?.[0]?.url;
                  if (projectImageUrl) {
                    post.projectImage = projectImageUrl;
                  }
                }
                // Ensure projectName is always a string
                const finalPost = {
                  ...post,
                  projectName: post.projectName || "Unknown Project",
                };
                return finalPost;
              })
            );
            setRecentPublishedPosts(transformedPosts);
          }
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
      }
    };

    loadAnalytics();
    // Refresh analytics every 30 seconds
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Function to refresh published projects count from API
  const refreshPublishedProjects = useCallback(async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      const response = await fetch(`${apiBaseUrl}/api/projects`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log("⚠️  Failed to refresh projects");
        return;
      }

      const data = await response.json();

      if (data.success && data.data?.projects) {
        interface ProjectData {
          id?: string;
          _id?: string;
          name?: string;
          title?: string;
          description?: string;
          status?: string;
          visibility?: string;
        }

        const apiProjects = data.data.projects.map((project: ProjectData) => ({
          id: project.id || project._id?.toString() || '',
          name: project.name || project.title || 'Untitled Project',
          description: project.description || '',
          status: project.status?.toLowerCase() || 'draft',
          visibility: project.visibility?.toLowerCase() || 'private',
        }));

        const publishedProjects: ProjectItem[] = apiProjects.filter(
          (project: ProjectItem) =>
            project.status === "published" ||
            !project.status ||
            project.visibility === "public"
        );

        console.log(
          "✅ Refreshed published projects:",
          publishedProjects.length,
          "projects found"
        );

        setAnalytics((prev) => ({
          ...prev,
          recentProjects: publishedProjects.slice(0, 5),
          publishedProjects: publishedProjects.length,
        }));
      }
    } catch (error) {
      console.error("❌ Error refreshing published projects:", error);
    }
  }, []);

  // Listen for changes to showcase projects in localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "showcase-projects") {
        refreshPublishedProjects();
      }
    };

    // Also listen for focus events to refresh data when returning to the page
    const handleFocus = () => {
      refreshPublishedProjects();
    };

    // Refresh immediately when component mounts
    refreshPublishedProjects();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshPublishedProjects]);

  // Refresh data when component becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshPublishedProjects();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refreshPublishedProjects]);

  // Fetch connected social media platforms
  useEffect(() => {
    const fetchConnectedPlatforms = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/integrations/status`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.statuses) {
            const connected = data.statuses
              .filter((status: { connected: boolean }) => status.connected)
              .map((status: { platform: string }) => status.platform);
            setConnectedPlatforms(connected);
          }
        }
      } catch (error) {
        console.error("Failed to fetch connected platforms:", error);
      }
    };

    fetchConnectedPlatforms();
  }, []);

  if (projectsLoading) {
    return (
      <UnifiedLayout activePage="dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading dashboard...</span>
          </div>
        </div>
      </UnifiedLayout>
    );
  }

  if (projectsError) {
    return (
      <UnifiedLayout activePage="dashboard">
        <div className="flex items-center justify-center min-h-[60vh] px-6">
          <Card className="w-full max-w-md border-red-200 bg-red-50/60">
            <CardHeader>
              <CardTitle className="text-red-700">Could not load dashboard data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-red-700">
                {projectsQueryError instanceof Error
                  ? projectsQueryError.message
                  : "Something went wrong while loading your projects."}
              </p>
              <Button
                onClick={() => void refetchProjects()}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </UnifiedLayout>
    );
  }

  return (
    <UnifiedLayout activePage="dashboard">
      <div className="flex flex-col w-full h-full overflow-y-auto bg-background overflow-x-visible">
        {/* Header with Search and Actions */}
        <div className="flex flex-col gap-2 flex-shrink-0 px-6 pt-6 pb-2 relative">
          {/* Top Row: Title and Profile Icon */}
          <div className="flex items-start justify-between gap-4 relative">
            {/* Title Section */}
            <div className="flex-1 flex flex-col gap-1">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
            </div>

            {/* User Profile - Circular Icon at Top Right Corner */}
            <div className="flex items-center gap-4 relative z-50">
              <ThemeToggle />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowProfileDropdown(prev => !prev);
                }}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 shadow-md hover:shadow-lg transition-all cursor-pointer relative flex items-center justify-center bg-white"
              >
                {resolvedUserProfile?.avatar && !avatarError && !resolvedUserProfile.avatar.startsWith('blob:') ? (
                  <img
                    src={resolvedUserProfile.avatar}
                    alt={resolvedUserProfile.name || "User"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      console.error("❌ Avatar image failed to load");
                      setAvatarError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                    {(resolvedUserProfile?.name || resolvedUserProfile?.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Profile Card */}
              <ProfileCard
                isOpen={showProfileDropdown}
                onClose={() => setShowProfileDropdown(false)}
                userProfile={resolvedUserProfile || { name: "Guest User", email: "guest@example.com", bio: "Please log in" }}
                onNavigateToProfile={() => navigate("/profile")}
                onLogout={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                onProfileUpdate={(updatedProfile) => {
                  setUserProfile(updatedProfile);
                }}
              />
            </div>
          </div>

          {/* Second Row: Search Bar and Action Buttons in line */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              {/* Search Bar with ShowWork Logo Character */}
              <ShowWorkSearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
              />

              {/* Time Range Switch */}
              <div className="bg-secondary/50 dark:bg-secondary rounded-lg p-1 flex items-center shadow-inner">
                {(['day', 'month', 'year'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${timeRange === range
                      ? 'bg-card text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Add Projects Button */}
              <Button
                onClick={() => navigate("/showcase/add")}
                className="text-white whitespace-nowrap transition-colors bg-[#2563EB] hover:bg-[#1D4ED8]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Projects
              </Button>

              {/* Upload Content Button */}
              <Button
                onClick={() => navigate("/content")}
                variant="outline"
                className="whitespace-nowrap border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-300 hover:opacity-100 transition-all duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Content
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2563EB] border-t-transparent"></div>
          </div>
        ) : (
          <div className="px-6 pb-6 pt-2">
            {/* 6-Column Bento Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 auto-rows-[150px]">
              {/* 2 Metric Cards (Total Reach and Engagement) - Row 1 */}
              {[
                {
                  title: "Total Reach",
                  value: analytics.totalReach.toLocaleString(),
                  change: "+12%",
                  icon: <Eye className="w-5 h-5 text-blue-600" />,
                  iconBg: "bg-blue-500",
                  progress: 76,
                  showChart: true,
                  chartColor: "#2563EB",
                },
                {
                  title: "Engagement",
                  value: `${analytics.engagement.toFixed(1)}%`,
                  change: "+8%",
                  icon: <Heart className="w-5 h-5 text-pink-600" />,
                  iconBg: "bg-pink-500",
                  progress: 65,
                  showChart: true,
                  chartColor: "#EC4899",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`col-span-1 sm:col-span-1 lg:col-span-1 ${item.showChart ? 'row-span-1' : 'row-span-1'} p-4 pb-3 rounded-2xl flex flex-col bg-card border border-border shadow-sm hover:shadow-md transition-all overflow-hidden`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Title section */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${item.title === "Active Projects" ? '' : ''
                          } ${item.title === "Total Reach"
                            ? 'group cursor-pointer hover:animate-pulse'
                            : item.title === "Engagement"
                              ? 'group cursor-pointer hover:scale-125'
                              : item.title === "Active Projects"
                                ? 'group cursor-pointer hover:rotate-12'
                                : item.title === "Published Posts"
                                  ? 'group cursor-pointer hover:translate-x-1 hover:-translate-y-1'
                                  : ''
                          }`}
                      >
                        {item.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-700 leading-[1.2] flex items-center gap-1.5">
                        {item.title}
                        {/* Green blinking dot for Active Projects - beside the title */}
                        {item.title === "Active Projects" && (
                          <span className="relative inline-flex items-center justify-center ml-1.5 w-2 h-2">
                            <span className="absolute w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Data section */}
                  <div className="flex flex-col flex-1 min-h-0 relative">
                    {/* Large number - aligned with other metrics */}
                    <div className="flex items-baseline gap-2 mb-1.5 flex-shrink-0 z-10">
                      <p className="text-2xl leading-tight font-bold text-left text-gray-900">
                        {item.value}
                      </p>
                    </div>

                    {/* Mini Bar Chart for Reach and Engagement */}
                    {item.showChart && (
                      <div className="absolute bottom-0 right-0 w-full h-[60px] opacity-90 z-20">
                        <MiniBarChart
                          data={getChartData(item.title === "Total Reach" ? 'reach' : 'engagement')}
                          height={60}
                        />
                      </div>
                    )}

                    {/* Social media icons for Published Posts */}
                    {item.title === "Published Posts" && connectedPlatforms.length > 0 && (
                      <div className="flex flex-col items-start gap-1.5 mt-0.5">
                        <div className="flex items-center gap-0">
                          {connectedPlatforms.slice(0, 4).map((platform, index) => {
                            const getIcon = () => {
                              const iconClass = "w-6 h-6 text-white";
                              switch (platform.toLowerCase()) {
                                case 'linkedin':
                                  return <Linkedin className={iconClass} />;
                                case 'twitter':
                                  return <Twitter className={iconClass} />;
                                case 'facebook':
                                  return <Facebook className={iconClass} />;
                                case 'instagram':
                                  return <Instagram className={iconClass} />;
                                case 'reddit':
                                  return <RedditIcon className={iconClass} />;
                                case 'github':
                                  return <Github className={iconClass} />;
                                default:
                                  return null;
                              }
                            };

                            const getBgColor = () => {
                              switch (platform.toLowerCase()) {
                                case 'linkedin':
                                  return 'bg-blue-600';
                                case 'twitter':
                                  return 'bg-blue-400';
                                case 'facebook':
                                  return 'bg-blue-700';
                                case 'instagram':
                                  return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500';
                                case 'reddit':
                                  return 'bg-orange-600';
                                case 'github':
                                  return 'bg-gray-800';
                                default:
                                  return 'bg-gray-500';
                              }
                            };

                            return (
                              <div
                                key={platform}
                                className={`${getBgColor()} rounded-full p-1.5 flex items-center justify-center border-2 border-white shadow-sm`}
                                style={{
                                  marginLeft: index > 0 ? '-8px' : '0',
                                  zIndex: connectedPlatforms.length - index,
                                }}
                              >
                                {getIcon()}
                              </div>
                            );
                          })}
                          {connectedPlatforms.length > 4 && (
                            <div
                              className="bg-gray-400 rounded-full p-1.5 flex items-center justify-center border-2 border-white shadow-sm text-white text-xs font-semibold"
                              style={{
                                marginLeft: '-8px',
                                zIndex: 0,
                                width: '24px',
                                height: '24px',
                              }}
                            >
                              +{connectedPlatforms.length - 4}
                            </div>
                          )}
                        </div>
                        {/* Active status with green blinking dot */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-[10px] font-medium text-gray-700">Active</span>
                        </div>
                      </div>
                    )}

                    {/* Active Projects visualization */}
                    {('showBars' in item && item.showBars) && item.title === "Active Projects" ? (
                      /* Bar visualization for Active Projects */
                      <div className="flex flex-col flex-1 justify-between mt-0.5">
                        {/* Horizontal bars - filled bars on left, empty bars fill to right */}
                        <div className="flex items-center gap-1.5 w-full mb-0.5">
                          {(() => {
                            const count = parseInt(item.value) || 0;
                            const maxBars = 9; // Maximum bars to show (reduced from 10)
                            const filledBars = Math.min(count, maxBars);
                            const emptyBars = Math.max(0, maxBars - filledBars);

                            return (
                              <>
                                {/* Filled blue bars */}
                                {Array.from({ length: filledBars }).map((_, i) => (
                                  <div
                                    key={`filled-${i}`}
                                    className="w-3 h-8 rounded-sm shadow-sm bg-gradient-to-b from-blue-500 to-blue-600 flex-shrink-0"
                                  />
                                ))}
                                {/* Empty grey bars - fill remaining space */}
                                {Array.from({ length: emptyBars }).map((_, i) => (
                                  <div
                                    key={`empty-${i}`}
                                    className="w-3 h-8 rounded-sm bg-gray-200 flex-shrink-0"
                                  />
                                ))}
                              </>
                            );
                          })()}
                        </div>

                        {/* Analytics indicator - shows projects added this month - positioned at bottom */}
                        <div className="flex items-center gap-1.5 mt-1 pt-0.5">
                          <TrendingUp className="w-3 h-3 flex-shrink-0 text-green-600" />
                          <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">
                            {(() => {
                              const currentCount = parseInt(item.value) || 0;
                              const projectsAdded = currentCount > 0 ? (projectsThisMonth || 0) : 0;
                              return projectsAdded > 0 ? `+${projectsAdded}` : '0';
                            })()} from this month
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Active Projects - Matrix Card - Row 2, Column 1 */}
              {[
                {
                  title: "Active Projects",
                  value: dashboardPublishedProjects.toString(),
                  change: `${dashboardPublishedProjects} active`,
                  icon: <Box className="w-5 h-5 text-green-600" />,
                  iconBg: "bg-green-600",
                  progress: 70,
                  showChart: false,
                  showBars: true,
                },
                {
                  title: "Published Posts",
                  value: (analytics.socialMediaPosts || dashboardPublishedProjects || 0).toString(),
                  change: (analytics.socialMediaPosts || dashboardPublishedProjects) ? `+${analytics.socialMediaPosts || dashboardPublishedProjects}` : "0",
                  icon: <Send className="w-5 h-5 text-purple-600" />,
                  iconBg: "bg-purple-500",
                  progress: 82,
                  showChart: false,
                },
              ].map((item, idx) => (
                <div
                  key={`matrix-${idx}`}
                  className={`col-span-1 sm:col-span-1 lg:col-span-1 ${idx === 0 ? 'lg:col-start-1' : 'lg:col-start-2'} lg:row-start-2 row-span-1 p-4 pb-3 rounded-2xl flex flex-col bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Title section */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${item.title === "Total Reach"
                          ? 'group cursor-pointer hover:animate-pulse'
                          : item.title === "Engagement"
                            ? 'group cursor-pointer hover:scale-125'
                            : item.title === "Active Projects"
                              ? 'group cursor-pointer hover:rotate-12'
                              : item.title === "Published Posts"
                                ? 'group cursor-pointer hover:translate-x-1 hover:-translate-y-1'
                                : ''
                          }`}
                      >
                        {item.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-700 leading-[1.2] flex items-center gap-1.5">
                        {item.title}
                        {/* Green blinking dot for Active Projects - beside the title */}
                        {item.title === "Active Projects" && (
                          <span className="relative inline-flex items-center justify-center ml-1.5 w-2 h-2">
                            <span className="absolute w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="absolute w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Data section */}
                  <div className="flex flex-col flex-1 min-h-0">
                    {/* Large number */}
                    <div className="flex items-baseline gap-2 mb-1.5 flex-shrink-0">
                      <p className="text-2xl leading-tight font-bold text-left text-gray-900">
                        {item.value}
                      </p>
                    </div>

                    {/* Social media icons for Published Posts */}
                    {item.title === "Published Posts" && connectedPlatforms.length > 0 && (
                      <div className="flex flex-col items-start gap-1.5 mt-0.5">
                        <div className="flex items-center gap-0">
                          {connectedPlatforms.slice(0, 4).map((platform, index) => {
                            const getIcon = () => {
                              const iconClass = "w-6 h-6 text-white";
                              switch (platform.toLowerCase()) {
                                case 'linkedin':
                                  return <Linkedin className={iconClass} />;
                                case 'twitter':
                                  return <Twitter className={iconClass} />;
                                case 'facebook':
                                  return <Facebook className={iconClass} />;
                                case 'instagram':
                                  return <Instagram className={iconClass} />;
                                case 'reddit':
                                  return <RedditIcon className={iconClass} />;
                                case 'github':
                                  return <Github className={iconClass} />;
                                default:
                                  return null;
                              }
                            };

                            const getBgColor = () => {
                              switch (platform.toLowerCase()) {
                                case 'linkedin':
                                  return 'bg-blue-600';
                                case 'twitter':
                                  return 'bg-blue-400';
                                case 'facebook':
                                  return 'bg-blue-700';
                                case 'instagram':
                                  return 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500';
                                case 'reddit':
                                  return 'bg-orange-600';
                                case 'github':
                                  return 'bg-gray-800';
                                default:
                                  return 'bg-gray-500';
                              }
                            };

                            return (
                              <div
                                key={platform}
                                className={`${getBgColor()} rounded-full p-1.5 flex items-center justify-center border-2 border-white shadow-sm`}
                                style={{
                                  marginLeft: index > 0 ? '-8px' : '0',
                                  zIndex: connectedPlatforms.length - index,
                                }}
                              >
                                {getIcon()}
                              </div>
                            );
                          })}
                          {connectedPlatforms.length > 4 && (
                            <div
                              className="bg-gray-400 rounded-full p-1.5 flex items-center justify-center border-2 border-white shadow-sm text-white text-xs font-semibold"
                              style={{
                                marginLeft: '-8px',
                                zIndex: 0,
                                width: '24px',
                                height: '24px',
                              }}
                            >
                              +{connectedPlatforms.length - 4}
                            </div>
                          )}
                        </div>
                        {/* Active status with green blinking dot */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75"></div>
                          </div>
                          <span className="text-[10px] font-medium text-gray-700">Active</span>
                        </div>
                      </div>
                    )}

                    {/* Bar visualization for Active Projects */}
                    {('showBars' in item && item.showBars) && item.title === "Active Projects" ? (
                      <div className="flex flex-col flex-1 justify-between mt-0.5">
                        {/* Horizontal bars */}
                        <div className="flex items-center gap-1.5 w-full mb-0.5">
                          {(() => {
                            const count = parseInt(item.value) || 0;
                            const maxBars = 9;
                            const filledBars = Math.min(count, maxBars);
                            const emptyBars = Math.max(0, maxBars - filledBars);

                            return (
                              <>
                                {Array.from({ length: filledBars }).map((_, i) => (
                                  <div
                                    key={`filled-${i}`}
                                    className="w-3 h-8 rounded-sm shadow-sm bg-gradient-to-b from-blue-500 to-blue-600 flex-shrink-0"
                                  />
                                ))}
                                {Array.from({ length: emptyBars }).map((_, i) => (
                                  <div
                                    key={`empty-${i}`}
                                    className="w-3 h-8 rounded-sm bg-gray-200 flex-shrink-0"
                                  />
                                ))}
                              </>
                            );
                          })()}
                        </div>

                        {/* Analytics indicator */}
                        <div className="flex items-center gap-1.5 mt-1 pt-0.5">
                          <TrendingUp className="w-3 h-3 flex-shrink-0 text-green-600" />
                          <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">
                            {(() => {
                              const currentCount = parseInt(item.value) || 0;
                              const projectsAdded = currentCount > 0 ? (projectsThisMonth || 0) : 0;
                              return projectsAdded > 0 ? `+${projectsAdded}` : '0';
                            })()} from this month
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Active Projects - Large Card with Project List - Row 3, Below Metrics */}
              <div
                className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-3 row-span-2 rounded-2xl p-6 flex flex-col justify-between bg-card border border-border shadow-sm hover:shadow-md transition-all overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    Active Projects
                  </h3>
                  {loading ? (
                    <div className="flex items-center justify-center h-24">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: '#2563EB', borderTopColor: 'transparent' }}></div>
                    </div>
                  ) : (() => {
                    // Filter projects based on search query
                    const filteredProjects = searchQuery
                      ? dashboardRecentProjects.filter((project) => {
                        const query = searchQuery.toLowerCase();
                        const name = (project.name || project.title || '').toLowerCase();
                        const description = (project.description || '').toLowerCase();
                        const technologies = (project.technologies || []).join(' ').toLowerCase();
                        return name.includes(query) || description.includes(query) || technologies.includes(query);
                      })
                      : dashboardRecentProjects;

                    return filteredProjects.length > 0 ? (
                      <div className="space-y-3">
                        {filteredProjects.slice(0, 3).map((project, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <div className="flex items-center justify-center flex-shrink-0">
                                <Box className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate text-gray-900 mb-1">
                                  {project.name || project.title}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {project.description || "No description available for this project."}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(`/showcase/view/${project._id || project.id}`)}
                              className="text-xs font-medium flex-shrink-0 ml-2 px-2 py-1 rounded transition-colors text-gray-700 hover:text-[#2563EB]"
                            >
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-24 text-gray-500">
                        <Box className="h-8 w-8 mb-2" style={{ color: '#2563EB', opacity: 0.5 }} />
                        <p className="text-sm">{searchQuery ? 'No projects found matching your search' : 'No projects yet'}</p>
                        <Button
                          size="sm"
                          className="mt-2 text-xs"
                          style={{ backgroundColor: '#2563EB', color: 'white' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                          onClick={() => navigate("/showcase")}
                        >
                          Create Project
                        </Button>
                      </div>
                    );
                  })()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 transition-colors border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  onClick={() => navigate("/showcase")}
                >
                  View All Projects
                </Button>
              </div>

              {/* Portfolio Health & Insights - Large Bento Card - Expanded to the right, aligned with matrix cards */}
              <div
                className="portfolio-card col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-1 row-span-2 hover:shadow-md transition-all relative"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="portfolio-inner relative z-10 h-full flex flex-col">
                  <PortfolioHealthCard
                    health={portfolioHealth}
                    loading={healthLoading}
                    error={healthError}
                    onRecompute={recomputeHealth}
                    userName={resolvedUserProfile?.name}
                    userUsername={resolvedUserProfile?.username}
                    userAvatar={resolvedUserProfile?.avatar}
                    userBio={resolvedUserProfile?.bio}
                  />
                </div>
              </div>

              {/* AI Insights & Summary - Large Bento Card - Beside Health Card */}
              <div
                className="portfolio-insights-card col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-1 row-span-2 hover:shadow-md transition-all relative"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="portfolio-inner relative z-10 h-full flex flex-col">
                  <PortfolioInsightsCard
                    health={portfolioHealth}
                    loading={healthLoading}
                  />
                </div>
              </div>

              {/* Recent Published Content - Poll-Style Layout - At level with Active Projects */}
              <div
                className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-start-3 row-span-2 rounded-2xl p-6 flex flex-col bg-card border border-border shadow-sm hover:shadow-md transition-all min-w-0 overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Header with Avatar and Question */}
                  <div className="flex items-center gap-3 mb-5 flex-shrink-0">
                    {resolvedUserProfile?.avatar ? (
                      <img
                        src={resolvedUserProfile.avatar}
                        alt={resolvedUserProfile.name || "User"}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        title={`Published by ${resolvedUserProfile.name || "User"} (ShowWork)`}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {((resolvedUserProfile?.name || "U")[0] || "U").toUpperCase()}
                        </span>
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-[#222] flex items-center gap-2">
                      What are your most recent published posts? 🗞️
                    </h3>
                  </div>
                  <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {recentPublishedPosts.length > 0 ? (
                      <>
                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 -mr-1">
                          {recentPublishedPosts.slice(0, 5).map((post, idx) => {
                            const getPlatformIcon = (platform: string) => {
                              const iconClass = "w-4 h-4 flex-shrink-0";
                              switch (platform.toLowerCase()) {
                                case 'linkedin':
                                  return <Linkedin className={iconClass} style={{ color: '#0077B5' }} />;
                                case 'twitter':
                                case 'x':
                                  return <Twitter className={iconClass} style={{ color: '#1DA1F2' }} />;
                                case 'reddit':
                                  return <span className="text-[#FF4500]"><RedditIcon className={iconClass} /></span>;
                                case 'facebook':
                                  return <Facebook className={iconClass} style={{ color: '#1877F2' }} />;
                                case 'youtube':
                                  return <span className="text-red-600 font-bold text-[10px]">YT</span>;
                                case 'medium':
                                  return <span className="text-gray-800 font-bold text-[10px]">M</span>;
                                default:
                                  return <Share2 className={iconClass} style={{ color: '#6B7280' }} />;
                              }
                            };

                            const formatDate = (dateString: string) => {
                              const date = new Date(dateString);
                              return date.toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric'
                              });
                            };

                            return (
                              <div
                                key={idx}
                                className="group relative flex items-center gap-2 mb-2"
                                onMouseEnter={(e) => {
                                  if (post.platforms.length > 0 && post.platforms[0]) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredPost({
                                      post,
                                      platform: post.platforms[0],
                                      position: {
                                        x: rect.left + rect.width / 2,
                                        y: rect.top,
                                      },
                                    });
                                  }
                                }}
                                onMouseLeave={() => {
                                  setHoveredPost(null);
                                }}
                                onMouseMove={(e) => {
                                  if (hoveredPost && post.platforms.length > 0 && post.platforms[0]) {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setHoveredPost({
                                      ...hoveredPost,
                                      position: {
                                        x: rect.left + rect.width / 2,
                                        y: rect.top,
                                      },
                                    });
                                  }
                                }}
                                onClick={() => {
                                  if (post.results[0]?.url) {
                                    window.open(post.results[0].url, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                              >
                                {/* Small cylindrical pill for each published post */}
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm cursor-pointer">
                                  <div className="flex items-center justify-center flex-shrink-0">
                                    {post.platforms.length > 0 && post.platforms[0] && getPlatformIcon(post.platforms[0])}
                                  </div>
                                  <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                                    {post.projectName || 'Unknown Project'}
                                  </span>
                                  <span className="text-[10px] text-gray-500 flex-shrink-0">
                                    {formatDate(post.publishedAt)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full flex-shrink-0 text-xs lg:text-sm border-gray-300 text-gray-700 hover:bg-[#7A5AF8] hover:text-white hover:border-[#7A5AF8] transition-colors"
                          onClick={() => navigate("/content")}
                        >
                          View All Posts
                        </Button>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <Send className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-2 lg:mb-3" style={{ color: '#2563EB', opacity: 0.5 }} />
                          <p className="text-xs lg:text-sm text-gray-500">
                            No published posts yet
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Network Activity - Large Bento Card (2x2) - White card - At level with Active Projects */}
              <div
                className="col-span-1 sm:col-span-2 lg:col-span-2 lg:col-start-5 lg:row-start-3 row-span-2 rounded-2xl p-6 flex flex-col bg-card border border-border shadow-sm hover:shadow-md transition-all min-w-0 overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">
                    Network Activity
                  </h3>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {recentPublishedPosts.length > 0 ? (
                      recentPublishedPosts.slice(0, 4).map((post, idx) => {
                        const getPlatformIcon = (platform: string) => {
                          const iconClass = "w-5 h-5 flex-shrink-0";
                          switch (platform.toLowerCase()) {
                            case 'linkedin':
                              return <Linkedin className={iconClass} style={{ color: '#0077B5' }} />;
                            case 'twitter':
                            case 'x':
                              return <Twitter className={iconClass} style={{ color: '#1DA1F2' }} />;
                            case 'reddit':
                              return <span className="text-[#FF4500]"><RedditIcon className={iconClass} /></span>;
                            case 'facebook':
                              return <Facebook className={iconClass} style={{ color: '#1877F2' }} />;
                            case 'youtube':
                              return <span className="text-red-600 font-bold text-xs">YT</span>;
                            case 'medium':
                              return <span className="text-gray-800 font-bold text-xs">M</span>;
                            default:
                              return <Share2 className={iconClass} style={{ color: '#6B7280' }} />;
                          }
                        };

                        const formatTimeAgo = (dateString: string) => {
                          const date = new Date(dateString);
                          const now = new Date();
                          const diffMs = now.getTime() - date.getTime();
                          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                          const diffDays = Math.floor(diffHours / 24);

                          if (diffDays > 0) {
                            return `${diffDays}d ago`;
                          } else if (diffHours > 0) {
                            return `${diffHours}h ago`;
                          } else {
                            const diffMins = Math.floor(diffMs / (1000 * 60));
                            return diffMins > 0 ? `${diffMins}m ago` : 'Just now';
                          }
                        };

                        const primaryPlatform = post.platforms[0] || 'unknown';
                        const activityTypes = ['likes', 'shares', 'comments', 'views'];
                        // Use post index to make activity deterministic
                        const activityIndex = idx % activityTypes.length;
                        const activity = activityTypes[activityIndex];
                        // Use a hash of post ID to generate consistent count
                        const countHash = post.id ? post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : idx;
                        const count = (countHash % 20) + 1;

                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-2"
                          >
                            {/* Small cylindrical pill for activity */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border hover:bg-accent transition-all duration-200 shadow-sm">
                              <div className="flex items-center justify-center flex-shrink-0">
                                {getPlatformIcon(primaryPlatform)}
                              </div>
                              <span className="text-xs font-medium text-gray-700 capitalize">
                                {activity === 'likes' && 'Post Liked'}
                                {activity === 'shares' && 'Post Shared'}
                                {activity === 'comments' && 'New Comments'}
                                {activity === 'views' && 'Post Views'}
                              </span>
                              <span className="text-[10px] font-semibold text-blue-600 flex-shrink-0">
                                +{count}
                              </span>
                              <span className="text-[10px] text-gray-500 flex-shrink-0">
                                {formatTimeAgo(post.publishedAt)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div
                          className="flex items-center space-x-3 p-3 rounded-lg bg-secondary border border-border hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold mb-1 text-gray-900">New Connection</p>
                            <p className="text-xs truncate text-gray-600">
                              John Doe connected with you
                            </p>
                          </div>
                          <span className="text-xs flex-shrink-0 text-gray-500">2h ago</span>
                        </div>
                        <div
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-center flex-shrink-0">
                            <Heart className="w-5 h-5 text-pink-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold mb-1 text-gray-900">Project Liked</p>
                            <p className="text-xs truncate text-gray-600">
                              Your React project got 5 new likes
                            </p>
                          </div>
                          <span className="text-xs flex-shrink-0 text-gray-500">4h ago</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Preview on Hover - Rendered outside containers using portal */}
      {
        hoveredPost && (
          <SocialPostPreview
            post={hoveredPost.post}
            platform={hoveredPost.platform}
            isVisible={true}
            onClose={() => setHoveredPost(null)}
            position={hoveredPost.position}
          />
        )
      }
    </UnifiedLayout>
  );
}
