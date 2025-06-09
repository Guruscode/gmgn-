import React, { useState, useEffect } from 'react';
import { Pair } from '@/lib/tokenTypes';
import { formatNumber, truncAddress, copyToClipboard } from '@/lib/utils';

interface TokenMeta {
  address: string;
  name: string;
  symbol: string;
  logo: string | undefined;
  decimals: string;
  holders?: number;
}

interface MobilePoolInfoProps {
  tokenInfo: TokenMeta | null;
  pair: Pair | null;
}

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const MobilePoolInfo: React.FC<MobilePoolInfoProps> = ({ tokenInfo, pair }) => {
  const [poolInfo, setPoolInfo] = useState<{
    totalSupply: number;
    holders: number;
    totalLiquidityUsd: number;
    marketCap: number;
    pairAddress: string;
    tokenCreator: string;
    tokenCreatorBalance: number;
    poolCreated: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoolInfo = async () => {
      if (!pair || !pair.pairAddress || !tokenInfo) {
        setError("No pair address provided");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let url;
        const isSolanaChain = pair.chainId === "solana";

        if (isSolanaChain) {
          url = `https://solana-gateway.moralis.io/token/mainnet/${tokenInfo.address}/metadata`;
        } else {
          url = `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${pair.chainId}&addresses[0]=${tokenInfo.address}`;
        }

        console.log('Fetching token metadata from:', url);

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
        console.log('Token metadata response:', data);

        const tokenData = isSolanaChain ? data : (Array.isArray(data) ? data[0] : data);
        console.log('Normalized token data:', tokenData);

        // Fetch holder count for all chains
        try {
          const analyticsUrl = `https://deep-index.moralis.io/api/v2.2/tokens/analytics?chain=${pair.chainId}&tokenAddress=${tokenInfo.address}`;
          console.log('Fetching token analytics from:', analyticsUrl);
          
          const analyticsResponse = await fetch(analyticsUrl, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'X-API-Key': API_KEY || "",
            },
          });

          if (analyticsResponse.ok) {
            const analyticsData = await analyticsResponse.json();
            console.log('Token analytics response:', analyticsData);
            if (analyticsData && typeof analyticsData === 'object') {
              const holderCount = analyticsData.totalHolders || 
                                analyticsData.holderCount || 
                                analyticsData.holders || 
                                (analyticsData.result && analyticsData.result.totalHolders) ||
                                0;
              console.log('Found holder count:', holderCount);
              tokenData.holders = holderCount;
            }
          }
        } catch (err) {
          console.warn('Error fetching token analytics:', err);
        }

        setPoolInfo({
          totalSupply: tokenData.totalSupply || tokenData.totalSupplyFormatted || tokenData.total_supply_formatted || 0,
          holders: tokenData.holders || tokenInfo.holders || 0,
          totalLiquidityUsd: pair.liquidityUsd || 0,
          marketCap: tokenData.marketCap || tokenData.market_cap || 0,
          pairAddress: pair.pairAddress,
          tokenCreator: tokenData.tokenCreator || tokenData.creator || "",
          tokenCreatorBalance: tokenData.tokenCreatorBalance || tokenData.creatorBalance || 0,
          poolCreated: tokenData.poolCreated || tokenData.created_at || tokenData.createdAt || "",
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching pool info:", err);
          setError(`Error loading pool data: ${err.message}`);
        } else {
          console.error("Unknown error fetching pool info:", err);
          setError("An unknown error occurred while loading pool data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPoolInfo();
  }, [pair, tokenInfo]);

  if (!tokenInfo || !pair) {
    return (
      <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
        <p className="text-[12px] dark:text-[#9AA0AA]">No pool information available</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
        <p className="text-[12px] dark:text-[#9AA0AA]">Loading pool information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
        <p className="text-[12px] dark:text-[#9AA0AA]">{error}</p>
      </div>
    );
  }

  const marketCap = pair.liquidityUsd ? pair.liquidityUsd * 2 : 0; // Estimate market cap as 2x liquidity

  return (
    <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
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
            ${formatNumber(poolInfo?.totalLiquidityUsd || 0)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              fill="#88D693"
              viewBox="0 0 12 12"
            >
              <path d="M8.333 4.667h-.38v-.762A1.887 1.887 0 006.047 2a1.887 1.887 0 00-1.904 1.905v.762h-.381A.764.764 0 003 5.43v3.81c0 .418.343.761.762.761h4.571c.42 0 .762-.343.762-.761v-3.81a.764.764 0 00-.762-.762zM6.047 8.096a.765.765 0 01-.761-.762c0-.42.343-.763.761-.763.42 0 .763.344.763.763 0 .419-.343.762-.763.762zM7.23 4.667H4.867v-.762c0-.648.533-1.18 1.18-1.18.649 0 1.182.532 1.182 1.18v.762z"></path>
            </svg>
          </p>
        </div>
        <div className="flex w-full justify-between item-center">
          <p>Market Cap</p>
          <p className="flex items-center">
            ${formatNumber(marketCap)}
          </p>
        </div>
        <div className="flex w-full justify-between item-center">
          <p>Holders</p>
          <p className="flex items-center">{formatNumber(poolInfo?.holders || 0)}</p>
        </div>
        <div className="flex w-full justify-between item-center">
          <p>Total supply</p>
          <p className="flex items-center">
            {formatNumber(poolInfo?.totalSupply || 0)}
          </p>
        </div>
        <div className="flex w-full justify-between item-center">
          <p>Pair</p>
          <p className="flex items-center">
            <span>{truncAddress(pair.pairAddress)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => copyToClipboard(pair.pairAddress)}
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
            <span>{truncAddress(poolInfo?.tokenCreator || '')}</span>
            <span>({formatNumber(poolInfo?.tokenCreatorBalance || 0)} SOL)</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => copyToClipboard(poolInfo?.tokenCreator || '')}
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
          <p className="flex items-center">{poolInfo?.poolCreated || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default MobilePoolInfo; 