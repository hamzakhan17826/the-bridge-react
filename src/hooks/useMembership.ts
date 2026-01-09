import { useQuery } from '@tanstack/react-query';
import { fetchSubscriptionTiers } from '../services/membership';
import {
  membershipQueryKeys,
  type SubscriptionTier,
} from '../types/membership';

export const useSubscriptionTiers = () => {
  return useQuery<SubscriptionTier[]>({
    queryKey: membershipQueryKeys.subscriptionTiers,
    queryFn: fetchSubscriptionTiers,
    staleTime: 5 * 60 * 1000, // 5 minutes - pricing might change occasionally
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  });
};
