import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Wallet, Clock } from 'lucide-react';
import CreditsHistoryDrawer, { type UsageEntry } from './CreditsHistoryDrawer';

type CreditItem = {
  featureName: string;
  totalCredits: number;
  remainingCredits: number;
  startDate: string; // ISO
  endDate: string; // ISO
  isAutoRenewEnabled: boolean;
};

export function CreditsWalletCard(props: {
  items?: CreditItem[];
  onTopUp?: (featureName: string) => void;
  onToggleAutoRenew?: (featureName: string, enabled: boolean) => void;
}) {
  const dummy = useMemo<CreditItem[]>(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return [
      {
        featureName: 'Event Access Credits',
        totalCredits: 10,
        remainingCredits: 6,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        isAutoRenewEnabled: true,
      },
      {
        featureName: 'Replay Library Pass',
        totalCredits: 5,
        remainingCredits: 2,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        isAutoRenewEnabled: false,
      },
      {
        featureName: '1:1 Session Credits',
        totalCredits: 3,
        remainingCredits: 1,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        isAutoRenewEnabled: false,
      },
    ];
  }, []);

  const [localItems, setLocalItems] = useState<CreditItem[]>(
    props.items ?? dummy
  );

  const [openFeature, setOpenFeature] = useState<string | null>(null);

  const getDummyHistory = (name: string): UsageEntry[] => {
    const now = new Date();
    const day = (d: number) =>
      new Date(now.getFullYear(), now.getMonth(), d).toISOString();
    // Simple varied dummy entries per feature
    if (name.toLowerCase().includes('event')) {
      return [
        { date: day(3), change: -1, note: 'Joined Community Event #102' },
        { date: day(7), change: -2, note: 'Accessed VIP Webinar Replay' },
        { date: day(12), change: +3, note: 'Top-up applied (promo bundle)' },
      ];
    }
    if (name.toLowerCase().includes('replay')) {
      return [
        {
          date: day(5),
          change: -1,
          note: 'Watched “Clairvoyance Basics” replay',
        },
        {
          date: day(9),
          change: -1,
          note: 'Watched “Spirit Guides Q&A” replay',
        },
        { date: day(14), change: +2, note: 'Monthly refresh credit pack' },
      ];
    }
    return [
      { date: day(2), change: -1, note: 'Booked 1:1 with Medium A' },
      {
        date: day(10),
        change: -1,
        note: 'Rescheduled session (credit retained)',
      },
      { date: day(15), change: +1, note: 'Top-up applied' },
    ];
  };

  const handleToggle = (name: string, checked: boolean | 'indeterminate') => {
    const enabled = checked === true;
    setLocalItems((prev) =>
      prev.map((it) =>
        it.featureName === name ? { ...it, isAutoRenewEnabled: enabled } : it
      )
    );
    props.onToggleAutoRenew?.(name, enabled);
  };

  const handleTopUp = (name: string) => {
    props.onTopUp?.(name);
  };

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Credits Wallet</CardTitle>
            <CardDescription className="mb-0">
              Track remaining credits and validity for membership features.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {localItems.map((item) => {
            const percent = Math.max(
              0,
              Math.min(
                100,
                Math.round((item.remainingCredits / item.totalCredits) * 100)
              )
            );
            return (
              <div
                key={item.featureName}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border hover:border-gray-300 transition"
              >
                <div className="md:col-span-4">
                  <div className="font-semibold">{item.featureName}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(new Date(item.startDate), 'MMM dd')}–
                      {format(new Date(item.endDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="text-sm">Credits</div>
                  <div className="font-medium">
                    {item.remainingCredits}/{item.totalCredits} remaining
                  </div>
                  <div className="h-2 bg-muted rounded mt-2">
                    <div
                      className="h-2 bg-emerald-500 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-2 md:items-end">
                  <label
                    htmlFor={`autorenew-${item.featureName}`}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Checkbox
                      id={`autorenew-${item.featureName}`}
                      checked={item.isAutoRenewEnabled}
                      onCheckedChange={(c) => handleToggle(item.featureName, c)}
                    />
                    Auto-renew
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTopUp(item.featureName)}
                    >
                      Top-up
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenFeature(item.featureName)}
                    >
                      View History
                    </Button>
                  </div>
                </div>
                <CreditsHistoryDrawer
                  open={openFeature === item.featureName}
                  onOpenChange={(o) =>
                    setOpenFeature(o ? item.featureName : null)
                  }
                  featureName={item.featureName}
                  entries={getDummyHistory(item.featureName)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default CreditsWalletCard;
