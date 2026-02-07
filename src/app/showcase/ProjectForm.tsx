import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Star,
  Eye,
  GitFork,
  Calendar,
  Code,
  Image,
  FileText,
  Tag,
  Plus,
  X,
  Save,
  Zap,
  Target,
  Package,
  BarChart3,
  Users,
  FolderOpen,
  Settings,
  LogOut,
  LayoutDashboard,
  Lock,
  Edit3,
  Archive,
  Play,
  Pause,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import MediaUploader from "@/components/media/MediaUploader";

interface ProjectData {
  id?: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  category: string;
  features: string[]; // Renamed from tags
  technologies: string[];
  status: "draft" | "in-progress" | "completed";
  visibility: "public" | "private" | "unlisted";
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
}

interface EditRestrictions {
  canEditBasicInfo: boolean;
  canEditTechnologies: boolean;
  canEditGitHub: boolean;
  canChangeStatus: boolean;
  canDelete: boolean;
  reason?: string;
}

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editRestrictions, setEditRestrictions] = useState<EditRestrictions>({
    canEditBasicInfo: true,
    canEditTechnologies: true,
    canEditGitHub: true,
    canChangeStatus: true,
    canDelete: true,
  });

  // Project data with auto-save
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    category: "Web Development",
    features: [], // Renamed from tags
    technologies: [],
    status: "draft",
    visibility: "public",
  });

  // GitHub integration
  const [githubRepo, setGithubRepo] = useState<GitHubRepo | null>(null);
  const [githubLanguages, setGithubLanguages] = useState<
    Record<string, number>
  >({});
  const [isFetchingRepo, setIsFetchingRepo] = useState(false);
  const [featureInput, setFeatureInput] = useState(""); // Renamed from tagInput
  
  // Team members
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Load existing project for editing
  useEffect(() => {
    if (isEdit && id) {
      const loadExistingProject = async () => {
        setIsLoading(true);
        try {
          // First try localStorage
          const savedProjects = localStorage.getItem("showcase-projects");
          if (savedProjects) {
            const projects = JSON.parse(savedProjects);
            const existingProject = projects.find((p: any) => p.id === id);

            if (existingProject) {
              setProjectData({
                id: existingProject.id,
                name: existingProject.name || "",
                description: existingProject.description || "",
                githubUrl: existingProject.githubUrl || "",
                liveUrl: existingProject.liveUrl || "",
                category: existingProject.category || "Web Development",
                features: existingProject.tags || existingProject.features || [], // Support both tags and features
                technologies: existingProject.technologies || [],
                status: existingProject.status || "draft",
                visibility: existingProject.visibility || "public",
              });

              // Load GitHub data if available
              if (existingProject.githubRepo) {
                setGithubRepo(existingProject.githubRepo);
              }
              if (existingProject.githubLanguages) {
                setGithubLanguages(existingProject.githubLanguages);
              }

              // Set edit restrictions based on status
              setEditRestrictions(getEditRestrictions(existingProject.status));
              setIsLoading(false);
              return;
            }
          }

          // If not found in localStorage, try API
          try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
            const response = await fetch(`${apiBaseUrl}/api/projects`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              const result = await response.json();
              
              // Find project by ID from API response
              if (result.success && result.data?.projects) {
                const apiProject = result.data.projects.find((p: any) => 
                  p.id === id || p._id?.toString() === id || p.id?.toString() === id
                );
                
                if (apiProject) {
                  console.log("✅ Loaded project from API for editing:", apiProject);
                  
                  // Map API project format to form format
                  const projectId = apiProject.id || apiProject._id?.toString() || id;
                  setProjectData({
                    id: projectId,
                    name: apiProject.name || apiProject.title || "",
                    description: apiProject.description || "",
                    githubUrl: apiProject.githubUrl || "",
                    liveUrl: apiProject.liveUrl || "",
                    category: apiProject.category || "Web Development",
                    features: apiProject.tags || apiProject.features || [], // Support both tags and features
                    technologies: apiProject.technologies || [],
                    status: apiProject.status?.toLowerCase() || "draft",
                    visibility: apiProject.visibility?.toLowerCase() || "public",
                  });
                  console.log("✅ Project ID set for media upload:", projectId);
                  
                  setEditRestrictions(getEditRestrictions(apiProject.status?.toLowerCase() || "draft"));
                  
                  // Fetch team members if editing
                  if (projectId) {
                    fetchTeamMembers(projectId);
                  }
                  
                  setIsLoading(false);
                  return;
                }
              }
            }
          } catch (apiError) {
            console.error("❌ API fetch failed:", apiError);
          }

          // If not found in either location
          setErrors({ general: "Project not found" });
        } catch (error) {
          console.error("Failed to load project:", error);
          setErrors({ general: "Failed to load project data" });
        } finally {
          setIsLoading(false);
        }
      };

      loadExistingProject();
    }
  }, [isEdit, id]);

  // Get edit restrictions based on project status
  const getEditRestrictions = (status: string): EditRestrictions => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: false,
          canEditGitHub: false,
          canChangeStatus: true,
          canDelete: true,
          reason:
            "Completed projects: Can edit basic info and status, but not technical details",
        };
      case "in-progress":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "In-progress projects: Full editing allowed",
        };
      case "draft":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "Draft projects: Full editing allowed",
        };
      case "published":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "Published projects: Full editing allowed",
        };
      case "submitted":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "Submitted projects: Full editing allowed",
        };
      case "pending":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "Pending projects: Full editing allowed",
        };
      case "saved":
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
          reason: "Saved projects: Full editing allowed",
        };
      default:
        return {
          canEditBasicInfo: true,
          canEditTechnologies: true,
          canEditGitHub: true,
          canChangeStatus: true,
          canDelete: true,
        };
    }
  };

  // Auto-save to localStorage
  useEffect(() => {
    const draftData = {
      projectData,
      currentStep,
      githubRepo,
      githubLanguages,
      isEdit,
      editRestrictions,
    };
    localStorage.setItem("project-draft-unified", JSON.stringify(draftData));
  }, [
    projectData,
    currentStep,
    githubRepo,
    githubLanguages,
    isEdit,
    editRestrictions,
  ]);

  // Load draft from localStorage
  useEffect(() => {
    if (!isEdit) {
      const savedDraft = localStorage.getItem("project-draft-unified");
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (!draft.isEdit) {
            // Only load draft for new projects
            setProjectData(draft.projectData || projectData);
            setCurrentStep(draft.currentStep || 1);
            setGithubRepo(draft.githubRepo || null);
            setGithubLanguages(draft.githubLanguages || {});
          }
        } catch (error) {
          console.error("Failed to load draft:", error);
        }
      }
    }
  }, [isEdit]);

  // Extract GitHub repo info from URL
  const extractGitHubInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(".git", ""),
      };
    }
    return null;
  };

  // Fetch GitHub repository data
  const fetchGitHubRepo = async (url: string) => {
    if (!editRestrictions.canEditGitHub) return;

    const repoInfo = extractGitHubInfo(url);
    if (!repoInfo) return;

    setIsFetchingRepo(true);
    try {
      // Fetch repo data
      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`,
      );
      if (!repoResponse.ok) throw new Error("Repository not found");

      const repoData: GitHubRepo = await repoResponse.json();
      setGithubRepo(repoData);

      // Fetch languages
      const languagesResponse = await fetch(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/languages`,
      );
      if (languagesResponse.ok) {
        const languages = await languagesResponse.json();
        setGithubLanguages(languages);

        // Auto-populate technologies from GitHub languages (only if allowed)
        if (editRestrictions.canEditTechnologies) {
          const techNames = Object.keys(languages);
          setProjectData((prev) => ({
            ...prev,
            technologies: [...new Set([...prev.technologies, ...techNames])],
          }));
        }
      }

      // Auto-populate project data from GitHub (only if allowed)
      if (editRestrictions.canEditBasicInfo) {
        setProjectData((prev) => ({
          ...prev,
          name: prev.name || repoData.name,
          description: prev.description || repoData.description || "",
          liveUrl: prev.liveUrl || repoData.homepage || "",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        github: "Failed to fetch repository data",
      }));
    } finally {
      setIsFetchingRepo(false);
    }
  };

  // Handle GitHub URL change
  const handleGitHubUrlChange = (url: string) => {
    if (!editRestrictions.canEditGitHub) return;

    setProjectData((prev) => ({ ...prev, githubUrl: url }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.github;
      return newErrors;
    });

    if (url && url.includes("github.com")) {
      fetchGitHubRepo(url);
    }
  };

  // Handle input changes with restrictions
  const handleInputChange = (field: keyof ProjectData, value: any) => {
    // Check if field can be edited
    if (
      field === "name" ||
      field === "description" ||
      field === "liveUrl" ||
      field === "category" ||
      field === "features"
    ) {
      if (!editRestrictions.canEditBasicInfo) return;
    }
    if (field === "technologies") {
      if (!editRestrictions.canEditTechnologies) return;
    }
    if (field === "githubUrl") {
      if (!editRestrictions.canEditGitHub) return;
    }
    if (field === "status") {
      if (!editRestrictions.canChangeStatus) return;
    }

    setProjectData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };


  // Add feature (renamed from tag)
  const addFeature = () => {
    if (!editRestrictions.canEditBasicInfo) return;

    const feature = featureInput.trim();
    if (feature && !projectData.features.includes(feature)) {
      setProjectData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }));
      setFeatureInput("");
    }
  };

  // Remove feature (renamed from tag)
  const removeFeature = (feature: string) => {
    if (!editRestrictions.canEditBasicInfo) return;
    setProjectData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  // Add technology
  const addTechnology = (tech: string) => {
    if (!editRestrictions.canEditTechnologies) return;

    if (tech && !projectData.technologies.includes(tech)) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }));
    }
  };

  // Remove technology
  const removeTechnology = (techToRemove: string) => {
    if (!editRestrictions.canEditTechnologies) return;

    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!projectData.name.trim()) {
          newErrors.name = "Project name is required";
        }
        if (!projectData.description.trim()) {
          newErrors.description = "Project description is required";
        }
        break;
      case 2:
        // Media step - no validation required (optional)
        break;
      case 3:
        // Technology step - no validation required (optional, but recommended)
        // Technologies can be added later
        break;
      case 4:
        // Team members step - no validation required (optional)
        break;
      case 5:
        // Review step - validate before final submission
        if (!projectData.name.trim()) {
          newErrors.name = "Project name is required";
        }
        if (!projectData.description.trim()) {
          newErrors.description = "Project description is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Navigate to a specific step (allow jumping to any step)
  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      // Validate steps 1 and 5 before allowing navigation
      if (step === 5 || step === 1) {
        if (validateStep(1)) {
          setCurrentStep(step);
        }
      } else {
        // For steps 2, 3, 4 - allow direct navigation
        setCurrentStep(step);
      }
    }
  };

  // Fetch team members for the form
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
          setTeamMembers(result.data);
          console.log(`✅ Loaded ${result.data.length} team members for form`);
        }
      }
    } catch (error) {
      console.error('Error fetching team members for form:', error);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  // Add team member from modal
  const addTeamMember = async () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) {
      alert("Name and role are required.");
      return;
    }

    // If editing and project ID exists, use API
    if (isEdit && projectData.id) {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/team/${projectData.id}`, {
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
          throw new Error(errorData.error || 'Failed to add team member');
        }

        const result = await response.json();
        if (result.success && result.data) {
          setTeamMembers((prev) => [...prev, result.data]);
          setNewMemberName("");
          setNewMemberRole("");
          setNewMemberEmail("");
          setShowInviteModal(false);
          alert("Team member added successfully!");
        }
      } catch (error) {
        console.error('Error adding team member:', error);
        alert(`Failed to add team member: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      // For new projects (not yet saved), just add to local state
      const newMember = {
        id: `temp-${Date.now()}`,
        name: newMemberName.trim(),
        role: newMemberRole.trim(),
        email: newMemberEmail.trim() || undefined,
      };
      setTeamMembers((prev) => [...prev, newMember]);
      setNewMemberName("");
      setNewMemberRole("");
      setNewMemberEmail("");
      setShowInviteModal(false);
      alert("Team member will be saved when you save the project.");
    }
  };

  // Remove team member
  const removeTeamMember = async (memberId: string) => {
    if (!projectData.id) {
      // For new projects, just remove from local state
      setTeamMembers((prev) => prev.filter((m) => m.id !== memberId));
      return;
    }

    if (!window.confirm("Are you sure you want to remove this team member?")) {
      return;
    }

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/team/${projectData.id}/${memberId}`, {
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
        alert("Team member removed successfully!");
      }
    } catch (error) {
      console.error('Error removing team member:', error);
      alert(`Failed to remove team member: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Save project
  const handleSaveProject = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      if (isEdit && projectData.id) {
        // Update existing project via API
        const updatePayload = {
          title: projectData.name,
          description: projectData.description,
          technologies: projectData.technologies || [],
          githubUrl: projectData.githubUrl || '',
          liveUrl: projectData.liveUrl || '',
          category: projectData.category || 'Web Development',
          tags: projectData.features || [], // Save features as tags for backward compatibility
          status: projectData.status || 'draft', // Include status - this is the key fix!
          visibility: projectData.visibility || 'public',
        };

        console.log("📤 Updating project via API:", projectData.id, updatePayload);

        const response = await fetch(`${apiBaseUrl}/api/portfolio/projects/${projectData.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatePayload),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: Failed to update project`);
        }

        const data = await response.json();
        
        if (data.success) {
          console.log("✅ Project updated successfully:", data);
          
          // Clear draft
          localStorage.removeItem("project-draft-unified");
          
          // Navigate to showcase
          navigate("/showcase");
        } else {
          throw new Error(data.message || 'Failed to update project');
        }
      } else {
        // Create new project (fallback to localStorage if no API)
        const project = {
          id: `project-${Date.now()}`,
          ...projectData,
          githubRepo,
          githubLanguages,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const existingProjects = JSON.parse(
          localStorage.getItem("showcase-projects") || "[]",
        );
        existingProjects.push(project);
        localStorage.setItem("showcase-projects", JSON.stringify(existingProjects));

        // Clear draft
        localStorage.removeItem("project-draft-unified");

        // Navigate to showcase
        navigate("/showcase");
      }
    } catch (error) {
      console.error("❌ Error saving project:", error);
      setErrors({ general: `Failed to save project: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = () => {
    if (!editRestrictions.canDelete) return;

    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      const existingProjects = JSON.parse(
        localStorage.getItem("showcase-projects") || "[]",
      );
      const updatedProjects = existingProjects.filter(
        (p: any) => p.id !== projectData.id,
      );
      localStorage.setItem(
        "showcase-projects",
        JSON.stringify(updatedProjects),
      );
      navigate("/showcase");
    }
  };

  // Step 1: Project Information
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Edit Restrictions Notice */}
      {editRestrictions.reason && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-blue-800">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {editRestrictions.reason}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Project Information
            {!editRestrictions.canEditBasicInfo && (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <Input
                value={projectData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter project name"
                className={cn(errors.name && "border-red-500")}
                disabled={!editRestrictions.canEditBasicInfo}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={projectData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!editRestrictions.canEditBasicInfo}
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Desktop Application">Desktop Application</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="DevOps">DevOps</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <Textarea
              value={projectData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your project..."
              rows={4}
              className={cn(errors.description && "border-red-500")}
              disabled={!editRestrictions.canEditBasicInfo}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="w-4 h-4 inline mr-1" />
                GitHub URL
                {!editRestrictions.canEditGitHub && (
                  <Lock className="w-3 h-3 inline ml-1 text-gray-400" />
                )}
              </label>
              <Input
                value={projectData.githubUrl}
                onChange={(e) => handleGitHubUrlChange(e.target.value)}
                placeholder="https://github.com/username/repo"
                className={cn(errors.github && "border-red-500")}
                disabled={!editRestrictions.canEditGitHub}
              />
              {errors.github && (
                <p className="text-sm text-red-500 mt-1">{errors.github}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ExternalLink className="w-4 h-4 inline mr-1" />
                Live URL
              </label>
              <Input
                value={projectData.liveUrl}
                onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                placeholder="https://your-project.com"
                disabled={!editRestrictions.canEditBasicInfo}
              />
            </div>
          </div>


          {/* Status and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
                {!editRestrictions.canChangeStatus && (
                  <Lock className="w-3 h-3 inline ml-1 text-gray-400" />
                )}
              </label>
              <select
                value={projectData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!editRestrictions.canChangeStatus}
              >
                <option value="draft">Draft</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibility
              </label>
              <select
                value={projectData.visibility}
                onChange={(e) =>
                  handleInputChange("visibility", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!editRestrictions.canEditBasicInfo}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* GitHub Repository Info */}
      {githubRepo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Repository
              {isFetchingRepo && <Loader2 className="w-4 h-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{githubRepo.name}</h3>
                  <p className="text-gray-600">{githubRepo.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {githubRepo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {githubRepo.forks_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {githubRepo.watchers_count}
                  </div>
                </div>
              </div>

              {Object.keys(githubLanguages).length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(githubLanguages).map(([lang, bytes]) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Step 2: Media
  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Project Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEdit && projectData.id ? (
            <MediaUploader
              projectId={projectData.id}
              onFilesUploaded={(files) => {
                console.log("Media files uploaded:", files);
              }}
              onError={(error) => {
                setErrors((prev) => ({ ...prev, media: error }));
              }}
              maxFiles={20}
              maxFileSize={100}
              allowedTypes={["image/*", "video/*", "audio/*", "application/pdf"]}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Save the project first to upload media files.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Step 3: Technology & Features
  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Project Features
            {!editRestrictions.canEditBasicInfo && (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Features
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                disabled={!editRestrictions.canEditBasicInfo}
              />
              <Button
                onClick={addFeature}
                size="sm"
                disabled={!editRestrictions.canEditBasicInfo}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectData.features.length === 0 ? (
                <p className="text-gray-500 text-sm">No features added yet</p>
              ) : (
                projectData.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {feature}
                    <button
                      onClick={() => removeFeature(feature)}
                      className="ml-1 hover:text-red-500"
                      disabled={!editRestrictions.canEditBasicInfo}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technologies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Technology Stack
            {!editRestrictions.canEditTechnologies && (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto-suggested technologies from GitHub */}
          {Object.keys(githubLanguages).length > 0 && (
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Suggested from GitHub</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(githubLanguages).map((lang) => (
                  <Button
                    key={lang}
                    variant="outline"
                    size="sm"
                    onClick={() => addTechnology(lang)}
                    disabled={!editRestrictions.canEditTechnologies || projectData.technologies.includes(lang)}
                    className="h-9"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Popular technologies */}
          <div>
            <h4 className="font-medium mb-3 text-gray-900">Popular Technologies</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "React",
                "Vue.js",
                "Angular",
                "Node.js",
                "Python",
                "JavaScript",
                "TypeScript",
                "Java",
                "C++",
                "Go",
                "Rust",
                "PHP",
                "Ruby",
                "Swift",
                "Kotlin",
                "Dart",
                "Flutter",
                "React Native",
              ].map((tech) => (
                <Button
                  key={tech}
                  variant="outline"
                  size="sm"
                  onClick={() => addTechnology(tech)}
                  disabled={!editRestrictions.canEditTechnologies || projectData.technologies.includes(tech)}
                  className="justify-start h-9"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {tech}
                </Button>
              ))}
            </div>
          </div>

          {/* Selected technologies */}
          <div>
            <h4 className="font-medium mb-3 text-gray-900">Selected Technologies</h4>
            {projectData.technologies.length === 0 ? (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-sm text-center">No technologies selected. Click on technologies above to add them.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {projectData.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-red-500 transition-colors"
                      disabled={!editRestrictions.canEditTechnologies}
                      type="button"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {errors.technologies && (
              <p className="text-sm text-red-500 mt-2">{errors.technologies}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 4: Team Members
  const renderStep4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowInviteModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>

          {isLoadingTeam ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500">Loading team members...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {member.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .toUpperCase()
                            .substring(0, 2)}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTeamMember(member.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No team members added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );

  // Step 5: Review & Submit
  const renderStep5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Project Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Project Information
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {projectData.name}
                </div>
                <div>
                  <span className="font-medium">Category:</span>{" "}
                  {projectData.category}
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge
                    variant={
                      projectData.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                    className="ml-2"
                  >
                    {projectData.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Visibility:</span>{" "}
                  {projectData.visibility}
                </div>
                <div>
                  <span className="font-medium">Description:</span>{" "}
                  {projectData.description}
                </div>
                {projectData.githubUrl && (
                  <div>
                    <span className="font-medium">GitHub:</span>{" "}
                    {projectData.githubUrl}
                  </div>
                )}
                {projectData.liveUrl && (
                  <div>
                    <span className="font-medium">Live URL:</span>{" "}
                    {projectData.liveUrl}
                  </div>
                )}
                {projectData.features.length > 0 && (
                  <div>
                    <span className="font-medium">Features:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {projectData.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Technologies ({projectData.technologies.length})
              </h4>
              <div className="space-y-2">
                {projectData.technologies.length === 0 ? (
                  <p className="text-sm text-gray-500">No technologies selected</p>
                ) : (
                  projectData.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{tech}</span>
                      <Badge variant="outline">Selected</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Team Members ({teamMembers.length})
            </h4>
            {teamMembers.length === 0 ? (
              <p className="text-sm text-gray-500">No team members added</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {member.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                          .substring(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {githubRepo && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                GitHub Repository
              </h4>
              <div className="flex items-center justify-between text-sm">
                <span>{githubRepo.full_name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {githubRepo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {githubRepo.forks_count}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Ready to {isEdit ? "Update" : "Submit"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Step 1: Project information completed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Step 2: Media uploaded (optional)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Step 3: Features and technology stack selected</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Step 4: Team members added (optional)</span>
            </div>
            {githubRepo && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">GitHub repository connected</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
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
        </nav>

        <div className="px-4 py-2 border-t border-white/10">
          <div className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </div>
          <div
            className="flex items-center px-4 py-3 text-sm font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("project-draft-unified");
              navigate("/login");
            }}
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
                <span className="text-gray-900">
                  {isEdit ? "Edit Project" : "Add Project"}
                </span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEdit ? "Edit Project" : "Add New Project"}
              </h1>
              <p className="text-sm text-gray-500">Step {currentStep} of 5</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const draftData = {
                    projectData,
                    currentStep,
                    githubRepo,
                    githubLanguages,
                    isEdit,
                    editRestrictions,
                  };
                  localStorage.setItem(
                    "project-draft-unified",
                    JSON.stringify(draftData),
                  );
                }}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </Button>
              {isEdit && editRestrictions.canDelete && (
                <Button
                  variant="outline"
                  onClick={handleDeleteProject}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Step Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => goToStep(step)}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer",
                        step <= currentStep
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300",
                        step === currentStep && "ring-2 ring-blue-400 ring-offset-2"
                      )}
                      title={`Go to step ${step}`}
                    >
                      {step}
                    </button>
                    {step < 5 && (
                      <div
                        className={cn(
                          "w-12 h-1 mx-1",
                          step < currentStep ? "bg-blue-600" : "bg-gray-200",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Project Info</span>
                <span>Media</span>
                <span>Technology</span>
                <span>Team</span>
                <span>Review</span>
              </div>
            </div>

            {/* Error Display */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="mb-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {currentStep < 5 ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveProject}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isEdit ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        {isEdit ? "Update Project" : "Create Project"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Invite Team Member Modal - Rendered at root level */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full bg-white">
            <CardHeader>
              <CardTitle>Add Team Member</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
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
              <div className="flex justify-end space-x-3">
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
                <Button onClick={addTeamMember}>
                  Add Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
