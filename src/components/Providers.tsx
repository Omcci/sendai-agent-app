"use client"

import { AgentProvider } from "@/application/providers/AgentContext";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

require("@solana/wallet-adapter-react-ui/styles.css");

export function Providers({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}