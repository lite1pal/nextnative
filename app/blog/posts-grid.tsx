import { prisma } from "@/prisma/client";
import PostItem from "./post-grid";
import { PostGrid } from "./types";

export default async function PostsGrid() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all-posts`);

  if (!res.ok) throw new Error("Error fetching blog posts");

  const posts: PostGrid[] = await res.json();

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
