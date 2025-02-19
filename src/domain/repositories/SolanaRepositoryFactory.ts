import { SolanaAgentKit } from "solana-agent-kit";
import { SolanaAgentRepository } from "@/domain/repositories/SolanaAgentRepository";
import { SolanaMarketDataRepository } from "@/domain/repositories/SolanaMarketDataRepository";

export class SolanaRepositoryFactory {
  private static instance: SolanaRepositoryFactory;
  private agent: SolanaAgentKit | null = null;

  private constructor() {}

  static getInstance(): SolanaRepositoryFactory {
    if (!SolanaRepositoryFactory.instance) {
      SolanaRepositoryFactory.instance = new SolanaRepositoryFactory();
    }
    return SolanaRepositoryFactory.instance;
  }

  initialize(config: {
    privateKey: string;
    rpcUrl?: string;
    openAiKey?: string;
  }) {
    if (!this.agent) {
      this.agent = new SolanaAgentKit(
        config.privateKey,
        config.rpcUrl || "https://api.mainnet-beta.solana.com",
        {
          OPENAI_API_KEY: config.openAiKey || undefined,
        }
      );
    }
  }

  createAgentRepository(): SolanaAgentRepository {
    if (!this.agent) throw new Error("Repository factory not initialized");
    return new SolanaAgentRepository(this.agent);
  }

  createMarketDataRepository(): SolanaMarketDataRepository {
    if (!this.agent) throw new Error("Repository factory not initialized");
    return new SolanaMarketDataRepository(this.agent);
  }
}
