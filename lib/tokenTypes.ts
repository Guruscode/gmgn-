export type Token = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenDecimals: string;
  pairTokenType?: string;
  liquidityUsd?: number;
  symbol?: string;
  address?: string;
};

export interface Pair {
  chainId: string;
  pairAddress: string;
  pairLabel?: string;
  exchangeName?: string;
  liquidityUsd?: number;
  pair?: PairToken[];
}

export interface PairToken {
  tokenSymbol: string;
  tokenAddress: string;
  tokenName: string;
  tokenLogo: string;
  tokenDecimals: string;
  amount?: number;
  totalSupply?: number;
}

export interface TokenMetadata {
  name?: string;
  symbol?: string;
  logo?: string;
  totalSupplyFormatted?: string;
  fullyDilutedValue?: number;
  links?: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  categories?: string[];
  created_at?: string;
  total_supply_formatted?: string;
  market_cap?: number;
  fully_diluted_valuation?: number;
}

export interface SniperTransaction {
  transactionHash: string;
  transactionTimestamp: string;
}

export interface Sniper {
  walletAddress: string;
  snipedTransactions: SniperTransaction[];
  totalSnipedTransactions: number;
  totalSellTransactions: number;
  totalSnipedUsd: number | string;
  totalSoldUsd: number | string;
  realizedProfitUsd: number | string;
  realizedProfitPercentage: number;
  currentBalanceUsdValue: number | string;
}