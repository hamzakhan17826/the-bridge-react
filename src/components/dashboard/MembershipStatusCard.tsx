import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { differenceInDays } from 'date-fns';
import { Crown, Users, BookOpen, CalendarDays } from 'lucide-react';
import type { ActiveMembership } from '@/types/membership';

export function MembershipStatusCard(props: {
  status?: ActiveMembership;
  onManageClick?: () => void;
  onViewOrdersClick?: () => void;
  onToggleAutoRenew?: (enabled: boolean) => void;
}) {
  const status = props.status;

  // If no membership data, don't render anything
  if (!status) {
    return null;
  }

  // Map features to strings for display
  const featuresList = useMemo(() => {
    return status.features.map((feature) =>
      typeof feature === 'string' ? feature : feature.name
    );
  }, [status.features]);

  const [autoRenew, setAutoRenew] = useState<boolean>(
    status.isAutoRenewEnabled
  );

  const daysLeft = useMemo(() => {
    try {
      return Math.max(
        0,
        differenceInDays(new Date(status.endDate), new Date())
      );
    } catch {
      return 0;
    }
  }, [status.endDate]);

  const Icon = useMemo(() => {
    switch (status.tierCode) {
      case 'FREETIERMEMBERSHIP':
        return Users;
      case 'DEVELOPMENTMEDIUM':
        return BookOpen;
      case 'PROFESSIONALMEDIUM':
        return Crown;
      default:
        return Users;
    }
  }, [status.tierCode]);

  const handleToggle = (checked: boolean | 'indeterminate') => {
    const next = checked === true;
    setAutoRenew(next);
    props.onToggleAutoRenew?.(next);
  };

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              Current Membership
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {status.tierName}
              </Badge>
            </CardTitle>
            <CardDescription className="mb-0">
              {status.basePrice ? (
                <>
                  ${status.basePrice}
                  {status.basePrice > 0 && <span>/month</span>}
                </>
              ) : (
                'Active Membership'
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Billing Period
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(status.startDate + 'Z').toLocaleString()} –{' '}
                {new Date(status.endDate + 'Z').toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {daysLeft} days remaining
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Included Features
            </div>
            <ul className="text-sm space-y-1">
              {featuresList.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
              {featuresList.length > 4 && (
                <li className="text-xs text-muted-foreground italic">
                  +{featuresList.length - 4} more
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-3 justify-between">
            <label
              htmlFor="autoRenew"
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox
                id="autoRenew"
                checked={autoRenew}
                onCheckedChange={handleToggle}
              />
              Auto-renew membership
            </label>
            <div className="flex gap-2 md:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={props.onViewOrdersClick}
              >
                View Orders
              </Button>
              <Button size="sm" onClick={props.onManageClick} className="btn">
                Manage Plan
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MembershipStatusCard;
