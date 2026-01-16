"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import usePurchaseStats from "@/hooks/use-purchase-stats";
import { trackEvent } from "@/services/custom-analytics";

export default function TutorialUrgencyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { customersCount, discountLimit } = usePurchaseStats();

  useEffect(() => {
    // Show banner after scrolling 50% of the page
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage > 60 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    trackEvent("Tutorial_UrgencyBanner_dismissed");
  };

  const handleClick = () => {
    trackEvent("Tutorial_UrgencyBanner_clicked");
    window?.datafast?.("tutorial_urgency_banner_clicked");
  };

  if (!isVisible || isDismissed) return null;

  const spotsLeft = discountLimit - customersCount;

  return (
    <div className="animate-slide-up fixed right-0 bottom-0 left-0 z-50">
      <div className="bg-primary shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex flex-1 flex-col gap-1 text-white md:flex-row md:items-center md:gap-3">
            <p className="text-base font-bold md:text-lg">50% Off NextNative</p>
            <p className="text-sm md:text-base">
              <span className="font-bold">{spotsLeft} spots left</span> · $125
              (was $249)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleClick();
                window.location.href = "/#pricing";
              }}
              className="text-primary hover:bg-primary cursor-pointer rounded-[12px] border-2 border-white bg-white px-6 py-2 text-sm font-[500] whitespace-nowrap transition hover:text-white md:px-8 md:text-base"
            >
              Start developing today →
            </button>
            <button
              onClick={handleDismiss}
              className="cursor-pointer text-white transition hover:text-gray-200"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
