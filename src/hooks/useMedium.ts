import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  fetchMediumProfile,
  fetchMediums,
  upsertMediumProfile,
} from '../services/medium';
import type {
  AvailabilityStatusType,
  Mediums,
  MediumProfileFormData,
  MediumProfileResponse,
} from '../types/medium';

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
    queryFn: fetchMediumProfile,
    retry: 1,
  });

  const registerMediumMutation = useMutation({
    mutationFn: async (data: MediumProfileFormData) => {
      return upsertMediumProfile(data, existingProfile);
    },
    onSuccess: (data) => {
      const isUpdate = !!existingProfile;
      const message = isUpdate
        ? 'Medium profile updated successfully!'
        : 'Medium profile registered successfully!';
      toast.success(message);
      setMediumProfile(convertToFormData(data));
    },
    onError: (error: AxiosError) => {
      // Log minimal info for debugging
      console.error(
        'Medium profile operation error:',
        (error as any)?.response ?? error
      );

      const isUpdate = !!existingProfile;
      const operation = isUpdate ? 'update' : 'register';

      // Extract a concise, user-friendly message from common API shapes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const respData: any = (error as any)?.response?.data;
      let message = 'An unexpected error occurred.';

      if (respData) {
        if (typeof respData === 'string') message = respData;
        else if (respData.message) message = respData.message;
        else if (Array.isArray(respData.errors))
          message = respData.errors.join(', ');
        else if (respData.errors && typeof respData.errors === 'object')
          message = Object.values(respData.errors).flat().join(', ');
        else if (respData.title) message = respData.title;
      } else if ((error as any)?.message) {
        message = (error as any).message;
      }

      toast.error(
        `${operation.charAt(0).toUpperCase() + operation.slice(1)} failed: ${message}`
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

export function useMediums(mediumId?: string) {
  return useQuery<Mediums[]>({
    queryKey: ['mediums', mediumId ?? 'all'],
    queryFn: () => fetchMediums(mediumId),
    retry: 1,
  });
}
