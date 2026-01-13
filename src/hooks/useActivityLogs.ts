import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type {
  ActivityLogsFilters,
  ListActivityUniqueTypes,
} from '../types/activity-logs';
import {
  fetchActivityLogs,
  fetchListActivityUniqueTypes,
} from '../services/activity-logs';

export function useActivityLogs(
  pageNumber: number = 1,
  pageSize: number = 10,
  filters?: ActivityLogsFilters
) {
  return useQuery({
    queryKey: ['ActivityLogs', pageNumber, pageSize, filters],
    queryFn: () => fetchActivityLogs(pageNumber, pageSize, filters),
  });
}

export function useListActivityUniqueTypes(): UseQueryResult<
  ListActivityUniqueTypes[]
> {
  return useQuery({
    queryKey: ['ListActivityUniqueTypes'],
    queryFn: () => fetchListActivityUniqueTypes(),
  });
}
