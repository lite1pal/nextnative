/** @vitest-environment node */

import { beforeEach, describe, expect, it, vi } from "vitest";

const hoisted = vi.hoisted(() => {
  const constructEventMock = vi.fn();
  const headersMock = vi.fn(async () => new Headers());

  const trackEventMock = vi.fn((event: string, _botDetection?: boolean) => {
    void event;
    return undefined;
  });

  const sendWelcomeEmailMock = vi.fn(async () => ({ success: true }));

  const prismaMock = {
    purchase: {
      findFirst: vi.fn(async () => null as any),
      create: vi.fn(async () => ({ id: "purchase_1" })),
    },
    globalNumber: {
      update: vi.fn(async () => ({ id: "global_1" })),
    },
  };

  const revalidatePathMock = vi.fn();

  return {
    constructEventMock,
    headersMock,
    trackEventMock,
    sendWelcomeEmailMock,
    prismaMock,
    revalidatePathMock,
  };
});

vi.mock("stripe", () => {
  class Stripe {
    public webhooks = {
      constructEvent: (rawBody: string, signature: string, secret: string) => {
        return hoisted.constructEventMock(rawBody, signature, secret);
      },
    };

    constructor(_secretKey: string, _opts: any) {}
  }

  return {
    __esModule: true,
    default: Stripe,
  };
});

vi.mock("next/headers", () => {
  return {
    headers: hoisted.headersMock,
  };
});

vi.mock("next/cache", () => {
  return {
    revalidatePath: hoisted.revalidatePathMock,
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

vi.mock("@/prisma/client", () => {
  return {
    prisma: hoisted.prismaMock,
  };
});

vi.mock("@/services/custom-analytics", () => {
  return {
    trackEvent: hoisted.trackEventMock,
  };
});

vi.mock("@/services/resend", () => {
  return {
    sendWelcomeEmail: hoisted.sendWelcomeEmailMock,
  };
});

async function loadRoute() {
  vi.resetModules();

  process.env.STRIPE_SECRET_KEY = "sk_test_123";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_123";
  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID = "prod_allin";

  return await import("../../app/api/stripe-webhook/route");
}

function checkoutSession(overrides?: Partial<any>) {
  return {
    id: "cs_test_123",
    payment_status: "paid",
    customer_details: { email: "buyer@example.com" },
    metadata: { productId: "prod_allin" },
    ...overrides,
  };
}

function checkoutCompletedEvent(sessionOverrides?: Partial<any>) {
  return {
    type: "checkout.session.completed",
    data: {
      object: checkoutSession(sessionOverrides),
    },
  };
}

describe("/api/stripe-webhook POST", () => {
  beforeEach(() => {
    hoisted.constructEventMock.mockReset();
    hoisted.headersMock
      .mockReset()
      .mockResolvedValue(new Headers({ "stripe-signature": "sig_123" }));

    hoisted.trackEventMock.mockClear();
    hoisted.sendWelcomeEmailMock
      .mockReset()
      .mockResolvedValue({ success: true });

    hoisted.prismaMock.purchase.findFirst.mockReset().mockResolvedValue(null);
    hoisted.prismaMock.purchase.create.mockClear();
    hoisted.prismaMock.globalNumber.update.mockClear();

    hoisted.revalidatePathMock.mockClear();
  });

  it("returns 400 when stripe-signature header is missing", async () => {
    hoisted.headersMock.mockResolvedValueOnce(new Headers());

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "{}",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Missing stripe-signature header",
    });

    expect(hoisted.constructEventMock).not.toHaveBeenCalled();
  });

  it("returns 400 when signature verification fails", async () => {
    hoisted.constructEventMock.mockImplementationOnce(() => {
      throw new Error("Invalid signature");
    });

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Webhook signature verification failed.",
    });
  });

  it("returns 200 ignored for non-checkout.session.completed events", async () => {
    hoisted.constructEventMock.mockReturnValueOnce({
      type: "customer.created",
      data: { object: {} },
    });

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, ignored: true });

    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
    expect(hoisted.sendWelcomeEmailMock).not.toHaveBeenCalled();
  });

  it("returns 200 ignored and tracks when payment_status is not paid", async () => {
    hoisted.constructEventMock.mockReturnValueOnce(
      checkoutCompletedEvent({ payment_status: "unpaid" }),
    );

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, ignored: true });

    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      "💰 Payment failed!",
      false,
    );
    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
  });

  it("returns 500 when customer email is missing", async () => {
    hoisted.constructEventMock.mockReturnValueOnce(
      checkoutCompletedEvent({ customer_details: {} }),
    );

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ message: "Webhook failed" });

    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      expect.stringContaining("💰 Error on Stripe webhook"),
      false,
    );
  });

  it("tracks and returns 500 when productId is missing", async () => {
    hoisted.constructEventMock.mockReturnValueOnce(
      checkoutCompletedEvent({ metadata: {} }),
    );

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Missing productId"))).toBe(true);
    expect(calls.some((c) => c.includes("Error on Stripe webhook"))).toBe(true);
  });

  it("records purchase, increments customers, sends welcome email, and revalidates", async () => {
    hoisted.constructEventMock.mockReturnValueOnce(
      checkoutCompletedEvent({
        id: "cs_paid_1",
        metadata: { productId: "prod_allin" },
      }),
    );

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ message: "Webhook processed" });

    expect(hoisted.prismaMock.purchase.findFirst).toHaveBeenCalledWith({
      where: { paymentId: "cs_paid_1" },
    });

    expect(hoisted.prismaMock.purchase.create).toHaveBeenCalledWith({
      data: {
        paymentId: "cs_paid_1",
        email: "buyer@example.com",
      },
    });

    expect(hoisted.prismaMock.globalNumber.update).toHaveBeenCalledWith({
      where: { id: "99c3a4be-4565-451b-813e-82bf381568d7" },
      data: { value: { increment: 1 } },
    });

    expect(hoisted.sendWelcomeEmailMock).toHaveBeenCalledWith({
      email: "buyer@example.com",
      link: "https://nextnative.dev/thank-you-stripe?paymentId=cs_paid_1",
    });

    expect(hoisted.revalidatePathMock).toHaveBeenCalledWith(
      "/api/customers-count",
    );

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(
      calls.some((c) =>
        c.includes(
          "💰 NextNative_payment_succeeded - All-in - buyer@example.com",
        ),
      ),
    ).toBe(true);
  });

  it("is idempotent when purchase already exists (no email, no increment)", async () => {
    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce({
      id: "existing_1",
      paymentId: "cs_test_123",
    } as any);
    hoisted.constructEventMock.mockReturnValueOnce(checkoutCompletedEvent());

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/stripe-webhook", {
      method: "POST",
      body: "raw_payload",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ message: "Webhook processed" });

    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
    expect(hoisted.prismaMock.globalNumber.update).not.toHaveBeenCalled();
    expect(hoisted.sendWelcomeEmailMock).not.toHaveBeenCalled();
    expect(hoisted.revalidatePathMock).not.toHaveBeenCalled();
  });
});
