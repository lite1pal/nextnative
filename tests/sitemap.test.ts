import { describe, it, expect, vi, beforeEach } from "vitest";
import sitemap from "@/app/sitemap";
import { prisma } from "@/prisma/client";

// ---- mocks ----
vi.mock("@/prisma/client", () => ({
  prisma: {
    blogPost: {
      findMany: vi.fn(),
    },
  },
}));

vi.mock("@/app/comparisons/[slug]/comparisons-data", () => ({
  comparisons: [{ slug: "react-native-vs-capacitor" }],
}));

vi.mock("@/app/tutorials/[slug]/tutorials-data", () => ({
  tutorials: [{ slug: "build-first-app" }],
}));

vi.mock("@/app/alternatives/[slug]/alternatives-data", () => ({
  alternatives: [{ slug: "react-native-alternative" }],
}));

vi.mock("@/app/use-cases/[slug]/use-cases-data", () => ({
  useCases: [{ slug: "enterprise-apps" }],
}));

const mockedFindMany = prisma.blogPost.findMany as ReturnType<typeof vi.fn>;

describe("sitemap()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches blog posts excluding noindex slugs", async () => {
    mockedFindMany.mockResolvedValue([]);

    await sitemap();

    expect(mockedFindMany).toHaveBeenCalledWith({
      select: { slug: true, updatedAt: true },
      where: {
        slug: {
          notIn: [
            "software-deployment-best-practices",
            "code-review-best-practices",
            "types-of-open-source-software-licenses",
          ],
        },
      },
    });
  });

  it("includes core pages", async () => {
    mockedFindMany.mockResolvedValue([]);

    const result = await sitemap();

    const urls = result.map((e) => e.url);

    expect(urls).toContain("https://nextnative.dev/");
    expect(urls).toContain("https://nextnative.dev/blog");
    expect(urls).toContain("https://nextnative.dev/pricing");
    expect(urls).toContain("https://nextnative.dev/free-tools");
  });

  it("assigns higher priority to top blog posts", async () => {
    const now = new Date();

    mockedFindMany.mockResolvedValue([
      {
        slug: "capacitor-vs-react-native", // top blog
        updatedAt: now,
      },
      {
        slug: "some-random-post",
        updatedAt: now,
      },
    ]);

    const result = await sitemap();

    const topPost = result.find(
      (e) => e.url === "https://nextnative.dev/blog/capacitor-vs-react-native",
    );

    const normalPost = result.find(
      (e) => e.url === "https://nextnative.dev/blog/some-random-post",
    );

    expect(topPost?.priority).toBe(0.8);
    expect(normalPost?.priority).toBe(0.65);
  });

  it("assigns higher priority to top free tools", async () => {
    mockedFindMany.mockResolvedValue([]);

    const result = await sitemap();

    const topTool = result.find(
      (e) =>
        e.url === "https://nextnative.dev/free-tools/app-icon-splash-generator",
    );

    const normalTool = result.find(
      (e) =>
        e.url === "https://nextnative.dev/free-tools/app-revenue-calculator",
    );

    expect(topTool?.priority).toBe(0.95);
    expect(normalTool?.priority).toBe(0.85);
  });

  it("includes dynamic routes (tutorials, comparisons, alternatives, use-cases)", async () => {
    mockedFindMany.mockResolvedValue([]);

    const result = await sitemap();
    const urls = result.map((e) => e.url);

    expect(urls).toContain("https://nextnative.dev/tutorials/build-first-app");
    expect(urls).toContain(
      "https://nextnative.dev/comparisons/react-native-vs-capacitor",
    );
    expect(urls).toContain(
      "https://nextnative.dev/alternatives/react-native-alternative",
    );
    expect(urls).toContain("https://nextnative.dev/use-cases/enterprise-apps");
  });

  it("returns valid sitemap entries", async () => {
    mockedFindMany.mockResolvedValue([]);

    const result = await sitemap();

    for (const entry of result) {
      expect(entry).toHaveProperty("url");
      expect(entry).toHaveProperty("lastModified");
      expect(entry).toHaveProperty("changeFrequency");
      expect(entry).toHaveProperty("priority");

      expect(typeof entry.url).toBe("string");
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(typeof entry.priority).toBe("number");
    }
  });
});
