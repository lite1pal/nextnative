/**
 * @vitest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

const hoisted = vi.hoisted(() => {
  const trackEventWrapperMock = vi.fn(
    ({
      eventName,
      children,
    }: {
      eventName: string;
      children: React.ReactNode;
    }) => (
      <div data-testid="track" data-eventname={eventName}>
        {children}
      </div>
    ),
  );

  const subheadingMock = vi.fn(
    ({ heading1, heading2 }: { heading1: string; heading2: string }) => (
      <div data-testid="subheading">
        <span>{heading1}</span>
        <span>{heading2}</span>
      </div>
    ),
  );

  const highlightedSpanMock = vi.fn(
    ({ children }: { children: React.ReactNode }) => (
      <span data-testid="highlight">{children}</span>
    ),
  );

  const starburstSignMock = vi.fn(
    ({ children }: { children: React.ReactNode }) => (
      <div data-testid="starburst">{children}</div>
    ),
  );

  return {
    trackEventWrapperMock,
    subheadingMock,
    highlightedSpanMock,
    starburstSignMock,
  };
});

vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ href, children, ...rest }: any) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  };
});

vi.mock("@/components/TrackEventWrapper", () => ({
  __esModule: true,
  default: hoisted.trackEventWrapperMock,
}));

vi.mock("@/components/Subheading", () => ({
  __esModule: true,
  default: hoisted.subheadingMock,
}));

vi.mock("@/components/HighlightedSpan", () => ({
  __esModule: true,
  default: hoisted.highlightedSpanMock,
}));

vi.mock("@/components/StarburstSign", () => ({
  __esModule: true,
  default: hoisted.starburstSignMock,
}));

async function loadComponent() {
  vi.resetModules();

  process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_ALL_ACCESS_PROD =
    "https://pay.example/all-access";
  process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_STARTER_PROD =
    "https://pay.example/starter";

  return await import("../components/PricingSection");
}

describe("PricingSection", () => {
  beforeEach(() => {
    hoisted.trackEventWrapperMock.mockClear();
    hoisted.subheadingMock.mockClear();
    hoisted.highlightedSpanMock.mockClear();
    hoisted.starburstSignMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders both pricing plans and core UI", async () => {
    const { default: PricingSection } = await loadComponent();

    render(<PricingSection />);

    // Heading uses Subheading component
    expect(screen.getByTestId("subheading")).toBeTruthy();
    expect(screen.getByText("One-time payment,")).toBeTruthy();
    expect(screen.getByText("lifetime value")).toBeTruthy();

    // Plan titles + prices
    expect(screen.getByText("Starter")).toBeTruthy();
    expect(screen.getByText("All-in")).toBeTruthy();
    expect(screen.getByText("$249")).toBeTruthy();
    expect(screen.getByText("$299")).toBeTruthy();

    // /forever label appears on each plan
    expect(screen.getAllByText("/forever")).toHaveLength(2);

    // Most popular badge for All-in
    expect(screen.getByText("Most popular")).toBeTruthy();

    // All-in price is wrapped with HighlightedSpan
    expect(screen.getAllByTestId("highlight")).toHaveLength(1);

    // All-in button is wrapped by StarburstSign
    expect(screen.getAllByTestId("starburst")).toHaveLength(1);
  });

  it("links checkout buttons to the configured Dodo payment links", async () => {
    const { default: PricingSection } = await loadComponent();

    render(<PricingSection />);

    const buttons = screen.getAllByRole("link", { name: "Get NextNative" });
    expect(buttons).toHaveLength(2);

    const hrefs = buttons.map((a) =>
      (a as HTMLAnchorElement).getAttribute("href"),
    );
    expect(hrefs).toEqual([
      "https://pay.example/starter",
      "https://pay.example/all-access",
    ]);
  });

  it("tracks expected events for checkout buttons and apps-included link", async () => {
    const { default: PricingSection } = await loadComponent();

    render(<PricingSection />);

    // Checkout buttons are wrapped in TrackEventWrapper
    const tracks = screen.getAllByTestId("track");

    // Expect at least 3 wrappers: apps link + 2 checkout buttons
    const eventNames = tracks.map((el) => el.getAttribute("data-eventname"));

    expect(eventNames).toContain("Apps Included - Pricing Section");
    expect(eventNames).toContain(
      "PricingSection_GetNextNative_Starter_clicked",
    );
    expect(eventNames).toContain("PricingSection_GetNextNative_All-in_clicked");

    // Apps included link appears on both plans and routes to /use-cases
    const appsLinks = screen.getAllByRole("link", {
      name: "7 premium template apps included",
    });
    expect(appsLinks).toHaveLength(2);

    for (const link of appsLinks) {
      expect((link as HTMLAnchorElement).getAttribute("href")).toBe(
        "/use-cases",
      );

      const wrapper = link.closest('[data-testid="track"]');
      expect(wrapper?.getAttribute("data-eventname")).toBe(
        "Apps Included - Pricing Section",
      );
    }
  });

  it("dims specific features on the Starter plan only", async () => {
    const { default: PricingSection } = await loadComponent();

    const { container } = render(<PricingSection />);

    const starterHeading = screen.getByText("Starter");

    // Find the nearest card container for Starter (the pricing card root)
    const starterCard = starterHeading.closest("div");
    expect(starterCard).toBeTruthy();

    const starterScope = within(starterCard as HTMLElement);

    const dimmedFeatureText = "App Store/Google Play launch guides";

    const starterFeature = starterScope.getByText(dimmedFeatureText);

    // FeatureRow wraps text in a <span> that gets text-gray-500 when dimmed
    const textSpan = starterFeature.closest("span");
    expect(textSpan?.className).toContain("text-gray-500");

    // All-in card should render the same feature without dimming
    const allInHeading = screen.getByText("All-in");
    const allInCard = allInHeading.closest("div");
    expect(allInCard).toBeTruthy();

    const allInScope = within(allInCard as HTMLElement);
    const allInFeature = allInScope.getByText(dimmedFeatureText);

    const allInTextSpan = allInFeature.closest("span");
    expect(allInTextSpan?.className ?? "").not.toContain("text-gray-500");

    // Sanity: pricing section root exists
    expect(container.querySelector("#pricing")).toBeTruthy();
  });
});
