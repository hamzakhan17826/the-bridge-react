export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface PodcastItem {
  id: number;
  episode: string;
  duration: string;
  date: string;
  title: string;
  image: string;
}

export interface PodcastSliderProps {
  podcasts: PodcastItem[];
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface EmailPreference {
  emailPreferencesID: string;
  displayName: string;
  description: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  countryId: number;
}

export interface SubmitButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

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
