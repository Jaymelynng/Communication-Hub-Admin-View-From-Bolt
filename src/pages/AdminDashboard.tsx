import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMarketingContent, useGymDetails } from '../hooks/useSupabase';
import { AlertTriangle, Clock, CheckCircle, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

export function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { content, loading: contentLoading } = useMarketingContent();
  const { gyms, loading: gymsLoading } = useGymDetails();

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const updates = [
    {
      title: "Holiday Campaign Review",
      type: "Reminder",
      priority: "High",
      date: "Today at 2:00 PM",
    },
    {
      title: "End of Year Content Calendar",
      type: "Update",
      priority: "Medium",
      date: "Tomorrow at 10:00 AM",
    },
    {
      title: "Social Media Assets Due",
      type: "Reminder",
      priority: "Low",
      date: "Dec 20, 2023",
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#b48f8f] rounded-lg p-6">
        <h1 className="text-3xl text-white">Admin Dashboard</h1>
        <p className="text-sm text-white/80">Overview of all gyms and campaigns</p>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} className="text-white/80" />
              <h3 className="text-lg text-white">Overdue Tasks</h3>
            </div>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-white/70">Need immediate attention</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-white/80" />
              <h3 className="text-lg text-white">Due Today</h3>
            </div>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-white/70">Tasks due today</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-white/80" />
              <h3 className="text-lg text-white">Completed Tasks</h3>
            </div>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-sm text-white/70">Last 7 days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-[#8b8585]">Task Status Overview</h2>
            <span className="text-sm text-[#8f93a0]">May 1 - May 15</span>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-[#8b8585]">Next 7 Days</span>
            <span className="text-xs text-[#8f93a0] ml-auto">0 tasks</span>
          </div>

          <div className="flex items-center justify-center h-40 text-[#737373]">
            No upcoming tasks
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-[#8b8585]">Important Updates & Reminders</h2>
            <Bell size={20} className="text-[#8b8585]" />
          </div>

          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="space-y-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-[#8b8585]">{update.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      update.type === 'Reminder' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {update.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ml-auto ${
                      update.priority === 'High' ? 'bg-red-100 text-red-800' :
                      update.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {update.priority}
                    </span>
                  </div>
                  <p className="text-sm text-[#737373]">{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-[#b48f8f] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">May 2025</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg text-white hover:bg-white/20">
              <ChevronLeft size={24} />
            </button>
            <button className="p-2 rounded-lg text-white hover:bg-white/20">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map(day => (
            <div key={day} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <span className="text-2xl text-white">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}