import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, Crown, User, CheckCircle } from 'lucide-react';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useSubscriptionTiers,
  useMyActiveMemberships,
} from '../../hooks/useMembership';

export default function Membership() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();

  // React Query hook for data fetching
  const {
    data: tiers = [],
    isLoading: tiersLoading,
    error: tiersError,
  } = useSubscriptionTiers();
  const { data: activeMemberships = [] } = useMyActiveMemberships();

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership' },
    ]);
  }, [setItems]);

  const handleUpgrade = (tierCode: string) => {
    // Navigate to upgrade page with tier code
    navigate(`/dashboard/membership/upgrade/${tierCode.toLowerCase()}`);
  };

  // Define inclusion rules: which higher tiers include which lower tiers
  const INCLUDES: Record<string, string[]> = {
    PROFESSIONALMEDIUM: [
      'PROFESSIONALMEDIUM',
      'DEVELOPMENTMEDIUM',
      'GENERALMEMBERSHIP',
      'FREETIERMEMBERSHIP',
    ],
    DEVELOPMENTMEDIUM: [
      'DEVELOPMENTMEDIUM',
      'GENERALMEMBERSHIP',
      'FREETIERMEMBERSHIP',
    ],
    GENERALMEMBERSHIP: ['GENERALMEMBERSHIP', 'FREETIERMEMBERSHIP'],
    FREETIERMEMBERSHIP: ['FREETIERMEMBERSHIP'],
  };

  // Helper function to get tier icon
  const getTierIcon = (tierCode: string) => {
    switch (tierCode) {
      case 'FREETIERMEMBERSHIP':
        return User;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Membership Plans</h1>
        <p className="text-muted-foreground">
          Choose the perfect membership plan for your spiritual journey. All
          plans include access to our community and basic features.
        </p>
      </div>

      {/* Plans Listing */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Membership Plans
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary"
                >
                  Choose Your Plan
                </Badge>
              </CardTitle>
              <CardDescription className="mb-0">
                Select a membership plan that best fits your spiritual journey
                and unlock premium features.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Plan Selection - Dynamic from API */}
            {tiersLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading membership plans...</p>
              </div>
            ) : tiersError ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                  <Crown className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">Failed to load plans</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Unable to load membership plans. Please try again later.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tiers
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((tier) => {
                    const IconComponent = getTierIcon(tier.tierCode);
                    const isPopular = tier.tierCode === 'DEVELOPMENTMEDIUM';
                    const isFree = tier.tierCode === 'FREETIERMEMBERSHIP';

                    // Determine membership status relative to user's active memberships
                    const hasExact = activeMemberships.some(
                      (membership) => membership.tierCode === tier.tierCode
                    );
                    const isIncluded =
                      !hasExact &&
                      activeMemberships.some((membership) =>
                        (INCLUDES[membership.tierCode] || []).includes(
                          tier.tierCode
                        )
                      );

                    return (
                      <div
                        key={tier.id}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg transition-all duration-200 hover:shadow-md ${
                          isPopular
                            ? 'border border-primary/20'
                            : isFree
                              ? 'border-emerald-200 bg-emerald-50/50'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="md:col-span-3 flex items-center gap-3">
                          <IconComponent
                            className={`h-6 w-6 ${
                              isFree
                                ? 'text-emerald-600'
                                : 'text-muted-foreground'
                            }`}
                          />
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {tier.tierName}
                              {isPopular && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-primary text-primary-foreground"
                                >
                                  Most Popular
                                </Badge>
                              )}
                              {isFree && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-emerald-300 text-emerald-700"
                                >
                                  Free
                                </Badge>
                              )}
                            </div>
                            <div className="text-2xl font-bold">
                              ${Math.round(tier.basePrice ?? 0)}
                              <span className="text-sm font-normal text-muted-foreground">
                                {(tier.basePrice ?? 0) === 0 ? '' : '/month'}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tier.tierCode === 'GENERALMEMBERSHIP'
                                ? 'Starter Plan'
                                : tier.tierCode === 'DEVELOPMENTMEDIUM'
                                  ? 'Growth Plan'
                                  : tier.tierCode === 'PROFESSIONALMEDIUM'
                                    ? 'Professional Plan'
                                    : 'Free Plan'}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-7 mt-4 md:mt-0">
                          <div className="font-medium mb-2 text-sm">
                            Features:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-muted-foreground">
                            {tier.features.slice(0, 6).map((feature) => (
                              <div
                                key={feature.id}
                                className="flex items-start gap-1"
                              >
                                <span className="text-green-500 mt-1">•</span>
                                <span>{feature.name}</span>
                              </div>
                            ))}
                            {tier.features.length > 6 && (
                              <div className="text-xs text-muted-foreground italic">
                                +{tier.features.length - 6} more features
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-2 flex justify-start md:justify-end mt-4 md:mt-0">
                          {(() => {
                            if (hasExact) {
                              return (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white cursor-not-allowed opacity-80"
                                  disabled
                                >
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Already Purchased
                                  </div>
                                </Button>
                              );
                            }

                            if (isIncluded) {
                              // find which active tier includes this feature
                              const provider = activeMemberships.find(
                                (membership) =>
                                  (
                                    INCLUDES[membership.tierCode] || []
                                  ).includes(tier.tierCode)
                              );
                              return (
                                <div className="w-full md:w-auto">
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="w-full md:w-auto bg-emerald-50 text-emerald-700 border-emerald-200 cursor-not-allowed"
                                    disabled
                                    title={`Included via ${provider?.tierName || 'your plan'}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                                      Included in your plan
                                    </div>
                                  </Button>
                                  <div className="mt-2 text-xs text-muted-foreground text-right">
                                    Included via{' '}
                                    <span className="font-medium">
                                      {provider?.tierName}
                                    </span>
                                  </div>
                                </div>
                              );
                            }

                            // Not included — render normal CTA
                            return (
                              <Button
                                size="sm"
                                variant={
                                  isPopular
                                    ? 'default'
                                    : isFree
                                      ? 'outline'
                                      : 'outline'
                                }
                                className={`w-full md:w-auto ${
                                  isPopular
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : isFree
                                      ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                                      : ''
                                }`}
                                onClick={() => handleUpgrade(tier.tierCode)}
                              >
                                {isFree ? 'Get Started' : 'Upgrade'}
                              </Button>
                            );
                          })()}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
