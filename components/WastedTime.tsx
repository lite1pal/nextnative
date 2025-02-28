import { ArrowDown } from "lucide-react";
import HighlightedSpan from "./HighlightedSpan";

function WastedTime() {
  return (
    <div className="flex flex-col gap-10 md:gap-[80px] max-w-[764px] py-12 md:py-20 mx-auto">
      <h2 className="text-[44px] md:text-[54px] font-[500]">
        Wasting time on...
      </h2>

      <div className="flex flex-col gap-6 sm:gap-8 md:gap-14 font-[500]">
        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">⌛</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            6 hours <span className="text-gray">- Designing the app... </span>
            okay, not too bad.
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">😩</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            1 day{" "}
            <span className="text-gray">
              - Setting up Google & Apple OAuth.{" "}
            </span>
            Why is this so complicated?
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">💸</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +2 days <span className="text-gray">- Payment integration. </span>
            Oh, great. More API docs to read.
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">🌀</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +4 hrs <span className="text-gray">- Deep linking setup. </span>
            Wait, why isn't this working?
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">📱</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +2 hrs{" "}
            <span className="text-gray">
              - Configuring push notifications.{" "}
            </span>
            iOS is rejecting them?
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">📊</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +1 hr <span className="text-gray">- Analytics integration. </span>I
            just want to see user data, why is this so annoying?
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">🎨</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +1 day{" "}
            <span className="text-gray">
              - Creating App Store & Play Store assets.{" "}
            </span>
            Why do they need 20 different icon sizes?
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">🚫</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +2 weeks{" "}
            <span className="text-gray">- App review rejections. </span>
            One "metadata issue" and I'm back to square one.
          </div>
        </div>

        <div className="flex gap-4">
          <span className="text-lg sm:text-xl md:text-2xl">🧠</span>
          <div className="text-lg sm:text-xl md:text-[30px] leading-snug">
            +∞ hours <span className="text-gray">- Overthinking... </span>
            Should I just give up?
          </div>
        </div>
      </div>

      <div className="text-2xl sm:text-3xl md:text-[44px] mx-auto mt-10">
        <HighlightedSpan>
          <div className="flex items-center gap-2">
            <ArrowDown className="w-7 md:w-10 h-7 md:h-10" />
            There's an easier way
          </div>
        </HighlightedSpan>
      </div>
    </div>
  );
}

export default WastedTime;
