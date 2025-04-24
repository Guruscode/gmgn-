
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

export type Pair = {
  chainId: string;
  pairAddress: string;
  exchangeName: string;
  exchangeLogo: string;
  pairLabel: string;
  liquidityUsd: number;
  usdPrice: number;
  usdPrice24hrPercentChange: number;
  volume24hrUsd: number;
  baseToken: Token;
  quoteToken: Token;
  pair: Token[];
};

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