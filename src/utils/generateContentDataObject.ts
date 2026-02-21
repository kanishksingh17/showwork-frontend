/**
 * Factory for creating structured data objects for portfolio sections.
 * This ensures that generated content follows a strict schema and prevents layout breaks.
 */

export interface SectionContentData {
    title?: string;
    subtitle?: string;
    description?: string;
    bio?: string;
    items?: any[];
    ctaText?: string;
    ctaUrl?: string;
    metadata?: Record<string, any>;
}

export class ContentGenerator {
    static generateSectionData(type: string, data: Partial<SectionContentData>): SectionContentData {
        switch (type) {
            case 'header':
                return {
                    title: data.title || 'Portfolio',
                    items: data.items || [], // e.g., nav links
                    ctaText: data.ctaText || 'Get in Touch',
                };
            case 'hero':
            case 'about':
                return {
                    title: data.title || 'Hi, I am a Developer',
                    subtitle: data.subtitle || 'Building the future of the web',
                    bio: data.bio || data.description || 'Passionate about creating clean and efficient code.',
                    ctaText: data.ctaText || 'View My Projects',
                };
            case 'skills':
                return {
                    title: data.title || 'Technical Skills',
                    description: data.description || 'A collection of tools and technologies I specialize in.',
                    items: data.items || [],
                };
            case 'projects':
                return {
                    title: data.title || 'Recent Works',
                    description: data.description || 'Showcasing my latest projects and technical achievements.',
                    items: data.items || [],
                };
            case 'contact':
                return {
                    title: data.title || 'Contact Me',
                    description: data.description || 'Feel free to reach out for collaborations or just to say hi!',
                    ctaText: data.ctaText || 'Send Message',
                };
            default:
                return data;
        }
    }

    static stringify(data: SectionContentData): string {
        return JSON.stringify(data);
    }

    static parse(content: string): SectionContentData {
        try {
            // Clean up potential markdown formatting from AI
            const cleanContent = content.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
            return JSON.parse(cleanContent);
        } catch (e) {
            // If it's not JSON, return it as the description for legacy compatibility
            return { description: content };
        }
    }
}

export default ContentGenerator;
