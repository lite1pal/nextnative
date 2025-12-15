"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

type PostItemProps = {
  post: {
    id: string;
    slug: string;
    title: string;
    description: string;
    image?: string | null;
    createdAt: string | Date;
  };
};

function formatDate(createdAt: string | Date) {
  const d = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostItem({ post }: PostItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "250px 0px", // start rendering a bit before it appears
    threshold: 0.01,
  });

  const date = formatDate(post.createdAt);

  return (
    <li ref={ref} className="min-h-[360px]">
      <Link href={`/blog/${post.slug}`} className="group no-underline">
        <div>
          {!inView ? (
            // lightweight skeleton placeholder (no Image, no heavy stuff)
            <div className="animate-pulse">
              <div className="mb-3 aspect-[2/1] w-full rounded-lg bg-gray-200" />
              <div className="mb-2 h-6 w-5/6 rounded bg-gray-200" />
              <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-16 w-full rounded bg-gray-200" />
            </div>
          ) : (
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
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
                />
              )}

              <h2 className="group-hover:text-primary font-[600] transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-lg text-gray-500">{date}</p>
              <p className="line-clamp-2 text-gray-800">{post.description}</p>
            </>
          )}
        </div>
      </Link>
    </li>
  );
}
