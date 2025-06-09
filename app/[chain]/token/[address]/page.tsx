"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TokenChart from "@/components/token/TokenChart";
import MobileTokenChart from "@/components/token/MobileTokenChart";
import TokenInfo from "@/components/token/TokenInfo";
import TokenTabs from "@/components/token/TokenTabs";
import PairSelector from "@/components/token/PairSelector";
import TokenTransactions from "@/components/token/TokenTransactions";
import TokenHolders from "@/components/token/TokenHolders";
import TokenSnipers from "@/components/token/TokenSnipers";
import TokenHolderInsights from "@/components/token/TokenHolderInsights";
import Drawer from '@/components/common/drawer';
// import MobileTradingHeader from '@/components/trading/mobileTrading';
// import TradingHeader from '@/components/trading/trading';
import { BuyTab, DegenAudit, PoolInfo, SellTab } from '@/components/trading/rightBar';

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
  logo: string | undefined;
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
  const [isOpen, setIsOpen] = useState({
    buy: false,
    sell: false,
    info: false
  });

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
          exchangeName: pair.exchangeName || 'Unknown',
          exchangeLogo: pair.exchangeLogo,
          pairLabel: `${pair.baseToken.tokenSymbol || 'Unknown'}/${pair.quoteToken.tokenSymbol || 'Unknown'}`,
          liquidityUsd: pair.liquidityUsd || 0,
          usdPrice: pair.usdPrice,
          usdPrice24hrPercentChange: pair.usdPrice24hrPercentChange,
          volume24hrUsd: pair.volume24hrUsd,
          baseToken: {
            ...pair.baseToken,
            symbol: pair.baseToken.tokenSymbol || 'Unknown',
            address: pair.baseToken.tokenAddress
          },
          quoteToken: {
            ...pair.quoteToken,
            symbol: pair.quoteToken.tokenSymbol || 'Unknown',
            address: pair.quoteToken.tokenAddress
          },
          pair: Array.isArray(pair.pair)
            ? pair.pair.map((token: Token) => ({
                ...token,
                symbol: token.tokenSymbol || 'Unknown',
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
    <div className="">
      {/* Warning issue from Component A */}
      {selectedPair && selectedPair.liquidityUsd <= 10000 && (
        <div className="">
          <div className="text-risk flex justify-center items-center h-[40px] gap-1 bg-riskWarn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#FFD039" viewBox="0 0 14 14"><path fillRule="evenodd" clipRule="evenodd" d="M8.212 2.093a1.4 1.4 0 00-2.423 0L.517 11.198A1.4 1.4 0 001.73 13.3h10.544a1.4 1.4 0 001.211-2.101L8.212 2.093zM7.001 9.255a.7.7 0 01-.7-.7V5.6a.7.7 0 111.4 0v2.955a.7.7 0 01-.7.7zm.7 1.167a.7.7 0 11-1.4 0 .7.7 0 011.4 0z"></path></svg>
            <p className='text-[12px] font-[500]'>This token has low liquidity. Trade carefully!</p>
          </div>
        </div>
      )}

      <div className="md:block hidden">
        {/* <TradingHeader /> */}
        <div className="flex flex-col h-full bg-dark:bg-[#111111]">
          <div className="flex flex-col lg:flex-row h-[50vh]">
            <div className="flex-1 p-4">
              <TokenChart pair={selectedPair} timeFrame={timeFrame} onTimeFrameChange={handleTimeFrameChange} />
            </div>
            <div className="w-[300px] lg:w-50 xl:w-66 border-l border-dex-border">
              {pairs.length > 1 && (
                <div className="border-b border-dex-border">
         
                  <PairSelector pairs={pairs} selectedPair={selectedPair} onSelect={handlePairSelect} />
                  </div>
               
              )}
              <TokenInfo token={tokenInfo} pair={selectedPair} timeFrame={timeFrame} chainId={chainId} />
            </div>
          </div>
          <div className="border-t border-dex-border md:w-[calc(99vw-280px)]">
            <TokenTabs />
            
          </div>
          <div className="flex-1 md:w-[calc(99vw-280px)] md:h-[calc(10vh-16px)] border-l border-dex-border overflow-y-auto">
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
      </div>

      <div className="block md:hidden">
  <div className="flex flex-col h-full bg-dark:bg-[#111111]">
    {/* Chart Section */}
    <div className="border-t border-dex-border">
      <div className="min-h-[300px] w-full">
        <MobileTokenChart pair={selectedPair} timeFrame={timeFrame} />
      </div>
      <TokenTabs />
    </div>
    
    {/* Content Section */}
    <div className="flex-1 overflow-x-auto"> {/* Changed from overflow-x-scroll to overflow-x-auto */}
      <div className="w-full min-h-[50vh] p-2"> {/* Simplified sizing and padding */}
        {activeTab === "transactions" && selectedPair && (
          <TokenTransactions 
            pair={selectedPair} 
            chainId={selectedPair.chainId} 
          />
        )}
        {activeTab === "holders" && tokenInfo && (
          <TokenHolders 
            token={tokenInfo} 
            chainId={chainId} 
          />
        )}
      </div>
    </div>
  </div>
</div>

      {/* Mobile bottom navigation from Component A */}
      <div className="flex w-full fixed bottom-[0px] z-[40] dark:bg-[#17181b] md:hidden">
        <div className="flex w-full justify-around dark:bg-[#17181b] h-[56px]">
          <div
            onClick={() => setIsOpen((prev) => ({ ...prev, buy: true }))}
            className="flex flex-col justify-center items-center gap-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9AA0AA" viewBox="0 0 16 16"><path d="M8.353 15.677l5.528-8.483a.736.736 0 00-.197-1.006.696.696 0 00-.393-.122H8.945V.726C8.945.324 8.628 0 8.236 0a.705.705 0 00-.59.323L2.12 8.806a.736.736 0 00.197 1.006c.116.08.253.122.393.122h4.346v5.34c0 .401.317.726.709.726a.704.704 0 00.59-.323z"></path>
            </svg>
            <p className="text-[rgb(154,160,170)] text-[10px]">Buy</p>
          </div>

          <Drawer isOpen={isOpen.buy} onClose={() => setIsOpen((prev) => ({ ...prev, buy: false }))}>
            <BuyTab />
          </Drawer>

          <div onClick={() => setIsOpen((prev) => ({ ...prev, sell: true }))} className="flex flex-col justify-center items-center gap-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9AA0AA" viewBox="0 0 16 16"><g clipPath="url(#clip0_8080_562)"><path fillRule="evenodd" clipRule="evenodd" d="M1.131 7.134a1.6 1.6 0 000 2.263l5.657 5.657a1.6 1.6 0 002.263 0l6.058-6.058c.3-.3.468-.707.468-1.131V2.208a1.6 1.6 0 00-1.6-1.6H8.32a1.6 1.6 0 00-1.131.469L1.131 7.134zm10.069-.73a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z"></path></g><defs><clipPath id="clip0_8080_562"><rect width="16" height="16"></rect></clipPath></defs></svg>
            <p className="text-[rgb(154,160,170)] text-[10px]">Sell</p>
          </div>
          <Drawer isOpen={isOpen.sell} onClose={() => setIsOpen((prev) => ({ ...prev, sell: false }))}>
            <SellTab />
          </Drawer>

          <div onClick={() => setIsOpen((prev) => ({ ...prev, info: true }))}  className="flex flex-col justify-center items-center gap-[4px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9AA0AA" viewBox="0 0 16 16"><g clipPath="url(#clip0_8080_565)"><path d="M8 0C3.577 0 0 3.577 0 8s3.577 8 8 8 8-3.577 8-8-3.577-8-8-8zm0 12.571a1.146 1.146 0 01-1.143-1.142c0-.629.514-1.143 1.143-1.143s1.143.514 1.143 1.143c0 .628-.514 1.142-1.143 1.142zM9.143 8c0 .629-.514 1.143-1.143 1.143A1.146 1.146 0 016.857 8V4.571c0-.628.514-1.142 1.143-1.142s1.143.514 1.143 1.142V8z"></path></g><defs><clipPath id="clip0_8080_565"><rect width="16" height="16"></rect></clipPath></defs></svg>
            <p className="text-[rgb(154,160,170)] text-[10px]">Info</p>
          </div>
    
          <Drawer isOpen={isOpen.info} onClose={() => setIsOpen((prev) => ({ ...prev, info: false }))}>
            <>
            
            <PoolInfo pairAddress={selectedPair?.pairAddress} chainId={chainId} />
              <DegenAudit />
            </>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;