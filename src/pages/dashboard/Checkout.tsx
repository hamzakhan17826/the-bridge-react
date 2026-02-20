import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

/**
 * Checkout page – displays features that have been added to the cart.
 * Users will review line items and complete their purchase from here.
 */
export default function Checkout() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Checkout' },
    ]);
  }, [setItems]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShoppingCart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Review items in your cart and complete the purchase using your
            credits.
          </p>
        </div>
      </div>

      {/* TODO: render cart contents and checkout controls */}
    </div>
  );
}
