import { fromError, ok } from "@/lib/http/api-response";
import { AppError } from "@/lib/http/app-error";
import { ratelimit } from "@/lib/rate-limiter";
import { playgroundAccessSchema } from "@/lib/schemas/playground-access";
import { assertAllowedOrigin } from "@/lib/security/origin";
import { getRequestIp } from "@/lib/security/request-ip";
import { grantPlaygroundAccess } from "@/lib/services/playground-access";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    assertAllowedOrigin(request.headers.get("origin"), ["https://nextnative.dev"]);

    if (ratelimit) {
      const ip = getRequestIp(request);
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        throw new AppError({
          code: "RATE_LIMITED",
          httpStatus: 429,
          safeMessage: "Too many requests. Please wait a moment.",
        });
      }
    }

    const body = await request.json();
    const parsed = playgroundAccessSchema.safeParse(body);
    if (!parsed.success) {
      throw new AppError({
        code: "INVALID_INPUT",
        httpStatus: 400,
        safeMessage: "Valid email is required",
      });
    }

    await grantPlaygroundAccess(parsed.data.email);
    return ok({ message: "Access granted" });
  } catch (error) {
    return fromError(error);
  }
}
