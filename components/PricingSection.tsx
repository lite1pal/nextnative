import type { ReactNode } from "react";
import HighlightedSpan from "./HighlightedSpan";
import StarburstSign from "./StarburstSign";
import Subheading from "./Subheading";
import Link from "next/link";
import TrackEventWrapper from "./TrackEventWrapper";
import CheckoutButton from "./CheckoutButton";

function PricingSection() {
  const plans: PricingPlan[] = [
    // {
    //   key: "starter",
    //   title: "Starter",
    //   price: "$249",
    //   discountedPrice: "$125",
    //   buttonVariant: "secondary",
    //   checkoutEventName: "PricingSection_GetNextNative_Starter_clicked",
    //   features: baseFeatures,
    // },
    {
      key: "all-in",
      title: "All-in",
      price: "$299",
      discountedPrice: "$79",
      highlightPrice: true,
      mostPopular: true,
      buttonVariant: "primary",
      checkoutEventName: "PricingSection_GetNextNative_All-in_clicked",
      buttonWrapper: (button) => (
        <StarburstSign
          size="small"
          rotation={90}
          position="top-right"
          className="mx-auto w-full"
          svgClassName="top-[-25px] right-[-25px]"
        >
          {button}
        </StarburstSign>
      ),
      features: baseFeatures,
    },
  ];

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

      <div className="mt-6 flex w-full flex-col items-center gap-6 md:mt-10 md:flex-row md:px-4">
        {plans.map((plan) => (
          <PricingPlanCard key={plan.key} plan={plan} />
        ))}
      </div>
    </div>
  );
}

type PricingFeature = {
  key: string;
  content: ReactNode;
  dimmedOnStarter?: boolean;
};

const BOX_SHADOW =
  "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)";

function AppsIncludedLink() {
  return (
    <TrackEventWrapper eventName="Apps Included - Pricing Section">
      <Link
        className="border-primary hover:text-primary border-b border-dashed"
        href="/use-cases"
      >
        7 premium template apps included
      </Link>
    </TrackEventWrapper>
  );
}

const baseFeatures: PricingFeature[] = [
  { key: "boilerplate", content: "Next.js + Capacitor boilerplate" },
  // { key: "apps", content: <AppsIncludedLink /> },
  { key: "backend", content: "Secure backend & Database" },
  { key: "auth", content: "Authentication & Onboarding flow" },
  { key: "push", content: "Push notifications" },
  { key: "iap", content: "In-App Purchases & Subscriptions" },
  { key: "updates", content: "Lifetime updates" },
  {
    key: "launch-guides",
    content: "App Store/Google Play launch guides",
    dimmedOnStarter: true,
  },
  // {
  //   key: "support",
  //   content: "3 months developer support",
  //   dimmedOnStarter: true,
  // },
  {
    key: "hands-on",
    content: "Hands-on help if you get stuck",
    dimmedOnStarter: true,
  },
  {
    key: "team",
    content: "Team license - unlimited team members",
    dimmedOnStarter: true,
  },
];

function FeatureRow({
  children,
  dimmed,
}: {
  children: ReactNode;
  dimmed?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-base sm:text-lg md:text-xl">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={dimmed ? "text-gray-400" : "text-primary"}
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={dimmed ? "text-start text-gray-500" : "text-start"}>
        {children}
      </span>
    </div>
  );
}

type PricingPlan = {
  key: "starter" | "all-in";
  title: string;
  price: ReactNode;
  discountedPrice: ReactNode;
  highlightPrice?: boolean;
  mostPopular?: boolean;
  checkoutEventName: string;
  buttonVariant: "primary" | "secondary";
  buttonWrapper?: (button: ReactNode) => ReactNode;
  features: PricingFeature[];
};

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
  const featuresAreDimmed = plan.key === "starter";

  return (
    <div
      className={
        plan.key === "starter"
          ? "order-2 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-1"
          : "order-1 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-2"
      }
    >
      <div
        style={{ boxShadow: BOX_SHADOW }}
        className={
          plan.key === "all-in"
            ? "border-primary relative h-full w-full rounded-[32px] border-2 bg-white p-6 md:p-10"
            : "h-full w-full rounded-[32px] bg-white p-6 md:p-10"
        }
      >
        <div className="flex h-full flex-col gap-6 md:gap-8">
          <h3 className="w-fit text-xl font-[500] sm:text-2xl md:text-[32px]">
            {plan.title}
          </h3>

          <div className="flex gap-1">
            <span className="text-gray text-lg line-through sm:text-xl md:text-2xl">
              {plan.price}
            </span>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                {plan.highlightPrice ? (
                  <HighlightedSpan>{plan.discountedPrice}</HighlightedSpan>
                ) : (
                  plan.discountedPrice
                )}
              </h3>
              <span className="text-gray text-lg sm:text-xl md:text-2xl">
                /forever
              </span>
            </div>
          </div>

          {/* <div className="flex gap-1">
            <div className="flex items-end gap-2">
              <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                {plan.highlightPrice ? (
                  <HighlightedSpan>{plan.price}</HighlightedSpan>
                ) : (
                  plan.price
                )}
              </h3>
              <span className="text-gray text-lg sm:text-xl md:text-2xl">
                /forever
              </span>
            </div>
          </div> */}

          <div className="flex w-full flex-grow flex-col gap-3 font-[500] md:gap-4">
            {plan.features.map((feature) => (
              <FeatureRow
                key={feature.key}
                dimmed={featuresAreDimmed && feature.dimmedOnStarter}
              >
                {feature.content}
              </FeatureRow>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <span className="text-gray mt-7 font-[500]"></span>

            {plan.buttonWrapper ? (
              plan.buttonWrapper(<CheckoutButton plan={plan.key} />)
            ) : (
              <CheckoutButton plan={plan.key} />
            )}

            <span className="text-gray font-[500]">
              Pay once, use it for unlimited apps and unlimited team members.
            </span>
            <span className="text-sm text-gray-500">
              Questions before buying? Email{" "}
              <a
                className="text-foreground underline underline-offset-4"
                href="mailto:denistarasenko@nextnative.dev"
              >
                denistarasenko@nextnative.dev
              </a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
