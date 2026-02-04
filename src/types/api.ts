export interface ApiResponse<T = any> {
  result: boolean;
  message: string;
  errors: string[] | null;
  data?: T;
}

export interface FormState {
  success: boolean;
  message: string;
  errors?: string[];
}

export interface EmailPreference {
  emailPreferencesID: string;
  displayName: string;
  description: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  countryId: number;
}
