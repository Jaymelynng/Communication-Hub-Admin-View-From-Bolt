import React, { useState } from 'react';
import { X, Plus, CheckSquare, Calendar, Clock } from 'lucide-react';
import { GYMS, TASK_CHANNELS, TASK_CHANNEL_LABELS } from '../../utils/constants';
import { useTaskStore } from '../../store/taskStore';
import { TaskChannel } from '../../types/tasks';

interface AddTaskModalProps {
  onClose: () => void;
}

export function AddTaskModal({ onClose }: AddTaskModalProps) {
  const { addTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    goLiveDate: '', // Added go live date
    priority: 'medium',
    channel: 'misc' as TaskChannel,
    checklistItems: [{ task: '', gyms: GYMS.map(gym => ({ gymName: gym, completed: false })) }]
  });

  const [checklist, setChecklist] = useState<string[]>(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const description = formData.description + (checklist.some(item => item.trim() !== '') 
      ? '\n\nChecklist:\n' + checklist
          .filter(item => item.trim() !== '')
          .map(item => `- [ ] ${item}`)
          .join('\n')
      : '');

    addTask({
      ...formData,
      description
    });
    onClose();
  };

  const addChecklistItem = () => {
    setChecklist(prev => [...prev, '']);
  };

  const updateChecklistItem = (index: number, value: string) => {
    setChecklist(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeChecklistItem = (index: number) => {
    setChecklist(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#8b8585]">Add New Task</h2>
          <button onClick={onClose} className="text-[#737373] hover:text-[#8b8585]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Channel</label>
            <select
              value={formData.channel}
              onChange={e => setFormData(prev => ({ ...prev, channel: e.target.value as TaskChannel }))}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              required
            >
              {Object.entries(TASK_CHANNEL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
              rows={3}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-[#737373] flex items-center gap-2">
                <CheckSquare size={16} />
                Checklist Items
              </label>
              <button
                type="button"
                onClick={addChecklistItem}
                className="text-sm text-[#b48f8f] hover:underline flex items-center gap-1"
              >
                <Plus size={14} />
                Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => updateChecklistItem(index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border"
                    style={{ borderColor: "#cec4c1" }}
                    placeholder={`Checklist item ${index + 1}`}
                  />
                  {checklist.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(index)}
                      className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373] flex items-center gap-2">
                <Clock size={16} />
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "#cec4c1" }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373] flex items-center gap-2">
                <Calendar size={16} />
                Go Live Date
              </label>
              <input
                type="date"
                value={formData.goLiveDate}
                onChange={e => setFormData(prev => ({ ...prev, goLiveDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "#cec4c1" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#737373]">Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border"
                style={{ borderColor: "#cec4c1" }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white"
              style={{ background: "#b48f8f" }}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}