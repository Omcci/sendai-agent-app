import { useEffect } from 'react';
import { useAgent } from '@/application/hooks/useAgent';
import { MarketDataCard } from './MarketDataCard';

import { ActionPanel } from './ActionPanel';
import { TokenList } from './TokenList';
import TransactionList from './TransactionList';

export function DashboardView() {
  const { fetchMarketData, marketData, transactions, tokens, isLoading } = useAgent();

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionPanel />
        <MarketDataCard data={marketData} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionList transactions={transactions} />
        <TokenList tokens={tokens} />
      </div>
    </div>
  );
}
