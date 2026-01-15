export interface SubscriptionTier {
  id: number;
  slug: string;
  tierName: string;
  tierCode: string;
  basePrice: number;
  validityDurationInDays: number;
  discountPercentage: number;
  isDiscountEnabled: boolean;
  description: string;
  isAutoRenewEnabled: boolean;
  autoRenewsEvernNDays: number;
  displayOrder: number;
  updatedAt: string;
  isUsedOnlyOnceByAppUser: boolean;
  features: SubscriptionFeature[];
}

export interface SubscriptionFeature {
  id: number;
  slug: string;
  code: string;
  name: string;
  description: string;
  isOnlyDiscount: boolean;
  price: number;
  discountPercentage: number;
  isDiscountEnabled: boolean;
  validityDurationInDays: number;
  totalCredits: number;
  isAutoRenewEnabled: boolean;
  autoRenewsEvernNDays: number;
  displayOrder: number;
  updatedAt: string;
}

export interface PlaceMembershipOrderPayload {
  membershipId: number;
  discountCode: string;
  autoRenewMyMembership: boolean;
  processorId: number; // 1 for PayPal, 2 for Stripe
}

export interface PlaceMembershipOrderResponse {
  result: boolean;
  message: string;
  errors: string[];
  orderId: number;
  pubTrackId: string;
  redirectUrl: string;
  returnUrl: string;
}

export interface OrderStatusResponse {
  orderId: number;
  isPaid: boolean;
  paymentStatus: string;
  amount: number;
  orderPlacedAt: string;
  paidAt: string;
}
