import type { Metadata } from "next";
import ComponentWrapper from "../component-wrapper";
import { screenItems } from "./screens";
import { ScreensJsonLd } from "../JsonLd";
import Link from "next/link";

const URL = "https://nextnative.dev/components/screens";

export const metadata: Metadata = {
  title: "Mobile App Screen Templates for React & Tailwind CSS | NextNative",
  description:
    "Production-ready mobile app screen templates for React apps styled with Tailwind CSS. Includes podcast screens, leaderboards, profiles, quests, and shop screens.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Mobile App Screen Templates for React & Tailwind CSS | NextNative",
    description:
      "Ready-to-use mobile screen components for your next React app. Full UI layouts with native patterns, styled with Tailwind CSS.",
    url: URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile App Screen Templates for React & Tailwind CSS | NextNative",
    description:
      "Mobile screens you can copy-paste into React + Tailwind apps. Includes previews, code, and native-ready patterns.",
  },
};

export default function ScreensPage() {
  const toc = screenItems.map(({ id, title }) => ({ id, title }));

  return (
    <div className="pb-16">
      <ScreensJsonLd items={screenItems} />

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              React + Tailwind
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              Copy-paste code
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
              Full UI layouts
            </span>
          </div>

          <h1 className="mt-4 text-[40px] leading-[1.1] font-[600] tracking-tight sm:text-[54px]">
            Mobile Screens
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
            Production-ready screen templates that look and feel native in
            Capacitor-based apps. From podcasts to gamification, each example
            includes a live preview and code in React and TailwindCSS.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm">
              <span className="font-semibold">{screenItems.length}</span> screen
              templates
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm">
              <span className="font-semibold">Preview</span> + code tabs
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/"
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Back to NextNative
              </Link>
              <a
                href="#all"
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Browse all screens
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content grid */}
      <div
        id="all"
        className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]"
      >
        {/* Main */}
        <div className="min-w-0">
          <div className="flex flex-col gap-10">
            {screenItems.map((item) => (
              <section key={item.id} id={item.id} className="scroll-mt-24">
                <ComponentWrapper
                  heading={item.title}
                  codeExample={item.code}
                  description={item.description}
                  id={item.id}
                  fullMockup
                >
                  <item.Preview />
                </ComponentWrapper>
              </section>
            ))}
          </div>
        </div>

        {/* Right rail (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5">
            <div className="text-xs font-semibold text-gray-500">
              ON THIS PAGE
            </div>

            <ul className="mt-3 space-y-1">
              {toc.map((x) => (
                <li key={x.id}>
                  <a
                    href={`#${x.id}`}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    {x.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-xs font-semibold tracking-wide text-gray-500">
                ALSO SEE
              </div>
              <Link
                href="/components/buttons"
                className="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Buttons →
                <div className="mt-0.5 text-xs text-gray-500">
                  Mobile button components
                </div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
