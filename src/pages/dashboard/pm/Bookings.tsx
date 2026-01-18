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

export default function PMBookings() {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Bookings' },
    ]);
  }, [setItems]);

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Bookings
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Overview
          </Badge>
        </CardTitle>
        <CardDescription>
          Manage sessions, approvals, reschedules, and statuses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <div className="md:col-span-3">
            <div className="text-sm text-muted-foreground">Filters</div>
            <div className="space-y-2 mt-2">
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                Pending
              </Button>
              <Button variant="outline" size="sm">
                Completed
              </Button>
            </div>
          </div>
          <div className="md:col-span-9">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">
                      Client #{i} • Private Reading
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Jan 22, 2:00 PM • 60 mins • Virtual
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pending</Badge>
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm" className="btn">
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
