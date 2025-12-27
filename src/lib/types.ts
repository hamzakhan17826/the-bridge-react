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
