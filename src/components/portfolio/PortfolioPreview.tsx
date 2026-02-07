import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Eye,
  Download,
  Share2,
  Edit,
  Globe,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import type { UserPortfolio } from "../../types/portfolio";

interface PortfolioPreviewProps {
  portfolio: UserPortfolio;
  onEdit?: () => void;
  onPublish?: () => void;
  isGenerating?: boolean;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    images?: string[];
    tags?: string[];
    category?: string;
    teamMembers?: Array<{
      id: string;
      name: string;
      role: string;
      avatar?: string;
    }>;
  }>;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolio,
  onEdit,
  onPublish,
  isGenerating = false,
  projects = [],
}) => {
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<Record<string, string>>({});
  const prevContentRef = useRef<Record<string, string>>({});

  // Track content changes and animate typing effect
  useEffect(() => {
    if (!portfolio || !portfolio.sections) return;

    portfolio.sections.forEach((section) => {
      const sectionId = section.id;
      const currentContent = section.content || "";
      const prevContent = prevContentRef.current[sectionId] || "";

      // If content is being generated (increasing length or new content)
      if (isGenerating && currentContent.length > prevContent.length) {
        // Show the content as it types word-by-word
        setDisplayedContent((prev) => ({
          ...prev,
          [sectionId]: currentContent,
        }));
      } else if (currentContent !== prevContent) {
        // Content changed, update immediately
        setDisplayedContent((prev) => ({
          ...prev,
          [sectionId]: currentContent,
        }));
      }

      prevContentRef.current[sectionId] = currentContent;
    });
  }, [portfolio, isGenerating]);

  // Reset displayed content when generation starts
  useEffect(() => {
    if (isGenerating && portfolio) {
      portfolio.sections.forEach((section) => {
        setDisplayedContent((prev) => ({
          ...prev,
          [section.id]: "",
        }));
        prevContentRef.current[section.id] = "";
      });
    }
  }, [isGenerating]);

  const getDeviceStyles = () => {
    switch (deviceView) {
      case "mobile":
        return { width: "375px", height: "667px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      default:
        return { width: "100%", height: "100vh" };
    }
  };

  const renderPortfolioContent = () => {
    if (!portfolio || !portfolio.sections) {
      return (
        <div className="bg-white min-h-screen flex items-center justify-center" style={getDeviceStyles()}>
          <p className="text-gray-500">No portfolio content available</p>
        </div>
      );
    }

    // Get content for a section, with typing animation if generating
    const getSectionContent = (sectionId: string, defaultContent: string) => {
      if (isGenerating && displayedContent[sectionId] !== undefined) {
        return displayedContent[sectionId];
      }
      return defaultContent || "";
    };

    return (
      <div className="bg-white min-h-screen" style={getDeviceStyles()}>
        {portfolio.sections.map((section) => {
          const content = getSectionContent(section.id, section.content);

          switch (section.type) {
            case "hero":
              return (
                <header key={section.id} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">
                      {content || (isGenerating ? "" : "Your Name")}
                    </h1>
                    {isGenerating && content && (
                      <span className="inline-block animate-pulse text-blue-300">|</span>
                    )}
                    {isGenerating && !content && (
                      <div className="h-10 bg-white/20 rounded animate-pulse mb-4 w-48"></div>
                    )}
                  </div>
                </header>
              );

            case "about":
              return (
                <section key={section.id} className="py-16 px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {content}
                      {isGenerating && content && (
                        <span className="inline-block animate-pulse text-blue-500 ml-1">|</span>
                      )}
                    </p>
                    {isGenerating && !content && (
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </section>
              );

            case "projects":
              // Calculate which projects to show based on content length (progressive reveal)
              const contentLength = content?.length || 0;
              const projectsToShow = Math.min(
                Math.floor(contentLength / 150) + 1,
                projects.length,
                6
              );

              return (
                <section key={section.id} className="py-16 px-8 bg-gray-50">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">{section.title}</h2>

                    {/* Projects with Complete Data - Progressive reveal during generation */}
                    {projects.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {projects.slice(0, 6).map((project, idx) => {
                          // Show projects progressively: first appears immediately, then one per 150 chars
                          const shouldShow = !isGenerating || (idx < projectsToShow);

                          if (!shouldShow && isGenerating) {
                            return (
                              <div
                                key={`placeholder-${idx}`}
                                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse"
                              >
                                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-4 space-y-2">
                                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                </div>
                              </div>
                            );
                          }

                          if (!shouldShow) return null;

                          // Get all images (from mediaFiles)
                          const projectImages = project.images || (project.imageUrl ? [project.imageUrl] : []);

                          return (
                            <div
                              key={project.id || idx}
                              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                              style={{
                                animation: isGenerating && idx === projectsToShow - 1
                                  ? 'fadeIn 0.6s ease-in both'
                                  : 'none',
                                opacity: shouldShow ? 1 : 0,
                              }}
                            >
                              {/* Project Images - Carousel */}
                              {projectImages.length > 0 && (
                                <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                  <img
                                    src={projectImages[0]}
                                    alt={project.name || `Project ${idx + 1}`}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    onLoad={(e) => {
                                      (e.target as HTMLImageElement).style.opacity = '1';
                                    }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                    style={{ opacity: isGenerating ? 0 : 1 }}
                                  />
                                  {projectImages.length > 1 && (
                                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                      +{projectImages.length - 1} more
                                    </div>
                                  )}
                                  {isGenerating && idx === projectsToShow - 1 && (
                                    <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center animate-pulse">
                                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {project.name || `Project ${idx + 1}`}
                                  </h3>
                                  {project.category && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded ml-2">
                                      {project.category}
                                    </span>
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                  {project.description}
                                </p>

                                {/* Tech Stack */}
                                {project.technologies && project.technologies.length > 0 && (
                                  <div className="mb-3">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tech Stack:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.technologies.slice(0, 5).map((tech: string) => (
                                        <span
                                          key={tech}
                                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                      {project.technologies.length > 5 && (
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                          +{project.technologies.length - 5}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Features (Tags) */}
                                {project.tags && project.tags.length > 0 && (
                                  <div className="mb-3">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Features:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.tags.slice(0, 4).map((tag: string) => (
                                        <span
                                          key={tag}
                                          className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Team Members */}
                                {project.teamMembers && project.teamMembers.length > 0 && (
                                  <div className="mb-3">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Team:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {project.teamMembers.slice(0, 3).map((member) => (
                                        <div key={member.id || member.name} className="flex items-center gap-1.5">
                                          {member.avatar && (
                                            <img
                                              src={member.avatar}
                                              alt={member.name}
                                              className="w-5 h-5 rounded-full object-cover"
                                              onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                              }}
                                            />
                                          )}
                                          <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {member.name} {member.role && `(${member.role})`}
                                          </span>
                                        </div>
                                      ))}
                                      {project.teamMembers.length > 3 && (
                                        <span className="text-xs text-gray-500 dark:text-gray-500">
                                          +{project.teamMembers.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Links */}
                                <div className="flex gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                      </svg>
                                      GitHub
                                    </a>
                                  )}
                                  {project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                      Live Demo
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {content ? content.replace(/\[IMAGE:[^\]]+\]/g, '') : ''}
                      {isGenerating && content && (
                        <span className="inline-block animate-pulse text-blue-500 ml-1">|</span>
                      )}
                    </div>
                    {isGenerating && !content && projects.length === 0 && (
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </section>
              );

            case "skills":
              return (
                <section key={section.id} className="py-16 px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                    <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {content}
                      {isGenerating && content && (
                        <span className="inline-block animate-pulse text-blue-500 ml-1">|</span>
                      )}
                    </div>
                    {isGenerating && !content && (
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </section>
              );

            case "contact":
              return (
                <section key={section.id} className="py-16 px-8 bg-gray-50">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                    <p className="text-lg text-gray-700 mb-8 whitespace-pre-wrap">
                      {content || "Ready to work together? Let's connect!"}
                      {isGenerating && content && (
                        <span className="inline-block animate-pulse text-blue-500 ml-1">|</span>
                      )}
                    </p>
                    {isGenerating && !content && (
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    )}
                  </div>
                </section>
              );

            default:
              return (
                <section key={section.id} className="py-16 px-8">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {content}
                      {isGenerating && content && (
                        <span className="inline-block animate-pulse text-blue-500 ml-1">|</span>
                      )}
                    </p>
                    {isGenerating && !content && (
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </section>
              );
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Portfolio Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={onPublish}>
                <Share2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Device Preview:</span>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={deviceView === "desktop" ? "default" : "outline"}
                  onClick={() => setDeviceView("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={deviceView === "tablet" ? "default" : "outline"}
                  onClick={() => setDeviceView("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={deviceView === "mobile" ? "default" : "outline"}
                  onClick={() => setDeviceView("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Preview */}
      <div
        className={`border rounded-lg overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}
      >
        <div className="bg-gray-100 p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm text-gray-600">
              Portfolio Preview
            </span>
          </div>
        </div>
        <div className="bg-gray-50 p-4">
          <div
            className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${isFullscreen ? "" : "max-h-[80vh] overflow-y-auto"}`}
          >
            {renderPortfolioContent()}
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600">ATS Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">4.8/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">2.1s</div>
            <div className="text-sm text-gray-600">Load Time</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
