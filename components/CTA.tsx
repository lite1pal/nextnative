import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";
import JoinWaitlistForm from "./JoinWaitlistForm";
import { dodoPaymentLinks } from "./PricingSection";
import { cn } from "@/lib/utils";

function CTA({ className }: { className?: string }) {
  const isWaitlist = false;

  if (isWaitlist) {
    return <JoinWaitlistForm />;
  }

  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      {/* <StarburstSign rotation={270} position="bottom-left"> */}
      <Button
        onClick={() => {
          trackEvent("CTA_clicked");
          // window.location.href = dodoPaymentLinks.allAccess;
          const el = document.getElementById("pricing");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        variant="primary"
      >
        Get NextNative now
      </Button>
      {/* </StarburstSign> */}

      <div className="flex flex-col">
        <p className="font-medium text-gray-500 flex items-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="sm:text-xl">
            <span className="text-red-500">60% off</span> for the first 20
            customers, <span className="text-red-500">10 left</span>
          </span>
        </p>

        {/* <div className="mt-6 flex flex-col">
          <div className="flex -space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gray-300 border-2 border-background overflow-hidden"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <span className="text-gray-200">6869 developers ship faster</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CTA;
