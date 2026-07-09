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

  it("renders the pricing UI with the updated sale price", async () => {
    const { default: PricingSection } = await loadComponent();

    render(<PricingSection />);

    // Heading uses Subheading component
    expect(screen.getByTestId("subheading")).toBeTruthy();
    expect(screen.getByText("One-time payment,")).toBeTruthy();
    expect(screen.getByText("lifetime value")).toBeTruthy();

    expect(screen.getByText("All-in")).toBeTruthy();
    expect(screen.getByText("$299")).toBeTruthy();
    expect(screen.getByText("$79")).toBeTruthy();

    // Only one pricing card is shown
    expect(screen.getAllByText("/forever")).toHaveLength(1);
    expect(screen.queryByText("Starter")).toBeNull();
    expect(screen.queryByText("Book a 30-min call")).toBeNull();

    // All-in price is wrapped with HighlightedSpan
    expect(screen.getAllByTestId("highlight")).toHaveLength(1);

    // All-in button is wrapped by StarburstSign
    expect(screen.getAllByTestId("starburst")).toHaveLength(1);
  });

  it("tracks expected events for the checkout button and apps-included link", async () => {
    const { default: PricingSection } = await loadComponent();

    render(<PricingSection />);

    const tracks = screen.getAllByTestId("track");
    const eventNames = tracks.map((el) => el.getAttribute("data-eventname"));

    expect(eventNames).toContain("Apps Included - Pricing Section");
    expect(eventNames).toContain("PricingSection_GetNextNative_All-in_clicked");

    const appsLinks = screen.getAllByRole("link", {
      name: "7 premium template apps included",
    });
    expect(appsLinks).toHaveLength(1);

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

  it("renders the pricing root and core features", async () => {
    const { default: PricingSection } = await loadComponent();

    const { container } = render(<PricingSection />);

    expect(screen.getByText("Next.js + Capacitor boilerplate")).toBeTruthy();
    expect(screen.getByText("Hands-on help if you get stuck")).toBeTruthy();
    expect(container.querySelector("#pricing")).toBeTruthy();
  });
});
