
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { AppRole } from '@/types/admin';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  role: AppRole | null; 
  signIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  checkIsAdmin: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);

  useEffect(() => {
    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        
        // Fetch role if logged in
        if (currentSession?.user) {
          fetchUserRole(currentSession.user.id);
        } else {
          setRole(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      // Fetch role if logged in
      if (currentSession?.user) {
        fetchUserRole(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the user's role from the admin_users table
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
        return;
      }

      if (data) {
        setRole(data.role as AppRole);
      }
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      setRole(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      if (!data.user) {
        return { success: false, message: 'Authentication failed' };
      }

      // Check if the user is in the admin_users table
      const { data: adminUserData, error: adminUserError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (adminUserError || !adminUserData) {
        await supabase.auth.signOut();
        return { success: false, message: 'You do not have admin access' };
      }

      // Update last login time
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id);

      setRole(adminUserData.role as AppRole);
      return { success: true };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, message: error.message || 'Failed to sign in' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const checkIsAdmin = async (): Promise<boolean> => {
    if (!session) return false;
    
    try {
      const { data } = await supabase.rpc('has_role', { _role: 'administrator' });
      return !!data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        role,
        signIn,
        signOut,
        checkIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
