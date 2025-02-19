import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { PublicKey } from "@solana/web3.js";
import { IAgentRepository } from "@/domain/repositories/IAgentRepository";
import { Transaction } from "@/domain/entities/Transaction";
import { Token } from "@/domain/entities/Token";

export class SolanaAgentRepository implements IAgentRepository {
  private agent: SolanaAgentKit;

  constructor(config: {
    privateKey: string;
    rpcUrl?: string;
    openAiKey?: string;
  }) {
    this.agent = new SolanaAgentKit(
      config.privateKey,
      config.rpcUrl || "https://api.mainnet-beta.solana.com",
      {
        OPENAI_API_KEY: config.openAiKey || undefined,
      }
    );
  }

  async deployToken(params: {
    name: string;
    uri: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
  }): Promise<Token> {
    const result = await this.agent.deployToken(
      params.name,
      params.uri,
      params.symbol,
      params.decimals,
      params.initialSupply
    );

    return {
      mint: result.mint.toString(),
      name: params.name,
      symbol: params.symbol,
      decimals: params.decimals,
      supply: params.initialSupply,
      uri: params.uri,
    };
  }

  async swapTokens(params: {
    targetTokenMint: string;
    amount: number;
    sourceTokenMint: string;
    slippage: number;
  }): Promise<Transaction> {
    try {
      const signature = await this.agent.trade(
        new PublicKey(params.targetTokenMint),
        params.amount,
        new PublicKey(params.sourceTokenMint),
        params.slippage
      );

      return {
        id: crypto.randomUUID(),
        type: "SWAP",
        status: "COMPLETED",
        amount: params.amount,
        timestamp: new Date(),
        signature,
      };
    } catch (error) {
      return {
        id: crypto.randomUUID(),
        type: "SWAP",
        status: "FAILED",
        amount: params.amount,
        timestamp: new Date(),
        error: (error as Error).message,
      };
    }
  }

  async lendUSDC(amount: number): Promise<Transaction> {
    try {
      const signature = await this.agent.lendAssets(amount);
      return {
        id: crypto.randomUUID(),
        type: "LEND",
        status: "COMPLETED",
        amount,
        timestamp: new Date(),
        signature,
      };
    } catch (error) {
      return {
        id: crypto.randomUUID(),
        type: "LEND",
        status: "FAILED",
        amount,
        timestamp: new Date(),
        error: (error as Error).message,
      };
    }
  }

  async stakeSol(amount: number): Promise<Transaction> {
    try {
      const signature = await this.agent.stake(amount);
      return {
        id: crypto.randomUUID(),
        type: "STAKE",
        status: "COMPLETED",
        amount,
        timestamp: new Date(),
        signature,
      };
    } catch (error) {
      return {
        id: crypto.randomUUID(),
        type: "STAKE",
        status: "FAILED",
        amount,
        timestamp: new Date(),
        error: (error as Error).message,
      };
    }
  }

  async getMarketData() {
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
