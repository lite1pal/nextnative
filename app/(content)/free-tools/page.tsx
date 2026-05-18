"use client";

import HighlightedSpan from "@/components/HighlightedSpan";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

function Page() {
  const tools = [
    {
      title: "App Idea Generator",
      description:
        "Get fresh mobile app ideas with features and monetization suggestions.",
      link: "/free-tools/app-idea-generator",
    },
    {
      title: "App Name Generator",
      description:
        "Generate brandable app name ideas with domain suggestions. Short, punchy, two-word, and invented styles.",
      link: "/free-tools/app-name-generator",
    },
    {
      title: "App Store Metadata Generator",
      description:
        "Create App Store & Google Play titles, subtitles, keywords CSV, and descriptions.",
      link: "/free-tools/app-store-metadata-generator",
    },
    {
      title: "App Store Screenshot Generator",
      description:
        "Generate beautiful App Store and Google Play screenshots with device frames.",
      link: "/free-tools/app-store-screenshot-generator",
    },
    {
      title: "App Icon & Splash Screen Generator",
      description:
        "Upload one image to instantly generate all required iOS and Android app icons and splash screens.",
      link: "/free-tools/app-icon-splash-generator",
    },
    {
      title: "Preview Website on Mobile Device",
      description: "Test how your web app would look on a mobile device.",
      link: "/convert-website-to-app",
    },
    {
      title: "App Revenue Calculator",
      description:
        "Estimate your app's net revenue after App Store, Google Play, and RevenueCat fees.",
      link: "/free-tools/app-revenue-calculator",
    },
    {
      title: "PWA Manifest Generator",
      description: "Generate a valid PWA manifest.json file in seconds.",
      link: "/free-tools/pwa-manifest-generator",
    },
    {
      title: "App Privacy Policy Generator",
      description:
        "Create a customizable privacy policy for your iOS, Android, or web app in minutes.",
      link: "/free-tools/app-privacy-policy-generator",
    },
    {
      title: "Play Store Privacy Policy Generator",
      description:
        "Generate a Google Play compliant privacy policy for your Android app instantly.",
      link: "/free-tools/play-store-privacy-policy",
    },
    {
      title: "Capacitor Config Generator",
      description:
        "Create a valid capacitor.config.ts for your Next.js or web app. Copy or download instantly.",
      link: "/free-tools/capacitor-config-generator",
    },
    {
      title: "iOS Bundle ID Generator",
      description:
        "Generate a reverse-domain bundle identifier like com.company.app for Xcode and Capacitor.",
      link: "/free-tools/ios-bundle-id-generator",
    },
    {
      title: "App Store Screenshot Sizes",
      description:
        "Complete reference for iOS App Store and Google Play screenshot dimensions. Updated for 2025 with latest devices.",
      link: "/free-tools/app-store-screenshot-sizes",
    },
    {
      title: "App Store Fees Calculator",
      description:
        "Calculate how much Apple App Store or Google Play Store takes from your revenue. Updated for 2025.",
      link: "/free-tools/app-store-fees",
    },
    {
      title: "Create Android Keystore",
      description:
        "Generate keytool commands to create Android keystores for signing APKs and AABs. Includes Capacitor setup.",
      link: "/free-tools/create-android-keystore",
    },
    {
      title: "App Store Connect API Setup",
      description:
        "Complete guide to App Store Connect API keys for Fastlane, CI/CD, and automated publishing.",
      link: "/free-tools/app-store-connect-api",
    },
    {
      title: "App Store Keyword Research",
      description:
        "Discover the best keywords for your app with difficulty ratings and search volume estimates. Free ASO tool.",
      link: "/free-tools/app-store-keyword-research",
    },
  ];

  // JSON-LD: Breadcrumb + ItemList of tools
  const jsonLd = useMemo(() => {
    const base = "https://nextnative.dev";
    return [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free tools",
            item: `${base}/free-tools`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Free mobile app developer tools",
        itemListElement: tools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}${t.link}`,
          item: {
            "@type": "SoftwareApplication",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "iOS, Android, Web",
            name: t.title,
            description: t.description,
            url: `${base}${t.link}`,
            offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
          },
        })),
      },
    ];
  }, []);

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            Free tools for <HighlightedSpan>mobile development</HighlightedSpan>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            A growing collection of free tools to help you build, test, and
            publish mobile apps faster.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.link}
              className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              aria-label={`${tool.title} – ${tool.description}`}
            >
              <h3 className="group-hover:text-primary mb-2 text-2xl font-semibold text-gray-900">
                {tool.title}
              </h3>
              <p className="text-lg text-gray-600">{tool.description}</p>

              <span className="text-primary mt-10 inline-flex items-center gap-1 text-xl font-[500]">
                Use tool <ArrowRight className="mt-0.5" size={20} />
              </span>
            </Link>
          ))}
        </div>

        {/* Keyword-rich supportive copy */}
        <section className="mx-auto mt-14 max-w-3xl text-center text-base leading-7 text-gray-600">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Free app developer tools for iOS, Android & Web
          </h2>
          <p>
            This hub includes <strong>free mobile app tools</strong> like an{" "}
            <strong>app icon generator</strong>,{" "}
            <strong>PWA manifest generator</strong>,{" "}
            <strong>privacy policy generator</strong>, and{" "}
            <strong>app revenue calculator</strong>. Each tool is built for
            developers shipping apps with Next.js and Capacitor.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Page;
