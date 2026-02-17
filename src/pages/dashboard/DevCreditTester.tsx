import { useState } from 'react';

type Quota = { id: string; name: string; remaining: number };

export default function DevCreditTester() {
  const now = new Date();
  const addDays = (d: Date, days: number) =>
    new Date(d.getTime() + days * 24 * 60 * 60 * 1000);

  const [membershipActive, setMembershipActive] = useState(true);
  const [startDate, setStartDate] = useState<Date>(addDays(now, -10));
  const [endDate, setEndDate] = useState<Date>(addDays(now, 20));
  const [walletCredits, setWalletCredits] = useState<number>(120);
  const [quotas, setQuotas] = useState<Quota[]>([
    { id: 'q1', name: 'Monthly Chats', remaining: 5 },
    { id: 'q2', name: 'Session Minutes', remaining: 120 },
  ]);
  const [logs, setLogs] = useState<string[]>([]);

  const [renewDays, setRenewDays] = useState<number>(30);
  const [renewMode, setRenewMode] = useState<'reset' | 'extend'>('reset');
  const [creditAssignMode, setCreditAssignMode] = useState<'overwrite' | 'add'>(
    'overwrite'
  );
  const [renewCreditAmount, setRenewCreditAmount] = useState<number>(50);
  const [consumeAmount, setConsumeAmount] = useState<number>(1);

  const pushLog = (s: string) =>
    setLogs((l) => [new Date().toLocaleTimeString() + ' — ' + s, ...l]);

  function toggleMembership() {
    if (!membershipActive) {
      setStartDate(new Date());
      setEndDate(addDays(new Date(), 30));
      pushLog('Activated membership (fresh)');
    } else {
      pushLog('Deactivated membership');
    }
    setMembershipActive((a) => !a);
  }

  function renewMembership() {
    const now = new Date();
    const currentEnd = endDate;
    const newEnd =
      renewMode === 'reset'
        ? addDays(now, renewDays)
        : addDays(currentEnd, renewDays);
    setEndDate(newEnd);
    setMembershipActive(true);
    pushLog(
      `Renewed membership (${renewMode}) → new end: ${newEnd.toLocaleDateString()}`
    );

    if (creditAssignMode === 'overwrite') {
      setWalletCredits(renewCreditAmount);
      pushLog(`Wallet overwritten to ${renewCreditAmount}`);
    } else {
      setWalletCredits((c) => c + renewCreditAmount);
      pushLog(`Wallet increased by ${renewCreditAmount}`);
    }
  }

  function topUpWalletAdd(amount: number) {
    setWalletCredits((c) => c + amount);
    pushLog(`Top-up (add) +${amount} → ${walletCredits + amount}`);
  }
  function topUpWalletOverwrite(amount: number) {
    setWalletCredits(amount);
    pushLog(`Top-up (overwrite) → ${amount}`);
  }

  function consumeWallet(amount: number) {
    if (walletCredits >= amount) {
      setWalletCredits((c) => c - amount);
      pushLog(`Consumed ${amount} wallet credit(s)`);
    } else {
      pushLog(`Insufficient wallet credits (${walletCredits} < ${amount})`);
    }
  }

  function consumeQuota(id: string, amount: number) {
    setQuotas((qs) => {
      const found = qs.find((x) => x.id === id);
      if (!found) return qs;
      if (found.remaining < amount) {
        pushLog(`Insufficient quota for ${found.name}`);
        return qs;
      }
      pushLog(`Consumed ${amount} from ${found.name}`);
      return qs.map((x) =>
        x.id === id ? { ...x, remaining: x.remaining - amount } : x
      );
    });
  }

  function resetDefaults() {
    setMembershipActive(true);
    setStartDate(addDays(new Date(), -10));
    setEndDate(addDays(new Date(), 20));
    setWalletCredits(120);
    setQuotas([
      { id: 'q1', name: 'Monthly Chats', remaining: 5 },
      { id: 'q2', name: 'Session Minutes', remaining: 120 },
    ]);
    setLogs([]);
    pushLog('Reset to defaults');
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Dev: Credit & Membership tester (temporary)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Membership</div>
          <div className="mt-2 font-medium">
            {membershipActive ? 'Active' : 'Inactive'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Start: {startDate.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            End: {endDate.toLocaleString()}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-slate-700 text-white rounded"
              onClick={toggleMembership}
            >
              Toggle Active
            </button>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={() => {
                setEndDate(addDays(new Date(), 30));
                setMembershipActive(true);
                pushLog('Set membership to now + 30d');
              }}
            >
              Set +30d
            </button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Wallet</div>
          <div className="mt-2 text-xl font-semibold">{walletCredits}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => topUpWalletAdd(10)}
            >
              +10 (add)
            </button>
            <button
              className="px-3 py-1 bg-amber-600 text-white rounded"
              onClick={() => topUpWalletOverwrite(50)}
            >
              Set 50 (overwrite)
            </button>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => consumeWallet(1)}
            >
              -1 (consume)
            </button>
          </div>
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm text-muted-foreground">Quick actions</div>
          <div className="mt-3 grid gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
              <div>
                <div className="text-xs text-gray-500 mb-1">Renew days</div>
                <input
                  className="w-full sm:w-20 px-2 border rounded"
                  type="number"
                  value={renewDays}
                  onChange={(e) => setRenewDays(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Renew mode</div>
                <select
                  className="w-full sm:w-auto px-2 border rounded"
                  value={renewMode}
                  onChange={(e) => setRenewMode(e.target.value as any)}
                >
                  <option value="reset">
                    Reset — set EndDate = now + days
                  </option>
                  <option value="extend">
                    Extend — add days to current EndDate
                  </option>
                </select>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">
                  Credits on renew
                </div>
                <input
                  className="w-full sm:w-24 px-2 border rounded"
                  type="number"
                  value={renewCreditAmount}
                  onChange={(e) => setRenewCreditAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <label className="text-sm">On renew credits:</label>
                <label className="ml-2">
                  <input
                    type="radio"
                    checked={creditAssignMode === 'overwrite'}
                    onChange={() => setCreditAssignMode('overwrite')}
                  />{' '}
                  Overwrite
                </label>
                <label className="ml-2">
                  <input
                    type="radio"
                    checked={creditAssignMode === 'add'}
                    onChange={() => setCreditAssignMode('add')}
                  />{' '}
                  Add
                </label>
              </div>
              <div className="text-xs text-gray-500">
                Overwrite: replace the user's wallet with this value. Add:
                increase the user's existing wallet by this value.
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-3 py-1 bg-indigo-600 text-white rounded"
                onClick={renewMembership}
              >
                Renew membership
              </button>
              <button
                className="px-3 py-1 bg-gray-600 text-white rounded"
                onClick={() => {
                  topUpWalletAdd(renewCreditAmount);
                  pushLog(`Manual add topup ${renewCreditAmount}`);
                }}
              >
                Manual top-up add
              </button>
              <button
                className="px-3 py-1 bg-yellow-700 text-white rounded"
                onClick={() => {
                  topUpWalletOverwrite(renewCreditAmount);
                  pushLog(`Manual overwrite topup ${renewCreditAmount}`);
                }}
              >
                Manual top-up overwrite
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 font-medium">Quotas</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quotas.map((q) => (
            <div
              key={q.id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{q.name}</div>
                <div className="text-sm text-gray-500">
                  Remaining: {q.remaining}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-emerald-600 text-white rounded"
                  onClick={() => consumeQuota(q.id, Math.max(1, consumeAmount))}
                >
                  -{Math.max(1, consumeAmount)}
                </button>
                <button
                  className="px-2 py-1 bg-slate-500 text-white rounded"
                  onClick={() =>
                    setQuotas((s) =>
                      s.map((x) =>
                        x.id === q.id ? { ...x, remaining: x.remaining + 1 } : x
                      )
                    )
                  }
                >
                  +1
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          className="w-28 px-2 border rounded"
          type="number"
          value={consumeAmount}
          onChange={(e) => setConsumeAmount(Number(e.target.value))}
        />
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          onClick={() => {
            consumeWallet(consumeAmount);
          }}
        >
          Consume wallet
        </button>
        <button
          className="px-3 py-1 bg-stone-600 text-white rounded"
          onClick={resetDefaults}
        >
          Reset
        </button>
      </div>

      <div>
        <div className="mb-2 font-medium">Action log</div>
        <div className="h-52 overflow-auto p-3 border rounded bg-gray-50">
          {logs.length === 0 ? (
            <div className="text-sm text-gray-400">No actions yet</div>
          ) : (
            <ul className="text-sm space-y-1">
              {logs.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Note: this is a temporary, local-only tester component — no API calls or
        project hooks used.
      </div>
    </div>
  );
}
