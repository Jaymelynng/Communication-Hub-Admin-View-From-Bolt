import React from 'react';
import { Bell, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface ImportantRemindersProps {
  dateRange: {
    start: Date;
    end: Date;
  };
}

interface Reminder {
  id: number;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'reminder' | 'update';
  status: 'pending' | 'in-progress' | 'completed';
}

export function ImportantReminders({ dateRange }: ImportantRemindersProps) {
  const reminders: Reminder[] = [
    {
      id: 1,
      title: "Holiday Campaign Review",
      dueDate: "Today at 2:00 PM",
      priority: "high",
      type: "reminder",
      status: "pending"
    },
    {
      id: 2,
      title: "End of Year Content Calendar",
      dueDate: "Tomorrow at 10:00 AM",
      priority: "medium",
      type: "update",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Social Media Assets Due",
      dueDate: "Dec 20, 2023",
      priority: "low",
      type: "reminder",
      status: "completed"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={16} className="text-yellow-500" />;
      default:
        return <AlertCircle size={16} className="text-[#b48f8f]" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Important Updates & Reminders</h2>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-start justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 text-sm">{reminder.title}</h3>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${reminder.type === 'reminder' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}
                  `}>
                    {reminder.type === 'reminder' ? 'Reminder' : 'Update'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{reminder.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-medium
                ${reminder.priority === 'high' ? 'bg-rose-100 text-rose-800' : ''}
                ${reminder.priority === 'medium' ? 'bg-amber-100 text-amber-800' : ''}
                ${reminder.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
              `}>
                {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
              </span>
              {getStatusIcon(reminder.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}