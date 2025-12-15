import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import NextNativeCard from "./NextNativeCard";
import { rehype } from "rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { JSDOM } from "jsdom";
import TableOfContents from "./TableOfContents";
import MobileCTAClient from "./MobileCTA";
import PostInternalLinks from "./PostInternalLinks";

function extractHeadings(html: string) {
  const dom = new JSDOM(html);
  const headings = [...dom.window.document.querySelectorAll("h2")];
  return headings.map((h) => ({
    id: h.id,
    text: h.textContent || "",
    level: h.tagName.toLowerCase(),
  }));
}

async function addAnchorsToHeadings(html: string): Promise<string> {
  const result = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["inline-anchor"],
      },
      content: {
        type: "element",
        tagName: "span",
        properties: {
          className: ["text-gray-400", "text-lg", "ml-2"],
        },
        children: [{ type: "text", value: "#" }],
      },
    })
    .process(html);

  return result.toString();
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return {};

  const publishedAt = post.createdAt.toISOString();
  const updatedAt = post.updatedAt.toISOString();

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://nextnative.dev/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : [],
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      authors: ["https://nextnative.dev"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `https://nextnative.dev/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const injected = insertAfterFirstParagraph(
    post.contentHtml,
    internalLinkBlurbFor(slug),
  );

  const contentWithAnchors = await addAnchorsToHeadings(injected);

  const headings = extractHeadings(contentWithAnchors);

  return (
    <main className="mx-auto grid w-full max-w-[962px] grid-cols-1 gap-10 py-8 max-xl:overflow-hidden sm:px-4 xl:max-w-[1260px] xl:grid-cols-5">
      <div className="flex flex-col gap-10 xl:col-span-3">
        <article className="prose prose-pre:rounded-xl prose-pre:bg-gradient-to-br prose-pre:from-indigo-800 prose-pre:to-indigo-950 prose-pre:font-[600] prose-pre:text-white prose-pre:p-10 prose-pre:font-mono prose-pre:text-base prose-hr:opacity-10 prose-img:rounded-2xl sm:prose-p:text-xl sm:prose-li:text-xl sm:prose-li:leading-[38px] xl:prose-h2:pt-16 xl:prose-h3:pt-8 sm:prose-p:leading-[38px] prose-li:marker:text-primary prose-td:border-2 sm:prose-td:px-4 xl:prose-h1:text-5xl sm:prose-h2:text-3xl sm:prose-h3:text-2xl xl:prose-h1:leading-tight prose-th:border-2 prose-tr:border-2 prose-a:text-primary prose-a:no-underline min-h-screen max-w-4xl flex-1 xl:mx-auto">
          <div className="lg:px-16 xl:px-0">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title, href: `/blog/${post.slug}` },
              ]}
            />
            <h1>{post.title}</h1>

            <p className="mb-0 text-gray-500">{formattedDate}</p>
          </div>

          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
              className="my-6 w-full rounded-4xl"
            />
          )}

          <div
            className="drop-cap max-w-2xl lg:px-16 xl:px-0"
            dangerouslySetInnerHTML={{ __html: contentWithAnchors }}
          />

          <PostInternalLinks
            links={postFooterLinksFor(slug)}
            title="Next steps"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                image: post.image,
                author: {
                  "@type": "Person",
                  name: "Denis Tarasenko",
                },
                publisher: {
                  "@type": "Organization",
                  name: "NextNative.dev",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://nextnative.dev/nextnative-logo.png",
                  },
                },
                datePublished: post.createdAt.toISOString(),
                dateModified: post.updatedAt.toISOString(),

                mainEntityOfPage: `https://nextnative.dev/blog/${post.slug}`,
              }),
            }}
          />
        </article>
      </div>

      <aside className="relative mx-auto hidden w-full max-w-xl lg:block xl:col-span-2">
        <div className="sticky top-36">
          <TableOfContents headings={headings} />

          <NextNativeCard post={{ slug }} />
        </div>
      </aside>

      <MobileCTAClient showAfterPx={350}>
        <NextNativeCard post={{ slug }} />
      </MobileCTAClient>
    </main>
  );
}

function internalLinkBlurbFor(slug: string) {
  // keep it short + intent-matched (avoid cannibalization)
  const map: Record<string, string> = {
    "capacitor-vs-react-native": `
      <p class="rounded-2xl border border-gray-200 bg-gray-100 p-5">
        Using <strong>Next.js</strong>? Here’s the fastest path:
        <a href="/tutorials/convert-nextjs-to-mobile-app">convert your Next.js app to iOS &amp; Android step-by-step</a>.
      </p>
    `,
    "best-cross-platform-frameworks": `
      <p class="rounded-2xl border border-gray-200 bg-gray-100 p-5">
        If you already use <strong>Next.js</strong>, follow our
        <a href="/tutorials/convert-nextjs-to-mobile-app">Next.js → iOS &amp; Android tutorial</a>
        to ship with Capacitor (no rewrite).
      </p>
    `,
    "convert-web-app-to-mobile-app": `
      <p class="rounded-2xl border border-gray-200 bg-gray-100 p-5">
        Want the “do it” version (not theory)? Start here:
        <a href="/tutorials/convert-nextjs-to-mobile-app">Convert Next.js to iOS &amp; Android</a>.
      </p>
    `,
  };

  // default: don’t inject everywhere (avoid sitewide boilerplate)
  return map[slug] ?? "";
}

