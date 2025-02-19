import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">
        Solana Agent Dashboard
      </h1>
      <p className="text-muted-foreground text-center max-w-[600px]">
        A powerful dashboard for managing your Solana DeFi operations with automated trading strategies.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg">Launch App</Button>
        </Link>
        <Link href="https://github.com/omcci/sendai-agent-app" target="_blank">
          <Button variant="outline" size="lg">
            View on GitHub
          </Button>
        </Link>
      </div>
    </div>
  );
}