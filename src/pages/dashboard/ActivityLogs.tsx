import { Helmet } from 'react-helmet-async';
import { Activity, Search } from 'lucide-react';
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

import { useMemo, useState } from 'react';
import {
  useActivityLogs,
  useListActivityUniqueTypes,
} from '../../hooks/useActivityLogs';
import type {
  ActivityLog,
  ActivityLogsFilters,
  ListActivityUniqueTypes,
} from '../../types/activity-logs';
import { truncateText } from '../../lib/utils';

export default function ActivityLogs() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [fromTimestamp, setFromTimestamp] = useState('');
  const [toTimestamp, setToTimestamp] = useState('');

  const [appliedFilters, setAppliedFilters] = useState<ActivityLogsFilters>({});

  /* ********************************************* */
  /* Email      
  /* ********************************************* */

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /* ********************************************* */
  /* Acitivty types dropdown      
  /* ********************************************* */

  const { data: uniqueTypesData } = useListActivityUniqueTypes();
  const activityUniqueTypes =
    (uniqueTypesData as ListActivityUniqueTypes[]) || [];

  /* ********************************************* */
  /* Filter
  /* ********************************************* */

  const filters = useMemo(
    () => ({
      email: appliedFilters.email || '',
      activityType:
        appliedFilters.activityType === 'all'
          ? ''
          : appliedFilters.activityType || '',
      fromTimestamp: appliedFilters.fromTimestamp || '',
      toTimestamp: appliedFilters.toTimestamp || '',
    }),
    [appliedFilters]
  );

  const handleApplyFilters = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    const utcFromTimestamp = fromTimestamp
      ? new Date(fromTimestamp).toISOString()
      : '';
    const utcToTimestamp = toTimestamp
      ? new Date(toTimestamp).toISOString()
      : '';
    console.log(utcFromTimestamp, utcToTimestamp);
    setAppliedFilters({
      email,
      activityType: activityTypeFilter,
      fromTimestamp: utcFromTimestamp,
      toTimestamp: utcToTimestamp,
    });
    setPageNumber(1);
  };

  /* ********************************************* */
  /* ActivityLogs for table
  /* ********************************************* */

  const {
    data: activityLogs,
    isLoading,
    error,
  } = useActivityLogs(pageNumber, pageSize, filters);
  const activityLogsData = activityLogs || [];

  const logs: ActivityLog[] = activityLogsData?.activityLogs || [];
  const totalRecords = activityLogsData?.totalRecords || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading logs</div>;

  return (
    <>
      <Helmet>
        <title>Activity Logs - Dashboard</title>
        <meta
          name="description"
          content="View user activity logs and system events"
        />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor user activities and system events
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Email Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="Enter full email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className="w-full"
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              {/* Activity Type Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity Type</label>
                <Select
                  value={activityTypeFilter}
                  onValueChange={setActivityTypeFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activity Types</SelectItem>
                    {activityUniqueTypes?.map((type) => {
                      const { truncated, full } = truncateText(
                        type.activityTypeU,
                        50
                      );
                      return (
                        <SelectItem
                          key={type.id}
                          value={type.activityTypeU}
                          title={full}
                        >
                          {truncated}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From DateTime</label>
                <Input
                  type="datetime-local"
                  value={fromTimestamp}
                  onChange={(e) => setFromTimestamp(e.target.value)}
                  className="w-full"
                />
              </div>
              {/* End Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To DateTime</label>
                <Input
                  type="datetime-local"
                  value={toTimestamp}
                  onChange={(e) => setToTimestamp(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Button
                  onClick={handleApplyFilters}
                  size="sm"
                  className="flex items-center gap-2 mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Search className="w-4 h-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              All Activity Logs ({totalRecords})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length > 0 ? (
                    logs.map((log) => {
                      const { truncated, full } = truncateText(log.details, 90);
                      return (
                        <TableRow key={log.id}>
                          <TableCell>{log.email}</TableCell>
                          <TableCell>{log.activityType}</TableCell>
                          <TableCell title={full}>{truncated}</TableCell>
                          <TableCell>
                            {new Date(log.timestamp + 'Z').toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No activity logs to display
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
