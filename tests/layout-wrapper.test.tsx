/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from "next/navigation";
import LayoutWrapper from "@/app/layout-wrapper";

describe("LayoutWrapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows background and overflow-hidden on non-blog pages", () => {
    (usePathname as any).mockReturnValue("/");

    const { container } = render(
      <LayoutWrapper>
        <div>Page content</div>
      </LayoutWrapper>,
    );

    const main = container.querySelector("main");
    expect(main).toBeTruthy();
    expect(main!.className).toContain("overflow-hidden");

    // Background SVG exists
    const background = container.querySelector("#background-svg");
    expect(background).toBeTruthy();

    // Container should NOT have blog max width
    const layoutContainer =
      main!.querySelector("main > div") ?? main!.querySelector("div");
    expect(layoutContainer!.className).not.toContain("md:max-w-[1360px]");
  });

  it("hides background and removes overflow-hidden on blog pages", () => {
    (usePathname as any).mockReturnValue("/blog/my-post");

    const { container } = render(
      <LayoutWrapper>
        <div>Blog content</div>
      </LayoutWrapper>,
    );

    const main = container.querySelector("main");
    expect(main).toBeTruthy();
    expect(main!.className).not.toContain("overflow-hidden");

    // Background SVG should NOT exist
    const background = container.querySelector("#background-svg");
    expect(background).toBeNull();

    // Blog container widths should be applied
    const layoutContainer = main!.querySelector("div");
    expect(layoutContainer!.className).toContain("md:max-w-[1360px]");
    expect(layoutContainer!.className).toContain("xl:max-w-[1360px]");
  });
});
