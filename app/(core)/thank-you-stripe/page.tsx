import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";
import Stripe from "stripe";
import ThankYouPageStripe from "./form";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const sessionId = (await searchParams).session_id;

  if (!sessionId) {
    notFound();
  }

  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    trackEvent("💰 Error on /thank-you-stripe page - " + sessionId + " 💔");
    return <FailedPage />;
  }

  if (session.payment_status !== "paid") {
    return <FailedPage />;
  }

  const purchase = await prisma.purchase.findFirst({
    where: {
      paymentId: sessionId,
    },
  });

  const paymentData = {
    settlement_amount: session.amount_total,
    payment_id: session.id,
    product_cart: [{ product_id: session.metadata?.productId }],
    customer_email: session.customer_details?.email,
  };

  return (
    <ThankYouPageStripe
      paymentData={paymentData}
      isInvited={purchase?.isInvited ?? false}
    />
  );
}

function FailedPage() {
  return (
    <div className="flex min-h-[300px] flex-1 flex-grow flex-col items-center justify-center">
      <h2 className="mb-4 text-4xl font-bold">Failed payment 🥺</h2>
      <Link
        href="/#pricing"
        className="font-bold text-blue-500 hover:underline"
      >
        Try again
      </Link>
    </div>
  );
}
