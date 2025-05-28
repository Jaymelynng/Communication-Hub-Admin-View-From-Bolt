import React from 'react';
import { Upload } from 'lucide-react';

export function MediaUpload() {
  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: "#cec4c1" }}>
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
          multiple
          accept="image/*,video/*"
        />
        <label
          htmlFor="file-upload"
          className="px-6 py-2 rounded-lg text-white cursor-pointer"
          style={{ background: "#b48f8f" }}
        >
          Select Files
        </label>
      </div>
    </div>
  );
}