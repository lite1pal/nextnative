/** @vitest-environment node */

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const hoisted = vi.hoisted(() => {
  const notFoundError = Object.assign(new Error("NEXT_NOT_FOUND"), {
    code: "NEXT_NOT_FOUND",
  });

  const notFoundMock = vi.fn(() => {
    throw notFoundError;
  });

  const trackEventMock = vi.fn((event: string) => {
    void event;
    return undefined;
  });

  const prismaMock = {
    purchase: {
      findFirst: vi.fn(async () => null as any),
    },
  };

  const sessionsRetrieveMock = vi.fn();

  return {
    notFoundError,
    notFoundMock,
    trackEventMock,
    prismaMock,
    sessionsRetrieveMock,
  };
});

vi.mock("next/navigation", () => ({
  notFound: hoisted.notFoundMock,
}));

vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ href, children, ...rest }: any) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  };
});

vi.mock("@/prisma/client", () => ({
  prisma: hoisted.prismaMock,
}));

vi.mock("@/services/custom-analytics", () => ({
  trackEvent: hoisted.trackEventMock,
}));

vi.mock("stripe", () => {
  class Stripe {
    public checkout = {
      sessions: {
        retrieve: (sessionId: string) =>
          hoisted.sessionsRetrieveMock(sessionId),
      },
    };

    constructor(_secretKey: string, _opts: any) {}
  }

  return {
    __esModule: true,
    default: Stripe,
  };
});

// Mock the ThankYouPageStripe component imported from "./form"
vi.mock("../app/thank-you-stripe/form", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return <div data-testid="thank-you-stripe" {...props} />;
    },
  };
});

async function loadPageModule() {
  vi.resetModules();

  process.env.STRIPE_SECRET_KEY = "sk_test_123";

  return await import("../app/(core)/thank-you-stripe/page");
}

describe("/thank-you-stripe page", () => {
  beforeEach(() => {
    hoisted.notFoundMock.mockClear();
    hoisted.trackEventMock.mockClear();
    hoisted.prismaMock.purchase.findFirst.mockReset().mockResolvedValue(null);
    hoisted.sessionsRetrieveMock.mockReset();

    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("calls notFound() when session_id is missing", async () => {
    const { default: Page } = await loadPageModule();

    await expect(
      Page({
        searchParams: Promise.resolve({ session_id: "" }),
      } as any),
    ).rejects.toBe(hoisted.notFoundError);

    expect(hoisted.notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("returns FailedPage and tracks when Stripe retrieve throws", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.sessionsRetrieveMock.mockRejectedValueOnce(
      new Error("stripe down"),
    );

    const el = await Page({
      searchParams: Promise.resolve({ session_id: "cs_1" }),
    } as any);

    const html = renderToStaticMarkup(el as any);
    expect(html).toContain("Failed payment");

    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      "💰 Error on /thank-you-stripe page - cs_1 💔",
    );

    expect(hoisted.prismaMock.purchase.findFirst).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it("returns FailedPage when payment_status is not paid", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.sessionsRetrieveMock.mockResolvedValueOnce({
      id: "cs_1",
      payment_status: "unpaid",
    });

    const el = await Page({
      searchParams: Promise.resolve({ session_id: "cs_1" }),
    } as any);

    const html = renderToStaticMarkup(el as any);
    expect(html).toContain("Failed payment");

    expect(hoisted.trackEventMock).not.toHaveBeenCalled();
    expect(hoisted.prismaMock.purchase.findFirst).not.toHaveBeenCalled();
  });

  it("returns ThankYouPageStripe with isInvited=false when no purchase exists", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.sessionsRetrieveMock.mockResolvedValueOnce({
      id: "cs_1",
      amount_total: 49900,
      payment_status: "paid",
      metadata: { productId: "prod_allin" },
      customer_details: { email: "buyer@example.com" },
    });

    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce(null);

    const el: any = await Page({
      searchParams: Promise.resolve({ session_id: "cs_1" }),
    } as any);

    expect(hoisted.prismaMock.purchase.findFirst).toHaveBeenCalledWith({
      where: { paymentId: "cs_1" },
    });

    expect(el.props.isInvited).toBe(false);
    expect(el.props.paymentData).toEqual({
      settlement_amount: 49900,
      payment_id: "cs_1",
      product_cart: [{ product_id: "prod_allin" }],
      customer_email: "buyer@example.com",
    });
  });

  it("returns ThankYouPageStripe with isInvited=true when purchase is invited", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.sessionsRetrieveMock.mockResolvedValueOnce({
      id: "cs_1",
      amount_total: 49900,
      payment_status: "paid",
      metadata: { productId: "prod_allin" },
      customer_details: { email: "buyer@example.com" },
    });

    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce({
      isInvited: true,
    });

    const el: any = await Page({
      searchParams: Promise.resolve({ session_id: "cs_1" }),
    } as any);

    expect(el.props.isInvited).toBe(true);
  });
});
