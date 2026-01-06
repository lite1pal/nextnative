"use client";

import { trackEvent } from "@/services/custom-analytics";
import { ReactNode } from "react";

type TrackEventWrapperProps = {
  children: ReactNode;
  eventName?: string;
  className?: string;
};

function TrackEventWrapper({
  children,
  eventName,
  className,
}: TrackEventWrapperProps) {
  return (
    <div
      className={className}
      onClick={() => {
        if (eventName) trackEvent(eventName);
      }}
    >
      {children}
    </div>
  );
}

export default TrackEventWrapper;
