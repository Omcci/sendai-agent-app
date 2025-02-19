import { MarketData } from "../entities/MarketData";

export interface IMarketDataRepository {
  fetchMarketData(): Promise<MarketData>;
}
