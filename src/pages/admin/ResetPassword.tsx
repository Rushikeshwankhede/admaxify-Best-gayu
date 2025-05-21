
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashError, setHashError] = useState<string | null>(null);

  // Check for hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#access_token=')) {
      setHashError('Invalid or expired password reset link. Please request a new one.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        throw error;
      }

      toast.success('Password updated successfully');
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'An error occurred while updating your password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | AIAdmaxify</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-agency-navy to-agency-charcoal py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter a new password for your account
            </CardDescription>
          </CardHeader>
          
          {hashError ? (
            <CardContent className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-red-700">{hashError}</p>
              </div>
              <Button 
                className="w-full bg-agency-purple hover:bg-agency-navy"
                onClick={() => navigate('/admin/login')}
              >
                Return to Login
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-agency-purple hover:bg-agency-navy"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating Password...' : 'Update Password'}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
