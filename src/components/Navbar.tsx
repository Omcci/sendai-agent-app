"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Solana Agent Dashboard</h1>
        <WalletMultiButton />
      </div>
    </nav>
  );
}