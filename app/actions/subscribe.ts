"use server";

interface BeehiivResponse {
  success: boolean;
  message?: string;
}

export async function subscribeToNewsletter(
  email: string
): Promise<BeehiivResponse> {
  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
  const BEEHIIV_AUTOMATION_ID = process.env.BEEHIIV_AUTOMATION_ID;

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID || !BEEHIIV_AUTOMATION_ID) {
    throw new Error("Missing Beehiiv configuration");
  }

  try {
    // First create the subscription
    const subscribeResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "nextnative.dev",
          utm_campaign: "waitlist",
        }),
      }
    );

    const subscribeData = await subscribeResponse.json();

    if (!subscribeResponse.ok) {
      return {
        success: false,
        message: subscribeData.error || "Failed to subscribe",
      };
    }

    // Then add them to the automation
    const automationResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/automations/${BEEHIIV_AUTOMATION_ID}/journeys`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    await automationResponse.json();

    if (!automationResponse.ok) {
      return {
        success: true,
        message: "You've already been added to the waitlist 🤗",
      };
    }

    return {
      success: true,
      message: "Successfully subscribed!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while subscribing",
    };
  }
}
