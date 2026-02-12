import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../services/blog';
import type { ApiResponse } from '../types/api';
import type { BlogPostResponse } from '../types/blog';

export const blogQueryKeys = {
  all: ['blogs'] as const,
  list: () => [...blogQueryKeys.all, 'list'] as const,
  detail: (slug: string) => [...blogQueryKeys.all, 'detail', slug] as const,
};

export function useBlogs() {
  return useQuery<BlogPostResponse[]>({
    queryKey: blogQueryKeys.list(),
    queryFn: getBlogs,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlog(slug: string) {
  return useQuery<BlogPostResponse>({
    queryKey: blogQueryKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<BlogPostResponse>, AxiosError, FormData>({
    mutationFn: createBlog,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post created successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.list() });
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

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError,
    { id: number; formData: FormData }
  >({
    mutationFn: ({ id, formData }) => updateBlog(id, formData),
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post updated successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.list() });
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

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: deleteBlog,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Blog post deleted successfully.');
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.list() });
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
