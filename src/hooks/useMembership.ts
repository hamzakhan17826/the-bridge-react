import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchSubscriptionTiers,
  placeMembershipOrder,
  paypalWebhook,
  getOrderStatus,
} from '../services/membership';
import {
  type SubscriptionTier,
  type PlaceMembershipOrderPayload,
  type OrderStatusResponse,
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
