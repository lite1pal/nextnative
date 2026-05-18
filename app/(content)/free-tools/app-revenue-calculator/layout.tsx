import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free App Revenue Calculator | Estimate App Store Profit Instantly",
  description:
    "Estimate your app's net revenue after App Store, Google Play, and RevenueCat fees. Free calculator for indie developers building iOS & Android apps with Next.js + Capacitor.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-revenue-calculator",
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
    url: "https://nextnative.dev/free-tools/app-revenue-calculator",
    siteName: "NextNative",
    title: "Free App Revenue Calculator for Developers",
    description:
      "Instantly calculate your net profit after App Store and RevenueCat fees. Perfect for indie developers and app founders.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "Free App Revenue Calculator | NextNative",
    description:
      "Estimate your app profit after App Store and RevenueCat fees instantly. Built for indie developers.",
  },
  keywords: [
    "app revenue calculator",
    "app profit calculator",
    "app store fee calculator",
    "google play fee calculator",
    "revenuecat calculator",
    "in-app purchase calculator",
    "subscription revenue calculator",
    "mobile app income estimator",
    "ios app store fee 2025",
    "developer profit calculator",
    "next.js mobile app revenue",
    "capacitor app monetization",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppRevenueCalculatorLayout({
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
