import api from '../lib/api';
import { setAuthCookies } from '../lib/auth';
import { useAuthStore } from '../stores/authStore';
import { loadUserAndMemberships } from '@/lib/bootstrap';
import type { LoginFormState, LoginPayload } from '../types/auth';

export async function loginUser(
  payload: LoginPayload
): Promise<LoginFormState> {
  try {
    const res = await api.post('/Account/Login', payload);
    const result = res.data;

    if (res.status === 200 && result?.result === true) {
      // Set auth-related cookies consistently
      setAuthCookies({
        jwtToken: result.jwtToken,
        refreshToken: result.refreshToken,
        persistent: payload.rememberMe,
      });

      // Store roles in Zustand if present
      if (Array.isArray(result.roles)) {
        useAuthStore
          .getState()
          .setRoles(result.roles.map((r: string) => r.toLowerCase()));
      }

      // Mark session as logged-in even if profile fetch fails
      useAuthStore.getState().setLoggedIn(true);
      useAuthStore.getState().setInitialized(true);

      // rememberMe + refreshToken are handled via setAuthCookies above

      // Load user profile and active memberships in store
      await loadUserAndMemberships();

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
