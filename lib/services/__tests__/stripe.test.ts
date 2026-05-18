import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const createMock = vi
  .fn()
  .mockResolvedValue({ url: "https://checkout.stripe.com/test" });

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

describe("/lib/services/stripe.ts", () => {
  it("returns session url when provided correct starter plan", async () => {
    process.env.STRIPE_SECRET_KEY = "secret_key";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID =
      "price_starter";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID =
      "prod_starter";
    process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";

    const { createCheckoutUrl } = await import("../stripe");

    const url = await createCheckoutUrl("starter");

    expect(url).toBe("https://checkout.stripe.com/test");

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

  it("returns session url when provided correct all-in plan", async () => {
    process.env.STRIPE_SECRET_KEY = "secret_key";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID = "price_all-in";
    process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID = "prod_all-in";
    process.env.NEXT_PUBLIC_APP_URL = "https://nextnative.dev";

    const { createCheckoutUrl } = await import("../stripe");

    const url = await createCheckoutUrl("all-in");

    expect(url).toBe("https://checkout.stripe.com/test");

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "payment",
        line_items: [{ price: "price_all-in", quantity: 1 }],
        invoice_creation: { enabled: false },
        automatic_tax: { enabled: false },
        payment_method_types: ["card"],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXT_PUBLIC_APP_URL,
        metadata: { productId: "prod_all-in" },
      }),
    );
  });

  it("returns 400 when plan is wrong", async () => {
    process.env.STRIPE_SECRET_KEY = "secret_key";

    const { createCheckoutUrl } = await import("../stripe");

    await expect(createCheckoutUrl("wrong")).rejects.toMatchObject({
      code: "INVALID_BODY",
      httpStatus: 400,
      safeMessage: "Invalid plan",
    });
  });
});
