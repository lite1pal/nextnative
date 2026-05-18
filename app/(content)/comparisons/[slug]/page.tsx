import { notFound } from "next/navigation";
import { comparisons } from "./comparisons-data";
import { tutorials } from "../../tutorials/[slug]/tutorials-data";
import type { Metadata } from "next";
import { Check, X, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import CTA from "@/components/CTA";
import CTABlogButton from "@/app/(content)/blog/[slug]/CTABlogButton";

// Generate static params for all comparisons
export async function generateStaticParams() {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: {
      canonical: `https://nextnative.dev/comparisons/${slug}`,
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `https://nextnative.dev/comparisons/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* Breadcrumbs */}
      <nav className="mb-10 flex items-center gap-2 text-base text-gray-600">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/comparisons" className="hover:text-primary">
          Comparisons
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{comparison.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-16 text-center">
        <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
          {comparison.option1.name} vs {comparison.option2.name}
        </h1>

        {/* Last Updated */}
        <div className="mb-6 flex justify-center">
          <span className="flex items-center gap-2 text-lg text-gray-600">
            <Calendar className="h-5 w-5" />
            Updated {comparison.lastUpdated}
          </span>
        </div>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
          {comparison.summary}
        </p>
      </header>

      {/* Quick Answer */}
      <div className="bg-primary/10 mb-16 rounded-3xl p-8 md:p-10">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">
          🎯 Quick Answer
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
          {comparison.quickAnswer}
        </p>
      </div>

      {/* Comparison Table */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="p-5 text-left text-base font-semibold text-gray-900 md:text-lg">
                  Feature
                </th>
                <th className="p-5 text-left text-base font-semibold text-gray-900 md:text-lg">
                  {comparison.option1.name}
                </th>
                <th className="p-5 text-left text-base font-semibold text-gray-900 md:text-lg">
                  {comparison.option2.name}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {comparison.features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-5 text-base font-medium text-gray-900 md:text-lg">
                    {feature.feature}
                  </td>
                  <td
                    className={`p-5 ${
                      feature.winner === "option1" ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof feature.option1 === "boolean" ? (
                      feature.option1 ? (
                        <Check className="h-6 w-6 text-green-600" />
                      ) : (
                        <X className="h-6 w-6 text-red-600" />
                      )
                    ) : (
                      <span className="text-base text-gray-700 md:text-lg">
                        {feature.option1}
                      </span>
                    )}
                  </td>
                  <td
                    className={`p-5 ${
                      feature.winner === "option2" ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof feature.option2 === "boolean" ? (
                      feature.option2 ? (
                        <Check className="h-6 w-6 text-green-600" />
                      ) : (
                        <X className="h-6 w-6 text-red-600" />
                      )
                    ) : (
                      <span className="text-base text-gray-700 md:text-lg">
                        {feature.option2}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="mb-20">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
          Pros & Cons
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {/* Option 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              {comparison.option1.name}
            </h3>
            <div className="mb-8">
              <h4 className="mb-4 text-lg font-semibold text-green-700">
                ✓ Pros
              </h4>
              <ul className="space-y-3">
                {comparison.option1Pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-base leading-relaxed text-gray-700">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-red-700">
                ✗ Cons
              </h4>
              <ul className="space-y-3">
                {comparison.option1Cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-base leading-relaxed text-gray-700">
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Option 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              {comparison.option2.name}
            </h3>
            <div className="mb-8">
              <h4 className="mb-4 text-lg font-semibold text-green-700">
                ✓ Pros
              </h4>
              <ul className="space-y-3">
                {comparison.option2Pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-base leading-relaxed text-gray-700">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-red-700">
                ✗ Cons
              </h4>
              <ul className="space-y-3">
                {comparison.option2Cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-base leading-relaxed text-gray-700">
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="mb-20">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
          When to Use Each
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          <div className="bg-primary/5 rounded-3xl p-8 shadow-sm">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Choose {comparison.option1.name}
            </h3>
            <ul className="space-y-4">
              {comparison.whenToUse.option1.map((use, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    {use}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gray-100 p-8 shadow-sm">
            <h3 className="mb-6 text-2xl font-semibold text-gray-900">
              Choose {comparison.option2.name}
            </h3>
            <ul className="space-y-4">
              {comparison.whenToUse.option2.map((use, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    {use}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-20">
        <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {comparison.faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-md"
            >
              <h3 className="mb-4 text-xl leading-tight font-semibold text-gray-900 md:text-2xl">
                {faq.question}
              </h3>
              <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Conclusion
        </h2>
        <div className="rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-sm">
          <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
            {comparison.conclusion}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-white p-10 text-center shadow-lg md:p-14">
        <h2 className="mb-5 text-3xl font-bold md:text-4xl">
          {comparison.cta.text}
        </h2>
        <p className="mb-8 text-lg md:text-xl">{comparison.cta.description}</p>

        <CTABlogButton post={{ slug: comparison.title }} />
      </section>

      {/* Related Tutorials */}
      <section className="mt-20">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Follow these step-by-step tutorials to build your mobile app
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.slice(0, 3).map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/tutorials/${tutorial.slug}`}
              className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
            >
              <h3 className="group-hover:text-primary mb-3 text-lg font-semibold text-gray-900">
                {tutorial.title}
              </h3>
              <p className="mb-3 text-sm text-gray-500">
                {tutorial.timeToComplete} • {tutorial.difficulty}
              </p>
              <p className="text-base text-gray-600">{tutorial.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Related Comparisons */}
      <section className="mt-20">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Related Comparisons
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons
            .filter((c) => c.slug !== slug)
            .slice(0, 3)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/comparisons/${related.slug}`}
                className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
              >
                <h3 className="group-hover:text-primary mb-3 text-lg font-semibold text-gray-900">
                  {related.title}
                </h3>
                <p className="text-base text-gray-600">
                  {related.option1.name} vs {related.option2.name}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
