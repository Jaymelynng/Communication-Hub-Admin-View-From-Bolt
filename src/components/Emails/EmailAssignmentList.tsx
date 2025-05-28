import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useEmailStore } from '../../store/emailStore';

export function EmailAssignmentList() {
  const { emails } = useEmailStore();

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
      <h2 className="text-xl font-medium mb-6 text-[#8b8585]">Recent Assignments</h2>
      <div className="space-y-4">
        {emails.map((email) => (
          <div
            key={email.id}
            className="p-4 rounded-lg border"
            style={{ borderColor: "#cec4c1" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-[#b48f8f]" />
              <h3 className="font-medium text-[#8b8585]">{email.title}</h3>
            </div>
            <p className="text-sm text-[#737373] mb-2">
              Scheduled: {new Date(email.scheduledDate).toLocaleDateString()}
            </p>
            <div className="text-sm text-[#737373]">
              Assigned to {email.gyms.length} gym{email.gyms.length !== 1 ? 's' : ''}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {email.gyms.map((gym) => (
                <span
                  key={gym}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-[#737373]"
                >
                  {gym}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}