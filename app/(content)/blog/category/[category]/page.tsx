import { Metadata } from "next";
import BlogCategoryView from "./view";
import { Suspense } from "react";

interface BlogTagPageProps {
  params: any;
  searchParams: any;
}

export async function generateMetadata(
  props: BlogTagPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURIComponent(params.category);
  const tagWithoutDashes = tag.replaceAll("-", " ");

  const baseTitle = `NextNative Blog - ${tagWithoutDashes}`;
  const baseDescription = `${tagWithoutDashes} - Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor`;

  return {
    title: baseTitle,
    description: baseDescription,
    alternates: {
      canonical: `https://nextnative.dev/blog/category/${encodeURIComponent(tag)}`,
    },
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: `https://nextnative.dev/blog/category/${encodeURIComponent(tag)}`,
    },
    twitter: {
      card: "summary",
      title: baseTitle,
      description: baseDescription,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function BlogCategoryPage(props: BlogTagPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <svg
            className="text-primary h-8 w-8 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      }
    >
      <BlogCategoryView params={props.params} />
    </Suspense>
  );
}
