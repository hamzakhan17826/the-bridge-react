import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { History, X } from 'lucide-react';

export type UsageEntry = {
  date: string; // ISO
  change: number; // negative for usage, positive for top-up
  note: string;
};

export default function CreditsHistoryDrawer(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName: string;
  entries: UsageEntry[];
}) {
  const { open, onOpenChange, featureName, entries } = props;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l shadow-lg focus:outline-none">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <History className="h-5 w-5 text-primary" />
              </div>
              <Dialog.Title className="text-lg font-semibold">
                Usage History
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="px-4 py-3 border-b">
            <div className="text-sm text-muted-foreground">Feature</div>
            <div className="font-medium">{featureName}</div>
          </div>

          <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-7rem)]">
            {entries.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No history yet.
              </div>
            ) : (
              entries.map((e, idx) => {
                const isUsage = e.change < 0;
                const changeText = `${e.change > 0 ? '+' : ''}${e.change}`;
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3 rounded-lg border hover:border-gray-300"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {format(new Date(e.date), 'MMM dd, yyyy')}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {format(new Date(e.date), 'h:mm a')}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {e.note}
                      </div>
                      <Badge
                        variant={isUsage ? 'outline' : 'secondary'}
                        className={
                          isUsage
                            ? 'border-amber-300 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }
                      >
                        {isUsage ? 'Deducted' : 'Top-up'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div
                        className={
                          'text-sm font-semibold ' +
                          (isUsage ? 'text-amber-700' : 'text-emerald-700')
                        }
                      >
                        {changeText} credit{Math.abs(e.change) !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
