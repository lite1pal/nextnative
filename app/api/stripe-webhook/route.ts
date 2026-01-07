import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { sendWelcomeEmail } from "@/services/resend";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed." },
      { status: 400 },
    );
  }

  try {
    // ⚡ Only handle completed Checkout sessions
    if (event.type !== "checkout.session.completed") {
      return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
    }

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      throw new Error("Missing customer email in session");
    }

    // ⚡ Assume your Stripe products are in session.line_items
    // (You may need to expand 'line_items' when creating the session on server)
    const productId = (session.metadata?.productId as string) || undefined;

    if (!productId) {
      await trackEvent("💰 Missing productId in Stripe session 💔", false);
      throw new Error("Missing productId in Stripe session metadata");
    }

    console.log("productId", productId);

    const productName =
      productId === process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID
        ? "All-in"
        : "Starter";
    if (!productName) {
      return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
    }

    // ⚡ Analytics tracking
    await trackEvent(
      `💰 NextNative_payment_succeeded - ${productName} - ${customerEmail} 🎉`,
      false,
    );

    // ⚡ Record purchase in DB (idempotent by Stripe session ID)
    const existing = await prisma.purchase.findFirst({
      where: { paymentId: session.id },
    });
    if (!existing) {
      console.log("prisma.purchase create", {
        paymentId: session.id,
        email: customerEmail,
      });
      await prisma.purchase.create({
        data: {
          paymentId: session.id,
          email: customerEmail,
        },
      });

      // Update customer count
      console.log("prisma.globalNumber.update");
      // await prisma.globalNumber.update({
      //   where: { id: "99c3a4be-4565-451b-813e-82bf381568d7" },
      //   data: { value: { increment: 1 } },
      // });

      // Send welcome email
      //   try {
      //     const emailResult = await sendWelcomeEmail({
      //       email: customerEmail,
      //       link: `https://nextnative.dev/thank-you?paymentId=${session.id}&status=succeeded`,
      //     });

      //     if (emailResult.success) {
      //       trackEvent("📧 Welcome email sent - " + customerEmail + " ✉️", false);
      //     } else {
      //       trackEvent(
      //         "📧 Welcome email failed - " + customerEmail + " ❌",
      //         false,
      //       );
      //       console.error("Failed to send welcome email:", emailResult.message);
      //     }
      //   } catch (emailError) {
      //     trackEvent("📧 Welcome email error - " + customerEmail + " 💥", false);
      //     console.error("Welcome email error:", emailError);
      //   }

      //   revalidatePath("/api/customers-count");
    }

    return NextResponse.json({ message: "Webhook processed" }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe webhook processing error:", err);
    await trackEvent(
      "💰 Error on Stripe webhook - " + err.message + " 💔",
      false,
    );
    return NextResponse.json({ message: "Webhook failed" }, { status: 500 });
  }
}
