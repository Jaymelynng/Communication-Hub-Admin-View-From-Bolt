import { create } from 'zustand';
import { MaterialType } from '../types/media';

interface PrintTask {
  id: number;
  title: string;
  materialType: MaterialType;
  quantity?: number;
  dueDate: string;
  notes?: string;
  completed: boolean;
  completedAt?: string;
}

interface PrintTaskStore {
  printTasks: PrintTask[];
  addPrintTask: (task: Omit<PrintTask, 'id' | 'completed' | 'completedAt'>) => void;
  updatePrintTaskStatus: (id: number, completed: boolean) => void;
  deletePrintTask: (id: number) => void;
}

export const usePrintTaskStore = create<PrintTaskStore>((set) => ({
  printTasks: [],
  
  addPrintTask: (newTask) => set((state) => ({
    printTasks: [...state.printTasks, {
      ...newTask,
      id: Date.now(),
      completed: false
    }]
  })),
  
  updatePrintTaskStatus: (id, completed) => set((state) => ({
    printTasks: state.printTasks.map(task =>
      task.id === id
        ? {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : undefined
          }
        : task
    )
  })),
  
  deletePrintTask: (id) => set((state) => ({
    printTasks: state.printTasks.filter(task => task.id !== id)
  }))
}));