import React from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useTasks } from '../../hooks/useSupabase';
import { useAuth } from '../../context/AuthContext';

export function TaskStatusOverview() {
  const { user } = useAuth();
  const { tasks: pastDueTasks } = useTasks({ status: 'pending', dueWithin: 0 });
  const { tasks: upcomingTasks } = useTasks({ 
    status: 'pending', 
    dueWithin: 7, 
    gymId: user?.role === 'manager' ? user.gymId : undefined 
  });
  
  return (
    <div className="bg-white rounded-lg border p-4 h-full" style={{ borderColor: "#cec4c1" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium flex items-center gap-2 text-[#8b8585]">
          <Clock size={20} />
          Task Status Overview
        </h2>
        <span className="text-sm text-[#8f93a0]">
          {format(new Date(), 'MMM d')} - {format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'MMM d')}
        </span>
      </div>

      {/* Past Due Tasks */}
      {pastDueTasks.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium flex items-center gap-2 text-red-600">
              <AlertTriangle size={16} />
              Past Due Tasks
            </h3>
            <span className="text-xs text-red-600">{pastDueTasks.length} tasks</span>
          </div>
          <div className="space-y-1">
            {pastDueTasks.map(task => (
              <Link 
                key={task.id}
                to={`/tasks/${task.id}`}
                className="block p-2 rounded-lg border hover:bg-red-50 transition-all"
                style={{ borderColor: "#cec4c1" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[#8b8585] text-sm">{task.title}</h4>
                    <p className="text-xs text-red-600">
                      Due {format(new Date(task.due_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                    Overdue
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2 text-[#8b8585]">
            <CheckCircle size={16} />
            Next 7 Days
          </h3>
          <span className="text-xs text-[#8f93a0]">{upcomingTasks.length} tasks</span>
        </div>
        <div className="space-y-1">
          {upcomingTasks.map(task => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="block p-2 rounded-lg border hover:bg-[#f9fafb] transition-all"
              style={{ borderColor: "#cec4c1" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[#8b8585] text-sm">{task.title}</h4>
                  <p className="text-xs text-[#8f93a0]">
                    Due {format(new Date(task.due_date), 'MMM d, yyyy')}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  Upcoming
                </span>
              </div>
            </Link>
          ))}
          {upcomingTasks.length === 0 && (
            <p className="text-center py-2 text-xs text-[#8f93a0]">No upcoming tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}