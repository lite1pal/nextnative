import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Store Connect API Setup Guide | Free Fastlane Configuration Tool",
  description:
    "Complete guide to setting up App Store Connect API keys for Fastlane, CI/CD, and automated publishing. Generate configuration files and learn best practices. Free tool for iOS developers.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-store-connect-api",
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
    url: "https://nextnative.dev/free-tools/app-store-connect-api",
    siteName: "NextNative",
    title: "App Store Connect API Setup Guide | Fastlane Configuration",
    description:
      "Step-by-step guide to App Store Connect API setup. Configure Fastlane, generate API keys, and automate your iOS app publishing.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "App Store Connect API Setup | NextNative",
    description:
      "Complete guide to App Store Connect API setup with Fastlane configuration generator. Free tool for iOS developers.",
  },
  keywords: [
    "app store connect api",
    "app store connect api key",
    "fastlane app store connect",
    "app store connect authentication",
    "ios api key",
    "fastlane api key",
    "app store connect jwt",
    "testflight api",
    "app store connect token",
    "fastlane ci cd",
    "app store connect automation",
    "ios ci cd",
    "generate app store api key",
    "app store connect p8 file",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppStoreConnectApiLayout({
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
