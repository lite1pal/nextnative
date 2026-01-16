"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";

function CTAButtonSecondary() {
  return (
    <a
      href="/#demo"
      onClick={() => {
        trackEvent("CTA_watch_demo_clicked");
        window?.datafast("watch_demo_clicked_from_herosection");
      }}
    >
      <Button
        variant="primary"
        className="hover:bg-primary border-primary text-primary border-2 bg-transparent px-4 hover:text-white md:px-10"
      >
        Watch demo
      </Button>
    </a>
  );
}

export default CTAButtonSecondary;
