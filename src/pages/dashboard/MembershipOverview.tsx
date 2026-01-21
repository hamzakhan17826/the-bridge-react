import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MembershipStatusCard from '@/components/dashboard/MembershipStatusCard';
import CreditsWalletCard from '@/components/dashboard/CreditsWalletCard';
import { useMyActiveMemberships } from '@/hooks/useMembership';

export default function Membership() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();

  const { data: activeMemberships, isLoading } = useMyActiveMemberships();
  const currentMembership = activeMemberships?.[0]; // Take first active membership

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
          Review your current membership, manage your plan and billing, track
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
        <MembershipStatusCard
          status={currentMembership}
          onManageClick={() => navigate('/dashboard/membership')}
          onViewOrdersClick={() => navigate('/dashboard/membership/orders')}
        />
      ) : null}

      {/* Credits Wallet (duplicate visibility here for convenience) */}
      <CreditsWalletCard />
    </div>
  );
}
