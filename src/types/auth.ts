export type UserRole = 'admin' | 'manager';

export interface User {
  id: string;
  role: UserRole;
  gymId?: string; // Only for managers
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}