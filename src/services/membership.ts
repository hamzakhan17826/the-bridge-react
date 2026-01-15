import api from '../lib/api';
import type {
  OrderStatusResponse,
  PlaceMembershipOrderPayload,
  PlaceMembershipOrderResponse,
  SubscriptionTier,
} from '../types/membership';

export async function fetchSubscriptionTiers(): Promise<SubscriptionTier[]> {
  try {
    const res = await api.get('/Resources/MembershipsFeatures');
    return res.data as SubscriptionTier[];
  } catch (error) {
    console.error('Error fetching Membership tiers', error);
    // Return dummy data as fallback for UI demonstration
    return [
      {
        id: 4,
        slug: 'FreeTier_Membership',
        tierName: 'Free Tier Membership',
        tierCode: 'FREETIERMEMBERSHIP',
        basePrice: 0,
        validityDurationInDays: 7,
        discountPercentage: 15,
        isDiscountEnabled: true,
        description: 'Free Membership Tier',
        isAutoRenewEnabled: false,
        autoRenewsEvernNDays: 0,
        displayOrder: 0,
        updatedAt: '2026-01-06T18:42:26',
        isUsedOnlyOnceByAppUser: true,
        features: [
          {
            id: 1,
            slug: 'Members_Replay_Library',
            code: 'MembersReplayLibrary',
            name: 'Members Replay Library',
            description:
              'Members Replay Library, feature included in memberships only',
            isOnlyDiscount: false,
            price: 10,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 100,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 30,
            displayOrder: 1,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 2,
            slug: '10%_off_ALL_events',
            code: '10PercentOffAllEvents',
            name: '10% off ALL events',
            description:
              '10% off ALL events, feature included in memberships only',
            isOnlyDiscount: true,
            price: 5,
            discountPercentage: 10,
            isDiscountEnabled: false,
            validityDurationInDays: 15,
            totalCredits: 1000,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 15,
            displayOrder: 2,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 3,
            slug: 'Early_registration_access',
            code: 'EarlyRegistrationAccess',
            name: 'Early registration access',
            description:
              'Early registration access, feature included in memberships only',
            isOnlyDiscount: false,
            price: 1,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 1000,
            isAutoRenewEnabled: false,
            autoRenewsEvernNDays: 0,
            displayOrder: 3,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 5,
            slug: 'Weekly_newsletter',
            code: 'WeeklyNewsletter',
            name: 'Weekly newsletter',
            description:
              'Weekly newsletter, feature included in memberships only',
            isOnlyDiscount: false,
            price: 0,
            discountPercentage: 100,
            isDiscountEnabled: true,
            validityDurationInDays: 182,
            totalCredits: 182,
            isAutoRenewEnabled: false,
            autoRenewsEvernNDays: 182,
            displayOrder: 5,
            updatedAt: '2026-01-06T18:42:26',
          },
        ],
      },
      {
        id: 1,
        slug: 'General_Membership',
        tierName: 'General Membership',
        tierCode: 'GENERALMEMBERSHIP',
        basePrice: 10,
        validityDurationInDays: 30,
        discountPercentage: 50,
        isDiscountEnabled: true,
        description: 'General Membership Tier',
        isAutoRenewEnabled: true,
        autoRenewsEvernNDays: 30,
        displayOrder: 1,
        updatedAt: '2026-01-06T18:42:26',
        isUsedOnlyOnceByAppUser: false,
        features: [
          {
            id: 1,
            slug: 'Members_Replay_Library',
            code: 'MembersReplayLibrary',
            name: 'Members Replay Library',
            description:
              'Members Replay Library, feature included in memberships only',
            isOnlyDiscount: false,
            price: 10,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 100,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 30,
            displayOrder: 1,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 2,
            slug: '10%_off_ALL_events',
            code: '10PercentOffAllEvents',
            name: '10% off ALL events',
            description:
              '10% off ALL events, feature included in memberships only',
            isOnlyDiscount: true,
            price: 5,
            discountPercentage: 10,
            isDiscountEnabled: false,
            validityDurationInDays: 15,
            totalCredits: 1000,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 15,
            displayOrder: 2,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 3,
            slug: 'Early_registration_access',
            code: 'EarlyRegistrationAccess',
            name: 'Early registration access',
            description:
              'Early registration access, feature included in memberships only',
            isOnlyDiscount: false,
            price: 1,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 1000,
            isAutoRenewEnabled: false,
            autoRenewsEvernNDays: 0,
            displayOrder: 3,
            updatedAt: '2026-01-06T18:42:26',
          },
        ],
      },
      {
        id: 2,
        slug: 'Development_Medium',
        tierName: 'Development Medium',
        tierCode: 'DEVELOPMENTMEDIUM',
        basePrice: 19,
        validityDurationInDays: 30,
        discountPercentage: 25,
        isDiscountEnabled: true,
        description: 'Development Medium Tier',
        isAutoRenewEnabled: true,
        autoRenewsEvernNDays: 30,
        displayOrder: 2,
        updatedAt: '2026-01-06T18:42:26',
        isUsedOnlyOnceByAppUser: false,
        features: [
          {
            id: 1,
            slug: 'Members_Replay_Library',
            code: 'MembersReplayLibrary',
            name: 'Members Replay Library',
            description:
              'Members Replay Library, feature included in memberships only',
            isOnlyDiscount: false,
            price: 10,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 100,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 30,
            displayOrder: 1,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 2,
            slug: '10%_off_ALL_events',
            code: '10PercentOffAllEvents',
            name: '10% off ALL events',
            description:
              '10% off ALL events, feature included in memberships only',
            isOnlyDiscount: true,
            price: 5,
            discountPercentage: 10,
            isDiscountEnabled: false,
            validityDurationInDays: 15,
            totalCredits: 1000,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 15,
            displayOrder: 2,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 3,
            slug: 'Early_registration_access',
            code: 'EarlyRegistrationAccess',
            name: 'Early registration access',
            description:
              'Early registration access, feature included in memberships only',
            isOnlyDiscount: false,
            price: 1,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 1000,
            isAutoRenewEnabled: false,
            autoRenewsEvernNDays: 0,
            displayOrder: 3,
            updatedAt: '2026-01-06T18:42:26',
          },
        ],
      },
      {
        id: 3,
        slug: 'Professional_Medium',
        tierName: 'Professional Medium',
        tierCode: 'PROFESSIONALMEDIUM',
        basePrice: 29,
        validityDurationInDays: 30,
        discountPercentage: 10,
        isDiscountEnabled: true,
        description: 'Professional Medium Tier',
        isAutoRenewEnabled: true,
        autoRenewsEvernNDays: 30,
        displayOrder: 3,
        updatedAt: '2026-01-06T18:42:26',
        isUsedOnlyOnceByAppUser: false,
        features: [
          {
            id: 1,
            slug: 'Members_Replay_Library',
            code: 'MembersReplayLibrary',
            name: 'Members Replay Library',
            description:
              'Members Replay Library, feature included in memberships only',
            isOnlyDiscount: false,
            price: 10,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 100,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 30,
            displayOrder: 1,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 2,
            slug: '10%_off_ALL_events',
            code: '10PercentOffAllEvents',
            name: '10% off ALL events',
            description:
              '10% off ALL events, feature included in memberships only',
            isOnlyDiscount: true,
            price: 5,
            discountPercentage: 10,
            isDiscountEnabled: false,
            validityDurationInDays: 15,
            totalCredits: 1000,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 15,
            displayOrder: 2,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 3,
            slug: 'Early_registration_access',
            code: 'EarlyRegistrationAccess',
            name: 'Early registration access',
            description:
              'Early registration access, feature included in memberships only',
            isOnlyDiscount: false,
            price: 1,
            discountPercentage: 0,
            isDiscountEnabled: false,
            validityDurationInDays: 30,
            totalCredits: 1000,
            isAutoRenewEnabled: false,
            autoRenewsEvernNDays: 0,
            displayOrder: 3,
            updatedAt: '2026-01-06T18:42:26',
          },
          {
            id: 4,
            slug: 'Monthly_newsletter',
            code: 'MonthlyNewsletter',
            name: 'Monthly newsletter',
            description:
              'Monthly newsletter, feature included in memberships only',
            isOnlyDiscount: false,
            price: 5,
            discountPercentage: 100,
            isDiscountEnabled: true,
            validityDurationInDays: 365,
            totalCredits: 12,
            isAutoRenewEnabled: true,
            autoRenewsEvernNDays: 365,
            displayOrder: 4,
            updatedAt: '2026-01-06T18:42:26',
          },
        ],
      },
    ];
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
