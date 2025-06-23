import { prisma } from "@/prisma/client";
import { Feed } from "feed";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 1 day in seconds

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  const siteUrl = "https://nextnative.dev";

  const feed = new Feed({
    title: "NextNative Blog",
    description: "Latest insights & updates from NextNative",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `https://cmaziv7qvh0j1n1k.public.blob.vercel-storage.com/CleanShot%202025-06-23%20at%2011.43.05%402x-adWCIjRyKrjYiFiH0vbFJcNFMcckoA.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} NextNative`,
    updated: posts.length ? posts[0].createdAt : new Date(),
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
    author: { name: "NextNative", link: siteUrl },
  });

  posts.forEach((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.contentHtml,
      date: post.createdAt,
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
