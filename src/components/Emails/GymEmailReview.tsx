import React, { useState, useEffect } from 'react';
import { EmailList } from './EmailList';
import { ReviewPanel } from './ReviewPanel';
import { useEmailStore } from '../../store/emailStore';

interface GymEmailReviewProps {
  gymId?: string;
}

export function GymEmailReview({ gymId }: GymEmailReviewProps) {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const { emails, updateEmailStatus } = useEmailStore();
  
  // Reset selected email when gym changes
  useEffect(() => {
    setSelectedEmail(null);
  }, [gymId]);
  
  // Filter emails for this gym and sort by date
  const gymEmails = emails
    .filter(email => email.gyms.includes(gymId || ''))
    .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

  const handleSubmitReview = (emailId: number, status: 'approved' | 'needs_edits', notes: string) => {
    updateEmailStatus(emailId, status, notes);
    setSelectedEmail(null);
  };

  if (!gymId) {
    return (
      <div className="text-center py-8 text-[#737373]">
        Please select a gym to review emails
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <EmailList 
        emails={gymEmails}
        selectedEmailId={selectedEmail}
        onSelectEmail={setSelectedEmail}
      />
      
      {selectedEmail && (
        <ReviewPanel
          email={gymEmails.find(e => e.id === selectedEmail)!}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </div>
  );
}