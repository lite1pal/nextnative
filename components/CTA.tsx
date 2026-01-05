import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import CTAButtonSecondary from "./CTASecondary";

export default function CTA({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      <div className="flex flex-col gap-3 md:flex-row">
        <CTAButton />
        <CTAButtonSecondary />
      </div>

      <p className="flex items-center gap-2 font-medium text-gray-500 sm:text-xl">
        <span className="text-red-500">
          <span className="text-xl">🎁</span> Lifetime access,
        </span>
        build unlimited apps!
      </p>
    </div>
  );
}
