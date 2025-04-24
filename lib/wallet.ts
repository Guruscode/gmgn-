
export type Wallet = {
  address: string;
  name: string;
  label?: string;
  addedAt?: string;
};

export type Token = {
  token_address: string;
  usd_value?: string;
  symbol?: string;
  name?: string;
  logo?: string;
  chain?: string;
  usd_price?: string;
  usd_price_24hr_percent_change?: number;
  balance?: string;
  decimals?: number;
  portfolio_percentage?: number;
};