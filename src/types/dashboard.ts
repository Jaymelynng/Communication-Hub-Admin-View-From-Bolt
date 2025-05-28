export interface Stat {
  title: string;
  count: string;
  icon: React.ComponentType<{ size?: number }>;
}

export interface CalendarDay {
  day: number;
  hasContent: boolean;
  isToday: boolean;
}