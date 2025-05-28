import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
  canManageGym: (gymId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: {
      id: '1',
      role: 'admin',
      name: 'Jayme'
    },
    isAuthenticated: true
  });

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  const isAdmin = () => {
    return authState.user?.role === 'admin';
  };

  const canManageGym = (gymId: string) => {
    if (!authState.user) return false;
    if (authState.user.role === 'admin') return true;
    return authState.user.gymId === gymId;
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isAdmin, canManageGym }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};