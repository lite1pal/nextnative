import { Suspense } from "react";
import BlogHeading from "./blog-heading";
import PostsGrid from "./posts-grid";

export const dynamic = "force-dynamic";

export default function BlogViewPage() {
  return (
    <div className="flex flex-col items-center gap-5">
      <BlogHeading />

      <Suspense fallback={<div className="py-96"></div>}>
        <PostsGrid />
      </Suspense>
    </div>
  );
}
