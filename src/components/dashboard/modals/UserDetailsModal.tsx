import { Badge } from '../../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import type { AppUsersBasicDataUser } from '../../../types/user';

interface UserDetailsModalProps {
  user: AppUsersBasicDataUser | null;
  isOpen: boolean;
  onClose: () => void;
  claims?: { key: string; value: string }[];
  roles?: { key: string; value: boolean }[];
  isLoadingClaims?: boolean;
  isLoadingRoles?: boolean;
}

export default function UserDetailsModal({
  user,
  isOpen,
  onClose,
  claims = [],
  roles = [],
  isLoadingClaims = false,
  isLoadingRoles = false,
}: UserDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View detailed information about this user including their profile,
            status, and permissions.
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="space-y-4">
            <div>
              <label className="font-medium">Name:</label>
              <p>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.userName}
              </p>
            </div>
            <div>
              <label className="font-medium">Email:</label>
              <p>{user.email}</p>
            </div>
            <div>
              <label className="font-medium">Username:</label>
              <p>{user.userName}</p>
            </div>
            <div>
              <label className="font-medium">Status:</label>
              <div className="flex items-center space-x-2">
                {user.isBlocked ? (
                  <Badge
                    variant="secondary"
                    className="bg-destructive text-primary-foreground"
                  >
                    Blocked
                  </Badge>
                ) : (
                  <Badge
                    variant="default"
                    className="bg-success text-primary-foreground"
                  >
                    Active
                  </Badge>
                )}
                {user.isDeleted && <Badge variant="outline">Deleted</Badge>}
              </div>
            </div>
            <div>
              <label className="font-medium">Registration Date:</label>
              <p>{new Date(user.registerDateTime + 'Z').toLocaleString()}</p>
            </div>
            <div>
              <label className="font-medium">Last Login:</label>
              <p>
                {user.lastLoginDateTime
                  ? new Date(user.lastLoginDateTime + 'Z').toLocaleString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <label className="font-medium">Claims:</label>
              {isLoadingClaims ? (
                <p>Loading claims...</p>
              ) : (
                (() => {
                  const activeClaims = claims.filter(
                    (claim) => claim.value === 'true'
                  );
                  return activeClaims.length > 0 ? (
                    <p>
                      {activeClaims
                        .map(
                          (claim) =>
                            `${claim.key.charAt(0).toUpperCase() + claim.key.slice(1)}`
                        )
                        .join(', ')}
                    </p>
                  ) : (
                    <p>No active claims found.</p>
                  );
                })()
              )}
            </div>
            <div>
              <label className="font-medium">Roles:</label>
              {isLoadingRoles ? (
                <p>Loading roles...</p>
              ) : (
                (() => {
                  const activeRoles = roles.filter(
                    (role) => role.value === true
                  );
                  return activeRoles.length > 0 ? (
                    <p>
                      {activeRoles
                        .map(
                          (role) =>
                            `${role.key.charAt(0).toUpperCase() + role.key.slice(1)}`
                        )
                        .join(', ')}
                    </p>
                  ) : (
                    <p>No active roles found.</p>
                  );
                })()
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
