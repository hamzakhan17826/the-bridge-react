import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog';
import type { AppUsersBasicDataUser } from '../../../types/user';

interface EditUserModalProps {
  user: AppUsersBasicDataUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
}: EditUserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit user information and permissions. Changes will be saved
            immediately.
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">
                Edit User:{' '}
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.userName}
              </h3>
              <p className="text-muted-foreground">
                This is a dummy edit modal for user: {user.email}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Edit functionality will be implemented here soon!
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
