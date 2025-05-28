import React from 'react';
import { startOfWeek, addWeeks, format } from 'date-fns';

interface WeekSelectorProps {
  selectedWeek: string;
  onWeekChange: (week: string) => void;
}

export function WeekSelector({ selectedWeek, onWeekChange }: WeekSelectorProps) {
  const generateWeekOptions = () => {
    const weeks = [];
    const today = new Date();
    const startWeek = startOfWeek(today);

    for (let i = 0; i < 8; i++) {
      const weekStart = addWeeks(startWeek, i);
      const weekString = format(weekStart, 'yyyy-MM-dd');
      const weekLabel = `Week of ${format(weekStart, 'MMM d, yyyy')}`;
      weeks.push({ value: weekString, label: weekLabel });
    }

    return weeks;
  };

  return (
    <select
      value={selectedWeek}
      onChange={(e) => onWeekChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg border text-[#737373]"
      style={{ borderColor: "#cec4c1" }}
    >
      <option value="">Select a week...</option>
      {generateWeekOptions().map((week) => (
        <option key={week.value} value={week.value}>
          {week.label}
        </option>
      ))}
    </select>
  );
}