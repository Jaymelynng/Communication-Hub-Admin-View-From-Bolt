import React, { useState } from 'react';
import { useEmailStore } from '../../store/emailStore';
import { GYMS } from '../../utils/constants';

export function EmailCreationForm() {
  const { addEmail } = useEmailStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    emailUrl: '',
    scheduledDate: '',
    gyms: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmail({
      ...formData,
      status: 'needsApproval',
      notes: '',
    });
    setFormData({
      title: '',
      description: '',
      emailUrl: '',
      scheduledDate: '',
      gyms: []
    });
  };

  const handleSelectAllGyms = () => {
    setFormData(prev => ({
      ...prev,
      gyms: prev.gyms.length === GYMS.length ? [] : [...GYMS]
    }));
  };

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium mb-6 text-[#8b8585]">Create New Email</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Email Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Email Preview Link
          </label>
          <input
            type="url"
            value={formData.emailUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, emailUrl: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Scheduled Date
          </label>
          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-[#737373]">
              Assign to Gyms
            </label>
            <button
              type="button"
              onClick={handleSelectAllGyms}
              className="text-sm text-[#b48f8f] hover:underline"
            >
              {formData.gyms.length === GYMS.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto p-4 border rounded-lg" style={{ borderColor: "#cec4c1" }}>
            {GYMS.map((gym) => (
              <label key={gym} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.gyms.includes(gym)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({ ...prev, gyms: [...prev.gyms, gym] }));
                    } else {
                      setFormData(prev => ({ ...prev, gyms: prev.gyms.filter(g => g !== gym) }));
                    }
                  }}
                  className="rounded text-[#b48f8f]"
                />
                <span className="text-[#737373]">{gym}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-3 rounded-lg text-white bg-[#b48f8f]"
        >
          Create and Assign Email
        </button>
      </form>
    </div>
  );
}