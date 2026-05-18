"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";

function CTAButtonSecondary() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_BOOK_CALL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("CTA_book_call_clicked");
      }}
    >
      <Button
        variant="primary"
        className="hover:bg-primary border-primary text-primary border-2 bg-white px-4 hover:text-white md:px-10"
      >
        Book a 30-min call
      </Button>
    </a>
  );
}

export default CTAButtonSecondary;
