import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { differenceInDays } from 'date-fns';
import { Crown, Users, BookOpen, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ActiveMembership } from '@/types/membership';

export function MembershipStatusCard(props: {
  status?: ActiveMembership[];
  credits?: {
    remainingCredits: number;
    totalCredits: number;
    onViewHistory?: () => void;
  };
  onManageClick?: () => void;
  onViewOrdersClick?: () => void;
}) {
  const status = props.status;

  // Find the membership with the highest displayOrder (same logic as MembershipOverview)
  const currentMembership =
    status && status.length > 0
      ? status.reduce((highest, current) =>
          (current.displayOrder ?? 0) > (highest.displayOrder ?? 0)
            ? current
            : highest
        )
      : null;

  const daysLeft = useMemo(() => {
    if (!currentMembership) return 0;
    try {
      return Math.max(
        0,
        differenceInDays(new Date(currentMembership.endDate), new Date())
      );
    } catch {
      return 0;
    }
  }, [currentMembership]);

  const Icon = useMemo(() => {
    if (!currentMembership) return Users;
    switch (currentMembership.tierCode) {
      case 'FREETIERMEMBERSHIP':
        return Users;
      case 'DEVELOPMENTMEDIUM':
        return BookOpen;
      case 'PROFESSIONALMEDIUM':
        return Crown;
      default:
        return Users;
    }
  }, [currentMembership]);

  const navigate = useNavigate();

  // If no membership data, don't render anything
  if (!currentMembership) {
    return null;
  }

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
                {currentMembership.tierName}
              </Badge>
            </CardTitle>
            <CardDescription className="mb-0">
              {currentMembership.basePrice ? (
                <>
                  ${currentMembership.basePrice}
                  {currentMembership.basePrice > 0 && <span>/month</span>}
                </>
              ) : (
                'Active Membership'
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`grid grid-cols-1 ${props.credits ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}
        >
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Billing Period
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(currentMembership.startDate + 'Z').toLocaleString()} –{' '}
                {new Date(currentMembership.endDate + 'Z').toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {daysLeft} days remaining
            </div>
          </div>

          {props.credits && (
            <div>
              <div className="text-sm text-muted-foreground mb-1">Credits</div>
              <div className="font-medium">
                <span className="mr-3">
                  Remaining credits: {props.credits.remainingCredits}
                </span>
                <span className="text-muted-foreground">
                  Total credits: {props.credits.totalCredits}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-2">
                <div
                  className="h-2 bg-emerald-500 rounded"
                  style={{
                    width: `${
                      props.credits.totalCredits > 0
                        ? Math.max(
                            0,
                            Math.min(
                              100,
                              Math.round(
                                (props.credits.remainingCredits /
                                  props.credits.totalCredits) *
                                  100
                              )
                            )
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => navigate('/dashboard/membership/topup')}
                  variant="outline"
                  size="sm"
                >
                  Top-up
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    props.credits?.onViewHistory?.();
                    navigate('/dashboard/credits-history');
                  }}
                >
                  View History
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 justify-between">
            <div className="text-sm">
              Auto-renew membership:{' '}
              <span
                className={
                  currentMembership.isAutoRenewEnabled
                    ? 'text-green-600 font-medium'
                    : 'text-red-600 font-medium'
                }
              >
                {currentMembership.isAutoRenewEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
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
