import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import {
  CheckCircle,
  Users,
  BookOpen,
  Crown,
  CreditCard,
  Wallet,
  XCircle,
} from 'lucide-react';
import {
  useSubscriptionTiers,
  usePlaceMembershipOrder,
  useOrderStatus,
} from '../../hooks/useMembership';
import { paypalWebhookMock } from '../../services/membership';
import { Button } from '../../components/ui';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { PaymentProcessor, PaymentStatus } from '@/constants/enums';

export default function MembershipUpgrade() {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const { setItems } = useBreadcrumb();
  // State for payment form
  const [discountCode, setDiscountCode] = useState('');
  const [autoRenew, setAutoRenew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentWaiting, setShowPaymentWaiting] = useState(false);
  // Removed unused paymentWindow and currentPubTrackId states
  const [paymentState, setPaymentState] = useState<
    'idle' | 'processing' | 'success' | 'failed'
  >('idle');
  const [pollTimer, setPollTimer] = useState<number | null>(null);
  // React Query hooks
  const {
    data: tiers = [],
    isLoading: tiersLoading,
    isError: tiersError,
  } = useSubscriptionTiers();
  const placeOrderMutation = usePlaceMembershipOrder();
  const orderStatusMutation = useOrderStatus();

  // Find selected tier based on plan parameter
  const selectedTier = tiers.find(
    (tier) => tier.tierCode.toLowerCase() === plan
  );

  // Get the icon component for rendering
  const renderTierIcon = (tierCode: string) => {
    switch (tierCode) {
      case 'GENERALMEMBERSHIP':
        return <Users className="h-8 w-8 text-primary" />;
      case 'DEVELOPMENTMEDIUM':
        return <BookOpen className="h-8 w-8 text-primary" />;
      case 'PROFESSIONALMEDIUM':
        return <Crown className="h-8 w-8 text-primary" />;
      case 'FREETIERMEMBERSHIP':
        return <Users className="h-8 w-8 text-primary" />;
      default:
        return <Users className="h-8 w-8 text-primary" />;
    }
  };

  useEffect(() => {
    if (!plan) {
      navigate('/dashboard/membership');
      return;
    }

    // If tiers are loaded but selected tier not found
    if (tiers.length > 0 && !selectedTier) {
      navigate('/dashboard/membership');
      return;
    }

    if (selectedTier) {
      const isFree = selectedTier.tierCode === 'FREETIERMEMBERSHIP';
      setItems([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Membership', href: '/dashboard/membership' },
        {
          label: isFree
            ? `Get Started with ${selectedTier.tierName}`
            : `Upgrade to ${selectedTier.tierName}`,
        },
      ]);
    }
  }, [plan, selectedTier, tiers, setItems, navigate]);

  if (!plan) {
    return null;
  }

  if (tiersLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (!selectedTier) {
    return null;
  }

  // const IconComponent = getTierIcon(selectedTier.tierCode);

  // const handleSubmit = async (formData: any) => {
  //   registerMediumMutation.mutate(formData, {
  //     onSuccess: () => {
  //     },
  //   });
  // };

  const handlePayment = async (processorId: number) => {
    if (!selectedTier) return;

    const payload = {
      membershipId: selectedTier.id,
      discountCode: discountCode || '', // Send empty string if no discount
      autoRenewMyMembership: autoRenew,
      processorId,
    };

    console.log('Sending payment payload:', payload);

    placeOrderMutation.mutate(payload, {
      onSuccess: (response) => {
        console.log('Payment API response:', response);

        if (response.result && response.redirectUrl) {
          // For localhost, simulate payment completion by calling mock webhook
          if (window.location.hostname === 'localhost') {
            try {
              const url = new URL(response.redirectUrl);
              const token = url.searchParams.get('token');
              if (token) {
                console.log('Calling PayPalWebhookMock with token:', token);
                paypalWebhookMock(token).catch((err) =>
                  console.error('Mock webhook failed:', err)
                );
              } else {
                console.warn('No token found in redirectUrl for mock webhook');
              }
            } catch (err) {
              console.error('Failed to parse redirectUrl for token:', err);
            }
          }

          // Open payment in new tab
          window.open(response.redirectUrl, '_blank');
          setShowPaymentWaiting(true);
          setPaymentState('processing');
          // Start polling order status every 3s
          if (!pollTimer) {
            const id = window.setInterval(() => {
              if (!response.pubTrackId) return;
              orderStatusMutation.mutate(response.pubTrackId, {
                onSuccess: (res) => {
                  const statusNum = res.paymentStatus; // backend numeric status
                  if (res.isPaid && statusNum === PaymentStatus.Completed) {
                    setPaymentState('success');
                    setShowPaymentWaiting(false);
                    if (id) {
                      clearInterval(id);
                    }
                    setPollTimer(null);
                  } else if (
                    statusNum === PaymentStatus.Failed ||
                    statusNum === PaymentStatus.Cancelled
                  ) {
                    setPaymentState('failed');
                    setShowPaymentWaiting(false);
                    if (id) {
                      clearInterval(id);
                    }
                    setPollTimer(null);
                  } else {
                    setPaymentState('processing');
                  }
                },
                onError: () => {
                  setPaymentState('failed');
                  setShowPaymentWaiting(false);
                  if (id) {
                    clearInterval(id);
                  }
                  setPollTimer(null);
                },
              });
            }, 3000);
            setPollTimer(id);
          }
        } else {
          console.error('Payment initiation failed:', response);
          setError(response.message || 'Failed to initiate payment');
        }
      },
      onError: (err) => {
        console.error('Payment error:', err);
        setError(err instanceof Error ? err.message : 'Payment failed');
      },
    });
  };

  if (tiersLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Membership Upgrade</h1>
            <p className="text-muted-foreground">Loading membership plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (tiersError) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Membership Upgrade</h1>
            <p className="text-muted-foreground">
              Failed to load membership plans. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/membership')}
          className="w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Membership
        </Button> */}
        <div>
          <h1 className="text-3xl font-bold">
            {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
              ? `Get Started with ${selectedTier.tierName}`
              : `Upgrade to ${selectedTier.tierName}`}
          </h1>
          <p className="text-muted-foreground">
            {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
              ? 'Complete your profile to start your spiritual journey'
              : 'Complete your application for admin approval'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Payment Section */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>
              Choose your preferred payment method to proceed with your
              membership upgrade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="p-4 bg-background rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedTier.tierName}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
                        ? 'Free'
                        : `$${Math.round(selectedTier.basePrice)}/month`}
                    </p>
                  </div>
                  {renderTierIcon(selectedTier.tierCode)}
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="discountCode">Discount Code (Optional)</Label>
                  <Input
                    id="discountCode"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-primary-foreground"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoRenew"
                    checked={autoRenew}
                    onCheckedChange={(checked: boolean | 'indeterminate') =>
                      setAutoRenew(checked === true)
                    }
                  />
                  <Label htmlFor="autoRenew" className="text-sm">
                    Auto-renew my membership
                  </Label>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:flex-1 bg-[#0070ba] hover:bg-[#0070ba]/90 text-white"
                  size="lg"
                  onClick={() => handlePayment(PaymentProcessor.PayPal)}
                  disabled={placeOrderMutation.isPending || showPaymentWaiting}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  {placeOrderMutation.isPending
                    ? 'Processing...'
                    : 'Pay with PayPal'}
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:flex-1 border-[#635bff] text-[#635bff] hover:bg-[#635bff] hover:text-white"
                  size="lg"
                  onClick={() => handlePayment(PaymentProcessor.Stripe)}
                  disabled={placeOrderMutation.isPending || showPaymentWaiting}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {placeOrderMutation.isPending
                    ? 'Processing...'
                    : 'Pay with Stripe'}
                </Button>
              </div>

              {/* Payment Status */}
              {showPaymentWaiting && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <div>
                      <p className="font-medium text-blue-900">
                        Payment Processing
                      </p>
                      <p className="text-sm text-blue-700">
                        We are checking your payment status. Please wait...
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowPaymentWaiting(false);
                        if (pollTimer) {
                          clearInterval(pollTimer);
                          setPollTimer(null);
                        }
                        // no-op
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {paymentState === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">
                        Payment completed successfully!
                      </p>
                      <p className="text-sm text-green-700">
                        Your membership upgrade is now active.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="btn"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/dashboard/membership')}
                    >
                      Back to Membership
                    </Button>
                  </div>
                </div>
              )}

              {paymentState === 'failed' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">
                        Payment failed or cancelled.
                      </p>
                      <p className="text-sm text-red-700">
                        Please try again or contact support.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Note */}
              <div className="text-center text-sm text-muted-foreground">
                <p>🔒 Secure payment powered by PayPal & Stripe</p>
                <p>No hidden fees • Instant access after payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Plan Details */}
        <div className="space-y-6">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {renderTierIcon(selectedTier.tierCode)}
                </div>
                <div>
                  <CardTitle>{selectedTier.tierName}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    ${Math.round(selectedTier.basePrice)}/month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {selectedTier.features
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((feature) => (
                        <li
                          key={feature.id}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-sm">{feature.name}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>
                        {selectedTier.tierCode === 'FREETIERMEMBERSHIP'
                          ? 'Getting Started:'
                          : 'Application Process:'}
                      </strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {selectedTier.tierCode === 'FREETIERMEMBERSHIP' ? (
                        <>
                          <li>Complete your profile information</li>
                          <li>Your profile will be created immediately</li>
                          <li>Start exploring our community and resources</li>
                          <li>Access all free tier features right away</li>
                        </>
                      ) : (
                        <>
                          <li>
                            Submit your application with all required
                            information
                          </li>
                          <li>
                            Admin team will review your application (2-3
                            business days)
                          </li>
                          <li>
                            Once approved, you'll receive access to your new
                            plan
                          </li>
                          <li>Payment will be processed upon approval</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
