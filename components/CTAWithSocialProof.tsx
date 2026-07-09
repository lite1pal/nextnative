import { cn } from "@/lib/cn";
import CTA from "./CTA";
import { AvatarList } from "./AvatarList";
import RatingSvg from "./RatingSvg";
import LovedByMakers from "./LovedByMakers";

function CTAWithSocialProof({
  className,
  showSecondary = true,
}: {
  className?: string;
  showSecondary?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-10 sm:items-center", className)}>
      <CTA showSecondary={showSecondary} />
      <div className="flex items-center gap-3 max-sm:-ml-2.5 sm:gap-2">
        <AvatarList />
        <div className="flex flex-col">
          <RatingSvg />
          <LovedByMakers />
        </div>
      </div>
    </div>
  );
}

export default CTAWithSocialProof;
