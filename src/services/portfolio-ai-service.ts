import type {
  JobRole,
  PortfolioTemplate,
  UserPortfolio,
  Project,
  AIRecommendation,
  PortfolioCustomization,
} from "../types/portfolio";

/**
 * PortfolioAIService - Client-Side Wrapper
 * 
 * This service now calls secure server-side API routes instead of directly
 * accessing OpenAI from the client. The API key is kept secure on the server.
 * 
 * All OpenAI calls are made through:
 * - /api/ai/chat - General chat completions
 * - /api/ai/extract-job-role - Job role extraction
 * - /api/ai/generate-portfolio-content - Portfolio content generation
 */
export class PortfolioAIService {
  constructor(apiKey?: string) {
    // No longer needed - API key is handled server-side
    // Keeping for backward compatibility but not using it
    if (apiKey) {
      console.warn('⚠️ PortfolioAIService no longer uses client-side API keys. All calls go through secure server-side routes.');
    }
  }

  /**
   * Extract job role from user data and projects
   * Calls secure server-side API route
   */
  async extractJobRole(userData: any, projects: Project[]): Promise<JobRole> {
    try {
      const response = await fetch('/api/ai/extract-job-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userData,
          projects,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Failed to extract job role: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.jobRole) {
        throw new Error('Invalid response from server');
      }

      return {
        id: data.jobRole.id || 'detected-role',
        title: data.jobRole.title || 'Software Developer',
        industry: data.jobRole.industry || 'Technology',
        skills: data.jobRole.skills || [],
        experienceLevel: data.jobRole.experienceLevel || 'mid',
        description: data.jobRole.description || '',
      };
    } catch (error) {
      console.error("Error extracting job role:", error);
      return this.getDefaultJobRole();
    }
  }

  /**
   * Get AI recommendations for portfolio templates
   */
  async getPortfolioRecommendations(
    jobRole: JobRole,
    userData: any,
    projects: Project[],
  ): Promise<AIRecommendation[]> {
    const prompt = `
    Based on the job role and user profile, recommend the best portfolio templates:
    
    Job Role: ${JSON.stringify(jobRole)}
    User Data: ${JSON.stringify(userData)}
    Projects: ${JSON.stringify(projects)}
    
    Recommend 3-5 portfolio templates with:
    1. Template ID
    2. Confidence score (0-1)
    3. Reasons for recommendation
    4. Suggested customizations
    
    Return as JSON array with this structure:
    [
      {
        "templateId": "string",
        "confidence": 0.95,
        "reasons": ["reason1", "reason2"],
        "suggestedCustomizations": {
          "colors": {...},
          "fonts": {...}
        }
      }
    ]
    `;

    try {
      const response = await this.callOpenAI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      return [];
    }
  }

