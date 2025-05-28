export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'task' | 'content';
  description?: string;
  link?: string;
}

export interface CalendarDayType {
  date: Date;
  tasks?: {
    email?: number;
    social?: number;
    inGym?: number;
    content?: {
      title: string;
      type: string;
      description: string;
    }[];
  };
  isToday: boolean;
}

export interface DayDetails {
  tasks: {
    email: number;
    social: number;
    inGym: number;
    misc: number;
  };
  emails: Array<{
    id: number;
    title: string;
    scheduledDate: string;
  }>;
}

export interface TaskItem {
  id: number;
  title: string;
  checklist: string[];
  due: string;
}

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  time: string;
  link: string;
  description: string;
  managerChecklist?: string[];
  supportChecklist?: string[];
}

export interface CalendarState {
  selectedDate: Date | null;
  currentMonth: Date;
}