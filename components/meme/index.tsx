"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import NewTokenCard from "./new/NewTokenCard";
import BondingTokenCard from "./new/BondingTokenCard";
import GraduatedTokenCard from "./new/GraduatedTokenCard";
import UtilityBar from "./utilityBar";
import { Token } from '@/lib/utils';

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

// interface Token {
//   tokenAddress: string;
//   price?: string;
//   liquidity?: string;
//   marketCap?: string;
//   createdAt?: string;
//   isNew?: boolean; // Updated to match the usage
//   [key: string]: string | number | boolean | undefined;
// }

const PumpFunPage: React.FC = () => {
  const [newTokens, setNewTokens] = useState<Token[]>([]);
  const [bondingTokens, setBondingTokens] = useState<Token[]>([]);
  const [graduatedTokens, setGraduatedTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTokensIds, setNewTokensIds] = useState<Set<string>>(new Set());
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const [switchTabs, setSwitch] = useState('1');

  // Fetch tokens using useCallback to avoid dependency warnings
  const fetchNewTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/new?limit=100",
        {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          },
        }
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      const incomingTokens: Token[] = data.result || [];
      const previousTokenIds = new Set(newTokensIds);
  
      setNewTokensIds(
        new Set([
          ...previousTokenIds,
          ...incomingTokens.map((token) => token.tokenAddress),
        ])
      );
  
      const brandNewTokens = incomingTokens.filter(
        (token) => !previousTokenIds.has(token.tokenAddress)
      );
  
      const tokensWithFlag = incomingTokens.map((token) => ({
        ...token,
        isNew: brandNewTokens.some(
          (newToken) => newToken.tokenAddress === token.tokenAddress
        ),
      }));
  
      setNewTokens(tokensWithFlag);
    } catch (err) {
      console.error("Error fetching new tokens:", err);
      throw err;
    }
  }, [newTokensIds]);

  const fetchBondingTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/bonding?limit=100",
        {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          },
        }
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setBondingTokens(data.result || []);
    } catch (err) {
      console.error("Error fetching bonding tokens:", err);
      throw err;
    }
  }, []);

  const fetchGraduatedTokens = useCallback(async () => {
    try {
      const response = await fetch(
        "https://solana-gateway.moralis.io/token/mainnet/exchange/pumpfun/graduated?limit=100",
        {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY || "",
          },
        }
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setGraduatedTokens(data.result || []);
    } catch (err) {
      console.error("Error fetching graduated tokens:", err);
      throw err;
    }
  }, []);

  const fetchAllTokens = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchNewTokens(),
        fetchBondingTokens(),
        fetchGraduatedTokens(),
      ]);
    } catch (err) {
      console.error("Error fetching pump.fun tokens:", err);
      setError("Failed to load pump.fun tokens. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchNewTokens, fetchBondingTokens, fetchGraduatedTokens]);

  useEffect(() => {
    fetchAllTokens();
    pollingInterval.current = setInterval(fetchAllTokens, 30000);
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [fetchAllTokens]);

  const handleTokenClick = (token: Token) => {
    console.log(token);  // Or perform your navigation or any other action
    // navigate(`/solana/${token.tokenAddress}`);
  };
  

  const formatPrice = (price?: string): string => {
    if (!price) return "$0";
    const numPrice = parseFloat(price);
    if (numPrice < 0.000001) return "$" + numPrice.toExponential(4);
    if (numPrice < 0.001) return "$" + numPrice.toFixed(8);
    if (numPrice < 1) return "$" + numPrice.toFixed(6);
    return "$" + numPrice.toFixed(4);
  };

  const formatNumber = (num?: string): string => {
    if (!num) return "$0";
    const numValue = parseFloat(num);
    if (numValue >= 1_000_000) return `$${(numValue / 1_000_000).toFixed(2)}M`;
    if (numValue >= 1_000) return `$${(numValue / 1_000).toFixed(2)}K`;
    return `$${numValue.toFixed(2)}`;
  };

  const formatTimeAgo = (dateString?: string): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const ColumnHeader = ({ title, icon, borderColor }: { title: string; icon: string; borderColor: string }) => (
    <div className={`p-4 flex justify-between items-center border-b-2 ${borderColor}`}>
      <div className="flex items-center text-white font-semibold">
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="flex items-center text-gray-400">
        <span className="mr-2">Filter</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="bg-accent-2 text-white min-h-screen">
      <UtilityBar setSwitch={setSwitch} switchTabs={switchTabs} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-full mx-auto">
        {/* New Tokens Column */}
        <div className="border border-gray-800 bg-accent-2 m-4 rounded-lg">
          <ColumnHeader title="New Pool" icon="🔥" borderColor="" />
          <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
            {loading && newTokens.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 m-4 rounded-lg">
                {error}
              </div>
            ) : (
              newTokens.map((token) => (
                <NewTokenCard
                  key={token.tokenAddress}
                  token={token}
                  formatPrice={formatPrice}
                  formatNumber={formatNumber}
                  formatTimeAgo={formatTimeAgo}
                  onClick={() => handleTokenClick(token)} // Using token here
                />
              ))
            )}
          </div>
        </div>
  
        {/* Bonding Tokens Column */}
        <div className="border border-gray-800 bg-accent-2 m-4 rounded-lg">
          <ColumnHeader title="Completing" icon="⚡" borderColor="" />
          <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
            {loading && bondingTokens.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 m-4 rounded-lg">
                {error}
              </div>
            ) : (
              bondingTokens.map((token) => (
                <BondingTokenCard
                  key={token.tokenAddress}
                  token={token}
                  formatPrice={formatPrice}
                  formatNumber={formatNumber}
                  onClick={() => handleTokenClick(token)} // Using token here
                />
              ))
            )}
          </div>
        </div>
  
        {/* Graduated Tokens Column */}
        <div className="border border-gray-800 bg-accent-2 m-4 rounded-lg">
          <ColumnHeader title="Completed" icon="🎓" borderColor="" />
          <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
            {loading && graduatedTokens.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 m-4 rounded-lg">
                {error}
              </div>
            ) : (
              graduatedTokens.map((token) => (
                <GraduatedTokenCard
                key={token.tokenAddress}
                token={token}
                formatNumber={formatNumber}
                onClick={() => handleTokenClick(token)} // No need for formatPrice here
              />

              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PumpFunPage;
