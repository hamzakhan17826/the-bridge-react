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

      // console.log('🚀 [RefreshToken] Starting refresh attempt...');
      const ok = await refreshToken();
      // console.log('📊 [RefreshToken] Refresh result:', ok);

      if (!ok && !canceled) {
        const jwt = getCookie('jwtToken');
        const expired = isJwtExpired(jwt);

        console.log('🔍 [RefreshToken] After failed refresh:', {
          hasJwt: !!jwt,
          isExpired: expired,
          willLogout: !jwt || expired,
        });

        if (!jwt || expired) {
          console.log(
            '🚪 [RefreshToken] Logging out due to missing/expired JWT'
          );
          logout();
        } else {
          console.log(
            '⏭️ [RefreshToken] Keeping session despite refresh failure'
          );
        }
      } else if (ok) {
        // console.log('✅ [RefreshToken] Refresh successful, session extended');
      }
    };

    const isLoggedIn = getAuthFlag();
    const hasRefresh = !!getCookie('refreshToken');
    const shouldRefresh = isLoggedIn && (isRememberMeEnabled() || hasRefresh);

    // console.log('🏁 [RefreshToken] Component initialized:', {
    //   isLoggedIn,
    //   shouldRefresh,
    //   rememberMeEnabled: isRememberMeEnabled(),
    // });

    // console.log('🟢 isLoggedIn: ', isLoggedIn);
    if (shouldRefresh) {
      // console.log('🚀 [RefreshToken] Starting initial refresh...');
      runRefresh();
    } else {
      // console.log(
      //   '⏸️ [RefreshToken] Skipping initial refresh - not logged in or remember me disabled'
      // );
    }

    const interval = setInterval(
      () => {
        const still = getAuthFlag();
        const stillRemember = isRememberMeEnabled();
        const stillHasRefresh = !!getCookie('refreshToken');
        console.log(
          '⏰ [RefreshToken] Interval check - still logged in:',
          still,
          'remember me:',
          stillRemember,
          'has refresh token:',
          stillHasRefresh
        );
        if (!still) {
          console.log('⏸️ [RefreshToken] User logged out; stopping refresh');
          clearInterval(interval);
        } else if (stillRemember || stillHasRefresh) {
          runRefresh();
        } else {
          console.log(
            '⏭️ [RefreshToken] No remember-me and no refresh token; skipping refresh'
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
