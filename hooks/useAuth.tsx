import React, { createContext, useState, useContext, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import { supabase } from '../src/integrations/supabase/client'; // Import Supabase client

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
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        // Fetch profile data if needed, for now just use basic user info
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows found
          console.error("Error fetching profile:", profileError);
        }

        setUser({
          uid: session.user.id,
          email: session.user.email,
          // Add profile data if available
          firstName: profile?.first_name || null,
          lastName: profile?.last_name || null,
          avatarUrl: profile?.avatar_url || null,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to check user status", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        verifyUser();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [verifyUser]);

  const login = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    // verifyUser will be called by the auth state change listener
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // verifyUser will be called by the auth state change listener
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