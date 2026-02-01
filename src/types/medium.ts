import type { AvailabilityStatus } from '../constants/enums';

export interface Mediums {
  id: string;
  userId: string;
  isBookingEnabled: boolean;
  specialty: string;
  tagline: string;
  focus: string;
  slug: string;
  availabilityStatus: AvailabilityStatusType;
  bio: string;
  photoUrl: string;
  experienceInYears: number;
  totalSessions: number;
  totalReviews: number;
  averageRating: number;
  totalVideos: number;
  createdAt: Date;
  updatedAt: Date;
  focusAreaTitle1: string;
  focusAreaDetails1: string;
  focusAreaTitle2: string;
  focusAreaDetails2: string;
  focusAreaTitle3: string;
  focusAreaDetails3: string;
  focusAreaTitle4: string;
  focusAreaDetails4: string;
}

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
