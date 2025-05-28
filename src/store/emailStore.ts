import { create } from 'zustand';
import { Email } from '../types/email';

interface EmailStore {
  emails: Email[];
  addEmail: (email: Omit<Email, 'id' | 'status'>) => void;
  updateEmailStatus: (id: number, status: Email['status'], notes?: string) => void;
  assignToGyms: (id: number, gyms: string[]) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: [
    {
      id: 1,
      title: "December Newsletter",
      description: "Monthly newsletter for December",
      emailUrl: "https://example.com/preview/1",
      scheduledDate: "2024-12-01",
      status: 'needs_approval',
      gyms: ["Capital Gymnastics Cedar Park"]
    },
    {
      id: 2,
      title: "Holiday Special",
      description: "Holiday promotion details",
      emailUrl: "https://example.com/preview/2",
      scheduledDate: "2024-12-05",
      status: 'needs_approval',
      gyms: ["Capital Gymnastics Cedar Park", "Houston Gymnastics Academy"]
    },
    {
      id: 3,
      title: "Winter Camp Registration",
      description: "Winter camp early bird registration",
      emailUrl: "https://example.com/preview/3",
      scheduledDate: "2024-11-28",
      status: 'needs_edits',
      gyms: ["Houston Gymnastics Academy"]
    }
  ].sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()),
  
  addEmail: (newEmail) => set((state) => ({
    emails: [...state.emails, { 
      ...newEmail, 
      id: Date.now(), 
      status: 'needs_approval' 
    }].sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
  })),
  
  updateEmailStatus: (id, status, notes) => set((state) => ({
    emails: state.emails.map(email =>
      email.id === id
        ? { ...email, status, notes }
        : email
    )
  })),

  assignToGyms: (id, gyms) => set((state) => ({
    emails: state.emails.map(email =>
      email.id === id
        ? { ...email, gyms }
        : email
    )
  }))
}));