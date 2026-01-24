import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditsWalletCard from '@/components/dashboard/CreditsWalletCard';
import { useMyActiveMemberships } from '@/hooks/useMembership';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from '../../components/ui';
import { Crown, CalendarDays } from 'lucide-react';
import { differenceInDays } from 'date-fns';

export default function Membership() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();

  const { data: activeMemberships = [], isLoading } = useMyActiveMemberships();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership' },
    ]);
  }, [setItems]);

  // Find the membership with the highest displayOrder
  const currentMembership =
    activeMemberships.length > 0
      ? activeMemberships.reduce((highest, current) =>
          (current.displayOrder ?? 0) > (highest.displayOrder ?? 0)
            ? current
            : highest
        )
      : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Membership Overview</h1>
        <p className="text-muted-foreground">
          Review your current memberships, manage your plans and billing, track
          available credits, and view recent orders—all in one place.
        </p>
      </div>

      {/* Current Membership Status */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading membership...</span>
        </div>
      ) : currentMembership ? (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Membership
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary"
                  >
                    {currentMembership.tierName}
                  </Badge>
                </CardTitle>
                <CardDescription className="mb-0">
                  {currentMembership.basePrice ? (
                    <>
                      ${Math.round(currentMembership.basePrice ?? 0)}
                      {(currentMembership.basePrice ?? 0) > 0 && (
                        <span>/month</span>
                      )}
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
                    {new Date(
                      currentMembership.startDate + 'Z'
                    ).toLocaleString()}{' '}
                    –{' '}
                    {new Date(currentMembership.endDate + 'Z').toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.max(
                    0,
                    differenceInDays(
                      new Date(currentMembership.endDate),
                      new Date()
                    )
                  )}{' '}
                  days remaining
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Included Features
                </div>
                <ul className="text-sm space-y-1">
                  {currentMembership.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>
                        {typeof feature === 'string' ? feature : feature.name}
                      </span>
                    </li>
                  ))}
                  {currentMembership.features.length > 6 && (
                    <li className="text-xs text-muted-foreground italic">
                      +{currentMembership.features.length - 6} more features
                    </li>
                  )}
                </ul>
              </div>

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
                    {currentMembership.isAutoRenewEnabled
                      ? 'Enabled'
                      : 'Disabled'}
                  </span>
                </div>
                <div className="flex gap-2 md:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/dashboard/membership/orders')}
                  >
                    View Orders
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/dashboard/membership')}
                    className="btn"
                  >
                    Manage Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              No Active Membership
            </CardTitle>
            <CardDescription>
              You don't have an active membership yet. Explore our membership
              plans to unlock premium features and benefits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Button
                onClick={() => navigate('/dashboard/membership')}
                className="btn"
              >
                View Membership Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Credits Wallet */}
      <CreditsWalletCard />
    </div>
  );
}
