import type { AppUserProfile } from './user';

export type LoginFormState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterFormState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  isUserAgeedToTerms: boolean;
  countryId: number;
  cityId: number;
  selectedEmailPreferences: string[];
};

export type ForgetPasswordState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type ResetPasswordState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type ResetPayload = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export type VerifyEmailState = {
  success: boolean;
  message: string;
};

export interface AuthState {
  user: AppUserProfile | null;
  roles: string[];
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (user: AppUserProfile, roles: string[]) => void;
  logout: () => void;
  setUser: (user: AppUserProfile) => void;
  setRoles: (roles: string[]) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

export interface CookieOptions {
  path?: string;
  maxAge?: number;
  expires?: Date;
  sameSite?: 'lax' | 'strict' | 'none';
  secure?: boolean;
}
