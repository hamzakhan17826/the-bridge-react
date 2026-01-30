import { isRememberMeEnabled, getCookie, setAuthCookies } from './auth';
import api from './api';
import { useAuthStore } from '../stores/authStore';

export async function refreshToken(): Promise<boolean> {
  try {
    const rt = getCookie('refreshToken');
    const payload = rt ? { refreshToken: rt } : {};
    const res = await api.post('/Account/RefreshToken', payload);
    const data = res.data ?? {};

    const isPersistent = isRememberMeEnabled();

    setAuthCookies({
      jwtToken: data.jwtToken,
      refreshToken: data.refreshToken,
      persistent: isPersistent,
    });

    // Keep Zustand in sync with the latest refresh response
    if (Array.isArray(data.roles)) {
      const roles = (data.roles as string[])
        .map((r) => r.toLowerCase())
        .filter(Boolean);
      useAuthStore.getState().setRoles(roles);
    }
    useAuthStore.getState().setLoggedIn(!!data.jwtToken);
    useAuthStore.getState().setInitialized(true);

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
