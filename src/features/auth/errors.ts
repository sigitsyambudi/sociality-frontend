import { ApiError } from "@/api";

export function getAuthErrorMessage(
  error: unknown,
  fallback: string,
  unauthorizedMessage?: string,
) {
  if (!(error instanceof ApiError)) {
    return fallback;
  }

  if (error.status === 0) {
    return error.code === "API_BASE_URL_MISSING"
      ? "Authentication is not configured."
      : "Unable to reach Sociality. Check your connection and try again.";
  }

  if (error.status === 401 && unauthorizedMessage) {
    return unauthorizedMessage;
  }

  if (error.status >= 500) {
    return "Sociality is temporarily unavailable. Please try again.";
  }

  return error.message || fallback;
}
