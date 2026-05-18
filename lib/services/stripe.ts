import "server-only";
import Stripe from "stripe";
import { AppError } from "../http/app-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

const PRICE_IDS: Record<string, string> = {
  starter: process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID!,
  "all-in": process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID!,
};

const PRODUCT_IDS: Record<string, string> = {
  starter: process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID!,
  "all-in": process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID!,
};

export const createCheckoutUrl = async (plan: string): Promise<string> => {
  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    throw new AppError({
      code: "INVALID_BODY",
      httpStatus: 400,
      safeMessage: "Invalid plan",
    });
  }

  const productId = PRODUCT_IDS[plan];
  if (!productId) {
    throw new AppError({
      code: "INVALID_BODY",
      httpStatus: 400,
      safeMessage: "Invalid plan",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      invoice_creation: { enabled: false },
      automatic_tax: { enabled: false },
      payment_method_types: ["card"],
      discounts: [
        {
          promotion_code:
            process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_PROMOTION_CODE_ID,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank-you-stripe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.NEXT_PUBLIC_APP_URL,
      metadata: { productId },
    });

    if (!session.url) {
      throw new AppError({
        code: "STRIPE_ERROR",
        httpStatus: 500,
        safeMessage: "Failed to create a Stripe checkout",
      });
    }

    return session.url;
  } catch (err) {
    throw new AppError({
      code: "STRIPE_ERROR",
      httpStatus: 500,
      safeMessage: "Failed to create a Stripe checkout",
      message: err instanceof Error ? err.message : undefined,
    });
  }
};
