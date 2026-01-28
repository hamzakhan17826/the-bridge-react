import { useQuery } from '@tanstack/react-query';
import {
  fetchAppUsersBasicData,
  fetchUserClaims,
  fetchUserRoles,
} from '../services/user-profile';
import type {
  AppUsersBasicDataRequest,
  AppUsersBasicDataUser,
} from '../types/user';

// Query Keys for consistent caching and invalidation
export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (userId?: string) =>
    [...usersQueryKeys.lists(), userId || 'all'] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersQueryKeys.details(), id] as const,
};

export const useAppUsersBasicData = (params?: AppUsersBasicDataRequest) => {
  return useQuery<{
    users: AppUsersBasicDataUser[];
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
  }>({
    queryKey: usersQueryKeys.list(params?.userId),
    queryFn: () => fetchAppUsersBasicData(params),
    staleTime: 2 * 60 * 1000, // 2 minutes - user data changes frequently
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};

// export const useAppUserBasicData = (userId: string) => {
//   return useQuery<{
//     users: AppUsersBasicDataUser[];
//     totalRecords: number;
//     pageNumber: number;
//     pageSize: number;
//   }>({
//     queryKey: usersQueryKeys.detail(userId),
//     queryFn: () => fetchAppUsersBasicData({ userId }),
//     enabled: !!userId, // Only fetch if userId is provided
//     staleTime: 2 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//     retry: 2,
//     refetchOnWindowFocus: false,
//   });
// };

export const useUserClaims = (userId: string) => {
  return useQuery<{ key: string; value: string }[]>({
    queryKey: ['userClaims', userId],
    queryFn: () => fetchUserClaims(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export const useUserRoles = (userId: string) => {
  return useQuery<{ key: string; value: boolean }[]>({
    queryKey: ['userRoles', userId],
    queryFn: () => fetchUserRoles(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};
