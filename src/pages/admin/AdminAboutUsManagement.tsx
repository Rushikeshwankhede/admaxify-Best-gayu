
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { TeamMember, Award as AwardType } from '@/types/admin';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdminAboutUsManagement = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('team');
  
  // Team members state
  const [isTeamMemberModalOpen, setIsTeamMemberModalOpen] = useState(false);
  const [isTeamMemberDeleteDialogOpen, setIsTeamMemberDeleteDialogOpen] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState<TeamMember | null>(null);
  const [teamMemberForm, setTeamMemberForm] = useState({
    id: '',
    name: '',
    position: '',
    bio: '',
    image: '',
    orderIndex: 0
  });
  
  // Awards state
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [isAwardDeleteDialogOpen, setIsAwardDeleteDialogOpen] = useState(false);
  const [currentAward, setCurrentAward] = useState<AwardType | null>(null);
  const [awardForm, setAwardForm] = useState({
    id: '',
    title: '',
    organization: '',
    year: new Date().getFullYear(),
    description: '',
    image: '',
    orderIndex: 0
  });

  // Fetch team members
  const { 
    data: teamMembers = [], 
    isLoading: isLoadingTeam 
  } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching team members:', error);
        return [];
      }
      
      return data.map((member: any) => ({
        id: member.id,
        name: member.name,
        position: member.position,
        bio: member.bio,
        image: member.image,
        orderIndex: member.order_index,
        createdAt: member.created_at,
        updatedAt: member.updated_at
      }));
    }
  });

  // Fetch awards
  const { 
    data: awards = [], 
    isLoading: isLoadingAwards 
  } = useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('awards_recognitions')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Error fetching awards:', error);
        return [];
      }
      
      return data.map((award: any) => ({
        id: award.id,
        title: award.title,
        organization: award.organization,
        year: award.year,
        description: award.description,
        image: award.image || '',
        orderIndex: award.order_index,
        createdAt: award.created_at,
        updatedAt: award.updated_at
      }));
    }
  });

  // Team member mutations
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
      toast.success('Team member added successfully');
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      resetTeamMemberForm();
      setIsTeamMemberModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add team member: ${error.message}`);
    }
  });

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
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      resetTeamMemberForm();
      setIsTeamMemberModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update team member: ${error.message}`);
    }
  });

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
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      setIsTeamMemberDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete team member: ${error.message}`);
    }
  });

  // Award mutations
  const createAwardMutation = useMutation({
    mutationFn: async (newAward: Omit<AwardType, 'id' | 'createdAt' | 'updatedAt'>) => {
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
      toast.success('Award added successfully');
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      resetAwardForm();
      setIsAwardModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add award: ${error.message}`);
    }
  });

  const updateAwardMutation = useMutation({
    mutationFn: async (updatedAward: Omit<AwardType, 'createdAt' | 'updatedAt'>) => {
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
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      resetAwardForm();
      setIsAwardModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update award: ${error.message}`);
    }
  });

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
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      setIsAwardDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete award: ${error.message}`);
    }
  });

  // Form handling - Team Members
  const handleTeamMemberInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTeamMemberForm({
      ...teamMemberForm,
      [name]: name === 'orderIndex' ? parseInt(value) || 0 : value
    });
  };

  const resetTeamMemberForm = () => {
    setTeamMemberForm({
      id: '',
      name: '',
      position: '',
      bio: '',
      image: '',
      orderIndex: teamMembers.length
    });
    setCurrentTeamMember(null);
  };

  const openCreateTeamMemberModal = () => {
    resetTeamMemberForm();
    setTeamMemberForm(prev => ({ ...prev, orderIndex: teamMembers.length }));
    setIsTeamMemberModalOpen(true);
  };

  const openEditTeamMemberModal = (member: TeamMember) => {
    setTeamMemberForm({
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

  const openDeleteTeamMemberDialog = (member: TeamMember) => {
    setCurrentTeamMember(member);
    setIsTeamMemberDeleteDialogOpen(true);
  };

  const handleTeamMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!teamMemberForm.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!teamMemberForm.position.trim()) {
      toast.error('Position is required');
      return;
    }
    
    if (!teamMemberForm.bio.trim()) {
      toast.error('Bio is required');
      return;
    }
    
    if (!teamMemberForm.image.trim()) {
      toast.error('Image URL is required');
      return;
    }

    if (currentTeamMember) {
      // Update existing team member
      updateTeamMemberMutation.mutate(teamMemberForm);
    } else {
      // Create new team member
      createTeamMemberMutation.mutate(teamMemberForm);
    }
  };

  const handleTeamMemberDelete = () => {
    if (currentTeamMember) {
      deleteTeamMemberMutation.mutate(currentTeamMember.id);
    }
  };

  // Form handling - Awards
  const handleAwardInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAwardForm({
      ...awardForm,
      [name]: name === 'year' || name === 'orderIndex' ? parseInt(value) || 0 : value
    });
  };

  const resetAwardForm = () => {
    setAwardForm({
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

  const openCreateAwardModal = () => {
    resetAwardForm();
    setAwardForm(prev => ({ ...prev, orderIndex: awards.length }));
    setIsAwardModalOpen(true);
  };

  const openEditAwardModal = (award: AwardType) => {
    setAwardForm({
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

  const openDeleteAwardDialog = (award: AwardType) => {
    setCurrentAward(award);
    setIsAwardDeleteDialogOpen(true);
  };

  const handleAwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!awardForm.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!awardForm.organization.trim()) {
      toast.error('Organization is required');
      return;
    }
    
    if (!awardForm.description.trim()) {
      toast.error('Description is required');
      return;
    }
    
    if (awardForm.year <= 0) {
      toast.error('Valid year is required');
      return;
    }

    if (currentAward) {
      // Update existing award
      updateAwardMutation.mutate(awardForm);
    } else {
      // Create new award
      createAwardMutation.mutate(awardForm);
    }
  };

  const handleAwardDelete = () => {
    if (currentAward) {
      deleteAwardMutation.mutate(currentAward.id);
    }
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>About Us Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">About Us Management</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-[500px] grid-cols-2">
            <TabsTrigger value="team">
              <Users className="w-4 h-4 mr-2" /> Team Members
            </TabsTrigger>
            <TabsTrigger value="awards">
              <Award className="w-4 h-4 mr-2" /> Awards & Recognition
            </TabsTrigger>
          </TabsList>
          
          {/* Team Members Content */}
          <TabsContent value="team" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button onClick={openCreateTeamMemberModal} className="bg-agency-purple hover:bg-agency-navy">
                <Plus className="mr-2 h-4 w-4" /> Add Team Member
              </Button>
            </div>
            
            {isLoadingTeam ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
              </div>
            ) : teamMembers.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No team members found. Add your first team member!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Accordion type="single" collapsible className="w-full">
                  {teamMembers.map((member) => (
                    <AccordionItem value={member.id} key={member.id}>
                      <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-4 w-full">
                          {member.image && (
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-10 h-10 rounded-full object-cover" 
                            />
                          )}
                          <div>
                            <span className="font-semibold">{member.name}</span>
                            <span className="text-gray-500 ml-2">({member.position})</span>
                            <span className="text-gray-400 ml-2 text-sm">Order: {member.orderIndex}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card className="border-0 shadow-none">
                          <CardContent className="pt-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold mb-2">Bio:</h3>
                                <p className="text-gray-700 whitespace-pre-line">{member.bio}</p>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-2">Image URL:</h3>
                                <p className="text-gray-700 text-sm break-all">{member.image}</p>
                              </div>

                              <div className="flex space-x-3 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                                  onClick={() => openEditTeamMemberModal(member)}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                  onClick={() => openDeleteTeamMemberDialog(member)}
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
          </TabsContent>
          
          {/* Awards Content */}
          <TabsContent value="awards" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Awards & Recognition</h2>
              <Button onClick={openCreateAwardModal} className="bg-agency-purple hover:bg-agency-navy">
                <Plus className="mr-2 h-4 w-4" /> Add Award
              </Button>
            </div>
            
            {isLoadingAwards ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
              </div>
            ) : awards.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No awards found. Add your first award!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Accordion type="single" collapsible className="w-full">
                  {awards.map((award) => (
                    <AccordionItem value={award.id} key={award.id}>
                      <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="flex items-center w-full">
                          <div>
                            <span className="font-semibold">{award.title}</span>
                            <span className="text-gray-500 ml-2">
                              {award.organization}, {award.year}
                            </span>
                            <span className="text-gray-400 ml-2 text-sm">Order: {award.orderIndex}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card className="border-0 shadow-none">
                          <CardContent className="pt-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold mb-2">Description:</h3>
                                <p className="text-gray-700 whitespace-pre-line">{award.description}</p>
                              </div>
                              
                              {award.image && (
                                <div>
                                  <h3 className="font-semibold mb-2">Image URL:</h3>
                                  <p className="text-gray-700 text-sm break-all">{award.image}</p>
                                </div>
                              )}

                              <div className="flex space-x-3 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                                  onClick={() => openEditAwardModal(award)}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                  onClick={() => openDeleteAwardDialog(award)}
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Team Member Modal */}
      <Dialog open={isTeamMemberModalOpen} onOpenChange={setIsTeamMemberModalOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentTeamMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleTeamMemberSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={teamMemberForm.name}
                  onChange={handleTeamMemberInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  name="position"
                  value={teamMemberForm.position}
                  onChange={handleTeamMemberInputChange}
                  placeholder="Enter position/title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={teamMemberForm.bio}
                  onChange={handleTeamMemberInputChange}
                  placeholder="Enter bio"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  value={teamMemberForm.image}
                  onChange={handleTeamMemberInputChange}
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
                  value={teamMemberForm.orderIndex}
                  onChange={handleTeamMemberInputChange}
                  placeholder="Enter display order"
                  min={0}
                />
                <p className="text-xs text-gray-500">Lower numbers appear first</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTeamMemberModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentTeamMember ? 'Update Team Member' : 'Add Team Member'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Team Member Dialog */}
      <Dialog open={isTeamMemberDeleteDialogOpen} onOpenChange={setIsTeamMemberDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the team member "{currentTeamMember?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTeamMemberDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleTeamMemberDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Award Modal */}
      <Dialog open={isAwardModalOpen} onOpenChange={setIsAwardModalOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentAward ? 'Edit Award' : 'Add New Award'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAwardSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={awardForm.title}
                  onChange={handleAwardInputChange}
                  placeholder="Enter award title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={awardForm.organization}
                  onChange={handleAwardInputChange}
                  placeholder="Enter organization"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={awardForm.year}
                  onChange={handleAwardInputChange}
                  placeholder="Enter year"
                  min={1900}
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={awardForm.description}
                  onChange={handleAwardInputChange}
                  placeholder="Enter description"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  name="image"
                  value={awardForm.image}
                  onChange={handleAwardInputChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="awardOrderIndex">Display Order</Label>
                <Input
                  id="orderIndex"
                  name="orderIndex"
                  type="number"
                  value={awardForm.orderIndex}
                  onChange={handleAwardInputChange}
                  placeholder="Enter display order"
                  min={0}
                />
                <p className="text-xs text-gray-500">Lower numbers appear first</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAwardModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentAward ? 'Update Award' : 'Add Award'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Award Dialog */}
      <Dialog open={isAwardDeleteDialogOpen} onOpenChange={setIsAwardDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete the award "{currentAward?.title}"? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAwardDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleAwardDelete}
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

export default AdminAboutUsManagement;
