import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Free PWA Manifest Generator | Create manifest.json Instantly",
  description:
    "Generate a valid PWA manifest.json file in seconds. Set app name, colors, icons, and display mode. 100% free, no signup — perfect for Next.js, React, or Capacitor projects.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/pwa-manifest-generator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "technology",
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/pwa-manifest-generator",
    siteName: "NextNative",
    title: "Free PWA Manifest Generator | NextNative",
    description:
      "Quickly create a valid manifest.json for your Progressive Web App. Supports Next.js, React, and Capacitor setups.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Free PWA Manifest Generator | NextNative.dev",
    description:
      "Generate a valid manifest.json for your PWA in seconds — name, colors, icons, and more. Free and easy.",
  },
  keywords: [
    "pwa manifest generator",
    "manifest.json generator",
    "web app manifest",
    "pwa builder",
    "pwa manifest creator",
    "next.js pwa manifest",
    "react manifest.json",
    "pwa config generator",
    "progressive web app setup",
    "capacitor manifest generator",
    "pwa meta tags",
    "generate manifest file online",
    "create pwa manifest json",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function PwaManifestGeneratorLayout({
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
