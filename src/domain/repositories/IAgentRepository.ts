import { Transaction } from "@/domain/entities/Transaction";
import { Token } from "@/domain/entities/Token";

export interface IAgentRepository {
  deployToken(params: {
    name: string;
    uri: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
  }): Promise<Token>;

  swapTokens(params: {
    targetTokenMint: string;
    amount: number;
    sourceTokenMint: string;
    slippage: number;
  }): Promise<Transaction>;

  lendUSDC(amount: number): Promise<Transaction>;

  stakeSol(amount: number): Promise<Transaction>;
}
