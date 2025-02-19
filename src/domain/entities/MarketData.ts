export interface TokenData {
  symbol: string;
  price: number;
  change24h: number;
}

export interface PoolData {
  name: string;
  liquidity: number;
}

export interface MarketData {
  trendingTokens: TokenData[];
  topGainers: TokenData[];
  latestPools: PoolData[];
}
