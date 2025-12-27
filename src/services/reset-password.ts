import api from '../lib/api';

export type ResetPasswordState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type ResetPayload = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export async function resetPassword(
  payload: ResetPayload
): Promise<ResetPasswordState> {
  if (payload.newPassword !== payload.confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match.',
      errors: ['Passwords do not match.'],
    };
  }
  try {
    const res = await api.post('/Account/ResetPassword', payload);
    const result = res.data;
    if (res.status === 200 && result?.result) {
      return {
        success: true,
        message:
          result.message || 'Password reset successfully. You can now log in.',
      };
    }
    const errorMessages = result?.errors || ['Reset failed.'];
    return {
      success: false,
      message: result?.message || 'Please check your details.',
      errors: errorMessages,
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { errors?: Record<string, string[]>; title?: string };
      };
    };
    const data = err?.response?.data ?? {};
    const errorMessages = Object.values(data.errors || {}).flat();
    return {
      success: false,
      message:
        data.title ||
        'Could not connect to the server. Please try again later.',
      errors: errorMessages.length
        ? (errorMessages as string[])
        : ['Server connection failed.'],
    };
  }
}
