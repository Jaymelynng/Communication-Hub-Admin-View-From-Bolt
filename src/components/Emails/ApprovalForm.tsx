import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GYMS, EMAIL_STATUS } from '../../utils/constants';
import { useEmailStore } from '../../store/emailStore';

export function ApprovalForm() {
  const { user, isAdmin } = useAuth();
  const { addEmail } = useEmailStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gyms: user?.role === 'manager' ? [user.gymId] : [],
    emailUrl: '',
    status: EMAIL_STATUS.NEEDS_APPROVAL,
    notes: '',
    scheduledDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmail({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    // Reset form
    setFormData({
      title: '',
      description: '',
      gyms: user?.role === 'manager' ? [user.gymId] : [],
      emailUrl: '',
      status: EMAIL_STATUS.NEEDS_APPROVAL,
      notes: '',
      scheduledDate: ''
    });
  };

  const handleGymSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData(prev => ({ ...prev, gyms: selectedOptions }));
  };

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
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
            maxLength={100}
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
            maxLength={200}
            rows={3}
            required
          />
          <span className="text-sm text-[#737373]">
            {formData.description.length}/200 characters
          </span>
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
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Select Gyms
          </label>
          {user?.role === 'manager' ? (
            <input
              type="text"
              value={user.gymId}
              disabled
              className="w-full px-4 py-2 rounded-lg border bg-gray-50"
              style={{ borderColor: "#cec4c1" }}
            />
          ) : (
            <select
              multiple
              value={formData.gyms}
              onChange={handleGymSelection}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: "#cec4c1", height: "200px" }}
              required
            >
              {GYMS.map((gym) => (
                <option key={gym} value={gym}>{gym}</option>
              ))}
            </select>
          )}
          {!user?.role === 'manager' && (
            <p className="text-sm text-[#737373] mt-1">
              Hold Ctrl/Cmd to select multiple gyms
            </p>
          )}
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
            placeholder="Paste email preview URL here"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#737373]">
            Notes/Feedback
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
            placeholder="Add any notes or feedback here..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 py-3 rounded-lg text-white"
          style={{ background: "#b48f8f" }}
        >
          Submit for Review
        </button>
      </form>
    </div>
  );
}