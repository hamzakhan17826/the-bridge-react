import { useEffect } from 'react';
import { refreshToken } from '../../lib/refresh';
import { logout, getCookie, isRememberMeEnabled } from '../../lib/auth';
import { isJwtExpired } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';
import { useAuthUser } from '../../hooks/useAuthUser';

export default function RefreshToken() {
  const { isInitialized } = useAuthUser();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    let canceled = false;

    const runRefresh = async () => {
      if (canceled) return;

      const ok = await refreshToken();

      if (!ok && !canceled) {
        const jwt = getCookie('jwtToken');
        const expired = isJwtExpired(jwt);

        if (!jwt || expired) {
          logout();
        } else {
          console.log(
            '⏭️ [RefreshToken] Keeping session despite refresh failure'
          );
        }
      }
    };

    const hasRefresh = !!getCookie('refreshToken');
    const shouldRefresh =
      isInitialized && isLoggedIn && (isRememberMeEnabled() || hasRefresh);

    if (shouldRefresh) {
      runRefresh();
    }

    const interval = setInterval(
      () => {
        const still = useAuthStore.getState().isLoggedIn;
        const stillRemember = isRememberMeEnabled();
        const stillHasRefresh = !!getCookie('refreshToken');
        if (!still) {
          clearInterval(interval);
        } else if (stillRemember || stillHasRefresh) {
          runRefresh();
        }
      },
      2 * 60 * 1000
    );

    return () => {
      canceled = true;
      clearInterval(interval);
    };
  }, [isInitialized, isLoggedIn]);

  return null;
}
