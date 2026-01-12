import { useEffect } from 'react';
import { refreshToken } from '../../lib/refresh';
import { getAuthFlag, logout, getCookie } from '../../lib/auth';

export default function RefreshToken() {
  useEffect(() => {
    let canceled = false;

    const isJwtExpired = (
      token: string | undefined,
      skewMs = 5000
    ): boolean => {
      if (!token) return true;
      try {
        const parts = token.split('.');
        if (parts.length < 2) return true;
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(json) as { exp?: number };
        const expMs = (payload.exp ?? 0) * 1000;
        return Date.now() >= expMs - skewMs;
      } catch {
        return true;
      }
    };

    const runRefresh = async () => {
      if (canceled) return;
      const ok = await refreshToken();
      // console.log('🔄 [RefreshToken] Refresh attempt result:', ok);
      if (!ok && !canceled) {
        const jwt = getCookie('jwtToken');
        const expired = isJwtExpired(jwt);
        if (!jwt || expired) {
          // console.log('🚪 [RefreshToken] JWT missing/expired; logging out');
          logout();
        } else {
          console.log(
            '⏭️ [RefreshToken] Refresh failed but JWT is valid; keeping session'
          );
        }
      }
    };

    const isLoggedIn = getAuthFlag();
    const rememberMeFlag = getCookie('rememberMe');
    const shouldRefresh = isLoggedIn && rememberMeFlag === '1';

    // console.log('🟢 isLoggedIn: ', isLoggedIn);
    if (shouldRefresh) {
      // console.log(
      //   '🔄 [RefreshToken] Remember me enabled; attempting initial refresh'
      // );
      runRefresh();
    } else {
      console.log(
        '🔴 [RefreshToken] Not logged in or remember me disabled; skipping initial refresh'
      );
    }

    const interval = setInterval(
      () => {
        const still = getAuthFlag();
        const stillRemember = getCookie('rememberMe') === '1';
        if (still && stillRemember) {
          runRefresh();
        } else {
          console.log(
            '⏸️ [RefreshToken] User logged out or remember me disabled; stopping refresh'
          );
          clearInterval(interval);
        }
      },
      4 * 60 * 1000
    );

    return () => {
      // console.log('🧹 [RefreshToken] Cleanup');
      canceled = true;
      clearInterval(interval);
    };
  }, []);

  return null;
}
