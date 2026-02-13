import type { TagResponse } from './tag';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
  authorId?: string;
  authorName?: string;
  authorProfilePic?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  tags: TagResponse[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogFormData {
  title: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  content: string;
  image?: FileList;
  isPublished: boolean;
  tagIds?: number[];
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}
