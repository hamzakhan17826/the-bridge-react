import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { Country, City } from '../types/api';

// Query Keys for consistent caching and invalidation
export const locationQueryKeys = {
  all: ['location'] as const,
  countries: () => [...locationQueryKeys.all, 'countries'] as const,
  cities: (countryId?: number) =>
    [...locationQueryKeys.all, 'cities', countryId] as const,
};

// Hook to fetch countries
export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: locationQueryKeys.countries(),
    queryFn: async () => {
      const response = await api.get('/Resources/ListCountries');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
};

// Hook to fetch cities by country ID
export const useCities = (countryId?: number) => {
  return useQuery<City[]>({
    queryKey: locationQueryKeys.cities(countryId),
    queryFn: async () => {
      if (!countryId) return [];
      const response = await api.get(
        `/Resources/ListCities?countryId=${countryId}`
      );
      return response.data;
    },
    enabled: !!countryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};
