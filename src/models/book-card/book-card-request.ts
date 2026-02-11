export interface BookCardRequest {
  title: string;
  author: string;
  description?: string;
  coverImage: string;
  isFavorite?: boolean;
  id?: string;
}
