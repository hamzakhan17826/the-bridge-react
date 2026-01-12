import { useEffect } from 'react';
import { getCookie, deleteCookie } from '../../lib/auth';
import { useAuthStore } from '../../stores/authStore';
import { getUserIdFromToken } from '../../lib/utils';
import { fetchUserProfile } from '../../services/user-profile';

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      // console.log('🚀 [AUTH_INIT] Initializing auth state on app start...');

      const jwtToken = getCookie('jwtToken');
      const userRoleCookie = getCookie('userRole');
      const rememberMeFlag = getCookie('rememberMe');
      const refreshToken = getCookie('refreshToken');

      // console.log('🍪 [AUTH_INIT] Cookies found:', {
      //   hasJwtToken: !!jwtToken,
      //   hasUserRole: !!userRoleCookie,
      //   rememberMeFlag: rememberMeFlag,
      //   hasRefreshToken: !!refreshToken,
      // });

      // If remember me is not enabled AND no cookies exist (fresh app start), clear any stale cookies
      // But if rememberMe is '0' and cookies exist, it means user just logged in with rememberMe=false
      // In that case, allow the session to continue for this browser session
      const hasAnyAuthCookies = jwtToken || userRoleCookie || refreshToken;

      if (rememberMeFlag !== '1' && !hasAnyAuthCookies) {
        // console.log(
        //   '🧹 [AUTH_INIT] No remember me and no auth cookies - clearing any stale cookies'
        // );
        deleteCookie('auth');
        deleteCookie('jwtToken');
        deleteCookie('userRole');
        deleteCookie('refreshToken');
        deleteCookie('rememberMe');

        // Clear auth store
        useAuthStore.getState().logout();
        // console.log('🔓 [AUTH_INIT] Auth state cleared for fresh app start');
        return;
      }

      // If remember me is disabled but cookies exist, load roles but don't authenticate fully
      if (rememberMeFlag !== '1' && hasAnyAuthCookies) {
        // console.log(
        //   '🔓 [AUTH_INIT] Remember me disabled but cookies exist - loading roles for current session'
        // );

        // Parse roles from cookie and set in store
        let roles: string[] = [];
        if (userRoleCookie) {
          try {
            const parsed = JSON.parse(userRoleCookie);
            roles = Array.isArray(parsed) ? parsed : [userRoleCookie];
          } catch {
            roles = [userRoleCookie];
          }
        }

        // Set roles in store and mark as logged in for current session
        useAuthStore.getState().setRoles(roles);
        useAuthStore.getState().setLoggedIn(true);
        // console.log(
        //   '✅ [AUTH_INIT] Roles loaded and user marked as logged in for current session:',
        //   roles
        // );
        return;
      }

      // Only try to authenticate if remember me was enabled
      const shouldAuthenticate = jwtToken && rememberMeFlag === '1';

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
              // Parse roles from cookie
              let roles: string[] = [];
              if (userRoleCookie) {
                try {
                  const parsed = JSON.parse(userRoleCookie);
                  roles = Array.isArray(parsed) ? parsed : [userRoleCookie];
                } catch {
                  roles = [userRoleCookie];
                }
              }

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
  }, []);

  return null; // This component doesn't render anything
}
