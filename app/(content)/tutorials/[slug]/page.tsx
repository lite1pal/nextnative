import { tutorials } from "./tutorials-data";
import type { Metadata } from "next";
import TutorialPageView from "./view";
import { notFound } from "next/navigation";

// Generate static params for all tutorials
export async function generateStaticParams() {
  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) return {};

  return {
    title: tutorial.metaTitle,
    description: tutorial.metaDescription,
    alternates: {
      canonical: `https://nextnative.dev/tutorials/${slug}`,
    },
    openGraph: {
      title: tutorial.metaTitle,
      description: tutorial.metaDescription,
      url: `https://nextnative.dev/tutorials/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.metaTitle,
      description: tutorial.metaDescription,
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  return <TutorialPageView slug={slug} tutorial={tutorial} />;
}
