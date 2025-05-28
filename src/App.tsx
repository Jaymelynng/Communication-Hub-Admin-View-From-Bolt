import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/Layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { TaskDetail } from './components/Tasks/TaskDetail';
import { EmailApprovals } from './pages/EmailApprovals';
import { EmailAdmin } from './pages/EmailAdmin';
import { Media } from './pages/Media';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrintTasks } from './pages/PrintTasks';
import EmailApprovalHub from './pages/EmailApprovalHub';
import GalleryView from './pages/GalleryView';
import CalendarView from './pages/CalendarView';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/:id" element={<TaskDetail />} />
            <Route path="emails" element={<EmailApprovals />} />
            <Route path="emails/admin" element={<EmailAdmin />} />
            <Route path="emails/approval-hub" element={<EmailApprovalHub />} />
            <Route path="media" element={<Media />} />
            <Route path="media/gallery" element={<GalleryView />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="print-tasks" element={<PrintTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;