import React, { useState, useEffect } from 'react';
import { X, Link as LinkIcon, Upload } from 'lucide-react';
import { useMediaStore } from '../../../store/mediaStore';
import { MaterialType, MediaItem } from '../../../types/media';

interface MediaEditModalProps {
  item: MediaItem;
  onClose: () => void;
}

export function MediaEditModal({ item, onClose }: MediaEditModalProps) {
  const { updateItem } = useMediaStore();
  const [formData, setFormData] = useState({
    title: item.title,
    type: item.type,
    dimensions: item.dimensions || '',
    notes: item.notes || '',
    contentUrl: item.contentUrl || '',
    thumbnailFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedItem = {
      ...item,
      title: formData.title,
      type: formData.type,
      thumbnail: formData.thumbnailFile 
        ? URL.createObjectURL(formData.thumbnailFile)
        : item.thumbnail,
      contentUrl: formData.contentUrl || item.contentUrl,
      dimensions: formData.dimensions,
      notes: formData.notes
    };

    updateItem(updatedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#8b8585]">Edit Marketing Material</h2>
          <button onClick={onClose} className="text-[#737373] hover:text-[#8b8585]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Material Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as MaterialType }))}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
            >
              <option value="Sticker">Sticker</option>
              <option value="Quarter Sheet">Quarter Sheet</option>
              <option value="Full Sheet">Full Sheet</option>
              <option value="Poster">Poster</option>
              <option value="Banner">Banner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Dimensions</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={e => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
              placeholder="e.g., 8.5x11 inches"
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
            />
          </div>

          {item.source === 'link' && (
            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373]">
                Canva Link or External URL
              </label>
              <input
                type="url"
                value={formData.contentUrl}
                onChange={e => setFormData(prev => ({ ...prev, contentUrl: e.target.value }))}
                placeholder="https://www.canva.com/design/..."
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "#cec4c1" }}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">
              New Thumbnail Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFormData(prev => ({ ...prev, thumbnailFile: e.target.files?.[0] || null }))}
              className="w-full"
            />
            <p className="text-xs text-[#737373] mt-1">
              Upload a new preview image only if you want to change it
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Optional printing instructions or other notes"
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2"
            style={{ background: "#b48f8f" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}