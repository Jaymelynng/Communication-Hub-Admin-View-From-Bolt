import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentMonth, onPreviousMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <h1 className="text-3xl font-serif text-white">
        {format(currentMonth, 'MMMM yyyy')}
      </h1>
      <div className="flex gap-2">
        <button
          onClick={onPreviousMonth}
          className="p-2 rounded-lg text-white transition-all duration-300 hover:bg-white/20 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg text-white transition-all duration-300 hover:bg-white/20 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}