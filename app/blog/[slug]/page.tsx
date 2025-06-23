import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>{post.title}</h1>
      <p className="text-gray-500">{post.description}</p>
      <article dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}
