import { notFound } from "next/navigation";
import ThankYouPage from "./form";
import { prisma } from "@/prisma/client";

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

  const payment = await fetch(`${process.env.DODO_URL}/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.DODO_SECRET!}`,
    },
  });

  const paymentData = await payment.json();

  if (paymentData.status !== "succeeded") {
    notFound();
  }

  console.log(paymentData);

  const purchase = await prisma.purchase.findFirst({
    where: {
      paymentId,
    },
  });

  console.log(purchase);

  return <ThankYouPage isInvited={purchase?.isInvited ?? false} />;
}
