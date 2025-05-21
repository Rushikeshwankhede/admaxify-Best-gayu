
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Star, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Testimonial } from '@/types/admin';
import { mapDbTestimonialToTestimonial } from '@/lib/dataTransformers';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminTestimonialsManagement = () => {
  const queryClient = useQueryClient();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    company: '',
    position: '',
    image: '',
    rating: 5,
    testimonial: '',
    industry: '',
    resultSummary: '',
    results: {
      before: '',
      after: ''
    }
  });

  // Fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast.error('Failed to fetch testimonials');
        console.error('Error fetching testimonials:', error);
        return [];
      }
      
      return data.map(testimonial => mapDbTestimonialToTestimonial(testimonial));
    }
  });

  // Create testimonial mutation
  const createTestimonialMutation = useMutation({
    mutationFn: async (newTestimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: newTestimonial.name,
          company: newTestimonial.company,
          position: newTestimonial.position,
          image: newTestimonial.image,
          rating: newTestimonial.rating,
          testimonial: newTestimonial.testimonial,
          industry: newTestimonial.industry,
          result_summary: newTestimonial.resultSummary,
          results: {
            before: newTestimonial.results.before,
            after: newTestimonial.results.after
          }
        });
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Testimonial created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      resetForm();
      setIsTestimonialModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create testimonial: ${error.message}`);
    }
  });

  // Update testimonial mutation
  const updateTestimonialMutation = useMutation({
    mutationFn: async (updatedTestimonial: Omit<Testimonial, 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: updatedTestimonial.name,
          company: updatedTestimonial.company,
          position: updatedTestimonial.position,
          image: updatedTestimonial.image,
          rating: updatedTestimonial.rating,
          testimonial: updatedTestimonial.testimonial,
          industry: updatedTestimonial.industry,
          result_summary: updatedTestimonial.resultSummary,
          results: {
            before: updatedTestimonial.results.before,
            after: updatedTestimonial.results.after
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedTestimonial.id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Testimonial updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      resetForm();
      setIsTestimonialModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update testimonial: ${error.message}`);
    }
  });

  // Delete testimonial mutation
  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Testimonial deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete testimonial: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResultChange = (field: 'before' | 'after', value: string) => {
    setFormData({
      ...formData,
      results: {
        ...formData.results,
        [field]: value
      }
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      company: '',
      position: '',
      image: '',
      rating: 5,
      testimonial: '',
      industry: '',
      resultSummary: '',
      results: {
        before: '',
        after: ''
      }
    });
    setCurrentTestimonial(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsTestimonialModalOpen(true);
  };

  const openEditModal = (testimonial: Testimonial) => {
    setFormData({
      id: testimonial.id,
      name: testimonial.name,
      company: testimonial.company,
      position: testimonial.position,
      image: testimonial.image,
      rating: testimonial.rating,
      testimonial: testimonial.testimonial,
      industry: testimonial.industry,
      resultSummary: testimonial.resultSummary || '',
      results: {
        before: testimonial.results.before,
        after: testimonial.results.after
      }
    });
    setCurrentTestimonial(testimonial);
    setIsTestimonialModalOpen(true);
  };

  const openDeleteDialog = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.company.trim()) {
      toast.error('Company is required');
      return;
    }
    
    if (!formData.testimonial.trim()) {
      toast.error('Testimonial text is required');
      return;
    }

    if (currentTestimonial) {
      // Update existing testimonial
      updateTestimonialMutation.mutate(formData);
    } else {
      // Create new testimonial
      createTestimonialMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (currentTestimonial) {
      deleteTestimonialMutation.mutate(currentTestimonial.id);
    }
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>Testimonials Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <Button onClick={openCreateModal} className="bg-agency-purple hover:bg-agency-navy">
            <Plus className="mr-2 h-4 w-4" /> Add New Testimonial
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {testimonials.map((testimonial) => (
                <AccordionItem value={testimonial.id} key={testimonial.id}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="flex justify-between items-center w-full pr-4">
                      <div className="flex items-center">
                        {testimonial.image && (
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <span>{testimonial.name} - {testimonial.company}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="border-0 shadow-none">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h3 className="font-semibold mb-2">Position:</h3>
                            <p className="text-gray-700">{testimonial.position}</p>
                            
                            <h3 className="font-semibold mt-4 mb-2">Industry:</h3>
                            <p className="text-gray-700">{testimonial.industry}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Result Summary:</h3>
                            <p className="text-gray-700">{testimonial.resultSummary || 'N/A'}</p>
                            
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <div>
                                <h4 className="font-semibold mb-1">Before:</h4>
                                <p className="text-gray-700">{testimonial.results.before}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-1">After:</h4>
                                <p className="text-gray-700">{testimonial.results.after}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold mb-2">Testimonial:</h3>
                        <p className="text-gray-700 mb-4">{testimonial.testimonial}</p>
                        
                        <h3 className="font-semibold mb-2">Image URL:</h3>
                        <p className="text-gray-700 text-sm mb-4 break-all">{testimonial.image}</p>

                        <div className="flex space-x-3 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                            onClick={() => openEditModal(testimonial)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => openDeleteDialog(testimonial)}
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

      {/* Create/Edit Testimonial Modal */}
      <Dialog open={isTestimonialModalOpen} onOpenChange={setIsTestimonialModalOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Enter position/title"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} {rating === 1 ? 'Star' : 'Stars'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">Testimonial *</Label>
                <Textarea
                  id="testimonial"
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                  placeholder="Enter client testimonial"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="Enter industry"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resultSummary">Result Summary</Label>
                  <Input
                    id="resultSummary"
                    name="resultSummary"
                    value={formData.resultSummary}
                    onChange={handleInputChange}
                    placeholder="E.g., '150% ROI Increase'"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="before">Before Result *</Label>
                  <Input
                    id="before"
                    value={formData.results.before}
                    onChange={(e) => handleResultChange('before', e.target.value)}
                    placeholder="E.g., '2% conversion rate'"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="after">After Result *</Label>
                  <Input
                    id="after"
                    value={formData.results.after}
                    onChange={(e) => handleResultChange('after', e.target.value)}
                    placeholder="E.g., '8% conversion rate'"
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTestimonialModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the testimonial from "{currentTestimonial?.name}"? This action cannot be undone.</p>
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

export default AdminTestimonialsManagement;
