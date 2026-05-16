import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import { permanentRedirect, redirect } from "next/navigation";
import { BlogPagination } from "@/components/BlogPagination";
import { calculatePagination } from "@/lib/pagination";
import PostsGrid from "../../posts-grid";
import BlogHeading from "../../blog-heading";
import TagFilter from "../../tag-filter";
import { Suspense } from "react";

interface BlogListPageProps {
  params: any;
}

export const dynamic = "force-dynamic";

export async function generateMetadata(
  props: BlogListPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const page = parseInt(params.page || "1", 10);

  const baseTitle = "NextNative Blog";
  const baseDescription =
    "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor";

  const title = page > 1 ? `${baseTitle} - Page ${page}` : baseTitle;
  const description =
    page > 1 ? `${baseDescription} - Page ${page}` : baseDescription;
  const url =
    page === 1
      ? "https://nextnative.dev/blog"
      : `https://nextnative.dev/blog/page/${page}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots:
      page >= 2
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}

export default async function BlogListPage(props: BlogListPageProps) {
  const params = await props.params;
  const pageParam = params.page;
  const page = parseInt(pageParam || "1", 10);

  // Validate page parameter
  if (pageParam && (isNaN(page) || page < 1)) {
    redirect("/blog");
  }

  if (pageParam === "1") permanentRedirect("/blog");

  const postsPerPage = 6;

  // Get total count of posts
  const totalPosts = await prisma.blogPost.count();

  // Calculate pagination info
  const paginationInfo = calculatePagination(page, totalPosts, postsPerPage);

  // Redirect if page number is too high
  if (totalPosts > 0 && page > paginationInfo.totalPages) {
    redirect("/blog");
  }

  // Fetch posts for current page
  const posts = await prisma.blogPost.findMany({
    skip: paginationInfo.startIndex,
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

      {/* TAG FILTER BAR */}
      {allTags.length > 0 && (
        <div className="w-full max-w-6xl px-4">
          <TagFilter tags={allTags} />
        </div>
      )}

      <Suspense>
        <PostsGrid />
      </Suspense>

      <BlogPagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
      />
    </div>
  );
}
