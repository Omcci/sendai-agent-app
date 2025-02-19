import { create } from "zustand";
import { Transaction } from "@/domain/entities/Transaction";
import { Token } from "@/domain/entities/Token";

interface AgentState {
  transactions: Transaction[];
  tokens: Token[];
  marketData: any;
  isLoading: boolean;
  error: string | null;

  deployToken: (params: {
    name: string;
    uri: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
  }) => Promise<void>;

  swapTokens: (params: {
    targetTokenMint: string;
    amount: number;
    sourceTokenMint: string;
    slippage: number;
  }) => Promise<void>;

  lendUSDC: (amount: number) => Promise<void>;
  stakeSol: (amount: number) => Promise<void>;
  fetchMarketData: () => Promise<void>;
}

export const useAgent = create<AgentState>((set, get) => ({
  transactions: [],
  tokens: [],
  marketData: null,
  isLoading: false,
  error: null,

  deployToken: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const token = await window.agentRepository.deployToken(params);
      set((state) => ({
        tokens: [...state.tokens, token],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  swapTokens: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const transaction = await window.agentRepository.swapTokens(params);
      set((state) => ({
        transactions: [...state.transactions, transaction],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  lendUSDC: async (amount) => {
    set({ isLoading: true, error: null });
    try {
      const transaction = await window.agentRepository.lendUSDC(amount);
      set((state) => ({
        transactions: [...state.transactions, transaction],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  stakeSol: async (amount) => {
    set({ isLoading: true, error: null });
    try {
      const transaction = await window.agentRepository.stakeSol(amount);
      set((state) => ({
        transactions: [...state.transactions, transaction],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchMarketData: async () => {
    set({ isLoading: true, error: null });
    try {
      const marketData = await window.agentRepository.getMarketData();
      set({ marketData, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
