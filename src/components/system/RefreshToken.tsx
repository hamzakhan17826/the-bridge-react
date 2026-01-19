import { useEffect } from 'react';
import { refreshToken } from '../../lib/refresh';
import {
  getAuthFlag,
  logout,
  getCookie,
  isRememberMeEnabled,
} from '../../lib/auth';
import { isJwtExpired } from '../../lib/utils';

export default function RefreshToken() {
  useEffect(() => {
    let canceled = false;

    // expiry check provided by shared utils

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
    const shouldRefresh = isLoggedIn && isRememberMeEnabled();

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
        const stillRemember = isRememberMeEnabled();
        console.log(
          '⏰ [RefreshToken] Interval check - still logged in:',
          still,
          'remember me:',
          stillRemember
        );
        if (!still) {
          console.log('⏸️ [RefreshToken] User logged out; stopping refresh');
          clearInterval(interval);
        } else if (stillRemember) {
          runRefresh();
        } else {
          console.log(
            '⏭️ [RefreshToken] Remember me disabled; skipping refresh but keeping interval'
          );
        }
      },
      2 * 60 * 1000
    );

    return () => {
      // console.log('🧹 [RefreshToken] Cleanup');
      canceled = true;
      clearInterval(interval);
    };
  }, []);

  return null;
}
