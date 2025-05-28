import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { MediaUploadModal } from './Upload/MediaUploadModal';

export function MediaHeader() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif" style={{ color: "#8b8585" }}>
            In-Gym Marketing Materials
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8b8585" }}>
            Access and manage all your marketing materials in one place
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 rounded-lg text-white flex items-center gap-2"
          style={{ background: "#b48f8f" }}
        >
          <Upload className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {showUploadModal && (
        <MediaUploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </header>
  );
}