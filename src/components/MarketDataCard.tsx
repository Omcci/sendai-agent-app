import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MarketDataCard({ data, isLoading }: { data: any; isLoading: boolean }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Data</CardTitle>
        </CardHeader>
        <CardContent>
          Loading...
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
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Trending Tokens</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(data?.trendingTokens, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium">Top Gainers</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(data?.topGainers, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}