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
import {
  Crown,
  Users,
  BookOpen,
  CalendarDays,
  CheckCircle,
  Clock,
} from 'lucide-react';
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

  // Helper function to get tier icon
  const getTierIcon = (tierCode: string) => {
    switch (tierCode) {
      case 'FREETIERMEMBERSHIP':
        return Users;
      case 'GENERALMEMBERSHIP':
        return Users;
      case 'DEVELOPMENTMEDIUM':
        return BookOpen;
      case 'PROFESSIONALMEDIUM':
        return Crown;
      default:
        return Users;
    }
  };

  // Combine all features from all memberships
  const allFeatures = activeMemberships.flatMap((membership) =>
    membership.features.map((feature) =>
      typeof feature === 'string' ? feature : feature.name
    )
  );

  // Remove duplicates and sort
  const uniqueFeatures = [...new Set(allFeatures)].sort();

  // Find the earliest expiry date
  const earliestExpiry =
    activeMemberships.length > 0
      ? activeMemberships.reduce((earliest, current) => {
          const currentEnd = new Date(current.endDate);
          const earliestEnd = new Date(earliest.endDate);
          return currentEnd < earliestEnd ? current : earliest;
        })
      : null;

  const daysLeft = earliestExpiry
    ? Math.max(
        0,
        differenceInDays(new Date(earliestExpiry.endDate), new Date())
      )
    : 0;

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
          <span className="ml-2">Loading memberships...</span>
        </div>
      ) : activeMemberships.length > 0 ? (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Your Active Memberships
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary"
                  >
                    {activeMemberships.length} Plan
                    {activeMemberships.length > 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
                <CardDescription className="mb-0">
                  You have access to premium features across multiple membership
                  tiers
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Individual Membership Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeMemberships.map((membership) => {
                  const IconComponent = getTierIcon(membership.tierCode);
                  const membershipDaysLeft = Math.max(
                    0,
                    differenceInDays(new Date(membership.endDate), new Date())
                  );

                  return (
                    <Card
                      key={membership.id}
                      className="border border-gray-200"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <CardTitle className="text-sm">
                            {membership.tierName}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          ${membership.basePrice ?? 0}
                          {(membership.basePrice ?? 0) > 0 ? '/month' : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <CalendarDays className="h-3 w-3" />
                            <span>
                              Expires:{' '}
                              {new Date(
                                membership.endDate + 'Z'
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{membershipDaysLeft} days left</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                membership.isAutoRenewEnabled
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            ></span>
                            <span className="text-xs">
                              Auto-renew:{' '}
                              {membership.isAutoRenewEnabled ? 'On' : 'Off'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Combined Features Section */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      All Available Features ({uniqueFeatures.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {uniqueFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-green-500 mt-1">•</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      Membership Timeline
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Next expiry:
                        </span>
                        <span className="font-medium ml-2">
                          {earliestExpiry
                            ? new Date(
                                earliestExpiry.endDate + 'Z'
                              ).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Days remaining:
                        </span>
                        <span
                          className={`font-medium ml-2 ${
                            daysLeft < 30
                              ? 'text-red-600'
                              : daysLeft < 90
                                ? 'text-orange-600'
                                : 'text-green-600'
                          }`}
                        >
                          {daysLeft} days
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate('/dashboard/membership/orders')
                          }
                        >
                          View Orders
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => navigate('/dashboard/membership')}
                          className="btn"
                        >
                          Manage Plans
                        </Button>
                      </div>
                    </div>
                  </div>
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
