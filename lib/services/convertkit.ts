import "server-only";
import { env } from "@/lib/env";

const KIT_BASE = "https://api.kit.com/v4";

async function postToKit(path: string, body: Record<string, string>) {
  const res = await fetch(`${KIT_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": env.CONVERTKIT_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`ConvertKit request failed (${res.status}): ${text}`);
  }
}

export async function ensureSubscriber(email: string) {
  await postToKit("/subscribers", { email_address: email });
}

export async function addSubscriberToForm(email: string) {
  await postToKit(`/forms/${env.CONVERTKIT_FORM_ID}/subscribers`, {
    email_address: email,
  });
}
