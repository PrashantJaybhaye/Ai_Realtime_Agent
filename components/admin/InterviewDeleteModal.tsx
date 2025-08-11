'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface InterviewDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  interviewTitle?: string;
  interviewCount?: number;
  isLoading?: boolean;
}

export default function InterviewDeleteModal({ 
  isOpen, 
  onOpenChange, 
  onConfirm, 
  interviewTitle, 
  interviewCount, 
  isLoading 
}: InterviewDeleteModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const isBulkDelete = interviewCount && interviewCount > 1;

  const handleConfirm = () => {
    if (confirmed) {
      onConfirm();
      setConfirmed(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Delete {isBulkDelete ? 'Interviews' : 'Interview'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            {isBulkDelete 
              ? `Are you sure you want to delete ${interviewCount} interviews? This will also delete all related feedback data.`
              : `Are you sure you want to delete "${interviewTitle}"? This will also delete all related feedback data.`
            }
          </p>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-sm text-red-400 font-medium">
              ⚠️ This action cannot be undone and will permanently remove:
            </p>
            <ul className="text-sm text-red-300 mt-2 space-y-1 ml-4">
              <li>• Interview data and questions</li>
              <li>• All associated feedback reports</li>
              <li>• User progress tracking</li>
            </ul>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="confirm-delete"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="rounded border-border"
              disabled={isLoading}
            />
            <label htmlFor="confirm-delete" className="text-sm text-foreground">
              I understand this action is permanent and irreversible
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!confirmed || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            {isLoading ? 'Deleting...' : 'Delete Forever'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}