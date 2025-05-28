import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Winter Competition",
    date: "2024-12-15",
    gym: "Capital Gymnastics Cedar Park"
  },
  {
    id: 2,
    title: "Holiday Camp",
    date: "2024-12-20",
    gym: "Houston Gymnastics Academy"
  }
];

export function EventList() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-medium mb-6 text-[#8b8585]">Upcoming Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border rounded-lg hover:shadow-md transition-all"
            style={{ borderColor: "#cec4c1" }}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-[#b48f8f]" />
              <h3 className="font-medium text-[#8b8585]">{event.title}</h3>
            </div>
            <p className="text-sm text-[#737373] mt-1">{event.gym}</p>
            <p className="text-sm text-[#737373]">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}