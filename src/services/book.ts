import api from '../lib/api';
import type { ApiResponse } from '../types/api';
import type { BookResponse } from '../types/book';

export const getBooks = async (): Promise<BookResponse[]> => {
  const response = await api.get<BookResponse[]>('/Book');
  return response.data;
};

export const getBookBySlug = async (slug: string): Promise<BookResponse> => {
  const response = await api.get<BookResponse>(`/Book/${slug}`);
  return response.data;
};

export const createBook = async (
  formData: FormData
): Promise<ApiResponse<BookResponse>> => {
  const response = await api.post<ApiResponse<BookResponse>>(
    '/Book/CreateBook',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const updateBook = async (
  id: number,
  formData: FormData
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/Book/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBook = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/Book/${id}`);
  return response.data;
};
