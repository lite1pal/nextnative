"use client";

import { useEffect, useState } from "react";

function usePurchaseStats() {
  const [customersCount, setCustomersCount] = useState(59);
  const [discountLimit, setDiscountLimit] = useState(60);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomersCount = async () => {
      try {
        const response = await fetch("/api/customers-count");
        if (!response.ok) {
          throw new Error("Failed to fetch customers count");
        }
        const data = await response.json();
        const count = data.count || 0;

        setCustomersCount(count);

        const nextLimit = Math.ceil((count + 1) / 5) * 5;
        setDiscountLimit(nextLimit);
      } catch (error) {
        console.error("Error fetching customers count:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomersCount();
  }, []);

  return {
    customersCount,
    discountLimit,
    isError,
    isLoading,
  };
}

export default usePurchaseStats;
