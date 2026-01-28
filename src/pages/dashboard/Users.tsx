import { useState } from 'react';
import {
  useAppUsersBasicData,
  useUserClaims,
  useUserRoles,
} from '../../hooks/useUsers';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Loader2, UserCheck, UserX, MoreHorizontal } from 'lucide-react';
import type { AppUsersBasicDataUser } from '../../types/user';
import {
  UserDetailsModal,
  EditUserModal,
} from '../../components/dashboard/modals';

export default function Users() {
  const [selectedUser, setSelectedUser] =
    useState<AppUsersBasicDataUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: usersData, isLoading, error } = useAppUsersBasicData();
  const users = usersData?.users || [];

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
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.isBlocked ? (
                            <Badge
                              variant="secondary"
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsModalOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditModalOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              Edit User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        claims={userClaims}
        roles={userRoles}
        isLoadingClaims={claimsLoading}
        isLoadingRoles={rolesLoading}
      />

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
