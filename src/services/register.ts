import api from '../lib/api';
import type { RegisterFormState, RegisterPayload } from '../types/auth';
import type { Country, City } from '../types/api';

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await api.get('/Resources/ListCountries', {
      headers: { 'Cache-Control': 'no-store' },
    });
    return res.data as Country[];
  } catch (error) {
    console.error('Error fetching countries', error);
    return [];
  }
}

export async function fetchCities(countryId: number): Promise<City[]> {
  if (!countryId) return [];
  try {
    const res = await api.get(`/Resources/ListCities`, {
      // Swagger shows both `id` and `countryId` in query; send both to satisfy server binding
      params: { countryId },
    });
    return res.data as City[];
  } catch (error) {
    console.error('Error fetching cities', error);
    return [];
  }
}

export async function resendVerificationEmail(
  email: string
): Promise<RegisterFormState> {
  if (!email) {
    return {
      success: false,
      message: 'Email is required.',
      errors: ['Email is required.'],
    };
  }
  try {
    const res = await api.post(`/Account/ResendVerifyEmail`, null, {
      params: { email },
    });
    const result = res.data;
    if (res.status === 200 && result?.result) {
      return {
        success: true,
        message: result.message || 'Verification email sent successfully!',
      };
    }
    return {
      success: false,
      message: result?.message || 'Failed to send email.',
      errors: result?.errors || ['An unknown error occurred.'],
    };
  } catch (error) {
    console.error('Error resending verification email', error);
    return {
      success: false,
      message: 'Could not connect to the server.',
      errors: ['Server connection failed.'],
    };
  }
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterFormState> {
  if (payload.password !== payload.confirmPassword) {
    return {
      success: false,
      message: 'Passwords do not match.',
      errors: ['Passwords do not match.'],
    };
  }
  try {
    const res = await api.post('/Account/Register', payload);
    if (res.status === 200) {
      const result = res.data;
      return {
        success: true,
        message: result?.message || 'Registration successful!',
      };
    }
    const errorResult = res.data;
    const errorMessages = Object.values(
      errorResult?.errors || {}
    ).flat() as string[];
    return {
      success: false,
      message: errorResult?.title || 'Please correct the errors below.',
      errors: errorMessages.length
        ? errorMessages
        : ['An unknown validation error occurred.'],
    };
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: { errors?: Record<string, string[]>; title?: string };
      };
    };
    const data = err?.response?.data ?? {};
    const errorMessages = Object.values(data.errors || {}).flat();
    return {
      success: false,
      message:
        data.title ||
        'Could not connect to the server. Please try again later.',
      errors: errorMessages.length
        ? (errorMessages as string[])
        : ['Server connection failed.'],
    };
  }
}
