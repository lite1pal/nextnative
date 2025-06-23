import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";

const ACCESS_TOKEN = process.env.OUTRANK_ACCESS_TOKEN;

export type OutrankWebhookPayload = {
  event_type: "publish_articles";
  timestamp: string; // ISO date
  data: {
    articles: {
      id: string;
      title: string;
      content_markdown: string;
      content_html: string;
      meta_description: string;
      created_at: string; // ISO date
      image_url: string;
      slug: string;
      tags: string[];
    }[];
  };
};

export async function POST(req: NextRequest) {
  // Get the bearer token from the header
  const authToken = (req.headers.get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // If not found OR the bearer token does NOT equal the CRON_SECRET
  if (!authToken || authToken != ACCESS_TOKEN) {
    return new Response("Unauthorized 401", {
      status: 401,
    });
  }

  const body: OutrankWebhookPayload = await req.json();
  for (const article of body.data.articles) {
    await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        description: article.meta_description,
        contentMarkdown: article.content_markdown,
        contentHtml: article.content_html,
        image: article.image_url,
        tags: article.tags,
        createdAt: new Date(article.created_at),
      },
      create: {
        slug: article.slug,
        title: article.title,
        description: article.meta_description,
        contentMarkdown: article.content_markdown,
        contentHtml: article.content_html,
        image: article.image_url,
        tags: article.tags,
        createdAt: new Date(article.created_at),
      },
    });
  }

  return new Response("Blog posts saved", { status: 200 });
}
