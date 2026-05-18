import Link from "next/link";
import { ChevronRight, Clock, DollarSign } from "lucide-react";
import { useCases } from "@/app/(core)/use-cases/[slug]/use-cases-data";

export default function UseCaseCTA() {
  // Featured use cases - pick the most popular ones
  const featuredUseCases = [
    useCases.find((uc) => uc.slug === "fitness-app"),
    useCases.find((uc) => uc.slug === "food-delivery-app"),
    useCases.find((uc) => uc.slug === "social-media-app"),
  ].filter(Boolean);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Real-World App Examples
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl dark:text-gray-400">
            See how NextNative can help you build any type of mobile app.
            Explore use cases with code examples and best practices.
          </p>
        </div>

        {/* Featured Use Cases Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {featuredUseCases.map((useCase) => {
            if (!useCase) return null;

            return (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
              >
                {/* Icon */}
                <div className="mb-4 text-5xl">{useCase.icon}</div>

                {/* Title */}
                <h3 className="group-hover:text-primary mb-3 text-xl leading-tight font-semibold text-gray-900 dark:text-white">
                  {useCase.title}
                </h3>

                {/* Summary */}
                <p className="mb-4 line-clamp-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {useCase.summary}
                </p>

                {/* Key Features Preview */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {useCase.keyFeatures.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <span>{feature.icon}</span>
                      <span className="text-xs">{feature.title}</span>
                    </span>
                  ))}
                </div>

                {/* Savings */}
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-800/50">
                  <div>
                    <div className="mb-1 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>Save</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {useCase.timeSavings}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-3 w-3" />
                      <span>Save</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {useCase.costSavings.split("-")[0]}+
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="group-hover:text-primary flex items-center gap-2 font-medium text-gray-900 transition-colors dark:text-white">
                  View Details
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/use-cases"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-colors"
          >
            Explore All Use Cases
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
