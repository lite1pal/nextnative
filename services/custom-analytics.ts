"use server";

import { sendMessageToTelegram } from "./telegram";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export async function trackEvent(event: string) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  // Get user agent information
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const referer = headersList.get("referer") || "direct";
  const ip = headersList.get("x-forwarded-for") || "unknown";

  // Parse user agent for device info
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  // Bot detection
  const isBotLikely = detectBot(userAgent, browser, referer);
  if (isBotLikely) {
    console.log(`Bot detected, ignoring event: ${event}`);
    return;
  }

  // Format user info
  const userInfo = {
    ip,
    referer,
    browser: `${browser.name || "unknown"} ${browser.version || ""}`,
    os: `${os.name || "unknown"} ${os.version || ""}`,
    device: device.type
      ? `${device.vendor || ""} ${device.model || ""} (${device.type})`
      : "desktop",
    timestamp: new Date().toISOString(),
  };

  // Format message for Telegram
  const formattedMessage = `
🔔 ${event}


📅 ${new Date().toLocaleString()}

👤 User Info:
• IP: ${userInfo.ip}
• Referer: ${userInfo.referer}
• Browser: ${userInfo.browser}
• OS: ${userInfo.os}
• Device: ${userInfo.device}
`;

  try {
    await sendMessageToTelegram(formattedMessage);
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}

// Helper function to detect bots
function detectBot(
  userAgent: string,
  browser: UAParser.IBrowser,
  referer: string
): boolean {
  const userAgentLower = userAgent.toLowerCase();

  // Check for common bot identifiers in user agent
  const botKeywords = [
    "bot",
    "crawler",
    "spider",
    "headless",
    "lighthouse",
    "slurp",
    "baiduspider",
    "yandex",
    "googlebot",
    "bingbot",
    "semrush",
    "ahrefsbot",
    "mj12bot",
    "dotbot",
  ];

  if (botKeywords.some((keyword) => userAgentLower.includes(keyword))) {
    return true;
  }

  // Check for missing browser info (common with bots)
  if (!browser.name || !browser.version) {
    return true;
  }

  // Check for suspicious referrers or lack of referrer in certain contexts
  if (referer === "direct" && userAgent.length < 40) {
    return true;
  }

  // Check for unusual user agent length
  if (userAgent.length < 20 || userAgent.length > 1000) {
    return true;
  }

  return false;
}
