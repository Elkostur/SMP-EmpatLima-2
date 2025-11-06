
import React, { createContext, useState, useContext, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import { checkUserLoggedIn, signIn as firebaseSignIn, signOut as firebaseSignOut } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await checkUserLoggedIn();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to check user status", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const login = async (email: string, pass: string) => {
    const loggedInUser = await firebaseSignIn(email, pass);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await firebaseSignOut();
    setUser(null);
  };
  
  const value = { user, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
