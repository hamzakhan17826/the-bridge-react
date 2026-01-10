import { useEffect } from 'react';
import { getCookie, deleteCookie } from '../../lib/auth';
import { useAuthStore } from '../../stores/authStore';
import { getUserIdFromToken } from '../../lib/utils';
import { fetchUserProfile } from '../../services/user-profile';

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🚀 [AUTH_INIT] Initializing auth state on app start...');

      const jwtToken = getCookie('jwtToken');
      const userRoleCookie = getCookie('userRole');
      const rememberMeFlag = getCookie('rememberMe');
      const refreshToken = getCookie('refreshToken');

      console.log('🍪 [AUTH_INIT] Cookies found:', {
        hasJwtToken: !!jwtToken,
        hasUserRole: !!userRoleCookie,
        rememberMeFlag: rememberMeFlag,
        hasRefreshToken: !!refreshToken,
      });

      // If remember me is not enabled, clear any existing auth cookies
      if (rememberMeFlag !== '1') {
        console.log(
          '🧹 [AUTH_INIT] Remember me disabled, clearing any existing auth cookies'
        );
        deleteCookie('auth');
        deleteCookie('jwtToken');
        deleteCookie('userRole');
        deleteCookie('refreshToken');
        deleteCookie('rememberMe');

        // Clear auth store
        useAuthStore.getState().logout();
        console.log(
          '🔓 [AUTH_INIT] Auth state cleared for non-remember-me session'
        );
        return;
      }

      // Only try to authenticate if remember me was enabled
      const shouldAuthenticate = jwtToken && rememberMeFlag === '1';

      // If we have a JWT token, try to load user data
      if (shouldAuthenticate) {
        console.log(
          '🔐 [AUTH_INIT] Remember me enabled, JWT token found, loading user profile...'
        );
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
              console.log(
                '✅ [AUTH_INIT] User authenticated successfully:',
                profileResponse.data.firstName,
                'roles:',
                roles
              );
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
