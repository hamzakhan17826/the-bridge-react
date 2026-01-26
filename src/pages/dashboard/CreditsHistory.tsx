import { useBreadcrumb } from '@/components/ui/breadcrumb';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, ArrowLeft, Filter } from 'lucide-react';
import { format } from 'date-fns';

type UsageEntry = {
  date: string; // ISO
  change: number; // negative for usage, positive for top-up
  note: string;
  featureName: string;
};

const FEATURES = [
  'Event Access Credits',
  'Replay Library Pass',
  '1:1 Session Credits',
] as const;

function getDummyHistory(name: string): UsageEntry[] {
  const now = new Date();
  const day = (d: number) =>
    new Date(now.getFullYear(), now.getMonth(), d).toISOString();
  if (name.toLowerCase().includes('event')) {
    return [
      {
        date: day(3),
        change: -1,
        note: 'Joined Community Event #102',
        featureName: name,
      },
      {
        date: day(7),
        change: -2,
        note: 'Accessed VIP Webinar Replay',
        featureName: name,
      },
      {
        date: day(12),
        change: +3,
        note: 'Top-up applied (promo bundle)',
        featureName: name,
      },
    ];
  }
  if (name.toLowerCase().includes('replay')) {
    return [
      {
        date: day(5),
        change: -1,
        note: 'Watched “Clairvoyance Basics” replay',
        featureName: name,
      },
      {
        date: day(9),
        change: -1,
        note: 'Watched “Spirit Guides Q&A” replay',
        featureName: name,
      },
      {
        date: day(14),
        change: +2,
        note: 'Monthly refresh credit pack',
        featureName: name,
      },
    ];
  }
  return [
    {
      date: day(2),
      change: -1,
      note: 'Booked 1:1 with Medium A',
      featureName: name,
    },
    {
      date: day(10),
      change: -1,
      note: 'Rescheduled session (credit retained)',
      featureName: name,
    },
    { date: day(15), change: +1, note: 'Top-up applied', featureName: name },
  ];
}

export default function CreditsHistory() {
  const { setItems } = useBreadcrumb();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    setItems([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Credits History' },
    ]);
  }, [setItems]);

  const allEntries = useMemo(() => {
    const entries = FEATURES.flatMap((f) => getDummyHistory(f));
    // Sort by date desc
    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return allEntries;
    return allEntries.filter((e) => e.featureName === filter);
  }, [allEntries, filter]);

  const totals = useMemo(() => {
    const used = allEntries
      .filter((e) => e.change < 0)
      .reduce((sum, e) => sum + Math.abs(e.change), 0);
    const topped = allEntries
      .filter((e) => e.change > 0)
      .reduce((sum, e) => sum + e.change, 0);
    return { used, topped };
  }, [allEntries]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <History className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Credits History</h1>
            <p className="text-muted-foreground">
              Review all credit usage and top-ups across features.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>
      </div>

      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Summary</CardTitle>
              <CardDescription className="mb-0">
                Totals across all features
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                aria-label="Filter by feature"
                className="border rounded px-2 py-1 text-sm bg-background"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                {FEATURES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Used: {totals.used}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700"
            >
              Top-ups: {totals.topped}
            </Badge>
            <Badge variant="outline">Entries: {filtered.length}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((e, idx) => {
          const isUsage = e.change < 0;
          const changeText = `${e.change > 0 ? '+' : ''}${e.change}`;
          return (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-lg border hover:border-gray-300 transition"
            >
              <div className="md:col-span-4">
                <div className="text-sm text-muted-foreground">Feature</div>
                <div className="font-medium">{e.featureName}</div>
              </div>
              <div className="md:col-span-4">
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">
                  {format(new Date(e.date), 'MMM dd, yyyy')}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {format(new Date(e.date), 'h:mm a')}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {e.note}
                </div>
              </div>
              <div className="md:col-span-4 md:text-right">
                <div
                  className={
                    'text-sm font-semibold ' +
                    (isUsage ? 'text-amber-700' : 'text-emerald-700')
                  }
                >
                  {changeText} credit{Math.abs(e.change) !== 1 ? 's' : ''}
                </div>
                <Badge
                  variant={isUsage ? 'outline' : 'secondary'}
                  className={
                    isUsage
                      ? 'border-amber-300 text-amber-700 mt-2'
                      : 'bg-emerald-100 text-emerald-700 mt-2'
                  }
                >
                  {isUsage ? 'Deducted' : 'Top-up'}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
