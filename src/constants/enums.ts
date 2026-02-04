// Centralized frontend mirrors of backend enums/config values.
// Use `as const` to keep literal types and numeric values aligned.

export const MembershipForUserType = {
  AllUsers: 0,
  ProfessionalMedium: 1,
  DeveloperMedium: 2,
  ProfessionalNDeveloperMedium: 3,
  Sitter: 4,
  AppUser: 5,
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

export const EventStatus = {
  Upcoming: 0,
  Ongoing: 1,
  Past: 2,
  Active: 3,
  Waitlisted: 4,
  Cancelled: 5,
} as const;
export type EventStatusKey = keyof typeof EventStatus;
export type EventStatusValue = (typeof EventStatus)[EventStatusKey];

export const Tags = {
  Technology: 0,
  Workshop: 1,
  Seminar: 2,
  Networking: 3,
  Career: 4,
  Social: 5,
  Other: 6,
} as const;
export type TagsKey = keyof typeof Tags;
export type TagsValue = (typeof Tags)[TagsKey];

// Optional small helpers you can use across the app:
export const getEventStatusKey = (
  value: EventStatusValue
): EventStatusKey | undefined =>
  (Object.keys(EventStatus) as EventStatusKey[]).find(
    (k) => EventStatus[k] === value
  );

export const getTagKey = (value: TagsValue): TagsKey | undefined =>
  (Object.keys(Tags) as TagsKey[]).find((k) => Tags[k] === value);
