import api from '../lib/api';
import type { ApiResponse } from '../types/api';
import type { EventListItem } from '../types/event';

export const createEvent = async (payload: FormData): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>('/Event/CreateEvent', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchEvents = async (): Promise<EventListItem[]> => {
  const response = await api.get('/Event/Events');
  return response.data as EventListItem[];
};
