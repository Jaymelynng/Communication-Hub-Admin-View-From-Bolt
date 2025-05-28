import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';

interface EmailPreviewProps {
  title: string;
  description: string;
  scheduledDate: string;
  emailUrl: string;
}

export function EmailPreview({ title, description, scheduledDate, emailUrl }: EmailPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={20} className="text-[#b48f8f]" />
        <h3 className="font-medium text-[#8b8585]">{title}</h3>
      </div>
      
      <p className="text-sm text-[#737373]">{description}</p>
      
      <div className="text-sm text-[#737373]">
        Scheduled: {new Date(scheduledDate).toLocaleDateString()}
      </div>
      
      <a
        href={emailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#b48f8f] hover:bg-[#a07f7f] transition-colors"
      >
        <ExternalLink size={16} />
        Open Email Preview
      </a>
    </div>
  );
}