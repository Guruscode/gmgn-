"use client";
import React, { useState, useEffect, useCallback } from "react";

import WalletManager from "./portfolio/WalletManager";
import NetWorthCard from "./portfolio/NetWorthCard";
import ChainSelector from "./portfolio/ChainSelector";
import TokenHoldings from "./portfolio/TokenHoldings";
import { Wallet, Token } from '@/lib/wallet';

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;




type ChainInfo = {
  chain: string;
  networth_usd: string;
};

// type Token = {
//   token_address: string;
//   usd_value?: string;
//   symbol?: string;
//   name?: string;
//   logo?: string;
//   chain: string;
// } & Record<string, unknown>;

type NetWorthData = {
  total_networth_usd: string;
  chains: ChainInfo[];
};

const SUPPORTED_CHAINS: { id: string; name: string; icon: string; color: string }[] = [
  { id: "eth", name: "Ethereum", icon: "💎", color: "#627EEA" },
  { id: "bsc", name: "BSC", icon: "🔶", color: "#F3BA2F" },
  { id: "polygon", name: "Polygon", icon: "🟣", color: "#8247E5" },
  { id: "arbitrum", name: "Arbitrum", icon: "🔵", color: "#28A0F0" },
  { id: "avalanche", name: "Avalanche", icon: "❄️", color: "#E84142" },
  { id: "optimism", name: "Optimism", icon: "⚡", color: "#FF0420" },
  { id: "base", name: "Base", icon: "🅱️", color: "#0052FF" },
  { id: "fantom", name: "Fantom", icon: "👻", color: "#1969FF" },
  { id: "linea", name: "Linea", icon: "🔗", color: "#000000" },
  { id: "pulse", name: "Pulse", icon: "💡", color: "#000000" },
  { id: "ronin", name: "Ronin", icon: "🔥", color: "#000000" },
];

const PortfolioPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [netWorth, setNetWorth] = useState<NetWorthData | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedWallets = localStorage.getItem("portfolioWallets");
      if (savedWallets) {
        const parsedWallets: Wallet[] = JSON.parse(savedWallets);
        setWallets(parsedWallets);
        if (parsedWallets.length > 0 && !selectedWallet) {
          setSelectedWallet(parsedWallets[0]);
        }
      }
    } catch (err) {
      console.error("Error parsing saved wallets:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (wallets.length > 0) {
      localStorage.setItem("portfolioWallets", JSON.stringify(wallets));
    }
  }, [wallets]);

  const fetchNetWorth = useCallback(async () => {
    if (!selectedWallet) return;

    setLoading(true);
    setError(null);

    try {
      const chainParams = SUPPORTED_CHAINS.map(
        (chain, index) => `chains[${index}]=${chain.id}`
      ).join("&");

      const url = `https://deep-index.moralis.io/api/v2.2/wallets/${selectedWallet.address}/net-worth?${chainParams}&exclude_spam=true&exclude_unverified_contracts=true`;

      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-Key": API_KEY!,
        },
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data: NetWorthData = await response.json();
      setNetWorth(data);

      if (selectedChain === "all" && data.chains?.length) {
        const sortedChains = [...data.chains].sort(
          (a, b) => parseFloat(b.networth_usd) - parseFloat(a.networth_usd)
        );
        fetchTokens(selectedWallet.address, sortedChains[0].chain);
      }
    } catch (err) {
      console.error("Error fetching wallet net worth:", err);
      setError("Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  }, [selectedWallet, selectedChain]);

  useEffect(() => {
    fetchNetWorth();
  }, [selectedWallet, selectedChain, fetchNetWorth]);

  useEffect(() => {
    if (selectedWallet) {
      if (selectedChain === "all") {
        if (netWorth?.chains?.length) {
          const sortedChains = [...netWorth.chains].sort(
            (a, b) => parseFloat(b.networth_usd) - parseFloat(a.networth_usd)
          );
          fetchTokens(selectedWallet.address, sortedChains[0].chain);
        }
      } else {
        fetchTokens(selectedWallet.address, selectedChain);
      }
    }
  }, [selectedWallet, selectedChain, netWorth]);

  const fetchTokens = async (address: string, chain: string) => {
    setLoading(true);
    try {
      const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=${chain}`;
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-Key": API_KEY!,
        },
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const tokensWithChain: Token[] = data.result.map((token: Token) => ({
        ...token,
        chain,
      }));

      const sortedTokens = tokensWithChain.sort(
        (a, b) => parseFloat(b.usd_value || "0") - parseFloat(a.usd_value || "0")
      );

      setTokens(sortedTokens);
    } catch (err) {
      console.error("Error fetching wallet tokens:", err);
      setError("Failed to load token data");
    } finally {
      setLoading(false);
    }
  };

  const addWallet = (wallet: Wallet): boolean => {
    if (
      wallets.some(
        (w) => w.address.toLowerCase() === wallet.address.toLowerCase()
      )
    ) {
      return false;
    }
    const updatedWallets = [...wallets, wallet];
    setWallets(updatedWallets);
    setSelectedWallet(wallet);
    return true;
  };

  const removeWallet = (address: string) => {
    const updatedWallets = wallets.filter(wallet => wallet.address !== address);
    setWallets(updatedWallets);
    if (selectedWallet?.address === address) {
      setSelectedWallet(updatedWallets.length > 0 ? updatedWallets[0] : null);
    }
  };

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };

  const handleChainSelect = (chainId: string) => {
    setSelectedChain(chainId);
  };

  const handleTokenClick = (token: Token, chain: string) => {
    if (chain === "all" || token.token_address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      console.log('Cannot navigate: chain is "all" or token is native');
      return;
    }

    const getTokenPath = (chain: string, address: string): string => {
      const chainPathMap: Record<string, string> = {
        eth: "ethereum",
        bsc: "bsc",
        polygon: "polygon",
        arbitrum: "arbitrum",
        avalanche: "avalanche",
        optimism: "optimism",
        base: "base",
        fantom: "fantom",
      };
      return `/${chainPathMap[chain] || chain}/${address}`;
    };

    const path = getTokenPath(chain, token.token_address);
    window.location.href = path; // Replace with router push if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          
        <WalletManager
      wallets={wallets.map(wallet => ({
        address: wallet.address,
        name: wallet.name || "Default Name",
        addedAt: wallet.addedAt || new Date().toISOString(),
      }))}
      selectedWallet={selectedWallet ? {
        address: selectedWallet.address,
        name: selectedWallet.name || "Default Name",
        addedAt: selectedWallet.addedAt || new Date().toISOString(),
      } : null}
      onAddWallet={addWallet}
      onRemoveWallet={removeWallet}
      onSelectWallet={handleWalletSelect}
    />


        </div>
        <div className="lg:col-span-2">
          {selectedWallet ? (
            <>
              <NetWorthCard netWorth={netWorth} loading={loading} error={error} />
              <ChainSelector
                chains={netWorth?.chains || []}
                selectedChain={selectedChain}
                onChainSelect={handleChainSelect}
              />
              <TokenHoldings
                tokens={tokens}
                loading={loading}
                error={error}
                onTokenClick={handleTokenClick}
                selectedChain={selectedChain}
              />
            </>
          ) : (
            <div className="bg-dex-bg-secondary rounded-lg p-6 text-center">
              <p className="text-dex-text-secondary text-lg">
                Please add a wallet to view your portfolio
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;