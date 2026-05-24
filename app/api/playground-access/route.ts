import { env } from "@/lib/env";
import { fromError, ok } from "@/lib/http/api-response";
import { AppError } from "@/lib/http/app-error";
import { playgroundAccessSchema } from "@/lib/schemas/playground-access";
import { assertAllowedOrigin } from "@/lib/security/origin";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { grantPlaygroundAccess } from "@/lib/services/playground-access";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    assertAllowedOrigin(request.headers.get("origin"), [
      "https://nextnative.dev",
      "https://denistarasenko.com",
      env.NODE_ENV === "development" ? "http://localhost:3000" : "",
    ]);

    // TODO: self-host Redis and then uncomment this line
    await assertRateLimit(request);

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
