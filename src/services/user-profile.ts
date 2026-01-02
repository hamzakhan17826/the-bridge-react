import api from '../lib/api';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type AppUserProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePictureUrl?: string;
  registerDateTime?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  emailConfirmed?: boolean;
  lockoutEnd?: string | null;
  accessFailedCount?: number;
  countryId?: number;
  cityId?: number;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  gender?: string;
  changeEmailPreferencesKey?: boolean;
};

export type ProfileResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
};

export type UpdateAppUserProfilePayload = Partial<AppUserProfile>;

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Fetch user profile data
 */
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
