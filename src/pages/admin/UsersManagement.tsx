import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, ShieldOff, UserCheck } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';
import { EmptyState, ErrorState } from '@/components/ui/data-state';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminActivityLog } from '@/hooks/useAdminActivityLog';
import { useAuth } from '@/contexts/AuthContext';

type Profile = Tables<'profiles'>;

interface UserWithRole extends Profile {
  role: 'admin' | 'user';
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleConfirm, setRoleConfirm] = useState<{ open: boolean; user: UserWithRole | null }>({ open: false, user: null });
  const [statusConfirm, setStatusConfirm] = useState<{ open: boolean; user: UserWithRole | null }>({ open: false, user: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { logActivity } = useAdminActivityLog();
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        setError('Failed to load users. Please check your permissions.');
        return;
      }

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        setError('Failed to load user roles.');
        return;
      }

      const usersWithRoles = (profiles || []).map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.user_id);
        return {
          ...profile,
          role: (userRole?.role || 'user') as 'admin' | 'user',
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async () => {
    const targetUser = roleConfirm.user;
    if (!targetUser) return;
    
    // Prevent self-demotion
    if (targetUser.user_id === currentUser?.id && targetUser.role === 'admin') {
      toast({
        variant: 'destructive',
        title: 'Cannot demote yourself',
        description: 'You cannot remove your own admin privileges.'
      });
      setRoleConfirm({ open: false, user: null });
      return;
    }
    
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    setIsProcessing(true);
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', targetUser.user_id);

      if (error) throw error;

      toast({
        title: 'Role Updated',
        description: `${targetUser.full_name} is now ${newRole === 'admin' ? 'an admin' : 'a regular user'}`,
      });
      
      logActivity({
        action: 'role_change',
        entityType: 'user',
        entityId: targetUser.id,
        details: { 
          user_name: targetUser.full_name, 
          old_role: targetUser.role, 
          new_role: newRole 
        }
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
      setRoleConfirm({ open: false, user: null });
    }
  };

  const handleStatusChange = async () => {
    const targetUser = statusConfirm.user;
    if (!targetUser) return;
    
    // Prevent self-disable
    if (targetUser.user_id === currentUser?.id) {
      toast({
        variant: 'destructive',
        title: 'Cannot disable yourself',
        description: 'You cannot disable your own account.'
      });
      setStatusConfirm({ open: false, user: null });
      return;
    }
    
    setIsProcessing(true);
    const newStatus = !targetUser.is_active;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: newStatus })
        .eq('id', targetUser.id);

      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `${targetUser.full_name} has been ${newStatus ? 'enabled' : 'disabled'}`,
      });
      
      logActivity({
        action: 'status_change',
        entityType: 'user',
        entityId: targetUser.id,
        details: { 
          user_name: targetUser.full_name, 
          new_status: newStatus ? 'active' : 'disabled' 
        }
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
      setStatusConfirm({ open: false, user: null });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">User Management</h1>
        <p className="text-muted-foreground mt-1">Manage user accounts and roles</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <ErrorState title="Failed to load users" description={error} onRetry={fetchUsers} />
          ) : users.length === 0 ? (
            <EmptyState title="No users found" description="Users will appear here once they sign up." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.is_active ? 'outline' : 'destructive'}>
                        {user.is_active ? 'Active' : 'Disabled'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRoleConfirm({ open: true, user })}
                          title={user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                          disabled={user.user_id === currentUser?.id && user.role === 'admin'}
                        >
                          {user.role === 'admin' ? (
                            <ShieldOff className="h-4 w-4 mr-1" />
                          ) : (
                            <Shield className="h-4 w-4 mr-1" />
                          )}
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStatusConfirm({ open: true, user })}
                          className={user.is_active ? 'text-destructive hover:text-destructive' : ''}
                          disabled={user.user_id === currentUser?.id}
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          {user.is_active ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={roleConfirm.open}
        onOpenChange={(open) => setRoleConfirm({ ...roleConfirm, open })}
        title={roleConfirm.user?.role === 'admin' ? 'Remove Admin Role' : 'Grant Admin Role'}
        description={
          roleConfirm.user?.role === 'admin'
            ? `Are you sure you want to remove admin privileges from ${roleConfirm.user?.full_name}?`
            : `Are you sure you want to make ${roleConfirm.user?.full_name} an administrator?`
        }
        confirmText={roleConfirm.user?.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
        variant={roleConfirm.user?.role === 'admin' ? 'destructive' : 'default'}
        onConfirm={handleRoleChange}
        isLoading={isProcessing}
      />

      <ConfirmDialog
        open={statusConfirm.open}
        onOpenChange={(open) => setStatusConfirm({ ...statusConfirm, open })}
        title={statusConfirm.user?.is_active ? 'Disable User' : 'Enable User'}
        description={
          statusConfirm.user?.is_active
            ? `Are you sure you want to disable ${statusConfirm.user?.full_name}'s account?`
            : `Are you sure you want to enable ${statusConfirm.user?.full_name}'s account?`
        }
        confirmText={statusConfirm.user?.is_active ? 'Disable' : 'Enable'}
        variant={statusConfirm.user?.is_active ? 'destructive' : 'default'}
        onConfirm={handleStatusChange}
        isLoading={isProcessing}
      />
    </div>
  );
}
