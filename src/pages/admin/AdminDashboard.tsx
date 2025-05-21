
import React from 'react';
import { Helmet } from 'react-helmet';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import DashboardView from '@/components/admin/Dashboard/DashboardView';

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <Helmet>
        <title>Admin Dashboard | AIAdmaxify</title>
      </Helmet>
      <DashboardView />
    </ProtectedRoute>
  );
};

export default AdminDashboard;
