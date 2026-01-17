import { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBreadcrumb } from '@/components/ui/breadcrumb';

export default function PMServices() {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Services' },
    ]);
  }, [setItems]);

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Services
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Catalog
          </Badge>
        </CardTitle>
        <CardDescription>
          Define offerings, durations, prices, and policies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-3">
          <Button size="sm">Add Service</Button>
        </div>
        <div className="space-y-3">
          {[
            {
              name: 'Private Reading',
              duration: 60,
              price: 150,
              status: 'Published',
            },
            {
              name: 'Development Coaching',
              duration: 45,
              price: 120,
              status: 'Draft',
            },
          ].map((s) => (
            <div
              key={s.name}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-muted-foreground">
                  {s.duration} mins • ${s.price}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={s.status === 'Published' ? 'secondary' : 'outline'}
                >
                  {s.status}
                </Badge>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  Duplicate
                </Button>
                <Button size="sm">Publish</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
