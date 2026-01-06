import { test, expect } from "@playwright/test";

const url = "http://localhost:3000/";
const playgroundUrl = "https://nextnative.dev/playground";

test("has title", async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/Launch Mobile Apps/);
});

test("showcase link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("link", { name: "Showcase" }).first().click();

  await expect(page).toHaveURL(/showcase/);
  await expect(
    page.getByRole("heading", { name: "Mobile apps built & published" }),
  ).toBeVisible();
});

test("pricing link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("link", { name: "Pricing" }).first().click();

  await expect(
    page.getByRole("heading", { name: "One-time payment, lifetime" }),
  ).toBeInViewport();
});

test("faq link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("link", { name: "FAQ" }).first().click();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Got a question\? I got an answer!$/ }),
  ).toBeInViewport();
});

test("reviews link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("link", { name: "Reviews" }).click();

  await expect(
    page.getByRole("heading", { name: "Loved by developers" }),
  ).toBeInViewport();
});

test("docs link", async ({ page }) => {
  await page.goto(url);

  await page.getByRole("link", { name: "Docs" }).first().click();

  await expect(
    page.getByRole("heading", { name: "Get Started with NextNative" }),
  ).toBeVisible();
});

test("try-for-free button", async ({ page }) => {
  await page.goto(url);
  const a1 = page.getByRole("link", { name: "Try for free" }).nth(1);
  const a2 = page.getByRole("link", { name: "Try for free" }).first();

  await expect(a1).toHaveAttribute("href", playgroundUrl);
  await expect(a2).toHaveAttribute("href", playgroundUrl);

  await a1.click();

  await expect(page).toHaveURL(playgroundUrl);
});

test("playground email-gate customers image", async ({ page }) => {
  await page.goto(playgroundUrl);
  const img = page.getByRole("img", { name: "NextNative Customers" });
  await expect(img).toBeVisible();
  await expect(img).toHaveJSProperty("naturalWidth", 1280);
});

// Hero Section Tests
test("hero heading is visible", async ({ page }) => {
  await page.goto(url);

  const heading = page.getByRole("heading", {
    name: /Launch mobile apps.*faster with Next\.js/i,
  });

  await expect(heading).toBeInViewport();
});

test("hero description is visible", async ({ page }) => {
  await page.goto(url);

  const description = page.getByText(
    /Skip React Native.*Use the web tools you already know/i,
  );
  await expect(description).toBeVisible();
});

test("hero CTA button exists", async ({ page }) => {
  await page.goto(url);

  const ctaButton = page
    .getByRole("button", { name: "Get NextNative now" })
    .first();
  await expect(ctaButton).toBeVisible();
});

test("hero CTA button scrolls", async ({ page }) => {
  await page.goto(url);

  const ctaButton = page
    .getByRole("button", { name: "Get NextNative now" })
    .first();

  await ctaButton.click();

  const heading = page.getByRole("heading", {
    name: "One-time payment, lifetime",
  });

  await heading.scrollIntoViewIfNeeded();

  await expect(heading).toBeInViewport();
});

test("tool cards are visible in hero", async ({ page }) => {
  await page.goto(url);
  await expect(
    page.locator("div").filter({ hasText: "Next.jsAPI RoutesA single" }).nth(5),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "CapacitorNative" }).nth(5),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "TailwindUtility" }).nth(5),
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "RevenueCatOne" }).nth(5),
  ).toBeVisible();
});

// Quick Start Section
test("quick start section is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /How fast can/i }),
  ).toBeVisible();
});

// Showcase Section
test("showcase section displays", async ({ page }) => {
  await page.goto(url);

  const showcaseHeading = page.getByRole("heading", {
    name: /See what.*you can build in days/i,
  });
  await expect(showcaseHeading).toBeVisible();
});

// Social Proof Section
test("social proof section is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /Loved by developers/i }),
  ).toBeVisible();
});

test("demo video plays", async ({ page }) => {
  await page.goto(url);

  const placeholder = page.getByTestId("demo-video-placeholder");

  await placeholder.click();

  const frame = page.locator('iframe[title="NextNative Demo Video"]');

  await expect(frame).toHaveAttribute(
    "src",
    /https:\/\/www\.youtube\.com\/embed\/9iDXsyiP134\?autoplay=1&?/,
  );

  const videoFrame = frame.contentFrame().locator("video");

  await expect(videoFrame).toBeVisible();
});

// Features Section
test("splash screen feature is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: "Splash screen" }),
  ).toBeVisible();
});

test("onboarding feature is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: "Onboarding screen" }),
  ).toBeVisible();
});

test("API routes feature is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /Secure API routes/i }),
  ).toBeVisible();
});

test("authentication feature is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: "Authentication" }),
  ).toBeVisible();
});

test("in-app purchases feature is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /In-App Purchases/i }),
  ).toBeVisible();
});

// Pricing Section
test("pricing section displays", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /One-time payment, lifetime/i }),
  ).toBeVisible();
});

test("pricing has checkout button", async ({ page }) => {
  await page.goto(url);

  const pricingButtons = page.getByRole("button", {
    name: "Get NextNative",
  });
  await expect(pricingButtons.first()).toBeVisible();
});

// Store Guides Section
test("store guides section is visible", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /Publishing guides/i }),
  ).toBeVisible();
});

// FAQ Section
test("FAQ section displays", async ({ page }) => {
  await page.goto(url);

  await expect(
    page.getByRole("heading", { name: /Got a question/i }),
  ).toBeVisible();
});

// Multiple CTAs throughout page
test("multiple CTAs exist on page", async ({ page }) => {
  await page.goto(url);

  const ctaButtons = page.getByRole("button", {
    name: /Get NextNative|Try for free/i,
  });
  const count = await ctaButtons.count();
  expect(count).toBeGreaterThan(2); // Should have multiple CTAs
});

// Footer
test("footer is present", async ({ page }) => {
  await page.goto(url);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Check for footer elements
  await expect(
    page.getByRole("contentinfo").or(page.locator("footer")),
  ).toBeVisible();
});

// Mobile Responsiveness
test("page is responsive on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
  await page.goto(url);

  // Check hero is visible on mobile
  const heading = page.getByRole("heading", {
    name: /Launch mobile apps.*faster/i,
  });
  await expect(heading).toBeVisible();

  // Check CTA button is visible and clickable on mobile
  const ctaButton = page
    .getByRole("button", { name: "Get NextNative now" })
    .first();
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toBeInViewport();
});

// Structured Data
test("structured data is present", async ({ page }) => {
  await page.goto(url);

  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(structuredData).toBeTruthy();

  if (structuredData) {
    const data = JSON.parse(structuredData);
    expect(data["@type"]).toBe("WebSite");
    expect(data.name).toBe("NextNative");
  }
});
