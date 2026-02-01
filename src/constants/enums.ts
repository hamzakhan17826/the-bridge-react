// Centralized frontend mirrors of backend enums/config values.
// Use `as const` to keep literal types and numeric values aligned.

export const MembershipForUserType = {
  AllUsers: 0,
  ProfessionalMedium: 1,
  DeveloperMedium: 2,
  ProfessionalNDeveloperMedium: 3,
  Sitter: 4,
} as const;

export type MembershipForUserTypeKey = keyof typeof MembershipForUserType;
export type MembershipForUserTypeValue =
  (typeof MembershipForUserType)[MembershipForUserTypeKey];

export const PaymentStatus = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
  Cancelled: 4,
} as const;

export type PaymentStatusKey = keyof typeof PaymentStatus;
export type PaymentStatusValue = (typeof PaymentStatus)[PaymentStatusKey];

export const PaymentProcessor = {
  PayPal: 1,
  Stripe: 2,
} as const;

export type PaymentProcessorKey = keyof typeof PaymentProcessor;
export type PaymentProcessorValue =
  (typeof PaymentProcessor)[PaymentProcessorKey];

export const AvailabilityStatus = {
  Available: 0,
  Upcoming_Events: 1,
  Book_Reading: 2,
  Private_Sessions_Only: 3,
  Unavailable: 4,
  Public_Sessions_Only: 5,
} as const;
export type AvailabilityStatusKey = keyof typeof AvailabilityStatus;
export type AvailabilityStatusValue =
  (typeof AvailabilityStatus)[AvailabilityStatusKey];
