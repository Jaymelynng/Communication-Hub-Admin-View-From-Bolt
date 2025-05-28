import React, { useState } from 'react';
import WeeklyCalendar from '../components/Calendar/WeeklyCalendar';
import { X, Calendar as CalIcon, List, Grid } from 'lucide-react';

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

const CalendarView = () => {
  const [view, setView] = useState<'week' | 'month' | 'list'>('week');
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);

  // Mock data
  const mockItems: CalendarItem[] = [
    {
      id: 1,
      date: '2024-12-04', // Wednesday of current week
      category: 'Social Media',
      title: 'Instagram Post: Winter Camp',
      description: 'Promotional post for winter camp registration',
      taskCount: 3,
      status: 'pending'
    },
    {
      id: 2,
      date: '2024-12-04', // Wednesday of current week
      category: 'Email',
      title: 'December Newsletter',
      description: 'Monthly newsletter with winter camp details',
      taskCount: 1,
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-12-06', // Friday of current week
      category: 'In-Gym',
      title: 'Winter Camp Flyers',
      description: 'Print and distribute winter camp flyers',
      taskCount: 2,
      status: 'pending'
    },
    {
      id: 4,
      date: '2024-12-07', // Saturday of current week
      category: 'Social Media',
      title: 'Facebook Event: Holiday Showcase',
      description: 'Create and schedule Facebook event for holiday showcase',
      taskCount: 1,
      status: 'overdue'
    }
  ];

  const handleItemClick = (item: CalendarItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8 bg-[#b48f8f] p-8 rounded-2xl shadow-lg">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif text-white animate-fade-in">
            Marketing Timeline
        </h1>
          <p className="text-white/80 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Plan, schedule, and manage your marketing content
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setView('week')}
            className={`p-3 rounded-lg transition-all duration-300 ${
              view === 'week' 
                ? 'bg-white shadow-md scale-105' 
                : 'hover:bg-white/50'
            }`}
            style={{ color: view === 'week' ? "#b48f8f" : "#8b8585" }}
          >
            <CalIcon size={20} />
          </button>
          <button
            onClick={() => setView('month')}
            className={`p-3 rounded-lg transition-all duration-300 ${
              view === 'month' 
                ? 'bg-white shadow-md scale-105' 
                : 'hover:bg-white/50'
            }`}
            style={{ color: view === 'month' ? "#b48f8f" : "#8b8585" }}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-3 rounded-lg transition-all duration-300 ${
              view === 'list' 
                ? 'bg-white shadow-md scale-105' 
                : 'hover:bg-white/50'
            }`}
            style={{ color: view === 'list' ? "#b48f8f" : "#8b8585" }}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex-1">
          {view === 'week' && (
            <WeeklyCalendar 
              items={mockItems} 
              onItemClick={handleItemClick} 
            />
          )}
          
          {view === 'month' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium mb-6" style={{ color: "#8b8585" }}>Monthly View</h2>
              <p className="text-center py-12" style={{ color: "#737373" }}>
                Monthly view coming soon
              </p>
            </div>
          )}
          
          {view === 'list' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium mb-6" style={{ color: "#8b8585" }}>List View</h2>
              <div className="space-y-4">
                {mockItems.map(item => (
                  <div 
                    key={item.id}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                    style={{ borderColor: "#cec4c1" }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 
                                item.category === 'Social Media' ? '#f3e8ff' : 
                                item.category === 'Email' ? '#e0f2fe' : 
                                '#dcfce7',
                              color: 
                                item.category === 'Social Media' ? '#9333ea' : 
                                item.category === 'Email' ? '#0284c7' : 
                                '#16a34a'
                            }}
                          >
                            {item.category}
                          </span>
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: 
                                item.status === 'completed' ? '#dcfce7' : 
                                item.status === 'overdue' ? '#fee2e2' : 
                                '#fef3c7',
                              color: 
                                item.status === 'completed' ? '#16a34a' : 
                                item.status === 'overdue' ? '#dc2626' : 
                                '#d97706'
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                        <h3 className="font-medium" style={{ color: "#8b8585" }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: "#737373" }}>{item.description}</p>
                      </div>
                      <div className="text-sm" style={{ color: "#737373" }}>
                        {new Date(item.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedItem ? (
          <div className="w-96 bg-white rounded-lg shadow p-6 border" style={{ borderColor: "#cec4c1" }}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-medium" style={{ color: "#8b8585" }}>Item Details</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} style={{ color: "#737373" }} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-sm mb-2"
                  style={{ 
                    backgroundColor: 
                      selectedItem.category === 'Social Media' ? '#f3e8ff' : 
                      selectedItem.category === 'Email' ? '#e0f2fe' : 
                      '#dcfce7',
                    color: 
                      selectedItem.category === 'Social Media' ? '#9333ea' : 
                      selectedItem.category === 'Email' ? '#0284c7' : 
                      '#16a34a'
                  }}
                >
                  {selectedItem.category}
                </span>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#8b8585" }}>{selectedItem.title}</h3>
                <p className="text-sm mb-4" style={{ color: "#737373" }}>{selectedItem.description}</p>
              </div>
              
              <div className="border-t pt-4" style={{ borderColor: "#cec4c1" }}>
                <h4 className="font-medium mb-2" style={{ color: "#8b8585" }}>Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#737373" }}>Date:</span>
                    <span className="text-sm font-medium" style={{ color: "#8b8585" }}>
                      {new Date(selectedItem.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#737373" }}>Status:</span>
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: 
                          selectedItem.status === 'completed' ? '#16a34a' : 
                          selectedItem.status === 'overdue' ? '#dc2626' : 
                          '#d97706'
                      }}
                    >
                      {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "#737373" }}>Tasks:</span>
                    <span className="text-sm font-medium" style={{ color: "#8b8585" }}>{selectedItem.taskCount}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4" style={{ borderColor: "#cec4c1" }}>
                <h4 className="font-medium mb-2" style={{ color: "#8b8585" }}>Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="p-2 rounded-lg border text-sm"
                    style={{ borderColor: "#cec4c1", color: "#737373" }}
                  >
                    View Details
                  </button>
                  <button
                    className="p-2 rounded-lg text-sm text-white"
                    style={{ backgroundColor: "#b48f8f" }}
                  >
                    {selectedItem.category === 'Email' ? 'Review Email' : 
                     selectedItem.category === 'Social Media' ? 'View Post' : 
                     'View Material'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-96 bg-gray-50 rounded-lg shadow p-6 border flex items-center justify-center" style={{ borderColor: "#cec4c1" }}>
            <p className="text-center" style={{ color: "#737373" }}>Select an item to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;