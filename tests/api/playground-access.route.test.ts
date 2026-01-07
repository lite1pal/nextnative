/** @vitest-environment node */

import { beforeEach, describe, expect, it, vi } from "vitest";

type MockFetchResponse = {
  ok: boolean;
  status?: number;
  text: () => Promise<string>;
};

const hoisted = vi.hoisted(() => {
  const headersMock = vi.fn(async () => new Headers());
  const ratelimitLimitMock = vi.fn(async (_ip: string) => ({ success: true }));

  const trackEventMock = vi.fn((event: string, _isUserEvent?: boolean) => {
    void event;
    return undefined;
  });

  const sendMessageToTelegramMock = vi.fn(async (_msg: string) => {
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
    headersMock,
    ratelimitLimitMock,
    trackEventMock,
    sendMessageToTelegramMock,
    fetchMock,
  };
});

vi.mock("next/headers", () => ({
  headers: hoisted.headersMock,
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) =>
      new Response(JSON.stringify(data), {
        status: init?.status ?? 200,
        headers: { "content-type": "application/json" },
      }),
  },
}));

vi.mock("@/lib/rate-limiter", () => ({
  ratelimit: {
    limit: hoisted.ratelimitLimitMock,
  },
}));

vi.mock("@/services/custom-analytics", () => ({
  trackEvent: hoisted.trackEventMock,
}));

vi.mock("@/services/telegram", () => ({
  sendMessageToTelegram: hoisted.sendMessageToTelegramMock,
}));

async function loadRoute() {
  vi.resetModules();

  process.env.CONVERTKIT_API_KEY = "ck_key";
  process.env.CONVERTKIT_FORM_ID = "123";

  globalThis.fetch = hoisted.fetchMock as any;

  return await import("../../app/api/playground-access/route");
}

function okText(text = "ok"): MockFetchResponse {
  return {
    ok: true,
    status: 200,
    text: async () => text,
  };
}

function notOkText(status = 400, text = "bad"): MockFetchResponse {
  return {
    ok: false,
    status,
    text: async () => text,
  };
}

function makeRequest(
  jsonValue: any,
  opts?: {
    origin?: string;
  },
) {
  const origin = opts?.origin ?? "https://nextnative.dev";
  return {
    headers: new Headers({ origin }),
    json: vi.fn(async () => jsonValue),
  } as any;
}

describe("/api/playground-access POST", () => {
  beforeEach(() => {
    hoisted.headersMock
      .mockReset()
      .mockResolvedValue(new Headers({ "x-forwarded-for": "1.2.3.4" }));
    hoisted.ratelimitLimitMock.mockReset().mockResolvedValue({ success: true });

    hoisted.trackEventMock.mockClear();
    hoisted.sendMessageToTelegramMock.mockReset().mockResolvedValue(undefined);

    hoisted.fetchMock.mockReset();
  });

  it("returns 429 when rate limited (and tracks)", async () => {
    const { POST } = await loadRoute();

    hoisted.ratelimitLimitMock.mockResolvedValueOnce({ success: false });

    const req = makeRequest({ email: "a@b.com" });
    const res = await POST(req);

    expect(res.status).toBe(429);
    await expect(res.json()).resolves.toEqual({
      error: "Too many requests. Please wait a moment.",
    });

    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      "⛔ Rate limited IP: 1.2.3.4",
      false,
    );

    expect(req.json).not.toHaveBeenCalled();
    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.sendMessageToTelegramMock).not.toHaveBeenCalled();
  });

  it("uses 'anonymous' ip when header missing", async () => {
    const { POST } = await loadRoute();

    hoisted.headersMock.mockResolvedValueOnce(new Headers());
    hoisted.ratelimitLimitMock.mockResolvedValueOnce({ success: false });

    const req = makeRequest({ email: "a@b.com" });
    const res = await POST(req);

    expect(res.status).toBe(429);
    expect(hoisted.ratelimitLimitMock).toHaveBeenCalledWith("anonymous");
  });

  it("returns 403 when origin is not allowed", async () => {
    const { POST } = await loadRoute();

    const req = makeRequest(
      { email: "user@example.com" },
      { origin: "https://evil.example" },
    );
    const res = await POST(req);

    expect(res.status).toBe(403);
    await expect(res.json()).resolves.toEqual({ error: "Forbidden" });

    expect(req.json).not.toHaveBeenCalled();
    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.sendMessageToTelegramMock).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid email", async () => {
    const { POST } = await loadRoute();

    const req = makeRequest({ email: "not-an-email" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      error: "Valid email is required",
    });

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.sendMessageToTelegramMock).not.toHaveBeenCalled();
  });

  it("returns 500 when request.json throws", async () => {
    const { POST } = await loadRoute();

    const req = {
      headers: new Headers({ origin: "https://nextnative.dev" }),
      json: vi.fn(async () => {
        throw new Error("bad json");
      }),
    } as any;
    const res = await POST(req);

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Internal server error",
    });

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.sendMessageToTelegramMock).not.toHaveBeenCalled();
  });

  it("succeeds when ConvertKit env is missing (still sends Telegram)", async () => {
    const { POST } = await loadRoute();

    delete process.env.CONVERTKIT_API_KEY;
    delete process.env.CONVERTKIT_FORM_ID;

    const req = makeRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      success: true,
      message: "Access granted",
    });

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.sendMessageToTelegramMock).toHaveBeenCalledWith(
      "✅ New playground access request: user@example.com",
    );
  });

  it("succeeds when ConvertKit calls fail (non-fatal)", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock
      // Step 1: upsert subscriber
      .mockImplementationOnce(async () => notOkText(400, "nope"))
      // Step 2: add to form
      .mockImplementationOnce(async () => notOkText(500, "oops"));

    const req = makeRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      success: true,
      message: "Access granted",
    });

    expect(hoisted.fetchMock).toHaveBeenCalledTimes(2);
    expect(hoisted.sendMessageToTelegramMock).toHaveBeenCalled();
  });

  it("succeeds when ConvertKit fetch throws (non-fatal)", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock
      .mockImplementationOnce(async () => {
        throw new Error("network down");
      })
      .mockImplementationOnce(async () => {
        throw new Error("network down");
      });

    const req = makeRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      success: true,
      message: "Access granted",
    });

    expect(hoisted.fetchMock).toHaveBeenCalledTimes(2);
    expect(hoisted.sendMessageToTelegramMock).toHaveBeenCalled();
  });

  it("calls ConvertKit endpoints with correct headers", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock
      .mockImplementationOnce(async () => okText())
      .mockImplementationOnce(async () => okText());

    const req = makeRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(200);

    expect(hoisted.fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.kit.com/v4/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Kit-Api-Key": "ck_key",
        }),
      }),
    );

    expect(hoisted.fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.kit.com/v4/forms/123/subscribers",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Kit-Api-Key": "ck_key",
        }),
      }),
    );

    expect(hoisted.sendMessageToTelegramMock).toHaveBeenCalledWith(
      "✅ New playground access request: user@example.com",
    );
  });

  it("returns 500 when Telegram send fails", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock
      .mockImplementationOnce(async () => okText())
      .mockImplementationOnce(async () => okText());

    hoisted.sendMessageToTelegramMock.mockRejectedValueOnce(
      new Error("telegram down"),
    );

    const req = makeRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Internal server error",
    });
  });
});
