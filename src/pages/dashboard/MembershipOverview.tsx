import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MembershipStatusCard from '@/components/dashboard/MembershipStatusCard';
import {
  useMyActiveMemberships,
  useMyTotalAndRemainingCredits,
} from '@/hooks/useMembership';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui';

export default function Membership() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();

  const { data: activeMemberships = [], isLoading } = useMyActiveMemberships();

  const { data: creditsData } = useMyTotalAndRemainingCredits();
  const totalCredits = creditsData?.key ?? 0;
  const totalRemainingCredits = creditsData?.value ?? 0;

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership' },
    ]);
  }, [setItems]);

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
      ) : activeMemberships && activeMemberships.length > 0 ? (
        <MembershipStatusCard
          status={activeMemberships}
          credits={{
            remainingCredits: totalRemainingCredits,
            totalCredits: totalCredits,
            onViewHistory: () => console.log('View history clicked'),
          }}
          onManageClick={() => navigate('/dashboard/membership')}
          onViewOrdersClick={() => navigate('/dashboard/membership/orders')}
        />
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
    </div>
  );
}
