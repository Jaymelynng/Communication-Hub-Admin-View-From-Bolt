import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/Layout/PageHeader';
import { GymSelector } from '../components/Emails/GymSelector';
import { GymEmailReview } from '../components/Emails/GymEmailReview';
import { useAuth } from '../context/AuthContext';

export function EmailApprovals() {
  const { user } = useAuth();
  const [selectedGym, setSelectedGym] = useState(user?.gymId || '');

  // Persist selected gym in session storage
  useEffect(() => {
    if (selectedGym) {
      sessionStorage.setItem('selectedGym', selectedGym);
    }
  }, [selectedGym]);

  // Restore selected gym from session storage
  useEffect(() => {
    const storedGym = sessionStorage.getItem('selectedGym');
    if (storedGym && !user?.gymId) {
      setSelectedGym(storedGym);
    }
  }, [user?.gymId]);

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Email Review System"
        description={`Review and approve email content for ${selectedGym || 'your gym'}`}
      />
      
      {!user?.gymId && (
        <GymSelector
          selectedGym={selectedGym}
          onGymChange={setSelectedGym}
        />
      )}
      
      <GymEmailReview gymId={user?.gymId || selectedGym} />
    </div>
  );
}