import { useAuthStore } from '../stores/authStore';
import type { ActiveMembership } from '@/types/membership';

export function useAuthUser() {
  const {
    user,
    roles,
    isLoggedIn,
    isInitialized,
    activeMemberships = [],
    setUser,
    setRoles,
  } = useAuthStore();

  const normalizedRoles = roles.map((r) => r.toLowerCase());
  const isAdmin = normalizedRoles.includes('admin');
  const hasRole = (role: string) =>
    normalizedRoles.includes(role.toLowerCase());

  const hasMembershipTier = (tierCode: string) =>
    (activeMemberships as ActiveMembership[]).some((m) => {
      return m.tierCode?.toLowerCase() === tierCode.toLowerCase();
    });

  const hasFeature = (featureCode: string) =>
    (activeMemberships as ActiveMembership[]).some((m) =>
      m.features?.some(
        (f) => f.code?.toLowerCase() === featureCode.toLowerCase()
      )
    );

  return {
    user,
    roles,
    isLoggedIn,
    isInitialized,
    isAdmin,
    hasRole,
    activeMemberships,
    hasMembershipTier,
    hasFeature,
    setUser,
    setRoles,
  };
}
