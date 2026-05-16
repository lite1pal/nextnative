import type { Metadata } from "next";
import UseCasesView from "./use-cases-view";

export const metadata: Metadata = {
  title: "Use Cases - Mobile App Templates & Examples | NextNative",
  description:
    "Explore real-world mobile app use cases and templates. Build fitness apps, food delivery, social media, e-commerce, education, and productivity apps with Next.js and Capacitor.",
  alternates: {
    canonical: "https://nextnative.dev/use-cases",
  },
  openGraph: {
    title: "Use Cases - Mobile App Templates & Examples | NextNative",
    description:
      "Explore real-world mobile app use cases and templates. Build fitness apps, food delivery, social media, e-commerce, education, and productivity apps with Next.js and Capacitor.",
    url: "https://nextnative.dev/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-7xl py-16">
      <div className="mb-20 text-center">
        <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
          Mobile App <span className="text-primary">Use Cases</span>
        </h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
          Explore real-world app templates and examples. See how NextNative can
          help you build any type of mobile app with Next.js and Capacitor.
        </p>
      </div>
      <UseCasesView />
    </div>
  );
}
