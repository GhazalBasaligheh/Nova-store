import axios, { AxiosError, type AxiosResponse } from 'axios';
import { ApiError } from '@/api/ApiError';
import { ApiErrorKind } from '@/types/enums/ApiErrorKind';
import { env } from '@/utils/env';

const TIMEOUT_MS = 10_000;

export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: TIMEOUT_MS,
  headers: { Accept: 'application/json' },
});

function isJson(response: AxiosResponse): boolean {
  const contentType = String(response.headers['content-type'] ?? '');
  return contentType.includes('application/json');
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isCancel(error)) return new ApiError(ApiErrorKind.Canceled, 'Request canceled');

  if (error instanceof AxiosError) {
    const { response } = error;
    if (!response) return new ApiError(ApiErrorKind.Network, error.message);

    const { status } = response;
    if (status >= 500) return new ApiError(ApiErrorKind.Server, `Server error (${status})`, status);
    return new ApiError(ApiErrorKind.Client, `Request failed (${status})`, status);
  }

  return new ApiError(
    ApiErrorKind.Network,
    error instanceof Error ? error.message : 'Unknown error',
  );
}

// Central error handling: every failure, including a 200 with a non-JSON body,
// leaves this instance as a typed ApiError.
axiosInstance.interceptors.response.use(
  (response) => {
    if (!isJson(response)) {
      throw new ApiError(
        ApiErrorKind.Parse,
        `Non-JSON response (${response.status})`,
        response.status,
      );
    }
    return response;
  },
  (error: unknown) => Promise.reject(toApiError(error)),
);
