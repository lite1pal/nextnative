import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const validOrigin = "https://nextnative.dev";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/rate-limiter", () => ({
  ratelimit: null,
}));

vi.mock("@/lib/services/playground-access", () => ({
  grantPlaygroundAccess: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("POST /api/playground-access", () => {
  it("returns 200 when correct email is provided", async () => {
    const { POST } = await import("../route");

    const request = new NextRequest("http://local/api/playground-access", {
      method: "POST",
      headers: { Origin: validOrigin },
      body: JSON.stringify({ email: "myemail@gmail.com" }),
    });

    const res = await POST(request);

    expect(res.status).toBe(200);
  });

  it("returns 400 when email is invalid", async () => {
    const { POST } = await import("../route");
    const request = new NextRequest("http://local/api/playground-access", {
      method: "POST",
      headers: { Origin: validOrigin },
      body: JSON.stringify({ email: "myemailgmail.com" }),
    });

    const res = await POST(request);

    expect(res.status).toBe(400);

    const body = await res.json();

    expect(body).toMatchObject({
      ok: false,
      error: { code: "INVALID_INPUT", message: "Valid email is required" },
    });
  });

  it("returns 403 when origin isn't allowed", async () => {
    const { POST } = await import("../route");
    const request = new NextRequest("http://local/api/playground-access", {
      method: "POST",
      headers: { Origin: "https://myboy.com" },
    });
    const res = await POST(request);

    expect(res.status).toBe(403);

    const body = await res.json();

    expect(body).toMatchObject({
      ok: false,
      error: { code: "FORBIDDEN_ORIGIN", message: "Forbidden" },
    });
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
    const request = new NextRequest("http://local/api/playground-access", {
      method: "POST",
      headers: { Origin: validOrigin },
    });
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
