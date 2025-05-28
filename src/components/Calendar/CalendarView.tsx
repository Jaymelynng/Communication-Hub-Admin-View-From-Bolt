import React, { useState } from 'react';
import { addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, format } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { DayDetailsPanel } from './DayDetailsPanel';
import { CalendarDayType } from '../../types/calendar';
import { useTaskStore } from '../../store/taskStore';
import { useEmailStore } from '../../store/emailStore';

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const taskStore = useTaskStore();
  const { emails } = useEmailStore();

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const generateCalendarDays = (): CalendarDayType[] => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return days.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const taskCounts = taskStore.getTasksByDate(dateStr);
      
      const dayTasks = {
        email: emails.filter(e => e.scheduledDate.startsWith(dateStr)).length,
        social: taskCounts.social,
        inGym: taskCounts.inGym
      };

      return {
        date,
        tasks: dayTasks,
        isToday: isSameDay(date, new Date())
      };
    }).filter(Boolean);
  };

  const getDayDetails = (date: Date): DayDetails => {
    const dateStr = date.toISOString().split('T')[0];
    const taskCounts = taskStore.getTasksByDate(dateStr);
    const dayEmails = emails.filter(e => e.scheduledDate.startsWith(dateStr));

    return {
      tasks: {
        email: taskCounts.email,
        social: taskCounts.social,
        inGym: taskCounts.inGym,
        misc: taskCounts.misc
      },
      emails: dayEmails
    };
  };

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="bg-[#b48f8f] rounded-lg shadow-lg overflow-hidden">
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
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}