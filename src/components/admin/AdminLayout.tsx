
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Mail,
  LogOut,
  Calendar,
  ListChecks,
  Users,
  Award,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const isCurrent = (path: string) => {
    return location.pathname === path;
  };

  const canEdit = role === 'editor' || role === 'administrator';
  const canAdmin = role === 'administrator';

  const navLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />,
      access: true, // all roles
    },
    {
      name: 'Services',
      path: '/admin/services-management',
      icon: <ListChecks size={20} />,
      access: canEdit,
    },
    {
      name: 'Testimonials',
      path: '/admin/testimonials-management',
      icon: <FileText size={20} />,
      access: canEdit,
    },
    {
      name: 'About Us',
      path: '/admin/about-us-management',
      icon: <Users size={20} />,
      access: canEdit,
    },
    {
      name: 'Contact Submissions',
      path: '/admin/contact-submissions',
      icon: <Mail size={20} />,
      access: true, // all roles
    },
    {
      name: 'Strategy Calls',
      path: '/admin/strategy-call-bookings',
      icon: <Calendar size={20} />,
      access: true, // all roles
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings size={20} />,
      access: canAdmin,
    },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | AIAdmaxify</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-100">
        {/* Mobile sidebar toggle button */}
        <div className="lg:hidden fixed z-20 top-4 left-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-10 transform bg-agency-charcoal text-white w-64 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
              <h1 className="text-xl font-bold">AIAdmaxify Admin</h1>
            </div>

            {/* Sidebar link role notice */}
            <div className="px-4 py-2 text-xs text-gray-400">
              Logged in as: {role}
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1">
                {navLinks.map(
                  (link) =>
                    link.access && (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 ${
                            isCurrent(link.path) ? 'bg-gray-700 text-white' : ''
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="mr-3">{link.icon}</span>
                          {link.name}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-700">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
              
              <Link to="/" target="_blank" rel="noopener noreferrer" className="mt-4 text-center block text-sm text-gray-400 hover:text-white">
                View Public Site
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-5 bg-gray-900 bg-opacity-50 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 ml-0 lg:ml-64 transition-all duration-200">
          <main className="p-5">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
