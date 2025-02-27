import Button from "./Button";
import HighlightedSpan from "./HighlightedSpan";
import StarburstSign from "./StarburstSign";
import LogoSymbol from "./LogoSymbol";
import Subheading from "./Subheading";
import { Playpen_Sans } from "next/font/google";

export const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface PricingFeature {
  text: string;
}

const pricingFeatures: PricingFeature[] = [
  { text: "Next.js boilerplate" },
  { text: "Auth" },
  { text: "Push notifications" },
  { text: "Lifetime updates" },
  { text: "In-App purchases" },
  { text: "MongoDB" },
  { text: "Guides on deploying to the stores" },
  { text: "GPT prompts for terms & privacy" },
];

function PricingSection() {
  return (
    <div
      id="pricing"
      className="flex flex-col items-center gap-4 py-12 md:py-20 max-w-[764px] mx-auto text-center"
    >
      <Subheading
        heading1="One-time payment,"
        heading2="lifetime value"
        className="items-center"
      />

      <div className="flex mx-auto flex-col w-full max-w-[500px] gap-1 mt-6 md:mt-10">
        <span
          className={`${playpenSans.className} text-sm sm:text-base font-[500] text-gray ml-auto`}
        >
          limited launch %50 discount
        </span>

        <div
          style={{
            boxShadow:
              "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-white rounded-[32px] p-6 md:p-10 w-full"
        >
          <div className="flex flex-col gap-6 md:gap-8">
            <h3 className="text-xl sm:text-2xl md:text-[32px] font-[500] w-fit">
              All-in
            </h3>

            <div className="flex gap-1">
              <span className="text-lg sm:text-xl md:text-2xl text-gray line-through">
                $199
              </span>
              <div className="flex items-end gap-2">
                <h3 className="text-3xl sm:text-4xl md:text-[54px] font-[500] leading-none">
                  <HighlightedSpan>$99</HighlightedSpan>
                </h3>
                <span className="text-lg sm:text-xl md:text-2xl text-gray">
                  /forever
                </span>
              </div>
            </div>

            <div className="flex flex-col font-[500] gap-3 md:gap-4 w-full">
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
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <StarburstSign
                size="small"
                rotation={90}
                position="top-right"
                className="w-10/12 mx-auto"
                svgClassName="top-[-5px] right-[-25px]"
              >
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 text-[18px] py-4 mt-7"
                >
                  Get nextnative
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
  );
}

export default PricingSection;
