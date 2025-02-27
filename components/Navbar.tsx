"use client";
import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="flex py-4 md:py-5 items-center justify-between navbar">
      <div onClick={() => setIsMenuOpen(false)}>
        <Logo />
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          href="/#pricing"
          className="text-base md:text-lg hover:text-primary transition-colors"
        >
          Pricing
        </Link>
        <Link
          href="/docs"
          className="text-base md:text-lg hover:text-primary transition-colors"
        >
          Docs
        </Link>
        <Link
          href="/components"
          className="text-base md:text-lg hover:text-primary transition-colors"
        >
          Components
        </Link>
        <Button variant="secondary">Sign in</Button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden z-50">
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/#pricing"
            className="text-base hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/docs"
            className="text-base hover:text-primary transition-colors"
          >
            Docs
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            href="/components"
            className="text-base hover:text-primary transition-colors"
          >
            Components
          </Link>
          <Button variant="secondary" className="w-full">
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
