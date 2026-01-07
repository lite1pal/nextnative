import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  "all-in": process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID!,
};

const PRODUCT_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  "all-in": process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID!,
};

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const productId = PRODUCT_IDS[plan];
    if (!productId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000`,
      metadata: { productId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session creation failed", err);
    return NextResponse.json(
      { error: "Stripe session creation failed" },
      { status: 500 },
    );
  }
}
