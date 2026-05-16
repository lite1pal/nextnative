"use client";

import { trackEvent } from "@/services/custom-analytics";

interface PurchaseButtonProps {
  link: string;
}

export default function PurchaseButton({ link }: PurchaseButtonProps) {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={link}
        onClick={(e) => {
          window?.datafast("purchase_clicked_from_template_page");
          trackEvent("CTA Template Page");
          // Purchase logic will be added here
        }}
        className="bg-primary hover:bg-primary/90 rounded-full px-10 py-5 text-xl font-semibold text-white shadow-xl transition-all hover:shadow-2xl"
      >
        Purchase Template
      </a>

      <p className="text-center text-gray-500">
        One-time payment • Lifetime access
      </p>
    </div>
  );
}
