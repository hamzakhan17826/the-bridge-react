import { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/components/ui/breadcrumb';

export default function PMEarnings() {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Earnings' },
    ]);
  }, [setItems]);

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Earnings
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            MTD
          </Badge>
        </CardTitle>
        <CardDescription>
          Payouts, balances, fees, and downloadable statements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Revenue MTD</div>
            <div className="text-2xl font-bold">$2,450</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Upcoming Payout</div>
            <div className="text-2xl font-bold">$620</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-sm text-muted-foreground">Fees</div>
            <div className="text-2xl font-bold">$120</div>
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <Button size="sm" variant="outline">
            Download Statement (PDF)
          </Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">Payout #{i}</div>
                <div className="text-sm text-muted-foreground">
                  Jan {10 + i}, 2026 • Stripe • Settled
                </div>
              </div>
              <div className="font-semibold">$200</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
