import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Users,
  FolderOpen,
  Zap,
  Settings,
  LogOut,
  ArrowLeft,
  Eye,
  Heart,
  Share2,
  Edit3,
  Save,
  X,
  Plus,
  Star,
  MessageCircle,
  ExternalLink,
  Github,
  Globe,
  Image,
  Video,
  Music,
  FileText,
  Code,
  Activity,
  Upload,
  TrendingUp,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  Loader2,
  Play,
  X as XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/types/project";
import { AdvancedVisualizations } from "@/components/dashboard/AdvancedVisualizations";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string | undefined;
  avatar?: string;
  initials: string;
  color: string;
  joinedAt: string;
}

interface ActivityItem {
  id: string;
  type: "comment" | "update" | "upload" | "team" | "milestone";
  message: string;
  timestamp: string;
  user?: string;
  userAvatar?: string;
  userEmail?: string;
  metadata?: any;
}

interface Comment {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projectMedia, setProjectMedia] = useState<any[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [editData, setEditData] = useState<Partial<Project>>({});
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string; email?: string; avatar?: string } | null>(null);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    readme: false,
    timeline: false,
    milestones: false,
    performance: false,
  });
  const [showQuickActions, setShowQuickActions] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "media", label: "Media", icon: Image },
    { id: "team", label: "Team", icon: Users },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const addTeamMember = async () => {
    if (!newMemberName.trim() || !newMemberRole.trim() || !id) return;

    try {
      // Use the project's MongoDB _id if available, otherwise use the URL id
      // The project might have _id (MongoDB) or id (localStorage)
      const projectId = project?._id?.toString() || project?.id || id;

      console.log('📝 Adding team member:', {
        projectId,
        urlId: id,
        projectIdFromProject: project?._id?.toString() || project?.id,
        memberName: newMemberName.trim(),
        memberRole: newMemberRole.trim(),
      });

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/team/${projectId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newMemberName.trim(),
          role: newMemberRole.trim(),
          email: newMemberEmail.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Error response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData.error || errorData.message,
          fullError: errorData,
        });
        throw new Error(errorData.error || errorData.message || 'Failed to add team member');
      }

      const result = await response.json();
      if (result.success && result.data) {
        // Convert to TeamMember format
        const newMember: TeamMember = {
          id: result.data.id,
          name: result.data.name,
          role: result.data.role,
          email: newMemberEmail.trim() || undefined,
          avatar: result.data.avatar || undefined,
          initials: result.data.name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase(),
          color: `bg-${["blue", "green", "purple", "orange", "pink"][teamMembers.length % 5]}-500`,
          joinedAt: new Date().toISOString(),
        };

        setTeamMembers((prev) => [...prev, newMember]);

        // Add activity with current user
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: "team",
          message: `${newMemberName} joined as ${newMemberRole}`,
          timestamp: new Date().toISOString(),
          user: currentUser?.name || 'User',
        };
        setActivities((prev) => [newActivity, ...prev]);

        setNewMemberName("");
        setNewMemberRole("");
        setNewMemberEmail("");
        setShowInviteModal(false);
      }
    } catch (error) {
      console.error('❌ Error adding team member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Full error details:', {
        message: errorMessage,
        error,
        projectId: project?._id?.toString() || project?.id || id,
      });
      alert(`Failed to add team member: ${errorMessage}`);
    }
  };

  const removeTeamMember = async (memberId: string) => {
    if (!id) return;

    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/team/${id}/${memberId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to remove team member');
      }

      const result = await response.json();
      if (result.success) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));

        // Add activity with current user
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: "team",
          message: `${member.name} left the project`,
          timestamp: new Date().toISOString(),
          user: currentUser?.name || 'User',
        };
        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error('Error removing team member:', error);
      alert(`Failed to remove team member: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInviteTeam = () => {
    addTeamMember();
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));

    // Update project likes
    if (project) {
      const updatedProject = {
        ...project,
        likes: liked ? project.likes - 1 : project.likes + 1,
      };
      setProject(updatedProject);

      // Update localStorage
      const storedProjects = localStorage.getItem("showcase-projects");
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const updatedProjects = projects.map((p: Project) =>
          p.id === project.id ? updatedProject : p,
        );
        localStorage.setItem(
          "showcase-projects",
          JSON.stringify(updatedProjects),
        );
      }
    }
  };

  const handleShare = () => {
    if (navigator.share && project) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleSaveChanges = () => {
    if (project && editData) {
      const updatedProject = { ...project, ...editData };
      setProject(updatedProject);

      // Update localStorage
      const storedProjects = localStorage.getItem("showcase-projects");
      if (storedProjects) {
        const projects = JSON.parse(storedProjects);
        const updatedProjects = projects.map((p: Project) =>
          p.id === project.id ? updatedProject : p,
        );
        localStorage.setItem(
          "showcase-projects",
          JSON.stringify(updatedProjects),
        );
      }

      setIsEditing(false);
      setEditData({});
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return;

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/comments/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newComment.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const result = await response.json();
      if (result.success && result.data) {
        // Add comment to comments list
        setComments((prev) => [result.data, ...prev]);

        // Add activity with user profile
        const newActivity: ActivityItem = {
          id: result.data.id,
          type: "comment",
          message: result.data.message,
          timestamp: result.data.createdAt,
          user: result.data.user.name,
          userAvatar: result.data.user.avatar,
          userEmail: result.data.user.email,
        };

        setActivities((prev) => [newActivity, ...prev].sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));

        setNewComment("");
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert(`Failed to add comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return Image;
      case "video":
        return Video;
      case "audio":
        return Music;
      default:
        return FileText;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "e":
            e.preventDefault();
            setIsEditing(!isEditing);
            break;
          case "s":
            e.preventDefault();
            handleShare();
            break;
          case "Enter":
            e.preventDefault();
            if (isEditing) {
              handleSaveChanges();
            }
            break;
          case "Escape":
            e.preventDefault();
            setIsEditing(false);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isEditing]);

  const getCodeQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Draft
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-600">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-600">
            Completed
          </Badge>
        );
      case "published":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-600"
          >
            Published
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="w-4 h-4 text-green-600" />;
      case "private":
        return <Settings className="w-4 h-4 text-gray-600" />;
      case "unlisted":
        return <Eye className="w-4 h-4 text-yellow-600" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setCurrentUser({
            name: data.user.name || 'User',
            email: data.user.email,
            avatar: data.user.avatar || data.user.image, // Google profile picture
          });
        }
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      // Fallback to localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser({
            name: user.name || 'User',
            email: user.email,
            avatar: user.avatar || user.image,
          });
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
  };

  // Fetch comments from backend API
  const fetchComments = async (projectId: string) => {
    setIsLoadingComments(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/comments/${projectId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setComments(result.data);
          console.log(`✅ Loaded ${result.data.length} comments from database`);

          // Convert comments to activities for display
          const commentActivities: ActivityItem[] = result.data.map((comment: Comment) => ({
            id: comment.id,
            type: "comment" as const,
            message: comment.message,
            timestamp: comment.createdAt,
            user: comment.user.name,
            userAvatar: comment.user.avatar,
            userEmail: comment.user.email,
          }));

          // Update activities with comments
          setActivities((prev) => {
            // Remove old comment activities and add new ones
            const nonCommentActivities = prev.filter(a => a.type !== 'comment');
            return [...commentActivities, ...nonCommentActivities].sort((a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Fetch team members from backend API
  const fetchTeamMembers = async (projectId: string) => {
    setIsLoadingTeam(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/team/${projectId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Convert Prisma team members to TeamMember format
          const formattedMembers: TeamMember[] = result.data.map((tm: any, index: number) => ({
            id: tm.id,
            name: tm.name,
            role: tm.role,
            email: undefined, // Prisma doesn't store email in ProjectTeamMember
            avatar: tm.avatar || undefined,
            initials: tm.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase(),
            color: `bg-${["blue", "green", "purple", "orange", "pink"][index % 5]}-500`,
            joinedAt: new Date().toISOString(),
          }));
          setTeamMembers(formattedMembers);
          console.log(`✅ Loaded ${formattedMembers.length} team members from database`);
        }
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  // Fetch media from backend API
  const fetchProjectMedia = async (projectId: string) => {
    setIsLoadingMedia(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/media/${projectId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setProjectMedia(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching project media:', error);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  useEffect(() => {
    // Load project data from localStorage
    const storedProjects = localStorage.getItem("showcase-projects");
    if (storedProjects && id) {
      const projects = JSON.parse(storedProjects);
      const foundProject = projects.find((p: any) => p.id === id || p._id === id);
      if (foundProject) {
        setProject(foundProject);
        setEditData(foundProject);
        setLikes(foundProject.likes || 0);

        // Fetch current user
        fetchCurrentUser();

        // Fetch media from backend API
        fetchProjectMedia(id);

        // Fetch team members from backend API
        fetchTeamMembers(id);

        // Fetch comments from backend API
        fetchComments(id);

        // Initialize with empty activities (will be populated from real events and comments)
        setActivities([]);

        // Add mock enhanced data if not present
        if (foundProject && !foundProject.readme) {
          const enhancedProject = {
            ...foundProject,
            technologies: [
              {
                id: "1",
                name: "React",
                category: "Frontend",
                proficiency: 85,
                experience: "3+ years",
                projects: 12,
                isRecommended: true,
              },
              {
                id: "2",
                name: "TypeScript",
                category: "Frontend",
                proficiency: 78,
                experience: "2+ years",
                projects: 8,
                isRecommended: true,
              },
              {
                id: "3",
                name: "Node.js",
                category: "Backend",
                proficiency: 72,
                experience: "2+ years",
                projects: 6,
                isRecommended: false,
              },
              {
                id: "4",
                name: "PostgreSQL",
                category: "Database",
                proficiency: 65,
                experience: "1+ years",
                projects: 4,
                isRecommended: false,
              },
              {
                id: "5",
                name: "Tailwind CSS",
                category: "Frontend",
                proficiency: 90,
                experience: "2+ years",
                projects: 15,
                isRecommended: true,
              },
              {
                id: "6",
                name: "AWS",
                category: "Cloud",
                proficiency: 55,
                experience: "1+ years",
                projects: 3,
                isRecommended: false,
              },
            ],
            readme: `# ${foundProject.name}

## Description
${foundProject.description}

## Features
- Modern UI/UX design
- Responsive layout
- Interactive components
- Performance optimized

## Technologies Used
${foundProject.technologies?.map((tech: any) => `- ${tech.name}`).join("\n") || "- React\n- TypeScript\n- Tailwind CSS"}

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License.`,
            stats: {
              commits: 156,
              pullRequests: 23,
              releases: 4,
              issues: 12,
              contributors: 3,
              stars: 45,
              forks: 8,
              watchers: 12,
            },
            performance: {
              buildTime: 45,
              bundleSize: 1024000,
              lighthouse: {
                performance: 92,
                accessibility: 88,
                bestPractices: 95,
                seo: 89,
              },
              dependencies: {
                total: 156,
                outdated: 3,
                vulnerable: 0,
              },
            },
            codeQuality: {
              ...foundProject.codeQuality,
              languages: [
                { name: "TypeScript", percentage: 45 },
                { name: "JavaScript", percentage: 30 },
                { name: "CSS", percentage: 15 },
                { name: "HTML", percentage: 10 },
              ],
            },
          };
          setProject(enhancedProject);
        }
      }
    }

    // Load team members from localStorage
    const storedTeamMembers = localStorage.getItem(`team-members-${id}`);
    if (storedTeamMembers) {
      setTeamMembers(JSON.parse(storedTeamMembers));
    } else {
      // Set default team members
      setTeamMembers([
        {
          id: "1",
          name: "John Doe",
          role: "Project Lead",
          email: "john@example.com",
          initials: "JD",
          color: "bg-blue-500",
          joinedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Jane Smith",
          role: "Frontend Developer",
          email: "jane@example.com",
          initials: "JS",
          color: "bg-green-500",
          joinedAt: new Date().toISOString(),
        },
      ]);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 border border-blue-100"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  {project.name}
                </h1>
                <div className="flex items-center gap-2">
                  {getVisibilityIcon(project.visibility || "public")}
                  {getStatusBadge(project.status)}
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                {project.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created{" "}
                    {formatDate(
                      project.createdAt?.toString() || new Date().toISOString(),
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Last updated{" "}
                    {formatDate(
                      project.updatedAt?.toString() || new Date().toISOString(),
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-white/80 backdrop-blur-sm"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Code Quality
                </p>
                <p
                  className={`text-3xl font-bold ${getCodeQualityColor(project.codeQuality?.overallScore || 85)}`}
                >
                  {project.codeQuality?.overallScore || 85}%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5% this week</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Team Members
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {teamMembers.length}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-blue-600">
                    Active contributors
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Media Files
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {(project.media?.images?.length || 0) +
                    (project.media?.videos?.length || 0) +
                    (project.media?.audio?.length || 0) +
                    (project.media?.documents?.length || 0)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Image className="w-3 h-3 text-purple-600" />
                  <span className="text-xs text-purple-600">
                    Screenshots & docs
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full group-hover:scale-110 transition-transform">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Technologies
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {project.technologies?.length || 0}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="w-3 h-3 text-orange-600" />
                  <span className="text-xs text-orange-600">Tech stack</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Category
                </label>
                <p className="text-gray-900 mt-1">
                  {project.category || "Web Development"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="mt-1">{getStatusBadge(project.status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Created
                </label>
                <p className="text-gray-900 mt-1">
                  {formatDate(
                    project.createdAt?.toString() || new Date().toISOString(),
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Last Updated
                </label>
                <p className="text-gray-900 mt-1">
                  {formatDate(
                    project.updatedAt?.toString() || new Date().toISOString(),
                  )}
                </p>
              </div>
            </div>

            {project.longDescription && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Detailed Description
                </label>
                {isEditing ? (
                  <Textarea
                    value={editData.longDescription || ""}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        longDescription: e.target.value,
                      }))
                    }
                    className="mt-1"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-900 mt-1">
                    {project.longDescription}
                  </p>
                )}
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs hover:bg-gray-50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* GitHub Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Repository
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.githubUrl ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {project.githubUrl}
                  </a>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Repository
                    </a>
                  </Button>
                </div>

                {project.stats ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {project.stats.stars}
                      </div>
                      <div className="text-sm text-gray-500">Stars</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {project.stats.forks}
                      </div>
                      <div className="text-sm text-gray-500">Forks</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {project.stats.commits}
                      </div>
                      <div className="text-sm text-gray-500">Commits</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {project.stats.contributors}
                      </div>
                      <div className="text-sm text-gray-500">Contributors</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-500">
                      Connect your GitHub repository to see detailed stats
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-4">
                  No GitHub repository connected
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Repository
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance & Quality Section */}
      {project.codeQuality && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Code Quality Metrics
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection("performance")}
                >
                  {expandedSections.performance ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.performance && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className={`text-2xl font-bold ${getCodeQualityColor(project.codeQuality.overallScore)}`}
                        >
                          {project.codeQuality.overallScore}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Overall Score
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div
                          className={`text-2xl font-bold ${getCodeQualityColor(project.codeQuality.testCoverage)}`}
                        >
                          {project.codeQuality.testCoverage}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Test Coverage
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {project.codeQuality.openIssues}
                        </div>
                        <div className="text-sm text-gray-500">Open Issues</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          {project.codeQuality.contributors}
                        </div>
                        <div className="text-sm text-gray-500">
                          Contributors
                        </div>
                      </div>
                    </div>

                    {project.codeQuality.languages &&
                      project.codeQuality.languages.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">
                            Language Distribution
                          </h4>
                          <div className="space-y-2">
                            {project.codeQuality.languages.map(
                              (lang, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-20 text-sm text-gray-600">
                                    {lang.name}
                                  </div>
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${lang.percentage}%` }}
                                    />
                                  </div>
                                  <div className="w-12 text-sm text-gray-600 text-right">
                                    {lang.percentage}%
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    <AdvancedVisualizations data={{}} />
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}

      {/* README Preview */}
      {project.readme && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Project Documentation
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(project.readme || "")}
                    title="Copy README content"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("readme")}
                  >
                    {expandedSections.readme ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.readme && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto max-h-96">
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {project.readme}
                      </pre>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>README.md</span>
                      <span>{project.readme.length} characters</span>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.technologies && project.technologies.length > 0 ? (
              <div className="space-y-6">
                {/* Group technologies by category */}
                {(() => {
                  const groupedTechs = project.technologies.reduce(
                    (acc, tech) => {
                      const category = tech.category || "Other";
                      if (!acc[category]) acc[category] = [];
                      acc[category].push(tech);
                      return acc;
                    },
                    {} as Record<string, any[]>,
                  );

                  return Object.entries(groupedTechs).map(
                    ([category, techs]) => (
                      <div key={category} className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                          {category}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {techs.map((tech, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-100 hover:border-gray-200"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center shadow-sm">
                                  <Code className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">
                                    {tech.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {tech.experience || "Experience level"}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-500">
                                    Proficiency
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {tech.proficiency}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${tech.proficiency >= 80
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                        : tech.proficiency >= 60
                                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                          : tech.proficiency >= 40
                                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                            : "bg-gradient-to-r from-red-500 to-pink-500"
                                      }`}
                                    style={{ width: `${tech.proficiency}%` }}
                                  />
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                  <span>{tech.projects || 0} projects</span>
                                  {tech.isRecommended && (
                                    <span className="text-green-600 font-medium">
                                      ★ Recommended
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Technologies Added
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Add technologies to showcase your tech stack and skills
                </p>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technology
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Media Gallery</h3>
        {isEditing && (
          <Button onClick={() => navigate(`/showcase/edit/${id}`)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Media
          </Button>
        )}
      </div>

      {isLoadingMedia ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Loading media...</p>
          </CardContent>
        </Card>
      ) : projectMedia && projectMedia.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectMedia.map((media: any) => {
            const Icon = getMediaIcon(media.type);
            return (
              <Card
                key={media.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  {media.type?.startsWith('image/') ? (
                    <div className="relative w-full h-48 mb-2 rounded-lg overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : media.type?.startsWith('video/') ? (
                    <div className="relative w-full h-48 mb-2 rounded-lg overflow-hidden bg-gray-900 group">
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        onLoadedMetadata={(e) => {
                          // Try to capture a thumbnail frame
                          const video = e.currentTarget;
                          video.currentTime = 0.1; // Seek to 0.1 seconds for thumbnail
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Icon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {media.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(media.size || 0)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedMedia(media);
                        setShowMediaViewer(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No media files
            </h3>
            <p className="text-gray-500 mb-4">
              {isEditing
                ? "Go to edit section to add media files to your project."
                : "No media files have been uploaded for this project yet."}
            </p>
            {isEditing && (
              <Button onClick={() => navigate(`/showcase/edit/${id}`)}>
                <Plus className="w-4 h-4 mr-2" />
                Go to Edit Section
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Team Members</h3>
        {isEditing && (
          <Button onClick={() => setShowInviteModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        )}
      </div>

      {isLoadingTeam ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Loading team members...</p>
          </CardContent>
        </Card>
      ) : teamMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 ${member.color} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white text-sm font-bold">
                      {member.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                    {member.email && (
                      <p className="text-xs text-gray-400">{member.email}</p>
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No team members
            </h3>
            <p className="text-gray-500 mb-4">
              {isEditing
                ? "Add team members to collaborate on this project."
                : "No team members have been added to this project yet. Go to edit section to add team members."}
            </p>
            {isEditing ? (
              <Button onClick={() => setShowInviteModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Go to Edit Section
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Project Activity</h3>

      {/* Add Comment */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || 'User'}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {currentUser?.name
                    ? currentUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)
                    : 'U'}
                </span>
              </div>
            )}
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      {activities.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No activity yet
            </h3>
            <p className="text-gray-500">
              Activity will appear here as team members are added, comments are made, and updates occur.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {activity.type === "comment" && activity.userAvatar ? (
                    <img
                      src={activity.userAvatar}
                      alt={activity.user || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : activity.type === "comment" ? (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {activity.user
                          ? activity.user
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .substring(0, 2)
                          : 'U'}
                      </span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.type === "update" && (
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      )}
                      {activity.type === "upload" && (
                        <Upload className="w-4 h-4 text-gray-600" />
                      )}
                      {activity.type === "team" && (
                        <Users className="w-4 h-4 text-gray-600" />
                      )}
                      {activity.type === "milestone" && (
                        <Star className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex flex-col rounded-xl shadow-lg m-4">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-mono text-sm font-bold">
              &lt;/&gt;
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white">ShowWork</h1>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </div>
          <div className="flex items-center px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm">
            <Package className="w-5 h-5 mr-3" />
            Showcase
          </div>
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => navigate("/analytics")}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </div>
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => navigate("/community")}
          >
            <Users className="w-5 h-5 mr-3" />
            Community
          </div>
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => navigate("/portfolio")}
          >
            <FolderOpen className="w-5 h-5 mr-3" />
            Portfolio
          </div>
          <div className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200">
            <Zap className="w-5 h-5 mr-3" />
            Integrations
          </div>
        </nav>

        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </div>
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                <button
                  onClick={() => navigate("/showcase")}
                  className="hover:text-gray-700"
                >
                  Showcase
                </button>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{project.name}</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-sm text-gray-500">
                Last updated{" "}
                {formatDate(project.updatedAt || new Date().toISOString())}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? "Cancel Edit" : "Edit Project"}
              </Button>
              <Button
                variant="outline"
                onClick={handleLike}
                className={`flex items-center gap-2 ${liked ? "text-red-600" : "text-gray-600"}`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {likes}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/showcase")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Showcase
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === "overview" && renderOverviewTab()}
              {activeTab === "media" && renderMediaTab()}
              {activeTab === "team" && renderTeamTab()}
              {activeTab === "activity" && renderActivityTab()}
            </div>
          </div>
        </div>
      </main>

      {/* Media Viewer Modal */}
      {showMediaViewer && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold">{selectedMedia.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowMediaViewer(false);
                  setSelectedMedia(null);
                }}
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">
              {selectedMedia.type?.startsWith('image/') ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="w-full h-auto rounded-lg"
                />
              ) : selectedMedia.type?.startsWith('video/') ? (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full h-auto rounded-lg"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              ) : selectedMedia.type?.startsWith('audio/') ? (
                <div className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <Music className="w-16 h-16 text-gray-400" />
                  </div>
                  <audio
                    src={selectedMedia.url}
                    controls
                    className="w-full"
                    autoPlay
                  >
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Preview not available for this file type.
                  </p>
                  <Button
                    onClick={() => window.open(selectedMedia.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick Actions */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="relative">
          <Button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Zap className="w-6 h-6 text-white" />
          </Button>

          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-2 min-w-[200px]"
              >
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setShowQuickActions(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel Edit" : "Edit Project"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleShare();
                      setShowQuickActions(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Project
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLike();
                      setShowQuickActions(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${liked ? "fill-current text-red-600" : ""}`}
                    />
                    {liked ? "Unlike" : "Like"}
                  </Button>
                  <div className="border-t pt-1 mt-1">
                    <div className="text-xs text-gray-500 px-2 py-1">
                      Keyboard shortcuts:
                    </div>
                    <div className="text-xs text-gray-400 px-2">
                      Ctrl+E: Edit • Ctrl+S: Share
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Media Modal */}
      {showMediaModal && project.media && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Media Viewer</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMediaModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4">
              {/* Media content would go here */}
              <div className="text-center py-8">
                <p className="text-gray-500">Media viewer implementation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Team Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Invite Team Member
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <Input
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="Enter member role"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <Input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="Enter member email"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowInviteModal(false);
                  setNewMemberName("");
                  setNewMemberRole("");
                  setNewMemberEmail("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInviteTeam}
                disabled={!newMemberName.trim() || !newMemberRole.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Member
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
