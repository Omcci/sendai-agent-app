"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SolanaAgentRepository } from "@/domain/repositories/SolanaAgentRepository";
import { Transaction } from "@/domain/entities/Transaction";
import { Token } from "@/domain/entities/Token";

interface MarketData {
  trendingTokens: any[];
  topGainers: any[];
  latestPools: any[];
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

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMarketData = useCallback(async () => {
    try {
      setIsLoading(true);
      // For now, just set dummy data
      setMarketData({
        trendingTokens: [],
        topGainers: [],
        latestPools: [],
      });
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
