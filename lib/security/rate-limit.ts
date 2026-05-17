import "server-only";
import { NextRequest } from "next/server";
import { ratelimit } from "@/lib/rate-limiter";
import { getRequestIp } from "@/lib/security/request-ip";
import { AppError } from "@/lib/http/app-error";

export const assertRateLimit = async (request: NextRequest) => {
  if (!ratelimit) return;

  const ip = getRequestIp(request);
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new AppError({
      code: "RATE_LIMITED",
      httpStatus: 429,
      safeMessage: "Too many requests. Please wait a moment.",
    });
  }
};
