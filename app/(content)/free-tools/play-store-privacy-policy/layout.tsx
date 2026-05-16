import type { Metadata } from "next";
import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import NextNativeCardSkeleton from "@/app/(content)/blog/[slug]/NextNativeCardSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Play Store Privacy Policy Generator | Free Template",
  description:
    "Create a Google Play-ready privacy policy for your Android app. Toggle permissions and SDKs (Analytics, Crashlytics, AdMob, Play Billing, FCM) and download as Markdown.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/free-tools/play-store-privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools/play-store-privacy-policy",
    siteName: "NextNative",
    title: "Play Store Privacy Policy Generator",
    description:
      "Generate a privacy policy tailored to your Android app’s permissions and SDKs. Free and instant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Store Privacy Policy Generator",
    description:
      "Free generator for Android privacy policies. Toggle permissions & SDKs, copy or download.",
  },
  keywords: [
    "play store privacy policy generator",
    "android privacy policy template",
    "privacy policy for google play",
    "admob privacy policy",
    "firebase privacy policy",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Play Store Privacy Policy Generator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Android, Web",
      description:
        "Generate a privacy policy for Google Play with toggles for permissions and SDKs. Export Markdown or TXT.",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      url: "https://nextnative.dev/free-tools/play-store-privacy-policy",
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
          name: "Play Store Privacy Policy Generator",
          item: "https://nextnative.dev/free-tools/play-store-privacy-policy",
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
      <div className="mx-auto mt-10 max-w-xl">
        <NextNativeCard post={{ slug: "free-tool" }} />
      </div>
      {children}
    </main>
  );
}
