import { useState, useCallback } from "react";
import { MarketData } from "@/domain/entities/MarketData";
import { useMarketDataRepository } from "@/infrastructure/repositories/MarketDataRepository";

export function useMarketData() {
  const [data, setData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const repository = useMarketDataRepository();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const marketData = await repository.fetchMarketData();
      setData(marketData);
    } catch (error) {
      console.error("Failed to fetch market data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  return { data, isLoading, fetchData };
}
