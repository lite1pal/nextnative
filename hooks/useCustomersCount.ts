"use client";

import { useEffect, useState } from "react";

const DEFAULT_COUNT = 45;

let cachedCount: number | null = null;
let inFlight: Promise<void> | null = null;

export function useCustomersCount() {
  const [count, setCount] = useState<number>(cachedCount ?? DEFAULT_COUNT);

  useEffect(() => {
    // already have it → nothing to do
    if (cachedCount !== null) return;

    // first caller starts the request
    if (!inFlight) {
      inFlight = fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers-count`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch customers count");
          return res.json();
        })
        .then((data) => {
          cachedCount =
            typeof data.count === "number" ? data.count : DEFAULT_COUNT;
          // @ts-ignore
          setCount(cachedCount);
        })
        .catch((err) => {
          console.error("Error loading customers count:", err);
        })
        .finally(() => {
          inFlight = null;
        });
    } else {
      // later callers wait on the same promise
      inFlight.then(() => {
        if (cachedCount !== null) setCount(cachedCount);
      });
    }
  }, []);

  return count;
}
