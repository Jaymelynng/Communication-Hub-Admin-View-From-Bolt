import React from 'react';

const weeks = [
  { value: "2024-12-02", label: "December 2-8, 2024" },
  { value: "2024-12-09", label: "December 9-15, 2024" },
  { value: "2024-12-16", label: "December 16-22, 2024" },
  { value: "2024-12-23", label: "December 23-29, 2024" }
];

interface WeekSelectorProps {
  value: string;
  onChange: (week: string) => void;
}

export function WeekSelector({ value, onChange }: WeekSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-64 px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#b48f8f] focus:border-transparent"
      style={{ borderColor: "#cec4c1" }}
    >
      {weeks.map(week => (
        <option key={week.value} value={week.value}>
          {week.label}
        </option>
      ))}
    </select>
  );
}