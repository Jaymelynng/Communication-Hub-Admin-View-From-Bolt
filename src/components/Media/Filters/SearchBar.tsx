import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex-1 relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
        style={{ color: "#737373" }} 
      />
      <input
        type="text"
        placeholder="Search materials..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#b48f8f] focus:border-transparent"
        style={{ borderColor: "#cec4c1" }}
      />
    </div>
  );
}