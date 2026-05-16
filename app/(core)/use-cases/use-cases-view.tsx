"use client";

import Link from "next/link";
import { useCases } from "./[slug]/use-cases-data";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import CTAButtonSecondary from "@/components/CTASecondary";

const categories = [
  {
    id: "productivity",
    name: "Productivity & Tools",
    description: "Task managers, note-taking, and productivity apps",
    icon: "✅",
  },
  {
    id: "education",
    name: "Education & Learning",
    description: "E-learning platforms, courses, and educational tools",
    icon: "📚",
  },
  {
    id: "commerce",
    name: "E-commerce & Delivery",
    description: "Shopping apps, food delivery, and marketplace platforms",
    icon: "🛍️",
  },
  {
    id: "health",
    name: "Health & Fitness",
    description: "Workout tracking, nutrition apps, and wellness platforms",
    icon: "💪",
  },
  {
    id: "social",
    name: "Social & Community",
    description: "Social networks, messaging, and community platforms",
    icon: "👥",
  },
];

const categoryColors = {
  health: "bg-red-100 text-red-800",
  commerce: "bg-blue-100 text-blue-800",
  social: "bg-purple-100 text-purple-800",
  education: "bg-green-100 text-green-800",
  productivity: "bg-yellow-100 text-yellow-800",
  entertainment: "bg-pink-100 text-pink-800",
};

function UseCasesView() {
  return (
    <>
      {/* Category Sections */}
      <div className="space-y-20">
        {categories.map((category) => {
          const categoryUseCases = useCases.filter(
            (useCase) => useCase.category === category.id,
          );

          if (categoryUseCases.length === 0) return null;

          return (
            <section key={category.id}>
              {/* Category Header */}
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-5xl">{category.icon}</span>
                  <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
                    {category.name}
                  </h2>
                </div>
                <p className="text-xl text-gray-600 md:text-2xl">
                  {category.description}
                </p>
              </div>

              {/* Use Cases Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {categoryUseCases.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/use-cases/${useCase.slug}`}
                    className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl"
                  >
                    {/* Icon & Category Badge */}
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-5xl">{useCase.icon}</span>
                      <span
                        className={`rounded-full px-4 py-1.5 text-base font-medium ${
                          categoryColors[useCase.category]
                        }`}
                      >
                        {useCase.category.charAt(0).toUpperCase() +
                          useCase.category.slice(1)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="group-hover:text-primary mb-4 text-xl leading-tight font-semibold text-gray-900 md:text-2xl">
                      {useCase.title}
                    </h3>

                    {/* Summary */}
                    <p className="mb-6 line-clamp-3 text-base leading-relaxed text-gray-600 md:text-lg">
                      {useCase.summary}
                    </p>

                    {/* Key Features Preview */}
                    <div className="mb-6 space-y-3">
                      <p className="text-base font-medium text-gray-900">
                        Key features:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.keyFeatures
                          .slice(0, 4)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                            >
                              <span>{feature.icon}</span>
                              <span>{feature.title}</span>
                            </span>
                          ))}
                        {useCase.keyFeatures.length > 4 && (
                          <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium">
                            +{useCase.keyFeatures.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Screenshots Preview */}
                    {useCase.images && useCase.images.length > 0 && (
                      <div className="mb-6">
                        <div className="relative -mx-4 flex flex-wrap gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:gap-0">
                          {useCase.images.slice(0, 4).map((image, idx) => (
                            <div
                              key={idx}
                              className="relative mx-auto h-44 w-28 flex-shrink-0 overflow-hidden rounded-xl shadow-lg"
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover"
                                width={112}
                                height={192}
                                sizes="(max-width: 768px) 70vw, 28vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View Details Link */}
                    <div className="group-hover:text-primary flex items-center gap-2 text-base font-medium text-gray-900">
                      View Full Details
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 flex flex-col items-center gap-5 rounded-2xl bg-white p-16 text-center">
        <h2 className="mb-4 text-5xl font-bold text-gray-900">
          Ready to build your mobile app?
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          NextNative provides everything you need to ship iOS and Android apps
          with Next.js + Capacitor in minutes.
        </p>

        <div className="flex flex-col gap-3 md:flex-row">
          <Link href="/#pricing">
            <CTAButton />
          </Link>
          <CTAButtonSecondary />
        </div>
      </div>

      {/* Why Choose NextNative */}
      <section className="mt-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 md:text-5xl">
          Why choose NextNative?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">
            <div className="mb-4 text-5xl">⚡</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              Fast Development
            </h3>
            <p className="text-lg leading-relaxed text-gray-600">
              Launch in weeks, not months. Pre-built components and features
              ready to use.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">
            <div className="mb-4 text-5xl">💰</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              Cost Effective
            </h3>
            <p className="text-lg leading-relaxed text-gray-600">
              Save $20,000-100,000 compared to custom development or hiring
              agencies.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900">
              Production Ready
            </h3>
            <p className="text-lg leading-relaxed text-gray-600">
              Battle-tested code, best practices, and everything you need for
              app stores.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default UseCasesView;
