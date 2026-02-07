import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchEmailPreferences, sendEmailsToUsers } from '../services/email';
import type { EmailPreference } from '../types/api';
import type { SendEmailsPayload } from '../services/email';

export const emailQueryKeys = {
  all: ['email'] as const,
  preferences: () => [...emailQueryKeys.all, 'preferences'] as const,
};

export function useEmailPreferences() {
  return useQuery<EmailPreference[]>({
    queryKey: emailQueryKeys.preferences(),
    queryFn: fetchEmailPreferences,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useSendEmailsToUsers() {
  return useMutation({
    mutationFn: (payload: SendEmailsPayload) => sendEmailsToUsers(payload),
    onSuccess: (data) => {
      if (data.result) {
        toast.success(data.message || 'Emails sent successfully.');
      } else {
        toast.error(
          data.errors?.join(', ') || data.message || 'Failed to send emails.'
        );
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to send emails.';
      toast.error(message);
    },
  });
}
