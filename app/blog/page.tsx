import { Metadata } from "next";
import BlogViewPage from "./view";

export const metadata: Metadata = {
  title: "NextNative Blog",
  description:
    "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
  alternates: {
    canonical: "https://nextnative.dev/blog",
  },
  openGraph: {
    title: "NextNative Blog",
    description:
      "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
    url: "https://nextnative.dev/blog",
  },
  twitter: {
    card: "summary",
    title: "NextNative Blog",
    description:
      "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor",
  },
};

export const revalidate = 3600;

export default function BlogListPage() {
  return <BlogViewPage />;
}
