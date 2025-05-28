import React, { useState } from 'react';
import { Download, Eye, X } from 'lucide-react';

interface MediaCardImageProps {
  thumbnail: string;
  title: string;
  downloadUrl: string;
}

export function MediaCardImage({ thumbnail, title, downloadUrl }: MediaCardImageProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="aspect-video relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center gap-4 opacity-0 hover:opacity-100">
          <button
            onClick={() => setShowPreview(true)}
            className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100"
          >
            <Eye className="w-5 h-5" />
          </button>
          <a 
            href={downloadUrl} 
            download
            className="p-2 rounded-full bg-white text-gray-800 hover:bg-gray-100"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
            <img
              src={downloadUrl}
              alt={title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}