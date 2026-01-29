import type { City, Country } from './api';

export type { City, Country };

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

// Request type for AppUsersBasicData API
export interface AppUsersBasicDataRequest {
  userId?: string;
  userName?: string;
  userEmail?: string;
  isLockoutEnabled?: boolean;
  registerDateTimeStart?: string;
  registerDateTimeEnd?: string;
  lastLoginDateTimeStart?: string;
  lastLoginDateTimeEnd?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  firstName?: string;
  lastName?: string;
  countryId?: number;
  cityId?: number;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  dateOfBirth?: string;
  gender?: string;
  applyPagination?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

// User type for AppUsersBasicData response
export interface AppUsersBasicDataUser {
  id: string;
  userName: string;
  email: string;
  isLockoutEnabled: boolean;
  registerDateTime: string;
  lastLoginDateTime: string;
  isBlocked: boolean;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  countryId: number;
  cityId: number;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  dateOfBirth: string;
  gender: string;
}

// Response type for AppUsersBasicData API
export interface AppUsersBasicDataResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  users: AppUsersBasicDataUser[];
}

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

// Edit User Form Data
export interface EditUserFormData {
  userID: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  CountryId: number;
  CityId: number;
  AddressLine1: string;
  AddressLine2: string;
  PostalCode: string;
  DateOfBirth: string; // YYYY-MM-DD format
  Gender: string;
  IsDeleted: boolean;
  IsBlocked: boolean;
  ProfilePicture?: File | null; // File upload for profile picture
}

// Edit User API Response (from POST /EditUser/AppUsersBasicData)
export type EditUserResponse = AppUsersBasicDataResponse;

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
