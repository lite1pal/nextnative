import { notFound } from "next/navigation";
import { useCases } from "./use-cases-data";
import type { Metadata } from "next";
import {
  ChevronRight,
  Clock,
  DollarSign,
  CheckCircle2,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import Mockups from "./mockups";
import CTABlogButton from "@/app/(content)/blog/[slug]/CTABlogButton";

// Generate static params for all use cases
export async function generateStaticParams() {
  return useCases.map((useCase) => ({
    slug: useCase.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCases.find((uc) => uc.slug === slug);

  if (!useCase) return {};

  return {
    title: useCase.metaTitle,
    description: useCase.metaDescription,
    alternates: {
      canonical: `https://nextnative.dev/use-cases/${slug}`,
    },
    openGraph: {
      title: useCase.metaTitle,
      description: useCase.metaDescription,
      url: `https://nextnative.dev/use-cases/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: useCase.metaTitle,
      description: useCase.metaDescription,
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = useCases.find((uc) => uc.slug === slug);

  if (!useCase) {
    notFound();
  }

  // Generate SoftwareApplication schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: useCase.title,
    description: useCase.summary,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "iOS, Android",
  };

  const categoryColors = {
    health: "bg-red-100 text-red-800",
    commerce: "bg-blue-100 text-blue-800",
    social: "bg-purple-100 text-purple-800",
    education: "bg-green-100 text-green-800",
    productivity: "bg-yellow-100 text-yellow-800",
    entertainment: "bg-pink-100 text-pink-800",
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Script id="software-schema" type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </Script>

      {/* Breadcrumbs */}
      <nav className="mb-10 flex items-center gap-2 text-base text-gray-600 md:text-lg">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/use-cases" className="hover:text-primary">
          Use Cases
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{useCase.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-16">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="text-6xl">{useCase.icon}</span>
          <span
            className={`rounded-full px-5 py-2 text-base font-medium ${categoryColors[useCase.category]}`}
          >
            {useCase.category.charAt(0).toUpperCase() +
              useCase.category.slice(1)}
          </span>
        </div>

        <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
          {useCase.title}
        </h1>

        <p className="text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
          {useCase.summary}
        </p>
      </header>

      {/* Purchase Section */}
      {/* {useCase.forSale && (
        <section className="mb-16 rounded-3xl bg-white p-8 shadow-lg md:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-1 flex-col items-center gap-5 md:items-start">
              <h3 className="mb-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                Get this template <HighlightedSpan>today</HighlightedSpan>
              </h3>
              <p className="mb-4 text-lg leading-9 text-gray-700 md:text-xl ">
                <span className="flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Get the complete React code for this template.
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Convert it to a mobile app yourself using Capacitor.
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-medium text-gray-500 line-through">
                    ${useCase.pricing.originalPrice}
                  </span>
                  <span className="text-primary text-5xl font-bold">
                    ${useCase.pricing.price}
                  </span>
                </div>
              </div>
              <PurchaseButton link={useCase.pricing.link!} />
            </div>
          </div>
        </section>
      )} */}

      {/* Problem & Solution */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        <section className="rounded-3xl bg-red-50 p-10">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            😓 The Problem
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
            {useCase.problemStatement}
          </p>
        </section>

        <section className="rounded-3xl bg-white p-10">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            ✅ The Solution
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
            {useCase.solution}
          </p>
        </section>
      </div>

      <div className="mb-16">
        <Mockups data={useCase.images || []} />
      </div>

      {/* Target Audience */}
      <section className="mb-16 rounded-3xl bg-blue-50 p-10">
        <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-gray-900 md:text-4xl">
          🎯 Perfect For
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {useCase.targetAudience.map((audience, index) => (
            <li key={index} className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
              <span className="text-lg leading-relaxed text-gray-700 md:text-xl">
                {audience}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="mb-10 text-4xl font-bold text-gray-900 md:text-5xl">
          🚀 Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCase.keyFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <div className="text-lg leading-relaxed text-gray-600">
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bg-primary/5 mb-16 rounded-3xl p-10">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
          💎 What's Included
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCase.coreCapabilities.map((capability, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2 className="text-primary mt-1 h-6 w-6 flex-shrink-0" />
              <span className="text-lg leading-relaxed text-gray-700 md:text-xl">
                {capability}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      {/* <section className="mb-16">
        <h2 className="mb-10 text-4xl font-bold text-gray-900 md:text-5xl">
          💻 Code Examples
        </h2>
        <div className="space-y-12">
          {useCase.codeExamples.map((example, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
            >
              <div className="mb-6 flex items-start gap-5">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-semibold text-gray-900 md:text-3xl">
                    {example.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                    {example.description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {example.filename && (
                  <div className="rounded-t-xl bg-gray-700 px-5 py-3 font-mono text-base text-gray-300">
                    {example.filename}
                  </div>
                )}
                <pre
                  className={`overflow-x-auto bg-gray-900 p-6 text-base leading-relaxed ${example.filename ? "rounded-b-xl" : "rounded-xl"}`}
                >
                  <code className="text-gray-100">{example.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Metrics */}
      <section className="mb-16">
        <h2 className="mb-10 text-4xl font-bold text-gray-900 md:text-5xl">
          📊 Performance Metrics
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {useCase.metrics.map((metric, index) => (
            <div
              key={index}
              className="from-primary/10 to-primary/5 rounded-3xl bg-gradient-to-br p-8 text-center"
            >
              <div className="text-primary mb-3 text-4xl font-bold md:text-5xl">
                {metric.value}
              </div>
              <div className="mb-2 text-xl font-semibold text-gray-900">
                {metric.label}
              </div>
              <div className="text-base text-gray-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Time & Cost Savings */}
      <section className="mb-16">
        <div className="grid gap-8">
          <div className="rounded-3xl bg-white p-10">
            <div className="mb-4 flex items-center gap-4">
              <Clock className="h-10 w-10 text-green-600" />
              <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Save {useCase.timeSavings}
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              Launch your app in weeks instead of months. Skip the learning
              curve and start with production-ready code.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-10">
            <div className="mb-4 flex items-center gap-4">
              <DollarSign className="h-10 w-10 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Save {useCase.costSavings}
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
              Avoid expensive agency fees and native development costs. Build
              once, deploy everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-16 rounded-3xl p-10 md:p-16">
        <div className="mb-6 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Ready to Build Your{" "}
            {useCase.title.replace("Build a ", "").replace("Build an ", "")}?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-700 md:text-2xl">
            Choose your path to building production-ready mobile apps.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 md:flex-row">
          <CTABlogButton post={{ slug: "use-cases" }} />
        </div>
      </section>

      {/* Related Tutorials */}
      {useCase.relatedTutorials.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
            📚 Related Tutorials
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {useCase.relatedTutorials.map((tutorialSlug) => (
              <Link
                key={tutorialSlug}
                href={`/tutorials/${tutorialSlug}`}
                className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="text-primary h-5 w-5" />
                  <span className="text-primary text-base font-medium">
                    Tutorial
                  </span>
                </div>
                <h3 className="group-hover:text-primary text-lg font-semibold text-gray-900">
                  {tutorialSlug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Comparisons */}
      {useCase.relatedComparisons.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
            ⚖️ Related Comparisons
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {useCase.relatedComparisons.map((comparisonSlug) => (
              <Link
                key={comparisonSlug}
                href={`/comparisons/${comparisonSlug}`}
                className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl"
              >
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="text-primary h-5 w-5" />
                  <span className="text-primary text-base font-medium">
                    Comparison
                  </span>
                </div>
                <h3 className="group-hover:text-primary text-lg font-semibold text-gray-900">
                  {comparisonSlug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                    .replace("Vs", "vs")}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
