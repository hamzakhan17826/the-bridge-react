import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { ShoppingCart, Play, Star, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const removeItem = useCartStore((s) => s.removeItem);

  const grandTotal = items.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  return (
    <div className="space-y-8">
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

      {items.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Your cart is empty.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((it) => {
            // choose an icon based on feature id
            let Icon = ShoppingCart;
            if (it.id === 'replayPass') Icon = Play;
            else if (it.id === 'eventPriority') Icon = Star;

            return (
              <Card key={it.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-semibold text-lg">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.qty} × ${it.unitPrice.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-lg">
                      ${(it.qty * it.unitPrice).toFixed(2)}
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(it.id)}
                      aria-label="Remove item"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}

          <Card className="p-4 bg-primary/5">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 btn"
              size="lg"
              onClick={() => {
                clearCart();
                alert('Purchase complete!');
              }}
            >
              Complete Purchase
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              size="lg"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
