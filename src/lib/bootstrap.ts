import { useAuthStore } from '@/stores/authStore';
import { getUserIdFromToken } from '@/lib/utils';
import { fetchUserProfile } from '@/services/user-profile';
import { fetchMyActiveMemberships } from '@/services/membership';

export async function loadUserAndMemberships() {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      return;
    }

    const [profileResponse, memberships] = await Promise.all([
      fetchUserProfile(userId),
      fetchMyActiveMemberships().catch(() => []),
    ]);

    if (profileResponse.success && profileResponse.data) {
      useAuthStore.getState().setUser(profileResponse.data);
    }
    useAuthStore.getState().setActiveMemberships?.(memberships ?? []);
  } catch (err) {
    // Non-fatal: auth session may still be valid without profile/memberships
    // Keep store consistent if partial data was loaded
    console.warn('[bootstrap] Failed to load user/memberships:', err);
  }
}
