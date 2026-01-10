import { useState } from 'react';
import { useAppUsers } from '../../hooks/useUsers';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Loader2, Search, UserCheck, UserX, RefreshCw } from 'lucide-react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Use React Query for data fetching
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useAppUsers(selectedUserId || undefined);

  const handleSearch = () => {
    if (selectedUserId.trim()) {
      // React Query will automatically refetch when selectedUserId changes
      setSelectedUserId(selectedUserId.trim());
    }
  };

  const handleLoadAll = () => {
    setSelectedUserId('');
  };

  const handleRefresh = () => {
    refetch();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            View and manage all application users
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {users.length} Users
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Enter specific User ID..."
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-64"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Search className="w-4 h-4 mr-2" />
                Search ID
              </Button>
              <Button
                variant="outline"
                onClick={handleLoadAll}
                disabled={isLoading}
              >
                Load All Users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="mt-2"
              >
                Retry
              </Button>
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
                  {filteredUsers.map((user) => (
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
                        {formatDate(user.registerDateTime)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {user.lastLoginDateTime
                          ? formatDate(user.lastLoginDateTime)
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUserId(user.id);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoading && !error && filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
