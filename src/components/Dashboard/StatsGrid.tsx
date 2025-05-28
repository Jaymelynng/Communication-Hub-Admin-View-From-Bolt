import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useTasks, useMarketingItems } from '../../hooks/useSupabase';
import { PageHeader } from '../Layout/PageHeader';
import { format } from 'date-fns';

export function StatsGrid() {
  const { tasks: overdueTasks } = useTasks({ status: 'pending', dueWithin: 0 });
  const { tasks: todayTasks } = useTasks({ status: 'pending', dueWithin: 1 });
  const { tasks: completedTasks } = useTasks({ status: 'completed' });
  const today = new Date();

  if (!overdueTasks || !todayTasks || !completedTasks) {
    return <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
      ))}
    </div>;
  }

  const stats = [
    { 
      title: "Overdue Tasks", 
      count: overdueTasks.length, 
      icon: AlertTriangle,
      description: "Need immediate attention"
    },
    { 
      title: "Due Today", 
      count: todayTasks.length, 
      icon: Clock,
      description: "Tasks due today"
    },
    { 
      title: "Completed Tasks", 
      count: completedTasks.length, 
      icon: CheckCircle,
      description: "Last 7 days"
    }
  ];

  return (
    <div className="bg-[#b48f8f] rounded-lg shadow-lg p-6">
      <PageHeader
        title={`Marketing Overview - ${format(today, 'MMMM d, yyyy')}`}
        description="Real-time status of marketing activities across all gyms"
      />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const overdueGyms = stat.title === "Overdue Tasks" && stat.count > 0 ? [
            "Capital Gymnastics Cedar Park: 2 tasks overdue",
            "Houston Gymnastics Academy: 1 task overdue"
          ] : undefined;

          return (
            <div
              key={index}
              className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all hover:bg-white/20 group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon size={20} className="text-white/80 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-4xl font-bold text-white mb-1">{stat.count}</p>
              <h3 className="text-sm font-medium text-white/90">{stat.title}</h3>
              <p className="text-xs text-white/70 mt-1">{stat.description}</p>
              {overdueGyms && stat.count > 0 && (
                <div className="absolute invisible group-hover:visible bg-white rounded-lg shadow-lg p-3 w-64 text-left transform translate-y-full bottom-0 left-1/2 -translate-x-1/2 z-10">
                  <h4 className="text-[#b48f8f] font-medium mb-2">Overdue Tasks by Gym:</h4>
                  <ul className="space-y-1">
                    {overdueGyms.map((gym, i) => (
                      <li key={i} className="text-sm text-gray-600">{gym}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}