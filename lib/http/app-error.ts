import "server-only";

export class AppError extends Error {
  code: string;
  httpStatus: number;
  safeMessage: string;

  constructor(opts: {
    code: string;
    httpStatus: number;
    safeMessage: string;
    message?: string;
  }) {
    super(opts.message ?? opts.safeMessage);
    this.name = "AppError";
    this.code = opts.code;
    this.httpStatus = opts.httpStatus;
    this.safeMessage = opts.safeMessage;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
