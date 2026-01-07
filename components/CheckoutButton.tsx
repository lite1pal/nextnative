"use client";

import Button from "./Button";

type CheckoutButtonProps = {
  plan: "starter" | "all-in";
};

export default function CheckoutButton({ plan }: CheckoutButtonProps) {
  async function handleBuy(plan: "starter" | "all-in") {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Failed to create checkout session:", data.error);
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
    }
  }

  return (
    <Button
      onClick={() => handleBuy(plan)}
      className="flex w-full items-center justify-center gap-2 py-5 text-[18px]"
      variant={plan === "all-in" ? "primary" : "secondary"}
    >
      Get NextNative
    </Button>
  );
}
