export interface Token {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  uri?: string;
}
