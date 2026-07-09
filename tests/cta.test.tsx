/**
 * @vitest-environment jsdom
 */

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const hoisted = vi.hoisted(() => {
  const trackEventMock = vi.fn((event: string) => {
    void event;
  });

  return { trackEventMock };
});

vi.mock("@/services/custom-analytics", () => ({
  trackEvent: hoisted.trackEventMock,
}));

import CTA from "@/components/CTA";

describe("CTA", () => {
  beforeEach(() => {
    hoisted.trackEventMock.mockClear();

    (globalThis as any).window = globalThis.window ?? ({} as any);
    (window as any).datafast = vi.fn();

    (Element.prototype as any).scrollIntoView = vi.fn();

    document.body.innerHTML = "";
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("renders primary and secondary CTA buttons by default", () => {
    render(<CTA />);

    expect(
      screen.getByRole("button", { name: "Get NextNative now" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Book a 30-min call" })).toBeTruthy();
  });

  it("can hide the secondary CTA", () => {
    render(<CTA showSecondary={false} />);

    expect(
      screen.getByRole("button", { name: "Get NextNative now" }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Book a 30-min call" }),
    ).toBeNull();
  });

  it("merges wrapper className", () => {
    const { container } = render(<CTA className="my-extra-class" />);

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    expect(wrapper.className).toContain("flex");
    expect(wrapper.className).toContain("xl:items-center");
    expect(wrapper.className).toContain("my-extra-class");
  });

  it("tracks + scrolls to pricing when primary CTA clicked", () => {
    const pricing = document.createElement("div");
    pricing.id = "pricing";
    document.body.appendChild(pricing);

    const scrollSpy = vi.spyOn(Element.prototype as any, "scrollIntoView");

    render(<CTA />);

    fireEvent.click(screen.getByRole("button", { name: "Get NextNative now" }));

    expect(hoisted.trackEventMock).toHaveBeenCalledWith("CTA_clicked");
    expect((window as any).datafast).toHaveBeenCalledWith("cta_clicked");
    expect(scrollSpy).toHaveBeenCalledTimes(1);
  });

  it("tracks when secondary CTA clicked", () => {
    render(<CTA />);

    fireEvent.click(screen.getByRole("button", { name: "Book a 30-min call" }));

    expect(hoisted.trackEventMock).toHaveBeenCalledWith("CTA_book_call_clicked");

    const link = screen.getByRole("link", { name: "Book a 30-min call" });
    expect((link as HTMLAnchorElement).getAttribute("target")).toBe("_blank");
  });
});
