import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useTasks, useMarketingContent } from '../../hooks/useSupabase';
import { useAuth } from '../../context/AuthContext';

export function TasksOverview() {
  const { user } = useAuth();
  const { tasks: pastDueTasks } = useTasks({ status: 'pending', dueWithin: 0 });
  const { tasks: upcomingTasks } = useTasks({ 
    status: 'pending', 
    dueWithin: 7, 
    gymId: user?.role === 'manager' ? user.gymId : undefined 
  });
  const { content: assignedContent } = useMarketingContent({ 
    status: 'pending',
    gymId: user?.role === 'manager' ? user.gymId : undefined
  });
  
  return (
    <div className="bg-white rounded-lg border p-4 h-full" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium mb-6 flex items-center gap-2 text-[#8b8585]">
        <Clock size={20} />
        Tasks Overview
      </h2>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-[#b48f8f]">
            <AlertTriangle size={16} />
            Overdue Tasks
          </h3>
          <div className="space-y-1">
            {overdueTasks.map(task => (
              <Link 
                key={task.id}
                to={`/tasks/${task.id}`}
                className="block p-2 rounded-lg border hover:bg-[#f9fafb] transition-all"
                style={{ borderColor: "#cec4c1" }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[#8b8585]">{task.title}</h4>
                    <p className="text-sm text-[#b48f8f]">
                      Due {format(new Date(task.due_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-[#8b8585]">
          <CheckCircle size={16} />
          Due This Week
        </h3>
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
                  <h4 className="font-medium text-[#8b8585]">{task.title}</h4>
                  <p className="text-sm text-[#8f93a0]">
                    Due {format(new Date(task.due_date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {upcomingTasks.length === 0 && (
            <p className="text-center py-3 text-[#8f93a0]">No upcoming tasks this week</p>
          )}
        </div>
      </div>
      
      {/* Assigned Content */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2 text-[#8b8585]">
            <Calendar size={16} />
            Assigned Content
          </h3>
          <span className="text-xs text-[#8f93a0]">{assignedContent?.length || 0} items</span>
        </div>
        <div className="space-y-1">
          {assignedContent?.map(content => (
            <div
              key={content.id}
              className="p-2 rounded-lg border hover:bg-[#f9fafb] transition-all"
              style={{ borderColor: "#cec4c1" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[#8b8585] text-sm">{content.title}</h4>
                  <p className="text-xs text-[#8f93a0]">
                    Due {format(new Date(content.scheduled_date), 'MMM d, yyyy')}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                  {content.content_type}
                </span>
              </div>
            </div>
          ))}
          {!assignedContent?.length && (
            <p className="text-center py-2 text-xs text-[#8f93a0]">No content assigned</p>
          )}
        </div>
      </div>
    </div>
  );
}