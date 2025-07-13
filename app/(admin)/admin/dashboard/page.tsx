'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import UserDetailsModal from '@/components/admin/UserDetailsModal';
import DeleteConfirmationModal from '@/components/admin/DeleteConfirmationModal';
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Trash2, 
  Eye,
  Download,
  RefreshCw,
  Shield,
  Calendar,
  Activity,
  TrendingUp,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  uid: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  disabled?: boolean;
  customClaims?: Record<string, unknown>;
}

interface UserStats {
  total: number;
  active: number;
  disabled: number;
  newThisWeek: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'disabled'>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; email: string } | null>(null);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  useEffect(() => {
    // Re-sort users when sort order changes
    const sortedUsers = [...users].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setUsers(sortedUsers);
  }, [sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      // Sort users by creation date (newest first by default)
      const sortedUsers = data.sort((a: User, b: User) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => 
        statusFilter === 'active' ? !user.disabled : user.disabled
      );
    }

    setFilteredUsers(filtered);
  };

  const calculateStats = (): UserStats => {
    const total = users.length;
    const active = users.filter(user => !user.disabled).length;
    const disabled = users.filter(user => user.disabled).length;
    const weekAgo = dayjs().subtract(7, 'days');
    const newThisWeek = users.filter(user => 
      dayjs(user.createdAt).isAfter(weekAgo)
    ).length;

    return { total, active, disabled, newThisWeek };
  };

  const handleUserAction = async (action: string, userId: string) => {
    if (action === 'delete') {
      const user = users.find(u => u.uid === userId);
      if (user) {
        setUserToDelete({ id: userId, email: user.email });
        setDeleteModalOpen(true);
      }
      return;
    }

    setActionLoading(userId);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId })
      });

      if (response.ok) {
        toast.success(`User ${action} successfully`);
        fetchUsers(); // Refresh the list
      } else {
        throw new Error(`Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action} user:`, error);
      toast.error(`Failed to ${action} user`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.size === 0) {
      toast.error('Please select users first');
      return;
    }

    if (action === 'delete') {
      setBulkDeleteModalOpen(true);
      return;
    }

    setActionLoading('bulk');
    try {
      const response = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userIds: Array.from(selectedUsers) })
      });

      if (response.ok) {
        toast.success(`Bulk ${action} completed successfully`);
        setSelectedUsers(new Set());
        fetchUsers();
      } else {
        throw new Error(`Failed to ${action} users`);
      }
    } catch (error) {
      console.error(`Error bulk ${action}:`, error);
      toast.error(`Failed to ${action} selected users`);
    } finally {
      setActionLoading(null);
    }
  };

  const confirmSingleDelete = async () => {
    if (!userToDelete) return;

    setActionLoading(userToDelete.id);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', userId: userToDelete.id })
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers();
        setDeleteModalOpen(false);
        setUserToDelete(null);
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  const confirmBulkDelete = async () => {
    setActionLoading('bulk');
    try {
      const response = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', userIds: Array.from(selectedUsers) })
      });

      if (response.ok) {
        toast.success('Users deleted successfully');
        setSelectedUsers(new Set());
        fetchUsers();
        setBulkDeleteModalOpen(false);
      } else {
        throw new Error('Failed to delete users');
      }
    } catch (error) {
      console.error('Error bulk deleting users:', error);
      toast.error('Failed to delete selected users');
    } finally {
      setActionLoading(null);
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Email', 'Status', 'Created', 'Last Login'],
      ...filteredUsers.map(user => [
        user.email,
        user.disabled ? 'Disabled' : 'Active',
        dayjs(user.createdAt).format('YYYY-MM-DD'),
        dayjs(user.lastLogin).format('YYYY-MM-DD')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsUserModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and monitor system activity</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={fetchUsers}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={exportUsers}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disabled Users</p>
                <p className="text-2xl font-bold text-foreground">{stats.disabled}</p>
              </div>
              <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold text-foreground">{stats.newThisWeek}</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'disabled' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('disabled')}
                size="sm"
              >
                Disabled
              </Button>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex md:items-center gap-2 my-6 max-sm:flex-col">
            <span className="text-sm text-muted-foreground">Sort by signup:</span>
            <Button
              variant={sortOrder === 'newest' ? 'default' : 'outline'}
              onClick={() => setSortOrder('newest')}
              size="sm"
            >
              Newest First
            </Button>
            <Button
              variant={sortOrder === 'oldest' ? 'default' : 'outline'}
              onClick={() => setSortOrder('oldest')}
              size="sm"
            >
              Oldest First
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.size > 0 && (
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedUsers.size} user(s) selected
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('enable')}
                    disabled={actionLoading === 'bulk'}
                    className="gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Enable
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('disable')}
                    disabled={actionLoading === 'bulk'}
                    className="gap-2"
                  >
                    <UserX className="w-4 h-4" />
                    Disable
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBulkAction('delete')}
                    disabled={actionLoading === 'bulk'}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(new Set(filteredUsers.map(u => u.uid)));
                        } else {
                          setSelectedUsers(new Set());
                        }
                      }}
                      className="rounded border-border"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Login</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.uid} className="group">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.uid)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedUsers);
                          if (e.target.checked) {
                            newSelected.add(user.uid);
                          } else {
                            newSelected.delete(user.uid);
                          }
                          setSelectedUsers(newSelected);
                        }}
                        className="rounded border-border"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">ID: {user.uid.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.disabled ? (
                          <>
                            <div className="h-2 w-2 bg-red-500 rounded-full" />
                            <span className="text-red-500 text-sm font-medium">Disabled</span>
                          </>
                        ) : (
                          <>
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            <span className="text-green-500 text-sm font-medium">Active</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        {formatDate(user.lastLogin)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(user.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewUser(user.uid)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction(user.disabled ? 'enable' : 'disable', user.uid)}
                          disabled={actionLoading === user.uid}
                          className="h-8 w-8 p-0"
                        >
                          {user.disabled ? (
                            <UserCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <UserX className="w-4 h-4 text-orange-500" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleUserAction('delete', user.uid)}
                          disabled={actionLoading === user.uid}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No users have been registered yet.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <UserDetailsModal
        userId={selectedUserId}
        isOpen={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
      />

      {/* Delete Confirmation Modals */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmSingleDelete}
        userEmail={userToDelete?.email}
        isLoading={actionLoading === userToDelete?.id}
      />

      <DeleteConfirmationModal
        isOpen={bulkDeleteModalOpen}
        onOpenChange={setBulkDeleteModalOpen}
        onConfirm={confirmBulkDelete}
        userCount={selectedUsers.size}
        isLoading={actionLoading === 'bulk'}
      />
    </div>
  );
}