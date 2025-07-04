"use client";
import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/services/custom-analytics";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  // const handleSignIn = () => {
  //   trackEvent("Navbar_SignIn_clicked");
  //   setIsMenuOpen(false);
  //   const waitlistInput = document.getElementById("waitlist-input");

  //   if (waitlistInput) {
  //     waitlistInput.scrollIntoView({ behavior: "smooth", block: "center" });
  //     (waitlistInput as HTMLInputElement).focus();
  //   } else {
  //     router.push("/#waitlist");
  //   }
  // };

  return (
    <div className="flex py-4 md:py-5 items-center justify-between navbar">
      <div onClick={() => setIsMenuOpen(false)}>
        <Logo />
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-8 lg:gap-14">
        <Link
          href="/showcase"
          onClick={() => {
            trackEvent("Navbar_Showcase_clicked");
          }}
          className="text-base cursor-pointer md:text-lg hover:text-primary transition-colors"
        >
          Showcase
        </Link>
        <Link
          onClick={() => {
            trackEvent("Navbar_Docs_clicked");
          }}
          href="https://docs.nextnative.dev"
          className="text-base md:text-lg hover:text-primary transition-colors"
        >
          Docs
        </Link>
        <Link
          href="/#pricing"
          onClick={(e) => {
            e.preventDefault();
            trackEvent("Navbar_pricing clicked");

            const el = document.getElementById("pricing");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            } else {
              window.location.href = "/#pricing";
            }
          }}
          className="text-base md:text-lg hover:text-primary transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/blog"
          onClick={() => {
            trackEvent("Navbar_Blog_clicked");
          }}
          className="text-base cursor-pointer md:text-lg hover:text-primary transition-colors"
        >
          Blog
        </Link>

        <Link
          href="/contact"
          onClick={() => {
            trackEvent("Navbar_Contact_clicked");
          }}
        >
          <Button variant="secondary">Contact</Button>
        </Link>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden z-50">
          <Link
            href="/showcase"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Showcase_clicked");
            }}
            className="text-base cursor-pointer md:text-lg hover:text-primary transition-colors"
          >
            Showcase
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Docs_clicked");
            }}
            href="https://docs.nextnative.dev"
            className="text-base hover:text-primary transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/#pricing"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              trackEvent("Navbar_pricing clicked");

              const el = document.getElementById("pricing");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                // fallback: go to home with hash if not already on /
                window.location.href = "/#pricing";
              }
            }}
            className="text-base hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Blog_clicked");
            }}
            className="text-base cursor-pointer md:text-lg hover:text-primary transition-colors"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Contact_clicked");
            }}
          >
            <Button variant="secondary">Contact</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
