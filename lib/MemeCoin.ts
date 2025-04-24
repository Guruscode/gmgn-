export interface MemeCoin {
  id: string;
  name: string;
  chainId: string;
  tokenAddress: string;
  symbol: string;
  address: string;
  chain: string;
  logo?: string;
  price?: number;
  priceChange24h?: number;
  priceChange7d?: number;
  liquidity?: number;
  holders?: number;
  age?: string;
  socials?: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
  buyTransactions?: { [key: string]: number };
  sellTransactions?: { [key: string]: number };
  buyers?: { [key: string]: number };
  sellers?: { [key: string]: number };
  totalVolume?: { [key: string]: number };
  transactions?: { [key: string]: number };
}
