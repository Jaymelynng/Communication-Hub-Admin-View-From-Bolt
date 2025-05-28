export interface NewsUpdate {
  id: string;
  title: string;
  content: string;
  category: 'announcement' | 'update' | 'alert';
  priority: 'low' | 'normal' | 'high';
  publishDate: string;
  expiryDate?: string;
}

export interface NewsFilters {
  category?: NewsUpdate['category'];
  priority?: NewsUpdate['priority'];
}