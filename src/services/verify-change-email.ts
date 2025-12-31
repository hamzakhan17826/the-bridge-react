import api from '../lib/api';

export type VerifyChangeEmailState = {
  success: boolean;
  message: string;
};

export async function verifyChangeEmail(
  userId: string,
  token: string,
  newEmail: string
): Promise<VerifyChangeEmailState> {
  if (!userId || !token || !newEmail) {
    return {
      success: false,
      message: 'Invalid request. Missing required parameters.',
    };
  }
  try {
    const res = await api.get('/Account/VerifyChangeEmail', {
      params: { userId, token, newEmail },
    });
    const result = res.data;
    console.log('VerifyChangeEmail response:', result);
    console.log('res status', res.status);
    if (res.status === 200) {
      return {
        success: true,
        message:
          result.message ||
          'Your email has been successfully changed. You can now log in with your new email.',
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
