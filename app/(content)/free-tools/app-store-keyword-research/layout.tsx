import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free App Store Keyword Research Tool | ASO Keyword Finder 2025",
  description:
    "Discover the best keywords for your iOS or Android app. Free ASO keyword research tool with difficulty ratings and search volume estimates. Optimize your App Store and Google Play listings.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-store-keyword-research",
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
    url: "https://nextnative.dev/free-tools/app-store-keyword-research",
    siteName: "NextNative",
    title: "Free App Store Keyword Research Tool | ASO Keywords 2025",
    description:
      "Find the best keywords for your app with our free ASO keyword research tool. Get difficulty ratings and search volume for iOS and Android.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Free App Store Keyword Research Tool | NextNative",
    description:
      "Discover high-impact keywords for your app. Free ASO tool with keyword difficulty and search volume data.",
  },
  keywords: [
    "app store keyword tool",
    "app store keyword research",
    "aso keyword tool",
    "app store optimization keywords",
    "ios keyword research",
    "google play keyword tool",
    "app store seo",
    "keyword research for apps",
    "app store keyword finder",
    "best keywords for app store",
    "app store keyword difficulty",
    "mobile app keywords",
    "aso tool free",
    "app keyword generator",
    "app store ranking keywords",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppStoreKeywordResearchLayout({
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
