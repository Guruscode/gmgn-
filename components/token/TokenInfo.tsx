import React, { useState, useEffect, useRef } from "react";
import { Pair } from "@/lib/tokenTypes";
import Image from 'next/image';
import { copyToClipboard, truncAddress, formatNumber } from '@/lib/utils';

interface PairToken {
  tokenSymbol: string;
  amount?: number;
  totalSupply?: number;
}

interface TokenSnipersProps {
  pair: Pair | null;
  chainId: string;
  timeFrame?: string;
  token: {
    symbol: string;
    address: string;
    holders?: number;
    logo?: string;
  } | null;
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

interface PoolInfoData {
  totalLiquidityUsd: number;
  totalLiquiditySol: number;
  marketCap: number;
  holders: number;
  totalSupply: number;
  pairAddress: string;
  tokenCreator: string;
  tokenCreatorBalance: number;
  poolCreated: string;
}

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const TokenInfo: React.FC<TokenSnipersProps> = ({ token, pair, chainId }) => {
  const [pairStats, setPairStats] = useState<PairStats | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [poolInfo, setPoolInfo] = useState<PoolInfoData | null>(null);
  const [selectedTimeFrame] = useState("24h");
  const [loadingPoolInfo, setLoadingPoolInfo] = useState<boolean>(false);
  const [errorPoolInfo, setErrorPoolInfo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSolana, setIsSolana] = useState(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'auto'>('buy');
  const [amount, setAmount] = useState(0);
  const [amountPercentage, setAmountPercentage] = useState(0);
  const [isAutoEnabled, setIsAutoEnabled] = useState(false);

  const timeFrameMap: Record<string, string> = {
    "5m": "5min",
    "1h": "1h",
    "4h": "4h",
    "24h": "24h",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        // Scroll handling if needed
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
        const isSolanaChain = chainId === "solana";
        setIsSolana(isSolanaChain);

        if (isSolanaChain) {
          url = `https://solana-gateway.moralis.io/token/mainnet/${token.address}/metadata`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${chainId}&addresses[0]=${token.address}`;
        }

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          } as HeadersInit,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setTokenMetadata(
          isSolanaChain
            ? data
            : Array.isArray(data) && data.length > 0
            ? data[0]
            : null
        );
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

      try {
        let url;
        const isSolanaChain = chainId === "solana";

        if (isSolanaChain) {
          url = `https://solana-gateway.moralis.io/token/mainnet/pairs/${pair.pairAddress}/stats`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/pairs/${pair.pairAddress}/stats?chain=${chainId}`;
        }

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          } as HeadersInit,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setPairStats(data);
      } catch (err) {
        console.error("Error fetching pair stats:", err);
      }
    };

