import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Lock, CheckCircle2, Clock, Calendar, X } from 'lucide-react';
import { DayDetails } from '../../types/calendar';
import { useAuth } from '../../context/AuthContext';
import { AddEventModal } from './AddEventModal';

interface DayDetailsPanelProps {
  selectedDate: Date | null;
  details: DayDetails | null;
  onClose: () => void;
}

export function DayDetailsPanel({ selectedDate, details, onClose }: DayDetailsPanelProps) {
  const { isAdmin } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingType, setAddingType] = useState<'task' | 'content'>('task');
  
  if (!selectedDate || !details) return null;

  const handleAddClick = (type: 'task' | 'content') => {
    setAddingType(type);
    setShowAddModal(true);
  };

  return (
    <div className="w-80 bg-white shadow-lg border rounded-lg p-4 transform transition-all duration-300 animate-slide-in relative"
         style={{ borderColor: "#cec4c1" }}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close panel"
      >
        <X size={16} className="text-gray-500" />
      </button>
      <h2 className="text-base font-medium mb-3 text-gray-700">
        {format(selectedDate, "MMMM d, yyyy")}
      </h2>

      {/* Tasks Section */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-rose-600 font-medium flex items-center gap-2">
            <CheckCircle2 size={16} className="transform transition-all duration-300 group-hover:scale-110" />
            Tasks
          </h3>
          {isAdmin() && (
            <button 
              onClick={() => handleAddClick('task')}
              className="text-sm text-rose-600 hover:underline flex items-center gap-1"
            >
              <Plus size={14} />
              Add Task
            </button>
          )}
        </div>
        
        {details.tasks.length > 0 ? (
          details.tasks.map((task) => (
            <div key={task.id} className="p-4 rounded-lg border hover:shadow-sm transition-all"
                 style={{ borderColor: "#cec4c1" }}>
              <h4 className="font-medium text-[#8b8585]">{task.title}</h4>
              <p className="text-sm mb-2 text-[#737373]">Due: {task.due}</p>
              <ul className="list-disc pl-6">
                {task.checklist.map((item, i) => (
                  <li key={i} className="text-sm text-[#737373]">{item}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#737373]">No tasks scheduled for this day</p>
        )}
      </div>

      {/* Content Section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[#b48f8f] font-medium flex items-center gap-2">
            <Calendar size={16} />
            Scheduled Content
          </h3>
          {isAdmin() && (
            <button 
              onClick={() => handleAddClick('content')}
              className="text-sm text-[#b48f8f] hover:underline flex items-center gap-1"
            >
              <Plus size={14} />
              Add Content
            </button>
          )}
        </div>
        
        {details.content.length > 0 ? (
          details.content.map((content) => (
            <div key={content.id} className="p-4 rounded-lg border hover:shadow-sm transition-all"
                 style={{ borderColor: "#cec4c1" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-[#b48f8f]/10 text-[#b48f8f]">
                  {content.type}
                </span>
                <p className="text-sm text-[#737373]">{content.time}</p>
              </div>
              <h4 className="font-medium text-[#8b8585] mb-2">{content.title}</h4>
              <p className="text-sm text-[#737373] mb-4">{content.description}</p>
              
              {content.managerChecklist && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-[#8b8585] mb-2">Manager Checklist:</h5>
                  <ul className="space-y-1">
                    {content.managerChecklist.map((item, i) => (
                      <li key={i} className="text-sm text-[#737373] flex items-center gap-2">
                        <input type="checkbox" className="rounded text-[#b48f8f]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {content.supportChecklist && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-[#8b8585] mb-2">Support Checklist:</h5>
                  <ul className="space-y-1">
                    {content.supportChecklist.map((item, i) => (
                      <li key={i} className="text-sm text-[#737373] flex items-center gap-2">
                        <input type="checkbox" className="rounded text-[#b48f8f]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <a 
                href={content.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-[#b48f8f] hover:underline inline-block"
              >
                View Content
              </a>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#737373]">No content scheduled for this day</p>
        )}
      </div>

      {!isAdmin() && (
        <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 animate-fade-in">
          <Lock size={16} />
          Only administrators can add items
        </div>
      )}

      {showAddModal && (
        <AddEventModal
          date={selectedDate}
          type={addingType}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}