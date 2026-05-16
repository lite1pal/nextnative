import "server-only";
import { AppError } from "@/lib/http/app-error";

export function assertAllowedOrigin(
  origin: string | null,
  allowedOrigins: readonly string[],
) {
  if (!origin || !allowedOrigins.includes(origin)) {
    throw new AppError({
      code: "FORBIDDEN_ORIGIN",
      httpStatus: 403,
      safeMessage: "Forbidden",
    });
  }
}
