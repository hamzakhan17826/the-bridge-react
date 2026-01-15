import { isRememberMeEnabled, getCookie, setAuthCookies } from './auth';
import api from './api';

export async function refreshToken(): Promise<boolean> {
  // console.log('🔄 [REFRESH] Attempting token refresh...');
  try {
    const rt = getCookie('refreshToken');
    const payload = rt ? { refreshToken: rt } : {};
    const res = await api.post('/Account/RefreshToken', payload);
    const data = res.data ?? {};
    // console.log('✅ [RefreshToken] Token refreshed successfully:', {
    //   hasJwtToken: !!data.jwtToken,
    //   hasRefreshToken: !!data.refreshToken,
    //   roles: data.roles,
    // });

    const isPersistent = isRememberMeEnabled();
    setAuthCookies({
      jwtToken: data.jwtToken,
      refreshToken: data.refreshToken,
      roles: Array.isArray(data.roles) ? (data.roles as string[]) : undefined,
      persistent: isPersistent,
    });

    return true;
  } catch (error: unknown) {
    // Axios throws for non-2xx; log safely without using any
    const err = error as { response?: { data?: unknown } };
    console.error(
      '❌ [RefreshToken] Refresh failed:',
      err.response?.data ?? error
    );
    return false;
  }
}
