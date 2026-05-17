import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const validOrigin = "https://nextnative.dev";
const allowedOrigins = [validOrigin];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("/lib/security/origin.ts", () => {
  it("doesn't throw if valid origin", async () => {
    const { assertAllowedOrigin } = await import("../origin");

    expect(() =>
      assertAllowedOrigin(validOrigin, allowedOrigins),
    ).not.toThrow();
  });
  it("throws if no origin", async () => {
    const { assertAllowedOrigin } = await import("../origin");

    expect(() => assertAllowedOrigin(null, allowedOrigins)).toThrow(
      expect.objectContaining({
        code: "FORBIDDEN_ORIGIN",
        httpStatus: 403,
        safeMessage: "Forbidden",
      }),
    );
  });
  it("throws if wrong origin", async () => {
    const { assertAllowedOrigin } = await import("../origin");

    expect(() =>
      assertAllowedOrigin("https://hacker.com", allowedOrigins),
    ).toThrow(
      expect.objectContaining({
        code: "FORBIDDEN_ORIGIN",
        httpStatus: 403,
        safeMessage: "Forbidden",
      }),
    );
  });
  it("throws if empty allowedOrigins", async () => {
    const { assertAllowedOrigin } = await import("../origin");

    expect(() => assertAllowedOrigin(validOrigin, [])).toThrow(
      expect.objectContaining({
        code: "FORBIDDEN_ORIGIN",
        httpStatus: 403,
        safeMessage: "Forbidden",
      }),
    );
  });
});