  /**
   * Generate AI-customized content for portfolio sections
   * @param userPrompt Optional user-provided prompt/description about their product/project
   */
  async generatePortfolioContent(
    section: string,
    jobRole: JobRole,
    userData: any,
    projects: Project[],
    userPrompt?: string,
  ): Promise<string> {
    // Include complete project data: images, team members, features (tags), tech stack
    const projectsWithCompleteData = projects.map((p: any) => ({
      name: p.name || p.title,
      description: p.description,
      longDescription: p.longDescription,
      technologies: p.technologies || [],
      imageUrl: p.imageUrl,
      images: p.images || [],
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      features: p.tags || [], // Features are stored in tags
      category: p.category,
      teamMembers: (p.teamMembers || []).map((tm: any) => ({
        name: tm.name,
        role: tm.role,
        avatar: tm.avatar,
      })),
    }));

    // Extract REAL user information from stored profile
    const userName = userData?.name || "Developer";
    const userBio = userData?.bio || userData?.tagline || "";
    const userGitHub = userData?.socials?.github || "";
    const userSkills = userData?.skills || [];
    const userTechStack = (userData as any)?.techStack || []; // Tech stacks from profile setup
    const quizResults = (userData as any)?.quizResults || [];

    // Build tech stack from:
    // 1. Tech stacks selected during profile setup
    // 2. Skills with proficiency percentages
    // 3. Quiz results
    const techStack: Array<{ name: string; proficiency: number; category: string }> = [];

    // Add tech stacks from profile setup
    userTechStack.forEach((tech: string) => {
      if (!techStack.find((t) => t.name === tech)) {
        techStack.push({
          name: tech,
          proficiency: 85, // Default proficiency for selected tech stacks
          category: "programming",
        });
      }
    });

    // Add skills from profile (with percentages)
    userSkills.forEach((s: any) => {
      const existing = techStack.find((t) => t.name === (s.name || s));
      if (existing) {
        existing.proficiency = s.percentage || s.proficiency || existing.proficiency;
      } else {
        techStack.push({
          name: s.name || s,
          proficiency: s.percentage || s.proficiency || 0,
          category: s.category || "programming",
        });
      }
    });

    // Add quiz results to tech stack
    quizResults.forEach((qr: any) => {
      const existing = techStack.find((t) => t.name === qr.technology);
      if (existing) {
        existing.proficiency = qr.score || existing.proficiency;
      } else {
        techStack.push({
          name: qr.technology,
          proficiency: qr.score || 0,
          category: "programming",
        });
      }
    });

    const basePrompt = `
    Generate compelling, REAL content for the "${section}" section of a portfolio.
    
    CRITICAL: Use ONLY the real user data provided below. Do NOT generate generic placeholder text like "Passionate developer" or filler content.
    
    Real User Information (from stored profile):
    - Name: ${userName} (THIS IS THE REAL NAME FROM PROFILE SETUP - NOT A PLACEHOLDER)
    - Bio/Tagline: ${userBio || "Not provided"}
    - GitHub Profile: ${userGitHub || "Not provided"}
    - Tech Stacks Selected: ${userTechStack.length > 0 ? userTechStack.join(", ") : "None selected"}
    - Skills with Proficiency Scores:
      ${techStack.length > 0 ? techStack.map((s: any) => `  • ${s.name}: ${s.proficiency}% (${s.category})`).join("\n      ") : "  No skills data available"}
    - Job Role: Based on tech stacks: ${userTechStack.join(", ")}
    
    Job Role Context:
    - Title: ${jobRole?.title || "Professional"}
    - Industry: ${jobRole?.industry || "Technology"}
    - Required Skills: ${jobRole?.skills?.join(", ") || "General"}
    - Experience Level: ${jobRole?.experienceLevel || "mid"}
    
    Complete Project Data from Showcase:
    ${JSON.stringify(projectsWithCompleteData, null, 2)}
    
    Each project includes:
    - Name and full description
    - Tech stack (technologies array)
    - Features (tags array)
    - GitHub and live demo URLs
    - Images/media URLs
    - Team members with roles
    - Project category
    
    ${projectsWithCompleteData.some(p => p.images?.length > 0 || p.imageUrl)
        ? `IMPORTANT: Projects have images available. Reference these naturally in the projects section. 
      For the projects section, highlight key features, technologies used, and team contributions.`
        : ""}
    `;

    const userPromptSection = userPrompt
      ? `\n\nUser's Portfolio Description: ${userPrompt}\n\nUse this description as the primary context. Integrate it naturally with the showcase project data.`
      : "";

    const prompt = basePrompt + userPromptSection + `
    
    Content Generation Rules:
    1. ALWAYS use the real user's name (${userName}) - never use placeholders
    2. ALWAYS reference real skills from their tech stack with actual proficiency scores
    3. ALWAYS include their GitHub profile link (${userGitHub}) if provided
    4. Use their actual bio/tagline (${userBio}) if provided, don't create generic content
    5. Reference real quiz results and skill assessments when available
    6. Highlight specific projects from their showcase with real details
    7. Showcase technologies they actually know (from skills/quiz results)
    8. Use industry-appropriate language based on their actual experience
    9. Avoid generic phrases like "passionate developer", "creative problem solver" unless they're in their bio
    10. Be specific: mention actual technologies, projects, and achievements
    
    For each section:
    - "hero": Use ${userName}'s real name, real tagline/bio, and link to their GitHub if available
    - "about": Expand on their actual bio, mention real skills from their tech stack, reference quiz scores if high
    - "projects": List their real projects from showcase, mention actual technologies and features
    - "skills": List their actual skills from tech stack with proficiency scores
    - "contact": Include their real GitHub link and any other social links provided
    
    Make it authentic, specific, and based entirely on their real data. No generic filler content.
    `;

    try {
      // Call secure server-side API route instead of direct OpenAI
      const response = await fetch('/api/ai/generate-portfolio-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          section,
          jobRole,
          userData: {
            name: userName,
            bio: userBio,
            tagline: userBio,
            techStack: userTechStack,
            skills: userSkills,
            socials: {
              github: userGitHub,
            },
            quizResults,
          },
          projects: projectsWithCompleteData,
          userPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `Failed to generate content: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.content) {
        throw new Error('Invalid response from server');
      }

      const content = data.content;

      // Validate that we got real content, not default content
      if (!content || content.trim().length === 0) {
        console.warn("⚠️ OpenAI returned empty content");
        throw new Error("OpenAI returned empty content");
      }

      // Check if content looks like default/placeholder
      const defaultPatterns = [
        /passionate developer/i,
        /experienced professional/i,
        /here are some of my/i,
        /technical skills and expertise/i,
      ];

      const isDefaultContent = defaultPatterns.some(pattern => pattern.test(content));
      if (isDefaultContent && (userName !== "Developer" || userTechStack.length > 0 || projectsWithCompleteData.length > 0)) {
        console.warn("⚠️ Generated content looks generic despite having real data");
        // Don't retry here - let the fallback handle it
      }

      return content;
    } catch (error) {
      console.error("❌ Error generating content:", error);

      // Only return default content if we truly have no user data
      if (!userName || userName === "Developer") {
        console.warn("⚠️ Using default content because user data is missing");
        return this.getDefaultContent(section);
      }

      // If we have real data but API failed, try to create basic content from user data
      if (userName && userName !== "Developer") {
        console.log("📝 Creating fallback content from real user data");
        return this.createContentFromUserData(section, userName, userBio, userGitHub, userTechStack, projectsWithCompleteData, jobRole);
      }

      return this.getDefaultContent(section);
    }
  }

  /**
   * Calculate project relevance score for job role
   */
  async calculateProjectRelevance(
    project: Project,
    jobRole: JobRole,
  ): Promise<number> {
    const prompt = `
    Calculate the relevance score (0-1) for this project to the job role:
    
    Project: ${JSON.stringify(project)}
    Job Role: ${JSON.stringify(jobRole)}
    
    Consider:
    1. Technology alignment
    2. Project type relevance
    3. Complexity level
    4. Industry relevance
    
    Return only a number between 0 and 1.
    `;

    try {
      const response = await this.callOpenAI(prompt);
      return parseFloat(response.trim());
    } catch (error) {
      console.error("Error calculating relevance:", error);
      return 0.5; // Default neutral score
    }
  }

  /**
   * Generate optimized resume/CV content
   */
  async generateResumeContent(
    jobRole: JobRole,
    userData: any,
    projects: Project[],
    format: "resume" | "cv" = "resume",
  ): Promise<string> {
    const prompt = `
    Generate a professional ${format.toUpperCase()} optimized for this job role:
    
    Job Role: ${jobRole.title} in ${jobRole.industry}
    Required Skills: ${jobRole.skills.join(", ")}
    
    User Data: ${JSON.stringify(userData)}
    Projects: ${JSON.stringify(projects)}
    
    Format: ${format}
    
    Generate content that:
    1. Uses industry-standard formatting
    2. Highlights relevant experience and skills
    3. Is ATS-optimized
    4. Demonstrates quantifiable achievements
    5. Is tailored to the specific role
    
    Return the content in the requested format.
    `;

    try {
      return await this.callOpenAI(prompt);
    } catch (error) {
      console.error("Error generating resume:", error);
      return this.getDefaultResumeContent();
    }
  }

  /**
   * Call OpenAI API through secure server-side route
   * No longer uses OpenAI SDK directly - all calls go through /api/ai/chat
   */
  private async callOpenAI(prompt: string, systemMessage?: string): Promise<string> {
    console.log("🔑 Calling OpenAI API (via server) - Prompt length:", prompt.length);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          model: 'gpt-4o-mini',
          max_tokens: 2000,
          temperature: 0.7,
          systemMessage: systemMessage || 'You are an expert career advisor and portfolio consultant. Provide professional, tailored advice for job applications and portfolio optimization. NEVER use generic placeholder text. ALWAYS use the specific user data provided.',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        console.error("❌ OpenAI API error:", response.status, errorData);

        if (response.status === 401) {
          const errorMsg = errorData.error || 'Unauthorized';
          console.error("❌ API Key Error:", errorMsg);
          console.error("💡 Troubleshooting:");
          console.error("   1. Verify OPENAI_API_KEY is set in env.development");
          console.error("   2. Restart the dev server after updating the key");
          console.error("   3. Check server logs for more details");
          throw new Error(`Invalid OpenAI API Key: ${errorMsg}. Please verify OPENAI_API_KEY is set on the server.`);
        }

        throw new Error(errorData.error || `OpenAI API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.content) {
        throw new Error("OpenAI API returned empty content");
      }

      console.log("✅ OpenAI API returned content, length:", data.content.length);
      return data.content;
    } catch (error: any) {
      console.error("❌ OpenAI API call failed:", error);
      throw error; // Re-throw to be caught by caller
    }
  }

