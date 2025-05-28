import React from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import { useAuth } from '../../context/AuthContext';

export function DocumentList() {
  const { documents } = useDocumentStore();
  const { user, isAdmin } = useAuth();
  
  const filteredDocuments = documents.filter(doc => 
    isAdmin() || doc.gymId === user?.gymId
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-[#b48f8f]" />;
    }
  };

  return (
    <div className="space-y-4">
      {filteredDocuments.map((doc) => (
        <div
          key={doc.id}
          className="p-4 bg-white rounded-lg border hover:shadow-md transition-all"
          style={{ borderColor: "#cec4c1" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText size={20} className="text-[#b48f8f]" />
            <h3 className="font-medium text-[#8b8585]">{doc.title}</h3>
            {getStatusIcon(doc.status)}
          </div>
          
          <p className="text-sm text-[#737373] mb-2">{doc.description}</p>
          
          <div className="flex justify-between items-center text-sm text-[#737373]">
            <span>Submitted by: {doc.submittedBy}</span>
            <span>{new Date(doc.submittedAt).toLocaleDateString()}</span>
          </div>

          {doc.feedback && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-[#737373]">
              <strong>Feedback:</strong> {doc.feedback}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}