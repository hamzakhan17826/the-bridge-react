import api from '../lib/api';

export type ForgetPasswordState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export async function sendResetLink(
  email: string
): Promise<ForgetPasswordState> {
  if (!email) {
    return {
      success: false,
      message: 'Email is required.',
      errors: ['Email is required.'],
    };
  }
  try {
    const res = await api.post('/Account/ForgetPassword', { email });
    const result = res.data;
    if (res.status === 200 && result?.result) {
      return {
        success: true,
        message: result.message || 'Password reset link sent to your email.',
      };
    }
    const errors = result?.errors || ['Request failed.'];
    return {
      success: false,
      message: result?.message || 'Please check your email.',
      errors,
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