  /**
   * Test function to verify API connection
   * Calls secure server-side test route
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log("🧪 Testing OpenAI API connection...");

      const response = await fetch('/api/ai/test-connection', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        console.error("❌ API Connection Test Failed:", errorData.error);
        return false;
      }

      const data = await response.json();

      if (data.success) {
        console.log(`✅ API Connected: ${data.modelCount} models found`);
        if (data.sampleModels?.length > 0) {
          console.log("📋 Sample models:", data.sampleModels.slice(0, 5).join(", "));
        }
        if (data.hasGpt4) {
          console.log("✅ GPT-4 access confirmed");
        }
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("❌ API Connection Test Failed:", error?.message || error);
      return false;
    }
  }

  private getDefaultJobRole(): JobRole {
    return {
      id: "default",
      title: "Software Developer",
      industry: "Technology",
      skills: ["JavaScript", "React", "Node.js"],
      experienceLevel: "mid",
      description:
        "Full-stack developer with experience in modern web technologies",
    };
  }

  private getDefaultContent(section: string): string {
    const defaultContent = {
      hero: "Passionate developer with expertise in modern technologies and a track record of delivering high-quality solutions.",
      about:
        "Experienced professional with a strong background in software development and a passion for creating innovative solutions.",
      projects:
        "Here are some of my recent projects that demonstrate my skills and experience.",
      skills:
        "Technical skills and expertise in various technologies and frameworks.",
      experience:
        "Professional experience in software development and related fields.",
    };

    return (
      defaultContent[section as keyof typeof defaultContent] ||
      "Content not available."
    );
  }

  private getDefaultResumeContent(): string {
    return `
# Professional Resume

## Contact Information
[Your contact details will be auto-populated]

## Professional Summary
Experienced professional with expertise in relevant technologies and a proven track record of success.

## Skills
- Technical skills relevant to the position
- Soft skills and competencies

## Experience
- Professional experience and achievements
- Quantifiable results and impact

## Education
- Educational background and qualifications

## Projects
- Relevant projects and accomplishments
    `.trim();
  }

  /**
   * Create basic content from real user data when AI generation fails
   */
  private createContentFromUserData(
    section: string,
    userName: string,
    userBio: string,
    userGitHub: string,
    userTechStack: string[],
    projects: any[],
    jobRole: JobRole | null,
  ): string {
    switch (section.toLowerCase()) {
      case "hero":
        return `Hi, I'm ${userName}${userBio ? ` - ${userBio}` : ""}${userTechStack.length > 0 ? `\n\nSpecialized in ${userTechStack.slice(0, 3).join(", ")}` : ""}${userGitHub ? `\n\nGitHub: ${userGitHub}` : ""}`;

      case "about":
        return `${userBio || `I'm ${userName}, a developer`}${userTechStack.length > 0 ? ` specializing in ${userTechStack.join(", ")}.` : "."}${projects.length > 0 ? ` I've worked on ${projects.length} project${projects.length > 1 ? "s" : ""} including ${projects.slice(0, 2).map((p: any) => p.name).join(" and ")}.` : ""}`;

      case "projects":
        if (projects.length === 0) {
          return "Check back soon for my projects!";
        }
        return projects.map((p: any) => {
          const tech = p.technologies?.length > 0 ? p.technologies.join(", ") : "Various technologies";
          return `**${p.name || p.title}**\n${p.description || ""}\n\nTech Stack: ${tech}${p.githubUrl ? `\nGitHub: ${p.githubUrl}` : ""}${p.liveUrl ? `\nLive Demo: ${p.liveUrl}` : ""}`;
        }).join("\n\n---\n\n");

      case "skills":
        if (userTechStack.length === 0) {
          return "Skills coming soon!";
        }
        return userTechStack.map(tech => `• ${tech}`).join("\n");

      case "contact":
        return `${userName}${userGitHub ? `\nGitHub: ${userGitHub}` : ""}`;

      default:
        return this.getDefaultContent(section);
    }
  }
}
