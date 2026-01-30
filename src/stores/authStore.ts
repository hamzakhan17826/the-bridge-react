import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      roles: [],
      isLoggedIn: false,
      isInitialized: false,
      setUser: (user) => set({ user }),
      setRoles: (roles) => set({ roles }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setInitialized: (initialized) => set({ isInitialized: initialized }),
      login: (user, roles) =>
        set({ user, roles, isLoggedIn: true, isInitialized: true }),
      logout: () =>
        set({ user: null, roles: [], isLoggedIn: false, isInitialized: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
