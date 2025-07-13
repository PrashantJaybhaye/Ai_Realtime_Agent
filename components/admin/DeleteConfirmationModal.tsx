'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, X } from 'lucide-react';

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
  const [confirmText, setConfirmText] = useState('');
  const isBulkDelete = userCount && userCount > 1;
  const expectedText = isBulkDelete ? 'DELETE USERS' : 'DELETE USER';
  const isConfirmValid = confirmText === expectedText;

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm();
      setConfirmText('');
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Confirm Deletion
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Message */}
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-semibold text-red-800 dark:text-red-200">
                  {isBulkDelete ? 'Delete Multiple Users' : 'Delete User Account'}
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {isBulkDelete 
                    ? `You are about to permanently delete ${userCount} user accounts. This action cannot be undone.`
                    : `You are about to permanently delete the account for "${userEmail}". This action cannot be undone.`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Consequences List */}
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">This will permanently:</h5>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Delete {isBulkDelete ? 'all selected user accounts' : 'the user account'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Remove {isBulkDelete ? 'all associated' : 'associated'} user data
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Revoke {isBulkDelete ? 'all authentication tokens' : 'authentication tokens'}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                Cannot be recovered or undone
              </li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Type <span className="font-mono bg-muted px-1 rounded text-red-600">{expectedText}</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={expectedText}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isLoading}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!isConfirmValid || isLoading}
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