import { useState } from 'react';
import { useAppUsers, useUserClaims, useUserRoles } from '../../hooks/useUsers';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Loader2, UserCheck, UserX } from 'lucide-react';
import type { AppUser } from '../../types/user';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use React Query for data fetching
  const { data: users = [], isLoading, error } = useAppUsers();
  const { data: userClaims = [], isLoading: claimsLoading } = useUserClaims(
    selectedUser?.id || ''
  );
  const { data: userRoles = [], isLoading: rolesLoading } = useUserRoles(
    selectedUser?.id || ''
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">
          View and manage all application users
        </p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Users List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Loading users...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">
              <p>Failed to load users. Please try again.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {user.firstName?.[0] || user.userName?.[0] || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.userName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.emailConfirmed ? 'Verified' : 'Unverified'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.isBlocked ? (
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1 bg-primary text-primary-foreground"
                            >
                              <UserX className="w-3 h-3" />
                              Blocked
                            </Badge>
                          ) : (
                            <Badge
                              variant="default"
                              className="flex items-center gap-1 bg-primary text-primary-foreground"
                            >
                              <UserCheck className="w-3 h-3" />
                              Active
                            </Badge>
                          )}
                          {user.isDeleted && (
                            <Badge variant="outline">Deleted</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.registerDateTime + 'Z').toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(
                          user.lastLoginDateTime
                            ? user.lastLoginDateTime + 'Z'
                            : 'Never'
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoading && !error && users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="font-medium">Name:</label>
                <p>
                  {selectedUser.firstName && selectedUser.lastName
                    ? `${selectedUser.firstName} ${selectedUser.lastName}`
                    : selectedUser.userName}
                </p>
              </div>
              <div>
                <label className="font-medium">Email:</label>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <label className="font-medium">Username:</label>
                <p>{selectedUser.userName}</p>
              </div>
              <div>
                <label className="font-medium">Status:</label>
                <div className="flex items-center space-x-2">
                  {selectedUser.isBlocked ? (
                    <Badge
                      variant="destructive"
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
                  {selectedUser.isDeleted && (
                    <Badge variant="outline">Deleted</Badge>
                  )}
                </div>
              </div>
              <div>
                <label className="font-medium">Email Confirmed:</label>
                <p>{selectedUser.emailConfirmed ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="font-medium">Registration Date:</label>
                <p>
                  {new Date(
                    selectedUser.registerDateTime + 'Z'
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="font-medium">Last Login:</label>
                <p>
                  {selectedUser.lastLoginDateTime
                    ? new Date(
                        selectedUser.lastLoginDateTime + 'Z'
                      ).toLocaleString()
                    : 'Never'}
                </p>
              </div>
              <div>
                <label className="font-medium">Claims:</label>
                {claimsLoading ? (
                  <p>Loading claims...</p>
                ) : userClaims.length > 0 ? (
                  <p>
                    {userClaims
                      .map(
                        (claim) =>
                          `${claim.key.charAt(0).toUpperCase() + claim.key.slice(1)}`
                      )
                      .join(', ')}
                  </p>
                ) : (
                  <p>No claims found.</p>
                )}
              </div>
              <div>
                <label className="font-medium">Roles:</label>
                {rolesLoading ? (
                  <p>Loading roles...</p>
                ) : userRoles.length > 0 ? (
                  <p>
                    {userRoles
                      .map(
                        (role) =>
                          `${role.key.charAt(0).toUpperCase() + role.key.slice(1)}`
                      )
                      .join(', ')}
                  </p>
                ) : (
                  <p>No roles found.</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
