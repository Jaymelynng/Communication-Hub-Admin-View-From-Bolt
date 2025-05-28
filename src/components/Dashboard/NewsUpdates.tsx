import React, { useState } from 'react';
import { AlertCircle, Info, Clock, CheckCircle, Calendar, ChevronDown, ChevronUp, ChevronRight, Bell } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { useNewsUpdates, useTasks } from '../../hooks/useSupabase';
import { Link } from 'react-router-dom';

interface NewsUpdatesProps {
  dateRange: {
    start: Date;
    end: Date;
  };
}

export function NewsUpdates({ dateRange }: NewsUpdatesProps) {
  const { news, loading, error } = useNewsUpdates();
  const { tasks: overdueTasks } = useTasks({ status: 'pending', dueWithin: 0 });
  const { tasks: upcomingTasks } = useTasks({ status: 'pending', dueWithin: 7 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStatusIcon = (category: string) => {
    switch (category) {
      case 'alert':
        return <AlertCircle size={16} className="text-red-500" />;
      case 'update':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="space-y-4 min-h-[200px]">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="animate-pulse p-4 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
                <div className="flex gap-2">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-lg">
        Failed to load updates. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4 h-full" style={{ borderColor: "#cec4c1" }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-[#8b8585] flex items-center gap-2">
          <Bell size={20} />
          Updates & Reminders
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#737373]">
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-600">
            {overdueTasks.length} Overdue
          </span>
          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
            {upcomingTasks.length} Due Soon
          </span>
        </div>
      </div>

      <div className="space-y-3">
      {news.slice(0, 3).map((item) => (
        <div
          key={item.id}
          className={`relative rounded-lg border transform-gpu transition-all duration-200 overflow-hidden ${
            item.priority > 1 ? 'bg-rose-50/50' : 'bg-white'
          } hover:shadow-md will-change-transform cursor-pointer group`}
          style={{ borderColor: "#cec4c1" }}
        >
          <div className="flex items-start gap-3 p-3">
            <div className="mt-1 flex-shrink-0">{getStatusIcon(item.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[#8b8585] mb-1">{item.title}</h3>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className={`px-2 py-1 rounded-full ${
                  item.type === 'update' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'alert' ? 'bg-red-100 text-red-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <span className="text-[#737373] flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date && isValid(parseISO(item.date)) 
                    ? format(parseISO(item.date), 'MMM d, yyyy')
                    : 'No date'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => toggleExpand(item.id)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {expandedId === item.id ? (
                <ChevronUp size={16} className="text-[#737373]" />
              ) : (
                <ChevronDown size={16} className="text-[#737373]" />
              )}
            </button>
          </div>
          {expandedId === item.id && (
            <div 
              className="absolute left-0 right-0 top-full z-10 px-4 py-3 border-t bg-white shadow-lg rounded-b-lg"
              style={{ borderColor: "#cec4c1" }}
            >
              <p className="text-sm text-[#8f93a0] whitespace-pre-line">{item.content}</p>
              {item.itemType === 'task' && (
                <Link
                  to={`/tasks/${item.id}`}
                  className="mt-2 text-sm text-[#b48f8f] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  View Task Details
                  <ChevronRight size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
      {news.length > 3 && (
        <Link
          to="/news"
          className="block text-center text-sm text-[#b48f8f] hover:underline py-2"
        >
          View All Updates ({news.length - 3} more)
        </Link>
      )}
      </div>
    </div>
  );
}