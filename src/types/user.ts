import type { City, Country } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export type AppUserProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePictureUrl?: string;
  registerDateTime?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  emailConfirmed?: boolean;
  lockoutEnd?: string | null;
  accessFailedCount?: number;
  countryId?: number;
  cityId?: number;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  gender?: string;
  changeEmailPreferencesKey?: boolean;
};

// New AppUser type matching the API response
export type AppUser = {
  registerDateTime: string;
  lastLoginDateTime: string;
  emailPreferencesChangeKey: string;
  isUserAgeedToTerms: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  membershipId: string | null;
  membership: unknown | null; // You can define a proper Membership type later
  mediumProfile: unknown | null; // You can define a proper MediumProfile type later
  eventRegistrations: unknown[]; // You can define proper types later
  bookings: unknown[]; // You can define proper types later
  countryId: number;
  country: Country | null;
  cityId: number;
  city: City | null;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  dateOfBirth: string | null;
  gender: string | null;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ProfileResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
};

export interface AddressInfoSectionProps {
  addressLine1: string;
  setAddressLine1: (value: string) => void;
  addressLine2: string;
  setAddressLine2: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
}

export type Opt<T = string> = { value: T; label: string };
export interface LocationInfoSectionProps {
  countries: Country[];
  cities: City[];
  selectedCountry: Opt<number> | null;
  selectedCity: Opt<number> | null;
  onCountryChange: (country: Opt<number> | null) => void;
  onCityChange: (city: Opt<number> | null) => void;
  fetchCities: (countryId: number) => Promise<City[]>;
}

export interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PersonalInfoSectionProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
}

export interface ProfilePictureSectionProps {
  profile: AppUserProfile | null;
  profilePictureFile: File | null;
  profilePicturePreview: string | null;
  onProfilePictureChange: (file: File | null, preview: string | null) => void;
}
