export interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
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
  podcasts?: PodcastItem[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export interface ReviewItem {
  id: number;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  category: string;
  title: string;
  comment: string;
}

export interface Event {
  image: string;
  badge: string;
  date: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

export interface Testimonial {
  text: string;
  name: string;
  link: string;
  platform: string;
  image: string;
}
