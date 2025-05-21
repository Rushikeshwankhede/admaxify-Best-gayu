
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Mail, User, FileText, ArrowRight, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const DashboardView = () => {
  const { role } = useAuth();
  
  // Fetch counts
  const { data: serviceCounts = 0 } = useQuery({
    queryKey: ['services-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching services count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });
  
  const { data: testimonialCounts = 0 } = useQuery({
    queryKey: ['testimonials-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching testimonials count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });

  const { data: contactSubmissionCounts = 0, isLoading: loadingContact } = useQuery({
    queryKey: ['contact-submissions-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('form_type', 'contact');
      
      if (error) {
        console.error('Error fetching contact form submissions count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });

  const { data: strategyCallCounts = 0, isLoading: loadingCalls } = useQuery({
    queryKey: ['strategy-call-bookings-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('strategy_call_bookings')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching strategy call bookings count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });
  
  const { data: unreadContact = 0 } = useQuery({
    queryKey: ['unread-contact-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('form_type', 'contact')
        .eq('viewed', false);
      
      if (error) {
        console.error('Error fetching unread contact submissions count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });
  
  const { data: unreadCalls = 0 } = useQuery({
    queryKey: ['unread-calls-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('strategy_call_bookings')
        .select('*', { count: 'exact', head: true })
        .eq('viewed', false);
      
      if (error) {
        console.error('Error fetching unread strategy call bookings count:', error);
        return 0;
      }
      
      return count || 0;
    }
  });
  
  const canEdit = role === 'editor' || role === 'administrator';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{serviceCounts}</div>
              {canEdit && (
                <p className="text-xs text-agency-purple mt-2">
                  <Link to="/admin/services-management" className="flex items-center">
                    Manage Services <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <User className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonialCounts}</div>
              {canEdit && (
                <p className="text-xs text-agency-purple mt-2">
                  <Link to="/admin/testimonials-management" className="flex items-center">
                    Manage Testimonials <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <Mail className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingContact ? "..." : contactSubmissionCounts}
                {unreadContact > 0 && (
                  <span className="ml-2 text-sm bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {unreadContact} new
                  </span>
                )}
              </div>
              <p className="text-xs text-agency-purple mt-2">
                <Link to="/admin/contact-submissions" className="flex items-center">
                  View Messages <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Strategy Calls</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loadingCalls ? "..." : strategyCallCounts}
                {unreadCalls > 0 && (
                  <span className="ml-2 text-sm bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {unreadCalls} new
                  </span>
                )}
              </div>
              <p className="text-xs text-agency-purple mt-2">
                <Link to="/admin/strategy-call-bookings" className="flex items-center">
                  View Bookings <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/contact-submissions">
                  <Mail className="mr-2 h-4 w-4" /> Contact Submissions
                  {unreadContact > 0 && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {unreadContact}
                    </span>
                  )}
                </Link>
              </Button>
              
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/strategy-call-bookings">
                  <Calendar className="mr-2 h-4 w-4" /> Strategy Call Bookings
                  {unreadCalls > 0 && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      {unreadCalls}
                    </span>
                  )}
                </Link>
              </Button>
              
              {canEdit && (
                <>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/admin/services-management">
                      <FileText className="mr-2 h-4 w-4" /> Manage Services
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/admin/testimonials-management">
                      <User className="mr-2 h-4 w-4" /> Manage Testimonials
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/admin/about-us-management">
                      <UsersIcon className="mr-2 h-4 w-4" /> Manage About Us
                    </Link>
                  </Button>
                </>
              )}
              
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="mr-2 h-4 w-4" /> View Public Site
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Welcome to the AIAdmaxify admin dashboard! Here you can manage your website's content and view submissions from your visitors.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Getting Started:</h3>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Use the sidebar menu to navigate between different sections</li>
                <li>Check for new contact form submissions and strategy call bookings regularly</li>
                <li>Update your services, testimonials, and about us content to keep your site fresh</li>
                <li>Default login credentials: admin@aiadmaxify.com / Admin@123</li>
              </ul>
            </div>
            <div className="text-sm text-gray-500 mt-4">
              <p>For technical support, please contact your website administrator.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
