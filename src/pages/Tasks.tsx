import React from 'react';
import { PageHeader } from '../components/Layout/PageHeader';
import { TaskList } from '../components/Tasks/TaskList';
import { useTasks } from '../hooks/useSupabase';

export function Tasks() {
  const { error } = useTasks();

  return (
    <>
      <PageHeader 
        title="Task Management"
        description="Track and manage tasks across all gymnastics facilities"
      />
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          Failed to load tasks. Please try again later.
        </div>
      )}
      <TaskList />
    </>
  );
}