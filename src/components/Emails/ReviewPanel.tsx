import React from 'react';
import { Email } from '../../types/email';
import { EmailPreview } from './EmailPreview';
import { ReviewForm } from './ReviewForm';

interface ReviewPanelProps {
  email: Email;
  onSubmitReview: (emailId: number, status: 'approved' | 'needs_edits', notes: string) => void;
}

export function ReviewPanel({ email, onSubmitReview }: ReviewPanelProps) {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
        <div className="mb-8">
          <EmailPreview {...email} />
        </div>

        <div className="border-t pt-6" style={{ borderColor: "#cec4c1" }}>
          <h3 className="text-lg font-medium mb-4 text-[#8b8585]">Review Email</h3>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-[#737373]">
              Please review the email content carefully. Check for:
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Correct gym information and branding</li>
                <li>Proper spelling and grammar</li>
                <li>Valid links and contact information</li>
                <li>Accurate dates and times</li>
              </ul>
            </p>
          </div>
          <ReviewForm 
            onSubmit={({ status, notes }) => onSubmitReview(email.id, status, notes)} 
          />
        </div>
      </div>
    </div>
  );
}