import { create } from 'zustand';
import { MediaItem, MaterialType } from '../types/media';
import { mediaItems } from '../data/mediaItems';

interface MediaStore {
  items: MediaItem[];
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  addItem: (item: MediaItem) => void;
  updateItem: (item: MediaItem) => void;
  deleteItem: (id: number) => void;
  filteredItems: () => MediaItem[];
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  items: mediaItems,
  selectedWeek: '2024-12-02', // Default to current week
  
  setSelectedWeek: (week) => set({ selectedWeek: week }),
  
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  
  updateItem: (updatedItem) => set((state) => ({
    items: state.items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    )
  })),
  
  deleteItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  filteredItems: () => {
    const { items, selectedWeek } = get();
    return items.filter(item => item.uploadedAt === selectedWeek);
  }
}));