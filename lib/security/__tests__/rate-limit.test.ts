import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const request = new NextRequest("http://local/test", {
  headers: { "x-forwarded-for": "1.2.3.4" },
});

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe("/lib/security/rate-limit.ts", () => {
  it("does nothing when ratelimit is not set up", async () => {
    vi.doMock("@/lib/rate-limiter", () => ({
      ratelimit: null,
    }));

    const { assertRateLimit } = await import("../rate-limit");

    await expect(assertRateLimit(request)).resolves.toBeUndefined();
  });

  it("doesn't throw when ratelimit succeeds", async () => {
    const limit = vi.fn().mockResolvedValue({ success: true });
    vi.doMock("@/lib/rate-limiter", () => ({
      ratelimit: { limit },
    }));

    const { assertRateLimit } = await import("../rate-limit");

    await assertRateLimit(request);

    expect(limit).toHaveBeenCalledOnce();
    expect(limit).toHaveBeenCalledWith("1.2.3.4");

    await expect(assertRateLimit(request)).resolves.toBeUndefined();
  });

  it("throws RATE_LIMITED when ratelimit fails", async () => {
    const limit = vi.fn().mockResolvedValue({ success: false });
    vi.doMock("@/lib/rate-limiter", () => ({
      ratelimit: { limit },
    }));

    const { assertRateLimit } = await import("../rate-limit");

    await expect(assertRateLimit(request)).rejects.toMatchObject({
      code: "RATE_LIMITED",
      httpStatus: 429,
      safeMessage: "Too many requests. Please wait a moment.",
    });
  });
});
