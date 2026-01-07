/** @vitest-environment node */

import { beforeEach, describe, expect, it, vi } from "vitest";

const hoisted = vi.hoisted(() => {
  const sessionsCreateMock = vi.fn();
  const stripeConstructorMock = vi.fn();

  return {
    sessionsCreateMock,
    stripeConstructorMock,
  };
});

vi.mock("stripe", () => {
  class Stripe {
    public checkout = {
      sessions: {
        create: (args: unknown) => hoisted.sessionsCreateMock(args),
      },
    };

    constructor(secretKey: string, opts: unknown) {
      hoisted.stripeConstructorMock(secretKey, opts);
    }
  }

  return {
    __esModule: true,
    default: Stripe,
  };
});

vi.mock("next/server", () => {
  return {
    NextResponse: {
      json: (data: unknown, init?: { status?: number }) => {
        return new Response(JSON.stringify(data), {
          status: init?.status ?? 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  };
});

async function loadRoute() {
  vi.resetModules();

  process.env.STRIPE_SECRET_KEY = "sk_test_123";
  process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";

  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID = "price_starter";
  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID = "price_allin";

  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID = "prod_starter";
  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID = "prod_allin";

  return await import("../../app/api/create-checkout-session/route");
}

function postReq(body: unknown) {
  return new Request("http://localhost/api/create-checkout-session", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

describe("/api/create-checkout-session POST", () => {
  beforeEach(() => {
    hoisted.sessionsCreateMock.mockReset();
    hoisted.stripeConstructorMock.mockReset();

    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("returns 400 for invalid plan", async () => {
    const { POST } = await loadRoute();

    const res = await POST(postReq({ plan: "nope" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "Invalid plan" });

    expect(hoisted.sessionsCreateMock).not.toHaveBeenCalled();
  });

  it("creates a Stripe Checkout session for 'starter' and returns session url", async () => {
    const { POST } = await loadRoute();

    hoisted.sessionsCreateMock.mockResolvedValueOnce({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });

    const res = await POST(postReq({ plan: "starter" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_test_123",
    });

    expect(hoisted.sessionsCreateMock).toHaveBeenCalledTimes(1);
    expect(hoisted.sessionsCreateMock).toHaveBeenCalledWith({
      mode: "payment",
      line_items: [{ price: "price_starter", quantity: 1 }],
      invoice_creation: { enabled: false },
      automatic_tax: { enabled: false },
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      success_url:
        "https://nextnative.dev/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://nextnative.dev",
      metadata: { productId: "prod_starter" },
    });
  });

  it("creates a Stripe Checkout session for 'all-in' with correct productId", async () => {
    const { POST } = await loadRoute();

    hoisted.sessionsCreateMock.mockResolvedValueOnce({ url: "https://x" });

    const res = await POST(postReq({ plan: "all-in" }));
    expect(res.status).toBe(200);

    expect(hoisted.sessionsCreateMock).toHaveBeenCalledTimes(1);
    const args = hoisted.sessionsCreateMock.mock.calls[0]?.[0] as any;
    expect(args.line_items).toEqual([{ price: "price_allin", quantity: 1 }]);
    expect(args.metadata).toEqual({ productId: "prod_allin" });
  });

  it("returns 500 when request.json/body is invalid", async () => {
    const { POST } = await loadRoute();

    const req = new Request("http://localhost/api/create-checkout-session", {
      method: "POST",
      body: "{not json}",
      headers: { "content-type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Stripe session creation failed",
    });

    expect(hoisted.sessionsCreateMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it("returns 500 when Stripe session creation throws", async () => {
    const { POST } = await loadRoute();

    hoisted.sessionsCreateMock.mockRejectedValueOnce(new Error("stripe down"));

    const res = await POST(postReq({ plan: "starter" }));
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Stripe session creation failed",
    });

    expect(console.error).toHaveBeenCalled();
  });
});
