import { ArrowDown } from "lucide-react";
import HighlightedSpan from "./HighlightedSpan";

type TimeItem = {
  emoji: string;
  time: string;
  description: string;
  comment: string;
};

function WastedTimeItem({ item, index }: { item: TimeItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex w-full flex-col md:flex-row ${
        isEven ? "md:justify-start" : "md:justify-end"
      } mb-8 md:mb-14`}
    >
      {/* Timeline dot - hidden on mobile, shown on md+ */}
      <div
        className={`bg-primary absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full md:block`}
      />

      {/* Mobile timeline dot and line */}
      <div className="bg-primary absolute top-6 left-4 h-3 w-3 rounded-full md:hidden"></div>
      <div className="bg-primary absolute top-9 left-5 h-[calc(100%-30px)] w-[1px] md:hidden"></div>

      {/* Content card */}
      <div
        className={`ml-10 w-[90%] rounded-2xl bg-white p-4 md:ml-0 md:w-[calc(50%-20px)] md:p-5`}
        style={{
          boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
          transitionDelay: `${index * 5}ms`,
        }}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-gray-50 p-2 text-xl md:text-2xl">
            {item.emoji}
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <span className="text-primary text-lg font-bold md:text-xl">
                {item.time}
              </span>
              <div className="h-[1px] flex-grow bg-gray-200"></div>
            </div>
            <div className="text-foreground mt-1 text-base md:text-lg">
              {item.description}
            </div>
            <div className="text-gray mt-2 text-sm md:text-lg">
              {item.comment}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WastedTime() {
  const wastedTimeItems: TimeItem[] = [
    {
      emoji: "⌛",
      time: "6 hours",
      description: "Designing the app",
      comment: "Okay, not too bad.",
    },
    {
      emoji: "😩",
      time: "1 day",
      description: "Setting up Google & Apple OAuth",
      comment: "Why is this so complicated?",
    },
    {
      emoji: "💸",
      time: "+2 days",
      description: "Payment integration",
      comment: "Oh, great. More API docs to read.",
    },
    {
      emoji: "🌀",
      time: "+4 hrs",
      description: "Deep linking setup",
      comment: "Wait, why isn't this working?",
    },
    {
      emoji: "📱",
      time: "+2 hrs",
      description: "Configuring push notifications",
      comment: "iOS is rejecting them?",
    },
    {
      emoji: "📊",
      time: "+1 hr",
      description: "Analytics integration",
      comment: "I just want to see user data, why is this so annoying?",
    },
    {
      emoji: "🎨",
      time: "+1 day",
      description: "Creating App Store & Play Store assets",
      comment: "Why do they need 20 different icon sizes?",
    },
    {
      emoji: "🚫",
      time: "+2 weeks",
      description: "App review rejections",
      comment: 'One "metadata issue" and I\'m back to square one.',
    },
    {
      emoji: "🧠",
      time: "+∞ hours",
      description: "Overthinking...",
      comment: "Should I just give up?",
    },
  ];

  const totalTime = "3+ weeks!";

  return (
    <div className="relative overflow-hidden py-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          className={`mb-12 text-center text-3xl font-[500] md:mb-16 md:text-5xl`}
        >
          Wasting <span className="text-primary">time</span> on...
        </h2>

        <div className="relative">
          <div
            className={`bg-primary absolute left-1/2 hidden h-full w-[3px] -translate-x-1/2 md:block`}
            style={{ transformOrigin: "top" }}
          ></div>

          {wastedTimeItems.map((item, index) => (
            <WastedTimeItem key={index} item={item} index={index} />
          ))}

          <div
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
            className={`relative z-10 mx-auto mt-12 w-full max-w-md rounded-lg bg-white p-6 md:mt-16`}
          >
            <h3 className="text-center text-xl font-medium md:text-2xl">
              Time wasted
            </h3>

            <div className="px-3 py-4 text-center">
              <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                {totalTime}
              </div>

              <div className="mt-3 text-sm text-gray-600 md:text-base">
                That could have been spent building your actual product
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto mt-16 text-center text-xl sm:text-2xl md:mt-20 md:text-4xl`}
        >
          <HighlightedSpan>
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <ArrowDown className="h-6 w-6 md:h-8 md:w-8" />
              <span>There's a better way</span>
            </div>
          </HighlightedSpan>
        </div>
      </div>
    </div>
  );
}

export default WastedTime;
