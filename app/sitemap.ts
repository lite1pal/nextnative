// app/sitemap.ts
import { prisma } from "@/prisma/client";
import type { MetadataRoute } from "next";

export const revalidate = 86400; // 1 day in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  return [
    {
      url: "https://nextnative.dev/",
      lastModified: new Date(),
    },
    {
      url: "https://nextnative.dev/blog",
      lastModified: new Date(),
    },
    {
      url: "https://docs.nextnative.dev",
      lastModified: new Date(),
    },
    {
      url: "https://docs.nextnative.dev/tutorials/ship-in-5-minutes",
      lastModified: new Date(),
    },

    ...posts.map((post) => ({
      url: `https://nextnative.dev/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
