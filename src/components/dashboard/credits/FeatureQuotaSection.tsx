import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Minus,
  Play,
  Star,
  CheckCircle,
  ShoppingCart,
} from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import type { CartItem } from '@/stores/cartStore';

export interface FeatureQuotaSectionProps {
  quotaIncrements: { replayPass: number; eventPriority: number };
  quotaPrices: { replayPass: number; eventPriority: number };
  handleQuotaIncrement: (
    type: keyof FeatureQuotaSectionProps['quotaIncrements'],
    increment: number
  ) => void;
}

const FeatureQuotaSection: React.FC<FeatureQuotaSectionProps> = ({
  quotaIncrements,
  quotaPrices,
  handleQuotaIncrement,
}) => {
  const navigate = useNavigate();

  const totalQuotaPrice =
    quotaIncrements.replayPass * quotaPrices.replayPass +
    quotaIncrements.eventPriority * quotaPrices.eventPriority;

  const addItems = useCartStore(
    (s) => s.addItems as (items: CartItem[]) => void
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Star className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Premium Features</h2>
      </div>

      <div className="space-y-4">
        {/* Replay Pass */}
        <Card
          className={`border-2 transition-all duration-200 ${
            quotaIncrements.replayPass > 0
              ? 'border-green-300 bg-green-50/30 shadow-lg'
              : 'border-dashed border-blue-200 hover:border-blue-300'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Play className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Replay Pass</h3>
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-200 bg-blue-50"
                    >
                      QUOTA
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Unlock additional recordings from the library
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">$2.00 per pass</span>
                  {quotaIncrements.replayPass > 0 && (
                    <span className="font-semibold text-blue-600">
                      Total: $
                      {(
                        quotaIncrements.replayPass * quotaPrices.replayPass
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                {quotaIncrements.replayPass > 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-md">
                    <CheckCircle className="h-4 w-4" />
                    You can replay recordings {quotaIncrements.replayPass} time
                    {quotaIncrements.replayPass > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuotaIncrement('replayPass', -1)}
                  disabled={quotaIncrements.replayPass === 0}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center min-w-15">
                  <span className="text-2xl font-bold">
                    {quotaIncrements.replayPass}
                  </span>
                  <span className="text-xs text-muted-foreground">passes</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuotaIncrement('replayPass', 1)}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Priority */}
        <Card
          className={`border-2 transition-all duration-200 ${
            quotaIncrements.eventPriority > 0
              ? 'border-green-300 bg-green-50/30 shadow-lg'
              : 'border-dashed border-blue-200 hover:border-blue-300'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Event Priority</h3>
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-200 bg-blue-50"
                    >
                      QUOTA
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Get priority access for upcoming events
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">$1.50 per slot</span>
                  {quotaIncrements.eventPriority > 0 && (
                    <span className="font-semibold text-blue-600">
                      Total: $
                      {(
                        quotaIncrements.eventPriority *
                        quotaPrices.eventPriority
                      ).toFixed(2)}
                    </span>
                  )}
                </div>

                {quotaIncrements.eventPriority > 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-md">
                    <CheckCircle className="h-4 w-4" />
                    Priority access for {quotaIncrements.eventPriority} event
                    {quotaIncrements.eventPriority > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuotaIncrement('eventPriority', -1)}
                  disabled={quotaIncrements.eventPriority === 0}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center min-w-15">
                  <span className="text-2xl font-bold">
                    {quotaIncrements.eventPriority}
                  </span>
                  <span className="text-xs text-muted-foreground">slots</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuotaIncrement('eventPriority', 1)}
                  className="h-10 w-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quota Summary */}
      {(quotaIncrements.replayPass > 0 ||
        quotaIncrements.eventPriority > 0) && (
        <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-lg">Your Selection</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {quotaIncrements.replayPass > 0 && (
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      {quotaIncrements.replayPass} Replay Pass
                      {quotaIncrements.replayPass > 1 ? 'es' : ''}
                    </div>
                  )}
                  {quotaIncrements.eventPriority > 0 && (
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      {quotaIncrements.eventPriority} Event Priority
                      {quotaIncrements.eventPriority > 1 ? ' slots' : ' slot'}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  ${totalQuotaPrice.toFixed(2)}
                </div>
                <Button
                  size="sm"
                  className="px-6 btn"
                  onClick={() => {
                    const items: CartItem[] = [];
                    if (quotaIncrements.replayPass > 0) {
                      items.push({
                        id: 'replayPass',
                        name: 'Replay Pass',
                        qty: quotaIncrements.replayPass,
                        unitPrice: quotaPrices.replayPass,
                      });
                    }
                    if (quotaIncrements.eventPriority > 0) {
                      items.push({
                        id: 'eventPriority',
                        name: 'Event Priority',
                        qty: quotaIncrements.eventPriority,
                        unitPrice: quotaPrices.eventPriority,
                      });
                    }
                    addItems(items);
                    navigate('/dashboard/checkout');
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default FeatureQuotaSection;
