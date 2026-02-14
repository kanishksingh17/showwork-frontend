import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Briefcase,
  ArrowLeft,
  Wand2,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { PortfolioTemplate, UserPortfolio, JobRole } from "../types/portfolio";
import { UnifiedLayout } from "../components/UnifiedLayout";
import { PortfolioSelector } from "../components/portfolio/PortfolioSelector";
// import { PortfolioCustomizer } from "../components/portfolio/PortfolioCustomizer";
// import { LiveTemplateFiller } from "../components/portfolio/LiveTemplateFiller"; // Component doesn't exist
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import { SimpleFolioLayout } from "../components/portfolio/simplefolio/SimpleFolioTemplate";
import { ModernPortfolioEditor } from "../components/portfolio/ModernPortfolioEditor";

type BuilderStep = "landing" | "template-preview" | "customizer" | "preview";

export default function PortfolioBuilder() {
  const [currentStep, setCurrentStep] = useState<BuilderStep>("landing");
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate | null>(null);
  const [detectedJobRole, setDetectedJobRole] = useState<JobRole | null>(null);
  const [isDetectingRole, setIsDetectingRole] = useState(true);
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio | null>(
    null,
  );
  // Removed unused state variables
  const [showContentTypeModal, setShowContentTypeModal] = useState(false);
  const [contentType, setContentType] = useState<"ai" | "manual" | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLiveBuilder, setShowLiveBuilder] = useState(false);
  const [fetchedProjects, setFetchedProjects] = useState<any[]>([]);

  // Real user data - fetched from profile API (includes name, tech stack, skills from profile setup)
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email?: string;
    bio?: string;
    tagline?: string;
    username?: string;
    techStack?: string[]; // Tech stacks from profile setup
    skills: Array<{
      name: string;
      percentage: number;
      category: string;
    }>;
    quizResults?: Array<{
      technology: string;
      score: number;
      attempts: number;
    }>;
    socials?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  } | null>(null);

  // Mock projects data - in real app, this would come from your showcase
  const projects = [
    {
      id: "1",
      name: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/johndoe/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800",
      featured: true,
    },
    {
      id: "2",
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      technologies: ["React", "Socket.io", "Express"],
      githubUrl: "https://github.com/johndoe/taskapp",
      liveUrl: "https://taskapp-demo.com",
      imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      featured: true,
    },
  ];

  // Fetch REAL user profile data from database (name, tech stack, skills, GitHub, bio from profile setup)
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        console.log("🔄 Fetching user profile from /api/portfolio/profile...");

        // Fetch from portfolio profile API - this has ALL the data from profile setup
        const response = await fetch("/api/portfolio/profile", {
          credentials: "include",
        });

        if (response.ok) {
          // Check if response is JSON
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            console.warn("⚠️ Profile API returned non-JSON response (likely HTML 404)");
          } else {
            const data = await response.json();
            console.log("📦 Profile API Response:", data);

            if (data.success && data.user) {
              const user = data.user;

              // Extract tech stack from profile setup (stored as techStack array)
              const techStack = user.techStack || [];

              // Extract skills from quiz results (stored in skills array with percentages)
              const skills = (user.skills || []).map((skill: {
                name?: string;
                percentage?: number;
                category?: string;
              } | string) => ({
                name: typeof skill === "string" ? skill : (skill.name || ""),
                percentage: typeof skill === "string" ? 0 : (skill.percentage || 0),
                category: typeof skill === "string" ? "programming" : (skill.category || "programming"),
              }));

              // Build user data from stored profile
              const profileData = {
                id: user._id || user.id || "current-user",
                name: user.name || "Developer", // REAL NAME from profile setup (not "John Doe")
                email: user.email || "",
                bio: user.bio || user.tagline || "",
                tagline: user.tagline || "",
                username: user.username || "",
                skills: skills,
                techStack: techStack, // Tech stacks selected during profile setup
                quizResults: user.quizResults || [],
                socials: {
                  github: user.socials?.github || "",
                  linkedin: user.socials?.linkedin || "",
                  twitter: user.socials?.twitter || "",
                },
              };

              setUserData(profileData);

              console.log("✅ Loaded REAL user profile from database:", {
                name: profileData.name,
                bio: profileData.bio,
                techStack: techStack,
                skillsCount: skills.length,
                github: profileData.socials?.github,
              });

              return;
            }
          }
        } else {
          console.warn("⚠️ Profile API returned:", response.status, response.statusText);
        }

        // If portfolio profile fails, try auth/me as fallback
        console.log("🔄 Trying /api/auth/me as fallback...");
        const authResponse = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (authResponse.ok) {
          const authData = await authResponse.json();
          if (authData.success && authData.user) {
            const user = authData.user;
            setUserData({
              id: user._id || user.id || "current-user",
              name: user.name || "Developer",
              email: user.email || "",
              bio: "",
              skills: [],
              socials: {},
            });
            console.log("✅ Using auth/me fallback - Name:", user.name);
            return;
          }
        }

        // Final fallback
        console.warn("⚠️ No user profile found");
        setUserData({
          id: "current-user",
          name: "Developer",
          skills: [],
        });
      } catch (error) {
        console.error("❌ Failed to fetch user profile:", error);
        setUserData({
          id: "current-user",
          name: "Developer",
          skills: [],
        });
      }
    };

    loadUserProfile();
  }, []);

  // Fetch complete project data from showcase section on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Fetch from /api/projects to get complete data with mediaFiles and teamMembers
        // Vite proxies /api/* requests to Express backend (localhost:5001)
        // See vite.config.ts proxy configuration
        const response = await fetch("/api/projects?limit=50", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
        });

        if (!response.ok) {
          // Check if it's HTML (404 page) or JSON error
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("text/html")) {
            console.warn(`⚠️ Projects API endpoint not found (${response.status}). Backend may not be running or route doesn't exist.`);
          } else {
            // Try to get error details
            const errorData = await response.json().catch(() => ({ error: response.statusText }));
            console.warn(`⚠️ Projects API returned ${response.status}:`, errorData);
          }

          // Continue with empty projects array if API fails
          setFetchedProjects([]);
          return;
        }

        // Check content type before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.warn("⚠️ Projects API returned non-JSON response");
          setFetchedProjects([]);
          return;
        }

        const data = await response.json();
        console.log("📦 Projects API Response:", {
          success: data.success,
          count: data.count,
          projectsCount: data.data?.projects?.length || 0
        });

        // Handle response format: { success: true, data: { projects: [...] } }
        if (data.success && data.data?.projects?.length > 0) {
          const formattedProjects = data.data.projects.map((p: {
            id: string;
            name: string;
            description: string;
            longDescription?: string;
            technologies: string[];
            githubUrl?: string;
            liveUrl?: string;
            imageUrl?: string;
            videoUrl?: string;
            tags?: string[];
            category?: string;
            featured?: boolean;
            mediaFiles?: Array<{
              id: string;
              name: string;
              type: string;
              url: string;
              thumbnailUrl?: string;
              category: string;
            }>;
            teamMembers?: Array<{
              id: string;
              name: string;
              role: string;
              avatar?: string;
            }>;
          }) => {
            // Extract all images from mediaFiles
            const images = p.mediaFiles
              ?.filter(mf => mf.category === "IMAGES" || mf.type?.startsWith("image"))
              .map(mf => mf.url) || [];

            // Use imageUrl as fallback
            if (p.imageUrl && !images.includes(p.imageUrl)) {
              images.unshift(p.imageUrl);
            }

            return {
              id: p.id,
              name: p.name,
              description: p.description,
              longDescription: p.longDescription,
              technologies: p.technologies || [],
              githubUrl: p.githubUrl,
              liveUrl: p.liveUrl,
              imageUrl: images[0] || null,
              images: images, // All images
              tags: p.tags || [], // Features
              category: p.category,
              isFeatured: p.featured || false,
              teamMembers: p.teamMembers || [],
            };
          });
          setFetchedProjects(formattedProjects);
          console.log("✅ Loaded projects from API:", formattedProjects.length);
        } else {
          // No projects found or unexpected response format
          if (data.success) {
            console.log("ℹ️ No projects found in API response");
          } else {
            console.warn("⚠️ Projects API response format unexpected:", data);
          }
          setFetchedProjects([]);
        }
      } catch (error) {
        console.error("❌ Error fetching projects from API:", error);
        console.warn("Will use empty projects array");
        setFetchedProjects([]);

        // Optional: Fallback to mock projects if needed (commented out for now)
        /*
        const mockProjectsWithType = projects.map(p => {
          const projectData: {
            id: string;
            name: string;
            description: string;
            technologies: string[];
            githubUrl?: string;
            liveUrl?: string;
            imageUrl?: string;
            images?: string[];
            tags?: string[];
            teamMembers?: Array<{ id: string; name: string; role: string; avatar?: string }>;
            isFeatured?: boolean;
          } = {
            id: p.id,
            name: p.name,
            description: p.description,
            technologies: p.technologies,
          };
          
          if (p.githubUrl) projectData.githubUrl = p.githubUrl;
          if (p.liveUrl) projectData.liveUrl = p.liveUrl;
          if ('imageUrl' in p && (p as { imageUrl?: string }).imageUrl) {
            const imgUrl = (p as { imageUrl?: string }).imageUrl;
            if (imgUrl) {
              projectData.imageUrl = imgUrl;
              projectData.images = [imgUrl];
            }
          }
          if (p.featured) projectData.isFeatured = p.featured;
          
          return projectData;
        });
        setFetchedProjects(mockProjectsWithType);
        */
      }
    };

    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlePortfolioPreview = (portfolio: UserPortfolio) => {
    setUserPortfolio(portfolio);
    setCurrentStep("preview");
  };

  const handlePortfolioSave = async () => {
    if (!selectedTemplate) return;

    try {
      console.log("📤 Publishing portfolio with template:", selectedTemplate.id);
      console.log("👤 User data:", userData);
      console.log("📦 Projects:", fetchedProjects);

      const response = await fetch("/api/portfolio/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          userId: userData?.id || "guest",
          userData: userData,
          projects: fetchedProjects
        }),
      });

      const data = await response.json();
      console.log("✅ Portfolio creation response:", data);

      if (data.success && data.url) {
        alert(`Portfolio published successfully!\n\nOpening your portfolio...`);
        window.open(data.url, '_blank');
      } else {
        console.error("Failed to create portfolio:", data.error);
        alert(`Failed to create portfolio: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Failed to create portfolio:", error);
      alert("Failed to create portfolio. Please try again.");
    }
  };

  const handleBackToCustomizer = () => {
    setCurrentStep("customizer");
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
  };

  const handleStartOver = () => {
    setCurrentStep("landing");
    setSelectedTemplate(null);
    setDetectedJobRole(null);
    setUserPortfolio(null);
  };



  // Load templates and detect job role on mount
  useEffect(() => {
    const loadInitialData = async () => {
      setIsDetectingRole(true);

      // Wait for userData and projects to be loaded, then detect job role using AI
      const detectJobRole = async () => {
        try {
          // Wait a bit for userData and fetchedProjects to be loaded
          await new Promise(resolve => setTimeout(resolve, 500));

          // Use real user data and projects if available
          const currentUserData = userData;
          const currentProjects = fetchedProjects.length > 0 ? fetchedProjects : projects;

          if (currentUserData && currentProjects.length > 0) {
            // Import PortfolioAIService to extract job role
            // No API key needed - it uses secure server-side routes
            const { PortfolioAIService } = await import("../services/portfolio-ai-service");
            const aiService = new PortfolioAIService();

            try {
              // Cast projects to Project[] type - they might be missing some optional fields
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const typedProjects = currentProjects.map((p: any) => ({
                ...p,
                title: p.title || p.name || '',
                relevanceScore: p.relevanceScore || 0,
              }));

              const extractedJobRole = await aiService.extractJobRole(
                currentUserData,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                typedProjects as any // PortfolioAIService accepts the project structure we have
              );
              setDetectedJobRole(extractedJobRole);
              console.log("✅ Job role detected:", extractedJobRole);
            } catch (error) {
              console.warn("⚠️ Job role detection failed, using fallback:", error);
              // Fallback: Create job role from user's tech stack
              const techStack = currentUserData.techStack || [];
              const skills = currentUserData.skills?.map((s: { name?: string } | string) =>
                typeof s === 'string' ? s : (s.name || '')
              ) || [];
              const allSkills = [...techStack, ...skills].filter(Boolean);

              const fallbackJobRole: JobRole = {
                id: "detected-role",
                title: techStack.length > 0
                  ? `${techStack[0]} Developer`
                  : skills.length > 0
                    ? `${skills[0]} Developer`
                    : "Software Developer",
                industry: "Technology",
                skills: allSkills.slice(0, 10), // Limit to top 10 skills
                experienceLevel: "mid",
                description: techStack.length > 0
                  ? `Developer specializing in ${techStack.slice(0, 3).join(", ")}`
                  : "Full-stack developer with experience in modern web technologies",
              };
              setDetectedJobRole(fallbackJobRole);
            }
          } else {
            // If no user data yet, use a basic fallback
            const mockJobRole: JobRole = {
              id: "frontend-dev",
              title: "Software Developer",
              industry: "Technology",
              skills: ["JavaScript", "React", "Node.js"],
              experienceLevel: "mid",
              description: "Full-stack developer with experience in modern web technologies",
            };
            setDetectedJobRole(mockJobRole);
          }
        } catch (error) {
          console.error("Error in job role detection:", error);
          // Final fallback
          const mockJobRole: JobRole = {
            id: "frontend-dev",
            title: "Software Developer",
            industry: "Technology",
            skills: ["JavaScript", "React", "Node.js"],
            experienceLevel: "mid",
            description: "Full-stack developer with experience in modern web technologies",
          };
          setDetectedJobRole(mockJobRole);
        } finally {
          setIsDetectingRole(false);
        }
      };

      detectJobRole();

      // Mock templates removed as we use API now
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, fetchedProjects]); // Re-detect job role when userData or projects change

  const handleUseTemplate = async (template: PortfolioTemplate) => {
    setSelectedTemplate(template);

    // Check if it's a file-based template (has previewUrl or framework)
    // or if we want to treat all templates as file-based for now
    // if (template.previewUrl || template.framework || template.type === 'file-based' || true) {
    //   try {
    //     // Show loading state if possible, or just proceed
    //     const response = await fetch("/api/portfolio/create", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         templateId: template.id,
    //         userId: userData?.id || "guest"
    //       }),
    //     });

    //     const data = await response.json();
    //     if (data.success && data.redirectUrl) {
    //       // Redirect to the created portfolio
    //       window.location.href = data.redirectUrl;
    //       return;
    //     } else {
    //       console.error("Failed to create portfolio:", data.error);
    //     }
    //   } catch (error) {
    //     console.error("Failed to create portfolio:", error);
    //   }
    // }

    setCurrentStep("template-preview");
  };

  const handleProceedToCustomizer = async () => {
    if (!selectedTemplate) return;

    // Instead of creating and opening in new tab, show content type selection modal
    // This will lead to the customizer step with split-screen editor
    setShowContentTypeModal(true);
  };

  const generateFullPortfolio = async () => {
    if (!selectedTemplate || !userData) return;

    setIsGenerating(true);
    // Show a temporary loading state or toast could be good here
    console.log("🚀 Starting AI Portfolio Generation...");

    try {
      const { PortfolioAIService } = await import("../services/portfolio-ai-service");
      const aiService = new PortfolioAIService();

      const filledSections = await Promise.all(selectedTemplate.sections!.map(async (section) => {
        // Skip header/footer for AI generation usually, or generate minimal content
        if (section.type === 'header' || section.type === 'footer') {
          return section;
        }

        console.log(`🤖 Generating content for section: ${section.type}...`);
        try {
          const content = await aiService.generatePortfolioContent(
            section.type,
            detectedJobRole || {
              id: 'default',
              title: 'Developer',
              industry: 'Tech',
              skills: [],
              experienceLevel: 'mid',
              description: 'Developer'
            },
            userData,
            fetchedProjects.length > 0 ? fetchedProjects : projects
          );

          return {
            ...section,
            content: content
          };
        } catch (err) {
          console.error(`Failed to generate content for ${section.type}`, err);
          return section; // Fallback to original/empty
        }
      }));

      // Create the new portfolio object
      const newPortfolio: UserPortfolio = {
        id: `portfolio-${Date.now()}`,
        userId: userData.id,
        templateId: selectedTemplate.id,
        jobRole: detectedJobRole || undefined,
        sections: filledSections,
        customizations: {
          colors: {
            primary: '#3b82f6',
            secondary: '#1e40af',
            accent: '#8b5cf6',
            background: '#ffffff',
            text: '#1f2937'
          },
          fonts: {
            heading: 'Inter',
            body: 'Inter'
          },
          layout: {
            spacing: 'normal',
            alignment: 'left'
          },
          socialLinks: []
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setUserPortfolio(newPortfolio);

      // Move to customizer so they can see/edit the result
      setCurrentStep("customizer");

    } catch (error) {
      console.error("❌ Error in portfolio generation:", error);
      alert("Failed to generate portfolio content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentTypeSelect = async (type: "ai" | "manual") => {
    setContentType(type);
    setShowContentTypeModal(false);

    if (type === "ai") {
      await generateFullPortfolio();
    } else {
      // Manual: Just go to customizer with placeholder content
      setCurrentStep("customizer");
    }
  };

  const handleLiveBuilderComplete = (portfolioUrl: string) => {
    setShowLiveBuilder(false);
    // ... existing logic ...
  };

  const handleLiveBuilderCancel = () => {
    setShowLiveBuilder(false);
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case "landing":
        return (
          <div className="w-full h-full">
            <PortfolioSelector
              userData={userData}
              projects={fetchedProjects.length > 0 ? fetchedProjects : projects}
              onTemplateSelect={handleUseTemplate}
              onJobRoleDetected={(role) => setDetectedJobRole(role)}
            />
          </div>
        );

      case "template-preview":
        return (
          <div className="w-full h-full">
            {selectedTemplate && (
              <div className="h-full overflow-y-auto px-6 py-8">
                <div className="max-w-6xl mx-auto space-y-6">
                  {/* Template Preview Content */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                    {/* Preview Header */}
                    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedTemplate.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {selectedTemplate.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {selectedTemplate.isPopular && (
                            <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                              Popular
                            </span>
                          )}
                          <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full capitalize">
                            {selectedTemplate.layout}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Template Preview - Actual Iframe or Specialized Mock */}
                    {selectedTemplate.previewUrl ? (
                      <div className="relative w-full" style={{ height: '600px' }}>
                        <iframe
                          src={selectedTemplate.previewUrl}
                          className="w-full h-full border-0 rounded-lg"
                          title={`${selectedTemplate.name} preview`}
                        />
                      </div>
                    ) : selectedTemplate.id === 'api-engineer' ? (
                      <div className="w-full h-full overflow-y-auto">
                        <SimpleFolioLayout
                          userData={userData}
                          projects={fetchedProjects.length > 0 ? fetchedProjects : projects}
                        />
                      </div>
                    ) : selectedTemplate.id === 'recommended-fullstack' ? (
                      <div className="bg-[#1b1a2e] text-white min-h-[600px] p-12 font-sans relative overflow-hidden">
                        {/* High-Fidelity Full Preview Mock */}
                        <div className="max-w-4xl mx-auto relative z-10">
                          {/* Mock Header */}
                          <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-4">
                            <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                              SAJIB.
                            </div>
                            <nav className="flex gap-8 text-sm font-medium opacity-80">
                              <span className="hover:text-purple-400 cursor-pointer transition-colors">Home</span>
                              <span className="hover:text-purple-400 cursor-pointer transition-colors">About</span>
                              <span className="hover:text-purple-400 cursor-pointer transition-colors">Projects</span>
                              <span className="hover:text-purple-400 cursor-pointer transition-colors">Resume</span>
                            </nav>
                          </header>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                              <h2 className="text-3xl font-light">
                                Hi There! <span className="animate-bounce inline-block">👋🏻</span>
                              </h2>
                              <h1 className="text-5xl font-extrabold leading-tight">
                                I'M <span className="text-purple-400">MD ABU BAKKAR SIDDIQE SAJIB</span>
                              </h1>

                              <div className="text-2xl font-mono text-purple-400 border-l-4 border-purple-500 pl-4 py-2 bg-purple-500/5">
                                MERN Stack Developer
                              </div>

                              <p className="text-lg opacity-70 leading-relaxed">
                                I enjoy tackling new challenges and continuously expanding my skillset.
                                Proficient in Javascript, GraphQL, and Solana.
                              </p>

                              <div className="flex gap-4 pt-4">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg">
                                  View My Work
                                </Button>
                                <div className="flex gap-4 items-center px-4">
                                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 cursor-pointer transition-all">🐙</div>
                                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 cursor-pointer transition-all">in</div>
                                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-60 hover:opacity-100 cursor-pointer transition-all">🐦</div>
                                </div>
                              </div>
                            </div>

                            <div className="relative">
                              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full"></div>
                              <div className="relative bg-[#2d2c4e] rounded-2xl p-8 border border-white/10 shadow-2xl transform hover:scale-105 transition-transform">
                                <svg width="300" height="200" viewBox="0 0 300 200" fill="none" className="w-full h-auto">
                                  <rect width="300" height="200" rx="12" fill="#1b1a2e" />
                                  <rect x="20" y="20" width="260" height="120" rx="4" fill="#2d2c4e" />
                                  <circle cx="40" cy="160" r="15" fill="#C084FC" />
                                  <rect x="65" y="152" width="100" height="6" rx="3" fill="#ffffff20" />
                                  <rect x="65" y="164" width="60" height="4" rx="2" fill="#ffffff10" />
                                  <path d="M220 150 L260 150" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" />
                                  <path d="M220 160 L240 160" stroke="#ffffff20" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <div className="mt-6 flex justify-between items-center opacity-60 text-xs font-mono">
                                  <span>portfolio_v1.js</span>
                                  <span>2.4kb</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
                      </div>
                    ) : (
                      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
                          {/* Mock Navigation */}
                          <div className="bg-gray-900 dark:bg-gray-950 px-6 py-4 flex items-center gap-4">
                            <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                              <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                            </div>
                            <div className="flex-1 bg-gray-800 dark:bg-gray-900 rounded px-4 py-2 text-sm text-gray-400">
                              portfolio.example.com
                            </div>
                          </div>

                          {/* Mock Content */}
                          <div className="p-8 space-y-6">
                            {/* Hero Section Mock */}
                            <div className="space-y-4">
                              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>

                            {/* Stats/Cards Mock */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2"></div>
                                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                </div>
                              ))}
                            </div>

                            {/* Content Sections Mock */}
                            <div className="space-y-4 mt-6">
                              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                              <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded"></div>
                            </div>

                            <div className="space-y-4 mt-6">
                              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
                                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base"
                      onClick={handleProceedToCustomizer}
                    >
                      <Briefcase className="h-5 w-5 mr-2" />
                      Create Portfolio with This Template
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Content Type Selection Modal */}
            {showContentTypeModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowContentTypeModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {/* Modal Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
                      Choose content type
                    </h2>

                    <div className="space-y-3">
                      {/* AI Generated Content Option */}
                      <button
                        onClick={() => handleContentTypeSelect("ai")}
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                            <Wand2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              AI generated content
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Generate content from a description
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Placeholder/Manual Content Option */}
                      <button
                        onClick={() => handleContentTypeSelect("manual")}
                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                            <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              Placeholder content
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Continue with default text
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "customizer": {
        // Store complete user data globally for PortfolioCustomizer to access
        // Ensure all fields are included
        const completeUserData = userData || {
          id: "current-user",
          name: "Developer",
          skills: [],
          techStack: [],
          quizResults: [],
          socials: {},
        };

        return (
          <div className="w-full h-full bg-white">
            {selectedTemplate && (
              <ModernPortfolioEditor
                template={selectedTemplate}
                userData={completeUserData}
                projects={fetchedProjects.length > 0 ? fetchedProjects : projects}
                jobRole={detectedJobRole}
                onSave={handlePortfolioSave}
                onPublish={handlePortfolioSave}
                onClose={() => setCurrentStep("template-preview")}
              />
            )}
          </div>
        );
      }

      case "preview":
        return (
          <div className="w-full h-full">
            {userPortfolio?.deploymentUrl ? (
              <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900">
                {/* Preview Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Your Portfolio is Ready! 🚀
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Here is a live preview of your published website
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsGenerating(false);
                          handleBackToCustomizer();
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Editor
                      </Button>
                      <Button
                        onClick={() => window.open(userPortfolio.deploymentUrl, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Live Site
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Iframe Preview */}
                <div className="flex-1 p-6 overflow-hidden">
                  <div className="max-w-7xl mx-auto h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <iframe
                      src={userPortfolio.deploymentUrl}
                      className="w-full h-full border-0"
                      title="Portfolio Preview"
                    />
                  </div>
                </div>
              </div>
            ) : userPortfolio ? (
              <PortfolioPreview
                portfolio={userPortfolio}
                onEdit={() => {
                  setIsGenerating(false);
                  handleBackToCustomizer();
                }}
                isGenerating={isGenerating}
                projects={fetchedProjects.length > 0 ? fetchedProjects : projects}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">No portfolio to preview</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <UnifiedLayout activePage="portfolio" showSidebar={currentStep !== 'customizer'}>
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header - Fixed - Only show navigation, no title/description after landing */}
        {currentStep !== "landing" && currentStep !== "customizer" && (
          <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex-shrink-0">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={
                    currentStep === "template-preview"
                      ? handleBackToLanding
                      : currentStep === "customizer"
                        ? () => setCurrentStep("template-preview")
                        : handleBackToCustomizer
                  }
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {currentStep === "template-preview"
                    ? "Templates"
                    : currentStep === "customizer"
                      ? "Preview"
                      : "Customize"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleStartOver}>
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Scrollable, constrained within sidebar boundary */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
          {renderStep()}
        </div>
      </div>
    </UnifiedLayout>
  );
}
