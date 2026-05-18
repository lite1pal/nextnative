import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const ip = "127.0.0.1";

const forwardedIps = "198.51.100.42, 203.0.113.10, 10.0.0.5";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("/lib/security/request-ip.ts", () => {
  it("returns real ip address", async () => {
    const { getRequestIp } = await import("../request-ip");

    const request = new NextRequest("http://local/test", {
      headers: { "x-real-ip": ip },
    });

    const result = getRequestIp(request);

    expect(result).toBe(ip);
  });

  it("returns first ip address when forwarded", async () => {
    const { getRequestIp } = await import("../request-ip");

    const request = new NextRequest("http://local/test", {
      headers: { "x-real-ip": ip, "x-forwarded-for": forwardedIps },
    });

    const result = getRequestIp(request);

    expect(result).toBe("198.51.100.42");
  });
});
