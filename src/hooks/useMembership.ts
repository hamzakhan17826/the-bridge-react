import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSubscriptionTiers,
  placeMembershipOrder,
  paypalWebhook,
  getOrderStatus,
  fetchMyOrdersHistory,
  fetchAllOrdersHistory,
  fetchMyActiveMemberships,
  fetchMyTotalAndRemainingCredits,
  fetchUserMemberships,
  fetchUserTotalAndRemainingCredits,
  consumeFeature,
  type UserTotalAndRemainingCreditsResponse,
} from '../services/membership';
import {
  type SubscriptionTier,
  type PlaceMembershipOrderPayload,
  type OrderStatusResponse,
  type MyOrderHistoryItem,
  type AllOrdersFilters,
  type AllOrdersResponse,
  type ActiveMembership,
  type UserMembershipsFilters,
  type UserMembershipsResponse,
} from '../types/membership';

export const useSubscriptionTiers = () => {
  return useQuery<SubscriptionTier[]>({
    queryKey: ['membership', 'subscriptionTiers'],
    queryFn: fetchSubscriptionTiers,
    staleTime: 5 * 60 * 1000, // 5 minutes - pricing might change occasionally
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  });
};

export const usePlaceMembershipOrder = () => {
  return useMutation({
    mutationFn: (payload: PlaceMembershipOrderPayload) =>
      placeMembershipOrder(payload),
    onSuccess: (data) => {
      console.log('Payment order placed successfully:', data);
    },
    onError: (error) => {
      console.error('Payment order failed:', error);
    },
  });
};

export const usePaypalWebhook = () => {
  return useMutation({
    mutationFn: (token: string) => paypalWebhook(token),
    onSuccess: (data) => {
      console.log('PayPal webhook completed:', data);
    },
    onError: (error) => {
      console.error('PayPal webhook failed:', error);
    },
  });
};

export const useOrderStatus = () => {
  return useMutation({
    mutationFn: (pubTrackId: string) => getOrderStatus(pubTrackId),
    onSuccess: (data: OrderStatusResponse) => {
      console.log('Order status retrieved:', data);
    },
    onError: (error) => {
      console.error('Order status retrieval failed:', error);
    },
  });
};

export const useMyOrdersHistory = () => {
  return useQuery<MyOrderHistoryItem[]>({
    queryKey: ['membership', 'myOrdersHistory'],
    queryFn: fetchMyOrdersHistory,
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useAllOrdersHistory = (
  pageNumber: number,
  pageSize: number,
  filters: Partial<AllOrdersFilters>
) => {
  const payload: AllOrdersFilters = {
    pageNumber,
    pageSize,
    ...filters,
  };
  return useQuery<AllOrdersResponse>({
    queryKey: ['membership', 'allOrdersHistory', payload],
    queryFn: () => fetchAllOrdersHistory(payload),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: true,
  });
};

export const useMyActiveMemberships = () => {
  return useQuery<ActiveMembership[]>({
    queryKey: ['membership', 'myActiveMemberships'],
    queryFn: fetchMyActiveMemberships,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useMyTotalAndRemainingCredits = () => {
  return useQuery<{ key: number; value: number }>({
    queryKey: ['membership', 'myTotalAndRemainingCredits'],
    queryFn: fetchMyTotalAndRemainingCredits,
    staleTime: 1000 * 60,
  });
};

export const useUserMemberships = (
  pageNumber: number,
  pageSize: number,
  filters: Partial<UserMembershipsFilters>
) => {
  const payload: UserMembershipsFilters = {
    pageNumber,
    pageSize,
    ...filters,
  };
  return useQuery<UserMembershipsResponse>({
    queryKey: ['membership', 'userMemberships', payload],
    queryFn: () => fetchUserMemberships(payload),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: true,
  });
};

export const useUserCredits = (userId?: string) => {
  return useQuery<UserTotalAndRemainingCreditsResponse>({
    queryKey: ['membership', 'userTotalAndRemainingCredits', userId],
    queryFn: () => fetchUserTotalAndRemainingCredits(userId ?? ''),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!userId,
  });
};

export const useConsumeFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (featureCode: string) => consumeFeature(featureCode),
    onSuccess: (data) => {
      console.log('Feature credits consumed:', data);
      // Invalidate credits to reflect change in UI
      queryClient.invalidateQueries({
        queryKey: ['membership', 'myTotalAndRemainingCredits'],
      });
      queryClient.invalidateQueries({
        queryKey: ['membership', 'userTotalAndRemainingCredits'],
      });
    },
    onError: (error: Error) => {
      console.error('Consumption failed:', error.message);
    },
  });
};
