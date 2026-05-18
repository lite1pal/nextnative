import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validOrigin = "https://nextnative.dev";

vi.mock("@/lib/rate-limiter", () => ({
  ratelimit: null,
}));

vi.mock("@/lib/services/stripe", () => ({
  createCheckoutUrl: vi
    .fn()
    .mockResolvedValue("https://checkout.stripe.com/test"),
}));

vi.mock("@/lib/env", () => ({
  env: {
    NODE_ENV: "development",
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("POST /api/create-checkout-session", () => {
  it("returns 200 and checkout url when starter plan is provided", async () => {
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
  });

  it("returns 200 and checkout url when all-in plan is provided", async () => {
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
