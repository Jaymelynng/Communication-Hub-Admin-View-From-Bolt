import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar, Clock, CheckSquare, Mail, Image, AlertCircle } from 'lucide-react';

// Types
interface CalendarItem {
  id: number;
  date: string;
  category: 'Social Media' | 'Email' | 'In-Gym';
  title: string;
  description: string;
  taskCount: number;
  status: 'pending' | 'completed' | 'overdue';
}

interface WeeklyCalendarProps {
  items?: CalendarItem[];
  onItemClick?: (item: CalendarItem) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ 
  items = [], 
  onItemClick = () => {} 
}) => {
  const [currentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  
  // Generate days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    return {
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      formattedDate: format(date, 'yyyy-MM-dd')
    };
  });

  // Get items for a specific day
  const getItemsForDay = (formattedDate: string) => {
    return items.filter(item => item.date === formattedDate);
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Social Media':
        return <Calendar size={16} className="text-purple-500" />;
      case 'Email':
        return <Mail size={16} className="text-blue-500" />;
      case 'In-Gym':
        return <Image size={16} className="text-green-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckSquare size={16} className="text-green-500" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-medium mb-6" style={{ color: "#8b8585" }}>Weekly Calendar</h2>
      
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map(day => (
          <div 
            key={day.formattedDate} 
            className="text-center"
          >
            <p className="font-medium" style={{ color: "#8b8585" }}>{day.dayName}</p>
            <p className="text-sm" style={{ color: "#737373" }}>{day.dayNumber}</p>
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map(day => {
          const dayItems = getItemsForDay(day.formattedDate);
          
          return (
            <div 
              key={day.formattedDate}
              className="min-h-[150px] border rounded-lg p-2 relative"
              style={{ borderColor: "#cec4c1", backgroundColor: "#f9fafb" }}
            >
              {dayItems.length > 0 ? (
                <div className="space-y-2">
                  {dayItems.map(item => (
                    <div
                      key={item.id}
                      className="p-2 rounded-lg cursor-pointer group relative"
                      style={{ 
                        backgroundColor: 
                          item.category === 'Social Media' ? '#f3e8ff' : 
                          item.category === 'Email' ? '#e0f2fe' : 
                          '#dcfce7',
                      }}
                      onClick={() => onItemClick(item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(item.category)}
                          <span className="text-xs font-medium truncate" style={{ color: "#8b8585" }}>
                            {item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title}
                          </span>
                        </div>
                        {getStatusIcon(item.status)}
                      </div>
                      
                      {/* Hover preview */}
                      <div 
                        className="absolute left-0 top-0 w-64 bg-white p-3 rounded-lg shadow-lg z-10 border invisible group-hover:visible transition-all"
                        style={{ borderColor: "#cec4c1" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(item.category)}
                          <span className="font-medium" style={{ color: "#8b8585" }}>{item.category}</span>
                        </div>
                        <h4 className="font-medium mb-1" style={{ color: "#8b8585" }}>{item.title}</h4>
                        <p className="text-xs mb-2" style={{ color: "#737373" }}>{item.description}</p>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "#737373" }}>
                          <Clock size={12} />
                          <span>{item.taskCount} tasks</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xs text-center" style={{ color: "#737373" }}>No items</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;