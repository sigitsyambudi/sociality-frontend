import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/api";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry(failureCount, error) {
          if (error instanceof ApiError && error.status < 500) {
            return false;
          }

          return failureCount < 1;
        },
        staleTime: 60 * 1000,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
