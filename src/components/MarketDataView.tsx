"use client"

import { useEffect } from "react";
import { useAgent } from "@/application/providers/AgentContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 6
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  signDisplay: 'exceptZero',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function MarketDataView() {
  const { marketData, isLoading, fetchMarketData } = useAgent();

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Section title="Trending Tokens">
            {marketData?.trendingTokens.map((token, i) => (
              <TokenRow
                key={i}
                symbol={token.symbol}
                price={token.price}
                change={token.change24h}
              />
            ))}
          </Section>

          <Section title="Top Gainers">
            {marketData?.topGainers.map((token, i) => (
              <TokenRow
                key={i}
                symbol={token.symbol}
                price={token.price}
                change={token.change24h}
              />
            ))}
          </Section>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function TokenRow({ symbol, price, change }: { symbol: string; price: number; change: number }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="font-medium">{symbol}</span>
        <span className="text-sm text-muted-foreground">
          {formatter.format(price)}
        </span>
      </div>
      <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
        {percentFormatter.format(change / 100)}
      </span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}