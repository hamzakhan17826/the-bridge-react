import { useEffect, useState } from 'react';
import { useBreadcrumb } from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Wallet,
  Zap,
  ArrowLeft,
  Info,
  ShoppingCart,
  Star,
  Play,
  X,
} from 'lucide-react';
import FeatureQuotaSection from '@/components/dashboard/credits/FeatureQuotaSection';
import { useNavigate } from 'react-router-dom';
import { useMyTotalAndRemainingCredits } from '@/hooks/useMembership';

const CREDIT_TOPUP_SELECTIONS_KEY = 'credit-topup-selections';
const SELECTIONS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type QuotaIncrementsState = {
  replayPass: number;
  eventPriority: number;
};

function loadInitialSelections(): {
  selectedCredits: number;
  quotaIncrements: QuotaIncrementsState;
  isCreditsInSummary: boolean;
} {
  const fallback = {
    selectedCredits: 500,
    quotaIncrements: { replayPass: 0, eventPriority: 0 },
    isCreditsInSummary: false,
  };

  try {
    const raw = localStorage.getItem(CREDIT_TOPUP_SELECTIONS_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as {
      ts?: number;
      selectedCredits?: number;
      quotaIncrements?: Partial<QuotaIncrementsState>;
      isCreditsInSummary?: boolean;
    };

    if (!parsed.ts || Date.now() - parsed.ts > SELECTIONS_TTL_MS) {
      localStorage.removeItem(CREDIT_TOPUP_SELECTIONS_KEY);
      return fallback;
    }

    const safeCredits = Math.min(
      5000,
      Math.max(500, Math.floor(parsed.selectedCredits ?? 500))
    );

    const replayPass = Math.max(
      0,
      Math.floor(parsed.quotaIncrements?.replayPass ?? 0)
    );
    const eventPriority = Math.max(
      0,
      Math.floor(parsed.quotaIncrements?.eventPriority ?? 0)
    );

    return {
      selectedCredits: safeCredits,
      quotaIncrements: { replayPass, eventPriority },
      isCreditsInSummary: Boolean(parsed.isCreditsInSummary),
    };
  } catch {
    return fallback;
  }
}

export default function CreditTopUp() {
  const [initialSelections] = useState(() => loadInitialSelections());

  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();
  const { data: creditsData, isLoading: creditsLoading } =
    useMyTotalAndRemainingCredits();

  const totalRemainingCredits = creditsData?.value ?? 0;

  // State for wallet credit selection
  const [selectedCredits, setSelectedCredits] = useState(
    initialSelections.selectedCredits
  );
  const [isCreditsInSummary, setIsCreditsInSummary] = useState(
    initialSelections.isCreditsInSummary
  );
  const creditPricePerUnit = 0.01; // $0.01 per credit
  const totalPrice = selectedCredits * creditPricePerUnit;

  // State for quota increments
  const [quotaIncrements, setQuotaIncrements] = useState<QuotaIncrementsState>(
    initialSelections.quotaIncrements
  );

  const quotaPrices = {
    replayPass: 2, // $2 per replay pass
    eventPriority: 1.5, // $1.50 per event priority
  };

  const summaryItems = [
    ...(isCreditsInSummary
      ? [
          {
            id: 'credits',
            name: 'Wallet Credits',
            qty: selectedCredits,
            unitPrice: creditPricePerUnit,
          },
        ]
      : []),
    ...(quotaIncrements.replayPass > 0
      ? [
          {
            id: 'replayPass',
            name: 'Replay Pass',
            qty: quotaIncrements.replayPass,
            unitPrice: quotaPrices.replayPass,
          },
        ]
      : []),
    ...(quotaIncrements.eventPriority > 0
      ? [
          {
            id: 'eventPriority',
            name: 'Event Priority',
            qty: quotaIncrements.eventPriority,
            unitPrice: quotaPrices.eventPriority,
          },
        ]
      : []),
  ];

  const summaryTotal = summaryItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: 'Top-up Credits' },
    ]);
  }, [setItems]);

  useEffect(() => {
    localStorage.setItem(
      CREDIT_TOPUP_SELECTIONS_KEY,
      JSON.stringify({
        ts: Date.now(),
        selectedCredits,
        quotaIncrements,
        isCreditsInSummary,
      })
    );
  }, [selectedCredits, quotaIncrements, isCreditsInSummary]);

  const handleQuotaIncrement = (
    type: keyof typeof quotaIncrements,
    increment: number
  ) => {
    setQuotaIncrements((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment),
    }));
  };

  const handleRemoveSummaryItem = (itemId: string) => {
    if (itemId === 'credits') {
      setIsCreditsInSummary(false);
      setSelectedCredits(500);
      return;
    }

    if (itemId !== 'replayPass' && itemId !== 'eventPriority') {
      return;
    }

    setQuotaIncrements((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  const handleCreditsSliderChange = (value: number) => {
    setSelectedCredits(value);
    setIsCreditsInSummary(true);
  };

  if (creditsLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2 text-muted-foreground hover:text-primary p-0 h-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Membership
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add Credits</h1>
          <p className="text-muted-foreground text-lg">
            Boost your account with credits or unlock premium features
          </p>
        </div>

        <Card className="bg-linear-to-r from-primary/10 to-primary/5 border-primary/20 shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/15 rounded-full">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Current Balance
              </div>
              <div className="text-2xl font-bold text-primary">
                {totalRemainingCredits}
              </div>
              <div className="text-xs text-muted-foreground">
                Remaining credits
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Credits and Features */}
        <div className="space-y-8">
          {/* Wallet Credit Top-up */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold">Wallet Credits</h2>
            </div>

            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  Flexible Credit Pack
                </CardTitle>
                <CardDescription className="text-base">
                  Add credits to your wallet for any feature. Perfect for
                  ongoing usage.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Credits to Add:</span>
                    <span className="text-2xl font-bold text-primary">
                      {selectedCredits}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Price per credit:</span>
                    <span className="font-medium">$0.01</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="5"
                    value={selectedCredits}
                    onChange={(e) =>
                      handleCreditsSliderChange(Number(e.target.value))
                    }
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>500 credits</span>
                    <span>5000 credits</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Feature Quota Increment */}
          <FeatureQuotaSection
            quotaIncrements={quotaIncrements}
            quotaPrices={quotaPrices}
            handleQuotaIncrement={handleQuotaIncrement}
          />
        </div>

        {/* Right Column: Summary */}
        <div className="space-y-6 lg:sticky lg:top-6 self-start h-fit">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Order Summary</h2>
          </div>

          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Your Cart</CardTitle>
              <CardDescription>Review your selected items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summaryItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No items selected
                </p>
              ) : (
                summaryItems.map((item) => {
                  const Icon =
                    item.id === 'credits'
                      ? Wallet
                      : item.id === 'replayPass'
                        ? Play
                        : Star;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.qty} x ${item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          ${(item.qty * item.unitPrice).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveSummaryItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
              {summaryItems.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ${summaryTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            {summaryItems.length > 0 && (
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                  onClick={() =>
                    alert('Purchase functionality will be implemented here')
                  }
                >
                  Complete Purchase
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      {/* Info Section */}
      <Card className="bg-linear-to-r from-slate-50 to-gray-50 border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-slate-500" />
            How Credits & Quotas Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Zap className="h-4 w-4 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Wallet Credits</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                General purpose credits that can be used for any feature with a
                credit cost. They never expire and provide maximum flexibility.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Feature Quotas</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specific allowances for premium features. When you use a
                feature, the system checks for available quota first before
                using wallet credits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
