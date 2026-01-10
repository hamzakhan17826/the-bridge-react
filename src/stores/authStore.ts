import { create } from 'zustand';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  roles: [],
  isLoggedIn: false,
  login: (user, roles) => set({ user, roles, isLoggedIn: true }),
  logout: () => set({ user: null, roles: [], isLoggedIn: false }),
  setUser: (user) => set({ user }),
  setRoles: (roles) => set({ roles }),
}));
