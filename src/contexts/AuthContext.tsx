
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
      // Check if admin user already exists
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', 'rushiwankhede0503@gmail.com')
        .single();

      if (!checkError && existingAdmin) {
        console.log('Admin user already exists, no need to create');
        return;
      }

      // Create new primary admin user
      const { data: { user: newAdminUser }, error: signUpError } = await supabase.auth.signUp({
        email: 'rushiwankhede0503@gmail.com',
        password: 'Admin@123',
      });

      if (signUpError) {
        console.error('Error creating new admin user:', signUpError);
      } else if (newAdminUser) {
        // Insert the user into admin_users table with admin role
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert({
            id: newAdminUser.id,
            email: 'rushiwankhede0503@gmail.com',
            role: 'administrator',
            password_hash: 'Admin@123' // In a real app, you'd properly hash this
          });

        if (insertError) {
          console.error('Error inserting new admin user:', insertError);
        } else {
          console.log('New admin user created successfully with administrator role');
        }
      }

      // Create a default account
      const { data: existingDefault, error: checkDefaultError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', 'admin@aiadmaxify.com')
        .single();

      if (!checkDefaultError && existingDefault) {
        console.log('Default user already exists, no need to create');
        return;
      }

      const { data: { user: defaultUser }, error: defaultSignUpError } = await supabase.auth.signUp({
        email: 'admin@aiadmaxify.com',
        password: 'Admin@123',
      });

      if (defaultSignUpError) {
        console.error('Error creating default admin user:', defaultSignUpError);
      } else if (defaultUser) {
        const { error: defaultInsertError } = await supabase
          .from('admin_users')
          .insert({
            id: defaultUser.id,
            email: 'admin@aiadmaxify.com',
            role: 'administrator',
            password_hash: 'Admin@123'
          });

        if (defaultInsertError) {
          console.error('Error inserting default admin user:', defaultInsertError);
        } else {
          console.log('Default admin user created successfully');
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
    const setupInitialSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        
        // Fetch role if logged in
        if (currentSession?.user) {
          await fetchUserRole(currentSession.user.id);
        }
        
        setLoading(false);

        // Initialize admin user
        await initializeAdminUser();
      } catch (error) {
        console.error('Error setting up session:', error);
        setLoading(false);
      }
    };

    setupInitialSession();

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

      if (adminUserError) {
        console.error('Admin user check error:', adminUserError);
        // Instead of signing out immediately, let's create the admin entry if it doesn't exist
        if (email === 'rushiwankhede0503@gmail.com' || email === 'admin@aiadmaxify.com') {
          const { error: insertError } = await supabase
            .from('admin_users')
            .insert({
              id: data.user.id,
              email: email,
              role: 'administrator',
              password_hash: password // In a real app, you'd properly hash this
            });
            
          if (insertError) {
            console.error('Error creating admin entry for existing auth user:', insertError);
            await supabase.auth.signOut();
            return { success: false, message: 'Failed to create admin access' };
          } else {
            console.log('Created admin entry for existing auth user');
            setRole('administrator');
            
            // Update last login time
            await supabase
              .from('admin_users')
              .update({ last_login: new Date().toISOString() })
              .eq('id', data.user.id);
              
            return { success: true };
          }
        } else {
          await supabase.auth.signOut();
          return { success: false, message: 'You do not have admin access' };
        }
      }

      if (!adminUserData) {
        await supabase.auth.signOut();
        return { success: false, message: 'Admin user data not found' };
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
      // Direct check in admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
      if (error || !data) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data.role === 'administrator';
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
