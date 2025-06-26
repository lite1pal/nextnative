import HorizontalLine from "./HorizontalLine";
import HighlightedSpan from "./HighlightedSpan";
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
    <div className={cn("flex flex-col gap-6 md:gap-10", className)}>
      {withHorizontalLine && <HorizontalLine className="w-[94px]" />}
      <h2 className="text-[40px] md:text-[54px] leading-[52px] md:leading-[71px] font-[500]">
        {heading1} <br />
        <HighlightedSpan>{heading2}</HighlightedSpan>
      </h2>
    </div>
  );
}

export default Subheading;
