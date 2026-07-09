"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";

function CTAButton() {
  return (
    <Button
      onClick={() => {
        trackEvent("CTA_clicked");
        const el = document.getElementById("pricing");
        if (el) {
          el.scrollIntoView();
        }
      }}
      variant="primary"
    >
      Get lifetime access for $79
    </Button>
  );
}

export default CTAButton;
