"use server";

import { useCases } from "@/app/(core)/use-cases/[slug]/use-cases-data";

/**
 * Server action to generate download URL for a template
 * In production, this should:
 * 1. Verify user authentication
 * 2. Check if user has purchased the template
 * 3. Log the download for analytics
 * 4. Generate a time-limited signed URL for security
 */
export async function getTemplateDownloadUrl(slug: string) {
  // Verify template exists
  const template = useCases.find((uc) => uc.slug === slug);

  if (!template) {
    throw new Error("Template not found");
  }

  // TODO: Verify user has purchased this template
  // const session = await getServerSession();
  // if (!session) {
  //   throw new Error("Unauthorized");
  // }
  //
  // const hasPurchased = await db.purchase.findFirst({
  //   where: {
  //     userId: session.user.id,
  //     templateSlug: slug,
  //     status: 'completed'
  //   }
  // });
  //
  // if (!hasPurchased) {
  //   throw new Error("You haven't purchased this template");
  // }

  // TODO: Log the download
  // await db.downloadLog.create({
  //   data: {
  //     userId: session.user.id,
  //     templateSlug: slug,
  //     downloadedAt: new Date(),
  //   }
  // });

  // Return the download URL
  // In production, generate a signed URL with expiration
  const downloadUrl = `/api/download-template?slug=${slug}`;

  return {
    success: true,
    downloadUrl,
    templateName: `${slug}-template.zip`,
  };
}

/**
 * Verify if user has purchased a template
 * This is a placeholder - implement with your payment provider
 */
export async function verifyTemplatePurchase(slug: string) {
  // TODO: Implement actual verification
  // Example with Stripe:
  // const session = await getServerSession();
  // const purchases = await stripe.checkout.sessions.list({
  //   customer: session.user.stripeCustomerId,
  //   limit: 100,
  // });
  //
  // return purchases.data.some(
  //   (purchase) => purchase.metadata.templateSlug === slug
  // );

  // For now, return false (require purchase)
  return false;
}
