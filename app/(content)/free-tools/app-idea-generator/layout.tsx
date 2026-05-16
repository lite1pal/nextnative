import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Idea Generator | Free Mobile App Ideas for Developers",
  description:
    "Get unlimited mobile app ideas instantly. Categories, features, and monetization suggestions — perfect for indie devs and founders.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-idea-generator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-idea-generator",
    siteName: "NextNative",
    title: "Free App Idea Generator",
    description:
      "Generate unique app ideas with features and monetization models. Build your favorite with NextNative.",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Idea Generator | NextNative",
    description:
      "Fresh mobile app ideas with one click. Free and fun for indie devs.",
  },
  keywords: [
    "app ideas",
    "mobile app ideas",
    "startup app ideas",
    "app idea generator",
    "app concepts",
    "best app ideas",
    "cool app ideas",
    "project ideas for app",
    "next.js app ideas",
    "capacitor app ideas",
  ],
  other: { "theme-color": "#F5F9F5" },
};

export default function AppIdeaGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div>
      {children}
    </main>
  );
}
