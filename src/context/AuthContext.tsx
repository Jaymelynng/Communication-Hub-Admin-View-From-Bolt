import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type Role = 'creator' | 'manager' | 'admin';

interface AuthState {
  user: any | null;
  role: Role | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ user: null, role: null, loading: true });

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data } = await supabase
          .from('gym_members')
          .select('role')
          .eq('user_id', session.user.id)
          .limit(1)
          .single();

        setState({
          user: session.user,
          role: (data?.role as Role) || 'creator',
          loading: false,
        });
      } else {
        setState({ user: null, role: null, loading: false });
      }
    };

    getSession();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
