"use client";

import LogoSymbol from "@/components/LogoSymbol";
import Link from "next/link";
import { trackEvent } from "@/services/custom-analytics";
import { FormEvent } from "react";

function NextNativeCard({ post }: { post: { slug: string } }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) return;

    try {
      await fetch("https://nextnative.dev/api/playground-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
  };
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="border-primary rounded-xl border-2 bg-white p-6"
    >
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative top-[2px]">
            <LogoSymbol />
          </div>
        </Link>
        <h3 className="mt-7 text-xl font-semibold">
          A better way to build software
        </h3>
        <p className="mt-2 mb-4 text-gray-600">
          Thoughts on engineering, slow productivity, books, and building a
          calmer career in tech.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-1.5 md:flex-row"
        >
          <input
            placeholder="youremail@domain.com"
            type="email"
            name="email"
            className="min-h-11 rounded-lg border pl-2 placeholder:text-gray-400"
          />
          <button
            onClick={() => {
              trackEvent(`BlogPostCTA_${post.slug}_clicked`);
            }}
            className="bg-primary hover:text-primary border-primary inline-block rounded-lg border-2 px-4 py-2 font-medium text-white hover:bg-white sm:cursor-pointer"
          >
            Try it
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-500">
          Only quality stuff, no spam ever. <br />
          Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

export default NextNativeCard;
