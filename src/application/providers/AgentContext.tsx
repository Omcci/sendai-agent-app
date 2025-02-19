"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@/domain/entities/Transaction";
import { Token } from "@/domain/entities/Token";
import { SolanaRepositoryFactory } from "@/domain/repositories/SolanaRepositoryFactory";

interface TokenData {
  symbol: string;
  price: number;
  change24h: number;
}

interface PoolData {
  name: string;
  liquidity: number;
}

interface MarketData {
  trendingTokens: TokenData[];
  topGainers: TokenData[];
  latestPools: PoolData[];
}

interface AgentContextType {
  marketData: MarketData | null;
  transactions: Transaction[];
  tokens: Token[];
  isLoading: boolean;
  fetchMarketData: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType>({
  marketData: null,
  transactions: [],
  tokens: [],
  isLoading: false,
  fetchMarketData: async () => { },
});

const dummyData = {
  trendingTokens: [
    { symbol: "SOL", price: 101.23, change24h: 5.67 },
    { symbol: "BONK", price: 0.00001234, change24h: -2.34 },
    { symbol: "JTO", price: 2.45, change24h: 12.34 }
  ],
  topGainers: [
    { symbol: "JTO", price: 3.45, change24h: 12.34 },
    { symbol: "SOL", price: 101.23, change24h: 5.67 },
    { symbol: "RAY", price: 0.89, change24h: 4.56 }
  ],
  latestPools: [
    { name: "SOL-USDC", liquidity: 1000000 },
    { name: "BONK-SOL", liquidity: 500000 }
  ]
};

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repository, setRepository] = useState<any>(null);

  useEffect(() => {
    console.log("PublicKey changed:", publicKey?.toBase58());
  }, [publicKey]);

  // useEffect(() => {
  //   async function initializeRepository() {
  //     try {
  //       const { SolanaRepositoryFactory } = await import("@/domain/repositories/SolanaRepositoryFactory");
  //       const factory = SolanaRepositoryFactory.getInstance();
  //       factory.initialize({
  //         privateKey: "dummy-key",
  //         rpcUrl: "https://api.mainnet-beta.solana.com",
  //       });
  //       const marketDataRepo = factory.createMarketDataRepository();
  //       setRepository(marketDataRepo);
  //     } catch (error) {
  //       console.error("Failed to initialize repository:", error);
  //     }
  //   }

  //   initializeRepository();
  // }, []);


  const fetchMarketData = useCallback(async () => {
    try {
      setIsLoading(true);
      setMarketData(dummyData);
    } catch (error) {
      console.error("Failed to fetch market data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AgentContext.Provider
      value={{
        marketData,
        transactions,
        tokens,
        isLoading,
        fetchMarketData,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export const useAgent = () => useContext(AgentContext);
