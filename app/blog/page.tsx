import { prisma } from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextNative Blog",
  description: "Insights, tutorials, and updates from NextNative.",
  openGraph: {
    title: "NextNative Blog",
    description: "Insights, tutorials, and updates from NextNative.",
    url: "https://nextnative.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "NextNative Blog",
    description: "Insights, tutorials, and updates from NextNative.",
  },
};

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="prose max-w-full mx-auto px-6 py-10">
      <h1>Blog</h1>
      <ul className="list-none space-y-10 grid grid-cols-1 md:grid-cols-2 gap-8">
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
