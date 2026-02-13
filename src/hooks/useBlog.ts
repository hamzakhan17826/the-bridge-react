import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../services/blog';
import type { ApiResponse } from '../types/api';
import type { BlogPost } from '../types/blog';

export const blogQueryKeys = {
  all: ['blogs'] as const,
  list: () => [...blogQueryKeys.all, 'list'] as const,
  detail: (slug: string) => [...blogQueryKeys.all, 'detail', slug] as const,
};

export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: blogQueryKeys.list(),
    queryFn: getBlogPosts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPost>({
    queryKey: blogQueryKeys.detail(slug),
    queryFn: () => getBlogPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<BlogPost>, AxiosError, FormData>({
    mutationFn: createBlogPost,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post created successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to create blog post.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error creating blog post.');
    },
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError,
    { id: number; formData: FormData }
  >({
    mutationFn: ({ id, formData }) => updateBlogPost(id, formData),
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post updated successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to update blog post.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error updating blog post.');
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: deleteBlogPost,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post deleted successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to delete blog post.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error deleting blog post.');
    },
  });
}
