import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

interface MarketData {
  trendingTokens: Array<{
    symbol: string;
    price: number;
    change24h: number;
  }>;
  topGainers: Array<{
    symbol: string;
    change24h: number;
  }>;
  latestPools: Array<{
    name: string;
    liquidity: number;
  }>;
}

export function MarketDataCard({ data, isLoading }: { data: MarketData | null; isLoading: boolean }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Trending Tokens</h3>
            <div className="grid gap-2">
              {data?.trendingTokens.map((token: { symbol: string; price: number; change24h: number }, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{token.symbol}</span>
                  <span className={token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {token.change24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Top Gainers (24h)</h3>
            <div className="grid gap-2">
              {data?.topGainers.map((token: { symbol: string; change24h: number }, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{token.symbol}</span>
                  <span className="text-green-500">+{token.change24h.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}