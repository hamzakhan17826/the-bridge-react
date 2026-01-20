import { useEffect } from 'react';
import {
  getCookie,
  getUserRoles,
  isRememberMeEnabled,
  clearAuthCookies,
} from '../../lib/auth';
import { useAuthStore } from '../../stores/authStore';
import { getUserIdFromToken, isJwtExpired } from '../../lib/utils';
import { fetchUserProfile } from '../../services/user-profile';
import { refreshToken } from '../../lib/refresh';

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      // Ensure session marker is set immediately for the current tab/session
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('sessionStarted', '1');
        }
      } catch (e) {
        void e; // noop
      }

      const jwtToken = getCookie('jwtToken');
      const refreshCookie = getCookie('refreshToken');

      // When remember-me is disabled, keep the session alive within this tab if possible.
      // 1) If JWT is valid, mark logged-in.
      // 2) If JWT is expired but a refresh token exists, attempt one refresh.
      // 3) If refresh fails (or no refresh token), clear cookies and logout.
      if (!isRememberMeEnabled()) {
        if (jwtToken && !isJwtExpired(jwtToken)) {
          const roles = getUserRoles() ?? [];
          useAuthStore.getState().setRoles(roles);
          useAuthStore.getState().setLoggedIn(true);
          return;
        }

        if (refreshCookie) {
          try {
            const ok = await refreshToken();
            if (ok) {
              const roles = getUserRoles() ?? [];
              useAuthStore.getState().setRoles(roles);
              useAuthStore.getState().setLoggedIn(true);
              return;
            }
          } catch (err) {
            // fall through to cleanup
            void err;
          }
        }

        // No valid/refreshable token: cleanup
        clearAuthCookies();
        useAuthStore.getState().logout();
        return;
      }

      // Only try to authenticate if remember me was enabled
      const shouldAuthenticate = !!jwtToken && isRememberMeEnabled();

      // If we have a JWT token, try to load user data
      if (shouldAuthenticate) {
        // console.log(
        //   '🔐 [AUTH_INIT] Remember me enabled, JWT token found, loading user profile...'
        // );
        try {
          const userId = getUserIdFromToken();
          if (userId) {
            // Fetch user profile
            const profileResponse = await fetchUserProfile(userId);
            if (profileResponse.success && profileResponse.data) {
              // Parse roles via helper
              const roles = getUserRoles() ?? [];

              // Set user data in store
              useAuthStore.getState().login(profileResponse.data, roles);
              // console.log(
              //   '✅ [AUTH_INIT] User authenticated successfully:',
              //   profileResponse.data.firstName,
              //   'roles:',
              //   roles
              // );
            } else {
              console.log('❌ [AUTH_INIT] Failed to fetch user profile');
            }
          } else {
            console.log('❌ [AUTH_INIT] Could not extract user ID from token');
          }
        } catch (error) {
          console.warn('Failed to initialize user data:', error);
          console.log('❌ [AUTH_INIT] Auth initialization failed');
          // Clear invalid auth state
          // Don't clear cookies here as they might still be valid
        }
      } else {
        console.log(
          '🔓 [AUTH_INIT] Remember me disabled or no JWT token, user not authenticated'
        );
      }
    };

    initializeAuth();

    // Session marker already set above
  }, []);

  return null; // This component doesn't render anything
}
