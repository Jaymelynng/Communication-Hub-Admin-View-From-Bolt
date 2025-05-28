import React, { useState } from 'react';
import { addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { CalendarHeader } from '../components/Calendar/CalendarHeader';
import { CalendarGrid } from '../components/Calendar/CalendarGrid';
import { DayDetailsPanel } from '../components/Calendar/DayDetailsPanel';
import { CalendarDay, DayDetails } from '../types/calendar';

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const generateCalendarDays = (): CalendarDay[] => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return days.map(date => ({
      date,
      hasTasks: [15, 20, 25].includes(date.getDate()),
      hasContent: [15, 20].includes(date.getDate()),
      isToday: isSameDay(date, new Date())
    }));
  };

  const getDayDetails = (date: Date): DayDetails => ({
    tasks: [
      {
        id: 1,
        title: "Upload Thanksgiving Photos",
        checklist: ["Upload photos", "Select top 3", "Add overlays", "Schedule posts"],
        due: "10:00 AM"
      }
    ],
    content: [
      {
        id: 1,
        title: "Holiday Special Promotion",
        time: "2:00 PM",
        link: "https://example.com"
      }
    ]
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 bg-[#d7dcdd]">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <CalendarHeader
            currentMonth={currentMonth}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
          />
          <CalendarGrid
            days={generateCalendarDays()}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </div>
      </div>
      {selectedDate && (
        <DayDetailsPanel
          selectedDate={selectedDate}
          details={getDayDetails(selectedDate)}
        />
      )}
    </div>
  );
}