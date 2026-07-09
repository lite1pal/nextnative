"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";
import { useState } from "react";

type CheckoutButtonProps = {
  plan: "starter" | "all-in";
};

export default function CheckoutButton({ plan }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleBuy(plan: "starter" | "all-in") {
    setIsLoading(true);
    try {
      await trackEvent(`PricingSection_GetNextNative_${plan}_clicked`);
    } catch {}

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(`${error?.code}, ${error?.message}`);
      }

      const { data } = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Failed to create checkout session:", data.error);
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={() => handleBuy(plan)}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 py-5 text-[18px]"
      variant={plan === "all-in" ? "primary" : "secondary"}
    >
      {isLoading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        "Get instant access"
      )}
    </Button>
  );
}
