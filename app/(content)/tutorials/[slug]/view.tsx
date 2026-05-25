"use client";

import { Tutorial, tutorials } from "./tutorials-data";
import { comparisons } from "../../comparisons/[slug]/comparisons-data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChevronRight, Clock, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import MidTutorialCTA from "@/components/MidTutorialCTA";
import Button from "@/components/Button";

export default function TutorialPageView({
  slug,
  tutorial,
}: {
  slug: string;
  tutorial: Tutorial;
}) {
  // Generate HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.summary,
    totalTime: `PT${tutorial.timeToComplete.replace(/\s/g, "")}`,
    timeToCompleteISO: "PT30M",
    step: tutorial.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.content,
      ...(step.code && {
        itemListElement: {
          "@type": "HowToDirection",
          text: step.code.code,
        },
      }),
    })),
  };

  const difficultyColor = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <div className="mx-auto max-w-5xl py-16">
      <Script id="howto-schema" type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </Script>

      {/* Breadcrumbs */}
      <nav className="mb-10 flex items-center gap-2 text-base text-gray-600 md:text-lg">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tutorials" className="hover:text-primary">
          Tutorials
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{tutorial.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-16">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span
            className={`rounded-full px-5 py-2 text-base font-medium ${difficultyColor[tutorial.difficulty]}`}
          >
            {tutorial.difficulty.charAt(0).toUpperCase() +
              tutorial.difficulty.slice(1)}
          </span>
          <span className="flex items-center gap-2 text-lg text-gray-600">
            <Clock className="h-5 w-5" />
            {tutorial.timeToComplete}
          </span>
          <span className="flex items-center gap-2 text-lg text-gray-600">
            <Calendar className="h-5 w-5" />
            Updated {tutorial.lastUpdated}
          </span>
        </div>

        <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
          {tutorial.title}
        </h1>

        <p className="text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
          {tutorial.summary}
        </p>
      </header>

      {/* High-intent shortcut CTA – only for the convert-nextjs-to-mobile-app tutorial */}
      {slug === "convert-nextjs-to-mobile-app" && (
        <section className="mb-16 rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Skip manual setup. Get everything pre-built
            </h2>
          </div>
          <p className="mb-6 text-lg text-gray-700 md:text-xl">
            NextNative includes Next.js + Capacitor, auth, payments, push
            notifications, database, and 7 template apps. Start shipping in 5
            minutes.
          </p>
          <div className="mb-6 grid gap-4 py-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Auth & onboarding</p>
                <p className="text-sm text-gray-600">Ready to customize</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  Payments & subscriptions
                </p>
                <p className="text-sm text-gray-600">RevenueCat integrated</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">7 template apps</p>
                <p className="text-sm text-gray-600">Launch guides included</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#pricing">
              <Button variant="primary">Get NextNative - $125 →</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">See All Features</Button>
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 sm:text-left">
            50% off · One-time payment · Unlimited apps guarantee
          </p>
        </section>
      )}

      {/* Prerequisites */}
      {tutorial.prerequisites.length > 0 && (
        <section className="mb-16 rounded-3xl bg-blue-50 p-10">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-gray-900 md:text-4xl">
            📋 Prerequisites
          </h2>
          <ul className="space-y-4">
            {tutorial.prerequisites.map((prereq, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
                <span className="text-lg leading-relaxed text-gray-700 md:text-xl">
                  {prereq}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* What You'll Learn */}
      <section className="bg-primary/5 mb-16 rounded-3xl p-10">
        <h2 className="mb-6 flex items-center gap-3 text-3xl font-semibold text-gray-900 md:text-4xl">
          🎯 What You&apos;ll Learn
        </h2>
        <ul className="space-y-4">
          {tutorial.whatYoullLearn.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <CheckCircle2 className="text-primary mt-1 h-6 w-6 flex-shrink-0" />
              <span className="text-lg leading-relaxed text-gray-700 md:text-xl">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mb-16">
        <h2 className="mb-10 text-4xl font-bold text-gray-900 md:text-5xl">
          Step-by-Step Guide
        </h2>

        <div className="space-y-12">
          {tutorial.steps.map((step, index) => (
            <div key={index}>
              <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
                <div className="mb-6 flex items-start gap-5">
                  <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="pt-1 text-2xl font-semibold text-gray-900 md:text-3xl">
                    {step.title}
                  </h3>
                </div>

                <p
                  dangerouslySetInnerHTML={{ __html: step.content }}
                  className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl"
                ></p>

                {step.code && (
                  <div className="mb-6">
                    <div className="rounded-t-[0.7rem] bg-gray-700 px-5 py-3 font-mono text-base font-[500] text-white">
                      {step.code.filename}

                      {!step.code.filename && (
                        <div className="flex items-center gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-600"></div>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-600"></div>
                          <div className="h-2.5 w-2.5 rounded-full bg-gray-600"></div>
                        </div>
                      )}
                    </div>
                    <SyntaxHighlighter
                      language={step.code.language}
                      style={nightOwl}
                      customStyle={{
                        marginTop: "0",
                        borderRadius: "0rem 0rem 0.7rem 0.7rem",
                      }}
                    >
                      {step.code.code}
                    </SyntaxHighlighter>
                  </div>
                )}

                {step.note && (
                  <div className="flex items-center gap-3 rounded-xl bg-green-100 p-5">
                    <span className="text-xl">💡</span>
                    <p
                      dangerouslySetInnerHTML={{ __html: step.note }}
                      className="text-base text-green-900 md:text-xl"
                    ></p>
                  </div>
                )}
              </div>

              {/* Add strategic CTAs after key steps for convert-nextjs-to-mobile-app tutorial */}
              {slug === "convert-nextjs-to-mobile-app" && index === 3 && (
                <MidTutorialCTA
                  stepNumber={4}
                  message="NextNative has Capacitor pre-configured for production."
                />
              )}
              {slug === "convert-nextjs-to-mobile-app" && index === 5 && (
                <MidTutorialCTA
                  stepNumber={6}
                  message="Build scripts already set up in NextNative."
                />
              )}
              {slug === "convert-nextjs-to-mobile-app" && index === 8 && (
                <MidTutorialCTA
                  stepNumber={9}
                  message="Auth, push notifications, and in-app purchases included."
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main CTA */}
      <div className="mt-24 mb-20 rounded-3xl bg-white p-12 text-center shadow-xl md:p-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl">🚀</span>
            <h2 className="text-4xl font-bold md:text-5xl">
              Ready to Ship Faster?
            </h2>
          </div>
          <p className="mb-10 text-xl text-gray-700 md:text-2xl">
            Get Next.js + Capacitor with auth, in-app purchases, push
            notifications, database, and 7 template apps. Everything you need to
            launch.
          </p>

          <div className="mb-10 flex flex-col items-center gap-4">
            <Link href="/#pricing">
              <Button variant="primary">Get NextNative - 50% Off →</Button>
            </Link>
            <p className="text-base text-gray-600">$125 · Unlimited apps</p>
          </div>

          {/* Trust badges */}
          <div className="border-primary/10 mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-6 border-t pt-8 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-5 w-5" />
              Lifetime updates
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-5 w-5" />3 months support
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-5 w-5" />
              Team license
            </span>
          </div>
        </div>
      </div>

      {/* Related Tutorials */}
      {tutorial.relatedTutorials.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
            Related Tutorials
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {tutorial.relatedTutorials
              .map((slug) => tutorials.find((t) => t.slug === slug))
              .filter((t) => t !== undefined)
              .map((related) => (
                <Link
                  key={related!.slug}
                  href={`/tutorials/${related!.slug}`}
                  className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-4 py-1.5 text-base font-medium ${difficultyColor[related!.difficulty]}`}
                    >
                      {related!.difficulty}
                    </span>
                    <span className="flex items-center gap-2 text-base text-gray-600">
                      <Clock className="h-4 w-4" />
                      {related!.timeToComplete}
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mb-3 text-xl font-semibold text-gray-900 md:text-2xl">
                    {related!.title}
                  </h3>
                  <p className="line-clamp-2 text-lg leading-relaxed text-gray-600">
                    {related!.summary}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Related Comparisons */}
      <section className="mb-16">
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Compare Mobile Frameworks
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Still deciding on your tech stack? Check out these comparisons
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.slice(0, 3).map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/comparisons/${comparison.slug}`}
              className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg"
            >
              <h3 className="group-hover:text-primary mx-auto w-fit text-lg font-semibold text-gray-900">
                {comparison.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Documentation Links */}
      <section className="mt-20 rounded-3xl bg-white p-10">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          📚 Ship mobile apps faster
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
          Explore detailed documentation to see features and shortcuts
          NextNative gives you to ship mobile apps faster.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="https://nextnative.dev/docs"
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg"
          >
            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold text-gray-900">
              📖 Full Documentation
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              Complete guides, API references, and best practices for building
              mobile apps with NextNative.
            </p>
          </Link>
          <Link
            href="https://nextnative.dev/docs/tutorials/ship-in-5-minutes"
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg"
          >
            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold text-gray-900">
              🚀 Quick Start Guide
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              Get your app up and running in just 5 minutes with our quick start
              tutorial.
            </p>
          </Link>
          <Link
            href="https://nextnative.dev/docs/features/push-notifications"
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg"
          >
            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold text-gray-900">
              🔔 Push Notifications
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              Learn how to set up and customize push notifications for your
              mobile app.
            </p>
          </Link>
          <Link
            href="https://nextnative.dev/docs/features/in-app-purchases"
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg"
          >
            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold text-gray-900">
              💰 In-App Purchases
            </h3>
            <p className="text-base leading-relaxed text-gray-600">
              Implement monetization with in-app purchases using RevenueCat
              integration.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
