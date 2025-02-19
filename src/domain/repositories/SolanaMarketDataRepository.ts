import { SolanaAgentKit } from "solana-agent-kit";
import { IMarketDataRepository } from "@/domain/repositories/IMarketDataRepository";
import { MarketData } from "@/domain/entities/MarketData";

export class SolanaMarketDataRepository implements IMarketDataRepository {
  constructor(private readonly agent: SolanaAgentKit) {}

  async fetchMarketData(): Promise<MarketData> {
    const [trendingTokens, topGainers, latestPools] = await Promise.all([
      this.agent.getTrendingTokens(),
      this.agent.getTopGainersOnCoingecko("24h", "all"),
      this.agent.getCoingeckoLatestPools(),
    ]);

    return {
      trendingTokens,
      topGainers,
      latestPools,
    };
  }
}
