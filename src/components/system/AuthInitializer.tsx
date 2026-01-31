import { useEffect } from 'react';
import {
  getCookie,
  isRememberMeEnabled,
  clearAuthCookies,
} from '../../lib/auth';
import { useAuthStore } from '../../stores/authStore';
import { getRolesFromJwtToken, isJwtExpired } from '../../lib/utils';
import { refreshToken } from '../../lib/refresh';
import { loadUserAndMemberships } from '@/lib/bootstrap';

export function AuthInitializer() {
  useEffect(() => {
    const initializeAuth = async () => {
      try {
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
        if (!isRememberMeEnabled()) {
          if (jwtToken && !isJwtExpired(jwtToken)) {
            const existingRoles = useAuthStore.getState().roles;
            const roles = existingRoles.length
              ? existingRoles
              : getRolesFromJwtToken(jwtToken);
            if (roles.length) {
              useAuthStore.getState().setRoles(roles);
            }
            useAuthStore.getState().setLoggedIn(true);
            return;
          }

          if (refreshCookie) {
            try {
              const ok = await refreshToken();
              if (ok) {
                useAuthStore.getState().setLoggedIn(true);
                return;
              }
            } catch (err) {
              void err;
            }
          }

          clearAuthCookies();
          useAuthStore.getState().logout();
          return;
        }

        // Only try to authenticate if remember me was enabled
        let effectiveJwt = jwtToken;

        // If remember-me is enabled but JWT is missing/expired, try one refresh upfront
        if ((!effectiveJwt || isJwtExpired(effectiveJwt)) && refreshCookie) {
          try {
            const ok = await refreshToken();
            if (ok) {
              effectiveJwt = getCookie('jwtToken');
            }
          } catch (err) {
            void err;
          }
        }

        const shouldAuthenticate =
          !!effectiveJwt &&
          isRememberMeEnabled() &&
          !isJwtExpired(effectiveJwt);

        if (shouldAuthenticate) {
          const existingRoles = useAuthStore.getState().roles;
          const roles = existingRoles.length
            ? existingRoles
            : getRolesFromJwtToken(effectiveJwt);
          if (roles.length) {
            useAuthStore.getState().setRoles(roles);
          }
          useAuthStore.getState().setLoggedIn(true);
        }

        // If authenticated, load user and memberships via helper
        if (shouldAuthenticate) {
          await loadUserAndMemberships();
        } else {
          console.log(
            '🔓 [AUTH_INIT] Remember me disabled or no JWT token, user not authenticated'
          );
        }
      } finally {
        // Mark auth as initialized so route guards can safely decide
        useAuthStore.getState().setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  return null; // This component doesn't render anything
}
