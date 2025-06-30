import { prisma } from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import HighlightedSpan from "@/components/HighlightedSpan";

export const metadata: Metadata = {
  title: "NextNative Blog",
  description:
    "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
  openGraph: {
    title: "NextNative Blog",
    description:
      "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
    url: "https://nextnative.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "NextNative Blog",
    description:
      "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
  },
};

export const revalidate = 60;

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true,
    },
  });

  return (
    <div className="prose prose-h1:text-5xl max-w-full items-center flex flex-col mx-auto py-10">
      <h1>
        Welcome to <HighlightedSpan>NextNative</HighlightedSpan>'s Blog
      </h1>
      <p className="text-gray-600 prose-p:text-xl">
        Guides, tutorials, and tips for building mobile apps with Next.js and
        Capacitor.
      </p>

      <ul className="list-none p-0 space-y-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <div>
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="rounded-lg mb-3"
                    />
                  )}
                  <h2>{post.title}</h2>
                  <p className="text-gray-500 text-sm">{formattedDate}</p>
                  <p>{post.description}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
