import React, { useState } from 'react';
import { useMediaStore } from '../../store/mediaStore';
import { MaterialType, ContentSource } from '../../types/media';

export function ContentForm() {
  const { addItem } = useMediaStore();
  const [contentSource, setContentSource] = useState<ContentSource>('link');
  const [formData, setFormData] = useState({
    title: '',
    type: 'Sticker' as MaterialType,
    dimensions: '',
    notes: '',
    file: null as File | null,
    thumbnailFile: null as File | null,
    contentUrl: '',
    week: '2024-12-02'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      source: contentSource,
      thumbnail: contentSource === 'file' && formData.thumbnailFile 
        ? URL.createObjectURL(formData.thumbnailFile)
        : 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe',
      contentUrl: contentSource === 'file' && formData.file 
        ? URL.createObjectURL(formData.file)
        : formData.contentUrl,
      uploadedAt: formData.week,
      uploadedBy: 'Jayme',
      dimensions: formData.dimensions,
      notes: formData.notes
    };

    addItem(newItem);
    setFormData({
      title: '',
      type: 'Sticker',
      dimensions: '',
      notes: '',
      file: null,
      thumbnailFile: null,
      contentUrl: '',
      week: '2024-12-02'
    });
  };

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium mb-6 text-[#8b8585]">Add Marketing Material</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">Content Source</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setContentSource('link')}
              className={`px-4 py-2 rounded-lg ${
                contentSource === 'link'
                  ? 'bg-[#b48f8f] text-white'
                  : 'bg-gray-100 text-[#737373]'
              }`}
            >
              External Link
            </button>
            <button
              type="button"
              onClick={() => setContentSource('file')}
              className={`px-4 py-2 rounded-lg ${
                contentSource === 'file'
                  ? 'bg-[#b48f8f] text-white'
                  : 'bg-gray-100 text-[#737373]'
              }`}
            >
              File Upload
            </button>
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">Week</label>
          <select
            value={formData.week}
            onChange={e => setFormData(prev => ({ ...prev, week: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
          >
            <option value="2024-12-02">December 2-8, 2024</option>
            <option value="2024-12-09">December 9-15, 2024</option>
            <option value="2024-12-16">December 16-22, 2024</option>
            <option value="2024-12-23">December 23-29, 2024</option>
          </select>
        </div>

        {contentSource === 'link' ? (
          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Content URL</label>
            <input
              type="url"
              value={formData.contentUrl}
              onChange={e => setFormData(prev => ({ ...prev, contentUrl: e.target.value }))}
              placeholder="https://www.canva.com/design/..."
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              required
            />
            <p className="text-xs text-[#737373] mt-1">
              Paste the Canva link or other external URL here
            </p>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373]">Upload File</label>
              <input
                type="file"
                onChange={e => setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373]">
                Thumbnail Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setFormData(prev => ({ ...prev, thumbnailFile: e.target.files?.[0] || null }))}
                className="w-full"
              />
              <p className="text-xs text-[#737373] mt-1">
                Upload a smaller preview image. If not provided, a default thumbnail will be used.
              </p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg text-white"
          style={{ background: "#b48f8f" }}
        >
          Add Material
        </button>
      </form>
    </div>
  );
}