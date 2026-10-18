import { apiClient } from "@/api";

export type TimelinePageParams = {
  limit?: number;
  page?: number;
};

export function getTimelinePage({
  limit = 20,
  page = 1,
}: TimelinePageParams = {}): Promise<unknown> {
  const params = new URLSearchParams({
    limit: String(Math.min(50, Math.max(1, limit))),
    page: String(Math.max(1, page)),
  });

  return apiClient.get(`/api/feed?${params}`, { authenticated: true });
}
