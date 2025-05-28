import React from 'react';
import { format } from 'date-fns';
import { CalendarDay } from './CalendarDay';
import { CalendarDayType } from '../../types/calendar';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  days: CalendarDayType[];
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export function CalendarGrid({ days, onSelectDate, selectedDate }: CalendarGridProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center text-white/80 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {days.map(day => (
          <CalendarDay
            key={format(day.date, 'yyyy-MM-dd')}
            date={day.date}
            tasks={day.tasks}
            isSelected={selectedDate ? format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd') : false}
            onClick={() => onSelectDate(day.date)}
          />
        ))}
      </div>
    </div>
  );
}