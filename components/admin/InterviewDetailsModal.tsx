'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  User, 
  Calendar, 
  Code, 
  CheckCircle, 
  XCircle, 
  Edit,
  Save,
  X
} from 'lucide-react';
import dayjs from 'dayjs';
import { toast } from 'sonner';

interface InterviewDetails {
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

interface InterviewDetailsModalProps {
  interviewId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate?: () => void;
}

export default function InterviewDetailsModal({ 
  interviewId, 
  isOpen, 
  onOpenChange,
  onUpdate 
}: InterviewDetailsModalProps) {
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    role: '',
    type: '',
    techstack: '',
    finalized: false
  });

  useEffect(() => {
    if (interviewId && isOpen) {
      fetchInterviewDetails();
    }
  }, [interviewId, isOpen]);

  const fetchInterviewDetails = async () => {
    if (!interviewId) return;
    setLoading(true);
    try {
      const response = await fetch('/api/admin/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view', interviewId })
      });
      if (response.ok) {
        const data = await response.json();
        setInterviewDetails(data.interview);
        setEditForm({
          role: data.interview.role,
          type: data.interview.type,
          techstack: data.interview.techstack.join(', '),
          finalized: data.interview.finalized
        });
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
      toast.error('Failed to fetch interview details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!interviewId) return;
    setSaving(true);
    try {
      const response = await fetch('/api/admin/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'update', 
          interviewId,
          data: {
            role: editForm.role,
            type: editForm.type,
            techstack: editForm.techstack.split(',').map(t => t.trim()),
            finalized: editForm.finalized
          }
        })
      });
      
      if (response.ok) {
        toast.success('Interview updated successfully');
        setEditing(false);
        fetchInterviewDetails();
        onUpdate?.();
      } else {
        throw new Error('Failed to update interview');
      }
    } catch (error) {
      console.error('Error updating interview:', error);
      toast.error('Failed to update interview');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) =>
    dayjs(dateString).format('MMM D, YYYY h:mm A');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Interview Details
            </div>
            {!editing && interviewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : interviewDetails ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex gap-4 items-start p-4 bg-muted/40 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-xl">
                {interviewDetails.role.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 space-y-2">
                {editing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                      <Input
                        id="role"
                        value={editForm.role}
                        onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-sm font-medium">Type</Label>
                      <select
                        id="type"
                        value={editForm.type}
                        onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                        className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
                      >
                        <option value="technical">Technical</option>
                        <option value="behavioral">Behavioral</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="techstack" className="text-sm font-medium">Tech Stack (comma separated)</Label>
                      <Input
                        id="techstack"
                        value={editForm.techstack}
                        onChange={(e) => setEditForm(prev => ({ ...prev, techstack: e.target.value }))}
                        className="mt-1"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="finalized"
                        checked={editForm.finalized}
                        onChange={(e) => setEditForm(prev => ({ ...prev, finalized: e.target.checked }))}
                        className="rounded border-border"
                      />
                      <Label htmlFor="finalized" className="text-sm">Finalized</Label>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground capitalize">
                      {interviewDetails.role} Developer Interview
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="capitalize">
                        {interviewDetails.type}
                      </Badge>
                      {interviewDetails.finalized ? (
                        <Badge className="gap-1 bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3" />
                          Finalized
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="w-3 h-3" />
                          Draft
                        </Badge>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2 text-foreground">
                  <User className="w-4 h-4" />
                  Basic Info
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono text-xs">{interviewDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID:</span>
                    <span className="font-mono text-xs">{interviewDetails.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{interviewDetails.finalized ? 'Finalized' : 'Draft'}</span>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4" />
                  Timestamps
                </h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(interviewDetails.createdAt)}</span>
                  </div>
                  {interviewDetails.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{formatDate(interviewDetails.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-foreground">
                <Code className="w-4 h-4" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {interviewDetails.techstack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-foreground">
                <FileText className="w-4 h-4" />
                Questions ({interviewDetails.questions.length})
              </h4>
              <div className="bg-muted/30 p-4 rounded-md max-h-40 overflow-y-auto">
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  {interviewDetails.questions.map((question, index) => (
                    <li key={index} className="text-muted-foreground leading-relaxed">
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {editing ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditing(false)}
                    disabled={saving}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="gap-2"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Failed to load interview details.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}