import { getCookie, setCookie } from './auth';

export async function refreshToken(): Promise<boolean> {
  console.log('🔄 [REFRESH] Attempting token refresh...');
  try {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const url = `${apiBase}/Account/RefreshToken`;
    const rt = getCookie('refreshToken');

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: JSON.stringify(rt ? { refreshToken: rt } : {}),
    });

    console.log('📡 [REFRESH] Response status:', res.status);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('❌ [RefreshToken] Refresh failed:', text);
      return false;
    }

    const data = await res.json().catch(() => ({}));
    // console.log('✅ [RefreshToken] Token refreshed successfully:', {
    //   hasJwtToken: !!data.jwtToken,
    //   hasRefreshToken: !!data.refreshToken,
    //   roles: data.roles,
    // });

    if (data.jwtToken) {
      // Check remember me flag to maintain persistence
      const rememberMeFlag = getCookie('rememberMe');
      const isPersistent = rememberMeFlag === '1';
      console.log(
        '🔄 [REFRESH] Refreshing tokens, rememberMe flag:',
        rememberMeFlag,
        'isPersistent:',
        isPersistent
      );

      setCookie('auth', '1', {
        path: '/',
        sameSite: 'lax',
        ...(isPersistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      });
      console.log(
        '🍪 [REFRESH] Setting auth cookie, persistent:',
        isPersistent
      );

      // Mirror jwt token into a non-httpOnly cookie for client-side checks
      setCookie('jwtToken', data.jwtToken, {
        path: '/',
        sameSite: 'lax',
        ...(isPersistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      });
      console.log(
        '🍪 [REFRESH] Setting jwtToken cookie, persistent:',
        isPersistent
      );
    }
    if (data.roles) {
      const rememberMeFlag = getCookie('rememberMe');
      const isPersistent = rememberMeFlag === '1';

      try {
        setCookie('userRole', JSON.stringify(data.roles), {
          path: '/',
          sameSite: 'lax',
          ...(isPersistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
        });
        console.log(
          '🍪 [REFRESH] Setting userRole cookie, persistent:',
          isPersistent
        );
      } catch (err) {
        void err; // noop
      }
    }
    if (data.refreshToken) {
      const rememberMeFlag = getCookie('rememberMe');
      const isPersistent = rememberMeFlag === '1';
      console.log(
        '🔄 [REFRESH] Setting new refreshToken, rememberMe flag:',
        rememberMeFlag,
        'isPersistent:',
        isPersistent
      );

      // Not httpOnly here; backend should set httpOnly cookie, but we mirror for client checks
      setCookie('refreshToken', data.refreshToken, {
        path: '/',
        sameSite: 'lax',
        ...(isPersistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
      });
      console.log(
        '🍪 [REFRESH] Setting refreshToken cookie, persistent:',
        isPersistent
      );
    }

    return true;
  } catch (error) {
    console.error('❌ [RefreshToken] Network/Unexpected error:', error);
    return false;
  }
}
