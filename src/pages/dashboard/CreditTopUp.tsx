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
import { Badge } from '@/components/ui/badge';
import {
  Wallet,
  Zap,
  Plus,
  Minus,
  ArrowLeft,
  Info,
  ShoppingCart,
  Play,
  Star,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMyTotalAndRemainingCredits } from '@/hooks/useMembership';

export default function CreditTopUp() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();
  const { data: creditsData, isLoading: creditsLoading } =
    useMyTotalAndRemainingCredits();

  const totalRemainingCredits = creditsData?.value ?? 0;

  // State for wallet credit selection
  const [selectedCredits, setSelectedCredits] = useState(10);
  const creditPricePerUnit = 0.5; // $0.50 per credit
  const totalPrice = selectedCredits * creditPricePerUnit;

  // State for quota increments
  const [quotaIncrements, setQuotaIncrements] = useState({
    replayPass: 0,
    eventPriority: 0,
  });

  const quotaPrices = {
    replayPass: 2, // $2 per replay pass
    eventPriority: 1.5, // $1.50 per event priority
  };

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Membership', href: '/dashboard/membership' },
      { label: 'Top-up Credits' },
    ]);
  }, [setItems]);

  const handleQuotaIncrement = (
    type: keyof typeof quotaIncrements,
    increment: number
  ) => {
    setQuotaIncrements((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment),
    }));
  };

  const totalQuotaPrice =
    quotaIncrements.replayPass * quotaPrices.replayPass +
    quotaIncrements.eventPriority * quotaPrices.eventPriority;

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
                Credits Available
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                Add credits to your wallet for any feature. Perfect for ongoing
                usage.
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
                  <span className="font-medium">$0.50</span>
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
                  min="5"
                  max="200"
                  step="5"
                  value={selectedCredits}
                  onChange={(e) => setSelectedCredits(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5 credits</span>
                  <span>200 credits</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCredits(25)}
                  className="flex-1"
                >
                  25 Credits
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCredits(50)}
                  className="flex-1"
                >
                  50 Credits
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCredits(100)}
                  className="flex-1"
                >
                  100 Credits
                </Button>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full btn text-lg py-3" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add {selectedCredits} Credits - ${totalPrice.toFixed(2)}
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Feature Quota Increment */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold">Premium Features</h2>
          </div>

          <div className="space-y-4">
            {/* Replay Pass */}
            <Card
              className={`border-2 transition-all duration-200 ${
                quotaIncrements.replayPass > 0
                  ? 'border-green-300 bg-green-50/30 shadow-lg'
                  : 'border-dashed border-blue-200 hover:border-blue-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Play className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Replay Pass</h3>
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200 bg-blue-50"
                        >
                          QUOTA
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Unlock additional recordings from the library
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        $2.00 per pass
                      </span>
                      {quotaIncrements.replayPass > 0 && (
                        <span className="font-semibold text-blue-600">
                          Total: $
                          {(
                            quotaIncrements.replayPass * quotaPrices.replayPass
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {quotaIncrements.replayPass > 0 && (
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-md">
                        <CheckCircle className="h-4 w-4" />
                        You can replay recordings {
                          quotaIncrements.replayPass
                        }{' '}
                        time{quotaIncrements.replayPass > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuotaIncrement('replayPass', -1)}
                      disabled={quotaIncrements.replayPass === 0}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center min-w-15">
                      <span className="text-2xl font-bold">
                        {quotaIncrements.replayPass}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        passes
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuotaIncrement('replayPass', 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Priority */}
            <Card
              className={`border-2 transition-all duration-200 ${
                quotaIncrements.eventPriority > 0
                  ? 'border-green-300 bg-green-50/30 shadow-lg'
                  : 'border-dashed border-blue-200 hover:border-blue-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Event Priority
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200 bg-blue-50"
                        >
                          QUOTA
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Get priority access for upcoming events
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        $1.50 per slot
                      </span>
                      {quotaIncrements.eventPriority > 0 && (
                        <span className="font-semibold text-blue-600">
                          Total: $
                          {(
                            quotaIncrements.eventPriority *
                            quotaPrices.eventPriority
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {quotaIncrements.eventPriority > 0 && (
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-md">
                        <CheckCircle className="h-4 w-4" />
                        Priority access for {quotaIncrements.eventPriority}{' '}
                        event{quotaIncrements.eventPriority > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuotaIncrement('eventPriority', -1)}
                      disabled={quotaIncrements.eventPriority === 0}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center min-w-15">
                      <span className="text-2xl font-bold">
                        {quotaIncrements.eventPriority}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        slots
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuotaIncrement('eventPriority', 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quota Summary */}
          {(quotaIncrements.replayPass > 0 ||
            quotaIncrements.eventPriority > 0) && (
            <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg">Your Selection</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {quotaIncrements.replayPass > 0 && (
                        <div className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          {quotaIncrements.replayPass} Replay Pass
                          {quotaIncrements.replayPass > 1 ? 'es' : ''}
                        </div>
                      )}
                      {quotaIncrements.eventPriority > 0 && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          {quotaIncrements.eventPriority} Event Priority
                          {quotaIncrements.eventPriority > 1
                            ? ' slots'
                            : ' slot'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold text-blue-600">
                      ${totalQuotaPrice.toFixed(2)}
                    </div>
                    <Button size="sm" className="btn px-6">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
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
