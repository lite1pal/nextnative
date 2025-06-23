import HighlightedSpan from "@/components/HighlightedSpan";
import Logo from "@/components/Logo";
import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTABlogButton from "./CTABlogButton";
import { Breadcrumbs } from "./Breadcrumbs";
import { AvatarList, RatingSvg } from "@/components/HeroSection2";

export const revalidate = 60; // Revalidate every 60 seconds

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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://nextnative.dev/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
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

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[1fr_400px] w-full gap-10 px-4 py-8 max-w-[962px] xl:max-w-[1260px] mx-auto">
      <article className="prose max-w-3xl flex-1 min-h-screen prose-a:text-primary prose-a:no-underline">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <h1>{post.title}</h1>
        <p className="text-gray-500">{formattedDate}</p>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg my-6"
          />
        )}

        <p className="text-gray-500">{post.description}</p>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <aside className="hidden relative lg:block w-full max-w-md">
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className="sticky top-20 rounded-xl p-6 bg-white"
        >
          <div className="text-center items-center flex flex-col">
            <Logo />
            <h3 className="text-xl mt-7 font-semibold">
              Launch mobile apps with <HighlightedSpan>Next.js</HighlightedSpan>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Skip native dev. Use Capacitor + Next.js to go live fast.
            </p>
            <CTABlogButton post={{ slug: post.slug }} />
            <p className="mt-3 text-xs text-pink-600 font-medium">
              🎁 70% off – 3 left
            </p>
            <div className="flex mt-5 gap-2 items-center">
              <div className="relative">
                <AvatarList size="sm" />
              </div>
              <div className="flex flex-col items-start">
                <RatingSvg />
                <div className="font-medium text-xs text-gray-500 pl-2">
                  Loved by makers
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
