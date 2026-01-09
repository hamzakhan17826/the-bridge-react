export interface Medium {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string; // e.g., "Evidential Medium"
  tagline: string; // Short one-liner about the medium
  focus: string[]; // Areas of focus like ["Spirit Communication", "Healing"]
  ratingAverage: number;
  ratingCount: number;
  bookingEnabled: boolean;
  slug: string; // for profile URL
  availabilityStatus: 'available' | 'upcoming-events' | 'guest-medium' | 'busy';
  nextEvent?: {
    title: string;
    date: string;
    time: string;
  };
  videoCount: number; // Number of videos/lectures
  experience: string; // e.g., "15+ years"
}

export type MediumRegistrationFormState = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type MediumRegistrationPayload = {
  photo: File | null;
  experienceInYears: string;
  philosophy: string;
  bio: string;
  availabilityStatus: string;
  slug: string;
  focus: string;
  tagline: string;
  specialty: string;
};
