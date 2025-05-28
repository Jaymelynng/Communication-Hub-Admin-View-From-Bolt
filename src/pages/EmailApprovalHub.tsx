import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Mail, Eye, MessageSquare, Clock, CheckSquare, AlertTriangle, Filter } from 'lucide-react';

// Types
interface Email {
  id: number;
  title: string;
  gym: string;
  status: 'needs_approval' | 'approved' | 'needs_edits' | 'sent';
  scheduledDate: string;
  preview?: string;
  notes?: string;
}

interface Comment {
  id: number;
  emailId: number;
  author: string;
  text: string;
  createdAt: string;
  resolved: boolean;
}

const EmailApprovalHub = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedGym, setSelectedGym] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'preview' | 'comments' | 'history' | 'status'>('preview');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [emailStats, setEmailStats] = useState({
    total: 0,
    pending: 0,
    sent: 0,
    needsEdits: 0,
    overdue: 0
  });

  // Mock data - replace with actual Supabase fetch
  useEffect(() => {
    const mockEmails: Email[] = [
      {
        id: 1,
        title: 'December Newsletter',
        gym: 'Capital Gymnastics Cedar Park',
        status: 'needs_approval',
        scheduledDate: '2024-12-15',
        preview: 'https://example.com/preview/1',
        notes: 'Please review content and images for winter camp promotion.'
      },
      {
        id: 2,
        title: 'Winter Camp Announcement',
        gym: 'Capital Gymnastics Round Rock',
        status: 'needs_edits',
        scheduledDate: '2024-12-10',
        preview: 'https://example.com/preview/2',
        notes: 'Need to update dates and pricing information.'
      },
      {
        id: 3,
        title: 'Holiday Schedule',
        gym: 'Houston Gymnastics Academy',
        status: 'approved',
        scheduledDate: '2024-12-05',
        preview: 'https://example.com/preview/3'
      },
      {
        id: 4,
        title: 'New Year Classes',
        gym: 'Scottsdale Gymnastics',
        status: 'sent',
        scheduledDate: '2024-12-01',
        preview: 'https://example.com/preview/4'
      }
    ];

    const mockComments: Comment[] = [
      {
        id: 1,
        emailId: 1,
        author: 'Jayme',
        text: 'Please check the winter camp dates, I think they need to be updated.',
        createdAt: '2024-12-01T10:30:00Z',
        resolved: false
      },
      {
        id: 2,
        emailId: 1,
        author: 'Sarah',
        text: 'Updated the dates. Also fixed the phone number.',
        createdAt: '2024-12-02T14:15:00Z',
        resolved: true
      }
    ];

    setEmails(mockEmails);
    setComments(mockComments);

    // Calculate stats
    setEmailStats({
      total: mockEmails.length,
      pending: mockEmails.filter(e => e.status === 'needs_approval').length,
      sent: mockEmails.filter(e => e.status === 'sent').length,
      needsEdits: mockEmails.filter(e => e.status === 'needs_edits').length,
      overdue: mockEmails.filter(e => new Date(e.scheduledDate) < new Date() && e.status !== 'sent').length
    });
  }, []);

  // Filter emails by selected gym
  const filteredEmails = selectedGym 
    ? emails.filter(email => email.gym === selectedGym)
    : emails;

  // Get comments for selected email
  const emailComments = selectedEmail 
    ? comments.filter(comment => comment.emailId === selectedEmail.id)
    : [];

  const handleStatusChange = (emailId: number, newStatus: Email['status']) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, status: newStatus } : email
    ));
    
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail({ ...selectedEmail, status: newStatus });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedEmail) return;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      emailId: selectedEmail.id,
      author: 'Jayme', // Would come from auth context in real app
      text: newComment,
      createdAt: new Date().toISOString(),
      resolved: false
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleResolveComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId ? { ...comment, resolved: !comment.resolved } : comment
    ));
  };

  // Stat Card component
  const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: "#cec4c1" }}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
        <div>
          <p className="text-sm" style={{ color: "#8b8585" }}>{title}</p>
          <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif" style={{ color: "#8b8585" }}>
          Email Approval Hub
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "#8b8585" }} />
            <select 
              value={selectedGym}
              onChange={(e) => setSelectedGym(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-rose-200"
              style={{ borderColor: "#cec4c1", color: "#8b8585" }}
            >
              <option value="">All Gyms</option>
              <option value="Capital Gymnastics Cedar Park">Capital Gymnastics Cedar Park</option>
              <option value="Capital Gymnastics Round Rock">Capital Gymnastics Round Rock</option>
              <option value="Houston Gymnastics Academy">Houston Gymnastics Academy</option>
              <option value="Scottsdale Gymnastics">Scottsdale Gymnastics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Emails" value={emailStats.total} icon={<Mail size={20} />} color="#b48f8f" />
        <StatCard title="Pending Review" value={emailStats.pending} icon={<Clock size={20} />} color="#f59e0b" />
        <StatCard title="Sent/Live" value={emailStats.sent} icon={<CheckSquare size={20} />} color="#10b981" />
        <StatCard title="Needs Edits" value={emailStats.needsEdits} icon={<MessageSquare size={20} />} color="#3b82f6" />
        <StatCard title="Overdue" value={emailStats.overdue} icon={<AlertTriangle size={20} />} color="#ef4444" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Email List */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-xl font-medium" style={{ color: "#8b8585" }}>Emails</h2>
          
          {filteredEmails.map((email) => (
            <div 
              key={email.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedEmail?.id === email.id ? 'ring-2' : ''}`}
              style={{ 
                borderColor: "#cec4c1", 
                backgroundColor: "white",
                ...(selectedEmail?.id === email.id && { ringColor: "#b48f8f" })
              }}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium mb-1" style={{ color: "#8b8585" }}>{email.title}</h3>
                  <p className="text-sm mb-2" style={{ color: "#737373" }}>{email.gym}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: "#737373" }}>
                      {format(new Date(email.scheduledDate), 'MMM dd, yyyy')}
                    </span>
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 
                          email.status === 'needs_approval' ? '#fff7ed' :
                          email.status === 'approved' ? '#ecfdf5' :
                          email.status === 'needs_edits' ? '#eff6ff' : '#f3f4f6',
                        color: 
                          email.status === 'needs_approval' ? '#f59e0b' :
                          email.status === 'approved' ? '#10b981' :
                          email.status === 'needs_edits' ? '#3b82f6' : '#6b7280'
                      }}
                    >
                      {email.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <a 
                  href={email.preview} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye size={16} style={{ color: "#b48f8f" }} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Email Detail Panel */}
        {selectedEmail ? (
          <div className="lg:w-2/3 bg-white rounded-lg border p-6" style={{ borderColor: "#cec4c1" }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-medium mb-2" style={{ color: "#8b8585" }}>{selectedEmail.title}</h2>
                <p className="text-sm" style={{ color: "#737373" }}>{selectedEmail.gym}</p>
              </div>
              <div className="flex gap-2">
                <a 
                  href={selectedEmail.preview} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#cec4c1", color: "#737373" }}
                >
                  <Eye size={16} />
                  <span>View Preview</span>
                </a>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b mb-6" style={{ borderColor: "#cec4c1" }}>
              <div className="flex gap-6">
                <button 
                  className={`pb-2 px-1 font-medium ${activeTab === 'preview' ? 'border-b-2' : ''}`}
                  style={{ 
                    color: activeTab === 'preview' ? "#b48f8f" : "#737373",
                    borderColor: "#b48f8f"
                  }}
                  onClick={() => setActiveTab('preview')}
                >
                  Preview
                </button>
                <button 
                  className={`pb-2 px-1 font-medium ${activeTab === 'comments' ? 'border-b-2' : ''}`}
                  style={{ 
                    color: activeTab === 'comments' ? "#b48f8f" : "#737373",
                    borderColor: "#b48f8f"
                  }}
                  onClick={() => setActiveTab('comments')}
                >
                  Comments
                </button>
                <button 
                  className={`pb-2 px-1 font-medium ${activeTab === 'history' ? 'border-b-2' : ''}`}
                  style={{ 
                    color: activeTab === 'history' ? "#b48f8f" : "#737373",
                    borderColor: "#b48f8f"
                  }}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
                <button 
                  className={`pb-2 px-1 font-medium ${activeTab === 'status' ? 'border-b-2' : ''}`}
                  style={{ 
                    color: activeTab === 'status' ? "#b48f8f" : "#737373",
                    borderColor: "#b48f8f"
                  }}
                  onClick={() => setActiveTab('status')}
                >
                  Status
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'preview' && (
                <div>
                  {selectedEmail.preview ? (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <iframe 
                        src={selectedEmail.preview} 
                        className="w-full h-full rounded-lg"
                        title={`Preview of ${selectedEmail.title}`}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">No preview available</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>Email Details</h3>
                    <div className="space-y-2">
                      <p className="text-sm" style={{ color: "#737373" }}>
                        <span className="font-medium">Scheduled Date:</span> {format(new Date(selectedEmail.scheduledDate), 'MMMM dd, yyyy')}
                      </p>
                      {selectedEmail.notes && (
                        <p className="text-sm" style={{ color: "#737373" }}>
                          <span className="font-medium">Notes:</span> {selectedEmail.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <div className="space-y-4 mb-6">
                    {emailComments.length > 0 ? (
                      emailComments.map((comment) => (
                        <div 
                          key={comment.id} 
                          className={`p-4 rounded-lg ${comment.resolved ? 'bg-gray-50' : 'bg-white border'}`}
                          style={{ borderColor: comment.resolved ? 'transparent' : "#cec4c1" }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium" style={{ color: "#8b8585" }}>{comment.author}</span>
                              <span className="text-xs" style={{ color: "#737373" }}>
                                {format(new Date(comment.createdAt), 'MMM dd, yyyy h:mm a')}
                              </span>
                            </div>
                            <button 
                              className={`text-xs px-2 py-1 rounded-full ${comment.resolved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                              onClick={() => handleResolveComment(comment.id)}
                            >
                              {comment.resolved ? 'Resolved' : 'Mark Resolved'}
                            </button>
                          </div>
                          <p className={`text-sm ${comment.resolved ? 'line-through text-gray-500' : ''}`} style={{ color: "#737373" }}>
                            {comment.text}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-sm" style={{ color: "#737373" }}>No comments yet</p>
                    )}
                  </div>

                  <div className="border-t pt-4" style={{ borderColor: "#cec4c1" }}>
                    <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>Add Comment</h3>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-3 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                      style={{ borderColor: "#cec4c1" }}
                      rows={3}
                      placeholder="Add your feedback or comments here..."
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <button 
                          className="px-3 py-1 rounded-lg text-sm border"
                          style={{ borderColor: "#cec4c1", color: "#737373" }}
                        >
                          Add Link
                        </button>
                        <button 
                          className="px-3 py-1 rounded-lg text-sm border"
                          style={{ borderColor: "#cec4c1", color: "#737373" }}
                        >
                          Quick Notes
                        </button>
                      </div>
                      <button 
                        onClick={handleAddComment}
                        className="px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: "#b48f8f" }}
                        disabled={!newComment.trim()}
                      >
                        Send Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border" style={{ borderColor: "#cec4c1" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" style={{ color: "#8b8585" }}>Jayme</span>
                      <span className="text-xs" style={{ color: "#737373" }}>Dec 2, 2024 10:30 AM</span>
                    </div>
                    <p className="text-sm" style={{ color: "#737373" }}>Created email</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: "#cec4c1" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" style={{ color: "#8b8585" }}>Sarah</span>
                      <span className="text-xs" style={{ color: "#737373" }}>Dec 3, 2024 2:15 PM</span>
                    </div>
                    <p className="text-sm" style={{ color: "#737373" }}>Requested changes</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: "#cec4c1" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" style={{ color: "#8b8585" }}>Jayme</span>
                      <span className="text-xs" style={{ color: "#737373" }}>Dec 4, 2024 9:45 AM</span>
                    </div>
                    <p className="text-sm" style={{ color: "#737373" }}>Updated email with requested changes</p>
                  </div>
                </div>
              )}

              {activeTab === 'status' && (
                <div>
                  <h3 className="font-medium mb-4" style={{ color: "#8b8585" }}>Update Status</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-colors ${selectedEmail.status === 'approved' ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                      style={{ 
                        borderColor: selectedEmail.status === 'approved' ? "#10b981" : "#cec4c1",
                        color: selectedEmail.status === 'approved' ? "#10b981" : "#737373"
                      }}
                      onClick={() => handleStatusChange(selectedEmail.id, 'approved')}
                    >
                      <CheckSquare size={24} />
                      <span>Approve</span>
                    </button>
                    <button 
                      className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-colors ${selectedEmail.status === 'needs_edits' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      style={{ 
                        borderColor: selectedEmail.status === 'needs_edits' ? "#3b82f6" : "#cec4c1",
                        color: selectedEmail.status === 'needs_edits' ? "#3b82f6" : "#737373"
                      }}
                      onClick={() => handleStatusChange(selectedEmail.id, 'needs_edits')}
                    >
                      <MessageSquare size={24} />
                      <span>Request Changes</span>
                    </button>
                  </div>

                  <div className="border-t pt-4" style={{ borderColor: "#cec4c1" }}>
                    <h3 className="font-medium mb-2" style={{ color: "#8b8585" }}>Additional Resources</h3>
                    <div className="space-y-2">
                      <button 
                        className="w-full p-3 rounded-lg border flex items-center gap-3 transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#cec4c1", color: "#737373" }}
                      >
                        <div className="p-2 rounded-full bg-gray-100">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                        <span>Attach Canva Link</span>
                      </button>
                      <button 
                        className="w-full p-3 rounded-lg border flex items-center gap-3 transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#cec4c1", color: "#737373" }}
                      >
                        <div className="p-2 rounded-full bg-gray-100">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </div>
                        <span>Attach Document</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:w-2/3 bg-gray-50 rounded-lg border p-6 flex items-center justify-center" style={{ borderColor: "#cec4c1" }}>
            <p className="text-center text-gray-500">Select an email to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailApprovalHub;