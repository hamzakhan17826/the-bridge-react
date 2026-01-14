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
