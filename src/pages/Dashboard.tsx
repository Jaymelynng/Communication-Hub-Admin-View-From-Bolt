import React, { useState, useEffect } from 'react';
import { StatsGrid } from '../components/Dashboard/StatsGrid';
import { NewsUpdates } from '../components/Dashboard/NewsUpdates';
import { CalendarView } from '../components/Calendar/CalendarView';

export function Dashboard() {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return (
    <div className="space-y-6">
      <StatsGrid />
      <NewsUpdates dateRange={dateRange} />
      <CalendarView />
    </div>
  );
}