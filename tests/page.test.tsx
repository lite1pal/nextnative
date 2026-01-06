import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

function mockSection(testId: string) {
  return {
    __esModule: true,
    default: (props: any) => <div data-testid={testId} {...props} />,
  };
}

vi.mock("@/components/SocialProof", () => mockSection("SocialProof"));
vi.mock("@/components/PricingSection", () => mockSection("PricingSection"));
vi.mock("@/components/WastedTime", () => mockSection("WastedTime"));
vi.mock("@/components/Spend5Minutes", () => mockSection("Spend5Minutes"));
vi.mock("@/components/QuickStart", () => mockSection("QuickStart"));
vi.mock("@/components/CallToAction", () => mockSection("CallToAction"));
vi.mock("@/components/FAQ", () => mockSection("FAQ"));
vi.mock("@/components/DemoVideo", () => mockSection("DemoVideo"));
vi.mock("@/components/SetupByDefault", () => mockSection("SetupByDefault"));
vi.mock("@/components/ShowcaseSection", () => mockSection("ShowcaseSection"));
vi.mock("@/components/StoreGuides", () => mockSection("StoreGuides"));
vi.mock("@/components/TestimonialsSection", () =>
  mockSection("TestimonialsSection"),
);
vi.mock("@/components/AppsBuiltWithNextNative", () =>
  mockSection("AppsBuiltWithNextNative"),
);
vi.mock("@/components/HeroSection", () => mockSection("HeroSection"));

vi.mock("@/components/CTAWithSocialProof", () => ({
  __esModule: true,
  default: ({ className, ...rest }: any) => (
    <div
      data-testid="CTAWithSocialProof"
      data-classname={className ?? ""}
      {...rest}
    />
  ),
}));

vi.mock("@/components/FeaturesSection", () => mockSection("FeaturesSection"));
vi.mock("@/components/DagobertTestimonial", () =>
  mockSection("DagobertTestimonial"),
);
vi.mock("@/components/LeoVideoTestimonial", () =>
  mockSection("LeoVideoTestimonial"),
);
vi.mock("@/components/TerryTestimonial", () => mockSection("TerryTestimonial"));
vi.mock("@/components/HappyCustomerTestimonial", () =>
  mockSection("HappyCustomerTestimonial"),
);
vi.mock("@/components/VitaliyTestimonial", () =>
  mockSection("VitaliyTestimonial"),
);

// app/page.tsx imports this via "./json-ld"; mocking by the resolved path is simplest.
vi.mock("../app/json-ld", () => mockSection("JsonLD"));

import Home, { metadata } from "@/app/page";

describe("/ (home) page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("exports canonical metadata", () => {
    expect(metadata.alternates?.canonical).toBe("https://nextnative.dev");
  });

  it("renders all sections", () => {
    render(<Home />);

    expect(screen.getByTestId("JsonLD")).toBeTruthy();
    expect(screen.getByTestId("HeroSection")).toBeTruthy();
    expect(screen.getByTestId("VitaliyTestimonial")).toBeTruthy();
    expect(screen.getByTestId("QuickStart")).toBeTruthy();
    expect(screen.getByTestId("ShowcaseSection")).toBeTruthy();
    expect(screen.getByTestId("SocialProof")).toBeTruthy();
    expect(screen.getByTestId("HappyCustomerTestimonial")).toBeTruthy();
    expect(screen.getByTestId("WastedTime")).toBeTruthy();
    expect(screen.getByTestId("SetupByDefault")).toBeTruthy();
    expect(screen.getByTestId("TerryTestimonial")).toBeTruthy();
    expect(screen.getByTestId("AppsBuiltWithNextNative")).toBeTruthy();
    expect(screen.getByTestId("DemoVideo")).toBeTruthy();
    expect(screen.getByTestId("FeaturesSection")).toBeTruthy();
    expect(screen.getByTestId("DagobertTestimonial")).toBeTruthy();
    expect(screen.getByTestId("StoreGuides")).toBeTruthy();
    expect(screen.getByTestId("Spend5Minutes")).toBeTruthy();
    expect(screen.getByTestId("LeoVideoTestimonial")).toBeTruthy();
    expect(screen.getByTestId("PricingSection")).toBeTruthy();
    expect(screen.getByTestId("TestimonialsSection")).toBeTruthy();
    expect(screen.getByTestId("FAQ")).toBeTruthy();
    expect(screen.getByTestId("CallToAction")).toBeTruthy();
  });

  it("renders CTAWithSocialProof 4 times with expected className props", () => {
    render(<Home />);

    const ctas = screen.getAllByTestId("CTAWithSocialProof");
    expect(ctas).toHaveLength(4);

    const classNames = ctas.map((el) => el.getAttribute("data-classname"));
    expect(classNames).toEqual([
      "max-sm:mt-16",
      "mt-10",
      "sm:mt-10",
      "mb-10 sm:mt-10",
    ]);
  });
});
