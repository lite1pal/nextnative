import "server-only";
import { sendMessageToTelegram } from "@/services/telegram";
import {
  addSubscriberToForm,
  ensureSubscriber,
} from "@/lib/services/convertkit";

export async function grantPlaygroundAccess(email: string) {
  try {
    await ensureSubscriber(email);
  } catch (error) {
    console.error("Failed to create ConvertKit subscriber:", error);
  }

  try {
    await addSubscriberToForm(email);
  } catch (error) {
    console.error("Failed to add ConvertKit subscriber to form:", error);
  }

  await sendMessageToTelegram(`✅ New playground access request: ${email}`);
}
