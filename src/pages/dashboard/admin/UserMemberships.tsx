import { Helmet } from 'react-helmet-async';
import { Users, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Fragment, useMemo, useState } from 'react';
import { useUserMemberships } from '@/hooks/useMembership';
import type {
  UserMembershipItem,
  UserMembershipsFilters,
} from '@/types/membership';

export default function AdminUserMemberships() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [email, setEmail] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [startDateFrom, setStartDateFrom] = useState('');
  const [startDateTo, setStartDateTo] = useState('');
  const [endDateFrom, setEndDateFrom] = useState('');
  const [endDateTo, setEndDateTo] = useState('');

  const [appliedFilters, setAppliedFilters] = useState<UserMembershipsFilters>(
    {}
  );

  const filters = useMemo(
    () => ({
      startDateFrom: appliedFilters.startDateFrom || '',
      startDateTo: appliedFilters.startDateTo || '',
      endDateFrom: appliedFilters.endDateFrom || '',
      endDateTo: appliedFilters.endDateTo || '',
      userEmail: appliedFilters.userEmail || '',
      isActive: appliedFilters.isActive,
    }),
    [appliedFilters]
  );

  const handleApplyFilters = () => {
    const sFrom = startDateFrom ? new Date(startDateFrom).toISOString() : '';
    const sTo = startDateTo ? new Date(startDateTo).toISOString() : '';
    const eFrom = endDateFrom ? new Date(endDateFrom).toISOString() : '';
    const eTo = endDateTo ? new Date(endDateTo).toISOString() : '';

    setAppliedFilters({
      startDateFrom: sFrom,
      startDateTo: sTo,
      endDateFrom: eFrom,
      endDateTo: eTo,
      userEmail: email,
      isActive:
        isActiveFilter === 'all' ? undefined : isActiveFilter === 'active',
    });
    setPageNumber(1);
  };

  const { data, isLoading, error } = useUserMemberships(
    pageNumber,
    pageSize,
    filters
  );

  const memberships = (data?.userMemberships || []) as UserMembershipItem[];
  const totalRecords = data?.totalRecords || 0;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;

  const [openRows, setOpenRows] = useState<Record<number, boolean>>({});
  const toggleRow = (id: number) =>
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading memberships</div>;

  return (
    <>
      <Helmet>
        <title>User Memberships - Admin</title>
        <meta name="description" content="View and filter user memberships" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Memberships</h1>
          <p className="text-muted-foreground">
            Monitor memberships across users
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Search & Filter User Memberships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Search by email"
                  className="w-full"
                />
              </div>

              {/* Is Active */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={isActiveFilter}
                  onValueChange={(value: 'all' | 'active' | 'inactive') =>
                    setIsActiveFilter(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date From */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Start From</label>
                <Input
                  type="datetime-local"
                  value={startDateFrom}
                  onChange={(e) => setStartDateFrom(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Start Date To */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Start To</label>
                <Input
                  type="datetime-local"
                  value={startDateTo}
                  onChange={(e) => setStartDateTo(e.target.value)}
                  className="w-full"
                />
              </div>
              {/* End Date From */}
              <div className="space-y-2">
                <label className="text-sm font-medium">End From</label>
                <Input
                  type="datetime-local"
                  value={endDateFrom}
                  onChange={(e) => setEndDateFrom(e.target.value)}
                  className="w-full"
                />
              </div>
              {/* End Date To */}
              <div className="space-y-2">
                <label className="text-sm font-medium">End To</label>
                <Input
                  type="datetime-local"
                  value={endDateTo}
                  onChange={(e) => setEndDateTo(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Apply */}
              <div className="space-y-2">
                <Button
                  onClick={handleApplyFilters}
                  size="sm"
                  className="flex items-center gap-2 mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All User Memberships ({totalRecords})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">{''}</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Auto-Renew</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberships.length > 0 ? (
                    memberships.map((m) => (
                      <Fragment key={m.id}>
                        {(() => {
                          const isOpen = !!openRows[m.id];
                          return (
                            <>
                              <TableRow
                                className="cursor-pointer"
                                onClick={() => toggleRow(m.id)}
                              >
                                <TableCell className="align-middle">
                                  {isOpen ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </TableCell>
                                <TableCell className="align-middle">
                                  {m.userEmail || m.userName || m.userId}
                                </TableCell>
                                <TableCell className="align-middle">
                                  {m.tierName} ({m.tierCode})
                                </TableCell>
                                <TableCell className="align-middle">
                                  {m.isAutoRenewEnabled ? 'Yes' : 'No'}
                                </TableCell>
                                <TableCell className="align-middle">
                                  {m.isActive === 1 || m.isActive === true ? (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Inactive
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="align-middle">
                                  {new Date(m.startDate + 'Z').toLocaleString()}
                                </TableCell>
                                <TableCell className="align-middle">
                                  {new Date(m.endDate + 'Z').toLocaleString()}
                                </TableCell>
                              </TableRow>
                              {isOpen && (
                                <TableRow>
                                  <TableCell colSpan={7}>
                                    <div className="p-4 bg-muted/40 rounded-md space-y-3">
                                      {m.description && (
                                        <div>
                                          <div className="text-sm font-medium">
                                            Description
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {m.description}
                                          </div>
                                        </div>
                                      )}
                                      <div>
                                        <div className="text-sm font-medium mb-2">
                                          Features
                                        </div>
                                        {m.features && m.features.length > 0 ? (
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {m.features.map((f) => (
                                              <div
                                                key={f.id}
                                                className="rounded border bg-background p-3"
                                              >
                                                <div className="text-sm font-semibold">
                                                  {f.name}
                                                </div>
                                                {f.description && (
                                                  <div className="text-xs text-muted-foreground mb-1">
                                                    {f.description}
                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-sm text-muted-foreground">
                                            No features listed
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </>
                          );
                        })()}
                      </Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No memberships to display
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-4 sm:gap-0 md:flex-row items-center justify-end space-x-2 py-4">
              <div className="flex items-center gap-3 flex-1 text-sm text-muted-foreground">
                Showing {(pageNumber - 1) * pageSize + 1} to{' '}
                {Math.min(pageNumber * pageSize, totalRecords)} of{' '}
                {totalRecords} entries
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPageNumber(1);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber((prev) => prev - 1)}
                  disabled={pageNumber === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {pageNumber} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageNumber((prev) => prev + 1)}
                  disabled={pageNumber >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
