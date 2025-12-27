import axios from 'axios';
import { refreshToken } from './refresh';
import { logout } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001',
  timeout: 10000,
  withCredentials: true,
});

// Request Interceptor (JWT add karo)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Error handle karo)
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshToken().finally(() => {
            isRefreshing = false;
          });
        }
        const ok = await (refreshPromise as Promise<boolean>);
        if (ok) {
          const token = localStorage.getItem('token');
          if (token) {
            originalRequest.headers = {
              ...(originalRequest.headers || {}),
              Authorization: `Bearer ${token}`,
            };
          }
          return api.request(originalRequest);
        }
        logout();
      } catch {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
