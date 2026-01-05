import { alternatives } from "./[slug]/alternatives-data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title:
    "Alternatives to React Native, Flutter & Expo | Build with Next.js + Capacitor",
  description:
    "Looking for alternatives to React Native, Flutter, Expo, Ionic, or Cordova? Build iOS and Android apps with Next.js + Capacitor. Use web technologies you already know.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: {
    canonical: "/alternatives",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Mobile Development Alternatives | NextNative",
    description:
      "Build mobile apps without React Native, Flutter, or Expo. Use Next.js + Capacitor to create iOS and Android apps with web technologies.",
    url: "https://nextnative.dev/alternatives",
    siteName: "NextNative",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextNative - Build mobile apps with Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Development Alternatives | NextNative",
    description:
      "Build mobile apps without React Native, Flutter, or Expo. Use Next.js + Capacitor.",
    images: ["/opengraph-image.png"],
  },
};

export default function AlternativesPage() {
  const categories = [
    {
      title: "Native Framework Alternatives",
      description:
        "Build mobile apps without learning mobile-specific frameworks",
      alternatives: alternatives.filter((alt) =>
        ["react-native-alternative", "flutter-alternative"].includes(alt.slug),
      ),
    },
    {
      title: "Hybrid Framework Alternatives",
      description: "Modern alternatives to older hybrid frameworks",
      alternatives: alternatives.filter((alt) =>
        [
          "expo-alternative",
          "ionic-alternative",
          "cordova-alternative",
        ].includes(alt.slug),
      ),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mobile Development Alternatives",
    description:
      "Alternatives to React Native, Flutter, Expo, Ionic, and Cordova for building mobile apps with web technologies.",
    url: "https://nextnative.dev/alternatives",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: alternatives.map((alt, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TechArticle",
          name: alt.title,
          description: alt.metaDescription,
          url: `https://nextnative.dev/alternatives/${alt.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-8 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl">
            Mobile Development{" "}
            <span className="text-primary">Alternatives</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
            Don&apos;t want to learn React Native, Flutter, or Dart? Build iOS
            and Android apps with JavaScript, React, and web tools you already
            know.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-primary mb-2 text-4xl font-bold">100%</div>
            <div className="text-lg text-gray-600">
              Code sharing across web & mobile
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-primary mb-2 text-4xl font-bold">3-5x</div>
            <div className="text-lg text-gray-600">Faster development time</div>
          </div>
          {/* <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="text-primary mb-2 text-4xl font-bold">$299</div>
            <div className="text-lg text-gray-600">
              One-time, build unlimited apps
            </div>
          </div> */}
        </div>

        {/* Category Sections */}
        <div className="space-y-20">
          {categories.map((category) => (
            <section key={category.title}>
              {/* Category Header */}
              <div className="mb-10">
                <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-600 md:text-2xl">
                  {category.description}
                </p>
              </div>

              {/* Alternatives Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {category.alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/alternatives/${alt.slug}`}
                    className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <div>
                        <div className="mb-2 text-sm text-gray-500">
                          Alternative to
                        </div>
                        <h3 className="text-2xl leading-tight font-bold text-gray-900 md:text-3xl">
                          {alt.alternativeName}
                        </h3>
                      </div>
                      <ChevronRight className="group-hover:text-primary mt-1 h-6 w-6 text-gray-400 transition-all group-hover:translate-x-1" />
                    </div>

                    <p className="mb-5 line-clamp-3 text-base leading-relaxed text-gray-600 md:text-lg">
                      {alt.quickAnswer}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium">
                        JavaScript/TypeScript
                      </span>
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium">
                        Next.js
                      </span>
                      <span className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium">
                        Capacitor
                      </span>
                    </div>

                    {/* Read More Link */}
                    <div className="group-hover:text-primary flex items-center gap-2 text-base font-medium text-gray-900 transition-colors">
                      Learn More
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Why Next.js + Capacitor */}
        <div className="mt-20 rounded-3xl border border-gray-200 bg-white p-12 shadow-sm">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            Why Choose Next.js + Capacitor?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-primary mb-3 text-xl font-semibold md:text-2xl">
                Use skills you already have
              </h3>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                No need to learn React Native, Flutter, or Dart. Build mobile
                apps with JavaScript, React, and HTML/CSS—the same tools you use
                for web development.
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-3 text-xl font-semibold md:text-2xl">
                Share 100% of your code
              </h3>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                Build once, deploy everywhere. Your Next.js web app becomes your
                iOS and Android app. No separate codebases, no platform-specific
                code.
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-3 text-xl font-semibold md:text-2xl">
                Ship 3-5x faster
              </h3>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                Instant hot reload, browser DevTools, and familiar web
                development workflow. Build features faster than with native
                frameworks.
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-3 text-xl font-semibold md:text-2xl">
                Lower development costs
              </h3>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                Hire web developers instead of specialized mobile developers.
                One team builds for web, iOS, and Android with shared code.
              </p>
            </div>
          </div>
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

          <Link href="/">
            <CTA />
          </Link>
        </div>
      </div>
    </>
  );
}
