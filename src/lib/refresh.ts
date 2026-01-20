import { isRememberMeEnabled, getCookie, setAuthCookies } from './auth';
import api from './api';

export async function refreshToken(): Promise<boolean> {
  // console.log('🔄 [REFRESH] Attempting token refresh...');

  try {
    const rt = getCookie('refreshToken');
    // console.log('🔍 [REFRESH] Current refresh token exists:', !!rt);

    const payload = rt ? { refreshToken: rt } : {};
    // console.log('📤 [REFRESH] Sending payload:', payload);

    const res = await api.post('/Account/RefreshToken', payload);
    const data = res.data ?? {};

    // console.log('✅ [REFRESH] API Response received:', {
    //   status: res.status,
    //   hasJwtToken: !!data.jwtToken,
    //   hasRefreshToken: !!data.refreshToken,
    //   roles: data.roles,
    //   fullResponse: data,
    // });

    const isPersistent = isRememberMeEnabled();
    // console.log('💾 [REFRESH] Setting cookies with persistence:', isPersistent);

    setAuthCookies({
      jwtToken: data.jwtToken,
      refreshToken: data.refreshToken,
      roles: Array.isArray(data.roles) ? (data.roles as string[]) : undefined,
      persistent: isPersistent,
    });

    // console.log('🎉 [REFRESH] Cookies set successfully');
    return true;
  } catch (error: unknown) {
    // Axios throws for non-2xx; log safely without using any
    const err = error as { response?: { data?: unknown; status?: number } };
    console.error('❌ [REFRESH] Refresh failed:', {
      status: err.response?.status,
      data: err.response?.data,
      error: error,
    });
    return false;
  }
}
