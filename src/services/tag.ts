import api from '../lib/api';
import type { ApiResponse } from '../types/api';
import type { TagResponse, TagRequest } from '../types/tag';

export const getTags = async (): Promise<TagResponse[]> => {
  const response = await api.get<TagResponse[]>('/Tag');
  return response.data;
};

export const getTagById = async (id: number): Promise<TagResponse> => {
  const response = await api.get<TagResponse>(`/Tag/${id}`);
  return response.data;
};

export const createTag = async (
  tag: TagRequest
): Promise<ApiResponse<TagResponse>> => {
  const response = await api.post<ApiResponse<TagResponse>>('/Tag', tag);
  return response.data;
};

export const updateTag = async (
  id: number,
  tag: TagRequest
): Promise<ApiResponse> => {
  console.log('Updating tag with id:', id, 'and data:', tag);
  const response = await api.put<ApiResponse>(`/Tag/${id}`, tag);
  return response.data;
};

export const deleteTag = async (id: number): Promise<ApiResponse> => {
  const response = await api.delete<ApiResponse>(`/Tag/${id}`);
  return response.data;
};
