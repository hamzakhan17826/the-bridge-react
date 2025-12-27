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
}
