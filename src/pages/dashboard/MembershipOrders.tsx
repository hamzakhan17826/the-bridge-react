import { useEffect } from 'react';
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
import { CalendarDays, CreditCard, Wallet } from 'lucide-react';
import { format } from 'date-fns';
import { useMyOrdersHistory } from '@/hooks/useMembership';
import type { MyOrderHistoryItem } from '@/types/membership';
import { PaymentProcessor } from '@/constants/enums';

const asText = (v: unknown) => (v == null ? '' : String(v));

export default function MembershipOrders() {
  const { setItems } = useBreadcrumb();
  const { data: apiOrders = [], isLoading, error } = useMyOrdersHistory();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: 'Orders' },
    ]);
  }, [setItems]);

  const orders = apiOrders as MyOrderHistoryItem[];

  const processorLabel = (id: number) =>
    id === PaymentProcessor.PayPal
      ? 'PayPal'
      : id === PaymentProcessor.Stripe
        ? 'Stripe'
        : 'Other';

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
          <div className="space-y-3">
            {orders.map((o) => (
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
                    {o.processorId === PaymentProcessor.PayPal ? (
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
            {orders.length === 0 && (
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
