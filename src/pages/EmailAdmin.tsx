import React from 'react';
import { PageHeader } from '../components/Layout/PageHeader';
import { EmailCreationForm } from '../components/Emails/EmailCreationForm';
import { EmailAssignmentList } from '../components/Emails/EmailAssignmentList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function EmailAdmin() {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return <Navigate to="/emails" replace />;
  }

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Email Management"
        description="Create and assign email campaigns to gyms"
      />
      
      <div className="grid grid-cols-2 gap-8">
        <EmailCreationForm />
        <EmailAssignmentList />
      </div>
    </div>
  );
}