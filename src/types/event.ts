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
