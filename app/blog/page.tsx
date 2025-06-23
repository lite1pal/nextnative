import { prisma } from "@/prisma/client";
import Link from "next/link";

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="prose mx-auto px-6 py-10">
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <strong>{post.title}</strong>
            </Link>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
