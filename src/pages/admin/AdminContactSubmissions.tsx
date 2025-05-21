
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Eye, EyeOff, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  viewed: boolean;
}

const AdminContactSubmissions = () => {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState<ContactSubmission | null>(null);
  const [tabValue, setTabValue] = useState("all");

  // Fetch contact submissions
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('form_type', 'contact')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to fetch contact form submissions');
        console.error('Error fetching submissions:', error);
        return [];
      }
      
      return data.map((submission: any) => ({
        id: submission.id,
        name: submission.submission_data.name || 'Unknown',
        email: submission.submission_data.email || 'No email provided',
        message: submission.submission_data.message || 'No message provided',
        createdAt: submission.created_at,
        viewed: submission.viewed
      }));
    }
  });

  // Mark as viewed mutation
  const markAsViewedMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('form_submissions')
        .update({ viewed: true })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
    onError: (error) => {
      toast.error(`Failed to mark as read: ${error.message}`);
    }
  });

  // Delete submission mutation
  const deleteSubmissionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Submission deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete submission: ${error.message}`);
    }
  });

  const handleMarkAsViewed = (submission: ContactSubmission) => {
    if (!submission.viewed) {
      markAsViewedMutation.mutate(submission.id);
    }
  };

  const openDeleteDialog = (submission: ContactSubmission) => {
    setCurrentSubmission(submission);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (currentSubmission) {
      deleteSubmissionMutation.mutate(currentSubmission.id);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (tabValue === "unread") return !submission.viewed;
    if (tabValue === "read") return submission.viewed;
    return true; // "all" tab
  });

  const unreadCount = submissions.filter(submission => !submission.viewed).length;

  return (
    <ProtectedRoute requiredRole="viewer">
      <Helmet>
        <title>Contact Form Submissions | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm px-3">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
        
        <Tabs value={tabValue} onValueChange={setTabValue} className="mb-6">
          <TabsList className="grid grid-cols-3 max-w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No contact form submissions found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredSubmissions.map((submission) => (
                <AccordionItem value={submission.id} key={submission.id}>
                  <AccordionTrigger 
                    className={`px-4 py-2 rounded-lg ${!submission.viewed ? 'hover:bg-blue-50 bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleMarkAsViewed(submission)}
                  >
                    <div className="flex justify-between items-center w-full pr-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-left">
                        <span className="font-semibold">{submission.name}</span>
                        <span className="text-sm text-gray-500">{submission.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {!submission.viewed ? (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            New
                          </Badge>
                        ) : null}
                        <span className="text-xs text-gray-500">
                          {format(new Date(submission.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="border-0 shadow-none">
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">From:</h3>
                            <p className="text-gray-700">{submission.name} ({submission.email})</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Date:</h3>
                            <p className="text-gray-700">{format(new Date(submission.createdAt), 'PPpp')}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Message:</h3>
                            <p className="text-gray-700 whitespace-pre-line">{submission.message}</p>
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className={submission.viewed ? 
                                "border-gray-300 text-gray-500" : 
                                "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"}
                              disabled={submission.viewed}
                              onClick={() => handleMarkAsViewed(submission)}
                            >
                              {submission.viewed ? (
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
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => openDeleteDialog(submission)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                          </div>
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
          <p>Are you sure you want to delete this contact submission from "{currentSubmission?.name}"? This action cannot be undone.</p>
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

export default AdminContactSubmissions;
