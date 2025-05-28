import { create } from 'zustand';

export interface Document {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  feedback?: string;
  gymId: string;
}

interface DocumentStore {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'id' | 'submittedAt'>) => void;
  updateDocumentStatus: (id: number, status: Document['status'], feedback?: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  
  addDocument: (newDoc) => set((state) => ({
    documents: [...state.documents, {
      ...newDoc,
      id: Date.now(),
      submittedAt: new Date().toISOString()
    }]
  })),
  
  updateDocumentStatus: (id, status, feedback) => set((state) => ({
    documents: state.documents.map(doc => 
      doc.id === id 
        ? { 
            ...doc, 
            status,
            feedback,
            reviewedAt: new Date().toISOString()
          }
        : doc
    )
  }))
}));