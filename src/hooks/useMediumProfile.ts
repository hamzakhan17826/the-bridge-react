import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '../lib/api';

export const AvailabilityStatus = {
  Available: 0,
  Upcoming_Events: 1,
  Book_Reading: 2,
  Private_Sessions_Only: 3,
  Unavailable: 4,
  Public_Sessions_Only: 5,
} as const;

export type AvailabilityStatusType =
  (typeof AvailabilityStatus)[keyof typeof AvailabilityStatus];

export type MediumProfileFormData = {
  Specialty: string;
  Tagline: string;
  Focus: string;
  Slug?: string;
  AvailabilityStatus: AvailabilityStatusType;
  Bio?: string;
  ExperienceInYears?: number;
  IsBookingEnabled?: boolean;
  FocusAreaTitle1?: string;
  FocusAreaDetails1?: string;
  FocusAreaTitle2?: string;
  FocusAreaDetails2?: string;
  FocusAreaTitle3?: string;
  FocusAreaDetails3?: string;
  FocusAreaTitle4?: string;
  FocusAreaDetails4?: string;
};

export type MediumProfileResponse = {
  id: string;
  isBookingEnabled: boolean;
  specialty: string;
  tagline: string;
  focus: string;
  slug: string;
  availabilityStatus: number;
  bio: string;
  photoUrl: string;
  experienceInYears: number;
  focusAreaTitle1?: string;
  focusAreaDetails1?: string;
  focusAreaTitle2?: string;
  focusAreaDetails2?: string;
  focusAreaTitle3?: string;
  focusAreaDetails3?: string;
  focusAreaTitle4?: string;
  focusAreaDetails4?: string;
};

export function useMediumProfile() {
  const [mediumProfile, setMediumProfile] =
    useState<MediumProfileFormData | null>(null);

  // Query to fetch existing medium profile
  const {
    data: existingProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery<MediumProfileResponse>({
    queryKey: ['mediumProfile'],
    queryFn: async () => {
      const response = await api.get('/Register/Medium');
      return response.data;
    },
    retry: 1,
  });

  const registerMediumMutation = useMutation({
    mutationFn: async (data: MediumProfileFormData) => {
      // Convert to FormData as the backend expects it
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Determine if this is an update (PUT) or create (POST)
      const isUpdate = !!existingProfile;
      // Backend currently supports POST for create/update (PUT returns 405)
      const method = 'post';

      // For updates, include the ID
      if (isUpdate && existingProfile) {
        formData.append('Id', existingProfile.id);
      }

      const response = await api[method]('/Register/Medium', formData);
      return response.data;
    },
    onSuccess: (data) => {
      const isUpdate = !!existingProfile;
      const message = isUpdate
        ? 'Medium profile updated successfully!'
        : 'Medium profile registered successfully!';
      toast.success(message);
      setMediumProfile(data);
    },
    onError: (error: AxiosError) => {
      console.error('Medium profile operation error:', error);
      if (error?.response) {
        console.error('Medium profile error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      }
      const isUpdate = !!existingProfile;
      const operation = isUpdate ? 'update' : 'register';
      let errorMessage = `Failed to ${operation} medium profile`;

      if (error?.response?.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData: any = error.response.data;

        // Handle different error response formats
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.join(', ');
        } else if (errorData.errors && typeof errorData.errors === 'object') {
          // Handle validation errors object
          const errorMessages = Object.values(errorData.errors).flat();
          errorMessage = errorMessages.join(', ');
        } else if (errorData.title) {
          errorMessage = errorData.title;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(
        `${operation.charAt(0).toUpperCase() + operation.slice(1)} failed: ${errorMessage}`
      );
    },
  });

  const onSubmit = (data: MediumProfileFormData) => {
    registerMediumMutation.mutate(data);
  };

  // Convert GET response to form data format
  const convertToFormData = useCallback(
    (profile: MediumProfileResponse): MediumProfileFormData => {
      return {
        Specialty: profile.specialty,
        Tagline: profile.tagline,
        Focus: profile.focus,
        Slug: profile.slug,
        AvailabilityStatus:
          profile.availabilityStatus as AvailabilityStatusType,
        Bio: profile.bio,
        ExperienceInYears: profile.experienceInYears,
        IsBookingEnabled: profile.isBookingEnabled,
        FocusAreaTitle1: profile.focusAreaTitle1,
        FocusAreaDetails1: profile.focusAreaDetails1,
        FocusAreaTitle2: profile.focusAreaTitle2,
        FocusAreaDetails2: profile.focusAreaDetails2,
        FocusAreaTitle3: profile.focusAreaTitle3,
        FocusAreaDetails3: profile.focusAreaDetails3,
        FocusAreaTitle4: profile.focusAreaTitle4,
        FocusAreaDetails4: profile.focusAreaDetails4,
      };
    },
    []
  );

  return {
    mediumProfile,
    registerMediumMutation,
    onSubmit,
    error: registerMediumMutation.error,
    isError: registerMediumMutation.isError,
    // Existing profile data
    existingProfile,
    isLoadingProfile,
    profileError,
    convertToFormData,
  };
}
