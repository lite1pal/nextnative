import "server-only";
import { NextResponse } from "next/server";
import { AppError, isAppError } from "@/lib/http/app-error";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(
  code: string,
  message: string,
  status: number,
  init?: ResponseInit,
) {
  return NextResponse.json(
    { ok: false, error: { code, message } },
    { status, ...init },
  );
}

export function fromError(error: unknown) {
  if (isAppError(error)) {
    return fail(error.code, error.safeMessage, error.httpStatus);
  }

  console.error("Unhandled API error:", error);
  return fail("INTERNAL_ERROR", "Internal server error", 500);
}

export function assertOrThrow(condition: boolean, error: AppError) {
  if (!condition) throw error;
}
