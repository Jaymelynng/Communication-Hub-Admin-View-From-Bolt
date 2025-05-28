import React, { useState } from 'react';
import { X, CheckSquare } from 'lucide-react';
import { useCalendarStore } from '../../store/calendarStore';
import { TASK_CHANNELS, TASK_CHANNEL_LABELS } from '../../utils/constants';

interface AddEventModalProps {
  date: Date;
  onClose: () => void;
  type: 'task' | 'content';
}

export function AddEventModal({ date, onClose, type }: AddEventModalProps) {
  const { addEvent } = useCalendarStore();
  const [formData, setFormData] = useState({
    title: '',
    channel: 'misc',
    description: '',
    checklist: [''],
    dueDate: date.toISOString().split('T')[0],
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format description with checklist
    const description = formData.description + (formData.checklist.some(item => item.trim() !== '') 
      ? '\n\nThings to Know:\n' + formData.checklist
          .filter(item => item.trim() !== '')
          .map(item => `- [ ] ${item}`)
          .join('\n')
      : '');

    addEvent({
      title: formData.title,
      description,
      date: formData.dueDate,
      type,
      channel: formData.channel,
      priority: formData.priority,
    });
    onClose();
  };

  const addChecklistItem = () => {
    setFormData(prev => ({
      ...prev,
      checklist: [...prev.checklist, '']
    }));
  };

  const updateChecklistItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map((item, i) => i === index ? value : item)
    }));
  };

  const removeChecklistItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#8b8585]">Add Going Live Item</h2>
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
              onChange={e => setFormData(prev => ({ ...prev, channel: e.target.value }))}
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
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-[#737373] flex items-center gap-2">
                <CheckSquare size={16} />
                Things to Know
              </label>
              <button
                type="button"
                onClick={addChecklistItem}
                className="text-sm text-[#b48f8f] hover:underline"
              >
                Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.checklist.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => updateChecklistItem(index, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border"
                    style={{ borderColor: "#cec4c1" }}
                    placeholder={`Item ${index + 1}`}
                  />
                  {formData.checklist.length > 1 && (
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

          <div>
            <label className="block text-sm font-medium mb-2 text-[#737373]">Date</label>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}