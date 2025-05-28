import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useEmailStore } from '../../store/emailStore';

export function ContentCalendar() {
  const { tasks } = useTaskStore();
  const { emails } = useEmailStore();

  // Combine and sort all content by date
  const allContent = [
    ...tasks.map(task => ({
      type: 'task',
      title: task.title,
      date: task.dueDate,
      status: task.status
    })),
    ...emails.map(email => ({
      type: 'email',
      title: email.title,
      date: email.scheduledDate,
      status: email.status
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium mb-6 text-[#8b8585]">Content Calendar</h2>
      
      <div className="space-y-4">
        {allContent.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-[#737373] mb-2">
                  {item.type}
                </span>
                <h3 className="font-medium text-[#8b8585]">{item.title}</h3>
              </div>
              <span className="text-sm text-[#737373]">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}