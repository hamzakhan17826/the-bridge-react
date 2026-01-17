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

type Order = {
  id: number;
  orderPlacedAt: string; // ISO
  amount: number;
  processorId: number; // 1 PayPal, 2 Stripe
  paymentTransactionId: string;
  paymentStatus: number; // just for future
  isPaid: boolean;
  paidAt?: string | null;
  pubTrackId: string;
};

const DUMMY_ORDERS: Order[] = [
  {
    id: 101,
    orderPlacedAt: new Date().toISOString(),
    amount: 19.99,
    processorId: 1,
    paymentTransactionId: 'PAYPAL-TRX-ABC123',
    paymentStatus: 2,
    isPaid: true,
    paidAt: new Date().toISOString(),
    pubTrackId: 'PUB-TRACK-AAA',
  },
  {
    id: 102,
    orderPlacedAt: new Date(Date.now() - 86400000).toISOString(),
    amount: 39.99,
    processorId: 2,
    paymentTransactionId: 'STRIPE-TRX-XYZ789',
    paymentStatus: 1,
    isPaid: false,
    paidAt: null,
    pubTrackId: 'PUB-TRACK-BBB',
  },
  {
    id: 103,
    orderPlacedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    amount: 0,
    processorId: 1,
    paymentTransactionId: 'PAYPAL-TRX-FFF456',
    paymentStatus: 2,
    isPaid: true,
    paidAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    pubTrackId: 'PUB-TRACK-CCC',
  },
];

export default function MembershipOrders() {
  const { setItems } = useBreadcrumb();
  const [query, setQuery] = useState('');
  const [filterPaid, setFilterPaid] = useState<'all' | 'paid' | 'unpaid'>(
    'all'
  );

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: 'Orders' },
    ]);
  }, [setItems]);

  const filtered = useMemo(() => {
    return DUMMY_ORDERS.filter((o) => {
      const matchesPaid =
        filterPaid === 'all'
          ? true
          : filterPaid === 'paid'
            ? o.isPaid
            : !o.isPaid;
      const text =
        `${o.id} ${o.paymentTransactionId} ${o.pubTrackId}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      return matchesPaid && matchesQuery;
    });
  }, [filterPaid, query]);

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
