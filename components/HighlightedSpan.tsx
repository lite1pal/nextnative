import { cn } from "@/lib/utils";
import { Playpen_Sans } from "next/font/google";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function HighlightedSpan({ children }: { children: React.ReactNode }) {
  return (
    <span className={cn(playpenSans.className, "text-primary font-[500]")}>
      {children}
    </span>
  );
}

export default HighlightedSpan;
