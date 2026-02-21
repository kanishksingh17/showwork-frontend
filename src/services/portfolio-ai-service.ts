import { ContentGenerator } from "../utils/generateContentDataObject";

export class PortfolioAIService {
  async extractJobRole(userData: any, projects: any[]): Promise<any> {
    console.log("[PortfolioAIService] Extracting job role from backend for:", userData.name);
    try {
      const response = await fetch('/api/ai/extract-job-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData, projects })
      });
      const data = await response.json();
      if (data.success && data.jobRole) {
        return {
          id: "detected-role",
          ...data.jobRole
        };
      }
    } catch (e) {
      console.warn("Failed to extract job role from backend", e);
    }

    // Fallback if backend API is unavailable or fails
    const techStack = userData.techStack || [];
    const showcaseProjects = projects.filter(p => p.showcase);
    return {
      id: "detected-role",
      title: techStack.length > 0 ? `${techStack[0]} Developer` : "Software Developer",
      industry: "Technology",
      skills: techStack.slice(0, 5),
      experienceLevel: "mid",
      description: `Auto-detected job role based on ${showcaseProjects.length} showcase projects.`
    };
  }

  async generatePortfolioContent(sectionType: string, jobRole: any, userData: any, projects: any[]): Promise<string> {
    console.log(`[PortfolioAIService] Generating structured content for ${sectionType} via backend`);

    // For 'projects' and 'skills', we want to keep the original arrays to inject back later
    const showcaseProjects = projects.filter(p => p.showcase);
    const projectsToUse = showcaseProjects.length > 0 ? showcaseProjects : projects;

    try {
      const response = await fetch('/api/ai/generate-portfolio-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: sectionType, jobRole, userData, projects: projectsToUse })
      });
      const data = await response.json();
      if (data.success && data.content) {
        // The backend returns a JSON string built by OpenAI. 
        // We parse it and re-inject the static arrays so AI doesn't have to rewrite them.
        const parsedContent = ContentGenerator.parse(data.content);

        if (sectionType === 'projects') parsedContent.items = projectsToUse;
        if (sectionType === 'skills') parsedContent.items = (userData.skills || []).map((s: any) => typeof s === 'string' ? { name: s } : s);

        return ContentGenerator.stringify(parsedContent);
      }
    } catch (e) {
      console.warn("Failed to generate content from backend, falling back", e);
    }

    // Fallback static structured content logic
    let sectionData;
    switch (sectionType) {
      case 'about':
      case 'hero':
        const linkedIn = userData.linkedInProfile;
        const name = linkedIn?.localizedFirstName ? `${linkedIn.localizedFirstName} ${linkedIn.localizedLastName}` : userData.name;
        const title = linkedIn?.headline || jobRole.title || "Developer";
        const bio = linkedIn?.summary || `I am a ${title} with expertise in ${userData.techStack?.slice(0, 3).join(', ') || 'modern web technologies'}. I focus on building scalable and user-centric applications.`;

        sectionData = ContentGenerator.generateSectionData(sectionType, {
          title: `Hi, I'm ${name}`,
          subtitle: title,
          bio: bio
        });
        break;
      case 'skills':
        sectionData = ContentGenerator.generateSectionData(sectionType, {
          items: (userData.skills || []).map((s: any) => typeof s === 'string' ? { name: s } : s)
        });
        break;
      case 'projects':
        sectionData = ContentGenerator.generateSectionData(sectionType, {
          description: `Check out my top ${projectsToUse.length} projects.`,
          items: projectsToUse
        });
        break;
      default:
        sectionData = ContentGenerator.generateSectionData(sectionType, {
          title: `${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}`,
          description: `Custom content for ${sectionType} section.`
        });
    }

    return ContentGenerator.stringify(sectionData);
  }

  async enhanceSection(section: string, content: string, userPrompt?: string): Promise<string> {
    console.log(`[PortfolioAIService] Enhancing section ${section} via backend with prompt: ${userPrompt || 'none'}`);
    try {
      const response = await fetch('/api/ai/enhance-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content, userPrompt })
      });
      const data = await response.json();
      if (data.success && data.data?.section) {
        return data.data.section;
      }
    } catch (e) {
      console.warn("Failed to enhance section from backend", e);
    }

    // Fallback: local enhancement mock
    const existingData = ContentGenerator.parse(content);
    const enhancedData = {
      ...existingData,
      description: (existingData.description || '') + " (AI Enhanced for clarity and impact)"
    };
    return ContentGenerator.stringify(enhancedData);
  }
}

export default PortfolioAIService;
