import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  fetchEmailPreferences,
  fetchCountries,
  fetchCities,
  resendVerificationEmail,
  registerUser,
} from '../services/register';
import type { EmailPreference, Country, City } from '../types/api';

// Query Keys for consistent caching and invalidation
export const registerQueryKeys = {
  emailPreferences: ['register', 'emailPreferences'] as const,
  countries: ['register', 'countries'] as const,
  cities: (countryId: number) => ['register', 'cities', countryId] as const,
};

// Hook for fetching email preferences
export const useEmailPreferences = () => {
  return useQuery<EmailPreference[]>({
    queryKey: registerQueryKeys.emailPreferences,
    queryFn: fetchEmailPreferences,
    staleTime: 10 * 60 * 1000, // 10 minutes - preferences don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes cache
  });
};

// Hook for fetching countries
export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: registerQueryKeys.countries,
    queryFn: fetchCountries,
    staleTime: 10 * 60 * 1000, // 10 minutes - countries are static
    gcTime: 60 * 60 * 1000, // 1 hour cache
  });
};

// Hook for fetching cities based on country
export const useCities = (countryId: number | null) => {
  return useQuery<City[]>({
    queryKey: registerQueryKeys.cities(countryId!),
    queryFn: () => fetchCities(countryId!),
    enabled: !!countryId, // Only fetch if countryId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for resending verification email
export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (data) => {
      toast.success(data.message);
      // Optionally invalidate related queries if needed
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to resend email.';
      toast.error(message);
    },
  });
};

// Hook for user registration
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate any related queries if registration affects them (e.g., user data)
      // For now, no invalidation needed as registration is a one-time action
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Registration failed.';
      const errors = error?.response?.data?.errors;
      if (errors) {
        toast.error(Object.values(errors).flat().join(', '));
      } else {
        toast.error(message);
      }
    },
  });
};
