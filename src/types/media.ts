export type MaterialType = 'Sticker' | 'Quarter Sheet' | 'Full Sheet' | 'Poster' | 'Banner';
export type ContentSource = 'file' | 'link';

export interface MediaItem {
  id: number;
  title: string;
  collectionId?: string;
  type: MaterialType;
  source: ContentSource;
  thumbnail: string;
  contentUrl: string;
  optimizedUrl?: string;
  order?: number;
  uploadedAt: string;
  uploadedBy: string;
  dimensions?: string;
  notes?: string;
}

export interface MediaCollection {
  id: string;
  name: string;
  description?: string;
  items: number[];
}

export interface MediaFilters {
  searchQuery: string;
  selectedType: MaterialType | 'All';
  collectionId?: string;
}