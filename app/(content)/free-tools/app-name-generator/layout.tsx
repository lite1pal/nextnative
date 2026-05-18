import type { Metadata } from "next";
import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Name Generator | Free Mobile App Name Ideas",
  description:
    "Generate brandable app name ideas with domain suggestions. Short, punchy, two-word, and invented styles. Free and fast.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/free-tools/app-name-generator" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/app-name-generator",
    siteName: "NextNative",
    title: "App Name Generator",
    description:
      "Get unique app name ideas with styles and domain suggestions. Copy or export to CSV.",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Name Generator | NextNative",
    description:
      "Free tool to create mobile app name ideas with domain suggestions.",
  },
  keywords: [
    "app name generator",
    "app name ideas",
    "mobile app name ideas",
    "startup name generator",
    "app naming tool",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "App Name Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "iOS, Android, Web",
      description:
        "Generate brandable app name ideas with styles and domain suggestions.",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      url: "https://nextnative.dev/free-tools/app-name-generator",
      publisher: { "@type": "Organization", name: "NextNative" },
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div>
      {children}
    </main>
  );
}
