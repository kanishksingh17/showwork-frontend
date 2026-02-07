import React, { useEffect } from 'react';
import { useGitHubFileTree } from '@/hooks/useGitHubFileTree';
import FilesystemItem from '@/components/FilesystemItem';
import type { FileNode } from '@/services/githubService';

interface GitHubFileTreeProps {
  owner: string;
  repo: string;
  branch?: string;
  token?: string;
  onFileSelect?: (selectedPaths: Set<string>) => void;
  onLoadComplete?: () => void;
}

export function GitHubFileTree({ owner, repo, branch, token, onFileSelect, onLoadComplete }: GitHubFileTreeProps) {
  const { tree, loadRoot, expandPath, loadingPaths, error } = useGitHubFileTree({ owner, repo, branch, token });
  const [selectedPaths, setSelectedPaths] = React.useState<Set<string>>(new Set());
  const [hasLoaded, setHasLoaded] = React.useState(false);

  useEffect(() => {
    setHasLoaded(false);
    loadRoot()
      .then(() => {
        setHasLoaded(true);
        if (onLoadComplete) {
          onLoadComplete();
        }
      })
      .catch(() => {
        // Error is already handled in the hook
        setHasLoaded(true);
        if (onLoadComplete) {
          onLoadComplete();
        }
      });
  }, [owner, repo, branch, loadRoot, onLoadComplete]);

  const handleToggle = async (path: string, isOpen: boolean) => {
    if (!isOpen) return; // only load on open
    // if folder already loaded, skip
    const folder = findNode(tree, path);
    if (folder && folder.loaded) return;
    await expandPath(path);
  };

  const handleSelect = (path: string, isSelected: boolean) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (isSelected) {
        next.add(path);
      } else {
        next.delete(path);
      }
      if (onFileSelect) {
        onFileSelect(next);
      }
      return next;
    });
  };


  if (error) {
    const isRateLimit = error.includes('Rate limit') || error.includes('rate limit');
    return (
      <div className={`p-4 rounded-lg border ${isRateLimit
          ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}>
        <p className={`${isRateLimit ? 'text-yellow-800 dark:text-yellow-200' : 'text-red-600 dark:text-red-400'} font-medium mb-2`}>
          {isRateLimit ? '⚠️ Rate Limit Exceeded' : 'Error'}
        </p>
        <p className={`text-sm ${isRateLimit ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-600 dark:text-red-400'}`}>
          {error}
        </p>
        {isRateLimit && (
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 space-y-1">
            <p>GitHub API has rate limits for unauthenticated requests (60 requests/hour).</p>
            <p>To increase the limit to 5,000 requests/hour, set the <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">GITHUB_TOKEN</code> environment variable in your backend server.</p>
            <p className="mt-2 font-medium">Please wait a few minutes and try again.</p>
          </div>
        )}
      </div>
    );
  }

  if (tree.length === 0 && !loadingPaths[""]) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Loading repository structure...</p>
      </div>
    );
  }

  return (
    <div className="file-tree">
      <ul className="space-y-0">
        {tree.map((node) => (
          <FilesystemItem
            key={node.path}
            node={node}
            onToggle={handleToggle}
            onSelect={handleSelect}
            selectedPaths={selectedPaths}
          />
        ))}
      </ul>
    </div>
  );
}

function findNode(nodes: FileNode[], path: string): FileNode | null {
  for (const n of nodes) {
    if (n.path === path) return n;
    if (n.nodes) {
      const found = findNode(n.nodes, path);
      if (found) return found;
    }
  }
  return null;
}

export default GitHubFileTree;

