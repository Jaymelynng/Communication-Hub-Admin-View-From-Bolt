import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import { usePrintTaskStore } from '../../../store/printTaskStore';
import { MaterialType } from '../../../types/media';

export function PrintTaskForm() {
  const { addPrintTask } = usePrintTaskStore();
  const [formData, setFormData] = useState({
    title: '',
    materialType: 'Sticker' as MaterialType,
    quantity: '',
    dueDate: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrintTask({
      ...formData,
      quantity: formData.quantity ? parseInt(formData.quantity) : undefined
    });
    setFormData({
      title: '',
      materialType: 'Sticker',
      quantity: '',
      dueDate: '',
      notes: ''
    });
  };

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium text-[#8b8585] mb-6 flex items-center gap-2">
        <Printer size={24} />
        Add Print Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Task Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            placeholder="e.g., Print December Character Stickers"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Material Type
          </label>
          <select
            value={formData.materialType}
            onChange={e => setFormData(prev => ({ ...prev, materialType: e.target.value as MaterialType }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
          >
            <option value="Sticker">Sticker</option>
            <option value="Quarter Sheet">Quarter Sheet</option>
            <option value="Full Sheet">Full Sheet</option>
            <option value="Poster">Poster</option>
            <option value="Banner">Banner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Quantity
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            placeholder="Number of copies needed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
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
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            rows={3}
            placeholder="Special instructions, paper type, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-lg text-white bg-[#b48f8f] hover:bg-[#a07f7f] transition-colors flex items-center justify-center gap-2"
        >
          <Printer size={16} />
          Add Print Task
        </button>
      </form>
    </div>
  );
}