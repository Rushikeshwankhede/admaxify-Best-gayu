
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Award } from '@/types/admin';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdminAwardsManagement = () => {
  const queryClient = useQueryClient();
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAward, setCurrentAward] = useState<Award | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    organization: '',
    year: new Date().getFullYear(),
    description: '',
    image: '',
    orderIndex: 0
  });

  // Fetch awards
  const { data: awards = [], isLoading } = useQuery({
    queryKey: ['admin-awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards_recognitions')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        toast.error('Failed to fetch awards');
        console.error('Error fetching awards:', error);
        return [];
      }
      
      return data.map((award) => ({
        id: award.id,
        title: award.title,
        organization: award.organization,
        year: award.year,
        description: award.description,
        image: award.image || '',
        orderIndex: award.order_index,
        createdAt: award.created_at,
        updatedAt: award.updated_at
      })) as Award[];
    }
  });

  // Create award mutation
  const createAwardMutation = useMutation({
    mutationFn: async (newAward: Omit<Award, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('awards_recognitions')
        .insert({
          title: newAward.title,
          organization: newAward.organization,
          year: newAward.year,
          description: newAward.description,
          image: newAward.image || null,
          order_index: newAward.orderIndex
        });
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Award created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
      resetForm();
      setIsAwardModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create award: ${error.message}`);
    }
  });

  // Update award mutation
  const updateAwardMutation = useMutation({
    mutationFn: async (updatedAward: Omit<Award, 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('awards_recognitions')
        .update({
          title: updatedAward.title,
          organization: updatedAward.organization,
          year: updatedAward.year,
          description: updatedAward.description,
          image: updatedAward.image || null,
          order_index: updatedAward.orderIndex,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedAward.id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Award updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
      resetForm();
      setIsAwardModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update award: ${error.message}`);
    }
  });

  // Delete award mutation
  const deleteAwardMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('awards_recognitions')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Award deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete award: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      organization: '',
      year: new Date().getFullYear(),
      description: '',
      image: '',
      orderIndex: awards.length
    });
    setCurrentAward(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsAwardModalOpen(true);
  };

  const openEditModal = (award: Award) => {
    setFormData({
      id: award.id,
      title: award.title,
      organization: award.organization,
      year: award.year,
      description: award.description,
      image: award.image || '',
      orderIndex: award.orderIndex
    });
    setCurrentAward(award);
    setIsAwardModalOpen(true);
  };

  const openDeleteDialog = (award: Award) => {
    setCurrentAward(award);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!formData.organization.trim()) {
      toast.error('Organization is required');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    
    const awardData = {
      ...formData,
      year: Number(formData.year),
      orderIndex: Number(formData.orderIndex)
    };

    if (currentAward) {
      // Update existing award
      updateAwardMutation.mutate(awardData);
    } else {
      // Create new award
      createAwardMutation.mutate(awardData);
    }
  };

  const handleDelete = () => {
    if (currentAward) {
      deleteAwardMutation.mutate(currentAward.id);
    }
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>Awards Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Awards & Recognition Management</h1>
          <Button onClick={openCreateModal} className="bg-agency-purple hover:bg-agency-navy">
            <Plus className="mr-2 h-4 w-4" /> Add New Award
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {awards.map((award) => (
                <AccordionItem value={award.id} key={award.id}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span className="font-medium">{award.title}</span>
                      <span className="text-sm text-gray-500">{award.organization} - {award.year}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {award.image && (
                          <div>
                            <img 
                              src={award.image} 
                              alt={award.title} 
                              className="w-full h-auto object-cover rounded-lg shadow-md"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/400x200?text=Award+Image';
                              }}
                            />
                          </div>
                        )}
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Organization:</h3>
                            <p>{award.organization}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Year:</h3>
                            <p>{award.year}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Order:</h3>
                            <p className="text-gray-600">{award.orderIndex}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Description:</h3>
                            <p className="text-gray-600">{award.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                          onClick={() => openEditModal(award)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => openDeleteDialog(award)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>

      {/* Create/Edit Award Modal */}
      <Dialog open={isAwardModalOpen} onOpenChange={setIsAwardModalOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{currentAward ? 'Edit Award' : 'Create New Award'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter award title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="Enter organization name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max="2100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderIndex">Display Order</Label>
                  <Input
                    id="orderIndex"
                    name="orderIndex"
                    type="number"
                    value={formData.orderIndex}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  rows={4}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAwardModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentAward ? 'Update' : 'Create'}
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
          <p>Are you sure you want to delete the award "{currentAward?.title}"? This action cannot be undone.</p>
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

export default AdminAwardsManagement;
