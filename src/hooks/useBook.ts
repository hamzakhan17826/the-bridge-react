import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import {
  getBooks,
  getBookBySlug,
  createBook,
  updateBook,
  deleteBook,
} from '../services/book';
import type { ApiResponse } from '../types/api';
import type { BookResponse } from '../types/book';

export const bookQueryKeys = {
  all: ['books'] as const,
  list: () => [...bookQueryKeys.all, 'list'] as const,
  detail: (slug: string) => [...bookQueryKeys.all, 'detail', slug] as const,
};

export function useBooks() {
  return useQuery<BookResponse[]>({
    queryKey: bookQueryKeys.list(),
    queryFn: getBooks,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBook(slug: string) {
  return useQuery<BookResponse>({
    queryKey: bookQueryKeys.detail(slug),
    queryFn: () => getBookBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<BookResponse>, AxiosError, FormData>({
    mutationFn: createBook,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Book created successfully.');
        queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to create book.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error creating book.');
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError,
    { id: number; formData: FormData }
  >({
    mutationFn: ({ id, formData }) => updateBook(id, formData),
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Book updated successfully.');
        queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to update book.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error updating book.');
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError, number>({
    mutationFn: deleteBook,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Book deleted successfully.');
        queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
      } else {
        toast.error(data.message || 'Failed to delete book.');
      }
    },
    onError: (error) => {
      const respData: any = error.response?.data;
      toast.error(respData?.message || 'Error deleting book.');
    },
  });
}
