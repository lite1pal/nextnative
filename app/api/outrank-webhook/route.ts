import { NextRequest } from "next/server";

const ACCESS_TOKEN = process.env.OUTRANK_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  // Get the bearer token from the header
  const authToken = (req.headers.get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // If not found OR the bearer token does NOT equal the CRON_SECRET
  if (!authToken || authToken != ACCESS_TOKEN) {
    return unauthorizedResponse();
  }

  return new Response("Webhook received and processed", { status: 200 });
}
function unauthorizedResponse() {
  throw new Error("Function not implemented.");
}
