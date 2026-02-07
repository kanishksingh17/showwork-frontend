import { describe, it, expect } from "@jest/globals";
import GitHubService from "@/services/githubService";
import type { FileNode, GitHubTreeItem } from "@/services/githubService";

describe("GitHubService.buildFileTree", () => {
  const svc = new GitHubService();

  it("builds a recursive tree correctly", () => {
    const flat: GitHubTreeItem[] = [
      {
        path: "src",
        type: "tree",
        mode: "040000",
        sha: "abc123",
        url: "https://api.github.com/repos/test/repo/git/trees/abc123",
      },
      {
        path: "src/index.ts",
        type: "blob",
        mode: "100644",
        sha: "def456",
        size: 1024,
        url: "https://api.github.com/repos/test/repo/git/blobs/def456",
      },
      {
        path: "src/utils",
        type: "tree",
        mode: "040000",
        sha: "ghi789",
        url: "https://api.github.com/repos/test/repo/git/trees/ghi789",
      },
      {
        path: "src/utils/helpers.ts",
        type: "blob",
        mode: "100644",
        sha: "jkl012",
        size: 2048,
        url: "https://api.github.com/repos/test/repo/git/blobs/jkl012",
      },
    ];

    const result = svc.buildFileTree(flat);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("src");
    expect(result[0].type).toBe("folder");
    expect(result[0].nodes).toBeDefined();
    expect(result[0].nodes?.length).toBe(2);

    const utils = result[0].nodes?.find((n) => n.name === "utils");
    expect(utils).toBeDefined();
    expect(utils?.type).toBe("folder");
    expect(utils?.nodes).toBeDefined();
    expect(utils?.nodes?.length).toBe(1);
    expect(utils?.nodes?.[0].name).toBe("helpers.ts");
    expect(utils?.nodes?.[0].type).toBe("file");
  });

  it("handles root-level files correctly", () => {
    const flat: GitHubTreeItem[] = [
      {
        path: "README.md",
        type: "blob",
        mode: "100644",
        sha: "readme123",
        size: 512,
        url: "https://api.github.com/repos/test/repo/git/blobs/readme123",
      },
      {
        path: "package.json",
        type: "blob",
        mode: "100644",
        sha: "pkg123",
        size: 256,
        url: "https://api.github.com/repos/test/repo/git/blobs/pkg123",
      },
    ];

    const result = svc.buildFileTree(flat);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("package.json");
    expect(result[1].name).toBe("README.md");
    expect(result[0].type).toBe("file");
    expect(result[1].type).toBe("file");
  });

  it("handles nested folder structures", () => {
    const flat: GitHubTreeItem[] = [
      {
        path: "src",
        type: "tree",
        mode: "040000",
        sha: "src123",
        url: "https://api.github.com/repos/test/repo/git/trees/src123",
      },
      {
        path: "src/components",
        type: "tree",
        mode: "040000",
        sha: "comp123",
        url: "https://api.github.com/repos/test/repo/git/trees/comp123",
      },
      {
        path: "src/components/Button.tsx",
        type: "blob",
        mode: "100644",
        sha: "btn123",
        size: 1024,
        url: "https://api.github.com/repos/test/repo/git/blobs/btn123",
      },
    ];

    const result = svc.buildFileTree(flat);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("src");
    const components = result[0].nodes?.find((n) => n.name === "components");
    expect(components).toBeDefined();
    expect(components?.nodes?.length).toBe(1);
    expect(components?.nodes?.[0].name).toBe("Button.tsx");
  });

  it("handles empty input", () => {
    const result = svc.buildFileTree([]);
    expect(result).toHaveLength(0);
  });
});

