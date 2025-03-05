"use client";

import { ArrowDown } from "lucide-react";
import HighlightedSpan from "./HighlightedSpan";

interface TimeItem {
  emoji: string;
  time: string;
  description: string;
  comment: string;
}

function WastedTimeItem({
  item,
  index,
  totalItems,
}: {
  item: TimeItem;
  index: number;
  totalItems: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative w-full flex ${
        isEven ? "justify-start" : "justify-end"
      } mb-10 md:mb-14`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-700 bg-primary`}
      />

      {/* Content card */}
      <div
        className={`w-[calc(50%-20px)] bg-white rounded-lg p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
        style={{
          transitionDelay: `${index * 5}ms`,
        }}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl p-2 rounded-lg bg-gray-50">{item.emoji}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {item.time}
              </span>
              <div className="h-[1px] flex-grow bg-gray-200"></div>
            </div>
            <div className="text-lg text-foreground mt-1">
              {item.description}
            </div>
            <div className="text-lg mt-2 text-gray">{item.comment}</div>
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
    <div className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-[500] text-center mb-16 transition-all duration-700`}
        >
          Wasting <span className="text-primary">time</span> on...
        </h2>

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-primary transition-transform duration-1000`}
            style={{ transformOrigin: "top" }}
          ></div>

          {wastedTimeItems.map((item, index) => (
            <WastedTimeItem
              key={index}
              item={item}
              index={index}
              totalItems={wastedTimeItems.length}
            />
          ))}

          {/* Summary card */}
          <div
            className={`w-full max-w-md relative z-10 mx-auto mt-16 p-6 rounded-lg bg-white`}
          >
            <h3 className="text-2xl font-[500] mb-4 text-center">The cost</h3>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-gray mb-1">Total time wasted</div>
              <div className="text-3xl font-bold text-indigo-600">
                {totalTime}
              </div>
            </div>
            <div className="text-gray mt-4 text-center">
              That could have been spent building your actual product
            </div>
          </div>
        </div>

        <div
          className={`text-2xl sm:text-3xl md:text-4xl mx-auto mt-20 text-center transition-all duration-700`}
        >
          <HighlightedSpan>
            <div className="flex items-center justify-center gap-3">
              <ArrowDown className="w-8 h-8" />
              <span>There's a better way</span>
            </div>
          </HighlightedSpan>
        </div>
      </div>
    </div>
  );
}

export default WastedTime;
