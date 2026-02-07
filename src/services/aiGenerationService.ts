/**
 * AI-powered content generation service for cross-platform social media posts
 */

import { buildPlatformPrompts, PlatformPrompts } from "@/utils/promptBuilder";

interface RepoData {
  full_name: string;
  description?: string;
  languages?: Record<string, number>;
  stargazers_count?: number;
  forks_count?: number;
  html_url?: string;
  topics?: string[];
}

export interface GeneratedPlatformPost {
  platform: string;
  content: string;
  metadata?: {
    characterCount?: number;
    hashtags?: string[];
    mentions?: string[];
  };
}

/**
 * Generate platform-specific posts using OpenAI API
 */
export async function generatePlatformPosts(
  repo: RepoData,
  readme: string,
  selectedFiles?: string[],
  apiKey?: string
): Promise<Record<string, GeneratedPlatformPost>> {
  const prompts = buildPlatformPrompts(repo, readme, selectedFiles);
  const results: Record<string, GeneratedPlatformPost> = {};

  // Use backend API endpoint instead of direct OpenAI call
  // This keeps API keys secure on the server
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${apiBaseUrl}/api/content/generate-from-repo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        repo,
        readme,
        selectedFiles,
        prompts,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate content: ${response.statusText}`);
    }

    const data = await response.json();
    return data.posts || {};
  } catch (error) {
    console.error("Error generating platform posts:", error);
    
    // Fallback: Generate simple posts without AI
    return generateFallbackPosts(repo, readme);
  }
}

/**
 * Fallback: Generate simple posts without AI (when API is unavailable)
 */
function generateFallbackPosts(
  repo: RepoData,
  readme: string
): Record<string, GeneratedPlatformPost> {
  const repoName = repo.full_name.split("/")[1] || repo.full_name;
  const languages = Object.keys(repo.languages || {}).join(", ");
  const stars = repo.stargazers_count || 0;
  const repoUrl = repo.html_url || `https://github.com/${repo.full_name}`;

  return {
    twitter: {
      platform: "twitter",
      content: `🚀 Just released ${repoName}! ${repo.description || "Check it out"} ${languages ? `Built with ${languages}` : ""} ${repoUrl} #opensource #coding`,
      metadata: {
        characterCount: 0,
        hashtags: ["opensource", "coding"],
      },
    },
    linkedin: {
      platform: "linkedin",
      content: `Excited to share ${repoName} - ${repo.description || "A new project"}. ${languages ? `Tech stack: ${languages}.` : ""} ${stars > 0 ? `Already ${stars} stars!` : ""} Check it out: ${repoUrl}`,
      metadata: {
        characterCount: 0,
      },
    },
    reddit: {
      platform: "reddit",
      content: `**${repoName}**\n\n${repo.description || "A new project I've been working on."} ${languages ? `Built with ${languages}.` : ""} ${repoUrl}`,
      metadata: {},
    },
    instagram: {
      platform: "instagram",
      content: `🚀 ${repoName} is live! ${repo.description || "Check it out"} 👨‍💻 ${repoUrl} #coding #opensource`,
      metadata: {
        hashtags: ["coding", "opensource"],
      },
    },
  };
}

/**
 * Generate content for a single platform
 */
export async function generateSinglePlatformPost(
  platform: "twitter" | "linkedin" | "reddit" | "instagram",
  repo: RepoData,
  readme: string,
  selectedFiles?: string[]
): Promise<GeneratedPlatformPost> {
  const allPosts = await generatePlatformPosts(repo, readme, selectedFiles);
  return allPosts[platform] || generateFallbackPosts(repo, readme)[platform];
}

