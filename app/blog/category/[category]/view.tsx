import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import LoadMorePosts from "@/components/LoadMorePosts";
import BlogHeading from "../../blog-heading";
import TagFilter from "../../tag-filter";

interface BlogTagPageProps {
  params: any;
}

export default async function BlogCategoryView(props: BlogTagPageProps) {
  const params = await props.params;

  const tag = decodeURIComponent(params.category);

  const tagWithoutDashes = tag.replaceAll("-", " ");

  const postsPerPage = 6;

  // Get total count of posts with this tag
  const totalPosts = await prisma.blogPost.count({
    where: {
      tags: {
        has: tagWithoutDashes,
      },
    },
  });

  // If no posts found with this tag, return 404
  if (totalPosts === 0) {
    notFound();
  }

  // Fetch posts for current page with the specific tag
  const posts = await prisma.blogPost.findMany({
    where: {
      tags: {
        has: tagWithoutDashes,
      },
    },
    take: postsPerPage,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true,
      tags: true,
    },
  });

  // Collect unique tags across all posts
  const allTags = Array.from(
    new Set(posts.flatMap((p) => (Array.isArray(p.tags) ? p.tags : []))),
  ).sort();

  return (
    <div className="flex flex-col items-center gap-5">
      <BlogHeading />

      {/* Current tag indicator */}
      <div className="w-full max-w-6xl px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {tagWithoutDashes} category
          </h2>
          <p className="mt-1 text-gray-600">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"} found
          </p>
        </div>
      </div>

      {/* TAG FILTER BAR */}
      {allTags.length > 0 && (
        <div className="w-full max-w-6xl px-4">
          <TagFilter tags={allTags} currentTag={tagWithoutDashes} />
        </div>
      )}

      <LoadMorePosts initialPosts={posts} tag={tagWithoutDashes} />
    </div>
  );
}
