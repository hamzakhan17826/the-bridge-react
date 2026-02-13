import type { TagResponse } from './tag';

export interface BookResponse {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  slug: string;
  authorId: string;
  authorName: string;
  authorProfilePic?: string;
  tags: TagResponse[];
  createdAt: string;
}

export interface BookRequest {
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: File;
  tagIds: number[];
}
