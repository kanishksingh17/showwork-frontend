import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ExternalLink,
  CheckCircle2,
  Box,
  MoreHorizontal,
  Search,
  Layout,
  Grid2X2,
  Link,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github
} from "lucide-react";
import { FaReddit } from "react-icons/fa";
import { cn } from "@/lib/utils";

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

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelect: (project: Project | null) => void;
  isLoading?: boolean;
}

const statusDotColors = {
  'Draft': 'bg-gray-500',
  'Pending': 'bg-red-500',
  'Published': 'bg-green-500',
  'In Progress': 'bg-blue-500',
};

export function ProjectSelector({
  projects,
  selectedProject,
  onSelect,
  isLoading = false,
}: ProjectSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"board" | "grid">("board");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = {
    'In Progress': filteredProjects.filter(p => p.status === 'In Progress' || !p.status), // Default to In Progress if no status
    'Pending': filteredProjects.filter(p => p.status === 'Pending'),
    'Published': filteredProjects.filter(p => p.status === 'Published'),
    'Draft': filteredProjects.filter(p => p.status === 'Draft'),
  };

  const columnOrder = ['In Progress', 'Pending', 'Published', 'Draft'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        <span className="ml-2 text-sm text-gray-600">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col gap-3 mb-2 px-1 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Select a Project</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose a project to turn work into impact
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Connected Platforms */}
            <div className="hidden md:flex items-center gap-2 mr-2">
              <span className="text-xs text-gray-400 font-medium">Connected:</span>
              <div className="flex -space-x-2">
                {[
                  { Icon: Linkedin, bg: "bg-[#0077b5]" },
                  { Icon: Twitter, bg: "bg-[#1DA1F2]" },
                  { Icon: Instagram, bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" }, // Instagram Gradient
                  { Icon: Facebook, bg: "bg-[#4267B2]" },
                  { Icon: Github, bg: "bg-[#333333]" },
                  { Icon: FaReddit, bg: "bg-[#FF4500]" }
                ].map(({ Icon, bg }, i) => (
                  <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-sm hover:z-10 hover:scale-110 transition-all cursor-pointer text-white", bg)}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))}

              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48 lg:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-8 h-8 text-xs bg-gray-50 border-gray-200 focus-visible:ring-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                <button
                  onClick={() => setViewMode("board")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "board"
                      ? "bg-white shadow-sm text-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-200/50"
                  )}
                  title="Board View"
                >
                  <Layout className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-200/50"
                  )}
                  title="Grid View"
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto min-h-0 pb-4 pr-1">
          {filteredProjects.map((project) => {
            const isSelected = selectedProject?.id === project.id;
            return (
              <motion.div
                key={project.id}
                layoutId={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(project)}
                className="relative group"
              >
                <Card
                  className={cn(
                    "p-3 cursor-pointer transition-all duration-200 border shadow-sm hover:shadow-md",
                    isSelected
                      ? "border-blue-500 ring-1 ring-blue-500 shadow-md bg-blue-50/5"
                      : "border-gray-200/60 bg-white hover:border-blue-300"
                  )}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full text-white z-10">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}

                  {/* Card Header: Icon & Tag */}
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg border border-blue-500 bg-blue-50/10 flex items-center justify-center text-blue-500 shrink-0">
                      <Box className="w-4 h-4" />
                    </div>

                    {!isSelected && (
                      <Badge variant="secondary" className={cn("capitalize font-normal text-[10px] px-1.5 py-0 h-5",
                        project.status === 'Published' ? "bg-green-50 text-green-700 border-green-100" : "bg-blue-50 text-blue-700 border-blue-100")}>
                        {project.status || 'In Progress'}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-1 mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {project.description || "Digital product design project"}
                    </p>
                  </div>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
                    {/* Progress */}
                    <div className="flex flex-col gap-1 w-full max-w-[50%]">
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-500",
                            project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                          )}
                          style={{ width: `${project.progress || 50}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium">{project.progress || 50}% Done</span>
                    </div>

                    {/* Avatars */}
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-medium shadow-sm">
                          U{i}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Kanban Board */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 flex-1 min-h-0">
          {columnOrder.map((status) => (
            <div key={status} className="flex flex-col h-full min-w-[240px] bg-gray-50/50 rounded-xl p-2">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-2 shrink-0">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", statusDotColors[status as keyof typeof statusDotColors])} />
                  <h3 className="font-semibold text-gray-700 text-sm">{status}</h3>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[10px] text-gray-500 font-medium border border-gray-100 shadow-sm">
                    {columns[status as keyof typeof columns].length}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-white/50">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </Button>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-2.5 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                {columns[status as keyof typeof columns].map((project) => {
                  const isSelected = selectedProject?.id === project.id;
                  return (
                    <motion.div
                      key={project.id}
                      layoutId={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      onClick={() => onSelect(project)}
                      className="relative group"
                    >
                      <Card
                        className={cn(
                          "p-3 cursor-pointer transition-all duration-200 border shadow-sm hover:shadow-md",
                          isSelected
                            ? "border-blue-500 ring-1 ring-blue-500 shadow-md bg-blue-50/5"
                            : "border-gray-200/60 bg-white hover:border-blue-300"
                        )}
                      >
                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full text-white z-10">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}

                        {/* Card Header: Icon & Tag */}
                        <div className="flex items-start justify-between mb-2.5">
                          <div className="w-8 h-8 rounded-lg border border-blue-500 bg-blue-50/10 flex items-center justify-center text-blue-500 shrink-0">
                            <Box className="w-4 h-4" />
                          </div>

                          {!isSelected && (
                            <Badge variant="secondary" className={cn("capitalize font-normal text-[10px] px-1.5 py-0 h-5",
                              project.status === 'Published' ? "bg-green-50 text-green-700 border-green-100" : "bg-blue-50 text-blue-700 border-blue-100")}>
                              {project.status || 'In Progress'}
                            </Badge>
                          )}
                        </div>

                        {/* Content */}
                        <div className="space-y-1 mb-3">
                          <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                            {project.description || "Digital product design project"}
                          </p>
                        </div>

                        {/* Footer Info */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
                          {/* Progress */}
                          <div className="flex flex-col gap-1 w-full max-w-[50%]">
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={cn("h-full rounded-full transition-all duration-500",
                                  project.progress === 100 ? "bg-green-500" : "bg-blue-500"
                                )}
                                style={{ width: `${project.progress || 50}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-400 font-medium">{project.progress || 50}% Done</span>
                          </div>

                          {/* Avatars */}
                          <div className="flex -space-x-1.5">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-5 h-5 rounded-full border border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-medium shadow-sm">
                                U{i}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Empty Column State */}
                {columns[status as keyof typeof columns].length === 0 && (
                  <div className="h-24 border-2 border-dashed border-gray-200/50 rounded-lg flex items-center justify-center text-gray-300 text-xs">
                    Empty
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
