import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
  specialty: string;
  tagline: string;
  focus: string;
  slug?: string;
  availabilityStatus: AvailabilityStatusType;
  bio?: string;
  philosophy?: string;
  experienceInYears?: number;
};

export function useMediumProfile() {
  const [mediumProfile, setMediumProfile] =
    useState<MediumProfileFormData | null>(null);

  const registerMediumMutation = useMutation({
    mutationFn: async (data: MediumProfileFormData) => {
      const response = await fetch('/api/Register/Medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register medium');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success('Medium profile registered successfully!');
      setMediumProfile(data);
    },
    onError: (error) => {
      toast.error('Failed to register medium: ' + error.message);
    },
  });

  const onSubmit = (data: MediumProfileFormData) => {
    registerMediumMutation.mutate(data);
  };

  return {
    mediumProfile,
    registerMediumMutation,
    onSubmit,
  };
}
