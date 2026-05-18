import HighlightedSpan from "@/components/HighlightedSpan";
import Logo from "@/components/Logo";
import CTABlogButton from "./CTABlogButton";
import { AvatarList } from "@/components/AvatarList";
import RatingSvg from "@/components/RatingSvg";

function NextNativeCardSkeleton() {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="sticky top-20 rounded-xl bg-white p-6"
    >
      <div className="flex flex-col items-center text-center">
        <Logo />
        <h3 className="mt-7 text-xl font-semibold">
          Launch mobile apps with <HighlightedSpan>Next.js</HighlightedSpan>
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Skip native dev. Use Capacitor + Next.js to go live fast.
        </p>
        <CTABlogButton post={{ slug: "" }} />

        <p className="mt-3 text-xs font-medium text-pink-600">
          🎁 40% off – 5 left
        </p>
        <div className="mt-5 flex items-center gap-2">
          <div className="relative">
            <AvatarList />
          </div>
          <div className="flex flex-col items-start">
            <RatingSvg />
            <div className="pl-2 text-xs font-medium text-gray-500">
              Loved by <span className="text-foreground">20</span> makers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextNativeCardSkeleton;
