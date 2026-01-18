import { useEffect, useMemo, useState } from 'react';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarDays, CreditCard, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { useMyOrdersHistory } from '@/hooks/useMembership';
import type { MyOrderHistoryItem } from '@/types/membership';

const asText = (v: unknown) => (v == null ? '' : String(v));

export default function MembershipOrders() {
  const { setItems } = useBreadcrumb();
  const [query, setQuery] = useState('');
  const [filterPaid, setFilterPaid] = useState<'all' | 'paid' | 'unpaid'>(
    'all'
  );
  const { data: apiOrders = [], isLoading, error } = useMyOrdersHistory();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: 'Orders' },
    ]);
  }, [setItems]);

  const filtered = useMemo(() => {
    return (apiOrders as MyOrderHistoryItem[]).filter((o) => {
      const matchesPaid =
        filterPaid === 'all'
          ? true
          : filterPaid === 'paid'
            ? o.isPaid
            : !o.isPaid;
      const text =
        `${o.id} ${o.paymentTransactionId} ${o.pubTrackId} ${o.membershipTierName} ${o.membershipTierCode}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      return matchesPaid && matchesQuery;
    });
  }, [filterPaid, query, apiOrders]);

  const processorLabel = (id: number) =>
    id === 1 ? 'PayPal' : id === 2 ? 'Stripe' : 'Other';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Membership Orders</h1>
        <p className="text-muted-foreground">
          Your invoices and payment history.
        </p>
      </div>

      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Search by transaction or tracking id, and filter by status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="text-sm text-muted-foreground mb-3">
              Loading orders...
            </div>
          )}
          {error && (
            <div className="text-sm text-destructive mb-3">
              Failed to load orders.
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <div className="flex gap-2">
              <Button
                variant={filterPaid === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaid('all')}
                className={filterPaid === 'all' ? 'btn' : ''}
              >
                All
              </Button>
              <Button
                variant={filterPaid === 'paid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaid('paid')}
                className={filterPaid === 'paid' ? 'btn' : ''}
              >
                Paid
              </Button>
              <Button
                variant={filterPaid === 'unpaid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPaid('unpaid')}
                className={filterPaid === 'unpaid' ? 'btn' : ''}
              >
                Unpaid
              </Button>
            </div>
            <div className="md:ml-auto w-full md:w-72">
              <Input
                placeholder="Search transaction or tracking id"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-primary-foreground"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border hover:border-gray-300 transition"
              >
                <div className="md:col-span-3">
                  <div className="font-semibold">Order #{o.id}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {format(new Date(o.orderPlacedAt), 'MMM dd, yyyy HH:mm')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {asText(o.membershipTierName)} (
                    {asText(o.membershipTierCode)})
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="text-sm">Amount</div>
                  <div className="text-lg font-bold">
                    ${o.amount.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    {o.processorId === 1 ? (
                      <Wallet className="h-4 w-4" />
                    ) : (
                      <CreditCard className="h-4 w-4" />
                    )}
                    <span>{processorLabel(o.processorId)}</span>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="text-sm">Transaction</div>
                  <div className="font-mono text-sm break-all">
                    {o.paymentTransactionId}
                  </div>
                  <div className="text-sm mt-2">Tracking</div>
                  <div className="font-mono text-sm break-all">
                    {o.pubTrackId}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-2 md:items-end">
                  <Badge
                    variant={o.isPaid ? 'default' : 'outline'}
                    className={o.isPaid ? 'bg-emerald-600 text-white' : ''}
                  >
                    {o.isPaid ? 'Paid' : 'Unpaid'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {o.isAutoRenewEnabled
                      ? 'Auto-renew: On'
                      : 'Auto-renew: Off'}
                  </Badge>
                  {o.isPaid && o.paidAt && (
                    <div className="text-xs text-muted-foreground">
                      Paid at {format(new Date(o.paidAt), 'MMM dd, yyyy HH:mm')}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      View Receipt
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No orders match your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
