import { useEffect } from 'react';
import { refreshToken } from '../../lib/refresh';
import { getAuthFlag, logout } from '../../lib/auth';

export default function RefreshToken() {
  useEffect(() => {
    let canceled = false;

    const runRefresh = async () => {
      if (canceled) return;
      const ok = await refreshToken();
      console.log('🔄 [RefreshToken] Refresh attempt result:', ok);
      if (!ok && !canceled) {
        console.log('🚪 [RefreshToken] Refresh failed; logging out user');
        logout();
      }
    };

    const isLoggedIn = getAuthFlag();
    console.log('🟢 isLoggedIn: ', isLoggedIn);
    if (isLoggedIn) {
      runRefresh();
    } else {
      console.log('🔴 [RefreshToken] Not logged in; skipping initial refresh');
    }

    const interval = setInterval(
      () => {
        const still = getAuthFlag();
        if (still) {
          runRefresh();
        } else {
          console.log('⏸️ [RefreshToken] User logged out; stopping refresh');
          clearInterval(interval);
        }
      },
      4 * 60 * 1000
    );

    return () => {
      console.log('🧹 [RefreshToken] Cleanup');
      canceled = true;
      clearInterval(interval);
    };
  }, []);

  return null;
}
