import { notFound } from "next/navigation";
import ThankYouPage from "./form";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

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
    return <FailedPage />;
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
    return <FailedPage />;
  }

  const paymentData = await payment.json();

  if (paymentData.status !== "succeeded") {
    return <FailedPage />;
  }

  const purchase = await prisma.purchase.findFirst({
    where: {
      paymentId,
    },
  });

  return (
    <ThankYouPage
      paymentData={paymentData}
      isInvited={purchase?.isInvited ?? false}
    />
  );
}

function FailedPage() {
  return (
    <div className="flex flex-col items-center flex-1 flex-grow min-h-[300px] justify-center">
      <h2 className="text-4xl font-bold mb-4">Failed payment 🥺</h2>
      <Link
        href="https://nextnative.dev/#pricing"
        className="text-blue-500 font-bold hover:underline"
      >
        Try again
      </Link>
    </div>
  );
}
