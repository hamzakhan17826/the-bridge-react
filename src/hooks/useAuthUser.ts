import { useAuthStore } from '../stores/authStore';

export function useAuthUser() {
  const { user, roles, isLoggedIn, isInitialized, setUser, setRoles } =
    useAuthStore();

  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const isAdmin = normalizedRoles.includes('admin');
  const hasRole = (role: string) =>
    normalizedRoles.includes(role.toLowerCase());

  return {
    user,
    roles,
    isLoggedIn,
    isInitialized,
    isAdmin,
    hasRole,
    setUser,
    setRoles,
  };
}
