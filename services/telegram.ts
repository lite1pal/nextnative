"use server";

import axios from "axios";

export async function sendMessageToTelegram(message: string) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        parse_mode: "html",
        text: message,
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to send message to Telegram");
    }

    return response.data;
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    throw error;
  }
}
