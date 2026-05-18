import { prisma } from "@/prisma/client";
import PostItem from "./post-grid";

export default async function PostsGrid() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="prose prose-h1:text-5xl prose-h2:mt-7 mx-auto flex max-w-full flex-col items-center pt-5 pb-10">
      {posts.length > 0 ? (
        <>
          <ul className="grid list-none grid-cols-1 gap-8 space-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </ul>
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}
