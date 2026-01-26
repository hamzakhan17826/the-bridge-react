import type { CookieOptions } from '../types/auth';

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

// Helper to check remember-me flag
export function isRememberMeEnabled(): boolean {
  return getCookie('rememberMe') === '1';
}

// Clear auth-related cookies without redirect
export function clearAuthCookies() {
  deleteCookie('auth');
  deleteCookie('jwtToken');
  deleteCookie('userRole');
  deleteCookie('refreshToken');
  deleteCookie('rememberMe');
  deleteCookie('sidebar_state');
}

// Set auth-related cookies in a consistent way
export function setAuthCookies(params: {
  jwtToken?: string;
  refreshToken?: string;
  roles?: string[];
  persistent: boolean;
}) {
  const { jwtToken, refreshToken, roles, persistent } = params;

  // console.log('🍪 [AUTH] Setting auth cookies:', {
  //   hasJwtToken: !!jwtToken,
  //   hasRefreshToken: !!refreshToken,
  //   rolesCount: roles?.length,
  //   persistent,
  // });

  if (jwtToken) {
    // console.log('🔑 [AUTH] Setting JWT token cookie');
    setCookie('auth', '1', {
      path: '/',
      sameSite: 'lax',
      ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
    setCookie('jwtToken', jwtToken, {
      path: '/',
      sameSite: 'lax',
      ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
  } else {
    console.warn('⚠️ [AUTH] No JWT token provided to setAuthCookies');
  }

  if (Array.isArray(roles)) {
    try {
      // console.log('👤 [AUTH] Setting user roles cookie:', roles);
      setCookie('userRole', JSON.stringify(roles), {
        path: '/',
        sameSite: 'lax',
        ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      });
    } catch (error) {
      console.error('❌ [AUTH] Failed to set roles cookie:', error);
    }
  }

  if (refreshToken) {
    // console.log('🔄 [AUTH] Setting refresh token cookie');
    setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: 'lax',
      ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
    });
  } else {
    console.warn('⚠️ [AUTH] No refresh token provided to setAuthCookies');
  }

  // console.log('✅ [AUTH] Auth cookies set successfully');
}

// Convenience wrapper to clear cookies and logout via existing flow
export function clearAuthCookiesAndLogout() {
  logout();
}

export function getUserRoles(): string[] | null {
  const cookieValue = getCookie('userRole');
  if (!cookieValue) return null;
  try {
    const roles: string[] = JSON.parse(cookieValue);
    return roles.map((r) => r.toLowerCase());
  } catch (err) {
    console.error('Failed to parse user roles from cookie:', err);
    return null;
  }
}

export function getAuthFlag(): boolean {
  // Prefer explicit auth cookie; fallback to jwtToken cookie presence
  return !!getCookie('auth') || !!getCookie('jwtToken');
}

export function emitAuthChange() {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('authchange'));
    }
  } catch {
    // noop
  }
}

export function logout() {
  deleteCookie('jwtToken');
  deleteCookie('refreshToken');
  deleteCookie('userRole');
  deleteCookie('auth');
  deleteCookie('rememberMe');
  deleteCookie('sidebar_state');
  // Also clear session marker so next load is treated as fresh session
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem('sessionStarted');
    }
  } catch (e) {
    void e; // noop
  }
  // Clear Zustand store
  import('../stores/authStore').then(({ useAuthStore }) => {
    useAuthStore.getState().logout();
  });
  emitAuthChange();
  setTimeout(() => {
    try {
      // Redirect to login
      window.location.href = '/login';
    } catch (err) {
      void err; // noop
    }
  }, 100);
}
