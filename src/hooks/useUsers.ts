import { useQuery } from '@tanstack/react-query';
import {
  fetchAppUsers,
  fetchUserClaims,
  fetchUserRoles,
} from '../services/user-profile';
import type { AppUser } from '../types/user';

// Query Keys for consistent caching and invalidation
export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (userId?: string) =>
    [...usersQueryKeys.lists(), userId || 'all'] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersQueryKeys.details(), id] as const,
};

// Hook for fetching all users or specific user
export const useAppUsers = (userId?: string) => {
  return useQuery<AppUser[]>({
    queryKey: usersQueryKeys.list(userId),
    queryFn: () => fetchAppUsers(userId),
    staleTime: 2 * 60 * 1000, // 2 minutes - user data changes frequently
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};

// Hook for fetching a specific user by ID
export const useAppUser = (userId: string) => {
  return useQuery<AppUser[]>({
    queryKey: usersQueryKeys.detail(userId),
    queryFn: () => fetchAppUsers(userId),
    enabled: !!userId, // Only fetch if userId is provided
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

// Hook for fetching user claims
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

// Hook for fetching user roles
export const useUserRoles = (userId: string) => {
  return useQuery<{ key: string; value: string }[]>({
    queryKey: ['userRoles', userId],
    queryFn: () => fetchUserRoles(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};
