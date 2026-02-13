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
  language?: string;
  edition?: string;
  publisher?: string;
  pagesCount?: number;
  format?: string;
  fileUrl?: string;
  readingTime?: string;
}

export interface BookRequest {
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: File;
  tagIds: number[];
  language?: string;
  edition?: string;
  publisher?: string;
  pagesCount?: number;
  format?: string;
  fileUrl?: string;
  readingTime?: string;
}
