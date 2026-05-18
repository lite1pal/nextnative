"use client";

import HighlightedSpan from "@/components/HighlightedSpan";
import CTABlogButton from "./CTABlogButton";
import LogoSymbol from "@/components/LogoSymbol";
import Link from "next/link";
import { AvatarList } from "@/components/AvatarList";
import RatingSvg from "@/components/RatingSvg";

function NextNativeCardClient({ post }: { post: { slug: string } }) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="border-primary rounded-xl border-2 bg-white p-8"
    >
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative top-[2px]">
            <LogoSymbol />
          </div>
        </Link>
        <h3 className="mt-7 text-2xl font-semibold">
          Launch mobile apps 10x faster with{" "}
          <HighlightedSpan>Next.js</HighlightedSpan>
        </h3>
        <p className="mt-2 mb-4 text-gray-600">
          Skip native dev. Use Next.js + Capacitor to go live fast.
        </p>
        <CTABlogButton post={{ slug: post.slug }} />

        <div className="mt-5 flex items-center gap-2">
          <div className="relative">
            <AvatarList />
          </div>
          <div className="flex flex-col items-start">
            <RatingSvg />
            <div className="pl-2 text-xs font-medium text-gray-500">
              Loved by <span className="text-foreground">45+</span> teams/devs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextNativeCardClient;
