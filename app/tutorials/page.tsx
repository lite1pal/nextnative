import Link from "next/link";
import { tutorials } from "./[slug]/tutorials-data";
import type { Metadata } from "next";
import { Clock, ChevronRight, BookOpen } from "lucide-react";
import CTABlogButton from "../blog/[slug]/CTABlogButton";

export const metadata: Metadata = {
  title: "NextNative Tutorials - Learn to Build Mobile Apps with Next.js",
  description:
    "Step-by-step tutorials to help you convert your Next.js website to a mobile app, add push notifications, setup in-app purchases, and deploy to app stores.",
  alternates: {
    canonical: "https://nextnative.dev/tutorials",
  },
  openGraph: {
    title: "NextNative Tutorials - Learn to Build Mobile Apps with Next.js",
    description:
      "Step-by-step tutorials to help you convert your Next.js website to a mobile app, add push notifications, setup in-app purchases, and deploy to app stores.",
    url: "https://nextnative.dev/tutorials",
  },
};

const categories = [
  {
    id: "getting-started",
    name: "Getting Started",
    description:
      "Essential tutorials for converting your Next.js app to mobile",
    icon: "🚀",
  },
  {
    id: "features",
    name: "Features",
    description: "Add powerful mobile features to your app",
    icon: "⚡",
  },
  {
    id: "deployment",
    name: "Deployment",
    description: "Deploy your app to iOS and Android app stores",
    icon: "📱",
  },
  {
    id: "optimization",
    name: "Optimization",
    description: "Optimize performance and user experience",
    icon: "🎯",
  },
  {
    id: "integration",
    name: "Integration",
    description: "Integrate third-party services and APIs",
    icon: "🔗",
  },
];

const difficultyColor = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-7xl py-16">
      {/* Header */}
      <div className="mb-20 text-center">
        <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
          NextNative <span className="text-primary">Tutorials</span>
        </h1>
        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
          Learn how to build, optimize, and deploy mobile apps using Next.js and
          Capacitor. Step-by-step guides for every skill level.
        </p>
      </div>

      {/* Category Sections */}
      <div className="space-y-20">
        {categories.map((category) => {
          const categoryTutorials = tutorials.filter(
            (tutorial) => tutorial.category === category.id,
          );

          if (categoryTutorials.length === 0) return null;

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

              {/* Tutorials Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {categoryTutorials.map((tutorial) => (
                  <Link
                    key={tutorial.slug}
                    href={`/tutorials/${tutorial.slug}`}
                    className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl"
                  >
                    {/* Tutorial Meta */}
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-base font-medium ${
                          difficultyColor[tutorial.difficulty]
                        }`}
                      >
                        {tutorial.difficulty.charAt(0).toUpperCase() +
                          tutorial.difficulty.slice(1)}
                      </span>
                      <span className="flex items-center gap-2 text-base text-gray-600">
                        <Clock className="h-5 w-5" />
                        {tutorial.timeToComplete}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="group-hover:text-primary mb-4 text-xl leading-tight font-semibold text-gray-900 md:text-2xl">
                      {tutorial.title}
                    </h3>

                    {/* Summary */}
                    <p className="mb-5 line-clamp-3 text-base leading-relaxed text-gray-600 md:text-lg">
                      {tutorial.summary}
                    </p>

                    {/* What You'll Learn */}
                    <div className="mb-5 space-y-3">
                      <p className="text-base font-medium text-gray-900">
                        What you'll learn:
                      </p>
                      <ul className="space-y-2">
                        {tutorial.whatYoullLearn
                          .slice(0, 3)
                          .map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-600 md:text-base"
                            >
                              <ChevronRight className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {/* Steps Count */}
                    <div className="flex items-center gap-2 text-base text-gray-500">
                      <BookOpen className="h-5 w-5" />
                      {tutorial.steps.length} steps
                    </div>

                    {/* Read More Link */}
                    <div className="group-hover:text-primary mt-5 flex items-center gap-2 text-base font-medium text-gray-900">
                      Start Tutorial
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="mt-24 rounded-3xl bg-white p-16 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          Ready to Build Your Mobile App?
        </h2>
        <p className="mb-10 text-xl md:text-2xl">
          Get NextNative and start converting your Next.js website to a mobile
          app in minutes.
        </p>

        <CTABlogButton post={{ slug: "tutorials-hub" }} />
      </div>
    </div>
  );
}
