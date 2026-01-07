/** @vitest-environment node */

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const hoisted = vi.hoisted(() => {
  const analyticsMock = vi.fn(() => <div data-testid="vercel-analytics" />);

  const toasterMock = vi.fn(() => <div data-testid="toaster" />);

  const nextScriptMock = vi.fn(({ children, ...props }: any) => (
    <script data-testid="next-script" {...props}>
      {children}
    </script>
  ));

  const googleAnalyticsMock = vi.fn(({ gaId, ...rest }: any) => (
    <script data-testid="google-analytics" data-gaid={gaId} {...rest} />
  ));

  const layoutWrapperMock = vi.fn(({ children }: any) => (
    <div data-testid="layout-wrapper">{children}</div>
  ));

  return {
    analyticsMock,
    toasterMock,
    nextScriptMock,
    googleAnalyticsMock,
    layoutWrapperMock,
  };
});

vi.mock("@vercel/analytics/next", () => ({
  Analytics: hoisted.analyticsMock,
}));

vi.mock("react-hot-toast", () => ({
  Toaster: hoisted.toasterMock,
}));

vi.mock("next/script", () => ({
  __esModule: true,
  default: hoisted.nextScriptMock,
}));

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: hoisted.googleAnalyticsMock,
}));

vi.mock("../app/fonts", () => ({
  inter: { variable: "inter_var" },
  outfit: { className: "outfit_class" },
}));

vi.mock("../app/layout-wrapper", () => ({
  __esModule: true,
  default: hoisted.layoutWrapperMock,
}));

async function loadLayoutModule() {
  vi.resetModules();
  return await import("../app/layout");
}

describe("RootLayout", () => {
  beforeEach(() => {
    hoisted.analyticsMock.mockClear();
    hoisted.toasterMock.mockClear();
    hoisted.nextScriptMock.mockClear();
    hoisted.googleAnalyticsMock.mockClear();
    hoisted.layoutWrapperMock.mockClear();
  });

  it("exports expected metadata", async () => {
    const { metadata } = await loadLayoutModule();

    expect(metadata.title).toBe(
      "Launch Mobile Apps Faster With Next.js | NextNative",
    );
    expect(metadata.description).toContain("Skip React Native");
    expect(metadata.robots).toEqual({ index: true, follow: true });

    // metadataBase is a URL
    expect(String(metadata.metadataBase)).toBe("https://nextnative.dev/");
  });

  it("renders html shell and wraps children", async () => {
    const { default: RootLayout } = await loadLayoutModule();

    const html = renderToStaticMarkup(
      <RootLayout>
        <main data-testid="child">Hello</main>
      </RootLayout>,
    );

    expect(html).toContain('<html lang="en">');

    // Body classes include Tailwind tokens and mocked font classes
    expect(html).toContain(
      'class="bg-background antialiased outfit_class inter_var"',
    );

    // Child is wrapped by LayoutWrapper
    expect(html).toContain('data-testid="layout-wrapper"');
    expect(html).toContain('data-testid="child"');
    expect(html).toContain("Hello");
  });

  it("includes analytics + tracking scripts", async () => {
    const { default: RootLayout } = await loadLayoutModule();

    const html = renderToStaticMarkup(
      <RootLayout>
        <div />
      </RootLayout>,
    );

    // Umami-ish script in <head>
    expect(html).toContain("https://analytics.denistarasenko.com/script.js");
    expect(html).toContain(
      'data-website-id="c4fd4a3a-c1eb-40a0-ba15-750124213746"',
    );
    expect(html).toContain("defer");

    // DataFast Script (next/script mock)
    expect(html).toContain('data-website-id="68665e138b39cc32bf5cf8ad"');
    expect(html).toContain('data-domain="nextnative.dev"');
    expect(html).toContain('src="/js/script.js"');

    // Meta Pixel next/script (id)
    expect(html).toContain('id="fb-pixel"');
    expect(html).toContain("connect.facebook.net/en_US/fbevents.js");

    // Noscript image fallback for Meta Pixel
    expect(html).toContain("facebook.com/tr?id=1617501955599224");
    expect(html).toContain("ev=PageView");
    expect(html).toContain("noscript=1");

    // Vercel Analytics component
    expect(html).toContain('data-testid="vercel-analytics"');

    // Google Analytics tag
    expect(html).toContain('data-testid="google-analytics"');
    expect(html).toContain('data-gaid="G-QJT70XZBP7"');
  });
});
