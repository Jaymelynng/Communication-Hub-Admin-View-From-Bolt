import React, { useState } from 'react';
import { Upload, X, Link as LinkIcon, Printer } from 'lucide-react';
import { useMediaStore } from '../../../store/mediaStore';
import { usePrintTaskStore } from '../../../store/printTaskStore';
import { MaterialType } from '../../../types/media';

interface MediaUploadModalProps {
  onClose: () => void;
}

export function MediaUploadModal({ onClose }: MediaUploadModalProps) {
  const { addItem } = useMediaStore();
  const { addPrintTask } = usePrintTaskStore();
  const [uploadType, setUploadType] = useState<'file' | 'link'>('link');
  const [formData, setFormData] = useState({
    title: '',
    type: 'Sticker' as MaterialType,
    dimensions: '',
    notes: '',
    file: null as File | null,
    thumbnailFile: null as File | null,
    contentUrl: '',
    // Print task related fields
    createPrintTask: false,
    printDate: '',
    quantity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      source: uploadType,
      thumbnail: formData.thumbnailFile 
        ? URL.createObjectURL(formData.thumbnailFile)
        : 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe',
      contentUrl: uploadType === 'link' 
        ? formData.contentUrl 
        : (formData.file ? URL.createObjectURL(formData.file) : ''),
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: 'Jayme',
      dimensions: formData.dimensions,
      notes: formData.notes
    };

    addItem(newItem);

    // Create print task if requested
    if (formData.createPrintTask && formData.printDate) {
      addPrintTask({
        title: `Print: ${formData.title}`,
        materialType: formData.type,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
        dueDate: formData.printDate,
        notes: formData.notes
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#8b8585]">Upload Marketing Material</h2>
          <button onClick={onClose} className="text-[#737373] hover:text-[#8b8585]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUploadType('link')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                uploadType === 'link' 
                  ? 'bg-[#b48f8f] text-white'
                  : 'bg-gray-100 text-[#737373]'
              }`}
            >
              <LinkIcon size={16} />
              Canva Link
            </button>
            <button
              type="button"
              onClick={() => setUploadType('file')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                uploadType === 'file'
                  ? 'bg-[#b48f8f] text-white'
                  : 'bg-gray-100 text-[#737373]'
              }`}
            >
              <Upload size={16} />
              File Upload
            </button>
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

          {uploadType === 'link' ? (
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
              <p className="text-xs text-[#737373] mt-1">
                Paste your Canva design link or other external URL here
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
            </>
          )}

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
              Upload a preview image. If not provided, a default thumbnail will be used.
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

          <div className="border-t pt-6" style={{ borderColor: "#cec4c1" }}>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="createPrintTask"
                checked={formData.createPrintTask}
                onChange={e => setFormData(prev => ({ ...prev, createPrintTask: e.target.checked }))}
                className="rounded text-[#b48f8f]"
              />
              <label htmlFor="createPrintTask" className="text-sm font-medium text-[#737373] flex items-center gap-2">
                <Printer size={16} />
                Create Print Task
              </label>
            </div>

            {formData.createPrintTask && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#737373]">
                    Print Date
                  </label>
                  <input
                    type="date"
                    value={formData.printDate}
                    onChange={e => setFormData(prev => ({ ...prev, printDate: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: "#cec4c1" }}
                    required={formData.createPrintTask}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#737373]">
                    Quantity to Print
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{ borderColor: "#cec4c1" }}
                    placeholder="Number of copies needed"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2"
            style={{ background: "#b48f8f" }}
          >
            {uploadType === 'link' ? <LinkIcon className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
            {uploadType === 'link' ? 'Add Link' : 'Upload Material'}
          </button>
        </form>
      </div>
    </div>
  );
}