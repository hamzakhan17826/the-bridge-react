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
  paymentStatus: number; // 1 Pending, 2 Completed, 3 Failed, 4 Cancelled
  amount: number;
  orderPlacedAt: string;
  paidAt: string;
}

export interface MyOrderHistoryItem {
  id: number;
  userId: string;
  userName: string;
  userEmail: string;
  orderPlacedAt: string;
  amount: number;
  processorId: number; // 1 PayPal, 2 Stripe
  paymentTransactionId: string;
  paymentStatus: number;
  isPaid: boolean;
  paidAt?: string;
  pubTrackId: string;
  isAutoRenewEnabled: boolean;
  membershipId: number;
  membershipSlug: string;
  membershipTierName: string;
  membershipTierCode: string;
}

export interface AllOrdersFilters {
  id?: number;
  userId?: string;
  userName?: string;
  userEmail?: string;
  membershipId?: number;
  membershipSlug?: string;
  membershipTierName?: string;
  membershipTierCode?: string;
  orderPlacedAtFrom?: string; // ISO
  orderPlacedAtTo?: string; // ISO
  amountFromDT?: number;
  amountToDT?: number;
  processorId?: number; // 1 PayPal, 2 Stripe
  paymentTransactionId?: string;
  paymentStatus?: number;
  isPaid?: boolean;
  paidAtFromDT?: string; // ISO
  paidAtToDT?: string; // ISO
  pubTrackId?: string;
  isAutoRenewEnabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface AllOrdersResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  membershipOrders: Array<Omit<MyOrderHistoryItem, 'membershipId'>> &
    MyOrderHistoryItem[];
}
