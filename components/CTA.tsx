import { cn } from "@/lib/cn";
import CTAButton from "./CTAButton";
import CTAButtonSecondary from "./CTASecondary";

export default function CTA({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      <div className="flex flex-col gap-3 md:flex-row">
        <CTAButton />
        <CTAButtonSecondary />
      </div>
    </div>
  );
}
