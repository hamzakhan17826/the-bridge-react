import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  fetchAppUsersBasicData,
  fetchUserClaims,
  fetchUserRoles,
} from '../services/user-profile';
import api from '../lib/api';
import type {
  AppUsersBasicDataRequest,
  AppUsersBasicDataUser,
  EditUserFormData,
  EditUserResponse,
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

// Edit User Hook
export const useEditUser = (userId: string) => {
  const queryClient = useQueryClient();
  // Query to fetch user data for editing
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery<EditUserResponse>({
    queryKey: ['editUser', userId],
    queryFn: async () => {
      const response = await api.post('/EditUser/AppUsersBasicData', {
        userId: userId,
      });
      return response.data;
    },
    enabled: !!userId,
    retry: 1,
  });

  // Mutation to update user data
  const updateUserMutation = useMutation({
    mutationFn: async (data: EditUserFormData) => {
      console.log('Update API URL: /EditUser/UpdateAppUserProfile');

      // Always use FormData for consistency
      const formData = new FormData();
      formData.append('userID', data.userID);
      formData.append('FirstName', data.FirstName);
      formData.append('LastName', data.LastName);
      formData.append('UserName', data.UserName);
      formData.append('CountryId', data.CountryId.toString());
      formData.append('CityId', data.CityId.toString());
      formData.append('AddressLine1', data.AddressLine1 || '');
      formData.append('AddressLine2', data.AddressLine2 || '');
      formData.append('PostalCode', data.PostalCode || '');
      formData.append('DateOfBirth', data.DateOfBirth || '');
      formData.append('Gender', data.Gender || '');
      formData.append('IsDeleted', data.IsDeleted.toString());
      formData.append('IsBlocked', data.IsBlocked.toString());

      // Only append ProfilePicture if it exists
      if (data.ProfilePicture) {
        formData.append('ProfilePicture', data.ProfilePicture);
      }

      console.log('Sending FormData:', {
        userID: data.userID,
        FirstName: data.FirstName,
        LastName: data.LastName,
        UserName: data.UserName,
        CountryId: data.CountryId,
        CityId: data.CityId,
        AddressLine1: data.AddressLine1,
        AddressLine2: data.AddressLine2,
        PostalCode: data.PostalCode,
        DateOfBirth: data.DateOfBirth,
        Gender: data.Gender,
        IsDeleted: data.IsDeleted,
        IsBlocked: data.IsBlocked,
        ProfilePicture: data.ProfilePicture
          ? data.ProfilePicture.name
          : 'No file',
      });

      const response = await api.post(
        '/EditUser/UpdateAppUserProfile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Update API response status:', response.status);
      console.log('Update API response data:', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Update success response:', data);
      if (data.result === true) {
        toast.success(data.message || 'User updated successfully!');
        queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to update user');
        if (data.errors && data.errors.length > 0) {
          console.error('Update validation errors:', data.errors);
        }
      }
    },
    onError: (error: AxiosError) => {
      console.error('User update error:', error);
      let errorMessage = 'Failed to update user';

      if (error?.response?.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData: any = error.response.data;

        // Handle different error response formats
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.join(', ');
        } else if (errorData.errors && typeof errorData.errors === 'object') {
          // Handle validation errors object
          const errorMessages = Object.values(errorData.errors).flat();
          errorMessage = errorMessages.join(', ');
        } else if (errorData.title) {
          errorMessage = errorData.title;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return {
    userData,
    isLoadingUser,
    userError,
    updateUserMutation,
  };
};
