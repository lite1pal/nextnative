import { notFound } from "next/navigation";
import ThankYouPage from "./form";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ payment_id: string; status: string }>;
}) {
  const paymentId = (await searchParams).payment_id;
  const status = (await searchParams).status;

  if (!paymentId || !status) {
    notFound();
  }

  if (status !== "succeeded") {
    notFound();
  }

  const payment = await fetch(
    `https://live.dodopayments.com/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DODO_SECRET!}`,
      },
    }
  );

  if (!payment.ok) {
    trackEvent("💰 Error on /thank-you page - " + paymentId + " 💔");
    notFound();
  }

  const paymentData = await payment.json();

  if (paymentData.status !== "succeeded") {
    notFound();
  }

  const purchase = await prisma.purchase.findFirst({
    where: {
      paymentId,
    },
  });

  return <ThankYouPage isInvited={purchase?.isInvited ?? false} />;
}
