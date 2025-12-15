"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { trackEvent } from "@/services/custom-analytics";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NavbarItem = {
  label: string;
  href: string;
  event?: string;
  scrollFunction?: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView();
  } else {
    window.location.href = `/#${id}`;
  }
}

const navbarItems: NavbarItem[] = [
  { label: "Showcase", href: "/showcase", event: "Navbar_Showcase_clicked" },

  {
    label: "Pricing",
    href: "/#pricing",
    event: "Navbar_pricing_clicked",
    scrollFunction: () => scrollToId("pricing"),
  },
  {
    label: "FAQ",
    href: "/#faq",
    event: "Navbar_FAQ_clicked",
    scrollFunction: () => scrollToId("faq"),
  },
  {
    label: "Reviews",
    href: "/#reviews",
    event: "Navbar_Reviews_clicked",
    scrollFunction: () => scrollToId("reviews"),
  },
  {
    label: "Docs",
    href: "https://nextnative.dev/docs",
    event: "Navbar_Docs_clicked",
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isBlog = false;

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

  useEffect(() => {
    const updateScrolled = () => {
      if (isBlog) setScrolled(window.scrollY > 10);
    };

    updateScrolled();

    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [isBlog]);

  return (
    <div
      className={cn(
        "navbar flex items-center justify-between py-4 md:py-5",
        isBlog && "sticky top-0 z-50 transition-all duration-300",
        scrolled && isBlog
          ? "top-3 mx-auto rounded-full bg-white px-8 shadow-xl md:py-4"
          : "bg-transparent",
      )}
    >
      <div onClick={() => setIsMenuOpen(false)}>
        <Logo />
      </div>

      {/* Mobile menu button */}
      <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Desktop navigation */}
      <div className="hidden items-center gap-8 lg:flex lg:gap-14">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            setIsMenuOpen={setIsMenuOpen}
          />
        ))}

        <TryForFreeButton setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 bg-white p-4 shadow-lg lg:hidden">
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.label}
              item={item}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}

          <TryForFreeButton setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </div>
  );
}

export default Navbar;

function NavbarItem({
  setIsMenuOpen,
  item,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  item: NavbarItem;
}) {
  return (
    <Link
      href={item.href}
      onClick={() => {
        setIsMenuOpen(false);
        if (item.event) trackEvent(item.event);

        item.scrollFunction?.();
      }}
      className="hover:text-primary cursor-pointer text-base md:text-lg"
    >
      {item.label}
    </Link>
  );
}

function MobileMenuButton({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="lg:hidden"
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
  );
}

function TryForFreeButton({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <a
      href="https://nextnative.dev/playground"
      onClick={() => {
        setIsMenuOpen(false);
        trackEvent("Navbar_TryForFree_clicked");

        // safe guard
        if (typeof (window as any)?.datafast === "function") {
          (window as any).datafast("try_for_free_clicked_from_navbar");
        }
      }}
    >
      <Button variant="secondary">Try for free</Button>
    </a>
  );
}
