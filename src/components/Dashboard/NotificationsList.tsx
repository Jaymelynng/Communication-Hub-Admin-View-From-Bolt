import React from 'react';
import { Bell } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { addDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

export function NotificationsList() {
  const { tasks } = useTaskStore();
  const today = new Date();
  const twoDaysFromNow = addDays(today, 2);

  // Get tasks due in next 2 days
  const upcomingTasks = tasks
    .filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate <= twoDaysFromNow;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const getChannelType = (task: string): string => {
    if (task.toLowerCase().includes('email') || task.toLowerCase().includes('campaign')) {
      return 'Email Marketing';
    } else if (task.toLowerCase().includes('social') || task.toLowerCase().includes('post')) {
      return 'Social Media';
    }
    return 'In-Gym Marketing';
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2" style={{ color: "#8b8585" }}>
        <Bell size={20} />
        Tasks Due Soon
      </h2>
      {upcomingTasks.length > 0 ? (
        <ul className="space-y-3">
          {upcomingTasks.map((task) => (
            <Link key={task.id} to={`/tasks/${task.id}`}>
              <li
                className="p-4 rounded-lg border hover:shadow-md transition-all"
                style={{ borderColor: "#cec4c1", color: "#737373" }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm">
                        {getChannelType(task.title)}
                      </span>
                      <span className="text-sm">
                        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-4">No tasks due in the next 2 days</p>
      )}
    </div>
  );
}