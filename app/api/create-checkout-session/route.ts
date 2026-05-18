import { NextRequest } from "next/server";
import { assertAllowedOrigin } from "@/lib/security/origin";
import { AppError } from "@/lib/http/app-error";
import { fromError, ok } from "@/lib/http/api-response";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { createCheckoutUrl } from "@/lib/services/stripe";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    assertAllowedOrigin(req.headers.get("origin"), [
      "https://nextnative.dev",
      env.NODE_ENV === "development" ? "http://localhost:3000" : "",
    ]);
    // TODO: self-host Redis and then uncomment this line
    // await assertRateLimit(req);

    const { plan } = await req.json();

    if (!plan) {
      throw new AppError({
        code: "INVALID_BODY",
        httpStatus: 400,
        safeMessage: "Plan is missing from the body",
      });
    }

    console.time("createCheckoutUrl");
    const url = await createCheckoutUrl(plan);
    console.timeEnd("createCheckoutUrl");

    return ok({ url });
  } catch (err) {
    return fromError(err);
  }
}