    fetchPairStats();
  }, [pair, chainId]);

  // Fetch pool info
  useEffect(() => {
    const fetchPoolInfo = async () => {
      if (!pair || !pair.pairAddress) {
        setErrorPoolInfo("No pair address provided");
        return;
      }

      setLoadingPoolInfo(true);
      setErrorPoolInfo(null);

      try {
        let url;
        const isSolanaChain = chainId === "solana";

        if (isSolanaChain) {
          url = `https://solana-gateway.moralis.io/token/mainnet/${pair.pairAddress}/pairs`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/erc20/${pair.pairAddress}/pairs?chain=${chainId}`;
        }

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const pairData =
          data.pairs?.find((p: Pair) => p.pairAddress === pair.pairAddress) ||
          data;

        const normalizedData: PoolInfoData = {
          totalLiquidityUsd: pairData.liquidityUsd || 0,
          totalLiquiditySol: pairData.liquiditySol || 0,
          marketCap: pairData.marketCap || 0,
          holders: pairData.holders || 0,
          totalSupply: pairData.totalSupply || 0,
          pairAddress: pairData.pairAddress || pair.pairAddress,
          tokenCreator: pairData.tokenCreator || "",
          tokenCreatorBalance: pairData.tokenCreatorBalance || 0,
          poolCreated: pairData.poolCreated || "",
        };

        setPoolInfo(normalizedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching pool info:", err);
          setErrorPoolInfo(`Error loading pool data: ${err.message}`);
        } else {
          console.error("Unknown error fetching pool info:", err);
          setErrorPoolInfo("An unknown error occurred while loading pool data.");
        }
      } finally {
        setLoadingPoolInfo(false);
      }
    };

    fetchPoolInfo();
  }, [pair, chainId]);

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

  const getMarketCapOrFDV = (type: "fdv" | "market_cap" = "fdv") => {
    if (isSolana) {
      return tokenMetadata?.fullyDilutedValue || 0;
    } else {
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

  const currentPeriodData = getTimePeriodData(selectedTimeFrame);

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

  const nativePrice = pairStats?.currentNativePrice || 0;
  const totalLiquidity = pairStats?.totalLiquidityUsd || pair?.liquidityUsd || 0;
  const marketCap = getMarketCapOrFDV();

  if (!token || !pair) {
    return (
      <div className="p-4 text-dex-text-secondary">No token data available</div>
    );
  }

  return (
    <div ref={containerRef} className="">
      {/* Token Header */}
      <div className="p-4 border-b ">
        <div className="flex items-center mb-3">
          <Image
            src={
              token.logo ||
              tokenMetadata?.logo ||
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg=="
            }
            alt={token.symbol}
            width={40}
            height={40}
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
              <h1 className="text-xl font-bold">{tokenMetadata?.name}</h1>
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
            <div>{token.holders ? formatNumber(token.holders) : "N/A"}</div>
          </div>
        </div>

        {/* Pair Liquidity */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
          {pair?.pair?.map((pairToken: PairToken, index) => {
            const amount = pairToken.amount || 0;
            const totalSupply = pairToken.totalSupply || 0;
            const percentage =
              totalSupply > 0 ? (amount / totalSupply * 100).toFixed(1) : "0.0";

            return (
              <div key={`${pairToken.tokenSymbol}-${index}`}>
                <div className="text-[#8f8f92]">{pairToken.tokenSymbol}</div>
                <div className="flex justify-between">
                  <span>
                    {formatNumber(amount)} / {formatNumber(totalSupply)}
                  </span>
                  <span>({percentage}%)</span>
                </div>
              </div>
            );
          })}
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
              className={`flex-1 py-2 font-medium ${
                activeTab === "buy" ? "bg-[#1e1e24]" : "bg-[#0e0e10]"
              }`}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 font-medium ${
                activeTab === "sell" ? "bg-[#1e1e24]" : "bg-[#0e0e10]"
              }`}
              onClick={() => setActiveTab("sell")}
            >
              🔥 Sell
            </button>
            <button
              className={`flex-1 py-2 font-medium ${
                activeTab === "auto" ? "bg-[#1e1e24]" : "bg-[#0e0e10]"
              }`}
              onClick={() => setActiveTab("auto")}
            >
              Auto
            </button>
          </div>

          {activeTab === "buy" && (
            <>
              {/* Buy Options */}
              <div className="flex mb-3">
                <button className="flex-1 mr-2 py-1.5 bg-[#1e1e24] rounded text-sm">
                  Buy Now
                </button>
                <button className="flex-1 mx-2 py-1.5 bg-[#1e1e24] rounded text-sm">
                  Buy Dip
                </button>
                <button className="flex-1 ml-2 py-1.5 bg-[#1e1e24] rounded text-sm">
                  Bai:--{quoteToken}
                </button>
              </div>

              {/* Amount Selection */}
              <div className="mb-4">
                <div className="text-xs text-[#8f8f92] mb-1">Amount</div>
                <div className="grid grid-cols-4 gap-2">
                  {[0.01, 0.1, 0.5, 1].map((value) => (
                    <button
                      key={value}
                      className={`py-1.5 rounded text-sm ${
                        amount === value
                          ? "bg-[#f8d521] text-black"
                          : "bg-[#1e1e24]"
                      }`}
                      onClick={() => setAmount(value)}
                    >
                      {value} {quoteToken}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Info */}
              <div className="text-center text-xs mb-4 text-[#8f8f92]">
                1 {quoteToken} ≈{" "}
                {nativePrice ? formatNumber(1 / nativePrice) : "0"}{" "}
                {token.symbol}
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
                <button className="w-full mt-2 py-1 bg-[#1e1e24] rounded text-sm">
                  + Add
                </button>
              </div>

              {/* Buy Button */}
              <div
                className={`${
                  activeTab == "buy"
                    ? "bg-prettyGreen dark:text-black"
                    : ""
                } flex h-[32px] text-[12px] text-accent-aux-1 bg-[#111111] w-fullrounded-[6px] justify-center items-center gap-[4px] cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.408 18.657l6.378-9.566a.818.818 0 00-.68-1.272H11.09V1.796a.818.818 0 00-1.499-.454L3.214 10.91a.818.818 0 00.68 1.272H8.91v6.023a.818.818 0 001.498.453z"></path>
                </svg>
                Buy
              </div>
            </>
          )}
          {activeTab === "sell" && (
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
                          ? "bg-[#f8d521] text-black"
                          : "bg-[#1e1e24]"
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

           
            </div>
          )}
          {activeTab === "auto" && (
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
              <span className="mr-2 text-[#8f8f92]">
                {isAutoEnabled ? "ON" : "OFF"}
              </span>
              <button
                className={`w-10 h-5 rounded-full relative ${
                  isAutoEnabled ? "bg-[#f8d521]" : "bg-[#1e1e24]"
                }`}
                onClick={() => setIsAutoEnabled(!isAutoEnabled)}
              >
                <div
                  className={`w-5 h-5 rounded-full absolute top-0 transition-all ${
                    isAutoEnabled ? "left-5 bg-black" : "left-0 bg-[#8f8f92]"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px]">
            <div className="bg-transparent rounded-[12px] inline-flex items-center flex-wrap gap-[0px] w-full">
              <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                <div className="flex justify-center dark:text-[#9AA0AA] w-full">
                  1m
                </div>
                <div className="text-[12px] flex dark:text-[9AA0AA]">
                  <div className="flex text-accent-green w-full justify-center font-[500]">
                    +0.87%
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                <div className="flex justify-center dark:text-[#9AA0AA] w-full">
                  5m
                </div>
                <div className="text-[12px] flex dark:text-[9AA0AA]">
                  <div className="flex text-accent-green w-full justify-center font-[500]">
                    +4.87%
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                <div className="flex justify-center dark:text-[#9AA0AA] w-full">
                  1h
                </div>
                <div className="text-[12px] flex dark:text-[9AA0AA]">
                  <div className="flex text-accent-red w-full justify-center font-[500]">
                    -12.87%
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-accent-3">
                <div className="flex justify-center dark:text-[#9AA0AA] w-full">
                  24h
                </div>
                <div className="text-[12px] flex dark:text-[9AA0AA]">
                  <div className="flex text-accent-green w-full justify-center font-[500]">
                    +223.7%
                  </div>
                </div>
              </div>
            </div>

            {/* bottom side */}
            <div className="flex justify-between pb-[8px] px-[12px] text-[12px] mt-[6px]">
              <div className="flex flex-col gap-4">
                <div className="flex text-accent-aux-1 justify-start w-full">
                  Vol
                </div>
                <div className="flex w-full justify-start font-[500]">
                  $21.1K
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex text-accent-aux-1 justify-start w-full">
                  Buys
                </div>
                <div className="flex w-full text-accent-green justify-start font-[500]">
                  $21.1K
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex text-accent-aux-1 justify-start w-full">
                  Sells
                </div>
                <div className="flex w-full text-accent-red justify-start font-[500]">
                  $21.1K
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex text-accent-aux-1 justify-start w-full">
                  Net Buy
                </div>
                <div className="flex w-full justify-start font-[500] text-accent-green">
                  $21.1K
                </div>
              </div>
            </div>
          </div>
             {/* Pool Info Section */}
             <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
                {loadingPoolInfo ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dex-blue mx-auto mb-2"></div>
                    <p className="text-[12px] dark:text-[#9AA0AA]">
                      Loading pool info...
                    </p>
                  </div>
                ) : errorPoolInfo || !poolInfo ? (
                  <p className="text-[12px] dark:text-[#9AA0AA]">
                    {errorPoolInfo || "No pool information available"}
                  </p>
                ) : (
                  <>
                    <div className="w-full flex justify-between items-center pb-2">
                      <h2 className="text-white text-[14px]">Pool info</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        fill="#9AA0AA"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zM6.465 5.501a.386.386 0 00-.266.11L4.39 7.42a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.109l1.81-1.81a.188.188 0 00-.133-.32H6.465zm0 6.758a.376.376 0 00-.266.11l-1.81 1.81a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.11l1.81-1.81a.188.188 0 00-.133-.32H6.465zm7.487-3.289a.376.376 0 00-.266-.11H4.522a.188.188 0 00-.133.321l1.81 1.81c.07.07.165.11.266.11h9.164a.188.188 0 00.133-.32l-1.81-1.81z"
                        ></path>
                      </svg>
                    </div>
                    <div className="w-full text-[12px] dark:text-[#9AA0AA] space-y-2">
                      <div className="flex w-full justify-between item-center">
                        <p>Total liq</p>
                        <p className="flex items-center">
                        <div>${formatNumber(totalLiquidity)}</div>
                          
                        </p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Market Cap</p>
                        <p className="flex items-center">
                        <div>${formatNumber(marketCap)}</div>
                        </p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Holders</p>
                        <p className="flex items-center">{poolInfo.holders}</p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Total supply</p>
                        <p className="flex items-center">
                          {formatNumber(poolInfo.totalSupply)}
                        </p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Pair</p>
                        <p className="flex items-center">
                          <span>{truncAddress(poolInfo.pairAddress)}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                            onClick={() => copyToClipboard(poolInfo.pairAddress)}
                            width="12px"
                            height="12px"
                            fill="#5C6068"
                            viewBox="0 0 12 12"
                          >
                            <g clipPath="url(#clip0_6972_490)">
                              <path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path>
                              <path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_6972_490">
                                <rect width="12" height="12"></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Token creator</p>
                        <p className="flex items-center">
                          <span>{truncAddress(poolInfo.tokenCreator)}</span>
                          <span>
                            ({poolInfo.tokenCreatorBalance.toFixed(1)} SOL)
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(poolInfo.tokenCreator)
                            }
                            width="12px"
                            height="12px"
                            fill="#5C6068"
                            viewBox="0 0 12 12"
                            >
                            <g clipPath="url(#clip0_6972_490)">
                              <path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path>
                              <path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_6972_490">
                                <rect width="12" height="12"></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                      </div>
                      <div className="flex w-full justify-between item-center">
                        <p>Pool created</p>
                        <p className="flex items-center">
                          {poolInfo.poolCreated}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;