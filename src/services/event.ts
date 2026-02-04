import api from '../lib/api';
import type { ApiResponse } from '../types/api';

export const createEvent = async (payload: FormData): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/Event/CreateEvent', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
