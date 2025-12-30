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
    console.log('Verifying change email for:', { userId, token, newEmail });
    const res = await api.get('/Account/VerifyChangeEmail', {
      params: { userId, token, newEmail },
    });
    const result = res.data;
    if (res.status === 200 && result?.result) {
      return {
        success: true,
        message:
          result.message ||
          'Email change request sent successfully. Please check your new email for verification.',
      };
    } else {
      return {
        success: false,
        message: result?.message || 'Failed to send email change request.',
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
