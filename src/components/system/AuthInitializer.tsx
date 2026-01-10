import { useEffect } from 'react';
import { getCookie } from '../../lib/auth';
import { useAuthStore } from '../../stores/authStore';
import { getUserIdFromToken } from '../../lib/utils';
import { fetchUserProfile } from '../../services/user-profile';

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      const jwtToken = getCookie('jwtToken');
      const userRoleCookie = getCookie('userRole');

      // If we have a JWT token, try to load user data
      if (jwtToken) {
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
            }
          }
        } catch (error) {
          console.warn('Failed to initialize user data:', error);
          // Clear invalid auth state
          // Don't clear cookies here as they might still be valid
        }
      }
    };

    initializeAuth();
  }, []);

  return null; // This component doesn't render anything
}
