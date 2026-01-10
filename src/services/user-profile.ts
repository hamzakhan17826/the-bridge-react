import api from '../lib/api';
import type {
  AppUserProfile,
  ChangePasswordPayload,
  ProfileResponse,
  AppUser,
} from '../types/user';

export type UpdateAppUserProfilePayload = Partial<AppUserProfile>;

export async function fetchUserProfile(
  userId?: string | null
): Promise<ProfileResponse<AppUserProfile>> {
  try {
    const res = await api.get('/Account/AppUserProfile', {
      params: { userId: userId ?? null },
    });

    const data = res.data as AppUserProfile;
    // console.log('Fetched user profile:', data);

    return {
      success: true,
      message: 'Profile loaded successfully.',
      data,
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string; errors?: Record<string, string[]> };
      };
    };

    const d = err.response?.data;
    const errors = d?.errors
      ? (Object.values(d.errors).flat() as string[])
      : undefined;

    return {
      success: false,
      message: d?.message || 'Failed to load profile.',
      errors,
    };
  }
}

/**
 * Update user profile data
 */
export async function updateUserProfile(
  formData: FormData
): Promise<ProfileResponse> {
  try {
    const res = await api.post('/Account/UpdateAppUserProfile', formData);
    const result = res.data;

    const ok =
      res.status === 200 && (result?.result === true || !('result' in result));

    return {
      success: ok,
      message:
        result?.message ||
        (ok ? 'Profile updated successfully.' : 'Profile update failed.'),
      errors: result?.errors,
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string; errors?: Record<string, string[]> };
      };
    };

    const d = err.response?.data;
    const errors = d?.errors
      ? (Object.values(d.errors).flat() as string[])
      : undefined;

    return {
      success: false,
      message: d?.message || 'Could not connect to the server.',
      errors: errors ?? ['Server connection failed.'],
    };
  }
}

/**
 * Change user password
 */
export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ProfileResponse> {
  try {
    const res = await api.post('/Account/ChangePassword', payload);
    const result = res.data;

    const ok =
      res.status === 200 && (result?.result === true || !('result' in result));

    return {
      success: ok,
      message:
        result?.message ||
        (ok ? 'Password changed successfully.' : 'Password change failed.'),
      errors: result?.errors,
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string; errors?: Record<string, string[]> };
      };
    };

    const d = err.response?.data;
    const errors = d?.errors
      ? (Object.values(d.errors).flat() as string[])
      : undefined;

    return {
      success: false,
      message: d?.message || 'Could not connect to the server.',
      errors: errors ?? ['Server connection failed.'],
    };
  }
}
/**
 * Fetch app users - returns specific user if ID provided, otherwise all users
 */
export async function fetchAppUsers(userId?: string): Promise<AppUser[]> {
  try {
    const res = await api.get('/EditUser/AppUsers', {
      params: userId ? { id: userId } : {},
    });

    const data = res.data as AppUser[];
    console.log('Fetched app users:', data.length, 'users');

    return data;
  } catch (error: unknown) {
    console.error('Failed to load users:', error);
    throw error; // Let React Query handle the error
  }
}
