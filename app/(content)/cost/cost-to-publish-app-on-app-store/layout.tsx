import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Cost to Publish App on App Store 2025: Complete Fee Breakdown | NextNative",
  description:
    "Complete breakdown of costs to publish your app on Apple App Store and Google Play Store. Developer fees, commissions, and hidden costs explained for 2025.",
  keywords: [
    "cost to publish app on app store",
    "app store fees",
    "apple developer account cost",
    "google play store fees",
    "app store commission",
    "play store commission",
    "app publishing costs",
    "app store developer fee",
    "how much does it cost to publish an app",
    "app store publishing fees 2025",
    "google play developer cost",
    "apple app store fees",
    "app store small business program",
    "mobile app publishing costs",
    "app store vs play store fees",
  ],
  openGraph: {
    title: "Cost to Publish App on App Store 2025: Complete Fee Breakdown",
    description:
      "Apple charges $99/year, Google charges $25 one-time. Both take 15-30% commission. Complete breakdown of all fees.",
    type: "article",
    url: "https://nextnative.app/cost/cost-to-publish-app-on-app-store",
    images: [
      {
        url: "https://nextnative.app/cost/cost-to-publish-app-on-app-store/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Cost to Publish App on App Store Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cost to Publish App on App Store 2025",
    description:
      "Apple: $99/year. Google: $25 one-time. Both: 15-30% commission. Full breakdown.",
  },
  alternates: {
    canonical: "https://nextnative.app/cost/cost-to-publish-app-on-app-store",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
