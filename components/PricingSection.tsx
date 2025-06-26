"use client";

import Button from "./Button";
import HighlightedSpan from "./HighlightedSpan";
import StarburstSign from "./StarburstSign";
import Subheading from "./Subheading";
import { Playpen_Sans } from "next/font/google";
import { trackEvent } from "@/services/custom-analytics";
const isWaitlist = false;

export const dodoPaymentLinks = {
  allAccess:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_ALL_ACCESS_PROD!
      : process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_ALL_ACCESS_TEST!,
  starter:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_STARTER_PROD!
      : process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK_STARTER_TEST!,
};

export const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface PricingFeature {
  text: string | React.ReactNode;
}

const pricingFeatures: PricingFeature[] = [
  { text: "Next.js boilerplate" },
  { text: "Auth" },
  { text: "Push notifications" },
  { text: "In-App purchases" },
  { text: "Database" },
  {
    text: (
      <div
        onClick={() => {
          trackEvent("PricingSection_Beautiful_UI_components_clicked");
        }}
        // href="/components"
        className="text-primary group transition-colors relative"
      >
        2 production-ready template apps
        <span className="h-0.5 group-hover:w-full w-0 transition-all duration-300 absolute bottom-0 left-0 bg-primary rounded-full"></span>
      </div>
    ),
  },
  { text: "Guides on deploying to the stores" },
  // { text: "GPT prompts for terms & privacy" },
  { text: "3 months email support" },
  { text: "Lifetime updates" },
];

const pricingFeaturesStarter: PricingFeature[] = [
  { text: "Next.js boilerplate" },
  { text: "Auth" },
  { text: "Push notifications" },
  { text: "In-App purchases" },
  { text: "Database" },
  {
    text: (
      <div
        onClick={() => {
          trackEvent("PricingSection_Beautiful_UI_components_clicked");
        }}
        // href="/components"
        className="text-primary group transition-colors relative"
      >
        1 production-ready template app
        <span className="h-0.5 group-hover:w-full w-0 transition-all duration-300 absolute bottom-0 left-0 bg-primary rounded-full"></span>
      </div>
    ),
  },
  { text: "Lifetime updates" },
];

function PricingSection() {
  const handleGetNextnative = (paymentLink: string) => {
    trackEvent("PricingSection_GetNextNative_All-in_clicked");

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
        window.location.href = paymentLink;
      } else {
        console.error("DODO_PAYMENT_LINK is not set");
      }
    }
  };
  return (
    <div
      id="pricing"
      className="flex flex-col items-center gap-4 py-12 md:py-20 max-w-[1000px] mx-auto text-center"
    >
      <Subheading
        heading1="One-time payment,"
        heading2="lifetime value"
        className="text-start md:text-center md:items-center"
      />

      <div className="flex flex-col md:flex-row w-full gap-6 mt-6 md:mt-10 md:px-4">
        {/* Starter Plan Card */}
        <div className="flex mx-auto flex-col w-full max-w-[500px] gap-1">
          <span
            className={`${playpenSans.className} text-sm opacity-0 pointer-events-none sm:text-xl font-[500] text-red-500 ml-auto`}
          >
            limited launch %40 discount
          </span>

          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="bg-white rounded-[32px] p-6 md:p-10 w-full h-full"
          >
            <div className="flex flex-col gap-6 md:gap-8 h-full">
              <h3 className="text-xl sm:text-2xl md:text-[32px] font-[500] w-fit">
                Starter
              </h3>

              <div className="flex gap-1">
                <span className="text-lg sm:text-xl md:text-2xl text-gray line-through">
                  $199
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl sm:text-4xl md:text-[54px] font-[500] leading-none">
                    $45
                  </h3>
                  <span className="text-lg sm:text-xl md:text-2xl text-gray">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex flex-col font-[500] gap-3 md:gap-4 w-full flex-grow">
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

              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  onClick={() => {
                    //             toast.custom(
                    //               (t) => (
                    //                 <div
                    //                   className={`${t.visible ? "animate-enter" : "animate-leave"}
                    // max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto
                    // flex ring-opacity-5 border-l-4 border-primary`}
                    //                 >
                    //                   <div className="flex-1 w-0 p-4">
                    //                     <div className="flex items-start">
                    //                       <div className="ml-3 flex-1">
                    //                         <p className="text-sm font-medium text-gray-900">
                    //                           Coming soon!
                    //                         </p>
                    //                         <p className="mt-1 text-sm text-gray-500">
                    //                           The starter plan is in progress, sorry 🎬
                    //                         </p>
                    //                         <p className="mt-5 text-sm text-gray-500">
                    //                           Feel free to message me on{" "}
                    //                           <a
                    //                             href="https://x.com/lite_pal"
                    //                             className="text-primary underline"
                    //                           >
                    //                             X
                    //                           </a>{" "}
                    //                           or{" "}
                    //                           <a
                    //                             href="mailto:deniskatarasenko6@gmail.com"
                    //                             className="text-primary underline"
                    //                           >
                    //                             email me
                    //                           </a>{" "}
                    //                           for more details!
                    //                         </p>
                    //                       </div>
                    //                     </div>
                    //                   </div>
                    //                   <div className="flex border-l border-gray-200">
                    //                     <button
                    //                       onClick={() => toast.dismiss(t.id)}
                    //                       className="w-full border cursor-pointer border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-primary/80 focus:outline-none"
                    //                     >
                    //                       Close
                    //                     </button>
                    //                   </div>
                    //                 </div>
                    //               ),
                    //               { duration: 6000 }
                    //             );
                    trackEvent("PricingSection_GetNextNative_Starter_clicked");
                    handleGetNextnative(dodoPaymentLinks.starter);
                  }}
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2 text-[18px] py-4 mt-7"
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
        <div className="flex mx-auto flex-col w-full max-w-[500px] gap-1">
          <span
            className={`${playpenSans.className} text-sm sm:text-xl font-[500] text-gray ml-auto`}
          >
            limited launch discount{" "}
            <span className="text-red-500">70% off, 3 left</span>{" "}
          </span>

          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="bg-white rounded-[32px] p-6 md:p-10 w-full h-full border-2 border-primary"
          >
            <div className="flex flex-col gap-6 md:gap-8 h-full">
              <h3 className="text-xl sm:text-2xl md:text-[32px] font-[500] w-fit">
                All-in
              </h3>

              <div className="flex gap-1">
                <span className="text-lg sm:text-xl md:text-2xl text-gray line-through">
                  $249
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl sm:text-4xl md:text-[54px] font-[500] leading-none">
                    <HighlightedSpan>$75</HighlightedSpan>
                  </h3>
                  <span className="text-lg sm:text-xl md:text-2xl text-gray">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex flex-col font-[500] gap-3 md:gap-4 w-full flex-grow">
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

              <div className="flex flex-col gap-2 mt-auto">
                <StarburstSign
                  size="small"
                  rotation={90}
                  position="top-right"
                  className="w-full mx-auto"
                  svgClassName="top-[-5px] right-[-25px]"
                >
                  <Button
                    onClick={() =>
                      handleGetNextnative(dodoPaymentLinks.allAccess)
                    }
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2 text-[18px] py-4 mt-7"
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
