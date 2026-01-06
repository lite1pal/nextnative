/** @vitest-environment node */

import { beforeEach, describe, expect, it, vi } from "vitest";

type MockFetchResponse = {
  ok: boolean;
  status?: number;
  json: () => Promise<any>;
};

const hoisted = vi.hoisted(() => {
  const headersMock = vi.fn(async () => new Headers());
  const ratelimitLimitMock = vi.fn(async (_ip: string) => ({ success: true }));

  const trackEventMock = vi.fn((event: string, _isUserEvent?: boolean) => {
    void event;
    return undefined;
  });

  const prismaMock = {
    purchase: {
      findFirst: vi.fn(async () => null as any),
      update: vi.fn(async () => ({ id: "purchase_1" })),
      create: vi.fn(async () => ({ id: "purchase_2" })),
    },
  };

  const addCollaboratorMock = vi.fn(async () => undefined);

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
    prismaMock,
    addCollaboratorMock,
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

vi.mock("@/prisma/client", () => ({
  prisma: hoisted.prismaMock,
}));

vi.mock("@octokit/rest", () => {
  class Octokit {
    repos = {
      addCollaborator: hoisted.addCollaboratorMock,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_opts: any) {}
  }

  return { Octokit };
});

async function loadRoute() {
  vi.resetModules();

  process.env.DODO_SECRET = "test_dodo";
  process.env.DATAFAST_API_KEY = "datafast_key";
  process.env.GITHUB_TOKEN = "github_token";

  globalThis.fetch = hoisted.fetchMock as any;
  return await import("../../app/api/submit-username/route");
}

function makeRequest(body: any, opts?: { datafastVisitorId?: string }) {
  return {
    json: vi.fn(async () => body),
    cookies: {
      get: vi.fn((name: string) => {
        if (name !== "datafast_visitor_id") return undefined;
        if (!opts?.datafastVisitorId) return undefined;
        return { value: opts.datafastVisitorId };
      }),
    },
  } as any;
}

function okJson(data: any): MockFetchResponse {
  return { ok: true, json: async () => data };
}

function notOkJson(
  status = 403,
  data: any = { error: "nope" },
): MockFetchResponse {
  return { ok: false, status, json: async () => data };
}

describe("/api/submit-username POST", () => {
  beforeEach(() => {
    hoisted.headersMock
      .mockReset()
      .mockResolvedValue(new Headers({ "x-forwarded-for": "1.2.3.4" }));

    hoisted.ratelimitLimitMock.mockReset().mockResolvedValue({ success: true });
    hoisted.trackEventMock.mockClear();

    hoisted.prismaMock.purchase.findFirst.mockReset().mockResolvedValue(null);
    hoisted.prismaMock.purchase.update.mockReset().mockResolvedValue({
      id: "purchase_1",
    });
    hoisted.prismaMock.purchase.create.mockReset().mockResolvedValue({
      id: "purchase_2",
    });

    hoisted.addCollaboratorMock.mockReset().mockResolvedValue(undefined);
    hoisted.fetchMock.mockReset();
  });

  it("returns 429 when rate limited (and tracks)", async () => {
    const { POST } = await loadRoute();

    hoisted.ratelimitLimitMock.mockResolvedValueOnce({ success: false });

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    await expect(res.json()).resolves.toEqual({
      error: "Too many requests. Please wait a moment.",
    });

    expect(hoisted.trackEventMock).toHaveBeenCalled();
    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("uses 'anonymous' ip when header missing", async () => {
    const { POST } = await loadRoute();

    hoisted.headersMock.mockResolvedValueOnce(new Headers());
    hoisted.ratelimitLimitMock.mockResolvedValueOnce({ success: false });

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
    expect(hoisted.ratelimitLimitMock).toHaveBeenCalledWith("anonymous");
  });

  it("returns 400 for invalid input", async () => {
    const { POST } = await loadRoute();

    const req = makeRequest({
      githubUsername: "",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "Invalid input" });

    expect(hoisted.fetchMock).not.toHaveBeenCalled();
    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("returns 403 when payment fetch is not ok", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () => notOkJson(403));

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid or unsuccessful payment",
    });

    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("calls payment API with bearer token", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "failed" }),
    );

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    await POST(req);

    expect(hoisted.fetchMock).toHaveBeenCalledWith(
      "https://live.dodopayments.com/payments/pay_12345",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer test_dodo",
        }),
      }),
    );
  });

  it("returns 403 when payment status is not succeeded", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "pending" }),
    );

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
    await expect(res.json()).resolves.toEqual({
      error: "Invalid or unsuccessful payment",
    });

    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("returns 409 when already invited", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce({
      id: "purchase_existing",
      isInvited: true,
    });

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(409);
    await expect(res.json()).resolves.toEqual({ error: "Already invited" });
    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("returns 500 when GitHub token is missing", async () => {
    const { POST } = await loadRoute();
    process.env.GITHUB_TOKEN = "";

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    // DataFast call happens next; return OK
    hoisted.fetchMock.mockImplementationOnce(async () => okJson({ ok: true }));

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "GitHub token is not configured",
    });

    expect(hoisted.addCollaboratorMock).not.toHaveBeenCalled();
  });

  it("succeeds (existing purchase): invites and updates purchase", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    hoisted.prismaMock.purchase.findFirst.mockResolvedValueOnce({
      id: "purchase_existing",
      isInvited: false,
    });
    // Datafast call
    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ success: true }),
    );

    const req = makeRequest(
      {
        githubUsername: "octocat",
        paymentId: "pay_12345",
        amount: 99,
      },
      { datafastVisitorId: "visitor_1" },
    );

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      message: "Invitation sent successfully",
    });

    expect(hoisted.addCollaboratorMock).toHaveBeenCalledWith({
      owner: "lite1pal",
      repo: "nextnative_boilerplate",
      username: "octocat",
      permission: "pull",
    });
    expect(hoisted.trackEventMock).toHaveBeenCalledWith(
      "💌 User invited to repo - octocat",
      false,
    );
    expect(hoisted.prismaMock.purchase.update).toHaveBeenCalledWith({
      where: { id: "purchase_existing" },
      data: { isInvited: true, githubUsername: "octocat" },
    });
    expect(hoisted.prismaMock.purchase.create).not.toHaveBeenCalled();
  });

  it("succeeds (new purchase): invites and creates purchase", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    // Datafast call
    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ success: true }),
    );

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      message: "Invitation sent successfully",
    });

    expect(hoisted.prismaMock.purchase.create).toHaveBeenCalledWith({
      data: {
        paymentId: "pay_12345",
        githubUsername: "octocat",
        isInvited: true,
      },
    });
    expect(hoisted.prismaMock.purchase.update).not.toHaveBeenCalled();
  });

  it("does not fail the request if DataFast tracking fails", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    // Datafast call fails; should be swallowed
    hoisted.fetchMock.mockImplementationOnce(async () =>
      notOkJson(400, { message: "DataFast error" }),
    );

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(hoisted.addCollaboratorMock).toHaveBeenCalled();
  });

  it("returns 500 when GitHub invite throws and tracks error", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    // Datafast call
    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ success: true }),
    );
    hoisted.addCollaboratorMock.mockRejectedValueOnce(new Error("GitHub down"));

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Failed to process username",
    });

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Error on submit-username"))).toBe(
      true,
    );
  });

  it("returns 500 when prisma write throws and tracks error", async () => {
    const { POST } = await loadRoute();

    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ status: "succeeded" }),
    );
    // Datafast call
    hoisted.fetchMock.mockImplementationOnce(async () =>
      okJson({ success: true }),
    );
    hoisted.prismaMock.purchase.create.mockRejectedValueOnce(
      new Error("db write failed"),
    );

    const req = makeRequest({
      githubUsername: "octocat",
      paymentId: "pay_12345",
      amount: 99,
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      error: "Failed to process username",
    });

    const calls = hoisted.trackEventMock.mock.calls.map((c) => String(c[0]));
    expect(calls.some((c) => c.includes("Error on submit-username"))).toBe(
      true,
    );
  });
});
