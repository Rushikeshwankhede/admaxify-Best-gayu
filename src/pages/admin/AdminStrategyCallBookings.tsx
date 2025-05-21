
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Eye, EyeOff, Trash2, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface StrategyCallBooking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  businessType: string;
  currentMarketing: string;
  goals: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: string;
  createdAt: string;
  viewed: boolean;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-500' },
  { value: 'completed', label: 'Completed', color: 'bg-green-500' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
];

const AdminStrategyCallBookings = () => {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<StrategyCallBooking | null>(null);
  const [tabValue, setTabValue] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch strategy call bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['strategy-call-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strategy_call_bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to fetch strategy call bookings');
        console.error('Error fetching bookings:', error);
        return [];
      }
      
      return data.map((booking: any) => ({
        id: booking.id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        company: booking.company,
        website: booking.website,
        businessType: booking.business_type,
        currentMarketing: booking.current_marketing,
        goals: booking.goals,
        preferredDate: booking.preferred_date,
        preferredTime: booking.preferred_time,
        notes: booking.notes,
        status: booking.status || 'pending',
        createdAt: booking.created_at,
        viewed: booking.viewed
      }));
    }
  });

  // Mark as viewed mutation
  const markAsViewedMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('strategy_call_bookings')
        .update({ viewed: true })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategy-call-bookings'] });
    },
    onError: (error) => {
      toast.error(`Failed to mark as read: ${error.message}`);
    }
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('strategy_call_bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['strategy-call-bookings'] });
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    }
  });

  // Delete booking mutation
  const deleteBookingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('strategy_call_bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Booking deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['strategy-call-bookings'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete booking: ${error.message}`);
    }
  });

  const handleMarkAsViewed = (booking: StrategyCallBooking) => {
    if (!booking.viewed) {
      markAsViewedMutation.mutate(booking.id);
    }
  };

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const openDeleteDialog = (booking: StrategyCallBooking) => {
    setCurrentBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentBooking) {
      deleteBookingMutation.mutate(currentBooking.id);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return (
      <Badge 
        variant="secondary" 
        className={`${statusOption?.color || 'bg-gray-500'} text-white`}
      >
        {statusOption?.label || status}
      </Badge>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    let showBasedOnReadStatus = true;
    if (tabValue === "unread") showBasedOnReadStatus = !booking.viewed;
    if (tabValue === "read") showBasedOnReadStatus = booking.viewed;
    
    let showBasedOnStatus = true;
    if (statusFilter !== "all") showBasedOnStatus = booking.status === statusFilter;
    
    return showBasedOnReadStatus && showBasedOnStatus;
  });

  const unreadCount = bookings.filter(booking => !booking.viewed).length;

  return (
    <ProtectedRoute requiredRole="viewer">
      <Helmet>
        <title>Strategy Call Bookings | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Strategy Call Bookings</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm px-3">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center">
          <div>
            <Tabs value={tabValue} onValueChange={setTabValue} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 w-full md:w-[300px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="w-full md:w-[250px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No strategy call bookings found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredBookings.map((booking) => (
                <AccordionItem value={booking.id} key={booking.id}>
                  <AccordionTrigger 
                    className={`px-4 py-2 rounded-lg ${!booking.viewed ? 'hover:bg-blue-50 bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleMarkAsViewed(booking)}
                  >
                    <div className="flex justify-between items-center w-full pr-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-left">
                        <span className="font-semibold">{booking.name}</span>
                        <span className="text-sm text-gray-500">{booking.company || 'No company'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(booking.status)}
                        {!booking.viewed ? (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            New
                          </Badge>
                        ) : null}
                        <span className="text-xs text-gray-500 hidden sm:inline-block">
                          {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="border-0 shadow-none">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold mb-2">Contact Information:</h3>
                              <p className="text-gray-700">Name: {booking.name}</p>
                              <p className="text-gray-700">Email: {booking.email}</p>
                              {booking.phone && <p className="text-gray-700">Phone: {booking.phone}</p>}
                              {booking.company && <p className="text-gray-700">Company: {booking.company}</p>}
                              {booking.website && (
                                <p className="text-gray-700">
                                  Website: <a href={booking.website} target="_blank" rel="noopener noreferrer" className="text-agency-purple hover:underline">{booking.website}</a>
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Requested Schedule:</h3>
                              <p className="text-gray-700">Date: {booking.preferredDate || 'Not specified'}</p>
                              <p className="text-gray-700">Time: {booking.preferredTime || 'Not specified'}</p>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">Business Type:</h3>
                              <p className="text-gray-700">{booking.businessType}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold mb-2">Current Marketing:</h3>
                              <p className="text-gray-700 whitespace-pre-line">{booking.currentMarketing}</p>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Goals:</h3>
                              <p className="text-gray-700 whitespace-pre-line">{booking.goals}</p>
                            </div>
                            
                            {booking.notes && (
                              <div>
                                <h3 className="font-semibold mb-2">Notes:</h3>
                                <p className="text-gray-700 whitespace-pre-line">{booking.notes}</p>
                              </div>
                            )}

                            <div>
                              <h3 className="font-semibold mb-2">Submitted:</h3>
                              <p className="text-gray-700">{format(new Date(booking.createdAt), 'PPpp')}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex flex-wrap gap-3 items-center">
                            <div className="mr-3">
                              <span className="font-semibold">Status:</span>
                            </div>
                            {statusOptions.map((option) => (
                              <Button
                                key={option.value}
                                variant={booking.status === option.value ? "default" : "outline"}
                                size="sm"
                                className={booking.status === option.value 
                                  ? `${option.color} text-white hover:${option.color}`
                                  : "border-gray-300"}
                                onClick={() => handleUpdateStatus(booking.id, option.value)}
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap space-x-3 mt-6">
                          {booking.phone && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white mb-2"
                              onClick={() => window.open(`tel:${booking.phone}`, '_blank')}
                            >
                              <Phone className="mr-2 h-4 w-4" /> Call
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className={booking.viewed ? 
                              "border-gray-300 text-gray-500 mb-2" : 
                              "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mb-2"}
                            disabled={booking.viewed}
                            onClick={() => handleMarkAsViewed(booking)}
                          >
                            {booking.viewed ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" /> Viewed
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" /> Mark as Read
                              </>
                            )}
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white mb-2"
                            onClick={() => openDeleteDialog(booking)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this strategy call booking from "{currentBooking?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
};

export default AdminStrategyCallBookings;
