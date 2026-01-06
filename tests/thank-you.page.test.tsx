/** @vitest-environment node */

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

type MockFetchResponse = {
  ok: boolean;
  status?: number;
  json: () => Promise<any>;
};

const hoisted = vi.hoisted(() => {
  const notFoundError = Object.assign(new Error("NEXT_NOT_FOUND"), {
    code: "NEXT_NOT_FOUND",
  });

  const notFoundMock = vi.fn(() => {
    throw notFoundError;
  });

  const prismaMock = {
    purchase: {
      findFirst: vi.fn(async () => null as any),
    },
  };

  const trackEventMock = vi.fn((event: string) => {
    void event;
    return undefined;
  });

  const fetchMock =
    vi.fn<
      (
        input: RequestInfo | URL,
        init?: RequestInit,
      ) => Promise<MockFetchResponse>
    >();

  return {
    notFoundError,
    notFoundMock,
    prismaMock,
    trackEventMock,
    fetchMock,
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

// Mock the ThankYouPage component imported from "./form"
vi.mock("../app/thank-you/form", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      return <div data-testid="thank-you" {...props} />;
    },
  };
});

async function loadPageModule() {
  vi.resetModules();
  process.env.DODO_SECRET = "dodo_secret";
  globalThis.fetch = hoisted.fetchMock as any;

  return await import("../app/thank-you/page");
}

function okPayment(data: any): MockFetchResponse {
  return {
    ok: true,
    status: 200,
    json: async () => data,
  };
}

function notOkPayment(status = 403): MockFetchResponse {
  return {
    ok: false,
    status,
    json: async () => ({ error: "nope" }),
  };
}

describe("/thank-you page", () => {
  beforeEach(() => {
    hoisted.notFoundMock.mockClear();
    hoisted.trackEventMock.mockClear();
    hoisted.prismaMock.purchase.findFirst.mockReset().mockResolvedValue(null);
    hoisted.fetchMock.mockReset();
  });

  it("calls notFound() when payment_id is missing", async () => {
    const { default: Page } = await loadPageModule();

    await expect(
      Page({
        searchParams: Promise.resolve({ payment_id: "", status: "succeeded" }),
      } as any),
    ).rejects.toBe(hoisted.notFoundError);

    expect(hoisted.notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("calls notFound() when status is missing", async () => {
    const { default: Page } = await loadPageModule();

    await expect(
      Page({
        searchParams: Promise.resolve({ payment_id: "pay_1", status: "" }),
      } as any),
    ).rejects.toBe(hoisted.notFoundError);

    expect(hoisted.notFoundMock).toHaveBeenCalledTimes(1);
  });

  it("returns FailedPage when status is not succeeded (no fetch)", async () => {
    const { default: Page } = await loadPageModule();

    const el = await Page({
      searchParams: Promise.resolve({ payment_id: "pay_1", status: "failed" }),
    } as any);

    const html = renderToStaticMarkup(el as any);
    expect(html).toContain("Failed payment");

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.trackEventMock).not.toHaveBeenCalled();
    expect(hoisted.prismaMock.purchase.findFirst).not.toHaveBeenCalled();
  });

  it("returns FailedPage and tracks when payment fetch is not ok", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.fetchMock.mockResolvedValueOnce(notOkPayment(403));

    const el = await Page({
      searchParams: Promise.resolve({
        payment_id: "pay_1",
        status: "succeeded",
      }),
    } as any);

    const html = renderToStaticMarkup(el as any);
    expect(html).toContain("Failed payment");

    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      "💰 Error on /thank-you page - pay_1 💔",
    );

    expect(hoisted.prismaMock.purchase.findFirst).not.toHaveBeenCalled();
  });

  it("returns FailedPage when payment status is not succeeded", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.fetchMock.mockResolvedValueOnce(okPayment({ status: "pending" }));

    const el = await Page({
      searchParams: Promise.resolve({
        payment_id: "pay_1",
        status: "succeeded",
      }),
    } as any);

    const html = renderToStaticMarkup(el as any);
    expect(html).toContain("Failed payment");

    expect(hoisted.trackEventMock).not.toHaveBeenCalled();
    expect(hoisted.prismaMock.purchase.findFirst).not.toHaveBeenCalled();
  });

  it("returns ThankYouPage with isInvited=false when no purchase exists", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.fetchMock.mockResolvedValueOnce(
      okPayment({ status: "succeeded", foo: 1 }),
    );
    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce(null);

    const el: any = await Page({
      searchParams: Promise.resolve({
        payment_id: "pay_1",
        status: "succeeded",
      }),
    } as any);

    expect(hoisted.fetchMock).toHaveBeenCalledWith(
      "https://live.dodopayments.com/payments/pay_1",
      expect.objectContaining({
        headers: { Authorization: "Bearer dodo_secret" },
      }),
    );

    expect(hoisted.prismaMock.purchase.findFirst).toHaveBeenCalledWith({
      where: { paymentId: "pay_1" },
    });

    expect(el.props.isInvited).toBe(false);
    expect(el.props.paymentData).toEqual({ status: "succeeded", foo: 1 });
  });

  it("returns ThankYouPage with isInvited=true when purchase is invited", async () => {
    const { default: Page } = await loadPageModule();

    hoisted.fetchMock.mockResolvedValueOnce(okPayment({ status: "succeeded" }));
    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce({
      isInvited: true,
    });

    const el: any = await Page({
      searchParams: Promise.resolve({
        payment_id: "pay_1",
        status: "succeeded",
      }),
    } as any);

    expect(el.props.isInvited).toBe(true);
  });
});
