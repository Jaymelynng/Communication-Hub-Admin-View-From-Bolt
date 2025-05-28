import React from 'react';
import { useAuth } from './AuthContext';

interface Props {
  allow: ('creator' | 'manager' | 'admin')[];
  children: React.ReactNode;
}

export const RoleGate: React.FC<Props> = ({ allow, children }) => {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role && allow.includes(role)) return <>{children}</>;
  return null;
};
