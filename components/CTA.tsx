import { cn } from "@/lib/cn";
import Link from "next/link";
import CTAButton from "./CTAButton";
import CTAButtonSecondary from "./CTASecondary";

export default function CTA({
  className,
  showSecondary = true,
}: {
  className?: string;
  showSecondary?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      <div className="flex flex-col gap-3 md:flex-row">
        <CTAButton />
        {showSecondary ? <CTAButtonSecondary /> : null}
      </div>
      <p className="text-sm text-gray-500 md:text-base">
        Instant access after checkout. 14-day refund guarantee.
      </p>
    </div>
  );
}
