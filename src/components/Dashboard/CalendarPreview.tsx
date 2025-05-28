import React from 'react';
import { format } from 'date-fns';

export function CalendarPreview() {
  const generateCalendarDays = () => {
    const today = new Date().getDate();
    return Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      hasContent: [15, 20, 25].includes(i + 1),
      isToday: i + 1 === today
    }));
  };

  return (
    <div className="bg-[#d7dcdd] p-8 rounded-lg">
      <h2 className="text-xl font-medium mb-6" style={{ color: "#8b8585" }}>
        Calendar Preview - {format(new Date(), 'MMMM yyyy')}
      </h2>
      <div className="grid grid-cols-7 gap-4">
        {generateCalendarDays().map(({ day, hasContent }, index) => (
          <div
            key={index}
            className="w-full aspect-square rounded-lg cursor-pointer transition-all p-4 bg-[#b48f8f] flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl text-white">
                {day}
              </span>
            </div>
            {hasContent && (
              <div>
                <span className="text-sm text-white">Tasks</span>
                <span className="block text-sm text-white">Content</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}