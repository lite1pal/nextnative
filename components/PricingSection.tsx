"use client";

import usePurchaseStats from "@/hooks/use-purchase-stats";
import Button from "./Button";
import HighlightedSpan from "./HighlightedSpan";
import StarburstSign from "./StarburstSign";
import Subheading from "./Subheading";
import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";

const isWaitlist = false;

export const dodoPaymentLinks = {
  allAccess: process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_ALL_ACCESS_PROD!,
  starter: process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_STARTER_PROD!,
};

interface PricingFeature {
  text: string | React.ReactNode;
}

const pricingFeatures: PricingFeature[] = [
  { text: "Next.js + Capacitor boilerplate" },
  {
    text: (
      <Link
        className="border-primary hover:text-primary border-b border-dashed"
        href="/use-cases"
        onClick={() => {
          window?.datafast("apps_included_clicked_from_pricing");
          trackEvent("Apps Included - Pricing Section");
        }}
      >
        7 premium template apps included
      </Link>
    ),
  },
  { text: "Secure backend & Database" },
  { text: "Authentication & Onboarding flow" },
  { text: "Push notifications" },
  // { text: "Onboarding flow" },
  { text: "In-App Purchases & Subscriptions" },
  { text: "Lifetime updates" },
  { text: "App Store/Google Play launch guides" },
  { text: "3 months developer support" },
  { text: "Hands-on help if you get stuck" },
  { text: "Team license - unlimited team members" },
];

const pricingFeaturesStarter: PricingFeature[] = [
  { text: "Next.js + Capacitor boilerplate" },
  {
    text: (
      <Link
        className="border-primary hover:border-opacity-0 hover:text-primary border-b border-dashed"
        href="/use-cases"
        onClick={() => {
          window?.datafast("apps_included_clicked_from_pricing");
          trackEvent("Apps Included - Pricing Section");
        }}
      >
        7 premium template apps included
      </Link>
    ),
  },
  { text: "Secure backend & Database" },
  { text: "Authentication & Onboarding flow" },
  { text: "Push notifications" },
  // { text: "Onboarding flow" },
  { text: "In-App Purchases & Subscriptions" },
  { text: "Lifetime updates" },
  {
    text: (
      <div className="text-gray-500">App Store/Google Play launch guides</div>
    ),
  },
  { text: <div className="text-gray-500">3 months developer support</div> },
  { text: <div className="text-gray-500">Hands-on help if you get stuck</div> },
  { text: <div className="text-gray-500">Team license</div> },
];

function PricingSection() {
  const { customersCount, discountLimit } = usePurchaseStats();

  const handleGetNextnative = (paymentLink: string) => {
    if (isWaitlist) {
      // Find the waitlist input element
      const waitlistInput = document.getElementById("waitlist-input");

      if (waitlistInput) {
        // Smooth scroll to the element
        waitlistInput.scrollIntoView({ behavior: "smooth", block: "center" });

        // Wait for scroll to complete before focusing
        setTimeout(() => {
          (waitlistInput as HTMLInputElement).focus();
        }, 300);
      }
    } else {
      if (paymentLink) {
        window.fbq("track", "InitiateCheckout");

        window.location.href =
          paymentLink + `&metadata_affonso_referral=${window.affonso_referral}`;
      } else {
        console.error("DODO_PAYMENT_LINK is not set");
      }
    }
  };
  return (
    <div
      id="pricing"
      className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 py-12 text-center md:py-20"
    >
      <Subheading
        heading1="One-time payment,"
        heading2="lifetime value"
        className="text-start md:items-center md:text-center"
      />

      {/* Black Friday Discount + Countdown */}
      <CountdownTimer targetISO="2026-01-01T00:00:00Z" className="text-sm" />

      <div className="mt-6 flex w-full flex-col gap-6 md:mt-10 md:flex-row md:px-4">
        {/* Starter Plan Card */}
        <div className="order-2 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-1">
          <span
            className={`pointer-events-none ml-auto text-sm font-[500] text-red-500 opacity-0 sm:text-xl`}
          >
            limited launch 50% discount
          </span>
          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="h-full w-full rounded-[32px] bg-white p-6 md:p-10"
          >
            <div className="flex h-full flex-col gap-6 md:gap-8">
              <h3 className="w-fit text-xl font-[500] sm:text-2xl md:text-[32px]">
                Starter
              </h3>

              <div className="flex gap-1">
                <span className="text-gray text-lg line-through sm:text-xl md:text-2xl">
                  $249
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                    $125
                  </h3>
                  <span className="text-gray text-lg sm:text-xl md:text-2xl">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-grow flex-col gap-3 font-[500] md:gap-4">
                {pricingFeaturesStarter.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-base sm:text-lg md:text-xl"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${index >= 7 ? "text-gray-400" : "text-primary"}`}
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-start">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <span className="text-gray mt-7 font-[500]">
                  14-day money-back guarantee.
                </span>
                <Button
                  onClick={() => {
                    trackEvent("PricingSection_GetNextNative_Starter_clicked");
                    handleGetNextnative(dodoPaymentLinks.starter);
                  }}
                  variant="secondary"
                  className="flex w-full items-center justify-center gap-2 py-5 text-[18px]"
                >
                  Get NextNative
                </Button>
                <span className="text-gray font-[500]">
                  Pay once, build unlimited apps!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* All-in Card */}
        <div className="order-1 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-2">
          <span className={`text-gray ml-auto text-sm font-[500] sm:text-xl`}>
            limited launch discount{" "}
            <span className="text-red-500">
              50% off, {discountLimit - customersCount} left
            </span>{" "}
          </span>

          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="border-primary h-full w-full rounded-[32px] border-2 bg-white p-6 md:p-10"
          >
            <div className="flex h-full flex-col gap-6 md:gap-8">
              <h3 className="w-fit text-xl font-[500] sm:text-2xl md:text-[32px]">
                All-in
              </h3>

              <div className="flex gap-1">
                <span className="text-gray text-lg line-through sm:text-xl md:text-2xl">
                  $299
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                    <HighlightedSpan>$149</HighlightedSpan>
                  </h3>
                  <span className="text-gray text-lg sm:text-xl md:text-2xl">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-grow flex-col gap-3 font-[500] md:gap-4">
                {pricingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-base sm:text-lg md:text-xl"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-start">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <span className="text-gray mt-7 font-[500]">
                  14-day money-back guarantee.
                </span>
                <StarburstSign
                  size="small"
                  rotation={90}
                  position="top-right"
                  className="mx-auto w-full"
                  svgClassName="top-[-25px] right-[-25px]"
                >
                  <Button
                    onClick={() => {
                      trackEvent("PricingSection_GetNextNative_All-in_clicked");
                      handleGetNextnative(dodoPaymentLinks.allAccess);
                    }}
                    variant="primary"
                    className="flex w-full items-center justify-center gap-2 py-4 text-[18px]"
                  >
                    Get NextNative
                  </Button>
                </StarburstSign>

                <span className="text-gray font-[500]">
                  Pay once, build unlimited apps!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
