export interface Transaction {
  id: string;
  type: "SWAP" | "STAKE" | "LEND" | "DEPLOY_TOKEN";
  status: "PENDING" | "COMPLETED" | "FAILED";
  amount?: number;
  timestamp: Date;
  signature?: string;
  error?: string;
}
