import React from 'react';
import { MediaCard } from './Card/MediaCard';
import { useMediaStore } from '../../store/mediaStore';

export function MediaGrid() {
  const { filteredItems } = useMediaStore();
  const items = filteredItems();

  return (
    <div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[#737373]">No materials found matching your criteria</p>
        </div>
      )}
    </div>
  );
}