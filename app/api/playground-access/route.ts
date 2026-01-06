import { ratelimit } from "@/lib/rate-limiter";
import { trackEvent } from "@/services/custom-analytics";
import { sendMessageToTelegram } from "@/services/telegram";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const KIT_BASE = "https://api.kit.com/v4";

export async function POST(request: NextRequest) {
  // ✅ Rate limit by IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success: allowed } = await ratelimit.limit(ip);

  if (!allowed) {
    trackEvent(`⛔ Rate limited IP: ${ip}`, false);
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  // ✅ Protect by origin
  const origin = request.headers.get("origin");
  const allowedOrigins = ["https://nextnative.dev"];

  console.log(origin);

  if (!allowedOrigins.includes(origin || "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;

    // 1) Upsert subscriber (v4: POST /v4/subscribers)
    try {
      if (!API_KEY || !FORM_ID) {
        throw new Error("ConvertKit API key or Form ID is not set");
      }
      const res = await fetch(`${KIT_BASE}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        console.error("CK v4 create subscriber failed:", res.status, t);
        // Continue; if subscriber already exists, step 2 still works
      }
    } catch (error) {
      console.error("Error creating CK v4 subscriber:", error);
      // Continue; if subscriber already exists, step 2 still works
    }

    // 2) Add to form (v4: POST /v4/forms/{form_id}/subscribers)
    try {
      if (!API_KEY || !FORM_ID) {
        throw new Error("ConvertKit API key or Form ID is not set");
      }
      const res = await fetch(`${KIT_BASE}/forms/${FORM_ID}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        console.error("CK v4 add to form failed:", res.status, t);
        // Not fatal, but form triggers your automations, so worth logging
      }
    } catch (error) {
      console.error("Error adding CK v4 subscriber to form:", error);
      // Not fatal, but form triggers your automations, so worth logging
    }

    // Here you would typically:
    // 1. Save email to your database
    // 2. Send a welcome email
    // 3. Track the conversion in analytics

    await sendMessageToTelegram("✅ New playground access request: " + email);

    // You could also send to your email service
    // await sendToEmailService(email, "playground-access");

    return NextResponse.json({
      success: true,
      message: "Access granted",
    });
  } catch (error) {
    console.error("Error granting playground access:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
