import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDocumentStore } from '../../store/documentStore';

export function DocumentUpload() {
  const { user } = useAuth();
  const { addDocument } = useDocumentStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addDocument({
      ...formData,
      status: 'pending',
      submittedBy: user.name,
      gymId: user.gymId || '',
    });

    setFormData({ title: '', description: '', fileUrl: '' });
  };

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Document Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            rows={3}
            required
          />
        </div>

        <div className="border-2 border-dashed rounded-lg p-8 text-center" 
             style={{ borderColor: "#cec4c1" }}>
          <div className="flex flex-col items-center">
            <Upload size={48} className="text-[#b48f8f] mb-4" />
            <h3 className="text-lg font-medium text-[#8b8585] mb-2">
              Drop files to upload
            </h3>
            <p className="text-sm text-[#737373] mb-4">
              or click to select files
            </p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // In a real implementation, you would upload the file to your server
                  // and get back a URL. For now, we'll create a fake URL
                  setFormData(prev => ({
                    ...prev,
                    fileUrl: URL.createObjectURL(file)
                  }));
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="px-6 py-2 rounded-lg text-white cursor-pointer bg-[#b48f8f]"
            >
              Select File
            </label>
          </div>
        </div>

        {formData.fileUrl && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-[#737373]">File selected</span>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, fileUrl: '' }))}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-8 py-3 rounded-lg text-white bg-[#b48f8f]"
        >
          Submit Document
        </button>
      </form>
    </div>
  );
}