import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from '../services/tag';
import type { ApiResponse } from '../types/api';
import type { TagResponse, TagRequest } from '../types/tag';

export const tagQueryKeys = {
  all: ['tags'] as const,
  list: () => [...tagQueryKeys.all, 'list'] as const,
  detail: (id: number) => [...tagQueryKeys.all, 'detail', id] as const,
};

export function useTags() {
  return useQuery<TagResponse[]>({
    queryKey: tagQueryKeys.list(),
    queryFn: getTags,
    staleTime: 10 * 60 * 1000,
  });
}

export function useTag(id: number) {
  return useQuery<TagResponse>({
    queryKey: tagQueryKeys.detail(id),
    queryFn: () => getTagById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TagResponse>, AxiosError, TagRequest>({
    mutationFn: createTag,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Tag created successfully.');
        queryClient.invalidateQueries({ queryKey: tagQueryKeys.list() });
      } else {
        toast.error(data.message || 'Failed to create tag.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error creating tag.');
    },
  });
}

export function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, { id: number; tag: TagRequest }>({
    mutationFn: ({ id, tag }) => updateTag(id, tag),
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Tag updated successfully.');
        queryClient.invalidateQueries({ queryKey: tagQueryKeys.list() });
      } else {
        toast.error(data.message || 'Failed to update tag.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error updating tag.');
    },
  });
}

export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: deleteTag,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Tag deleted successfully.');
        queryClient.invalidateQueries({ queryKey: tagQueryKeys.list() });
      } else {
        toast.error(data.message || 'Failed to delete tag.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error deleting tag.');
    },
  });
}
