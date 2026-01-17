import { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function PMSchedule() {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Schedule' },
    ]);
  }, [setItems]);

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
        <CardDescription>
          Manage weekly availability and blackout dates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <DayPicker mode="single" />
          </div>
          <div className="md:col-span-7 space-y-3">
            <div className="text-sm text-muted-foreground">
              Selected day slots (dummy)
            </div>
            {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'].map((t) => (
              <div
                key={t}
                className="p-3 border rounded flex items-center justify-between"
              >
                <div>{t} • 60 mins</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Disable
                  </Button>
                  <Button size="sm">Block</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
