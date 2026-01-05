"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";

function CTAButtonSecondary() {
  return (
    <a
      href="https://nextnative.dev/docs"
      onClick={() => {
        trackEvent("CTA_see_guides_clicked");
        window?.datafast("see_guides_clicked_from_herosection");
      }}
    >
      <Button
        variant="primary"
        className="hover:bg-primary border-primary text-primary border-2 bg-transparent px-4 hover:text-white md:px-10"
      >
        See guides
      </Button>
    </a>
  );
}

export default CTAButtonSecondary;
