"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { calculatePagination } from "@/lib/pagination";
import Link from "next/link";

interface LoadMorePostsProps {
  initialPosts: any[];
  tag?: string; // For tag-specific loading
}

function formatDate(createdAt: string | Date) {
  const d = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function LoadMorePosts({
  initialPosts,
  tag,
}: LoadMorePostsProps) {
  const [totalPages, setTotalPages] = useState<any>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalPages > 1);

  useEffect(() => {
    const pagination = calculatePagination(currentPage, posts.length, 6);
    setTotalPages(pagination.totalPages);
  }, [currentPage, posts.length]);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const url = tag
        ? `/api/blog/posts?page=${nextPage}&tag=${encodeURIComponent(tag)}`
        : `/api/blog/posts?page=${nextPage}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Posts Grid */}
      <div className="prose prose-h1:text-5xl prose-h2:mt-7 mx-auto flex max-w-full flex-col items-center pt-5 pb-10">
        {posts.length > 0 ? (
          <>
            <ul className="grid list-none grid-cols-1 gap-8 space-y-10 p-0 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const date = formatDate(post.createdAt);
                return (
                  <li key={post.id} className="min-h-[360px]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group no-underline"
                    >
                      <div>
                        <>
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={800}
                              height={400}
                              className="mb-3 rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                              quality={30}
                              sizes="(max-width: 1200px) 60vw, 15vw"
                              style={{
                                boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
                              }}
                            />
                          )}

                          <h2 className="group-hover:text-primary font-[600] transition-colors duration-200">
                            {post.title}
                          </h2>
                          <p className="text-lg text-gray-500">{post.date}</p>
                          <p className="line-clamp-2 text-gray-800">
                            {post.description}
                          </p>
                        </>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No blog posts found.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="cursor-pointer border px-8 py-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Posts"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
