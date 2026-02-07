/**
 * Build platform-specific prompts for AI content generation
 */

interface RepoData {
  full_name: string;
  description?: string;
  languages?: Record<string, number>;
  stargazers_count?: number;
  forks_count?: number;
  html_url?: string;
  topics?: string[];
}

export interface PlatformPrompts {
  twitter: string;
  linkedin: string;
  reddit: string;
  instagram: string;
}

export function buildPlatformPrompts(
  repoData: RepoData,
  readme: string,
  selectedFiles?: string[]
): PlatformPrompts {
  const repoName = repoData.full_name.split("/")[1] || repoData.full_name;
  const languages = Object.keys(repoData.languages || {}).join(", ");
  const stars = repoData.stargazers_count || 0;
  const forks = repoData.forks_count || 0;
  const topics = (repoData.topics || []).slice(0, 5).join(", ");
  const repoUrl = repoData.html_url || `https://github.com/${repoData.full_name}`;
  
  // Truncate README for context (keep first 800 chars)
  const readmeSnippet = readme.slice(0, 800).replace(/\n{3,}/g, "\n\n");
  
  // Build file context if files are selected
  const fileContext = selectedFiles && selectedFiles.length > 0
    ? `\nSelected files/folders:\n${selectedFiles.slice(0, 10).map(f => `- ${f}`).join("\n")}${selectedFiles.length > 10 ? `\n... and ${selectedFiles.length - 10} more` : ""}`
    : "";

  const baseContext = `
You are an expert developer and marketing writer specializing in technical content for social media.

Repository: ${repoData.full_name}
Name: ${repoName}
Description: ${repoData.description || "No description available"}
Languages: ${languages || "Not specified"}
Stars: ${stars} ⭐
Forks: ${forks} 🍴
Topics: ${topics || "None"}
Repository URL: ${repoUrl}
${fileContext}

README Snippet:
${readmeSnippet}
`;

  return {
    twitter: `${baseContext}

Create a catchy tweet (max 280 characters) about this project. Include:
- 1-2 emojis
- 1-2 relevant hashtags
- Engaging, developer-friendly tone
- Highlight key features or value proposition
- Optional: Include a call-to-action

Format: Plain text only, no markdown.`,

    linkedin: `${baseContext}

Create a professional LinkedIn post (max 700 characters) about this project. Include:
- Value statement: What problem does this solve?
- Tech stack highlights
- Key features or achievements
- Professional tone suitable for B2B audience
- Call-to-action (e.g., "Check it out", "Star the repo", "Contribute")

Format: Plain text only, no markdown.`,

    reddit: `${baseContext}

Create a Reddit post suitable for r/programming or r/webdev. Include:
- Compelling title (max 100 characters)
- Brief project overview
- What makes it interesting or useful
- Tech stack mention
- Honest, developer-to-developer tone
- Optional: Ask for feedback or contributions

Format: 
Title: [Your title here]
Body: [Your post content here]`,

    instagram: `${baseContext}

Create a short Instagram caption (max 150 characters) highlighting:
- Visual appeal and excitement
- Key feature or benefit
- 2-3 relevant hashtags
- Emoji usage (2-3 emojis)
- Engaging, energetic tone

Format: Plain text only, no markdown.`,
  };
}

/**
 * Build a single prompt for a specific platform
 */
export function buildSinglePlatformPrompt(
  platform: "twitter" | "linkedin" | "reddit" | "instagram",
  repoData: RepoData,
  readme: string,
  selectedFiles?: string[]
): string {
  const prompts = buildPlatformPrompts(repoData, readme, selectedFiles);
  return prompts[platform];
}

