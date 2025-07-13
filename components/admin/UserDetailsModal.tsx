'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Shield, Activity, CheckCircle, XCircle } from 'lucide-react';
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

  const formatDate = (dateString: string) =>
    dayjs(dateString).format('MMM D, YYYY h:mm A');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <User className="w-5 h-5" />
            User Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : userDetails ? (
          <div className="space-y-6 text-sm sm:text-base">
            {/* Header */}
            <div className="flex gap-4 items-center p-4 bg-muted/40 rounded-xl">
              <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 text-primary font-bold text-xl sm:text-2xl">
                {userDetails.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-foreground">{userDetails.email}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">ID: {userDetails.uid}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userDetails.disabled ? (
                    <Badge variant="destructive" className="gap-1">
                      <XCircle className="w-4 h-4" />
                      Disabled
                    </Badge>
                  ) : (
                    <Badge className="gap-1 bg-green-600 text-white">
                      <CheckCircle className="w-4 h-4" />
                      Active
                    </Badge>
                  )}
                  {userDetails.emailVerified && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-4 h-4" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Account Info */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2 text-foreground">
                  <Mail className="w-4 h-4" />
                  Account Info
                </h4>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{userDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified:</span>
                    <span>{userDetails.emailVerified ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{userDetails.disabled ? 'Disabled' : 'Active'}</span>
                  </div>
                </div>
              </div>

              {/* Activity Info */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2 text-foreground">
                  <Activity className="w-4 h-4" />
                  Activity Info
                </h4>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{formatDate(userDetails.metadata.creationTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sign In:</span>
                    <span>
                      {userDetails.metadata.lastSignInTime
                        ? formatDate(userDetails.metadata.lastSignInTime)
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Claims */}
            {userDetails.customClaims && Object.keys(userDetails.customClaims).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-foreground">
                  <Shield className="w-4 h-4" />
                  Custom Claims
                </h4>
                <div className="bg-muted/30 p-3 rounded-md overflow-x-auto text-xs">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(userDetails.customClaims, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Failed to load user details.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
