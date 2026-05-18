import { prisma } from "@/prisma/client";

export async function GET() {
  const customersCount = await prisma.globalNumber.findFirst({
    where: {
      title: "customers",
    },
  });

  if (!customersCount) {
    return new Response(JSON.stringify({ count: 0 }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify({ count: customersCount.value }), {
    headers: { "Content-Type": "application/json" },
  });
}
