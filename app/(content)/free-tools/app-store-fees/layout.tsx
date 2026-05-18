import NextNativeCard from "@/app/(content)/blog/[slug]/NextNativeCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Store Fees Calculator 2025 | Apple & Google Play Commission",
  description:
    "Calculate App Store and Google Play fees instantly. See how much Apple (30% or 15%) and Google (15%-30%) take from your app revenue. Updated for 2025 with small business program rates.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/free-tools/app-store-fees",
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
    url: "https://nextnative.dev/free-tools/app-store-fees",
    siteName: "NextNative",
    title: "App Store Fees Calculator 2025 | Calculate Apple & Google Fees",
    description:
      "Instantly calculate how much App Store and Google Play take from your revenue. Updated for 2025 with latest commission rates.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nextnative",
    creator: "@shipwithdenis",
    title: "App Store Fees Calculator 2025 | NextNative",
    description:
      "Calculate Apple App Store and Google Play fees. See your net revenue after platform commissions.",
  },
  keywords: [
    "app store fees",
    "app store commission",
    "apple app store fees",
    "google play fees",
    "app store 30 percent",
    "apple commission rate",
    "app store small business program",
    "google play commission",
    "app store fee calculator",
    "how much does apple take",
    "ios app store fees 2025",
    "google play store fees 2025",
    "app store revenue cut",
    "apple 15 percent commission",
    "app store developer fees",
  ],
  other: {
    "theme-color": "#F5F9F5",
  },
};

export default function AppStoreFeesLayout({
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
