import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnifiedSidebar } from "../components/UnifiedSidebar";
import {
  ArrowLeft,
  Save,
  Link,
  Code,
  Globe,
  Eye,
  EyeOff,
  Plus,
  X,
  Settings,
  RefreshCw,
  Sparkles,
  Brain,
} from "lucide-react";
import { toast } from "sonner";

interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  category: string;
  status: string;
  visibility: string;
}

export default function ManualProjectForm() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    technologies: [],
    tags: [],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    category: "Web Development",
    status: "draft",
    visibility: "public",
  });

  const [newTech, setNewTech] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [enhancingField, setEnhancingField] = useState<string | null>(null);

  const categories = [
    "Web Development",
    "Mobile App",
    "Desktop App",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Design",
    "Game Development",
    "Other",
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "published", label: "Published" },
  ];

  const visibilityOptions = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "unlisted", label: "Unlisted" },
  ];

  const handleAddTech = () => {
    if (newTech.trim() && !projectData.technologies.includes(newTech.trim())) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
      setNewTech("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setProjectData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleAIAnalyze = async () => {
    if (!projectData.githubUrl) {
      toast.error("Please enter a GitHub URL first");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch(`/api/ai/generate-from-repo?url=${encodeURIComponent(projectData.githubUrl)}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (data.success && data.data) {
        const analysis = data.data;
        setProjectData((prev) => ({
          ...prev,
          name: analysis.name || prev.name,
          description: analysis.description || analysis.summary || prev.description,
          technologies: Array.from(new Set([...prev.technologies, ...(analysis.techStack || [])])),
          category: analysis.category || prev.category,
        }));
        toast.success("AI analysis complete! Fields pre-filled.");
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

  const handleAIEnhance = async (field: "name" | "description") => {
    const content = projectData[field];
    if (!content) {
      toast.error(`Please enter some ${field} content first`);
      return;
    }

    setEnhancingField(field);
    try {
      const response = await fetch("/api/ai/enhance-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ section: field, content }),
      });
      const data = await response.json();

      if (data.success && data.data.section) {
        setProjectData((prev) => ({
          ...prev,
          [field]: data.data.section,
        }));
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} enhanced!`);
      } else {
        throw new Error(data.message || "Failed to enhance field");
      }
    } catch (error) {
      console.error("AI Enhancement Error:", error);
      toast.error("AI enhancement failed.");
    } finally {
      setEnhancingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(projectData),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Project saved successfully!");
        navigate("/showcase");
      } else {
        throw new Error(data.message || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UnifiedSidebar currentPage="showcase" />

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/showcase")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Showcase
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Add Project Manually
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below to add your project to the showcase
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="name" className="mb-0">Project Name *</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleAIEnhance("name")}
                          disabled={enhancingField === "name" || !projectData.name}
                        >
                          {enhancingField === "name" ? (
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <Sparkles className="w-3 h-3 mr-1" />
                          )}
                          Enhance
                        </Button>
                      </div>
                      <Input
                        id="name"
                        value={projectData.name}
                        onChange={(e) =>
                          setProjectData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter project name"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="description" className="mb-0">Description *</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleAIEnhance("description")}
                          disabled={enhancingField === "description" || !projectData.description}
                        >
                          {enhancingField === "description" ? (
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          ) : (
                            <Sparkles className="w-3 h-3 mr-1" />
                          )}
                          Enhance
                        </Button>
                      </div>
                      <Textarea
                        id="description"
                        value={projectData.description}
                        onChange={(e) =>
                          setProjectData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Describe your project"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={projectData.category}
                        onValueChange={(value) =>
                          setProjectData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Technologies */}
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        placeholder="Add technology"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                      />
                      <Button type="button" onClick={handleAddTech} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projectData.technologies.map((tech: any) => (
                        <Badge
                          key={tech.id || tech.name || tech}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tech.name || tech}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                            onClick={() => handleRemoveTech(tech)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projectData.tags.map((tag: any) => (
                        <Badge
                          key={tag.id || tag.name || tag}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {tag.name || tag}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Links */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="w-5 h-5" />
                      Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id="githubUrl"
                          type="url"
                          value={projectData.githubUrl}
                          onChange={(e) =>
                            setProjectData((prev) => ({ ...prev, githubUrl: e.target.value }))
                          }
                          placeholder="https://github.com/username/repo"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAIAnalyze}
                          disabled={isAnalyzing || !projectData.githubUrl}
                          className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 whitespace-nowrap"
                        >
                          {isAnalyzing ? (
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Brain className="w-4 h-4 mr-2" />
                          )}
                          Analyze with AI
                        </Button>
                      </div>
                      <p className="text-[10px] text-gray-500 italic">
                        Fetch name, description, and tech stack from README
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="liveUrl">Live Demo URL</Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        value={projectData.liveUrl}
                        onChange={(e) =>
                          setProjectData((prev) => ({ ...prev, liveUrl: e.target.value }))
                        }
                        placeholder="https://yourproject.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imageUrl">Project Image URL</Label>
                      <Input
                        id="imageUrl"
                        type="url"
                        value={projectData.imageUrl}
                        onChange={(e) =>
                          setProjectData((prev) => ({ ...prev, imageUrl: e.target.value }))
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={projectData.status}
                        onValueChange={(value) =>
                          setProjectData((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="visibility">Visibility</Label>
                      <Select
                        value={projectData.visibility}
                        onValueChange={(value) =>
                          setProjectData((prev) => ({ ...prev, visibility: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                {option.value === "public" ? (
                                  <Globe className="w-4 h-4" />
                                ) : option.value === "private" ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                      {projectData.name ? (
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {projectData.name}
                          </h3>
                          {projectData.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {projectData.description}
                            </p>
                          )}
                          {projectData.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {projectData.technologies.map((tech: any, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech.name || tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center">
                          Fill out the form to see preview
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/showcase")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
