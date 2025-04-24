// components/token/TokenInfo.tsx
import React, { useState, useEffect, useRef } from "react";

interface Token {
  address: string;
  symbol: string;
  name: string;
  logo?: string;
  holders?: number;
}

interface Pair {
  pairAddress: string;
  pairLabel: string;
  exchangeName: string;
  usdPrice?: number;
  nativePrice?: number;
  liquidityUsd?: number;
  pair?: {
    tokenSymbol: string;
    amount: number;
    totalSupply: number;
  }[];
}

interface TokenMetadata {
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
  // EVM specific
  total_supply_formatted?: string;
  market_cap?: number;
  fully_diluted_valuation?: number;
}

interface PairStats {
  currentUsdPrice?: number;
  currentNativePrice?: number;
  totalLiquidityUsd?: number;
  pricePercentChange?: {
    [key: string]: number;
  };
  buys?: {
    [key: string]: number;
  };
  sells?: {
    [key: string]: number;
  };
  buyVolume?: {
    [key: string]: number;
  };
  sellVolume?: {
    [key: string]: number;
  };
  buyers?: {
    [key: string]: number;
  };
  sellers?: {
    [key: string]: number;
  };
  totalVolume?: {
    [key: string]: number;
  };
  pairCreated?: string;
}

interface TokenInfoProps {
  token: Token;
  pair: Pair;
  timeFrame?: string;
  chainId: string;
}

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const TokenInfo: React.FC<TokenInfoProps> = ({ token, pair, timeFrame, chainId }) => {
  const [pairStats, setPairStats] = useState<PairStats | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("24h");
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSolana, setIsSolana] = useState(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'auto'>('buy');
  const [amount, setAmount] = useState(0);
  const [amountPercentage, setAmountPercentage] = useState(0);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);

  // Block explorer URLs by chain
  const blockExplorers: Record<string, string> = {
    "0x1": "https://etherscan.io",
    "0x38": "https://bscscan.com",
    "0x89": "https://polygonscan.com",
    "0xa4b1": "https://arbiscan.io",
    "0xa": "https://optimistic.etherscan.io",
    "0x2105": "https://basescan.org",
    "0xa86a": "https://snowtrace.io",
    "0xe708": "https://lineascan.build",
    "0xfa": "https://ftmscan.com",
    "0x171": "https://scan.pulsechain.com",
    "0x7e4": "https://app.roninchain.com",
    solana: "https://solscan.io",
  };

  // Map UI timeframes to API timeframes
  const timeFrameMap: Record<string, string> = {
    "5m": "5min",
    "1h": "1h",
    "4h": "4h",
    "24h": "24h",
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Fetch token metadata
  useEffect(() => {
    const fetchTokenMetadata = async () => {
      if (!token || !token.address) return;

      try {
        let url;
        const isSolana = chainId === "solana";
        setIsSolana(isSolana);

        if (isSolana) {
          url = `https://solana-gateway.moralis.io/token/mainnet/${token.address}/metadata`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${chainId}&addresses[0]=${token.address}`;
        }

        console.log("Fetching token metadata from:", url);

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Token metadata response:", data);

        // Handle different response formats
        if (isSolana) {
          setTokenMetadata(data);
        } else {
          // EVM response is an array, take first item
          setTokenMetadata(
            Array.isArray(data) && data.length > 0 ? data[0] : null
          );
        }
      } catch (err) {
        console.error("Error fetching token metadata:", err);
      }
    };

    fetchTokenMetadata();
  }, [token, chainId]);

  // Fetch pair stats
  useEffect(() => {
    const fetchPairStats = async () => {
      if (!pair || !pair.pairAddress) return;

      setLoading(true);
      try {
        let url;
        const isSolana = chainId === "solana";

        if (isSolana) {
          url = `https://solana-gateway.moralis.io/token/mainnet/pairs/${pair.pairAddress}/stats`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/pairs/${pair.pairAddress}/stats?chain=${chainId}`;
        }

        console.log("Fetching pair stats from:", url);

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Pair stats response:", data);
        setPairStats(data);
      } catch (err) {
        console.error("Error fetching pair stats:", err);
        setError("Failed to load pair statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPairStats();
  }, [pair, chainId]);

  // Handle time frame selection
  const handleTimeFrameChange = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame);
  };

  // Format price with appropriate decimal places
  const formatPrice = (price: number | string | undefined) => {
    if (!price) return "$0";

    // Convert to number if it's a string
    const numPrice = typeof price === "string" ? parseFloat(price) : price;

    if (numPrice < 0.00001) {
      return "$" + numPrice.toFixed(10).replace(/\.?0+$/, "");
    } else if (numPrice < 0.01) {
      return "$" + numPrice.toFixed(6);
    } else if (numPrice < 1000) {
      return "$" + numPrice.toFixed(4);
    } else {
      return (
        "$" +
        numPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  // Format token price in terms of the quote token
  const formatTokenPrice = (price: number | string | undefined, symbol: string) => {
    if (!price) return "0";

    const numPrice = typeof price === "string" ? parseFloat(price) : price;

    if (numPrice < 0.00001) {
      return `${numPrice.toFixed(10).replace(/\.?0+$/, "")} ${symbol}`;
    } else {
      const parts = numPrice.toString().split(".");
      if (parts.length > 1) {
        // Take 6 significant digits after the decimal
        return `${parts[0]}.${parts[1].substring(0, 6)} ${symbol}`;
      }
      return `${numPrice} ${symbol}`;
    }
  };

  // Format large numbers with K, M, B suffixes
  const formatNumber = (num: number | string | undefined) => {
    if (!num) return "0";

    const numValue = typeof num === "string" ? parseFloat(num) : num;

    if (numValue >= 1000000000) {
      return (numValue / 1000000000).toFixed(1) + "B";
    } else if (numValue >= 1000000) {
      return (numValue / 1000000).toFixed(1) + "M";
    } else if (numValue >= 1000) {
      return (numValue / 1000).toFixed(1) + "K";
    } else {
      return numValue.toLocaleString();
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString: string | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h ago`;
    } else {
      return `${diffHours}h ${diffMin % 60}m ago`;
    }
  };

  // Format percentage changes
  const formatPercentChange = (value: number | undefined) => {
    if (value === undefined || value === null) return "-";
    return (value >= 0 ? "+" : "") + value.toFixed(2) + "%";
  };

  // Calculate ratio for progress bars
  const calculateRatio = (a: number | undefined, b: number | undefined) => {
    if (!a || !b || a + b === 0) return 0.5; // Default to 50% if no data
    return a / (a + b);
  };

  // Get time period data
  const getTimePeriodData = (period: string) => {
    const apiPeriod = timeFrameMap[period] || "24h";

    if (!pairStats)
      return {
        priceChange: 0,
        buys: 0,
        sells: 0,
        buyVolume: 0,
        sellVolume: 0,
        buyers: 0,
        sellers: 0,
        totalVolume: 0,
      };

    return {
      priceChange: pairStats.pricePercentChange?.[apiPeriod] || 0,
      buys: pairStats.buys?.[apiPeriod] || 0,
      sells: pairStats.sells?.[apiPeriod] || 0,
      buyVolume: pairStats.buyVolume?.[apiPeriod] || 0,
      sellVolume: pairStats.sellVolume?.[apiPeriod] || 0,
      buyers: pairStats.buyers?.[apiPeriod] || 0,
      sellers: pairStats.sellers?.[apiPeriod] || 0,
      totalVolume: pairStats.totalVolume?.[apiPeriod] || 0,
    };
  };

  // Get token social links
  const getTokenLinks = () => {
    if (!tokenMetadata) return {};

    return tokenMetadata.links || {};
  };

  // Get market cap or FDV
  const getMarketCapOrFDV = (type: "fdv" | "market_cap" = "fdv") => {
    if (isSolana) {
      // For Solana, we only have fullyDilutedValue
      return tokenMetadata?.fullyDilutedValue || 0;
    } else {
      // For EVM chains
      if (type === "market_cap") {
        return tokenMetadata?.market_cap || 0;
      } else {
        return (
          tokenMetadata?.fully_diluted_valuation ||
          tokenMetadata?.market_cap ||
          0
        );
      }
    }
  };

  // Get current time period data
  const currentPeriodData = getTimePeriodData(selectedTimeFrame);

  // New helper function to shorten address
  const shortenAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // New helper function to handle copy
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  if (!token || !pair) {
    return (
      <div className="p-4 text-dex-text-secondary">No token data available</div>
    );
  }

  // Extract token symbols for the pair
  const quoteToken = (() => {
    const defaultQuoteTokens: Record<string, string> = {
      "0x1": "ETH",
      "0x38": "BNB",
      "0x89": "MATIC",
      "0xa86a": "AVAX",
      "0xa": "OP",
      "0xa4b1": "ARB",
      "0x2105": "ETH",
      "0xe708": "ETH",
      "0xfa": "FTM",
      "0x171": "PULSE",
      "0x7e4": "RON",
      solana: "SOL",
    };

    return defaultQuoteTokens[chainId] || "ETH";
  })();

  // Get token price and market info
  const usdPrice = pairStats?.currentUsdPrice || pair.usdPrice || 0;
  const nativePrice = pairStats?.currentNativePrice || pair.nativePrice || 0;
  const totalLiquidity = pairStats?.totalLiquidityUsd || pair.liquidityUsd || 0;
  
  // Get market cap from metadata or estimate
  const marketCap = getMarketCapOrFDV();

  // Get token links
  const tokenLinks = getTokenLinks();

  // Get token categories (EVM only)
  const tokenCategories =
    !isSolana && tokenMetadata?.categories ? tokenMetadata.categories : [];

  // Get creation time
  const creationTime =
    pairStats?.pairCreated || tokenMetadata?.created_at || null;

  // Get the block explorer URL
  const getExplorerUrl = (address: string, type: "address" | "token" = "address") => {
    const explorer = blockExplorers[chainId] || "";

    if (!explorer) return "#";

    if (isSolana) {
      return `${explorer}/${type === "token" ? "token" : "account"}/${address}`;
    } else {
      return `${explorer}/${type === "token" ? "token" : "address"}/${address}`;
    }
  };

  // Get total supply and tokens in pair
  const getTokenSupply = () => {
    if (isSolana) {
      return tokenMetadata?.totalSupplyFormatted || "0";
    } else {
      return tokenMetadata?.total_supply_formatted || "0";
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto text-sm bg-[#0e0e10] text-white"
    >
      {/* Token Header */}
      <div className="p-4 border-b border-[#1e1e24]">
        <div className="flex items-center mb-3">
          <img
            src={
              token.logo ||
              tokenMetadata?.logo ||
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg=="
            }
            alt={token.symbol}
            className="w-10 h-10 mr-3 rounded-full bg-[#1e1e24]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg==";
            }}
          />
          <div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                {tokenMetadata?.name || token.name}
              </h1>
              <span className="ml-2 text-sm bg-[#f8d521] text-black px-2 py-0.5 rounded">
                {tokenMetadata?.symbol || token.symbol}
              </span>
            </div>
            <div className="text-sm text-[#8f8f92] mt-1">
              {pair.pairLabel} on {pair.exchangeName}
            </div>
          </div>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
          <div>
            <div className="text-[#8f8f92]">MKT Cap</div>
            <div>${formatNumber(marketCap)}</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">Liq</div>
            <div>${formatNumber(totalLiquidity)}</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">24h Vol</div>
            <div>${formatNumber(currentPeriodData.totalVolume)}</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">Holders</div>
            <div>{token.holders ? formatNumber(token.holders) : 'N/A'}</div>
          </div>
        </div>

        {/* Pair Liquidity */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
          {pair.pair && pair.pair.map((pairToken, index) => (
            <div key={index}>
              <div className="text-[#8f8f92]">
                {pairToken.tokenSymbol}
              </div>
              <div className="flex justify-between">
                <span>
                  {formatNumber(pairToken.amount)} / {formatNumber(pairToken.totalSupply)}
                </span>
                <span>
                  ({(pairToken.amount / pairToken.totalSupply * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
          <div>
            <div className="text-[#8f8f92]">NoMint</div>
            <div className="text-[#00ff00]">Yes ✓</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">Blacklist</div>
            <div className="text-[#00ff00]">No ✓</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">Burnt</div>
            <div>100%</div>
          </div>
          <div>
            <div className="text-[#8f8f92]">Top 10</div>
            <div className="text-[#00ff00]">Yes ✓</div>
          </div>
        </div>

        {/* Trading Section */}
        <div className="mt-4 pt-3 border-t border-[#1e1e24]">
          <div className="flex justify-between items-center mb-3">
          <div className="font-semibold flex">Trading in secs 🚀</div>
            <div className="flex h-[28px] rounded-[8px] text-[12px] bg-[#88d693] items-center px-[12px] text-[#111111] font-[500]">
                        Connect TGBot
                    </div>
          </div>

          {/* Buy/Sell Tabs */}
          <div className="flex mb-4 rounded-md overflow-hidden border border-[#1e1e24]">
            <button 
              className={`flex-1 py-2 font-medium ${activeTab === 'buy' ? 'bg-[#1e1e24]' : 'bg-[#0e0e10]'}`}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button 
              className={`flex-1 py-2 font-medium ${activeTab === 'sell' ? 'bg-[#1e1e24]' : 'bg-[#0e0e10]'}`}
              onClick={() => setActiveTab('sell')}
            >
              🔥 Sell
            </button>
            <button 
              className={`flex-1 py-2 font-medium ${activeTab === 'auto' ? 'bg-[#1e1e24]' : 'bg-[#0e0e10]'}`}
              onClick={() => setActiveTab('auto')}
            >
              Auto
            </button>
          </div>

          {activeTab === 'buy' && (
            <>
              {/* Buy Options */}
              <div className="flex mb-3">
                <button className="flex-1 mr-2 py-1.5 bg-[#1e1e24] rounded text-sm">Buy Now</button>
                <button className="flex-1 mx-2 py-1.5 bg-[#1e1e24] rounded text-sm">Buy Dip</button>
                <button className="flex-1 ml-2 py-1.5 bg-[#1e1e24] rounded text-sm">Bai:--{quoteToken}</button>
              </div>

              {/* Amount Selection */}
              <div className="mb-4">
                <div className="text-xs text-[#8f8f92] mb-1">Amount</div>
                <div className="grid grid-cols-4 gap-2">
                  {[0.01, 0.1, 0.5, 1].map((value) => (
                    <button 
                      key={value}
                      className={`py-1.5 rounded text-sm ${amount === value ? 'bg-[#f8d521] text-black' : 'bg-[#1e1e24]'}`}
                      onClick={() => setAmount(value)}
                    >
                      {value} {quoteToken}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Info */}
              <div className="text-center text-xs mb-4 text-[#8f8f92]">
                1 {quoteToken} ≈ {nativePrice ? formatNumber(1 / nativePrice) : '0'} {token.symbol}
              </div>

              {/* TP/SL Section */}
              <div className="mb-4">
                <div className="text-xs text-[#8f8f92] mb-1">TP/SL</div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="col-span-1">
                    <div className="text-[#8f8f92]">TP %</div>
                    <div>--</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-[#8f8f92]">%</div>
                    <div>--</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-[#8f8f92]">Sell %</div>
                    <div>--</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-[#8f8f92]">%</div>
                    <div>--</div>
                  </div>
                </div>
                <button className="w-full mt-2 py-1 bg-[#1e1e24] rounded text-sm">+ Add</button>
              </div>

              {/* Buy Button */}
              
              <div className={`${activeTab == "buy" ? "bg-prettyGreen dark:text-black" : ""} flex h-[32px] text-[12px] text-accent-aux-1 bg-[#111111] w-fullrounded-[6px] justify-center items-center gap-[4px] cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.408 18.657l6.378-9.566a.818.818 0 00-.68-1.272H11.09V1.796a.818.818 0 00-1.499-.454L3.214 10.91a.818.818 0 00.68 1.272H8.91v6.023a.818.818 0 001.498.453z"></path>
                                    </svg>
                                    Buy
                                </div>
            </>
          )}
          {activeTab === 'sell' && (
            <div className="space-y-4">
              {/* Sell Now Button */}
              <button className="w-full py-2 bg-red-600 rounded font-medium">
                Sell Now
              </button>

              {/* Amount Percentage Selector */}
              <div>
                <div className="text-xs text-[#8f8f92] mb-1">Amount</div>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className={`py-1.5 rounded text-sm ${
                        amountPercentage === percent 
                          ? 'bg-[#f8d521] text-black' 
                          : 'bg-[#1e1e24]'
                      }`}
                      onClick={() => setAmountPercentage(percent)}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Info */}
              <div className="text-center text-xs text-[#8f8f92]">
                1 SOL ≈ {formatNumber(1 / nativePrice)} {token.symbol}
              </div>

              {/* Price Change Indicators */}
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                <div>
                  <div className="text-[#8f8f92]">1m</div>
                  <div className="text-green-500">+0.87%</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">5m</div>
                  <div className="text-green-500">+4.87%</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">1h</div>
                  <div className="text-red-500">-12.87%</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">24h</div>
                  <div className="text-green-500">+223.7%</div>
                </div>
              </div>

              {/* Volume Stats */}
              <div className="grid grid-cols-4 gap-2 text-xs text-center">
                <div>
                  <div className="text-[#8f8f92]">Vol</div>
                  <div>$21.1K</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">Buys</div>
                  <div>$21.1K</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">Sells</div>
                  <div>$21.1K</div>
                </div>
                <div>
                  <div className="text-[#8f8f92]">Net Buy</div>
                  <div>$21.1K</div>
                </div>
              </div>

              {/* Pool Info Section */}
              <div className="pt-3 border-t border-[#1e1e24]">
                <div className="text-xs text-[#8f8f92] mb-2">Pool info</div>
                
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#8f8f92]">Total liq</span>
                  <span>$375K (807.12 SOL)</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[#8f8f92]">Market Cap</div>
                    <div>$3M</div>
                  </div>
                  <div>
                    <div className="text-[#8f8f92]">Holders</div>
                    <div>9601</div>
                  </div>
                  <div>
                    <div className="text-[#8f8f92]">Total supply</div>
                    <div>10.0M</div>
                  </div>
                  <div>
                    <div className="text-[#8f8f92]">Pair</div>
                    <div>FAipE...r52😊️</div>
                  </div>
                </div>

                <div className="mt-2 text-xs">
                  <div className="text-[#8f8f92]">Token creator</div>
                  <div>C4udF...fitJ(2.5SOL)😊️</div>
                </div>
              </div>

              {/* Auto Settings */}
              <div className="flex justify-between items-center text-xs pt-3 border-t border-[#1e1e24]">
                <div className="flex items-center text-[#8f8f92]">
                  <span>Auto (22.5%)</span>
                  <span className="ml-2 text-white">0.006</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-[#8f8f92]">
                    {isAutoEnabled ? 'ON' : 'OFF'}
                  </span>
                  <button 
                    className={`w-10 h-5 rounded-full relative ${isAutoEnabled ? 'bg-[#f8d521]' : 'bg-[#1e1e24]'}`}
                    onClick={() => setIsAutoEnabled(!isAutoEnabled)}
                  >
                    <div className={`w-5 h-5 rounded-full absolute top-0 transition-all ${
                      isAutoEnabled ? 'left-5 bg-black' : 'left-0 bg-[#8f8f92]'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'auto' && (
            <div className="text-center py-4">
              Auto trading content would go here
            </div>
          )}

          {/* Auto Settings */}
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center text-[#8f8f92]">
              <span>Auto (22.5%)</span>
              <span className="ml-2 text-white">0.006</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-[#8f8f92]">OFF</span>
              <div className="w-10 h-5 bg-[#1e1e24] rounded-full relative">
                <div className="w-5 h-5 bg-[#8f8f92] rounded-full absolute right-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;