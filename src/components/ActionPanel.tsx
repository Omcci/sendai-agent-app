import { useState } from 'react';
import { useAgent } from '@/application/hooks/useAgent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function ActionPanel() {
  const { deployToken, swapTokens, lendUSDC, stakeSol, isLoading } = useAgent();
  const [action, setAction] = useState<'DEPLOY' | 'SWAP' | 'LEND' | 'STAKE' | null>(null);
  const [amount, setAmount] = useState('');

  const handleAction = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;

    switch (action) {
      case 'DEPLOY':
        await deployToken({
          name: 'Test Token',
          uri: '',
          symbol: 'TEST',
          decimals: 9,
          initialSupply: numAmount
        });
        break;
      case 'SWAP':
        await swapTokens({
          targetTokenMint: 'target-mint',
          sourceTokenMint: 'source-mint',
          amount: numAmount,
          slippage: 3
        });
        break;
      case 'LEND':
        await lendUSDC(numAmount);
        break;
      case 'STAKE':
        await stakeSol(numAmount);
        break;
    }

    setAmount('');
    setAction(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setAction('DEPLOY')}
            variant={action === 'DEPLOY' ? 'default' : 'outline'}
          >
            Deploy Token
          </Button>
          <Button
            onClick={() => setAction('SWAP')}
            variant={action === 'SWAP' ? 'default' : 'outline'}
          >
            Swap
          </Button>
          <Button
            onClick={() => setAction('LEND')}
            variant={action === 'LEND' ? 'default' : 'outline'}
          >
            Lend
          </Button>
          <Button
            onClick={() => setAction('STAKE')}
            variant={action === 'STAKE' ? 'default' : 'outline'}
          >
            Stake
          </Button>
        </div>
        {action && (
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              onClick={handleAction}
              disabled={isLoading || !amount}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}