import Link from "next/link";
import { comparisons } from "./[slug]/comparisons-data";
import { ChevronRight } from "lucide-react";
import HighlightedSpan from "@/components/HighlightedSpan";
import CTA from "@/components/CTA";
import CTABlogButton from "../blog/[slug]/CTABlogButton";

export default function ComparisonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Framework <HighlightedSpan>Comparisons</HighlightedSpan>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Compare Next.js, Capacitor, React Native, Flutter, and more. Find the
          best framework for your mobile app development needs.
        </p>
      </header>

      {/* Comparison Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparisons/${comparison.slug}`}
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="group-hover:text-primary text-2xl font-bold text-gray-900">
                {comparison.title}
              </h2>
              <ChevronRight className="group-hover:text-primary h-6 w-6 text-gray-400" />
            </div>
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
                  {comparison.option1.name}
                </span>
                <span className="text-gray-400">vs</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                  {comparison.option2.name}
                </span>
              </div>
            </div>
            <p className="line-clamp-3 text-gray-600">{comparison.summary}</p>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl bg-white p-16 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">
          Ready to build your mobile app?
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          NextNative provides everything you need to ship iOS and Android apps
          with Next.js + Capacitor in minutes.
        </p>

        <CTABlogButton post={{ slug: "comparisons_page" }} />
      </div>
    </div>
  );
}
