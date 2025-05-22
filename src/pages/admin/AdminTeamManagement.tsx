
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from '@/types/admin';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdminTeamManagement = () => {
  const queryClient = useQueryClient();
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    position: '',
    bio: '',
    image: '',
    orderIndex: 0
  });

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        toast.error('Failed to fetch team members');
        console.error('Error fetching team members:', error);
        return [];
      }
      
      return data.map((member) => ({
        id: member.id,
        name: member.name,
        position: member.position,
        bio: member.bio,
        image: member.image,
        orderIndex: member.order_index,
        createdAt: member.created_at,
        updatedAt: member.updated_at
      })) as TeamMember[];
    }
  });

  // Create team member mutation
  const createTeamMemberMutation = useMutation({
    mutationFn: async (newTeamMember: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('team_members')
        .insert({
          name: newTeamMember.name,
          position: newTeamMember.position,
          bio: newTeamMember.bio,
          image: newTeamMember.image,
          order_index: newTeamMember.orderIndex
        });
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Team member created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      resetForm();
      setIsTeamMemberModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create team member: ${error.message}`);
    }
  });

  // Update team member mutation
  const updateTeamMemberMutation = useMutation({
    mutationFn: async (updatedTeamMember: Omit<TeamMember, 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('team_members')
        .update({
          name: updatedTeamMember.name,
          position: updatedTeamMember.position,
          bio: updatedTeamMember.bio,
          image: updatedTeamMember.image,
          order_index: updatedTeamMember.orderIndex,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedTeamMember.id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Team member updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      resetForm();
      setIsTeamMemberModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update team member: ${error.message}`);
    }
  });

  // Delete team member mutation
  const deleteTeamMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Team member deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete team member: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      position: '',
      bio: '',
      image: '',
      orderIndex: teamMembers.length
    });
    setCurrentTeamMember(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsTeamMemberModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setFormData({
      id: member.id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      orderIndex: member.orderIndex
    });
    setCurrentTeamMember(member);
    setIsTeamMemberModalOpen(true);
  };

  const openDeleteDialog = (member: TeamMember) => {
    setCurrentTeamMember(member);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.position.trim()) {
      toast.error('Position is required');
      return;
    }
    
    if (!formData.bio.trim()) {
      toast.error('Bio is required');
      return;
    }
    
    if (!formData.image.trim()) {
      toast.error('Image URL is required');
      return;
    }

    const teamMemberData = {
      ...formData,
      orderIndex: Number(formData.orderIndex)
    };

    if (currentTeamMember) {
      // Update existing team member
      updateTeamMemberMutation.mutate(teamMemberData);
    } else {
      // Create new team member
      createTeamMemberMutation.mutate(teamMemberData);
    }
  };

  const handleDelete = () => {
    if (currentTeamMember) {
      deleteTeamMemberMutation.mutate(currentTeamMember.id);
    }
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>Team Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Team Members Management</h1>
          <Button onClick={openCreateModal} className="bg-agency-purple hover:bg-agency-navy">
            <Plus className="mr-2 h-4 w-4" /> Add New Team Member
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {teamMembers.map((member) => (
                <AccordionItem value={member.id} key={member.id}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-gray-500">{member.position}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                            }}
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold">Position:</h3>
                            <p>{member.position}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Bio:</h3>
                            <p className="text-gray-600">{member.bio}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Order:</h3>
                            <p className="text-gray-600">{member.orderIndex}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                          onClick={() => openEditModal(member)}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          onClick={() => openDeleteDialog(member)}
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

      {/* Create/Edit Team Member Modal */}
      <Dialog open={isTeamMemberModalOpen} onOpenChange={setIsTeamMemberModalOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>{currentTeamMember ? 'Edit Team Member' : 'Create New Team Member'}</DialogTitle>
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
                  placeholder="Enter name"
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
                  placeholder="Enter position"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
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
                <Label htmlFor="orderIndex">Display Order</Label>
                <Input
                  id="orderIndex"
                  name="orderIndex"
                  type="number"
                  value={formData.orderIndex}
                  onChange={handleInputChange}
                  placeholder="Enter display order"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Enter bio"
                  rows={4}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTeamMemberModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentTeamMember ? 'Update' : 'Create'}
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
          <p>Are you sure you want to delete {currentTeamMember?.name}? This action cannot be undone.</p>
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

export default AdminTeamManagement;
