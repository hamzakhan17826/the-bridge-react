import api from '../lib/api';
import { setCookie, emitAuthChange, setAuthCookies } from '../lib/auth';
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
      console.log(
        '🔐 [LOGIN] Login successful, rememberMe:',
        payload.rememberMe
      );

      // Set auth-related cookies consistently
      setAuthCookies({
        jwtToken: result.jwtToken,
        refreshToken: result.refreshToken,
        roles: Array.isArray(result.roles) ? result.roles : undefined,
        persistent: payload.rememberMe,
      });

      // Store roles in Zustand if present
      if (Array.isArray(result.roles)) {
        useAuthStore.getState().setRoles(result.roles);
      }

      // Store remember me flag for refresh logic
      setCookie('rememberMe', payload.rememberMe ? '1' : '0', {
        path: '/',
        sameSite: 'lax',
        ...(payload.rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      });
      console.log(
        '🍪 [LOGIN] Setting rememberMe cookie:',
        payload.rememberMe ? '1' : '0',
        'persistent:',
        payload.rememberMe
      );

      // refreshToken is already handled via setAuthCookies above

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
