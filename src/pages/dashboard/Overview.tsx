import MembershipStatusCard from '@/components/dashboard/MembershipStatusCard';
import CreditsWalletCard from '@/components/dashboard/CreditsWalletCard';
import { useNavigate } from 'react-router-dom';

export default function Overview() {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back!</p>
      </div>

      <MembershipStatusCard
        onManageClick={() => navigate('/dashboard/membership')}
        onViewOrdersClick={() => navigate('/dashboard/membership/orders')}
      />

      <CreditsWalletCard />
    </div>
  );
}
