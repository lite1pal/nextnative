import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";

export async function POST(request: Request) {
  try {
    const { paymentId, githubUsername } = await request.json();
    if (!paymentId || !githubUsername) {
      return NextResponse.json(
        { error: "Missing paymentId or githubUsername" },
        { status: 400 }
      );
    }

    // Check if the GitHub token is available
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token is not configured" },
        { status: 500 }
      );
    }

    // Invite user to the repository
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = "lite1pal";
    const repo = "nextnative_boilerplate";

    // Check if the user is already a collaborator
    // try {
    //   await octokit.repos.getCollaboratorPermissionLevel({
    //     owner,
    //     repo,
    //     username: githubUsername,
    //   });
    //   return NextResponse.json(
    //     { error: "User is already a collaborator" },
    //     { status: 409 }
    //   );
    // } catch (err) {
    //   if (err instanceof Error && err.message !== "Not Found") {
    //     // If the error is not a 404, it means something else went wrong
    //     throw err;
    //   }
    // }

    await octokit.repos.addCollaborator({
      owner,
      repo,
      username: githubUsername,
      permission: "pull",
    });

    const purchase = await prisma.purchase.findFirst({
      where: { paymentId },
    });

    if (purchase) {
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: { isInvited: true },
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
      { status: 200 }
    );
  } catch (error: any) {
    trackEvent("💰 Error on submit-username - " + error.message + " 💔", false);
    console.error("Error processing username:", error);
    return NextResponse.json(
      { error: "Failed to process username" },
      { status: 500 }
    );
  }
}
