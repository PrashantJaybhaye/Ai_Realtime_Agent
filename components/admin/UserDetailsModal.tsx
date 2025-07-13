'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  User, 
  Mail, 
  Shield, 
  Activity,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import dayjs from 'dayjs';

interface UserDetails {
  uid: string;
  email: string;
  disabled: boolean;
  emailVerified: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
  customClaims?: Record<string, unknown>;
}

interface UserDetailsModalProps {
  userId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsModal({ userId, isOpen, onOpenChange }: UserDetailsModalProps) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId && isOpen) {
      fetchUserDetails();
    }
  }, [userId, isOpen]);

  const fetchUserDetails = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view', userId })
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.user);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : userDetails ? (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {userDetails.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{userDetails.email}</h3>
                <p className="text-sm text-muted-foreground">ID: {userDetails.uid}</p>
                <div className="flex items-center gap-2 mt-2">
                  {userDetails.disabled ? (
                    <Badge variant="destructive" className="gap-1">
                      <XCircle className="w-3 h-3" />
                      Disabled
                    </Badge>
                  ) : (
                    <Badge variant="default" className="gap-1 bg-green-500">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </Badge>
                  )}
                  {userDetails.emailVerified && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Account Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{userDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email Verified:</span>
                    <span className="text-foreground">
                      {userDetails.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-foreground">
                      {userDetails.disabled ? 'Disabled' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="text-foreground">
                      {formatDate(userDetails.metadata.creationTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sign In:</span>
                    <span className="text-foreground">
                      {userDetails.metadata.lastSignInTime 
                        ? formatDate(userDetails.metadata.lastSignInTime)
                        : 'Never'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Claims */}
            {userDetails.customClaims && Object.keys(userDetails.customClaims).length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Custom Claims
                </h4>
                <div className="bg-muted/30 rounded-lg p-3">
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
                    {JSON.stringify(userDetails.customClaims, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load user details</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}