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
      activeMemberships: [],
      setUser: (user) => set({ user }),
      setRoles: (roles) => set({ roles }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
      setInitialized: (initialized) => set({ isInitialized: initialized }),
      setActiveMemberships: (memberships) =>
        set({ activeMemberships: memberships }),
      login: (user, roles) =>
        set({ user, roles, isLoggedIn: true, isInitialized: true }),
      logout: () =>
        set({
          user: null,
          roles: [],
          activeMemberships: [],
          isLoggedIn: false,
          isInitialized: true,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
