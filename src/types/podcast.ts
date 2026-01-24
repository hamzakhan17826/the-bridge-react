// Podcast Form Data for Add/Edit Podcast forms
export interface PodcastFormData {
  title: string;
  description: string;
  audioFile: FileList;
  audioUrl: string;
  imageFile: FileList;
  duration: string;
  tags: string[];
  publishDate: string;
  isExternal: boolean;
}

// Podcast entity from API
export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl?: string; // For external podcasts
  audioFileUrl?: string; // For uploaded files
  imageUrl?: string;
  duration: string;
  tags: string[];
  publishDate: string;
  isPublished: boolean;
  isExternal: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  viewCount: number;
  likeCount: number;
}

// Podcast creation request payload
export interface CreatePodcastRequest {
  title: string;
  description: string;
  audioUrl?: string;
  audioFile?: File;
  imageFile?: File;
  duration: string;
  tags: string[];
  publishDate?: string;
  isExternal: boolean;
}

// Podcast update request payload
export interface UpdatePodcastRequest extends Partial<CreatePodcastRequest> {
  id: string;
}

// Podcast list response
export interface PodcastListResponse {
  podcasts: Podcast[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Podcast filters for listing/searching
export interface PodcastFilters {
  search?: string;
  tags?: string[];
  isPublished?: boolean;
  isExternal?: boolean;
  publishDateFrom?: string;
  publishDateTo?: string;
  sortBy?: 'title' | 'publishDate' | 'createdAt' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

// Podcast tag interface
export interface PodcastTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

// Podcast statistics
export interface PodcastStats {
  totalPodcasts: number;
  publishedPodcasts: number;
  draftPodcasts: number;
  totalViews: number;
  totalLikes: number;
  averageDuration: string;
  topTags: PodcastTag[];
}

// Podcast player state
export interface PodcastPlayerState {
  currentPodcast: Podcast | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
}
