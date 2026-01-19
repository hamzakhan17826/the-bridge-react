import api from '../lib/api';
import type {
  OrderStatusResponse,
  PlaceMembershipOrderPayload,
  PlaceMembershipOrderResponse,
  SubscriptionTier,
  MyOrderHistoryItem,
  AllOrdersFilters,
  AllOrdersResponse,
  ActiveMembership,
} from '../types/membership';

export async function fetchSubscriptionTiers(): Promise<SubscriptionTier[]> {
  try {
    const res = await api.get('/Resources/MembershipsFeatures');
    return res.data as SubscriptionTier[];
  } catch (error) {
    console.error('Error fetching Membership tiers', error);
    throw new Error('Failed to fetch membership tiers.');
  }
}

export async function placeMembershipOrder(
  payload: PlaceMembershipOrderPayload
): Promise<PlaceMembershipOrderResponse> {
  try {
    console.log('Calling placeMembershipOrder API with payload:', payload);
    const res = await api.post('/Member/AppUserPlaceMembershipOrder', payload);
    console.log('placeMembershipOrder API response:', res.data);
    return res.data;
  } catch (error: unknown) {
    console.error('placeMembershipOrder API error:', error);
    const err = error as {
      response?: {
        data?: { message?: string; errors?: string[] };
        status?: number;
      };
    };

    console.error('Error details:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.response?.data?.message,
      errors: err.response?.data?.errors,
    });

    throw new Error(
      err.response?.data?.message || 'Failed to place membership order.'
    );
  }
}

export async function paypalWebhook(token: string): Promise<string> {
  try {
    const res = await api.post('/Member/PayPalWebhook', token, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return res.data; // Should be "OK"
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string };
      };
    };

    throw new Error(err.response?.data?.message || 'PayPal webhook failed.');
  }
}

export async function getOrderStatus(
  pubTrackId: string
): Promise<OrderStatusResponse> {
  try {
    const res = await api.get(`/Member/OrderStatus/${pubTrackId}`);
    return res.data;
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { message?: string };
      };
    };

    throw new Error(
      err.response?.data?.message || 'Failed to get order status.'
    );
  }
}

export async function fetchMyOrdersHistory(): Promise<MyOrderHistoryItem[]> {
  try {
    const res = await api.get('/Member/MyOrdersHistory');
    return res.data as MyOrderHistoryItem[];
  } catch (error: unknown) {
    console.error('Failed to fetch MyOrdersHistory', error);
    throw new Error('Failed to fetch orders history.');
  }
}

export async function fetchAllOrdersHistory(
  filters: AllOrdersFilters
): Promise<AllOrdersResponse> {
  try {
    const res = await api.post('/Member/AllOrdersHistory', filters);
    return res.data as AllOrdersResponse;
  } catch (error: unknown) {
    console.error('Failed to fetch AllOrdersHistory', error);
    throw new Error('Failed to fetch all orders history.');
  }
}

export async function fetchMyActiveMemberships(): Promise<ActiveMembership[]> {
  try {
    const res = await api.get('/Member/MyActiveMemberships');
    return res.data as ActiveMembership[];
  } catch (error: unknown) {
    console.error('Failed to fetch MyActiveMemberships', error);
    throw new Error('Failed to fetch active memberships.');
  }
}
