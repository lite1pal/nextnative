import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
  CONVERTKIT_API_KEY: z.string().min(1, "CONVERTKIT_API_KEY is required"),
  CONVERTKIT_FORM_ID: z.string().min(1, "CONVERTKIT_FORM_ID is required"),
  TELEGRAM_BOT_TOKEN: z.string().min(1, "TELEGRAM_BOT_TOKEN is required"),
  TELEGRAM_CHAT_ID: z.string().min(1, "TELEGRAM_CHAT_ID is required"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL"),
  NEXT_PUBLIC_API_URL: z
    .string()
    .url("NEXT_PUBLIC_API_URL must be a valid URL"),
  NEXT_PUBLIC_BOOK_CALL_LINK: z
    .string()
    .url("NEXT_PUBLIC_BOOK_CALL_LINK must be a valid URL"),
  NEXT_PUBLIC_IOS_PUBLISHING_GUIDE_URL: z
    .string()
    .url("NEXT_PUBLIC_IOS_PUBLISHING_GUIDE_URL must be a valid URL"),
  NEXT_PUBLIC_ANDROID_PUBLISHING_GUIDE_URL: z
    .string()
    .url("NEXT_PUBLIC_ANDROID_PUBLISHING_GUIDE_URL must be a valid URL"),
  NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRICE_ID is required"),
  NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRICE_ID is required"),
  NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_STRIPE_NEXTNATIVE_STARTER_PRODUCT_ID is required"),
  NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID is required"),
  NEXT_PUBLIC_STRIPE_NEXTNATIVE_PROMOTION_CODE_ID: z.string().optional(),
});

const formatError = (parsedError: z.ZodError) =>
  parsedError.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

export function validateEnv(source: NodeJS.ProcessEnv = process.env) {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment configuration: ${formatError(parsed.error)}`,
    );
  }
  return parsed.data;
}

export const env = validateEnv();
export type Env = z.infer<typeof envSchema>;
