import React from 'react';
import { MaterialType } from '../../../types/media';

const types: (MaterialType | 'All')[] = [
  'All',
  'Sticker',
  'Quarter Sheet',
  'Full Sheet',
  'Poster',
  'Banner'
];

interface TypeSelectorProps {
  value: MaterialType | 'All';
  onChange: (type: MaterialType | 'All') => void;
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            value === type
              ? 'bg-[#b48f8f] text-white'
              : 'bg-white text-[#737373] hover:bg-gray-50'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}