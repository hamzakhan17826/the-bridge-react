import api from '../lib/api';
import { setCookie, emitAuthChange } from '../lib/auth';
import { useAuthStore } from '../stores/authStore';
import { fetchUserProfile } from './user-profile';
import { getUserIdFromToken } from '../lib/utils';
import type { LoginFormState, LoginPayload } from '../types/auth';

export async function loginUser(
  payload: LoginPayload
): Promise<LoginFormState> {
  try {
    const res = await api.post('/Account/Login', payload);
    const result = res.data;

    if (res.status === 200 && result?.result === true) {
      if (result.jwtToken) {
        setCookie('auth', '1', { path: '/', sameSite: 'lax' });
        // Mirror jwt token into a non-httpOnly cookie for client-side checks
        setCookie('jwtToken', result.jwtToken, {
          path: '/',
          sameSite: 'lax',
          // Make persistent only if rememberMe is set; otherwise session cookie
          maxAge: payload.rememberMe ? 60 * 60 * 24 * 30 : undefined,
        });
      }
      if (Array.isArray(result.roles)) {
        try {
          setCookie('userRole', JSON.stringify(result.roles), {
            path: '/',
            sameSite: 'lax',
          });
          // Store roles in Zustand
          useAuthStore.getState().setRoles(result.roles);
        } catch (err) {
          void err; // noop
        }
      }
      if (result.refreshToken) {
        // Mirror refresh token in a non-httpOnly cookie for client checks
        // Backend should set httpOnly cookie as well when applicable
        setCookie('refreshToken', result.refreshToken, {
          path: '/',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }

      // Fetch and store user profile in Zustand
      try {
        const userId = getUserIdFromToken();
        if (userId) {
          const profileResponse = await fetchUserProfile(userId);
          if (profileResponse.success && profileResponse.data) {
            useAuthStore
              .getState()
              .login(profileResponse.data, result.roles || []);
          }
        }
      } catch (profileError) {
        console.warn('Failed to load user profile after login:', profileError);
        // Still proceed with login even if profile fetch fails
      }

      // Notify app that auth state has changed
      emitAuthChange();
      return {
        success: true,
        message: result.message || 'Login successful!',
      };
    }

    const errorMessages = result?.errors
      ? (Object.values(result.errors).flat() as string[])
      : [];
    return {
      success: false,
      message: result?.message || 'Please check your credentials.',
      errors: errorMessages.length ? errorMessages : ['Login failed.'],
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
