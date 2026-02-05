import type { EventStatusValue, TagsValue } from '../constants/enums';

export interface EventCreateRequest {
  Title: string;
  Description: string;
  Image: File;
  StartDateTime: string;
  EnrollmentDeadline?: string | null;
  IsPublic: boolean;
  Credits: number;
  Tags: TagsValue[];
  Status: EventStatusValue;
  ZoomLink?: string | null;
  RecordingAvailable?: boolean;
}

export interface EventMediumInfo {
  id: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  profilePictureUrl?: string;
  photoUrl?: string;
  tagline?: string;
  specialty?: string;
  slug?: string;
}

export interface EventListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  startDateTime: string;
  enrollmentDeadline?: string | null;
  isPublic: boolean;
  credits: number;
  tags: TagsValue[];
  status: EventStatusValue;
  zoomLink?: string | null;
  mediumId: string;
  medium?: EventMediumInfo | null;
  currentEnrolled: number;
  recordingAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
