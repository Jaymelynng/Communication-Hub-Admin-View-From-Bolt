import { create } from 'zustand';
import { Task, TaskChannel, TaskCounts } from '../types/tasks';
import { format } from 'date-fns';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (taskId: number) => void;
  updateTaskStatus: (taskId: number, gymName: string, completed: boolean) => void;
  getTasksByDate: (date: string) => TaskCounts;
  getTasksForDateRange: (startDate: Date, endDate: Date) => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  
  addTask: (newTask) => set((state) => ({
    tasks: [...state.tasks, { 
      ...newTask, 
      id: Math.max(...state.tasks.map(t => t.id), 0) + 1,
      status: 'pending',
      createdAt: new Date().toISOString()
    }]
  })),
  
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  
  updateTaskStatus: (taskId, gymName, completed) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            checklistItems: task.checklistItems.map((item) => ({
              ...item,
              gyms: item.gyms.map((gym) =>
                gym.gymName === gymName
                  ? {
                      ...gym,
                      completed,
                      completedAt: completed ? new Date().toISOString() : undefined,
                    }
                  : gym
              ),
            })),
          };
        }
        return task;
      }),
    })),

  getTasksByDate: (date) => {
    const tasks = get().tasks;
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    
    return {
      email: tasks.filter(t => t.channel === 'email-marketing' && format(new Date(t.dueDate), 'yyyy-MM-dd') === formattedDate).length,
      social: tasks.filter(t => t.channel === 'social-media' && format(new Date(t.dueDate), 'yyyy-MM-dd') === formattedDate).length,
      inGym: tasks.filter(t => t.channel === 'in-gym-marketing' && format(new Date(t.dueDate), 'yyyy-MM-dd') === formattedDate).length,
      misc: tasks.filter(t => t.channel === 'misc' && format(new Date(t.dueDate), 'yyyy-MM-dd') === formattedDate).length
    };
  },
  
  getTasksForDateRange: (startDate, endDate) => {
    const tasks = get().tasks;
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate >= startDate && taskDate <= endDate;
    });
  }
}));