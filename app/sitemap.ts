// app/sitemap.ts
import { prisma } from "@/prisma/client";
import type { MetadataRoute } from "next";
import { comparisons } from "./comparisons/[slug]/comparisons-data";
import { tutorials } from "./tutorials/[slug]/tutorials-data";
import { alternatives } from "./alternatives/[slug]/alternatives-data";
import { useCases } from "./use-cases/[slug]/use-cases-data";

export const revalidate = 600; // 10 minutes in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noindexSlugs = [
    "software-deployment-best-practices",
    "code-review-best-practices",
    "types-of-open-source-software-licenses",
  ];

  const topFreeTools = new Set([
    "/free-tools/app-icon-splash-generator",
    "/free-tools/app-store-screenshot-generator",
    "/free-tools/pwa-manifest-generator",
  ]);

  const topBlogSlugs = new Set([
    "capacitor-vs-react-native",
    "best-cross-platform-frameworks",
    "typescript-mobile-app-development",
    "android-ssl-certificate-pinning",
    "capacitor-push-notifications",
  ]);

  const posts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
    where: {
      slug: { notIn: noindexSlugs },
    },
  });

  const baseUrl = "https://nextnative.dev";
  const currentDate = new Date();
  const staticPagesLastModified = new Date("2025-10-07");

  const docs = [
    "https://nextnative.dev/docs",
    "https://nextnative.dev/docs/tutorials/ship-in-5-minutes",
    "https://nextnative.dev/docs/tutorials/ionic-router",
    "https://nextnative.dev/docs/tutorials/native-device-features",
    "https://nextnative.dev/docs/tutorials/splash-screen",
    "https://nextnative.dev/docs/tutorials/onboarding-flow",
    "https://nextnative.dev/docs/features/database",
    "https://nextnative.dev/docs/features/nextjs-api",
    "https://nextnative.dev/docs/features/authorization",
    "https://nextnative.dev/docs/features/in-app-purchases",
    "https://nextnative.dev/docs/features/push-notifications",
    "https://nextnative.dev/docs/preparing-for-deployment/rename-your-app",
    "https://nextnative.dev/docs/preparing-for-deployment/change-app-icon",
    "https://nextnative.dev/docs/preparing-for-deployment/build-app-for-production",
    "https://nextnative.dev/docs/components/screen-container",
    "https://nextnative.dev/docs/components/modal",
  ];

  const freeTools = [
    "https://nextnative.dev/free-tools/app-icon-splash-generator",
    "https://nextnative.dev/free-tools/app-revenue-calculator",
    "https://nextnative.dev/free-tools/app-privacy-policy-generator",
    "https://nextnative.dev/free-tools/pwa-manifest-generator",
    "https://nextnative.dev/free-tools/capacitor-config-generator",
    "https://nextnative.dev/free-tools/ios-bundle-id-generator",
    "https://nextnative.dev/free-tools/app-idea-generator",
    "https://nextnative.dev/free-tools/app-name-generator",
    "https://nextnative.dev/free-tools/app-store-metadata-generator",
    "https://nextnative.dev/free-tools/app-store-screenshot-generator",
    "https://nextnative.dev/free-tools/play-store-privacy-policy",
    "https://nextnative.dev/free-tools/app-store-keyword-research",
    "https://nextnative.dev/free-tools/app-store-screenshot-sizes",
    "https://nextnative.dev/free-tools/app-store-connect-api",
    "https://nextnative.dev/free-tools/create-android-keystore",
    "https://nextnative.dev/free-tools/app-store-fees",
  ];

  const freeComponents = [
    "https://nextnative.dev/components",
    "https://nextnative.dev/components/buttons",
    "https://nextnative.dev/components/screens/pricing-screens",
  ];

  const costPages = [
    "https://nextnative.dev/cost/how-much-does-it-cost-to-build-an-app",
    "https://nextnative.dev/cost/app-development-cost-calculator",
    "https://nextnative.dev/cost/react-native-developer-salary",
    "https://nextnative.dev/cost/cost-to-publish-app-on-app-store",
  ];

  const comparisonUrls = comparisons.map(
    (comparison) => `https://nextnative.dev/comparisons/${comparison.slug}`,
  );

  const tutorialUrls = tutorials.map(
    (tutorial) => `https://nextnative.dev/tutorials/${tutorial.slug}`,
  );

  const alternativeUrls = alternatives.map(
    (alternative) => `https://nextnative.dev/alternatives/${alternative.slug}`,
  );

  const useCaseUrls = useCases.map(
    (useCase) => `https://nextnative.dev/use-cases/${useCase.slug}`,
  );

  return [
    // Core Pages
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/free-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/convert-website-to-app`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/showcase`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticPagesLastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/comparisons`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },

    // Blog Posts
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: topBlogSlugs.has(post.slug) ? 0.8 : 0.65,
    })),

    // Free Tools
    ...freeTools.map((freeTool) => ({
      url: freeTool,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: topFreeTools.has(new URL(freeTool).pathname) ? 0.95 : 0.85,
    })),

    // Free Components
    ...freeComponents.map((freeComponent) => ({
      url: freeComponent,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.65,
    })),

    // Cost Pages
    ...costPages.map((costPage) => ({
      url: costPage,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),

    // Documentation
    ...docs.map((doc) => ({
      url: doc,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: doc === `${baseUrl}/docs` ? 0.95 : 0.8,
    })),

    // Tutorials
    ...tutorialUrls.map((url) => ({
      url,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Comparisons
    ...comparisonUrls.map((url) => ({
      url,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // Use Cases
    ...useCaseUrls.map((url) => ({
      url,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),

    // Alternatives
    ...alternativeUrls.map((url) => ({
      url,
      lastModified: staticPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
