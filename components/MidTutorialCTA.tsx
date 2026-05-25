"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { trackEvent } from "@/services/custom-analytics";

interface MidTutorialCTAProps {
  stepNumber: number;
  message: string;
}

export default function MidTutorialCTA({
  stepNumber,
  message,
}: MidTutorialCTAProps) {
  const handleClick = () => {
    trackEvent(`Tutorial_MidCTA_Step${stepNumber}_clicked`);
  };

  return (
    <div className="border-primary/30 my-8 rounded-2xl border-l-8 bg-white p-6">
      <div className="flex items-start gap-4">
        <Zap className="text-primary h-6 w-6 flex-shrink-0" />
        <div className="flex-1">
          <p className="mb-3 text-base font-medium text-gray-900 md:text-lg">
            💡 {message}
          </p>
          <Link
            href="/#pricing"
            onClick={handleClick}
            className="text-primary hover:text-primary/80 inline-flex items-center text-base font-semibold transition md:text-lg"
          >
            See what's included in NextNative →
          </Link>
        </div>
      </div>
    </div>
  );
}
