import { useAuthStore } from '../stores/authStore';

export function useAuthUser() {
  const { user, roles, isLoggedIn, setUser, setRoles } = useAuthStore();

  const isAdmin = roles.includes('admin');
  const hasRole = (role: string) => roles.includes(role);

  return {
    user,
    roles,
    isLoggedIn,
    isAdmin,
    hasRole,
    setUser,
    setRoles,
  };
}
