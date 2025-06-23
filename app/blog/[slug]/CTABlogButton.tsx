"use client";

import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

function CTABlogButton({ post }: { post: { slug: string } }) {
  return (
    <Link
      onClick={() => {
        trackEvent(`BlogPostCTA_${post.slug}_clicked`);
      }}
      href="/"
      className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors font-medium border border-primary"
    >
      Get NextNative
    </Link>
  );
}

export default CTABlogButton;
