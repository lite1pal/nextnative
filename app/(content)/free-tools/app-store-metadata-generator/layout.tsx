import type { Metadata } from "next";
import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Store Metadata Generator | Titles, Keywords & Descriptions",
  description:
    "Generate iOS App Store titles, subtitles, keywords CSV, and Google Play descriptions from a few inputs. Free, fast, and developer-friendly.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/free-tools/app-store-metadata-generator" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-store-metadata-generator",
    siteName: "NextNative",
    title: "App Store Metadata Generator",
    description:
      "Create App Store & Google Play metadata instantly: titles, subtitles, keywords, and descriptions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Store Metadata Generator | NextNative",
    description:
      "Free tool to create App Store & Play Store metadata: titles, keywords CSV, descriptions. Copy or download JSON.",
  },
  keywords: [
    "app store metadata generator",
    "app store title generator",
    "app store keywords generator",
    "google play description generator",
    "app subtitle generator",
    "aso tool",
    "app store optimization",
  ],
  other: { "theme-color": "#F5F9F5" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div>
      {children}
    </main>
  );
}
