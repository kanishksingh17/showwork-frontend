import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContentPreview } from "./ContentPreview";
import { generatePlatformPosts, GeneratedPlatformPost } from "@/services/aiGenerationService";
import { Sparkles, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import GitHubService from "@/services/githubService";

interface RepoData {
  full_name: string;
  description?: string;
  languages?: Record<string, number>;
  stargazers_count?: number;
  forks_count?: number;
  html_url?: string;
  topics?: string[];
}

interface GitHubAIGeneratorProps {
  owner: string;
  repo: string;
  selectedFiles?: Set<string>;
  platforms: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
  }>;
  onContentGenerated?: (content: Record<string, any>) => void;
}

export function GitHubAIGenerator({
  owner,
  repo,
  selectedFiles = new Set(),
  platforms,
  onContentGenerated,
}: GitHubAIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<Record<string, GeneratedPlatformPost>>({});
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [readme, setReadme] = useState<string>("");
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);

  const githubService = new GitHubService();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Use analyzeRepository to get repo data and README
      const repoUrl = `https://github.com/${owner}/${repo}`;
      const analysis = await githubService.analyzeRepository(repoUrl);
      
      const repoInfo: RepoData = {
        full_name: analysis.repo.full_name,
        description: analysis.repo.description,
        languages: analysis.languages,
        stargazers_count: analysis.repo.stargazers_count,
        forks_count: analysis.repo.forks_count,
        html_url: analysis.repo.html_url,
        topics: analysis.repo.topics,
      };
      setRepoData(repoInfo);
      setReadme(analysis.readme);

      // Generate platform posts
      const selectedFilesArray = Array.from(selectedFiles);
      const posts = await generatePlatformPosts(
        repoInfo,
        readmeContent,
        selectedFilesArray.length > 0 ? selectedFilesArray : undefined
      );

      setGeneratedPosts(posts);

      // Convert to format expected by CrossPostComposer
      if (onContentGenerated) {
        const formattedContent: Record<string, any> = {};
        Object.entries(posts).forEach(([platform, post]) => {
          formattedContent[platform] = {
            platform,
            message: post.content,
            metadata: post.metadata || {},
            hashtags: post.metadata?.hashtags || [],
            mediaUrls: [],
          };
        });
        onContentGenerated(formattedContent);
      }

      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(`Failed to generate content: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentPlatform = platforms[currentPlatformIndex];
  const currentPost = currentPlatform ? generatedPosts[currentPlatform.id] : null;

  const nextPlatform = () => {
    setCurrentPlatformIndex((prev) => (prev + 1) % platforms.length);
  };

  const prevPlatform = () => {
    setCurrentPlatformIndex((prev) => (prev - 1 + platforms.length) % platforms.length);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Content Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate platform-specific posts from GitHub repository
              </p>
              {selectedFiles.size > 0 && (
                <Badge variant="secondary" className="mt-2">
                  {selectedFiles.size} file{selectedFiles.size !== 1 ? "s" : ""} selected
                </Badge>
              )}
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="min-w-[140px]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Posts
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Preview Carousel */}
      {Object.keys(generatedPosts).length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content Preview</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPlatform}
                  disabled={platforms.length <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentPlatformIndex + 1} / {platforms.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPlatform}
                  disabled={platforms.length <= 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {currentPlatform && currentPost ? (
              <ContentPreview
                content={{
                  platform: currentPlatform.id,
                  message: currentPost.content,
                  metadata: {
                    characterCount: currentPost.content.length,
                    isValid: true,
                    ...currentPost.metadata,
                  },
                  hashtags: currentPost.metadata?.hashtags || [],
                  mediaUrls: [],
                }}
                platformName={currentPlatform.name}
                platformColor={currentPlatform.color}
                platformIcon={currentPlatform.icon}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No content generated for {currentPlatform?.name}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Platform Indicators */}
      {Object.keys(generatedPosts).length > 0 && platforms.length > 1 && (
        <div className="flex justify-center gap-2">
          {platforms.map((platform, index) => (
            <button
              key={platform.id}
              onClick={() => setCurrentPlatformIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPlatformIndex
                  ? "bg-primary w-8"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`View ${platform.name} preview`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

