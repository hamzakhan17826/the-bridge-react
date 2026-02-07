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

export const fetchMyEvents = async (): Promise<EventListItem[]> => {
  const response = await api.get('/Event/MyEvents');
  return response.data as EventListItem[];
};

export const fetchMyEventById = async (
  eventId: number
): Promise<EventListItem | null> => {
  const response = await api.get('/Event/MyEvents', {
    params: { eventID: eventId },
  });
  const data = response.data as EventListItem[];
  return data[0] ?? null;
};

export const editEvent = async (payload: FormData): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>('/Event/EditEvent', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
