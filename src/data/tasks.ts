import { Task } from '../types/tasks';

export const tasks: Task[] = [
  {
    id: 1,
    title: "Winter Competition Prep",
    description: "Prepare marketing materials for the upcoming winter competition season",
    dueDate: "2024-12-15",
    status: "in-progress",
    priority: "high",
    checklistItems: [
      {
        id: 1,
        task: "Create social media graphics",
        gyms: [
          { gymName: "Capital Gymnastics Cedar Park", completed: true, completedAt: "2024-03-15" },
          { gymName: "Houston Gymnastics Academy", completed: false },
          { gymName: "Scottsdale Gymnastics", completed: true, completedAt: "2024-03-14" }
        ]
      },
      {
        id: 2,
        task: "Schedule email campaigns",
        gyms: [
          { gymName: "Capital Gymnastics Cedar Park", completed: false },
          { gymName: "Houston Gymnastics Academy", completed: false },
          { gymName: "Scottsdale Gymnastics", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Holiday Camp Marketing",
    description: "Develop and distribute holiday camp promotional materials",
    dueDate: "2024-12-01",
    status: "pending",
    priority: "medium",
    checklistItems: [
      {
        id: 1,
        task: "Design camp flyers",
        gyms: [
          { gymName: "Capital Gymnastics Cedar Park", completed: false },
          { gymName: "Houston Gymnastics Academy", completed: true, completedAt: "2024-03-10" }
        ]
      }
    ]
  }
];