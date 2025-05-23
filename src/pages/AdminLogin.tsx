
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { AlertCircle, Info } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const AdminLogin = () => {
  const { signIn, session, loading, initializeAdminUser, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('rushiwankhede0503@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetSubmitting, setIsResetSubmitting] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [initializingAdmin, setInitializingAdmin] = useState(false);
  const [initializationComplete, setInitializationComplete] = useState(false);
  
  useEffect(() => {
    // If user is already logged in, redirect to admin dashboard
    if (session && !loading) {
      navigate('/admin');
    }
  }, [session, loading, navigate]);

  // Initialize admin user separately 
  useEffect(() => {
    const setupAdminUser = async () => {
      try {
        setInitializingAdmin(true);
        await initializeAdminUser();
        toast.success("Admin user initialized. You can now login.");
        setInitializationComplete(true);
      } catch (error) {
        console.error('Error initializing admin user:', error);
        toast.error("Failed to initialize admin user. Please try again.");
      } finally {
        setInitializingAdmin(false);
      }
    };
    
    setupAdminUser();
  }, [initializeAdminUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log(`Attempting to sign in with: ${email}`);
      const { success, message } = await signIn(email, password);
      
      if (success) {
        toast.success('Login successful');
        navigate('/admin');
      } else {
        setLoginAttempts(prev => prev + 1);
        toast.error(message || 'Login failed');
        console.error('Login failed:', message);
        
        if (loginAttempts >= 2) {
          // Force re-initialization of admin user
          setInitializingAdmin(true);
          await initializeAdminUser();
          toast.info('Admin account refreshed. Please try again with the default credentials.');
          setInitializingAdmin(false);
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setIsResetSubmitting(true);
    
    try {
      const { success, message } = await resetPassword(resetEmail);
      
      if (success) {
        toast.success(message || 'Password reset email sent successfully');
        setResetDialogOpen(false);
      } else {
        toast.error(message || 'Failed to send password reset email');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsResetSubmitting(false);
    }
  };

  // If already authenticated, redirect to admin dashboard
  if (session && !loading) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | AIAdmaxify</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-agency-navy to-agency-charcoal py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Default credentials info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Default login: <strong>rushiwankhede0503@gmail.com</strong> / <strong>Admin@123</strong>
                    </p>
                  </div>
                </div>
              </div>
              
              {initializingAdmin && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3 flex items-center">
                      <p className="text-sm text-yellow-700">
                        Initializing admin user, please wait...
                      </p>
                      <div className="ml-2 w-4 h-4 border-2 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {initializationComplete && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Admin user initialized successfully. You can now login.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="px-0 text-sm text-agency-purple">
                        Forgot password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            className="bg-agency-purple hover:bg-agency-navy"
                            disabled={isResetSubmitting}
                          >
                            {isResetSubmitting ? 'Sending...' : 'Send Reset Link'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-agency-purple hover:bg-agency-navy"
                disabled={isSubmitting || initializingAdmin}
              >
                {isSubmitting ? 'Signing In...' : initializingAdmin ? 'Initializing...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