function insertAfterFirstParagraph(html: string, insertHtml: string) {
  if (!insertHtml) return html;

  // Insert right after the first </p>. If no <p>, prepend.
  const i = html.indexOf("</p>");
  if (i === -1) return insertHtml + html;

  return html.slice(0, i + 4) + insertHtml + html.slice(i + 4);
}

type FooterLink = { href: string; label: string };

function postFooterLinksFor(slug: string): FooterLink[] {
  const map: Record<string, FooterLink[]> = {
    "capacitor-vs-react-native": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Convert Next.js to iOS & Android (step-by-step)",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
      { href: "/blog/capacitor-vs-cordova", label: "Capacitor vs Cordova" },
      {
        href: "/blog/capacitor-mobile-app",
        label: "What is a Capacitor mobile app?",
      },
      { href: "/comparisons", label: "Compare mobile frameworks" },
      { href: "/showcase", label: "See real apps built with NextNative" },
      {
        href: "/free-tools/app-icon-splash-generator",
        label: "Splash Screen Generator",
      },
    ],

    "best-cross-platform-frameworks": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Convert Next.js to iOS & Android (step-by-step)",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
      {
        href: "/blog/cross-platform-app-development-tools",
        label: "Cross-platform app development tools",
      },
      {
        href: "/blog/native-vs-hybrid-app-development",
        label: "Native vs hybrid apps",
      },
      { href: "/comparisons", label: "Compare mobile frameworks" },
      { href: "/use-cases", label: "App examples you can build" },
      { href: "/free-tools/app-idea-generator", label: "App Idea Generator" },
    ],

    "typescript-mobile-app-development": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Ship a Next.js + TypeScript app to iOS & Android",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
      {
        href: "/blog/mobile-app-architecture-best-practices",
        label: "Mobile app architecture best practices",
      },
      {
        href: "/blog/improve-mobile-app-performance",
        label: "Improve mobile app performance",
      },
      {
        href: "/cost/app-development-cost-calculator",
        label: "App development cost calculator",
      },
      {
        href: "/free-tools/pwa-manifest-generator",
        label: "PWA Manifest Generator",
      },
      { href: "/docs", label: "Docs: features & setup" },
    ],

    "android-ssl-certificate-pinning": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Convert Next.js to iOS & Android (foundation setup)",
      },
      { href: "/blog/what-is-ssl-pinning", label: "What is SSL pinning?" },
      {
        href: "/blog/mobile-app-security-best-practices",
        label: "Mobile app security best practices",
      },
      {
        href: "/blog/mobile-authentication-best-practices",
        label: "Mobile authentication best practices",
      },
      { href: "/docs", label: "Docs: security & native features" },
      { href: "/pricing", label: "Pricing: get NextNative" },
    ],

    "convert-web-app-to-mobile-app": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Convert Next.js to iOS & Android (step-by-step)",
      },
      {
        href: "/blog/web-to-mobile-app",
        label: "Web to mobile app: options explained",
      },
      {
        href: "/blog/native-vs-hybrid-app-development",
        label: "Native vs hybrid apps",
      },
      { href: "/comparisons", label: "Compare mobile frameworks" },
      {
        href: "/free-tools/app-icon-splash-generator",
        label: "Generate icons & splash screens",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
    ],

    "capacitor-push-notifications": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Set up Next.js + Capacitor the right way first",
      },
      {
        href: "/docs/features/push-notifications",
        label: "Docs: Push notifications",
      },
      {
        href: "/blog/ionic-push-notifications",
        label: "Ionic push notifications",
      },
      {
        href: "/blog/push-notifications-ionic",
        label: "Push notifications in Ionic",
      },
      {
        href: "/blog/mobile-app-release-checklist",
        label: "Mobile app release checklist",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
    ],

    "improve-mobile-app-performance": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Convert Next.js to iOS & Android (clean setup)",
      },
      {
        href: "/blog/mobile-app-architecture-best-practices",
        label: "Mobile app architecture best practices",
      },
      {
        href: "/blog/mobile-app-development-challenges",
        label: "Mobile app development challenges",
      },
      {
        href: "/blog/mobile-app-quality-assurance",
        label: "Mobile QA basics",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
      { href: "/showcase", label: "See real apps & features" },
    ],

    "app-store-review-guidelines": [
      {
        href: "/tutorials/convert-nextjs-to-mobile-app",
        label: "Next.js → iOS & Android setup (submission-friendly)",
      },
      {
        href: "/blog/mobile-app-release-checklist",
        label: "Mobile app release checklist",
      },
      {
        href: "/blog/how-to-publish-app-on-google-play",
        label: "How to publish on Google Play",
      },
      {
        href: "/free-tools/app-store-screenshot-generator",
        label: "App Store Screenshot Generator",
      },
      {
        href: "/free-tools/app-store-metadata-generator",
        label: "App Store Metadata Generator",
      },
      { href: "/pricing", label: "Pricing: get NextNative" },
    ],
  };

  return map[slug] ?? [];
}
