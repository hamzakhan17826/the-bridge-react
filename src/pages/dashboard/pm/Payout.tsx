import { useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/components/ui/breadcrumb';

export default function PMPayout() {
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Professional Medium' },
      { label: 'Payout Settings' },
    ]);
  }, [setItems]);

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle>Payout Settings</CardTitle>
        <CardDescription>
          Configure payout method and tax details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="payoutMethod">Payout Method</Label>
            <Input
              id="payoutMethod"
              placeholder="Stripe Connect (recommended)"
            />
          </div>
          <div>
            <Label htmlFor="accountEmail">Account Email</Label>
            <Input
              id="accountEmail"
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="bankAccount">Bank Account (masked)</Label>
            <Input id="bankAccount" placeholder="**** **** **** 1234" />
          </div>
          <div>
            <Label htmlFor="taxId">Tax ID</Label>
            <Input id="taxId" placeholder="TIN / SSN (masked)" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button>Save Changes</Button>
          <Button variant="outline">Connect with Stripe</Button>
        </div>
      </CardContent>
    </Card>
  );
}
