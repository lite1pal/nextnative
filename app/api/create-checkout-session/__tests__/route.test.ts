import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validOrigin = "https://nextnative.dev";

const createMock = vi
  .fn()
  .mockResolvedValue({ url: "https://checkout.stripe.com/test" });

vi.mock("@/lib/rate-limiter", () => ({
  ratelimit: null,
}));

vi.mock("stripe", () => ({
  default: vi.fn(function StripeMock() {
    return {
      checkout: {
        sessions: {
          create: createMock,
        },
      },
    };
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("POST /api/create-checkout-session", () => {
  it("returns 200 and checkout url when starter plan is provided", async () => {
    process.env.STRIPE_SECRET_KEY = "secret_key";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID =
      "price_starter";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID =
      "prod_starter";
    process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";

    const req = new NextRequest("http://local/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan: "starter" }),
      headers: {
        Origin: validOrigin,
      },
    });

    const { POST } = await import("../route");

    const res = await POST(req);

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body).toMatchObject({
      ok: true,
      data: { url: "https://checkout.stripe.com/test" },
    });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        line_items: [{ price: "price_starter", quantity: 1 }],
        invoice_creation: { enabled: false },
        automatic_tax: { enabled: false },
        payment_method_types: ["card"],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXT_PUBLIC_APP_URL,
        metadata: { productId: "prod_starter" },
      }),
    );
  });

  it("returns 200 and checkout url when all-in plan is provided", async () => {
    process.env.STRIPE_SECRET_KEY = "secret_key";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID = "price_all-in";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID = "prod_all-in";
    process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";

    const req = new NextRequest("http://local/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan: "all-in" }),
      headers: {
        Origin: validOrigin,
      },
    });

    const { POST } = await import("../route");

    const res = await POST(req);

    expect(res.status).toBe(200);

    const body = await res.json();

    expect(body).toMatchObject({
      ok: true,
      data: { url: "https://checkout.stripe.com/test" },
    });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID,
            quantity: 1,
          },
        ],
        invoice_creation: { enabled: false },
        automatic_tax: { enabled: false },
        payment_method_types: ["card"],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXT_PUBLIC_APP_URL,
        metadata: {
          productId:
            process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID,
        },
      }),
    );
  });

  it("returns 400 when plan is missing", async () => {
    const req = new NextRequest("http://local/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        Origin: validOrigin,
      },
    });

    const { POST } = await import("../route");

    const res = await POST(req);

    expect(res.status).toBe(400);

    const body = await res.json();

    expect(body).toMatchObject({
      error: { code: "INVALID_BODY", message: "Plan is missing from the body" },
    });
  });

  it("returns 400 when plan is wrong", async () => {
    const req = new NextRequest("http://local/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan: "wrong" }),
      headers: {
        Origin: validOrigin,
      },
    });

    const { POST } = await import("../route");

    const res = await POST(req);

    expect(res.status).toBe(400);
  });

  it("returns 403 when origin isn't valid", async () => {
    const req = new NextRequest("http://local/api/create-checkout-session", {
      method: "POST",
      headers: { Origin: "https://wrongorigin.com" },
    });

    const { POST } = await import("../route");

    const res = await POST(req);

    expect(res.status).toBe(403);
  });

  it("returns 429 when too many requests", async () => {
    const { AppError } = await import("@/lib/http/app-error");

    const assertRateLimitMock = vi.fn().mockRejectedValue(
      new AppError({
        code: "RATE_LIMITED",
        httpStatus: 429,
        safeMessage: "Too many requests. Please wait a moment.",
      }),
    );

    vi.doMock("@/lib/security/rate-limit", () => ({
      assertRateLimit: assertRateLimitMock,
    }));

    const { POST } = await import("../route");
    const request = new NextRequest(
      "http://local/api/create-checkout-session",
      {
        method: "POST",
        headers: { Origin: validOrigin },
      },
    );
    const res = await POST(request);

    expect(assertRateLimitMock).toHaveBeenCalledOnce();

    expect(res.status).toBe(429);

    const body = await res.json();

    expect(body).toMatchObject({
      ok: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please wait a moment.",
      },
    });
  });
});
