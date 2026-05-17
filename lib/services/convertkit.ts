import "server-only";
import { env } from "@/lib/env";
import { AppError } from "@/lib/http/app-error";

const KIT_BASE = "https://api.kit.com/v4";

type KitPayload = Record<string, string | number | boolean | null>;

export function assertEmail(email: string) {
  if (!email.includes("@")) {
    throw new AppError({
      code: "INVALID_EMAIL",
      httpStatus: 400,
      safeMessage: "Invalid email address.",
    });
  }
}

export async function postToKit(path: string, body: KitPayload) {
  let res: Response;

  try {
    res = await fetch(`${KIT_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": env.CONVERTKIT_API_KEY,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new AppError({
      code: "CONVERTKIT_ERROR",
      httpStatus: 502,
      safeMessage: `Unable to reach Kit`,
    });
  }

  if (!res.ok) {
    throw new AppError({
      code: "CONVERTKIT_ERROR",
      httpStatus: 502,
      safeMessage: `Kit rejected the subscriber request`,
    });
  }

  return res.json().catch(() => null);
}

export async function ensureSubscriber(email: string) {
  assertEmail(email);
  return postToKit("/subscribers", { email_address: email });
}

export async function addSubscriberToForm(email: string) {
  assertEmail(email);
  return postToKit(`/forms/${env.CONVERTKIT_FORM_ID}/subscribers`, {
    email_address: email,
  });
}
