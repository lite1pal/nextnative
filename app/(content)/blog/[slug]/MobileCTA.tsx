"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

type MobileCTAClientProps = {
  children: ReactNode;
  showAfterPx?: number; // when to show on scroll (default 350)
  storageKey?: string; // localStorage key
  cooldownDays?: number; // how many days to hide after close
};

export default function MobileCTAClient({
  children,
  showAfterPx = 1000,
  storageKey = "nn-mobile-cta-dismissed-at",
  cooldownDays = 3,
}: MobileCTAClientProps) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allowedToShow, setAllowedToShow] = useState(false);

  // detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // check cooldown in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      setAllowedToShow(true);
      return;
    }

    const lastDismissed = Number(raw);
    if (Number.isNaN(lastDismissed)) {
      // corrupt value, reset
      localStorage.removeItem(storageKey);
      setAllowedToShow(true);
      return;
    }

    const now = Date.now();
    const cooldownMs = cooldownDays * 24 * 60 * 60 * 1000;

    if (now - lastDismissed >= cooldownMs) {
      // cooldown passed, can show again
      setAllowedToShow(true);
    } else {
      // still in cooldown
      setAllowedToShow(false);
      setVisible(false);
    }
  }, [storageKey, cooldownDays]);

  // show after scroll (only if allowed & mobile)
  useEffect(() => {
    if (!isMobile || !allowedToShow) return;

    const onScroll = () => {
      if (window.scrollY >= showAfterPx) {
        setVisible(true);
      }
    };

    onScroll(); // handle reload mid-page
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, allowedToShow, showAfterPx]);

  const close = useCallback(() => {
    const now = Date.now();
    localStorage.setItem(storageKey, String(now));
    setVisible(false);
    setAllowedToShow(false); // hide for the rest of this session too
  }, [storageKey]);

  if (!isMobile || !visible || !allowedToShow) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-2 z-40 animate-[nnSlideUp_.25s_ease-out] px-3 sm:hidden"
      role="dialog"
      aria-label="Mobile call to action"
    >
      <div className="relative mx-auto w-full max-w-md">
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 rounded-full p-1 text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-700"
        >
          <X size={18} className="font-[500]" />
        </button>

        {children}
      </div>

      <div className="h-2" />
      <style jsx global>{`
        @keyframes nnSlideUp {
          from {
            transform: translateY(12px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
