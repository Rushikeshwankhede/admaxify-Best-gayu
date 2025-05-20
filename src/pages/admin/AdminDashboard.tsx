
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  MessageSquare, 
  Users, 
  Inbox, 
  Calendar, 
  Clock, 
  TrendingUp,
  Award
} from 'lucide-react';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    services: 0,
    testimonials: 0,
    teamMembers: 0,
    awards: 0,
    formSubmissions: 0,
    unreadSubmissions: 0,
    bookings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Services count
        const { count: servicesCount, error: servicesError } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        // Testimonials count
        const { count: testimonialsCount, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true });

        // Team members count
        const { count: teamMembersCount, error: teamMembersError } = await supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true });

        // Awards count
        const { count: awardsCount, error: awardsError } = await supabase
          .from('awards_recognitions')
          .select('*', { count: 'exact', head: true });

        // Form submissions
        const { count: submissionsCount, error: submissionsError } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true });

        // Unread form submissions
        const { count: unreadSubmissionsCount, error: unreadSubmissionsError } = await supabase
          .from('form_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('viewed', false);

        // Strategy call bookings
        const { count: bookingsCount, error: bookingsError } = await supabase
          .from('strategy_call_bookings')
          .select('*', { count: 'exact', head: true });

        // Pending strategy call bookings
        const { count: pendingBookingsCount, error: pendingBookingsError } = await supabase
          .from('strategy_call_bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Recent form submissions
        const { data: recentSubmissionsData, error: recentSubmissionsError } = await supabase
          .from('form_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Recent strategy call bookings
        const { data: recentBookingsData, error: recentBookingsError } = await supabase
          .from('strategy_call_bookings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (servicesError || testimonialsError || teamMembersError || awardsError || 
            submissionsError || unreadSubmissionsError || bookingsError || 
            pendingBookingsError || recentSubmissionsError || recentBookingsError) {
          console.error("Error fetching data:", 
            servicesError || testimonialsError || teamMembersError || 
            submissionsError || unreadSubmissionsError || bookingsError || 
            pendingBookingsError || recentSubmissionsError || recentBookingsError
          );
        }

        setCounts({
          services: servicesCount || 0,
          testimonials: testimonialsCount || 0,
          teamMembers: teamMembersCount || 0,
          awards: awardsCount || 0,
          formSubmissions: submissionsCount || 0,
          unreadSubmissions: unreadSubmissionsCount || 0,
          bookings: bookingsCount || 0,
          pendingBookings: pendingBookingsCount || 0,
        });

        setRecentSubmissions(recentSubmissionsData || []);
        setRecentBookings(recentBookingsData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const DashboardCard = ({ 
    title, 
    value, 
    icon: Icon, 
    description, 
    linkTo,
    color = "text-agency-purple"
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    description?: string;
    linkTo: string;
    color?: string;
  }) => (
    <Link to={linkTo}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-5 w-5 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | AIAdmaxify</title>
      </Helmet>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Admin Dashboard</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <DashboardCard
                title="Total Services"
                value={counts.services}
                icon={Package}
                linkTo="/admin/services"
              />
              <DashboardCard
                title="Total Testimonials"
                value={counts.testimonials}
                icon={MessageSquare}
                linkTo="/admin/testimonials"
              />
              <DashboardCard
                title="Team Members"
                value={counts.teamMembers}
                icon={Users}
                linkTo="/admin/team"
              />
              <DashboardCard
                title="Awards & Recognitions"
                value={counts.awards}
                icon={Award}
                linkTo="/admin/awards"
              />
              <DashboardCard
                title="Form Submissions"
                value={counts.formSubmissions}
                icon={Inbox}
                description={`${counts.unreadSubmissions} unread`}
                linkTo="/admin/submissions"
                color={counts.unreadSubmissions > 0 ? "text-amber-500" : "text-agency-purple"}
              />
              <DashboardCard
                title="Strategy Call Bookings"
                value={counts.bookings}
                icon={Calendar}
                description={`${counts.pendingBookings} pending`}
                linkTo="/admin/bookings"
                color={counts.pendingBookings > 0 ? "text-amber-500" : "text-agency-purple"}
              />
              <DashboardCard
                title="Website Engagement"
                value={counts.formSubmissions + counts.bookings}
                icon={TrendingUp}
                description="Total user interactions"
                linkTo="/admin/submissions"
              />
              <DashboardCard
                title="Recent Activity"
                value={recentSubmissions.length + recentBookings.length}
                icon={Clock}
                description="New interactions in the last 7 days"
                linkTo="/admin/submissions"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Form Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Form Submissions</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentSubmissions.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {recentSubmissions.map((submission) => (
                        <div key={submission.id} className="py-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {submission.submission_data.name || 'Anonymous User'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {submission.submission_data.email || 'No email provided'}
                              </p>
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatDate(submission.created_at)}
                            </span>
                          </div>
                          {!submission.viewed && (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 mt-1">
                              New
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No recent submissions
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to="/admin/submissions" className="text-sm text-agency-purple hover:underline">
                    View all submissions →
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Strategy Call Bookings</CardTitle>
                  <CardDescription>Latest strategy call requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="py-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-sm text-gray-500">{booking.email}</p>
                              {booking.company && (
                                <p className="text-xs text-gray-500">{booking.company}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-gray-400">
                                {formatDate(booking.created_at)}
                              </span>
                              <div className="mt-1">
                                <span 
                                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                    booking.status === 'pending' 
                                      ? 'bg-amber-100 text-amber-800' 
                                      : booking.status === 'confirmed' 
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No recent bookings
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to="/admin/bookings" className="text-sm text-agency-purple hover:underline">
                    View all bookings →
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
