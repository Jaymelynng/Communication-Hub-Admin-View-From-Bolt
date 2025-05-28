export interface Email {
  id: number;
  title: string;
  version: number;
  description: string;
  emailUrl: string;
  htmlContent?: string;
  abTest?: {
    variant: 'A' | 'B';
    metrics: {
      opens: number;
      clicks: number;
    };
  };
  scheduledDate: string;
  status: 'needs_approval' | 'needs_edits' | 'approved';
  notes?: string;
  gyms: string[];
}