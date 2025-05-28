import React from 'react';
import { MediaItem } from '../../../types/media';

interface MediaCardContentProps {
  item: MediaItem;
}

export function MediaCardContent({ item }: MediaCardContentProps) {
  return (
    <div className="p-4">
      <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>{item.title}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {item.type}
          </span>
          {item.dimensions && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              {item.dimensions}
            </span>
          )}
        </div>
        {item.notes && (
          <p className="text-sm text-[#737373]">{item.notes}</p>
        )}
      </div>
    </div>
  );
}