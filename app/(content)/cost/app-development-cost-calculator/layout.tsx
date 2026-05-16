import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Development Cost Calculator 2025 | Instant Estimate",
  description:
    "Calculate your mobile app development cost instantly. Select features, platform, and design to get accurate estimates. Free interactive calculator with timeline and budget breakdown.",
  keywords: [
    "app development cost calculator",
    "mobile app cost calculator",
    "app cost estimator",
    "calculate app development cost",
    "app development price calculator",
    "how much does an app cost calculator",
    "mobile app budget calculator",
    "app development estimate",
    "app cost breakdown",
    "mobile app pricing calculator",
    "ios app cost calculator",
    "android app cost calculator",
    "app development calculator",
    "app cost estimate tool",
    "mobile app cost estimator",
  ],
  openGraph: {
    title: "App Development Cost Calculator | Get Instant Estimates",
    description:
      "Calculate your mobile app development cost. Select features, platforms, and get accurate budget estimates instantly.",
    type: "website",
    url: "https://nextnative.dev/cost/app-development-cost-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Development Cost Calculator",
    description:
      "Calculate mobile app costs instantly. Interactive tool with feature selection and timeline estimates.",
  },
  alternates: {
    canonical: "https://nextnative.dev/cost/app-development-cost-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
