import React from 'react';
import { PageHeader } from '../components/Layout/PageHeader';
import { PrintTaskForm } from '../components/Tasks/PrintTasks/PrintTaskForm';
import { PrintTaskList } from '../components/Tasks/PrintTasks/PrintTaskList';

export function PrintTasks() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Print Task Management"
        description="Track and manage printing tasks for gym marketing materials"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PrintTaskForm />
        <PrintTaskList />
      </div>
    </div>
  );
}