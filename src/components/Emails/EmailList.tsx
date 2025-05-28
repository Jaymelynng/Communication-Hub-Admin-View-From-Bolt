import React from 'react';
import { EmailListItem } from './EmailListItem';
import { Email } from '../../types/email';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: number | null;
  onSelectEmail: (id: number) => void;
}

export function EmailList({ emails, selectedEmailId, onSelectEmail }: EmailListProps) {
  return (
    <div className="w-1/3">
      <div className="space-y-4">
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedEmailId === email.id}
            onClick={() => onSelectEmail(email.id)}
          />
        ))}
        
        {emails.length === 0 && (
          <div className="text-center py-8 text-[#737373]">
            No emails pending review
          </div>
        )}
      </div>
    </div>
  );
}