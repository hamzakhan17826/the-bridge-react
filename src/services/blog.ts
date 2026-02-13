import api from '../lib/api';
import type { ApiResponse } from '../types/api';
import type { BlogPost } from '../types/blog';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/Blog');
  return response.data;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/Blog/${slug}`);
  return response.data;
};

export const createBlogPost = async (
  formData: FormData
): Promise<ApiResponse<BlogPost>> => {
  const response = await api.post<ApiResponse<BlogPost>>(
    '/Blog/CreateBlogPost',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const updateBlogPost = async (
  id: number,
  formData: FormData
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`/Blog/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBlogPost = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/Blog/${id}`);
  return response.data;
};
