import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchSubscriptionTiers,
  placeMembershipOrder,
  placeTopupOrder,
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

export const usePlaceTopupOrder = () => {
  return useMutation({
    mutationFn: (payload: { credits: number; processorId: number }) =>
      placeTopupOrder(payload.credits, payload.processorId),
    onSuccess: (data) => {
      console.log('Top-up order placed successfully:', data);
    },
    onError: (error) => {
      console.error('Top-up order failed:', error);
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pubTrackId: string) => getOrderStatus(pubTrackId),
    onSuccess: (data: OrderStatusResponse) => {
      console.log('Order status retrieved:', data);

      // If the order completed, refresh membership & credits caches so UI updates immediately
      if (data.isPaid && data.paymentStatus === 2) {
        queryClient.invalidateQueries({
          queryKey: ['membership', 'myTotalAndRemainingCredits'],
        });
        queryClient.invalidateQueries({
          queryKey: ['membership', 'myActiveMemberships'],
        });
      }
    },
    onError: (error) => {
      console.error('Order status retrieval failed:', error);
    },
  });
};

// Top-up flow hook: encapsulates placeTopupOrder + polling + invalidation
export const useTopupFlow = () => {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const topupMutation = useMutation({
    mutationFn: (payload: { credits: number; processorId: number }) =>
      placeTopupOrder(payload.credits, payload.processorId),
  });

  async function startTopup(credits: number, processorId: number) {
    setIsProcessing(true);
    try {
      const response = await topupMutation.mutateAsync({
        credits,
        processorId,
      });

      // If provider redirect is returned, open it and poll order status
      if (response.result && response.redirectUrl) {
        // dev-only: call PayPal mock webhook if token present in redirect URL
        if (window.location.hostname === 'localhost') {
          try {
            const url = new URL(response.redirectUrl);
            const token = url.searchParams.get('token');
            if (token) {
              // lazy import to avoid circular deps in tests
              import('../services/membership')
                .then(({ paypalWebhookMock }) => paypalWebhookMock(token))
                .catch((err) => console.error('Mock webhook failed:', err));
            }
          } catch (err) {
            console.error('Failed to parse redirectUrl for token:', err);
          }
        }

        if (response.redirectUrl) window.open(response.redirectUrl, '_blank');

        // start polling
        const pubTrackId = response.pubTrackId;
        if (!pubTrackId) {
          setIsProcessing(false);
          return response;
        }

        const poll = setInterval(async () => {
          try {
            const status = await getOrderStatus(pubTrackId);
            if (status.isPaid && status.paymentStatus === 2 /* Completed */) {
              clearInterval(poll);
              // refresh credits & memberships
              queryClient.invalidateQueries({
                queryKey: ['membership', 'myTotalAndRemainingCredits'],
              });
              queryClient.invalidateQueries({
                queryKey: ['membership', 'myActiveMemberships'],
              });
              setIsProcessing(false);
            } else if (
              status.paymentStatus === 3 ||
              status.paymentStatus === 4
            ) {
              // Failed or Cancelled
              clearInterval(poll);
              setIsProcessing(false);
            }
          } catch (err) {
            console.error('Polling order status failed:', err);
            clearInterval(poll);
            setIsProcessing(false);
          }
        }, 3000);
      } else if (response.result) {
        // immediate success (no redirect)
        queryClient.invalidateQueries({
          queryKey: ['membership', 'myTotalAndRemainingCredits'],
        });
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }

      return response;
    } catch (err) {
      console.error('Top-up flow failed:', err);
      setIsProcessing(false);
      throw err;
    }
  }

  return {
    startTopup,
    isProcessing,
  };
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
  const query = useQuery<ActiveMembership[]>({
    queryKey: ['membership', 'myActiveMemberships'],
    queryFn: fetchMyActiveMemberships,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  // keep global auth store in sync with server-side memberships
  useEffect(() => {
    // update persisted zustand store so `useAuthUser()` reflects DB changes
    import('@/stores/authStore')
      .then(({ useAuthStore }) =>
        useAuthStore.getState().setActiveMemberships?.(query.data ?? [])
      )
      .catch((err) =>
        console.warn('Failed to sync active memberships to auth store:', err)
      );
  }, [query.data]);

  return query;
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
