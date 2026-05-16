import type { Metadata } from "next";
import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Store Screenshot Generator | Free iOS & Google Play Sizes",
  description:
    "Generate pixel-perfect App Store and Google Play screenshots. Add titles, choose backgrounds, and export PNGs for iOS 6.7″, 6.5″, 5.5″, and Play Store 1080×1920.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/free-tools/app-store-screenshot-generator" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-store-screenshot-generator",
    siteName: "NextNative",
    title: "App Store Screenshot Generator | NextNative",
    description:
      "Create App Store & Google Play screenshots right in your browser — titles, backgrounds, and export to PNG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Store Screenshot Generator | Free Tool",
    description:
      "Upload images, add text overlays, pick iOS/Play presets, and export PNGs. 100% browser-based.",
  },
  keywords: [
    "app store screenshot generator",
    "ios app screenshots",
    "app store images generator",
    "screenshot generator for app store",
    "play store screenshot generator",
    "app store screenshot template",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "App Store Screenshot Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "iOS, Android, Web",
      description:
        "Generate App Store & Google Play screenshots in your browser. Add titles and export PNGs for required sizes.",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      url: "https://nextnative.dev/free-tools/app-store-screenshot-generator",
      publisher: { "@type": "Organization", name: "NextNative" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Free tools",
          item: "https://nextnative.dev/free-tools",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "App Store Screenshot Generator",
          item: "https://nextnative.dev/free-tools/app-store-screenshot-generator",
        },
      ],
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div> */}
      {children}
    </main>
  );
}
