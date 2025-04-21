import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODOPAYMENTS_WEBHOOK_SECRET!); // Replace with your secret key generated from the Dodo Payments Dashboard

export async function POST(request: Request) {
  const headersList = await headers();
  const rawBody = await request.text();

  const webhookHeaders = {
    "webhook-id": headersList.get("webhook-id") || "",
    "webhook-signature": headersList.get("webhook-signature") || "",
    "webhook-timestamp": headersList.get("webhook-timestamp") || "",
  };

  await webhook.verify(rawBody, webhookHeaders);
  const payload = JSON.parse(rawBody) as any;

  if (!payload.data?.customer?.email) {
    throw new Error("Missing customer email in payload");
  }

  if (
    payload.data.payload_type === "Payment" &&
    payload.type === "payment.succeeded" &&
    !payload.data.subscription_id
  ) {
    trackEvent("💰 Payment_succeeded - " + payload.data.customer.email + " 🎉");
    console.log("Payment succeeded");
    await prisma.purchase.create({
      data: {
        paymentId: payload.data.id,
        email: payload.data.customer.email,
      },
    });

    // await handleOneTimePayment(email, payload);
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
