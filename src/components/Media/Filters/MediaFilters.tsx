import React from 'react';
import { WeekSelector } from './WeekSelector';
import { useMediaStore } from '../../../store/mediaStore';

export function MediaFilters() {
  const { selectedWeek, setSelectedWeek } = useMediaStore();

  return (
    <div className="mb-8">
      <WeekSelector
        value={selectedWeek}
        onChange={setSelectedWeek}
      />
    </div>
  );
}