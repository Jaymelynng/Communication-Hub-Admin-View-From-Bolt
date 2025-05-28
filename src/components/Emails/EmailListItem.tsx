import React from 'react';
import { ApprovalStatus } from './ApprovalStatus';
import { ExternalLink } from 'lucide-react';
import { Email } from '../../types/email';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
}

export function EmailListItem({ email, isSelected, onClick }: EmailListItemProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 bg-white rounded-lg border cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-[#b48f8f]' : 'hover:shadow-md'}
      `}
      style={{ borderColor: "#cec4c1" }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-[#8b8585]">{email.title}</h3>
        <ApprovalStatus status={email.status} />
      </div>
      <p className="text-sm text-[#737373] mb-2">{email.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#737373]">
          Scheduled: {new Date(email.scheduledDate).toLocaleDateString()}
        </p>
        <a
          href={email.emailUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#b48f8f] hover:text-[#a07f7f] inline-flex items-center gap-1 text-sm"
        >
          <ExternalLink size={14} />
          Preview
        </a>
      </div>
    </div>
  );
}