
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Package, 
  Users, 
  FileText, 
  Award,
  LogOut, 
  Menu,
  ChevronDown,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, session, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!session) {
      navigate('/admin/login');
    }
  }, [session, navigate]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Package },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Team Members', href: '/admin/team', icon: Users },
    { name: 'Form Submissions', href: '/admin/submissions', icon: FileText },
    { name: 'Strategy Call Bookings', href: '/admin/bookings', icon: FileText },
    { name: 'Awards', href: '/admin/awards', icon: Award },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  // Only show Admin Users management to administrators
  if (role === 'administrator') {
    navigationItems.push({ 
      name: 'Admin Users', 
      href: '/admin/users', 
      icon: User 
    });
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (!session) {
    return null; // Don't render anything if not logged in
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white shadow z-10">
        <div className="flex items-center justify-center h-16 px-4 bg-agency-navy text-white">
          <Link to="/" className="text-xl font-bold">AIAdmaxify Admin</Link>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-agency-purple bg-opacity-10 text-agency-purple'
                    : 'text-gray-600 hover:bg-gray-100'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon 
                  className={`${
                    isActive(item.href) ? 'text-agency-purple' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 flex-shrink-0 h-5 w-5`} 
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center justify-between w-full text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-agency-purple text-white rounded-full flex items-center justify-center">
                    {session.user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-sm font-medium truncate max-w-[120px]">
                    {session.user?.email}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs text-muted-foreground">
                Role: {role || 'Loading...'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between h-16 bg-white px-4 border-b">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-agency-purple"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-4 font-semibold text-agency-navy">AIAdmaxify Admin</div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-2">
              <div className="w-8 h-8 bg-agency-purple text-white rounded-full flex items-center justify-center">
                {session.user?.email?.charAt(0).toUpperCase()}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="truncate max-w-[200px] block">{session.user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foreground">
              Role: {role || 'Loading...'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-agency-navy">AIAdmaxify Admin</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-agency-purple bg-opacity-10 text-agency-purple'
                        : 'text-gray-600 hover:bg-gray-100'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon 
                      className={`${
                        isActive(item.href) ? 'text-agency-purple' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-5 w-5`} 
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
