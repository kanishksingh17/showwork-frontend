export interface RepositoryAnalysis {
    name: string;
    description: string;
    languages: Record<string, number>;
    topics: string[];
    stars: number;
    forks: number;
    lastUpdate: string;
}

export class GitHubService {
    async analyzeRepository(url: string): Promise<RepositoryAnalysis | any> {
        console.log(`[GitHubService] Analyzing repository via backend AI: ${url}`);
        try {
            const response = await fetch('/api/ai/generate-from-repo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ githubUrl: url })
            });
            const data = await response.json();
            if (data.success && data.data) {
                // The AI returns an AIAnalysisResponse with name, summary, description, techStack, features, category.
                return data.data;
            }
        } catch (e) {
            console.error("Failed to analyze repository via backend", e);
        }

        // Minimal fallback mock implementation
        return {
            name: url.split('/').pop() || 'unknown',
            description: 'Mocked description for ' + url,
            languages: { 'TypeScript': 70, 'JavaScript': 20, 'CSS': 10 },
            topics: ['web', 'react'],
            stars: 10,
            forks: 2,
            lastUpdate: new Date().toISOString()
        };
    }

    async getRepositoryContents(url: string) {
        console.log(`[GitHubService] Getting contents for: ${url}`);
        return [];
    }
}

export default GitHubService;
