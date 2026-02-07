import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitHubFileTree } from '@/components/GitHubFileTree';
import { Loader2, Github, CheckCircle } from 'lucide-react';
import GitHubService from '@/services/githubService';

interface GitHubProjectSelectorProps {
  onProjectSelect?: (owner: string, repo: string, selectedFiles: Set<string>) => void;
  githubToken?: string;
}

export function GitHubProjectSelector({ onProjectSelect, githubToken }: GitHubProjectSelectorProps) {
  const [githubUrl, setGithubUrl] = useState('');
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const githubService = new GitHubService(githubToken);

  const extractRepoInfo = (url: string): { owner: string; repo: string } | null => {
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
  };

  const handleUrlSubmit = async () => {
    if (!githubUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const repoInfo = extractRepoInfo(githubUrl);
      if (!repoInfo) {
        throw new Error('Invalid GitHub URL format');
      }

      // Validate repository access
      const hasAccess = await githubService.checkRepositoryAccess(githubUrl);
      if (!hasAccess) {
        throw new Error('Repository not found or not accessible');
      }

      setOwner(repoInfo.owner);
      setRepo(repoInfo.repo);
      setSelectedFiles(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repository');
      setOwner('');
      setRepo('');
    } finally {
      setIsValidating(false);
    }
  };

  const handleFileSelect = (selectedPaths: Set<string>) => {
    setSelectedFiles(selectedPaths);
    if (onProjectSelect && owner && repo) {
      onProjectSelect(owner, repo, selectedPaths);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Select GitHub Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="github-url">GitHub Repository URL</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="github-url"
                placeholder="https://github.com/owner/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUrlSubmit();
                  }
                }}
              />
              <Button 
                onClick={handleUrlSubmit} 
                disabled={isValidating || !githubUrl.trim()}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load'
                )}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>

          {owner && repo && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  {owner}/{repo}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {owner && repo && (
        <Card>
          <CardHeader>
            <CardTitle>Repository File Tree</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Select files or folders to include in your post generation
            </p>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <GitHubFileTree
                owner={owner}
                repo={repo}
                token={githubToken}
                onFileSelect={handleFileSelect}
              />
            </div>
            {selectedFiles.size > 0 && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium mb-1">
                  {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {Array.from(selectedFiles).slice(0, 5).map((path) => (
                    <div key={path} className="truncate">{path}</div>
                  ))}
                  {selectedFiles.size > 5 && (
                    <div>... and {selectedFiles.size - 5} more</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

