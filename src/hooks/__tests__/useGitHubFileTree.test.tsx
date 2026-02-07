import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "@jest/globals";
import { useGitHubFileTree } from "@/hooks/useGitHubFileTree";
import GitHubService from "@/services/githubService";

// Mock GitHubService
vi.mock("@/services/githubService", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      getRepositoryContents: vi.fn(),
    })),
  };
});

describe("useGitHubFileTree", () => {
  let mockGetRepositoryContents: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetRepositoryContents = vi.fn();
    (GitHubService as any).mockImplementation(() => ({
      getRepositoryContents: mockGetRepositoryContents,
    }));
  });

  it("loads root directory", async () => {
    mockGetRepositoryContents.mockResolvedValueOnce([
      { 
        name: "src", 
        path: "src", 
        type: "tree",
        sha: "src123",
        size: undefined,
      },
      { 
        name: "README.md", 
        path: "README.md", 
        type: "blob",
        sha: "readme123",
        size: 512,
      },
    ]);

    const { result } = renderHook(() =>
      useGitHubFileTree({ owner: "test", repo: "demo" })
    );

    await act(async () => {
      await result.current.loadRoot();
    });

    expect(result.current.tree.length).toBe(2);
    expect(result.current.tree[0].name).toBe("src");
    expect(result.current.tree[0].type).toBe("folder");
    expect(result.current.tree[1].name).toBe("README.md");
    expect(result.current.tree[1].type).toBe("file");
    expect(mockGetRepositoryContents).toHaveBeenCalledWith("test", "demo", "", undefined);
  });

  it("expands a folder path", async () => {
    // Initial root load
    mockGetRepositoryContents.mockResolvedValueOnce([
      { 
        name: "src", 
        path: "src", 
        type: "tree",
        sha: "src123",
      },
    ]);

    const { result } = renderHook(() =>
      useGitHubFileTree({ owner: "test", repo: "demo" })
    );

    await act(async () => {
      await result.current.loadRoot();
    });

    // Expand src folder
    mockGetRepositoryContents.mockResolvedValueOnce([
      { 
        name: "components", 
        path: "src/components", 
        type: "tree",
        sha: "comp123",
      },
      { 
        name: "utils.ts", 
        path: "src/utils.ts", 
        type: "blob",
        sha: "utils123",
        size: 1024,
      },
    ]);

    await act(async () => {
      await result.current.expandPath("src");
    });

    expect(result.current.tree[0].nodes).toBeDefined();
    expect(result.current.tree[0].nodes?.length).toBe(2);
    expect(result.current.tree[0].loaded).toBe(true);
    expect(mockGetRepositoryContents).toHaveBeenCalledWith("test", "demo", "src", undefined);
  });

  it("handles errors gracefully", async () => {
    mockGetRepositoryContents.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() =>
      useGitHubFileTree({ owner: "test", repo: "demo" })
    );

    await act(async () => {
      await result.current.loadRoot();
    });

    expect(result.current.error).toBe("API Error");
    expect(result.current.tree.length).toBe(0);
  });

  it("prevents duplicate loading", async () => {
    mockGetRepositoryContents.mockResolvedValue([
      { name: "src", path: "src", type: "tree", sha: "src123" },
    ]);

    const { result } = renderHook(() =>
      useGitHubFileTree({ owner: "test", repo: "demo" })
    );

    await act(async () => {
      await result.current.loadRoot();
    });

    // Try to expand same path multiple times
    await act(async () => {
      await Promise.all([
        result.current.expandPath("src"),
        result.current.expandPath("src"),
        result.current.expandPath("src"),
      ]);
    });

    // Should only be called once for the expand
    expect(mockGetRepositoryContents).toHaveBeenCalledTimes(2); // 1 for loadRoot, 1 for expandPath
  });
});

