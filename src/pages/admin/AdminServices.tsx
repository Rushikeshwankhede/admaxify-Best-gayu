import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/admin';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import FileUpload from '@/components/admin/FileUpload';
import { mapDbServiceToService } from '@/lib/dataTransformers';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search, Edit, Trash2, Plus, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTrimmedValue } from '@/lib/utils';

// Define the form schema
const serviceFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  icon: z.string().min(1, "Icon is required"),
  benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  caseStudyId: z.string().optional().nullable(),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const AdminServices = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const queryClient = useQueryClient();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      icon: "Package",
      benefits: [""],
      features: [""],
      caseStudyId: null,
    },
  });

  const editForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      icon: "Package",
      benefits: [""],
      features: [""],
      caseStudyId: null,
    },
  });

  // Fetch services
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the database records to our frontend Service type
      return data.map(service => mapDbServiceToService(service));
    }
  });

  // Fetch testimonials for case study selection
  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, company')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Update filtered services when search query changes
  useEffect(() => {
    if (services) {
      if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase();
        const filtered = services.filter(
          (service) =>
            service.title.toLowerCase().includes(lowercaseQuery) ||
            service.shortDescription.toLowerCase().includes(lowercaseQuery)
        );
        setFilteredServices(filtered);
      } else {
        setFilteredServices(services);
      }
    }
  }, [searchQuery, services]);

  const handleCreateService = async (data: ServiceFormValues) => {
    try {
      const { error } = await supabase
        .from('services')
        .insert([
          {
            title: data.title,
            short_description: data.shortDescription,
            full_description: data.fullDescription,
            icon: data.icon,
            benefits: JSON.stringify(data.benefits.filter(Boolean)),
            features: JSON.stringify(data.features.filter(Boolean)),
            case_study_id: data.caseStudyId || null,
          },
        ]);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
      form.reset();
      setIsCreateDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to create service: ${error.message}`);
    }
  };

  const handleUpdateService = async (data: ServiceFormValues) => {
    try {
      if (!currentService?.id) return;

      const { error } = await supabase
        .from('services')
        .update({
          title: data.title,
          short_description: data.shortDescription,
          full_description: data.fullDescription,
          icon: data.icon,
          benefits: JSON.stringify(data.benefits.filter(Boolean)),
          features: JSON.stringify(data.features.filter(Boolean)),
          case_study_id: data.caseStudyId || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentService.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service updated successfully');
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to update service: ${error.message}`);
    }
  };

  const handleDeleteService = async () => {
    try {
      if (!currentService?.id) return;

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', currentService.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  };

  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    editForm.reset({
      id: service.id,
      title: service.title,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      icon: service.icon,
      benefits: Array.isArray(service.benefits) ? service.benefits : [""],
      features: Array.isArray(service.features) ? service.features : [""],
      caseStudyId: service.caseStudyId || null,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  // Icons available for selection
  const availableIcons = [
    'BrainCircuit', 'Search', 'BarChart', 'Mail', 'Gauge', 'Palette', 
    'LineChart', 'FileText', 'Video', 'Users', 'MapPin', 'Cog', 'Package'
  ];

  return (
    <>
      <Helmet>
        <title>Manage Services | Admin Dashboard</title>
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      {/* Search and filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search services..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Services table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
        </div>
      ) : filteredServices && filteredServices.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Benefits</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell className="max-w-xs truncate">{service.shortDescription}</TableCell>
                <TableCell>{Array.isArray(service.benefits) ? service.benefits.length : 0}</TableCell>
                <TableCell>{Array.isArray(service.features) ? service.features.length : 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(service)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No services found</h3>
          <p className="mt-1 text-gray-500">
            {searchQuery ? "No services match your search criteria." : "Get started by creating a new service."}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Create service dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Service</DialogTitle>
            <DialogDescription>
              Add a new service to your portfolio. Fill out the fields below to create a new service.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateService)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Service Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description (displayed in cards)" 
                        {...field}
                        rows={2}
                      />
                    </FormControl>
                    <FormDescription>
                      A concise overview of the service, displayed in listings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the service" 
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      A comprehensive description shown on the service detail page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableIcons.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Benefits</FormLabel>
                <FormDescription className="mb-2">
                  List key benefits clients will gain from this service.
                </FormDescription>
                {form.watch("benefits").map((benefit, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      placeholder={`Benefit ${index + 1}`}
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...form.watch("benefits")];
                        newBenefits[index] = e.target.value;
                        form.setValue("benefits", newBenefits);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        const newBenefits = [...form.watch("benefits")];
                        newBenefits.splice(index, 1);
                        form.setValue("benefits", newBenefits);
                      }}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newBenefits = [...form.watch("benefits"), ""];
                    form.setValue("benefits", newBenefits);
                  }}
                  className="mt-2 w-full"
                >
                  Add Benefit
                </Button>
                {form.formState.errors.benefits && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.benefits.message}
                  </p>
                )}
              </div>
              
              <div>
                <FormLabel>Features</FormLabel>
                <FormDescription className="mb-2">
                  Describe what's included in this service.
                </FormDescription>
                {form.watch("features").map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...form.watch("features")];
                        newFeatures[index] = e.target.value;
                        form.setValue("features", newFeatures);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        const newFeatures = [...form.watch("features")];
                        newFeatures.splice(index, 1);
                        form.setValue("features", newFeatures);
                      }}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newFeatures = [...form.watch("features"), ""];
                    form.setValue("features", newFeatures);
                  }}
                  className="mt-2 w-full"
                >
                  Add Feature
                </Button>
                {form.formState.errors.features && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.features.message}
                  </p>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="caseStudyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Study</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a case study (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {testimonials?.map((testimonial) => (
                          <SelectItem key={testimonial.id} value={testimonial.id}>
                            {testimonial.name} - {testimonial.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Optionally link a testimonial as a case study for this service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Service</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit service dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update this service's details. Changes will be reflected on the website immediately.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdateService)} className="space-y-6">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Service Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description (displayed in cards)" 
                        {...field}
                        rows={2}
                      />
                    </FormControl>
                    <FormDescription>
                      A concise overview of the service, displayed in listings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="fullDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the service" 
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      A comprehensive description shown on the service detail page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableIcons.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Benefits</FormLabel>
                <FormDescription className="mb-2">
                  List key benefits clients will gain from this service.
                </FormDescription>
                {editForm.watch("benefits").map((benefit, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      placeholder={`Benefit ${index + 1}`}
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...editForm.watch("benefits")];
                        newBenefits[index] = e.target.value;
                        editForm.setValue("benefits", newBenefits);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        const newBenefits = [...editForm.watch("benefits")];
                        newBenefits.splice(index, 1);
                        editForm.setValue("benefits", newBenefits);
                      }}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newBenefits = [...editForm.watch("benefits"), ""];
                    editForm.setValue("benefits", newBenefits);
                  }}
                  className="mt-2 w-full"
                >
                  Add Benefit
                </Button>
                {editForm.formState.errors.benefits && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {editForm.formState.errors.benefits.message}
                  </p>
                )}
              </div>
              
              <div>
                <FormLabel>Features</FormLabel>
                <FormDescription className="mb-2">
                  Describe what's included in this service.
                </FormDescription>
                {editForm.watch("features").map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...editForm.watch("features")];
                        newFeatures[index] = e.target.value;
                        editForm.setValue("features", newFeatures);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        const newFeatures = [...editForm.watch("features")];
                        newFeatures.splice(index, 1);
                        editForm.setValue("features", newFeatures);
                      }}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const newFeatures = [...editForm.watch("features"), ""];
                    editForm.setValue("features", newFeatures);
                  }}
                  className="mt-2 w-full"
                >
                  Add Feature
                </Button>
                {editForm.formState.errors.features && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {editForm.formState.errors.features.message}
                  </p>
                )}
              </div>
              
              <FormField
                control={editForm.control}
                name="caseStudyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Study</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value || null)}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a case study (optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {testimonials?.map((testimonial) => (
                          <SelectItem key={testimonial.id} value={testimonial.id}>
                            {testimonial.name} - {testimonial.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Optionally link a testimonial as a case study for this service.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Service"
        description={`Are you sure you want to delete "${currentService?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteService}
        confirmVariant="destructive"
      />
    </>
  );
};

export default AdminServices;
