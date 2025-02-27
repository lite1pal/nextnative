import { cn } from "@/lib/utils";

function HorizontalLine({ className }: { className?: string }) {
  return <div className={cn("w-full h-[4px] bg-foreground", className)} />;
}

export default HorizontalLine;
