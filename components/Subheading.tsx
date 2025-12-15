import HighlightedSpan2 from "./HighlightedSpan2";
import HorizontalLine from "./HorizontalLine";
import { cn } from "@/lib/utils";

function Subheading({
  heading1,
  heading2,
  withHorizontalLine = true,
  className,
}: {
  heading1: string;
  heading2: string;
  withHorizontalLine?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-6 md:gap-10", className)}>
      {withHorizontalLine && <HorizontalLine className="w-[94px]" />}
      <h2 className="text-[40px] leading-[52px] font-[500] md:text-[54px] md:leading-[71px]">
        {heading1} <br />
        <HighlightedSpan2>{heading2}</HighlightedSpan2>
      </h2>
    </div>
  );
}

export default Subheading;
