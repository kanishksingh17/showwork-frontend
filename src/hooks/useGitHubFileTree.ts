import { useCallback, useState, useMemo } from 'react';
import GitHubService from '@/services/githubService';
import type { FileNode } from '@/services/githubService';

interface UseGitHubFileTreeOptions {
  owner: string;
  repo: string;
  branch?: string;
  token?: string;
}

export function useGitHubFileTree({ owner, repo, branch, token }: UseGitHubFileTreeOptions) {
  const svc = useMemo(() => new GitHubService(token), [token]);
  const [tree, setTree] = useState<FileNode[]>([]);
  const [loadingPaths, setLoadingPaths] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const loadRoot = useCallback(async () => {
    try {
      setError(null);
      // Load root via contents("") - safer for permissions
      const rootContents = await svc.getRepositoryContents(owner, repo, "", branch);
      const nodes: FileNode[] = rootContents.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type === 'blob' ? 'file' : 'folder',
        sha: item.sha,
        size: item.size,
        nodes: item.type === 'tree' ? [] : undefined,
        loaded: false,
      }));
      setTree(nodes);
      return Promise.resolve();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return Promise.reject(err);
    }
  }, [owner, repo, branch, svc]);

  const expandPath = useCallback(async (path: string) => {
    if (!path) return;
    if (loadingPaths[path]) return;

    setLoadingPaths((p) => ({ ...p, [path]: true }));
    try {
      const contents = await svc.getRepositoryContents(owner, repo, path, branch);
      const children: FileNode[] = contents.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type === 'blob' ? 'file' : 'folder',
        sha: item.sha,
        size: item.size,
        nodes: item.type === 'tree' ? [] : undefined,
        loaded: false,
      }));

      // Insert into tree
      function insert(nodes: FileNode[]): FileNode[] {
        return nodes.map((n) => {
          if (n.path === path) {
            return { ...n, nodes: children, loaded: true };
          }
          if (n.nodes) {
            return { ...n, nodes: insert(n.nodes) };
          }
          return n;
        });
      }

      setTree((prev) => insert(prev));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingPaths((p) => ({ ...p, [path]: false }));
    }
  }, [owner, repo, branch, svc, loadingPaths]);

  return { tree, loadRoot, expandPath, loadingPaths, error };
}

