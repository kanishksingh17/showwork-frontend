interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  default_branch: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

interface GitHubLanguages {
  [key: string]: number;
}

interface GitHubReadme {
  content: string;
  encoding: string;
  download_url: string;
}

export interface RepositoryAnalysis {
  repo: GitHubRepo;
  languages: GitHubLanguages;
  readme: string;
  techStack: string[];
  description: string;
  stats: {
    stars: number;
    forks: number;
    issues: number;
    lastUpdated: string;
  };
  analysis: {
    primaryLanguage: string;
    framework: string | null;
    database: string | null;
    buildTool: string | null;
    testingFramework: string | null;
  };
}

// File tree types
export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "folder";
  sha?: string;
  size?: number;
  nodes?: FileNode[];
  loaded?: boolean;
}

class GitHubService {
  private baseURL = "https://api.github.com";
  private token: string | null = null;
  private maxConcurrentRequests = 3;
  private activeRequests = 0;
  private requestDelay = 200; // Delay between requests in ms

  constructor(token?: string) {
    this.token = token || null;
  }

  // Request throttling helper
  private async throttleRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    // Wait if we have too many active requests
    while (this.activeRequests >= this.maxConcurrentRequests) {
      await new Promise(resolve => setTimeout(resolve, this.requestDelay));
    }

