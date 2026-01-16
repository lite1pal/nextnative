"use client";

import usePurchaseStats from "@/hooks/use-purchase-stats";

export default function UrgencyText() {
  const { customersCount, discountLimit } = usePurchaseStats();
  return (
    <p className="font-medium text-gray-500 sm:text-xl">
      <span className="text-red-500">🎁 50% off, </span> for the first{" "}
      {discountLimit} customers ({discountLimit - customersCount} left)
    </p>
  );
}
