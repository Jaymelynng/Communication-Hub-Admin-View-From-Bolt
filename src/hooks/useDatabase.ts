import { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { GYMS } from '../utils/constants';
import { Task, ChecklistItem } from '../types/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = async () => {
    try {
      const result = await db.execute(`
        SELECT t.*, GROUP_CONCAT(ta.gym_name) as assigned_gyms,
        GROUP_CONCAT(ci.text) as checklist_items
        FROM tasks t
        LEFT JOIN task_assignments ta ON t.id = ta.task_id
        LEFT JOIN checklist_items ci ON t.id = ci.task_id
        GROUP BY t.id
      `);

      const fetchedTasks = result.rows.map(row => ({
        id: row.id as number,
        title: row.title as string,
        description: row.description as string,
        dueDate: row.due_date as string,
        status: row.status as string,
        priority: row.priority as string,
        checklistItems: (row.checklist_items as string || '')
          .split(',')
          .filter(Boolean)
          .map((text, id) => ({
            id,
            task: text,
            gyms: GYMS.map(gymName => ({
              gymName,
              completed: false
            }))
          }))
      }));

      setTasks(fetchedTasks);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const result = await db.execute({
        sql: `INSERT INTO tasks (title, description, due_date, priority) VALUES (?, ?, ?, ?) RETURNING id`,
        args: [task.title, task.description, task.dueDate, task.priority]
      });

      const taskId = result.rows[0].id as number;

      // Add checklist items
      for (const item of task.checklistItems) {
        await db.execute({
          sql: `INSERT INTO checklist_items (task_id, text) VALUES (?, ?)`,
          args: [taskId, item.task]
        });
      }

      // Assign to all gyms
      for (const gym of GYMS) {
        await db.execute({
          sql: `INSERT INTO task_assignments (task_id, gym_name) VALUES (?, ?)`,
          args: [taskId, gym]
        });
      }

      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add task'));
    }
  };

  const updateTaskStatus = async (taskId: number, gymName: string, completed: boolean) => {
    try {
      await db.execute({
        sql: `UPDATE task_assignments 
              SET completed = ?, 
                  completed_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END
              WHERE task_id = ? AND gym_name = ?`,
        args: [completed, completed, taskId, gymName]
      });
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task status'));
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await db.execute({
        sql: `DELETE FROM tasks WHERE id = ?`,
        args: [taskId]
      });
      await fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, updateTaskStatus, deleteTask };
}