import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export function CalendarNavigation({ onPrevious, onNext }: CalendarNavigationProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onPrevious}
        className="p-3 rounded-lg hover:bg-gray-100"
      >
        <ChevronLeft size={24} className="text-[#737373]" />
      </button>
      <button
        onClick={onNext}
        className="p-3 rounded-lg hover:bg-gray-100"
      >
        <ChevronRight size={24} className="text-[#737373]" />
      </button>
    </div>
  );
}