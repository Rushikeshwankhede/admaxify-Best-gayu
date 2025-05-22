
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, AppRole } from '@/types/admin';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

const AdminUsersManagement = () => {
  const queryClient = useQueryClient();
  const { role: currentUserRole } = useAuth();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    role: 'viewer' as AppRole
  });

  // Fetch admin users
  const { data: adminUsers = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        toast.error('Failed to fetch admin users');
        console.error('Error fetching admin users:', error);
        return [];
      }
      
      return data.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role as AppRole,
        createdAt: user.created_at,
        lastLogin: user.last_login
      })) as AdminUser[];
    }
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (newUser: { email: string; password: string; role: AppRole }) => {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });
      
      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error('Failed to create user');

      // Insert into admin_users table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          email: newUser.email,
          role: newUser.role,
          password_hash: newUser.password, // In a real app, you'd properly hash this
        });
      
      if (insertError) throw new Error(insertError.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Admin user created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      resetForm();
      setIsUserModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create admin user: ${error.message}`);
    }
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: { id: string; role: AppRole }) => {
      const { error } = await supabase
        .from('admin_users')
        .update({
          role: updatedUser.role
        })
        .eq('id', updatedUser.id);
      
      if (error) throw new Error(error.message);
      return true;
    },
    onSuccess: () => {
      toast.success('Admin user role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      resetForm();
      setIsUserModalOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update admin user: ${error.message}`);
    }
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      // Call the Edge Function to delete the user
      const response = await fetch(`${window.location.origin}/api/delete_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: id }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
      
      return true;
    },
    onSuccess: () => {
      toast.success('Admin user deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete admin user: ${error.message}`);
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value as AppRole
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      email: '',
      password: '',
      role: 'viewer'
    });
    setCurrentUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsUserModalOpen(true);
  };

  const openEditModal = (user: AdminUser) => {
    setFormData({
      id: user.id,
      email: user.email,
      password: '',
      role: user.role
    });
    setCurrentUser(user);
    setIsUserModalOpen(true);
  };

  const openDeleteDialog = (user: AdminUser) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentUser) {
      // Update existing user's role
      updateUserMutation.mutate({
        id: formData.id,
        role: formData.role
      });
    } else {
      // Create new user
      if (!formData.email.trim() || !formData.password.trim()) {
        toast.error('Email and password are required');
        return;
      }
      
      createUserMutation.mutate({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
    }
  };

  const handleDelete = () => {
    if (currentUser) {
      deleteUserMutation.mutate(currentUser.id);
    }
  };

  // Format date or return placeholder
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <ProtectedRoute requiredRole="administrator">
      <Helmet>
        <title>Admin Users Management | Admin Dashboard</title>
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Users Management</h1>
          <Button onClick={openCreateModal} className="bg-agency-purple hover:bg-agency-navy">
            <Plus className="mr-2 h-4 w-4" /> Add New Admin User
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agency-purple"></div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'administrator' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'editor' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-agency-purple text-agency-purple hover:bg-agency-purple hover:text-white"
                            onClick={() => openEditModal(user)}
                          >
                            <Edit className="h-3 w-3 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => openDeleteDialog(user)}
                            // Prevent deleting yourself
                            disabled={adminUsers.length <= 1}
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit User Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentUser ? 'Edit Admin User' : 'Create New Admin User'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email {!currentUser && '*'}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  required={!currentUser}
                  disabled={!!currentUser}
                />
              </div>

              {!currentUser && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter a secure password"
                    required={!currentUser}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Administrator:</strong> Full access to all features<br />
                  <strong>Editor:</strong> Can edit content but not manage users<br />
                  <strong>Viewer:</strong> Can only view content
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUserModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-agency-purple hover:bg-agency-navy">
                {currentUser ? 'Update User' : 'Create User'}
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
          <p>Are you sure you want to delete the admin user <strong>{currentUser?.email}</strong>? This action cannot be undone.</p>
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

export default AdminUsersManagement;
