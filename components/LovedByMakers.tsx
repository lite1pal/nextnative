"use client";

import { useCustomersCount } from "@/hooks/use-customers-count";

export default function LovedByMakers() {
  const count = useCustomersCount();

  return (
    <div className="pl-2 font-medium text-gray-500">
      Loved by <span className="text-foreground">{count}</span>{" "}
      <span className="max-sm:hidden">teams/</span>devs
    </div>
  );
}
