'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  userEmail?: string;
  userCount?: number;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({ 
  isOpen, 
  onOpenChange, 
  onConfirm, 
  userEmail, 
  userCount, 
  isLoading 
}: DeleteConfirmationModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const isBulkDelete = userCount && userCount > 1;

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
            Delete {isBulkDelete ? 'Users' : 'User'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            {isBulkDelete 
              ? `Are you sure you want to delete ${userCount} users? This action cannot be undone.`
              : `Are you sure you want to delete "${userEmail}"? This action cannot be undone.`
            }
          </p>

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
              I understand this action is permanent
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
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}