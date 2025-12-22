"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetISO: string;
  className?: string;
}

function getTimeLeft(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

type TimeLeft = ReturnType<typeof getTimeLeft> | null;

export default function CountdownTimer({
  targetISO,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);

  useEffect(() => {
    const target = new Date(targetISO);

    // set initial value on client
    setTimeLeft(getTimeLeft(target));

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(id);
  }, [targetISO]);

  // what both server and client render initially (no Date.now here)
  if (!timeLeft) {
    return (
      <div
        className={`rounded-full bg-white p-2 px-8 text-xl text-black ${className}`}
      >
        <span className="font-medium">Offer ends soon…</span>
      </div>
    );
  }

  const { days, hours, minutes, seconds, total } = timeLeft;

  if (total <= 0) {
    return null;
  }

  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-3 max-sm:self-start lg:flex-row">
      <div className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg">
        <span className="text-4xl">🎄</span>
        <span className="text-base font-semibold sm:text-lg">
          Use code <span className="font-extrabold">HAPPYNEWYEAR20</span> for{" "}
          <span className="font-bold">20%</span> off
        </span>
      </div>
      <div
        aria-live="polite"
        className={`rounded-full bg-white p-2 px-8 text-xl text-black ${className}`}
      >
        <span className="font-medium">
          Ends in {two(days)} days and {two(hours)}:{two(minutes)}:
          {two(seconds)}
        </span>
      </div>
    </div>
  );
}
