import { ApiErrorKind } from '@/types/enums/ApiErrorKind';

// The single error type every request rejects with, so callers never inspect raw Axios errors.
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
  }
}

// Failures a browser request might get past (server-side bot block, server/network trouble).
// Client errors and malformed data would fail the same way in the browser, so they don't fall back.
const FALLBACK_KINDS: ReadonlySet<ApiErrorKind> = new Set([
  ApiErrorKind.Blocked,
  ApiErrorKind.Network,
  ApiErrorKind.Server,
]);

export function shouldFallbackToClient(error: unknown): boolean {
  return error instanceof ApiError && FALLBACK_KINDS.has(error.kind);
}
