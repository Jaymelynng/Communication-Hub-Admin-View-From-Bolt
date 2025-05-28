import React, { useState } from 'react';
import { ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { MediaItem } from '../../../types/media';
import { useMediaStore } from '../../../store/mediaStore';
import { MediaEditModal } from '../Edit/MediaEditModal';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const { deleteItem } = useMediaStore();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClick = () => {
    if (item.source === 'link') {
      window.open(item.contentUrl, '_blank');
    }
  };

  return (
    <>
      <div 
        className={`bg-white rounded-lg border overflow-hidden hover:shadow-md transition-all ${
          item.source === 'link' ? 'cursor-pointer' : ''
        }`}
        style={{ borderColor: "#cec4c1" }}
      >
        <div className="aspect-video relative group">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            onClick={item.source === 'link' ? handleClick : undefined}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditModal(true);
              }}
              className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this item?')) {
                  deleteItem(item.id);
                }
              }}
              className="p-2 rounded-full bg-white text-red-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>
            {item.title}
            {item.source === 'link' && (
              <ExternalLink className="inline-block ml-2" size={14} />
            )}
          </h3>
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
      </div>

      {showEditModal && (
        <MediaEditModal 
          item={item} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </>
  );
}