import { QueryClient } from '@tanstack/react-query';

// Global QueryClient configuration for consistent behavior across the app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for this long
      gcTime: 10 * 60 * 1000, // 10 minutes - cache garbage collection time
      retry: (failureCount, error) => {
        // Retry up to 3 times, but not for 4xx errors (client errors)
        if (failureCount >= 3) return false;
        const status = (error as any)?.response?.status;
        return !status || status >= 500; // Retry only on server errors
      },
      refetchOnWindowFocus: false, // Refetch when window regains focus
      refetchOnReconnect: true, // Refetch on network reconnect
    },
    mutations: {
      retry: false, // Mutations typically don't retry on failure
    },
  },
});
