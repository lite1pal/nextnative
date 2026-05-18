import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Capacitor Config Generator | Create capacitor.config.ts Online",
  description:
    "Generate a valid capacitor.config.ts for your Next.js or web project. Fast, free, and based on the official Capacitor schema.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/capacitor-config-generator",
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
    url: "https://nextnative.dev/free-tools/capacitor-config-generator",
    siteName: "NextNative",
    title: "Capacitor Config Generator | NextNative",
    description:
      "Quickly create a valid capacitor.config.ts for your app — includes plugins, colors, and runtime settings.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Capacitor Config Generator | NextNative.dev",
    description:
      "Generate capacitor.config.ts online — official schema, no setup, instant copy & paste.",
  },
  keywords: [
    "capacitor config generator",
    "capacitor.config.ts example",
    "create capacitor config online",
    "capacitor app setup",
    "capacitor config json",
    "capacitor cli config",
    "capacitor webdir",
    "capacitor plugins config",
    "next.js capacitor setup",
    "ionic capacitor config",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function CapacitorConfigGeneratorLayout({
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
