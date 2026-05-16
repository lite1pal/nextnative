import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Free iOS Bundle ID Generator | Reverse Domain App ID Creator",
  description:
    "Generate a valid iOS Bundle ID instantly. Enter your company and app name to get a reverse-domain identifier like com.company.app. Free, fast, and developer-friendly.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/ios-bundle-id-generator",
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
    url: "https://nextnative.dev/free-tools/ios-bundle-id-generator",
    siteName: "NextNative",
    title: "Free iOS Bundle ID Generator | NextNative",
    description:
      "Create your iOS Bundle ID in reverse domain format for App Store, Xcode, or Capacitor apps. Free and instant.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Free iOS Bundle ID Generator | NextNative",
    description:
      "Generate valid iOS Bundle IDs instantly. Use it for your Xcode or Capacitor app configuration. 100% free.",
  },
  keywords: [
    "bundle id generator",
    "ios bundle id",
    "reverse domain name app id",
    "xcode bundle identifier",
    "app id creator",
    "create ios bundle id",
    "capacitor bundle id",
    "react native bundle id",
    "app identifier generator",
    "swift app bundle id",
    "generate bundle id online",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function IosBundleIdGeneratorLayout({
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
