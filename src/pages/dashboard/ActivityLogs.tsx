import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Activity, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
} from '@tanstack/react-table';
import api from '@/lib/api';
import { toast } from 'react-toastify';

interface ActivityLog {
  id: number;
  userId: string;
  email: string;
  activityType: string;
  details: string | null;
  timestamp: string;
}

interface ActivityLogsResponse {
  activityLogs: ActivityLog[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const { setItems } = useBreadcrumb();

  const fetchActivityLogs = useCallback(
    async (page: number = 1, searchQuery: string = '') => {
      try {
        // Only show loading for initial load or page changes, not for search
        if (searchQuery.trim()) {
          setSearchLoading(true);
        } else if (page === 1) {
          setLoading(true);
        }

        const requestData = {
          pageNumber: page,
          pageSize: pageSize,
        };

        // If there's a search query, load all records for client-side filtering
        if (searchQuery.trim()) {
          requestData.pageSize = 1000; // Load more records for search
          requestData.pageNumber = 1;
        }

        const response = await api.post('/System/ActivityLogs', requestData);

        const data: ActivityLogsResponse = response.data;

        if (searchQuery.trim()) {
          // Filter on client side for search
          const filteredLogs = data.activityLogs.filter((log) => {
            const searchValue = searchQuery.toLowerCase();
            return (
              log.email?.toLowerCase().includes(searchValue) ||
              log.activityType?.toLowerCase().includes(searchValue) ||
              log.details?.toLowerCase().includes(searchValue)
            );
          });
          setLogs(filteredLogs);
          setTotalRecords(filteredLogs.length);
          setCurrentPage(1);
        } else {
          // Normal pagination
          setLogs(data.activityLogs);
          setTotalRecords(data.totalRecords);
          setCurrentPage(data.pageNumber);
        }
      } catch (error) {
        console.error('Error fetching activity logs:', error);
        toast.error('Failed to load activity logs');
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchActivityLogs(1, globalFilter);
    }, 300);

    setSearchTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [globalFilter, fetchActivityLogs]);

  const handleSearchChange = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Activity Logs' },
    ]);
  }, [setItems]);

  useEffect(() => {
    fetchActivityLogs();
  }, [fetchActivityLogs]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActivityTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'User Logged In': 'bg-blue-100 text-blue-800',
      'User Registered': 'bg-green-100 text-green-800',
      'User Confirms Email': 'bg-purple-100 text-purple-800',
      'Medium Registered': 'bg-orange-100 text-orange-800',
      'User App Profile Update': 'bg-yellow-100 text-yellow-800',
      'Medium Claim Added': 'bg-pink-100 text-pink-800',
      'User Claim Added': 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const columns: ColumnDef<ActivityLog>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <div className="font-mono text-sm text-gray-600">
          #{row.getValue('id')}
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'User',
      cell: ({ row }) => {
        const log = row.original;
        return (
          <div>
            <div className="font-medium text-gray-900">{log.email}</div>
            <div className="text-xs text-gray-500 font-mono">{log.userId}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'activityType',
      header: 'Activity Type',
      cell: ({ row }) => {
        const type = row.getValue('activityType') as string;
        const maxLength = 20; // Adjust this value as needed
        const truncated =
          type.length > maxLength ? `${type.substring(0, maxLength)}...` : type;

        return (
          <div title={type}>
            <Badge className={getActivityTypeColor(type)}>{truncated}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => {
        const details = row.getValue('details') as string;
        return (
          <div
            className="text-sm text-gray-700 max-w-xs truncate"
            title={details || ''}
          >
            {details || 'No details available'}
          </div>
        );
      },
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {formatTimestamp(row.getValue('timestamp'))}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: logs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Activity Logs ({table.getFilteredRowModel()?.rows?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-2">Loading activity logs...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center py-4">
                  <div className="relative flex-1 max-w-sm">
                    <Input
                      placeholder="Search by email, activity type, or details..."
                      value={globalFilter ?? ''}
                      onChange={(event) =>
                        handleSearchChange(event.target.value)
                      }
                      className="pr-8"
                    />
                    {searchLoading && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel()?.rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {searchLoading
                      ? 'Searching...'
                      : globalFilter.trim()
                        ? `Found ${totalRecords} result${totalRecords !== 1 ? 's' : ''} for "${globalFilter}"`
                        : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
                            currentPage * pageSize,
                            totalRecords
                          )} of ${totalRecords} entries`}
                  </div>
                  {!globalFilter.trim() && (
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchActivityLogs(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of{' '}
                        {Math.ceil(totalRecords / pageSize)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchActivityLogs(currentPage + 1)}
                        disabled={
                          currentPage >= Math.ceil(totalRecords / pageSize)
                        }
                      >
                        Next
                      </Button>
                    </div>
                  )}
                  {globalFilter.trim() && (
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage?.()}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage?.()}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
