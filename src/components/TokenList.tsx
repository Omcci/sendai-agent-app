import { Token } from '@/domain/entities/Token';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function TokenList({ tokens }: { tokens: Token[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployed Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tokens.length === 0 ? (
            <p className="text-gray-500">No tokens deployed yet</p>
          ) : (
            tokens.map((token) => (
              <div key={token.mint} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-gray-500">{token.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Supply: {token.supply}</p>
                    <p className="text-xs text-gray-500">
                      Decimals: {token.decimals}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Mint: {token.mint.slice(0, 8)}...{token.mint.slice(-8)}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}