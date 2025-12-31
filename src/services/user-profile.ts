import api from '../lib/api';
import { getCookie } from '../lib/auth';

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

// Attempt to extract userId from JWT payload claims
export function getUserIdFromToken(): string | null {
  try {
    const token = getCookie('jwtToken');
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const payload = JSON.parse(jsonPayload) as Record<string, unknown>;
    const possibleKeys = ['userId', 'sub', 'nameid', 'nameId'];
    for (const key of possibleKeys) {
      const val = payload[key];
      if (typeof val === 'string' && val.length > 0) return val;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchUserProfile(
  userId?: string | null
): Promise<ProfileResponse<AppUserProfile>> {
  try {
    const res = await api.get('/Account/AppUserProfile', {
      // If userId is provided use it; otherwise send null so backend uses token
      params: { userId: userId ?? null },
    });
    const data = res.data as AppUserProfile;
    console.log('Fetched user profile:', data);
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

export type UpdateAppUserProfilePayload = Partial<AppUserProfile>;

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

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<ProfileResponse> {
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
