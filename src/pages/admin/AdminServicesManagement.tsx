
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/admin';
import { mapDbServiceToService } from '@/lib/dataTransformers';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Icons available for services
const AVAILABLE_ICONS = [
  'BrainCircuit', 'Search', 'BarChart', 'Mail', 'Gauge', 
  'Palette', 'LineChart', 'FileText', 'Video', 'Users', 
  'MapPin', 'Cog'
];

const AdminServicesManagement = () => {
  const queryClient = useQueryClient();
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [expandedForm, setExpandedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    icon: 'BrainCircuit',
    benefits: [''],
    features: ['']
  });

  // Fetch services
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast.error('Failed to fetch services');
        console.error('Error fetching services:', error);
        return [];
      }
      
      return data.map(mapDbServiceToService);
    }
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: async (newService: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'caseStudyId'>) => {
      const { error } = await supabase
        .from('services')
        .insert({
          title: newService.title,
          short_description: newService.shortDescription,
          full_description: newService.fullDescription,
          icon: newService.icon,
          benefits: newService.benefits,
          features: newService.features
        });
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Service created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetForm();
      setIsServiceModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create service: ${error.message}`);
    }
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async (updatedService: Omit<Service, 'createdAt' | 'updatedAt'>) => {
      const { error } = await supabase
        .from('services')
        .update({
          title: updatedService.title,
          short_description: updatedService.shortDescription,
          full_description: updatedService.fullDescription,
          icon: updatedService.icon,
          benefits: updatedService.benefits,
          features: updatedService.features,
          case_study_id: updatedService.caseStudyId,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedService.id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Service updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetForm();
      setIsServiceModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update service: ${error.message}`);
    }
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Service deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIconChange = (value: string) => {
    setFormData({
      ...formData,
      icon: value
    });
  };

  const handleArrayChange = (field: 'benefits' | 'features', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field: 'benefits' | 'features') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (field: 'benefits' | 'features', index: number) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'BrainCircuit',
      benefits: [''],
      features: ['']
    });
    setCurrentService(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsServiceModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setFormData({
      id: service.id,
      title: service.title,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      icon: service.icon,
      benefits: [...service.benefits],
      features: [...service.features]
    });
    setCurrentService(service);
    setIsServiceModalOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!formData.shortDescription.trim()) {
      toast.error('Short description is required');
      return;
    }
    
    // Filter out empty array items
    const benefits = formData.benefits.filter(item => item.trim() !== '');
    const features = formData.features.filter(item => item.trim() !== '');
    
    if (benefits.length === 0) {
      toast.error('At least one benefit is required');
      return;
    }
    
    if (features.length === 0) {
      toast.error('At least one feature is required');
      return;
    }

    const serviceData = {
      ...formData,
      benefits,
      features
    };

    if (currentService) {
      // Update existing service
      updateServiceMutation.mutate({
        ...serviceData,
        caseStudyId: currentService.caseStudyId
      });
    } else {
      // Create new service
      createServiceMutation.mutate(serviceData);
    }
  };

  const handleDelete = () => {
    if (currentService) {
      deleteServiceMutation.mutate(currentService.id);
    }
  };

  const toggleForm = (id: string) => {
    setExpandedForm(expandedForm === id ? null : id);
  };

  return (
    <ProtectedRoute requiredRole="editor">
      <Helmet>
        <title>Services Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Services Management</h1>
          <Button onClick={openCreateModal} className="bg-agency-purple hover:bg-agency-navy">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <Accordion type="single" collapsible className="w-full">
              {services.map((service) => (
                <AccordionItem value={service.id} key={service.id}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="flex justify-between items-center w-full pr-4">
                      <span>{service.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="border-0 shadow-none">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold mb-2">Short Description:</h3>
                            <p className="text-gray-700">{service.shortDescription}</p>

                            <h3 className="font-semibold mt-4 mb-2">Icon:</h3>
                            <p className="text-gray-700">{service.icon}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Benefits:</h3>
                            <ul className="list-disc pl-5">
                              {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-gray-700">{benefit}</li>
                              ))}
                            </ul>

                            <h3 className="font-semibold mt-4 mb-2">Features:</h3>
                            <ul className="list-disc pl-5">
                              {service.features.map((feature, idx) => (
                                <li key={idx} className="text-gray-700">{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <h3 className="font-semibold mt-4 mb-2">Full Description:</h3>
                        <p className="text-gray-700">{service.fullDescription}</p>

                        <div className="flex space-x-3 mt-6">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                            onClick={() => openEditModal(service)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => openDeleteDialog(service)}
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

      {/* Create/Edit Service Modal */}
      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentService ? 'Edit Service' : 'Create New Service'}</DialogTitle>
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
                  placeholder="Enter service title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Enter a brief description"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon *</Label>
                <Select
                  value={formData.icon}
                  onValueChange={handleIconChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ICONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description *</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Enter a detailed description"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Benefits *</Label>
                {formData.benefits.map((benefit, index) => (
                  <div key={`benefit-${index}`} className="flex space-x-2">
                    <Input
                      value={benefit}
                      onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                      placeholder={`Benefit ${index + 1}`}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeArrayItem('benefits', index)}
                      disabled={formData.benefits.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => addArrayItem('benefits')}
                  className="mt-2"
                >
                  Add Benefit
                </Button>
              </div>

              <div className="space-y-3">
                <Label>Features *</Label>
                {formData.features.map((feature, index) => (
                  <div key={`feature-${index}`} className="flex space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleArrayChange('features', index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeArrayItem('features', index)}
                      disabled={formData.features.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => addArrayItem('features')}
                  className="mt-2"
                >
                  Add Feature
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsServiceModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentService ? 'Update Service' : 'Create Service'}
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
          <p>Are you sure you want to delete the service "{currentService?.title}"? This action cannot be undone.</p>
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

export default AdminServicesManagement;
