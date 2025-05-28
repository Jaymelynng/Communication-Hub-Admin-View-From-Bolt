export type TaskChannel = 'social-media' | 'email-marketing' | 'in-gym-marketing' | 'misc';

export interface TaskCounts {
  email: number;
  social: number;
  inGym: number;
  misc: number;
}

export interface Task {
  id: number;
  title: string;
  templateId?: number;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
  dependencies?: number[];
  timeTracking?: {
    estimated: number;
    actual: number;
  };
  description: string;
  dueDate: string;
  goLiveDate?: string; // Added go live date
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  channel: TaskChannel;
  checklistItems: ChecklistItem[];
  assignedGyms?: string[];
  contentId?: string;
}

export interface TaskTemplate {
  id: number;
  name: string;
  description: string;
  defaultDuration?: number;
  checklistTemplate: string[];
  channel: TaskChannel;
}

export interface ChecklistItem {
  id: number;
  task: string;
  gyms: GymStatus[];
  dueDate?: string;
  assignedTo?: string;
}

export interface GymStatus {
  gymName: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
  assignedTo?: string;
}