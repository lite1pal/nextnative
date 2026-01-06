/** @vitest-environment node */

import { beforeEach, describe, expect, it, vi } from "vitest";

const hoisted = vi.hoisted(() => {
  const verifyMock = vi.fn(async () => undefined);
  const headersMock = vi.fn(async () => new Headers());

  const trackEventMock = vi.fn((event: string, _isUserEvent?: boolean) => {
    void event;
    return undefined;
  });
  const sendWelcomeEmailMock = vi.fn(async () => ({ success: true }));
  const sendWelcomeTemplateEmailMock = vi.fn(async () => ({ success: true }));

  const prismaMock = {
    purchase: {
      create: vi.fn(async () => ({ id: "purchase_1" })),
    },
    globalNumber: {
      update: vi.fn(async () => ({ id: "global_1" })),
    },
  };

  const revalidatePathMock = vi.fn();

  return {
    verifyMock,
    headersMock,
    trackEventMock,
    sendWelcomeEmailMock,
    sendWelcomeTemplateEmailMock,
    prismaMock,
    revalidatePathMock,
  };
});

vi.mock("standardwebhooks", () => {
  class Webhook {
    constructor(_secret: string) {}
    async verify(rawBody: string, webhookHeaders: Record<string, string>) {
      // @ts-ignore
      return await hoisted.verifyMock(rawBody, webhookHeaders);
    }
  }

  return { Webhook };
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
    sendWelcomeTemplateEmail: hoisted.sendWelcomeTemplateEmailMock,
  };
});

async function loadRoute() {
  vi.resetModules();
  // Re-apply env + keep mocks
  process.env.DODOPAYMENTS_WEBHOOK_SECRET = "test_secret";
  process.env.POMODORO_TEMPLATE_DOWNLOAD_LINK =
    "https://example.com/pomodoro.zip";

  return await import("../../app/api/webhook/route");
}

function succeededOneTimePayload(overrides?: any) {
  return {
    type: "payment.succeeded",
    data: {
      payload_type: "Payment",
      subscription_id: null,
      payment_id: "pay_123",
      customer: { email: "buyer@example.com" },
      product_cart: [{ product_id: "pdt_oJrNhvmTecy5gmoEulOBk" }],
      ...overrides,
    },
  };
}

describe("/api/webhook POST", () => {
  beforeEach(() => {
    hoisted.verifyMock.mockReset().mockResolvedValue(undefined);
    hoisted.headersMock.mockReset().mockResolvedValue(
      new Headers({
        "webhook-id": "id_1",
        "webhook-signature": "sig_1",
        "webhook-timestamp": "ts_1",
      }),
    );

    hoisted.trackEventMock.mockClear();
    hoisted.sendWelcomeEmailMock
      .mockReset()
      .mockResolvedValue({ success: true });
    hoisted.sendWelcomeTemplateEmailMock
      .mockReset()
      .mockResolvedValue({ success: true });

    hoisted.prismaMock.purchase.create.mockClear();
    hoisted.prismaMock.globalNumber.update.mockClear();

    hoisted.revalidatePathMock.mockClear();
  });

  it("returns 200 ignored for non-succeeded one-time events", async () => {
    const { POST } = await loadRoute();

    const payload = {
      type: "payment.failed",
      data: { payload_type: "Payment", customer: { email: "a@b.com" } },
    };

    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, ignored: true });

    expect(hoisted.verifyMock).toHaveBeenCalledTimes(1);
    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
  });

  it("returns 500 when customer email is missing", async () => {
    const { POST } = await loadRoute();

    const payload = succeededOneTimePayload({ customer: undefined });

    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    expect(hoisted.trackEventMock).toHaveBeenCalled();
    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Error on webhook"))).toBe(true);
  });

  it("returns 500 when product id is missing (and tracks it)", async () => {
    const { POST } = await loadRoute();

    const payload = succeededOneTimePayload({ product_cart: [] });

    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Missing product ID"))).toBe(true);
    expect(calls.some((c) => c.includes("Error on webhook"))).toBe(true);

    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
  });

  it("handles template purchases: sends template welcome email and returns 200", async () => {
    const { POST } = await loadRoute();

    const payload = succeededOneTimePayload({
      product_cart: [{ product_id: "pdt_eiP4ixzuoeUYrtknt7wZB" }],
    });

    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(hoisted.sendWelcomeTemplateEmailMock).toHaveBeenCalledWith({
      email: "buyer@example.com",
      link: "https://example.com/pomodoro.zip",
    });

    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
    expect(hoisted.prismaMock.globalNumber.update).not.toHaveBeenCalled();
    expect(hoisted.sendWelcomeEmailMock).not.toHaveBeenCalled();
  });

  it("handles NextNative purchases: records purchase, increments customers, sends welcome email, revalidates", async () => {
    const { POST } = await loadRoute();

    const payload = succeededOneTimePayload({
      payment_id: "pay_999",
      product_cart: [{ product_id: "pdt_oJrNhvmTecy5gmoEulOBk" }],
    });

    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(
      calls.some((c) =>
        c.includes(
          `💰 NextNative_payment_succeeded - All-in - buyer@example.com 🎉`,
        ),
      ),
    ).toBe(true);
    // expect(calls.some((c) => c.includes("Error on webhook"))).toBe(true);

    expect(hoisted.prismaMock.purchase.create).toHaveBeenCalledWith({
      data: { paymentId: "pay_999", email: "buyer@example.com" },
    });

    expect(hoisted.prismaMock.globalNumber.update).toHaveBeenCalledWith({
      where: {
        id: "99c3a4be-4565-451b-813e-82bf381568d7",
        title: "customers",
      },
      data: { value: { increment: 1 } },
    });

    expect(hoisted.sendWelcomeEmailMock).toHaveBeenCalledWith({
      email: "buyer@example.com",
      link: "https://nextnative.dev/thank-you?payment_id=pay_999&status=succeeded",
    });

    expect(hoisted.revalidatePathMock).toHaveBeenCalledWith(
      "/api/customers-count",
    );
  });

  it("returns 500 if webhook verification fails", async () => {
    hoisted.verifyMock.mockRejectedValueOnce(new Error("Invalid signature"));

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(succeededOneTimePayload()),
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      expect.stringContaining("Error on webhook"),
      false,
    );
  });

  it("tracks and logs when template email fails", async () => {
    hoisted.sendWelcomeTemplateEmailMock.mockRejectedValueOnce(
      new Error("SMTP failed"),
    );

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(
        succeededOneTimePayload({
          product_cart: [{ product_id: "pdt_eiP4ixzuoeUYrtknt7wZB" }],
        }),
      ),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      expect.stringContaining("Welcome email error"),
      false,
    );
  });

  it("tracks error if template handling throws", async () => {
    hoisted.sendWelcomeTemplateEmailMock.mockImplementationOnce(() => {
      throw new Error("unexpected template error");
    });

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(
        succeededOneTimePayload({
          product_cart: [{ product_id: "pdt_eiP4ixzuoeUYrtknt7wZB" }],
        }),
      ),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(
      hoisted.trackEventMock.mock.calls.some((c) =>
        c[0].includes("📧 Welcome email error"),
      ),
    ).toBe(true);
  });

  it("returns 500 for malformed payload without data", async () => {
    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify({ type: "payment.succeeded" }), // no data
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true, ignored: true });
  });

  it("handles missing headers gracefully", async () => {
    hoisted.headersMock.mockResolvedValueOnce(new Headers());

    const { POST } = await loadRoute();
    const req = new Request("http://localhost/api/webhook", {
      method: "POST",
      body: JSON.stringify(succeededOneTimePayload()),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
