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

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      // console.log('🚀 [AUTH_INIT] Initializing auth state on app start...');

      // Detect if this is a fresh browser session (no tab/session state yet)
      const hasSessionMarker =
        typeof window !== 'undefined' &&
        typeof window.sessionStorage !== 'undefined' &&
        window.sessionStorage.getItem('sessionStarted') === '1';

      const jwtToken = getCookie('jwtToken');

      // console.log('🍪 [AUTH_INIT] Cookies found:', {
      //   hasJwtToken: !!jwtToken,
      //   hasUserRole: !!userRoleCookie,
      //   hasRefreshToken: !!refreshToken,
      // });

      // If remember me is disabled: on a fresh browser session, force logout/cleanup
      // Within the same session (reloads), allow continuing only if JWT is valid
      if (!isRememberMeEnabled()) {
        if (!hasSessionMarker) {
          clearAuthCookies();
          useAuthStore.getState().logout();
          // Mark session so subsequent reloads within the same session can continue
          try {
            window.sessionStorage.setItem('sessionStarted', '1');
          } catch (e) {
            void e; // noop
          }
          return;
        }
        if (jwtToken && !isJwtExpired(jwtToken)) {
          const roles = getUserRoles() ?? [];
          useAuthStore.getState().setRoles(roles);
          useAuthStore.getState().setLoggedIn(true);
          return;
        }
        // No valid token within the same session
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

    // Ensure session marker is set for the current session
    try {
      window.sessionStorage.setItem('sessionStarted', '1');
    } catch (e) {
      void e; // noop
    }
  }, []);

  return null; // This component doesn't render anything
}
