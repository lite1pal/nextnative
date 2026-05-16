import Link from "next/link";
import { ChevronRight, BookOpen, Clock } from "lucide-react";
import { tutorials } from "@/app/(content)/tutorials/[slug]/tutorials-data";

const difficultyColor = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function TutorialCTA() {
  // Featured tutorials - pick the most popular ones
  const featuredTutorials = tutorials.slice(0, 3);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
            Learn to Build Mobile Apps
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl dark:text-gray-400">
            Step-by-step tutorials to help you convert your Next.js app to
            mobile, add powerful features, and deploy to app stores.
          </p>
        </div>

        {/* Featured Tutorials Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {featuredTutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/tutorials/${tutorial.slug}`}
              className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Tutorial Meta */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    difficultyColor[tutorial.difficulty]
                  }`}
                >
                  {tutorial.difficulty.charAt(0).toUpperCase() +
                    tutorial.difficulty.slice(1)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  {tutorial.timeToComplete}
                </span>
              </div>

              {/* Title */}
              <h3 className="group-hover:text-primary mb-3 text-xl leading-tight font-semibold text-gray-900 dark:text-white">
                {tutorial.title}
              </h3>

              {/* Summary */}
              <p className="mb-4 line-clamp-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {tutorial.summary}
              </p>

              {/* Steps Count */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                <BookOpen className="h-4 w-4" />
                {tutorial.steps.length} steps
              </div>

              {/* Read More Link */}
              <div className="group-hover:text-primary mt-4 flex items-center gap-2 font-medium text-gray-900 transition-colors dark:text-white">
                Start Tutorial
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/tutorials"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-colors"
          >
            View All Tutorials
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
