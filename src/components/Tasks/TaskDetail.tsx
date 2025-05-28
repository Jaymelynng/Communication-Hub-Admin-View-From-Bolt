import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Lock, CheckSquare, Square } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../Layout/PageHeader';

export function TaskDetail() {
  const { id } = useParams();
  const { canManageGym } = useAuth();
  const { tasks, updateTaskStatus, toggleChecklistItem } = useTaskStore();
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return <div>Task not found</div>;
  }

  // Parse checklist items from description
  const description = task.description.split('\n\nChecklist:\n')[0];
  const checklistItems = task.description
    .split('\n\nChecklist:\n')[1]?.split('\n')
    .map(item => ({
      text: item.replace(/^- \[([ x])\] /, ''),
      checked: item.includes('- [x] ')
    })) || [];

  const handleStatusUpdate = (gymName: string, completed: boolean) => {
    updateTaskStatus(task.id, gymName, completed);
  };

  const handleChecklistToggle = (index: number) => {
    toggleChecklistItem(task.id, index);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={task.title}
        description={description}
      />

      <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
        <div className="flex gap-4 text-sm text-[#737373]">
          <span>Due: {task.dueDate}</span>
          <span className={`font-medium ${
            task.priority === 'high' ? 'text-red-500' :
            task.priority === 'medium' ? 'text-yellow-500' :
            'text-green-500'
          }`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
        </div>
      </div>

      {checklistItems.length > 0 && (
        <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
          <h3 className="text-xl font-medium text-[#8b8585] mb-4">Checklist</h3>
          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleChecklistToggle(index)}
              >
                {item.checked ? (
                  <CheckSquare className="text-[#b48f8f]" size={20} />
                ) : (
                  <Square className="text-[#737373]" size={20} />
                )}
                <span className={`text-[#737373] ${item.checked ? 'line-through' : ''}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
        <h3 className="text-xl font-medium text-[#8b8585] mb-4">Gym Progress</h3>
        {task.checklistItems.map((item) => (
          <div key={item.id} className="mb-6">
            <h4 className="font-medium text-[#8b8585] mb-2">{item.task}</h4>
            <div className="space-y-2">
              {item.gyms.map((gym, index) => {
                const canManage = canManageGym(gym.gymName);
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      canManage ? 'cursor-pointer hover:bg-gray-50' : ''
                    }`}
                    style={{ borderColor: "#cec4c1" }}
                  >
                    <span className="text-[#737373]">{gym.gymName}</span>
                    <div className="flex items-center gap-2">
                      {gym.completed ? (
                        <>
                          <CheckCircle2 className="text-green-500" size={16} />
                          <span className="text-sm text-[#737373]">
                            Completed {gym.completedAt && `on ${new Date(gym.completedAt).toLocaleDateString()}`}
                          </span>
                          {canManage && (
                            <button
                              onClick={() => handleStatusUpdate(gym.gymName, false)}
                              className="text-sm text-blue-500 hover:underline ml-2"
                            >
                              Undo
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {canManage ? (
                            <button
                              onClick={() => handleStatusUpdate(gym.gymName, true)}
                              className="text-sm text-blue-500 hover:underline"
                            >
                              Mark as Complete
                            </button>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Lock size={14} className="text-gray-400" />
                              <XCircle className="text-red-500" size={16} />
                              <span className="text-sm text-[#737373]">Pending</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}