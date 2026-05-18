import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Does It Cost to Build an App in 2025? [Calculator]",
  description:
    "Calculate the real cost of building a mobile app. Interactive calculator with pricing for agencies ($25K-$350K), freelancers ($10K-$140K), and DIY solutions ($500+). Updated for 2025.",
  keywords: [
    "how much does it cost to build an app",
    "app development cost",
    "cost to make an app",
    "mobile app development cost",
    "app development pricing",
    "cost to build ios app",
    "cost to build android app",
    "app development cost calculator",
    "how much to build an app",
    "average app development cost",
    "app development budget",
    "mobile app cost breakdown",
    "app development cost 2025",
    "cheap app development",
    "affordable app development",
  ],
  openGraph: {
    title: "How Much Does It Cost to Build an App? [2025 Calculator]",
    description:
      "Calculate real app development costs. From $500 DIY to $350K+ agency pricing. Interactive calculator with detailed breakdowns.",
    type: "article",
    url: "https://nextnative.dev/cost/how-much-does-it-cost-to-build-an-app",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Development Cost Calculator 2025",
    description:
      "Calculate the real cost of building a mobile app. Agency, freelancer, or DIY pricing.",
  },
  alternates: {
    canonical:
      "https://nextnative.dev/cost/how-much-does-it-cost-to-build-an-app",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
