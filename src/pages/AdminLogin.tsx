
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const { signIn, session, loading, initializeAdminUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@aiadmaxify.com');
  const [password, setPassword] = useState('Admin@123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  useEffect(() => {
    // Initialize default admin user if needed
    initializeAdminUser();
    
    // If user is already logged in, redirect to admin dashboard
    if (session && !loading) {
      navigate('/admin');
    }
  }, [session, loading, navigate, initializeAdminUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { success, message } = await signIn(email, password);
      
      if (success) {
        toast.success('Login successful');
        navigate('/admin');
      } else {
        setLoginAttempts(prev => prev + 1);
        toast.error(message || 'Login failed');
        
        // If multiple failed attempts, suggest using the default credentials
        if (loginAttempts >= 2) {
          toast.info('Try using the default credentials: admin@aiadmaxify.com / Admin@123');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setIsSubmitting(false);
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
                      Default login: <strong>admin@aiadmaxify.com</strong> / <strong>Admin@123</strong>
                    </p>
                  </div>
                </div>
              </div>
              
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
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
