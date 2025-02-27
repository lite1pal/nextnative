"use client";

import { useCallback } from "react";

export function useNotification() {
  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
  }, []);

  const sendNotification = useCallback(
    async (title: string, body: string) => {
      // First check if we already have permission
      if (Notification.permission === "granted") {
        new Notification(title, { body });
        return true;
      }

      // If not granted, request permission and send if granted
      const isGranted = await requestPermission();
      if (isGranted) {
        new Notification(title, { body });
        return true;
      }

      return false;
    },
    [requestPermission]
  );

  // Remove the automatic permission request on mount
  return { requestPermission, sendNotification };
}
