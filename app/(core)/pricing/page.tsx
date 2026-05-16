import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | NextNative – Build & Publish Mobile Apps Faster",
  description:
    "Simple, one-time pricing for developers who want to ship cross-platform apps fast using Next.js and Capacitor. Choose the plan that fits your workflow.",
  metadataBase: new URL("https://nextnative.dev"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Pricing | NextNative",
    description:
      "Build and publish mobile apps with ease. Explore simple, one-time pricing plans for NextNative – built for web developers.",
    url: "https://nextnative.dev/pricing",
    siteName: "NextNative",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextNative Pricing",
    description:
      "See how much time and money you'll save with NextNative. One-time pricing, no subscriptions.",
  },
};

function PricingPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-[500]">Pricing</h1>
        </div>
        <PricingSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}

export default PricingPage;
