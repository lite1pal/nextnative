"use client";

import { trackEvent } from "@/services/custom-analytics";
import { cloneElement } from "react";

type TrackEventWrapperProps = {
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
  eventName?: string;
};

function TrackEventWrapper({ children, eventName }: TrackEventWrapperProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (eventName) trackEvent(eventName);
    children.props.onClick?.(e);
  };

  return cloneElement(children, { onClick: handleClick });
}

export default TrackEventWrapper;
