import api from '../lib/api';
import type { ApiResponse } from '../types/api';
import type { BlogPostResponse } from '../types/blog';

export const getBlogs = async (): Promise<BlogPostResponse[]> => {
  const response = await api.get<BlogPostResponse[]>('/Blog');
  return response.data;
};

export const getBlogBySlug = async (
  slug: string
): Promise<BlogPostResponse> => {
  const response = await api.get<BlogPostResponse>(`/Blog/${slug}`);
  return response.data;
};

export const createBlog = async (
  formData: FormData
): Promise<ApiResponse<BlogPostResponse>> => {
  const response = await api.post<ApiResponse<BlogPostResponse>>(
    '/Blog/CreateBlog',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const updateBlog = async (
  id: number,
  formData: FormData
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/Blog/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBlog = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/Blog/${id}`);
  return response.data;
};
