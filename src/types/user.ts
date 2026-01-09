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
