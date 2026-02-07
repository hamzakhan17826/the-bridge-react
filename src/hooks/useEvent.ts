import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { createEvent, fetchEvents, fetchMyEvents } from '../services/event';
import type { ApiResponse } from '../types/api';
import type { EventListItem } from '../types/event';

export const eventQueryKeys = {
  all: ['events'] as const,
  list: () => [...eventQueryKeys.all, 'list'] as const,
  myList: () => [...eventQueryKeys.all, 'my-list'] as const,
};

export function useCreateEvent() {
  return useMutation<ApiResponse, AxiosError, FormData>({
    mutationFn: createEvent,
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Event created successfully.');
      } else {
        const errorMsg =
          data.errors?.join(', ') || data.message || 'Failed to create event.';
        toast.error(`Event creation failed: ${errorMsg}`);
      }
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const respData: any = error.response?.data;
      let message = 'An unexpected error occurred.';

      if (respData) {
        if (respData.message) message = respData.message;

        if (respData.errors) {
          if (Array.isArray(respData.errors)) {
            message = respData.errors.join(', ');
          } else if (typeof respData.errors === 'object') {
            message = Object.values(respData.errors).flat().join(', ');
          }
        } else if (respData.title) {
          message = respData.title;
        }
      } else if (error.message) {
        message = error.message;
      }

      toast.error(`Event creation failed: ${message}`);
    },
  });
}

export function useEvents() {
  return useQuery<EventListItem[]>({
    queryKey: eventQueryKeys.list(),
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyEvents() {
  return useQuery<EventListItem[]>({
    queryKey: eventQueryKeys.myList(),
    queryFn: fetchMyEvents,
    staleTime: 60 * 1000,
  });
}
