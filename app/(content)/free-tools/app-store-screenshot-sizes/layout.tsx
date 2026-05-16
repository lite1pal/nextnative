import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Store Screenshot Sizes 2025 | iOS & Android Dimensions",
  description:
    "Complete reference for App Store and Google Play screenshot sizes. Updated for 2025 with iPhone 16, iPad Pro, and Android requirements. Free, accurate, and always up-to-date.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-store-screenshot-sizes",
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
    url: "https://nextnative.dev/free-tools/app-store-screenshot-sizes",
    siteName: "NextNative",
    title: "App Store Screenshot Sizes 2025 | Complete iOS & Android Guide",
    description:
      "Find the exact screenshot dimensions for App Store and Google Play. Updated for iPhone 16 Pro Max, iPad Pro, and Android devices.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "App Store Screenshot Sizes 2025 | NextNative",
    description:
      "Complete reference for iOS App Store and Google Play screenshot dimensions. Updated for 2025.",
  },
  keywords: [
    "app store screenshot sizes",
    "ios screenshot dimensions",
    "app store screenshot requirements",
    "iphone screenshot sizes",
    "ipad screenshot sizes",
    "google play screenshot sizes",
    "android screenshot dimensions",
    "app store screenshot specifications",
    "iphone 16 screenshot size",
    "iphone 16 pro max screenshot",
    "app store connect screenshot",
    "6.7 inch screenshot size",
    "6.9 inch screenshot size",
    "app store screenshot dimensions 2025",
    "play store screenshot requirements",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppStoreScreenshotSizesLayout({
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
