import api from '../lib/api';
import type { VerifyEmailState } from '../types/auth';

export async function verifyEmail(
  userId: string,
  token: string
): Promise<VerifyEmailState> {
  if (!userId || !token) {
    return {
      success: false,
      message: 'Invalid verification link. Missing required parameters.',
    };
  }
  try {
    const res = await api.get('/Account/VerifyEmail', {
      params: { userId, token },
    });
    const result = res.data;
    if (res.status === 200 && result?.result) {
      return {
        success: true,
        message:
          result.message ||
          'Your email has been successfully verified. You can now log in.',
      };
    } else {
      return {
        success: false,
        message:
          result?.message || 'The verification link is invalid or has expired.',
      };
    }
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string };
      };
    };
    const data = err?.response?.data ?? {};
    return {
      success: false,
      message:
        data.message ||
        'Could not connect to the server. Please try again later.',
    };
  }
}
