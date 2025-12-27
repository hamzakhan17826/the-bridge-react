import { getCookie, setCookie, setToken, logout } from './auth';

export async function refreshToken(): Promise<boolean> {
  console.log('🔄 [RefreshToken] Attempting token refresh...');
  try {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const url = `${apiBase}/Account/RefreshToken`;
    const rt = getCookie('refreshToken');

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(rt ? { refreshToken: rt } : {}),
    });

    console.log('📡 [RefreshToken] Response status:', res.status);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('❌ [RefreshToken] Refresh failed:', text);
      logout();
      return false;
    }

    const data = await res.json().catch(() => ({}));
    console.log('✅ [RefreshToken] Token refreshed successfully:', {
      hasJwtToken: !!data.jwtToken,
      hasRefreshToken: !!data.refreshToken,
      roles: data.roles,
    });

    if (data.jwtToken) {
      setToken(data.jwtToken);
      setCookie('auth', '1', { path: '/', sameSite: 'lax' });
    }
    if (data.roles) {
      try {
        setCookie('userRole', JSON.stringify(data.roles), {
          path: '/',
          sameSite: 'lax',
        });
      } catch (err) {
        void err; // noop
      }
    }
    if (data.refreshToken) {
      // Not httpOnly here; backend should set httpOnly cookie, but we mirror for client checks
      setCookie('refreshToken', data.refreshToken, {
        path: '/',
        sameSite: 'lax',
      });
    }

    return true;
  } catch (error) {
    console.error('❌ [RefreshToken] Network/Unexpected error:', error);
    logout();
    return false;
  }
}
