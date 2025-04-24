"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TokenChart from "@/components/token/TokenChart";
import TokenInfo from "@/components/token/TokenInfo";
import TokenTabs from "@/components/token/TokenTabs";
import PairSelector from "@/components/token/PairSelector";
import TokenTransactions from "@/components/token/TokenTransactions";
import TokenHolders from "@/components/token/TokenHolders";
import TokenSnipers from "@/components/token/TokenSnipers";
import TokenHolderInsights from "@/components/token/TokenHolderInsights";

import { Pair, Token } from "@/lib/tokenTypes";

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const PATH_TO_CHAIN_ID: Record<string, string> = {
  ethereum: "0x1",
  binance: "0x38",
  bsc: "0x38",
  polygon: "0x89",
  solana: "solana",
  arbitrum: "0xa4b1",
  base: "0x2105",
  avalanche: "0xa86a",
  optimism: "0xa",
  linea: "0xe708",
  fantom: "0xfa",
  pulse: "0x171",
  ronin: "0x7e4",
};



export type TokenMeta = {
  address: string;
  name: string;
  symbol: string;
  logo: string | undefined; // Change from string | null to string | undefined
  decimals: string;
};
export type PairData = {
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

const TokenPage: React.FC = () => {
  const params = useParams();
  const chainPath = params.chain;
  const tokenAddress = params.address;

  const [loadingState, setLoadingState] = useState<"initial" | "data" | "complete">("initial");
  const [tokenInfo, setTokenInfo] = useState<TokenMeta | null>(null);
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [selectedPair, setSelectedPair] = useState<Pair | null>(null);
  const [activeTab, setActiveTab] = useState<string>("transactions");
  const [timeFrame, setTimeFrame] = useState<string>("1h");
  const [error, setError] = useState<string | null>(null);

  const getApiChainId = (chainPath?: string): string => {
    return PATH_TO_CHAIN_ID[chainPath ?? ""] || chainPath || "";
  };

  const chainId = getApiChainId(Array.isArray(chainPath) ? chainPath[0] : chainPath);
  const isSolana = chainId === "solana";

  useEffect(() => {
    setLoadingState("initial");
    const minLoadTimer = setTimeout(() => setLoadingState("data"), 300);
    return () => clearTimeout(minLoadTimer);
  }, [chainPath, tokenAddress]);

  useEffect(() => {
    const fetchTokenPairs = async () => {
      try {
        let url: string;

        if (isSolana) {
          url = `https://solana-gateway.moralis.io/token/mainnet/${tokenAddress}/pairs`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/pairs?chain=${chainId}`;
        }

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          },
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        const pairsData = data.pairs || [];

        const normalizedPairs: Pair[] = pairsData.map((pair: PairData) => ({
          chainId,
          pairAddress: pair.pairAddress,
          exchangeName: pair.exchangeName,
          exchangeLogo: pair.exchangeLogo,
          pairLabel: pair.pairLabel,
          liquidityUsd: pair.liquidityUsd,
          usdPrice: pair.usdPrice,
          usdPrice24hrPercentChange: pair.usdPrice24hrPercentChange,
          volume24hrUsd: pair.volume24hrUsd,
          baseToken: {
            ...pair.baseToken,
            symbol: pair.baseToken.tokenSymbol,
            address: pair.baseToken.tokenAddress
          },
          quoteToken: {
            ...pair.quoteToken,
            symbol: pair.quoteToken.tokenSymbol,
            address: pair.quoteToken.tokenAddress
          },
          pair: Array.isArray(pair.pair)
            ? pair.pair.map((token: Token) => ({
                ...token,
                symbol: token.tokenSymbol,
                address: token.tokenAddress
              }))
            : [],
        }));

        setPairs(normalizedPairs);
        setSelectedPair(normalizedPairs[0]);

        if (!tokenInfo && normalizedPairs[0]?.pair?.length > 0) {
          const currentToken = normalizedPairs[0].pair.find(
            (token) => typeof tokenAddress === "string" && token.tokenAddress?.toLowerCase() === tokenAddress.toLowerCase()
          );
          const fallbackToken = normalizedPairs[0].pair[0];
          setTokenInfo({
            address: Array.isArray(tokenAddress) ? tokenAddress[0] : tokenAddress || '',
            name: currentToken?.tokenName || fallbackToken?.tokenName || `Token ${tokenAddress?.slice(0, 6)}...`,
            symbol: currentToken?.tokenSymbol || fallbackToken?.tokenSymbol || "TOKEN",
            logo: currentToken?.tokenLogo || fallbackToken?.tokenLogo || undefined,
            decimals: currentToken?.tokenDecimals || fallbackToken?.tokenDecimals || "18",
          });
        }

        setLoadingState("complete");
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching token pairs:", err);
          setError(`Error loading token data: ${err.message}`);
        } else {
          console.error("Unknown error fetching token pairs:", err);
          setError("An unknown error occurred while loading token data.");
        }
        setLoadingState("complete");
      }
    };

    if (tokenAddress && chainId && loadingState === "data") {
      fetchTokenPairs();
    }
  }, [chainId, tokenAddress, tokenInfo, isSolana, loadingState]);

  const handlePairSelect = (pairAddress: string) => {
    const pair = pairs.find((p) => p.pairAddress === pairAddress);
    if (pair) setSelectedPair(pair);
  };

  const handleTimeFrameChange = (newTimeFrame: string) => {
    setTimeFrame(newTimeFrame);
  };

  useEffect(() => {
    if (isSolana && activeTab === "holders") {
      setActiveTab("transactions");
    }
  }, [isSolana, activeTab]);

  if (loadingState !== "complete") {
    return (
      <div className="flex-1 relative h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dex-blue mx-auto mb-4"></div>
            <div className="text-xl text-dex-text-secondary">Loading token data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-xl text-dex-text-secondary">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-dark:bg-[#111111]">
      <div className="flex flex-col lg:flex-row h-[70vh]">
        <div className="flex-1 p-4">
          <TokenChart pair={selectedPair} timeFrame={timeFrame} onTimeFrameChange={handleTimeFrameChange} />
        </div>
        <div className="w-full lg:w-80 xl:w-96 border-l border-dex-border overflow-y-auto">
          {pairs.length > 1 && (
            <div className="border-b border-dex-border p-4">
              <PairSelector pairs={pairs} selectedPair={selectedPair} onSelect={handlePairSelect} />
            </div>
          )}
          <TokenInfo token={tokenInfo} pair={selectedPair} timeFrame={timeFrame} chainId={chainId} />
        </div>
      </div>
      <div className="border-t border-dex-border">
        <TokenTabs activeTab={activeTab} onChange={setActiveTab} isSolana={isSolana} />
      </div>
      <div className="flex-1 overflow-auto">
        {activeTab === "transactions" && selectedPair && (
          <TokenTransactions pair={selectedPair} chainId={selectedPair.chainId} />
        )}
        {activeTab === "holders" && tokenInfo && <TokenHolders token={tokenInfo} chainId={chainId} />}
        {activeTab === "holder-insights" && tokenInfo && <TokenHolderInsights token={tokenInfo} chainId={chainId} />}
        {activeTab === "snipers" && tokenInfo && selectedPair && (
          <TokenSnipers token={tokenInfo} pair={selectedPair} chainId={chainId} />
        )}
      </div>
    </div>
  );
};

export default TokenPage;