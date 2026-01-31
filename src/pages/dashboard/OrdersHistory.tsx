import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useAllOrdersHistory } from '@/hooks/useMembership';
import type { AllOrdersFilters } from '@/types/membership';
import { PaymentProcessor } from '@/constants/enums';
import { CreditCard, Wallet, Search } from 'lucide-react';

export default function AdminOrdersHistory() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Draft (UI) filter inputs
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [processorId, setProcessorId] = useState<string>('all');
  const [isPaid, setIsPaid] = useState<string>('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');

  // Applied filters (only change when Apply is pressed)
  const [appliedFilters, setAppliedFilters] = useState<
    Partial<AllOrdersFilters>
  >({});

  // Helper to construct filters from the current draft inputs
  const buildFilters = (): Partial<AllOrdersFilters> => ({
    userEmail: email || undefined,
    processorId: processorId === 'all' ? undefined : Number(processorId),
    isPaid: isPaid === 'all' ? undefined : isPaid === 'paid',
    orderPlacedAtFrom: fromDate ? new Date(fromDate).toISOString() : undefined,
    orderPlacedAtTo: toDate ? new Date(toDate).toISOString() : undefined,
    amountFromDT: amountFrom ? Number(amountFrom) : undefined,
    amountToDT: amountTo ? Number(amountTo) : undefined,
    paymentTransactionId: search || undefined,
    pubTrackId: search || undefined,
    membershipTierCode: search || undefined,
  });

  const { data, isLoading, error } = useAllOrdersHistory(
    pageNumber,
    pageSize,
    appliedFilters
  );
  const totalRecords = data?.totalRecords || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const orders = data?.membershipOrders || [];

  return (
    <>
      <Helmet>
        <title>Admin Orders History - Dashboard</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">All Orders History</h1>
          <p className="text-muted-foreground">
            Search and filter all membership orders.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <Input
                  placeholder="Transaction / Track ID / Tier Code"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  placeholder="Exact user email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Processor</label>
                <Select value={processorId} onValueChange={setProcessorId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value={String(PaymentProcessor.PayPal)}>
                      PayPal
                    </SelectItem>
                    <SelectItem value={String(PaymentProcessor.Stripe)}>
                      Stripe
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={isPaid} onValueChange={setIsPaid}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Input
                  type="datetime-local"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input
                  type="datetime-local"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount From</label>
                <Input
                  type="number"
                  value={amountFrom}
                  onChange={(e) => setAmountFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount To</label>
                <Input
                  type="number"
                  value={amountTo}
                  onChange={(e) => setAmountTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Button
                  size="sm"
                  className="mt-6 btn"
                  onClick={() => {
                    setPageNumber(1);
                    setAppliedFilters(buildFilters());
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results ({totalRecords})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="text-sm text-muted-foreground mb-3">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive mb-3">
                Failed to load.
              </div>
            )}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Processor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Placed</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Track ID</TableHead>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Auto-renew</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell>#{o.id}</TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">
                            {o.userName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {o.userEmail}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{o.membershipTierName}</div>
                          <div className="text-xs text-muted-foreground">
                            {o.membershipTierCode}
                          </div>
                        </TableCell>
                        <TableCell>${o.amount.toFixed(2)}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {o.processorId === PaymentProcessor.PayPal ? (
                            <Wallet className="h-4 w-4" />
                          ) : (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {o.processorId === PaymentProcessor.PayPal
                            ? 'PayPal'
                            : 'Stripe'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={o.isPaid ? 'default' : 'outline'}
                            className={
                              o.isPaid ? 'bg-emerald-600 text-white' : ''
                            }
                          >
                            {o.isPaid ? 'Paid' : 'Unpaid'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(o.orderPlacedAt + 'Z').toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {o.paidAt
                            ? new Date(o.paidAt + 'Z').toLocaleString()
                            : '-'}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {o.pubTrackId}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {o.paymentTransactionId}
                        </TableCell>
                        <TableCell>
                          {o.isAutoRenewEnabled ? 'On' : 'Off'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={11}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No orders to display
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
                  Page {pageNumber} of {Math.max(totalPages, 1)}
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
