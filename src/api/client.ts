import type { ApiRequestBody } from "@/types/api";

type MaybePromise<T> = Promise<T> | T;

type ApiErrorOptions = {
  code?: string;
  details?: unknown;
  message: string;
  status: number;
};

export class ApiError extends Error {
  readonly code?: string;
  readonly details?: unknown;
  readonly status: number;

  constructor({ code, details, message, status }: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.details = details;
    this.status = status;
  }
}

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  authenticated?: boolean;
  body?: ApiRequestBody;
  headers?: HeadersInit;
};

export type ApiClientOptions = {
  baseUrl?: string;
  fetcher?: typeof fetch;
  getAccessToken?: () => MaybePromise<string | null | undefined>;
  onUnauthorized?: () => MaybePromise<void>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getDefaultBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new ApiError({
      code: "API_BASE_URL_MISSING",
      message: "NEXT_PUBLIC_API_BASE_URL is not configured.",
      status: 0,
    });
  }

  return baseUrl;
}

function createUrl(baseUrl: string, path: string) {
  try {
    const normalizedBaseUrl = `${baseUrl.replace(/\/+$/, "")}/`;
    const normalizedPath = path.replace(/^\/+/, "");

    return new URL(normalizedPath, normalizedBaseUrl);
  } catch {
    throw new ApiError({
      code: "API_URL_INVALID",
      message: "The API base URL or request path is invalid.",
      status: 0,
    });
  }
}

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => undefined);
  }

  const text = await response.text();
  return text || undefined;
}

function createResponseError(response: Response, details: unknown) {
  const message =
    isRecord(details) && typeof details.message === "string"
      ? details.message
      : response.statusText || "The API request failed.";
  const code =
    isRecord(details) && typeof details.code === "string"
      ? details.code
      : undefined;

  return new ApiError({
    code,
    details,
    message,
    status: response.status,
  });
}

export class ApiClient {
  private readonly baseUrl?: string;
  private readonly fetcher: typeof fetch;
  private readonly getAccessToken?: ApiClientOptions["getAccessToken"];
  private readonly onUnauthorized?: ApiClientOptions["onUnauthorized"];

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl;
    this.fetcher = options.fetcher ?? fetch;
    this.getAccessToken = options.getAccessToken;
    this.onUnauthorized = options.onUnauthorized;
  }

  async request<T = unknown>(
    path: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    const {
      authenticated = false,
      body,
      headers: providedHeaders,
      ...requestInit
    } = options;
    const headers = new Headers(providedHeaders);

    if (!headers.has("Accept")) {
      headers.set("Accept", "application/json");
    }

    if (authenticated) {
      const accessToken = await this.getAccessToken?.();

      if (!accessToken) {
        throw new ApiError({
          code: "AUTH_TOKEN_MISSING",
          message: "This request requires authentication.",
          status: 0,
        });
      }

      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let requestBody: BodyInit | undefined;

    if (body instanceof FormData) {
      requestBody = body;
    } else if (body !== undefined) {
      headers.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }

    let response: Response;

    try {
      response = await this.fetcher(
        createUrl(this.baseUrl ?? getDefaultBaseUrl(), path),
        {
          ...requestInit,
          body: requestBody,
          headers,
        },
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError({
        code: "NETWORK_ERROR",
        details: error,
        message: "The API could not be reached.",
        status: 0,
      });
    }

    const responseBody = await readResponseBody(response);

    if (response.status === 401) {
      try {
        await this.onUnauthorized?.();
      } catch {
        // Preserve the standardized API response error if session cleanup fails.
      }
    }

    if (!response.ok) {
      throw createResponseError(response, responseBody);
    }

    return responseBody as T;
  }

  get<T = unknown>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T = unknown>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiRequestOptions,
  ) {
    return this.request<T>(path, { ...options, body, method: "POST" });
  }

  put<T = unknown>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiRequestOptions,
  ) {
    return this.request<T>(path, { ...options, body, method: "PUT" });
  }

  patch<T = unknown>(
    path: string,
    body?: ApiRequestBody,
    options?: ApiRequestOptions,
  ) {
    return this.request<T>(path, { ...options, body, method: "PATCH" });
  }

  delete<T = unknown>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export function createApiClient(options?: ApiClientOptions) {
  return new ApiClient(options);
}

export const apiClient = createApiClient();
