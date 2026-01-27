import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { z } from "zod";
import { ratelimit } from "@/lib/rate-limiter";
import { headers } from "next/headers";

const GITHUB_OWNER = "lite1pal";
const GITHUB_REPO = "nextnative_boilerplate";

const schema = z.object({
  githubUsername: z.string().min(1).max(39),
  paymentId: z.string().min(5),
  amount: z.number().min(1).max(9999),
});

export async function POST(request: NextRequest) {
  try {
    // // ✅ Rate limit by IP
    // const headersList = await headers();
    // const ip = headersList.get("x-forwarded-for") ?? "anonymous";
    // const { success: allowed } = await ratelimit.limit(ip);

    // if (!allowed) {
    //   trackEvent(`⛔ Rate limited IP: ${ip}`, false);
    //   return NextResponse.json(
    //     { error: "Too many requests. Please wait a moment." },
    //     { status: 429 },
    //   );
    // }

    const body = await request.json();

    // ✅ Validate input
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { githubUsername, paymentId, amount } = parsed.data;

    // ✅ Check if the payment ID is valid
    const payment = await fetch(
      `https://live.dodopayments.com/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_SECRET!}`,
        },
      },
    );

    if (!payment.ok) {
      return NextResponse.json(
        { error: "Invalid or unsuccessful payment" },
        { status: 403 },
      );
    }

    // ✅ Check payment status
    const paymentData = await payment.json();
    if (paymentData.status !== "succeeded") {
      return NextResponse.json(
        { error: "Invalid or unsuccessful payment" },
        { status: 403 },
      );
    }

    // ✅ Prevent duplicate invites
    const existingPurchase = await prisma.purchase.findFirst({
      where: { paymentId },
    });
    if (existingPurchase?.isInvited) {
      return NextResponse.json({ error: "Already invited" }, { status: 409 });
    }

    // Track payment with Datafast
    try {
      const datafast_visitor_id = request.cookies.get(
        "datafast_visitor_id",
      )?.value;

      const response = await fetch("https://datafa.st/api/v1/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DATAFAST_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          transaction_id: paymentId,
          datafast_visitor_id: datafast_visitor_id,
        }),
      });

      const datafastResult = await response.json();
      if (!response.ok)
        throw new Error(datafastResult?.message || "DataFast error");

      console.log("DataFast payment tracked");
    } catch (error) {
      console.error("Error tracking DataFast payment:", error);
    }

    // ✅ Check if the GitHub token is available
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token is not configured" },
        { status: 500 },
      );
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // ✅ Invite user to the repository
    await octokit.repos.addCollaborator({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      username: githubUsername,
      permission: "pull",
    });

    trackEvent(`💌 User invited to repo - ${githubUsername}`, false);

    if (existingPurchase) {
      await prisma.purchase.update({
        where: { id: existingPurchase.id },
        data: { isInvited: true, githubUsername },
      });
    } else {
      await prisma.purchase.create({
        data: {
          paymentId,
          githubUsername,
          isInvited: true,
        },
      });
    }

    return NextResponse.json(
      { message: "Invitation sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    trackEvent("💰 Error on submit-username - " + error.message + " 💔", false);
    console.error("Error processing username:", error);
    return NextResponse.json(
      { error: "Failed to process username" },
      { status: 500 },
    );
  }
}
