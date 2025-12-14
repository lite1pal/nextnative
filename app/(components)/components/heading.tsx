import HorizontalLine from "@/components/HorizontalLine";
import { cn } from "@/lib/utils";

function Heading({
  children,
  paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  className,
}: {
  children: React.ReactNode;
  paragraph?: string;
  className?: string;
}) {
  return (
    <div className="max-md:mt-24 md:mb-16">
      <div className={cn("flex w-full flex-col gap-1.5 sm:gap-6", className)}>
        <h1 className="text-[40px] leading-[52px] font-[500] md:text-[54px] md:leading-[71px]">
          {children}
        </h1>
        <p className="max-w-[654.36px] text-base leading-relaxed sm:text-lg md:text-[22px]">
          {paragraph}
        </p>
      </div>
    </div>
  );
}

export default Heading;
