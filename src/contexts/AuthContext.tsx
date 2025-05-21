
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
  initializeAdminUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AppRole | null>(null);

  // Initialize admin user if it doesn't exist
  const initializeAdminUser = async () => {
    try {
      // Check if rushi1@gmail.com exists
      const { data: existingRushiAdmin, error: rushiCheckError } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('email', 'rushi1@gmail.com')
        .single();

      if (rushiCheckError && rushiCheckError.code !== 'PGRST116') {
        console.error('Error checking for rushi admin user:', rushiCheckError);
      }

      // If rushi admin exists but not as administrator, update the role
      if (existingRushiAdmin && existingRushiAdmin.role !== 'administrator') {
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({ role: 'administrator' })
          .eq('id', existingRushiAdmin.id);
          
        if (updateError) {
          console.error('Error updating rushi admin role:', updateError);
        } else {
          console.log('Rushi admin role updated to administrator');
        }
      }
      // If rushi admin doesn't exist, create one
      else if (!existingRushiAdmin) {
        const { data: { user: rushiUser }, error: rushiSignUpError } = await supabase.auth.signUp({
          email: 'rushi1@gmail.com',
          password: 'Admin@123',
        });

        if (rushiSignUpError) {
          console.error('Error creating rushi admin user:', rushiSignUpError);
        } else if (rushiUser) {
          // Insert the rushi user into admin_users table with admin role
          const { error: rushiInsertError } = await supabase
            .from('admin_users')
            .insert({
              id: rushiUser.id,
              email: 'rushi1@gmail.com',
              role: 'administrator',
              password_hash: 'Admin@123' // In a real app, you'd properly hash this
            });

          if (rushiInsertError) {
            console.error('Error inserting rushi admin user:', rushiInsertError);
          } else {
            console.log('Rushi admin user created successfully with administrator role');
          }
        }
      }

      // Check if default admin@aiadmaxify.com exists
      const { data: existingAdmins, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', 'admin@aiadmaxify.com')
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking for admin user:', checkError);
      }

      // If admin doesn't exist, create one
      if (!existingAdmins) {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: 'admin@aiadmaxify.com',
          password: 'Admin@123',
        });

        if (signUpError) {
          console.error('Error creating admin user:', signUpError);
        } else if (user) {
          // Insert the user into admin_users table with admin role
          const { error: insertError } = await supabase
            .from('admin_users')
            .insert({
              id: user.id,
              email: 'admin@aiadmaxify.com',
              role: 'administrator',
              password_hash: 'Admin@123' // In a real app, you'd properly hash this
            });

          if (insertError) {
            console.error('Error inserting admin user:', insertError);
          } else {
            console.log('Admin user created successfully');
          }
        }
      }
    } catch (error) {
      console.error('Error in initializeAdminUser:', error);
    }
  };

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

      // Initialize admin user
      initializeAdminUser();
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
        console.log('User role fetched:', data.role);
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
        console.error('Admin user check error:', adminUserError);
        await supabase.auth.signOut();
        return { success: false, message: 'You do not have admin access' };
      }

      console.log('Admin user role:', adminUserData.role);
      
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

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/admin/reset-password',
      });
      
      if (error) {
        console.error('Password reset error:', error);
        return { success: false, message: error.message || 'Failed to send password reset email' };
      }
      
      return { success: true, message: 'Password reset email has been sent' };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { success: false, message: error.message || 'An unexpected error occurred' };
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
        initializeAdminUser,
        resetPassword,
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
