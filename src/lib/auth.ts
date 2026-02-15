import type { CookieOptions } from '../types/auth';
import { useAuthStore } from '../stores/authStore';
import { queryClient } from './queryClient';
import { navigateTo } from './router';

export function clearAuthCookies() {
  deleteCookie('jwtToken');
  deleteCookie('refreshToken');
  deleteCookie('rememberMe');
  deleteCookie('sidebar_state');
}

export function getCookie(name: string) {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    if (cookie) {
      try {
        return decodeURIComponent(cookie.trim());
      } catch {
        return cookie.trim();
      }
    }
  }
  return undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  if (typeof document === 'undefined') return;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `path=${options.path ?? '/'}`,
    options.maxAge ? `max-age=${options.maxAge}` : '',
    options.expires ? `expires=${options.expires.toUTCString()}` : '',
    `sameSite=${options.sameSite ?? 'lax'}`,
    options.secure ? 'secure' : '',
  ].filter(Boolean);
  document.cookie = parts.join('; ');
}

export function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function isRememberMeEnabled(): boolean {
  return getCookie('rememberMe') === '1';
}

export function setAuthCookies(params: {
  jwtToken?: string;
  refreshToken?: string;
  persistent: boolean;
}) {
  const { jwtToken, refreshToken, persistent } = params;

  // Keep remember-me flag consistent with persistence.
  // We always set it so the rest of the app can reliably read it.
  setCookie('rememberMe', persistent ? '1' : '0', {
    path: '/',
    sameSite: 'lax',
    ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  });

  if (jwtToken) {
    setCookie('jwtToken', jwtToken, {
      path: '/',
      sameSite: 'lax',
      ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
  } else {
    console.warn('⚠️ [AUTH] No JWT token provided to setAuthCookies');
  }

  if (refreshToken) {
    setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: 'lax',
      ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
  } else {
    console.warn('⚠️ [AUTH] No refresh token provided to setAuthCookies');
  }
}

export function logout() {
  clearAuthCookies();
  // Also clear session marker so next load is treated as fresh session
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem('sessionStarted');
    }
  } catch (e) {
    void e;
  }
  useAuthStore.getState().logout();
  try {
    queryClient.removeQueries({ queryKey: ['userProfile'] });
    queryClient.removeQueries({ queryKey: ['membership'] });
  } catch (e) {
    void e;
  }
  setTimeout(() => {
    try {
      const navigated = navigateTo('/login', { replace: true });
      if (!navigated && typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (err) {
      void err;
    }
  }, 100);
}
