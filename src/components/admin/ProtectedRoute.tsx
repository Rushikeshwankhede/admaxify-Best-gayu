
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppRole } from '@/types/admin';
import AdminLayout from './AdminLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: AppRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { session, loading, role } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!session) {
        setIsAuthorized(false);
        return;
      }

      if (requiredRole) {
        // Check if user has the required role or higher privileges
        if (requiredRole === 'viewer') {
          setIsAuthorized(true);
        } else if (requiredRole === 'editor') {
          setIsAuthorized(role === 'editor' || role === 'administrator');
        } else if (requiredRole === 'administrator') {
          setIsAuthorized(role === 'administrator');
        }
      } else {
        // No specific role required, just need to be logged in
        setIsAuthorized(true);
      }
    }
  }, [session, loading, role, requiredRole]);

  if (loading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    if (!session) {
      return <Navigate to="/admin/login" replace />;
    } else {
      // User is logged in but doesn't have the required role
      return (
        <AdminLayout>
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600">
              You don't have the required permissions to access this page.
            </p>
          </div>
        </AdminLayout>
      );
    }
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default ProtectedRoute;
