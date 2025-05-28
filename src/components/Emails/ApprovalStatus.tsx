import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ApprovalStatusProps {
  status: 'approved' | 'needs_edits' | 'needs_approval';
}

export function ApprovalStatus({ status }: ApprovalStatusProps) {
  const statusConfig = {
    approved: {
      icon: CheckCircle,
      color: 'text-green-500',
      text: 'Approved'
    },
    needs_edits: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      text: 'Needs Changes'
    },
    needs_approval: {
      icon: Clock,
      color: 'text-[#b48f8f]',
      text: 'Pending Review'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={config.color} />
      <span className="text-sm text-[#737373]">{config.text}</span>
    </div>
  );
}