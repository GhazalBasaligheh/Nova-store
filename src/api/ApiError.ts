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