    this.activeRequests++;
    try {
      const result = await requestFn();
      // Add delay after request to prevent overwhelming
      await new Promise(resolve => setTimeout(resolve, this.requestDelay));
      return result;
    } finally {
      this.activeRequests--;
    }
  }

  private async fetchWithAuth(url: string): Promise<Response> {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "ShowWork-App",
    };

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`;
    }

    console.log('Fetching from GitHub API:', url);

    try {
      const response = await fetch(url, {
        headers,
        mode: 'cors', // Explicitly set CORS mode
        cache: 'no-cache',
      });

      console.log('GitHub API response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('GitHub API error response:', errorText);

        if (response.status === 404) {
          throw new Error("Repository or file not found");
        } else if (response.status === 403) {
          throw new Error("Rate limit exceeded or access denied. Please try again later.");
        } else if (response.status === 0) {
          throw new Error("CORS error: Cannot access GitHub API from browser. Please use a backend proxy.");
        } else {
          throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
        }
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("Network error: Cannot connect to GitHub API. This might be a CORS issue.");
      }
      throw error;
    }
  }

  private extractRepoInfo(url: string): { owner: string; repo: string } | null {
    // Handle various GitHub URL formats
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/]+)(?:\/.*)?$/,
      /github\.com\/([^\/]+)\/([^\/]+)\.git$/,
      /^([^\/]+)\/([^\/]+)$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace(".git", ""),
        };
      }
    }

    return null;
  }

  async analyzeRepository(url: string): Promise<RepositoryAnalysis> {
    try {
      const repoInfo = this.extractRepoInfo(url);
      if (!repoInfo) {
        throw new Error("Invalid GitHub repository URL");
      }

      // Fetch repository data
      const repoResponse = await this.fetchWithAuth(
        `${this.baseURL}/repos/${repoInfo.owner}/${repoInfo.repo}`,
      );
      const repo: GitHubRepo = await repoResponse.json();

      // Fetch languages
      const languagesResponse = await this.fetchWithAuth(repo.languages_url);
      const languages: GitHubLanguages = await languagesResponse.json();

      // Fetch README
      let readme = "";
      try {
        const readmeResponse = await this.fetchWithAuth(
          `${this.baseURL}/repos/${repoInfo.owner}/${repoInfo.repo}/readme`,
        );
        const readmeData: GitHubReadme = await readmeResponse.json();
        readme = atob(readmeData.content);
      } catch (error) {
        console.log("No README found for this repository");
      }

      // Analyze the repository
      const analysis = this.analyzeRepositoryData(repo, languages, readme);

      return {
        repo,
        languages,
        readme,
        techStack: analysis.techStack,
        description: analysis.description,
        stats: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count,
          lastUpdated: repo.updated_at,
        },
        analysis: analysis.analysis,
      };
    } catch (error) {
      throw new Error(
        `Failed to analyze repository: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  private analyzeRepositoryData(
    repo: GitHubRepo,
    languages: GitHubLanguages,
    readme: string,
  ): {
    techStack: string[];
    description: string;
    analysis: {
      primaryLanguage: string;
      framework: string | null;
      database: string | null;
      buildTool: string | null;
      testingFramework: string | null;
    };
  } {
    // Get primary language
    const primaryLanguage = Object.keys(languages).reduce((a, b) =>
      languages[a] > languages[b] ? a : b,
    );

    // Detect technologies from languages and README
    const techStack: string[] = [];
    const allText = `${repo.description || ""} ${readme}`.toLowerCase();

    // Framework detection
    const frameworks = {
      React: ["react", "jsx", "tsx"],
      "Vue.js": ["vue", "nuxt"],
      Angular: ["angular", "ng-"],
      "Next.js": ["next.js", "nextjs"],
      Svelte: ["svelte"],
      Express: ["express"],
      FastAPI: ["fastapi"],
      Django: ["django"],
      Flask: ["flask"],
      Spring: ["spring boot", "springboot"],
      Laravel: ["laravel"],
      Rails: ["rails", "ruby on rails"],
    };

    // Database detection
    const databases = {
      PostgreSQL: ["postgresql", "postgres", "pg"],
      MySQL: ["mysql"],
      MongoDB: ["mongodb", "mongo"],
      Redis: ["redis"],
      SQLite: ["sqlite"],
      Firebase: ["firebase"],
      Supabase: ["supabase"],
    };

    // Build tools detection
    const buildTools = {
      Webpack: ["webpack"],
      Vite: ["vite"],
      Parcel: ["parcel"],
      Rollup: ["rollup"],
      ESBuild: ["esbuild"],
      Turbo: ["turbo"],
    };

    // Testing frameworks
    const testingFrameworks = {
      Jest: ["jest"],
      Vitest: ["vitest"],
      Cypress: ["cypress"],
      Playwright: ["playwright"],
      "Testing Library": ["@testing-library"],
      Mocha: ["mocha"],
      Chai: ["chai"],
    };

    // Add languages to tech stack
    Object.keys(languages).forEach((lang) => {
      if (lang !== "Other" && !techStack.includes(lang)) {
        techStack.push(lang);
      }
    });

    // Detect frameworks
    Object.entries(frameworks).forEach(([framework, keywords]) => {
      if (keywords.some((keyword) => allText.includes(keyword))) {
        techStack.push(framework);
      }
    });

    // Detect databases
    Object.entries(databases).forEach(([database, keywords]) => {
      if (keywords.some((keyword) => allText.includes(keyword))) {
        techStack.push(database);
      }
    });

    // Detect build tools
    Object.entries(buildTools).forEach(([tool, keywords]) => {
      if (keywords.some((keyword) => allText.includes(keyword))) {
        techStack.push(tool);
      }
    });

    // Detect testing frameworks
    Object.entries(testingFrameworks).forEach(([framework, keywords]) => {
      if (keywords.some((keyword) => allText.includes(keyword))) {
        techStack.push(framework);
      }
    });

    // Extract description from README if repo description is empty
    let description = repo.description || "";
    if (!description && readme) {
      const lines = readme.split("\n");
      for (const line of lines) {
        if (
          line.trim() &&
          !line.startsWith("#") &&
          !line.startsWith("!") &&
          line.length > 10
        ) {
          description = line.trim();
          break;
        }
      }
    }

    // Detect specific technologies
    const detectedFramework =
      Object.entries(frameworks).find(([_, keywords]) =>
        keywords.some((keyword) => allText.includes(keyword)),
      )?.[0] || null;

    const detectedDatabase =
      Object.entries(databases).find(([_, keywords]) =>
        keywords.some((keyword) => allText.includes(keyword)),
      )?.[0] || null;

    const detectedBuildTool =
      Object.entries(buildTools).find(([_, keywords]) =>
        keywords.some((keyword) => allText.includes(keyword)),
      )?.[0] || null;

    const detectedTestingFramework =
      Object.entries(testingFrameworks).find(([_, keywords]) =>
        keywords.some((keyword) => allText.includes(keyword)),
      )?.[0] || null;

    return {
      techStack: [...new Set(techStack)], // Remove duplicates
      description,
      analysis: {
        primaryLanguage,
        framework: detectedFramework,
        database: detectedDatabase,
        buildTool: detectedBuildTool,
        testingFramework: detectedTestingFramework,
      },
    };
  }

  // Get repository statistics
  async getRepositoryStats(owner: string, repo: string) {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseURL}/repos/${owner}/${repo}/stats/contributors`,
      );
      return await response.json();
    } catch (error) {
      console.log("Could not fetch contributor stats");
      return null;
    }
  }

  // Check if repository is accessible
  async checkRepositoryAccess(url: string): Promise<boolean> {
    try {
      const repoInfo = this.extractRepoInfo(url);
      if (!repoInfo) return false;

      await this.fetchWithAuth(
        `${this.baseURL}/repos/${repoInfo.owner}/${repoInfo.repo}`,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fetch repository file tree recursively
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param branch - Branch name (default: main/master)
   * @param recursive - Whether to fetch recursively (default: false for lazy loading)
   */
  async getRepositoryTree(
    owner: string,
    repo: string,
    branch?: string,
    recursive: boolean = false
  ): Promise<GitHubTreeResponse> {
    try {
      // First, get the default branch if not provided
      if (!branch) {
        const repoResponse = await this.fetchWithAuth(
          `${this.baseURL}/repos/${owner}/${repo}`
        );
        const repoInfo: GitHubRepo = await repoResponse.json();
        branch = repoInfo.default_branch;
      }

      // Get the tree SHA for the branch
      const refResponse = await this.fetchWithAuth(
        `${this.baseURL}/repos/${owner}/${repo}/git/ref/heads/${branch}`
      );
      const refData = await refResponse.json();
      const treeSha = refData.object.sha;

      // Fetch the tree
      const treeUrl = `${this.baseURL}/repos/${owner}/${repo}/git/trees/${treeSha}${recursive ? '?recursive=1' : ''}`;
      const treeResponse = await this.fetchWithAuth(treeUrl);
      return await treeResponse.json();
    } catch (error) {
      throw new Error(
        `Failed to fetch repository tree: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Fetch contents of a specific path (for lazy loading)
   * Uses backend proxy to avoid CORS and rate limit issues
   */
  async getRepositoryContents(
    owner: string,
    repo: string,
    path: string = "",
    branch?: string
  ): Promise<any[]> {
    try {
      // Use Vite proxy (relative URL) or absolute URL if VITE_API_BASE_URL is set
      // Vite proxy forwards /api/* to http://localhost:5000
      const apiBaseUrl = typeof window !== 'undefined'
        ? (import.meta.env?.VITE_API_BASE_URL || '')
        : '';

      // Use relative URL if no VITE_API_BASE_URL is set (will use Vite proxy)
      // Otherwise use absolute URL
      const proxyUrl = apiBaseUrl
        ? `${apiBaseUrl}/api/github/repository-contents?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}${branch ? `&branch=${encodeURIComponent(branch)}` : ''}`
        : `/api/github/repository-contents?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}${branch ? `&branch=${encodeURIComponent(branch)}` : ''}`;

      console.log('Fetching repository contents via backend proxy:', proxyUrl);
      console.log('API Base URL:', apiBaseUrl || 'Using Vite proxy (relative URL)');

      // Use throttled request to prevent resource exhaustion
      const response = await this.throttleRequest(async () => {
        // Create abort controller for timeout (fallback for browsers that don't support AbortSignal.timeout)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
          const fetchResponse = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          console.log('Response status:', fetchResponse.status, fetchResponse.statusText);

          if (!fetchResponse.ok) {
            let errorData;
            try {
              errorData = await fetchResponse.json();
            } catch (e) {
              const errorText = await fetchResponse.text();
              errorData = { error: errorText || 'Unknown error' };
            }
            console.error('Error response:', errorData);
            throw new Error(errorData.message || errorData.error || `HTTP ${fetchResponse.status}`);
          }

          const contents = await fetchResponse.json();
          console.log('Successfully fetched contents:', contents.length, 'items');
          return Array.isArray(contents) ? contents : [contents];
        } catch (fetchError: any) {
          clearTimeout(timeoutId);
          console.error('Fetch error details:', fetchError);

          // Handle specific error types
          if (fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError' || fetchError.message?.includes('aborted')) {
            throw new Error('Request timeout: The request took too long. Please try again.');
          }

          // Check for resource exhaustion errors
          if (fetchError instanceof TypeError &&
            (fetchError.message.includes('Failed to fetch') ||
              fetchError.message.includes('ERR_INSUFFICIENT_RESOURCES') ||
              fetchError.message.includes('network'))) {
            const backendUrl = apiBaseUrl || 'http://localhost:5000 (via Vite proxy)';
            throw new Error(`Network error: Too many requests or insufficient resources. Please wait a moment and try again. Backend: ${backendUrl}`);
          }

          // Check if it's a network error
          if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
            const backendUrl = apiBaseUrl || 'http://localhost:5000 (via Vite proxy)';
            throw new Error(`Network error: Cannot connect to backend API at ${backendUrl}. Please make sure the backend server is running on port 5000.`);
          }

          throw fetchError;
        }
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error('getRepositoryContents error:', errorMessage);
      throw new Error(
        `Failed to fetch repository contents: ${errorMessage}`
      );
    }
  }

  /**
   * Fetch file content from GitHub repository
   * @param owner - Repository owner
   * @param repo - Repository name
   * @param path - File path
   * @param branch - Branch name (optional)
   * @returns Decoded file content and metadata
   */
  async getFileContent(
    owner: string,
    repo: string,
    path: string,
    branch?: string
  ): Promise<{ content: string; encoding: string; size: number; name: string; path: string }> {
    try {
      if (!branch) {
        const repoResponse = await this.fetchWithAuth(
          `${this.baseURL}/repos/${owner}/${repo}`
        );
        const repoInfo: GitHubRepo = await repoResponse.json();
        branch = repoInfo.default_branch;
      }

      const fileUrl = `${this.baseURL}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`;
      console.log('Fetching file from GitHub API:', fileUrl);
      const fileResponse = await this.fetchWithAuth(fileUrl);
      const fileData = await fileResponse.json();

      console.log('GitHub API response:', { type: fileData.type, encoding: fileData.encoding, size: fileData.size });

      // Handle array response (shouldn't happen for files, but just in case)
      if (Array.isArray(fileData)) {
        throw new Error('Path is a directory, not a file');
      }

      if (fileData.type !== 'file' && fileData.type !== 'blob') {
        throw new Error(`Path is not a file (type: ${fileData.type})`);
      }

      // Decode base64 content
      let content: string;
      if (fileData.encoding === 'base64') {
        try {
          // Remove whitespace and decode
          const base64Content = fileData.content.replace(/\s/g, '');
          content = atob(base64Content);
        } catch (decodeError) {
          console.error('Failed to decode base64 content:', decodeError);
          throw new Error('Failed to decode file content');
        }
      } else {
        content = fileData.content || '';
      }

      return {
        content,
        encoding: fileData.encoding,
        size: fileData.size,
        name: fileData.name,
        path: fileData.path,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch file content: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Convert a GitHub tree array into recursive FileNode[]
   * Works best when you have a recursive tree (tree endpoint with recursive=1)
   */
  buildFileTree(items: GitHubTreeItem[]): FileNode[] {
    const root: FileNode[] = [];
    const map = new Map<string, FileNode>();

    // Ensure directories are processed before files
    const sorted = [...items].sort((a, b) => {
      if (a.type === "tree" && b.type === "blob") return -1;
      if (a.type === "blob" && b.type === "tree") return 1;
      return a.path.localeCompare(b.path);
    });

    for (const it of sorted) {
      const parts = it.path.split("/");
      const name = parts[parts.length - 1];
      const isFile = it.type === "blob";

      const node: FileNode = {
        name,
        path: it.path,
        type: isFile ? "file" : "folder",
        sha: it.sha,
        size: it.size,
        nodes: isFile ? undefined : [],
        loaded: false,
      };

      map.set(it.path, node);

      if (parts.length === 1) {
        root.push(node);
      } else {
        const parentPath = parts.slice(0, -1).join("/");
        const parent = map.get(parentPath);
        if (parent) {
          parent.nodes = parent.nodes || [];
          parent.nodes.push(node);
        } else {
          // in case parent not yet created (shouldn't happen because of sorting)
          root.push(node);
        }
      }
    }

    return root;
  }
}

export default GitHubService;
export type { GitHubRepo, GitHubLanguages };
