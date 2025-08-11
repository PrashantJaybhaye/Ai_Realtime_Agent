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
import { Badge } from '@/components/ui/badge';
import InterviewDetailsModal from '@/components/admin/InterviewDetailsModal';
import InterviewDeleteModal from '@/components/admin/InterviewDeleteModal';
import { 
  FileText, 
  Search, 
  Eye,
  Trash2, 
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface Interview {
  id: string;
  role: string;
  type: string;
  techstack: string[];
  questions: string[];
  userId: string;
  finalized: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface InterviewStats {
  total: number;
  finalized: number;
  draft: number;
  thisWeek: number;
}

export default function AdminInterviewsPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'finalized' | 'draft'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'technical' | 'behavioral' | 'mixed'>('all');
  const [selectedInterviews, setSelectedInterviews] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState<{ id: string; title: string } | null>(null);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    filterInterviews();
  }, [interviews, searchTerm, statusFilter, typeFilter]);

  useEffect(() => {
    // Re-sort interviews when sort order changes
    const sortedInterviews = [...interviews].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setInterviews(sortedInterviews);
  }, [sortOrder]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/interviews');
      const data = await response.json();
      // Sort interviews by creation date (newest first by default)
      const sortedInterviews = data.sort((a: Interview, b: Interview) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
      setInterviews(sortedInterviews);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      toast.error('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  const filterInterviews = () => {
    let filtered = interviews;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(interview => 
        interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.techstack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(interview => 
        statusFilter === 'finalized' ? interview.finalized : !interview.finalized
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(interview => interview.type === typeFilter);
    }

    setFilteredInterviews(filtered);
  };

  const calculateStats = (): InterviewStats => {
    const total = interviews.length;
    const finalized = interviews.filter(interview => interview.finalized).length;
    const draft = interviews.filter(interview => !interview.finalized).length;
    const weekAgo = dayjs().subtract(7, 'days');
    const thisWeek = interviews.filter(interview => 
      dayjs(interview.createdAt).isAfter(weekAgo)
    ).length;

    return { total, finalized, draft, thisWeek };
  };

  const handleInterviewAction = async (action: string, interviewId: string) => {
    if (action === 'delete') {
      const interview = interviews.find(i => i.id === interviewId);
      if (interview) {
        setInterviewToDelete({ 
          id: interviewId, 
          title: `${interview.role} Developer Interview` 
        });
        setDeleteModalOpen(true);
      }
      return;
    }

    setActionLoading(interviewId);
    try {
      const response = await fetch('/api/admin/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, interviewId })
      });

      if (response.ok) {
        toast.success(`Interview ${action} successfully`);
        fetchInterviews(); // Refresh the list
      } else {
        throw new Error(`Failed to ${action} interview`);
      }
    } catch (error) {
      console.error(`Error ${action} interview:`, error);
      toast.error(`Failed to ${action} interview`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedInterviews.size === 0) {
      toast.error('Please select interviews first');
      return;
    }

    if (action === 'delete') {
      setBulkDeleteModalOpen(true);
      return;
    }

    setActionLoading('bulk');
    try {
      const response = await fetch('/api/admin/interviews/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, interviewIds: Array.from(selectedInterviews) })
      });

      if (response.ok) {
        toast.success(`Bulk ${action} completed successfully`);
        setSelectedInterviews(new Set());
        fetchInterviews();
      } else {
        throw new Error(`Failed to ${action} interviews`);
      }
    } catch (error) {
      console.error(`Error bulk ${action}:`, error);
      toast.error(`Failed to ${action} selected interviews`);
    } finally {
      setActionLoading(null);
    }
  };

  const confirmSingleDelete = async () => {
    if (!interviewToDelete) return;

    setActionLoading(interviewToDelete.id);
    try {
      const response = await fetch('/api/admin/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', interviewId: interviewToDelete.id })
      });

      if (response.ok) {
        toast.success('Interview deleted successfully');
        fetchInterviews();
        setDeleteModalOpen(false);
        setInterviewToDelete(null);
      } else {
        throw new Error('Failed to delete interview');
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
      toast.error('Failed to delete interview');
    } finally {
      setActionLoading(null);
    }
  };

  const confirmBulkDelete = async () => {
    setActionLoading('bulk');
    try {
      const response = await fetch('/api/admin/interviews/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', interviewIds: Array.from(selectedInterviews) })
      });

      if (response.ok) {
        toast.success('Interviews deleted successfully');
        setSelectedInterviews(new Set());
        fetchInterviews();
        setBulkDeleteModalOpen(false);
      } else {
        throw new Error('Failed to delete interviews');
      }
    } catch (error) {
      console.error('Error bulk deleting interviews:', error);
      toast.error('Failed to delete selected interviews');
    } finally {
      setActionLoading(null);
    }
  };

  const exportInterviews = () => {
    const csvContent = [
      ['ID', 'Role', 'Type', 'Tech Stack', 'Status', 'User ID', 'Created', 'Questions Count'],
      ...filteredInterviews.map(interview => [
        interview.id,
        interview.role,
        interview.type,
        interview.techstack.join('; '),
        interview.finalized ? 'Finalized' : 'Draft',
        interview.userId,
        dayjs(interview.createdAt).format('YYYY-MM-DD HH:mm'),
        interview.questions.length.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interviews-export-${dayjs().format('YYYY-MM-DD')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewInterview = (interviewId: string) => {
    setSelectedInterviewId(interviewId);
    setIsInterviewModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'technical':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'behavioral':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'mixed':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[28rem]" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground">Interview Management</h1>
          <p className="text-muted-foreground">Manage interview data and monitor system activity</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={fetchInterviews}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={exportInterviews}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Finalized</p>
                <p className="text-2xl font-bold text-foreground">{stats.finalized}</p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold text-foreground">{stats.draft}</p>
              </div>
              <div className="h-12 w-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{stats.thisWeek}</p>
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
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by role, user ID, or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                All Status
              </Button>
              <Button
                variant={statusFilter === 'finalized' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('finalized')}
                size="sm"
              >
                Finalized
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('draft')}
                size="sm"
              >
                Draft
              </Button>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex md:items-center gap-3 my-6 max-sm:flex-col">
            <span className="text-sm text-muted-foreground">Filter by type:</span>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('all')}
                size="sm"
              >
                All Types
              </Button>
              <Button
                variant={typeFilter === 'technical' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('technical')}
                size="sm"
              >
                Technical
              </Button>
              <Button
                variant={typeFilter === 'behavioral' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('behavioral')}
                size="sm"
              >
                Behavioral
              </Button>
              <Button
                variant={typeFilter === 'mixed' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('mixed')}
                size="sm"
              >
                Mixed
              </Button>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex md:items-center gap-3 my-8 max-sm:flex-col">
            <span className="text-sm text-muted-foreground">Sort by date:</span>
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
          {selectedInterviews.size > 0 && (
            <div className="mt-6 p-5 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-medium">
                  {selectedInterviews.size} interview(s) selected
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('finalize')}
                    disabled={actionLoading === 'bulk'}
                    className="gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Finalize
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('unfinalize')}
                    disabled={actionLoading === 'bulk'}
                    className="gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Unfinalize
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

      {/* Interviews Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5" />
            Interview Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedInterviews.size === filteredInterviews.length && filteredInterviews.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInterviews(new Set(filteredInterviews.map(i => i.id)));
                        } else {
                          setSelectedInterviews(new Set());
                        }
                      }}
                      className="rounded border-border"
                    />
                  </TableHead>
                  <TableHead>Interview</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Tech Stack</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map(interview => (
                  <TableRow key={interview.id} className="group">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedInterviews.has(interview.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedInterviews);
                          if (e.target.checked) {
                            newSelected.add(interview.id);
                          } else {
                            newSelected.delete(interview.id);
                          }
                          setSelectedInterviews(newSelected);
                        }}
                        className="rounded border-border"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {interview.role.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground capitalize">
                            {interview.role} Developer
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {interview.userId.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTypeColor(interview.type)} capitalize`}>
                        {interview.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {interview.finalized ? (
                          <>
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            <span className="text-green-500 text-sm font-medium">Finalized</span>
                          </>
                        ) : (
                          <>
                            <div className="h-2 w-2 bg-orange-500 rounded-full" />
                            <span className="text-orange-500 text-sm font-medium">Draft</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-32">
                        {interview.techstack.slice(0, 2).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {interview.techstack.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{interview.techstack.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(interview.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewInterview(interview.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleInterviewAction('delete', interview.id)}
                          disabled={actionLoading === interview.id}
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

          {filteredInterviews.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No interviews found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No interviews have been created yet.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Details Modal */}
      <InterviewDetailsModal
        interviewId={selectedInterviewId}
        isOpen={isInterviewModalOpen}
        onOpenChange={setIsInterviewModalOpen}
        onUpdate={fetchInterviews}
      />

      {/* Delete Confirmation Modals */}
      <InterviewDeleteModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={confirmSingleDelete}
        interviewTitle={interviewToDelete?.title}
        isLoading={actionLoading === interviewToDelete?.id}
      />

      <InterviewDeleteModal
        isOpen={bulkDeleteModalOpen}
        onOpenChange={setBulkDeleteModalOpen}
        onConfirm={confirmBulkDelete}
        interviewCount={selectedInterviews.size}
        isLoading={actionLoading === 'bulk'}
      />
    </div>
  );
}