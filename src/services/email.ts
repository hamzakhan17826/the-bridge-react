import api from '../lib/api';
import type { EmailPreference } from '../types/api';
import type { ApiResponse } from '../types/api';

export type SendEmailsPayload = {
  toUsersWithEmailPreferenceID: string[];
  subject: string;
  bodyHtmlOrText: string;
};

export async function fetchEmailPreferences(): Promise<EmailPreference[]> {
  try {
    const res = await api.get('/EmailSubscription/GetEmailPreferences');
    return res.data as EmailPreference[];
  } catch (error) {
    console.error('Error fetching email preferences', error);
    return [];
  }
}

export async function sendEmailsToUsers(
  payload: SendEmailsPayload
): Promise<ApiResponse> {
  try {
    const res = await api.post('/System/SendEmailsToUsers', payload);
    return res.data as ApiResponse;
  } catch (error: unknown) {
    console.error('Failed to send emails', error);
    throw error;
  }
}
