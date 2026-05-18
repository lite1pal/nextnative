import { cn } from "@/lib/cn";

function HorizontalLine({ className }: { className?: string }) {
  return <div className={cn("bg-foreground h-[4px] w-full", className)} />;
}

export default HorizontalLine;
