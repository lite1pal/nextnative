"use client";

import { useEffect, useState } from "react";

const DEADLINE_ISO = "2026-07-12T23:59:59+02:00";

function getTimeLeft() {
  const diff = new Date(DEADLINE_ISO).getTime() - Date.now();

  if (diff <= 0) {
    return { expired: true, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);

  return {
    expired: false,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function TimeCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[54px] flex-col rounded-2xl bg-black px-2 py-2 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <span className="text-lg leading-none font-semibold">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-medium tracking-[0.22em] text-white uppercase">
        {label}
      </span>
    </div>
  );
}

export default function CornerCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    const el = document.getElementById("pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (timeLeft.expired) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed right-3 bottom-3 z-50 w-[200px] rotate-[2deg] cursor-pointer rounded-[26px] border border-black bg-[#bbff70] p-3 text-left text-black shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:translate-y-[-2px] hover:rotate-0 sm:right-5 sm:bottom-5 sm:w-[230px] sm:p-4"
      aria-label="Scroll to pricing before the offer ends"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold tracking-[0.22em] uppercase">
            Summer Offer
          </div>
          <div className="mt-1 max-w-[110px] text-sm leading-tight font-semibold sm:text-base">
            $79 pricing ends soon
          </div>
        </div>
        <div className="rounded-full border border-black/15 bg-white px-2 py-1 text-[10px] font-semibold uppercase">
          Buy now
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <TimeCell value={timeLeft.hours} label="Hr" />
        <TimeCell value={timeLeft.minutes} label="Min" />
        <TimeCell value={timeLeft.seconds} label="Sec" />
      </div>
    </button>
  );
}
