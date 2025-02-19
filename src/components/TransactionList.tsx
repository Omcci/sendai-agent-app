import { Transaction } from '@/domain/entities/Transaction';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-500';
      case 'FAILED':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className={`text-sm ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      Amount: {tx.amount?.toString() || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {tx.signature && (
                  <p className="text-xs text-gray-400 mt-2">
                    Signature: {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                  </p>
                )}
                {tx.error && (
                  <p className="text-xs text-red-500 mt-2">
                    Error: {tx.error}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;