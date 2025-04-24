import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface Token {
  address: string;
  symbol?: string;
  name?: string;
}

interface Holder {
  owner_address: string;
  is_contract: boolean;
  owner_address_label?: string;
  entity_logo?: string;
  entity?: string;
  balance_formatted: string;
  usd_value?: number | string;
  percentage_relative_to_total_supply?: number;
}

interface TokenHoldersProps {
  token: Token | null;
  chainId: string;
}

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const TokenHolders: React.FC<TokenHoldersProps> = ({ token, chainId }) => {
  const [holders, setHolders] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableHeight, setTableHeight] = useState(400);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef<HTMLTableElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

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

  const isSolana = chainId === "solana";

  useEffect(() => {
    const resizeHandle = resizeRef.current;
    if (!resizeHandle) return;

    const onMouseDown = (e: MouseEvent) => {
      startYRef.current = e.clientY;
      startHeightRef.current = tableHeight;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY;
      const newHeight = Math.max(200, startHeightRef.current + deltaY);
      setTableHeight(newHeight);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    resizeHandle.addEventListener("mousedown", onMouseDown);
    return () => {
      resizeHandle.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [tableHeight]);

  const fetchHolders = useCallback(
    async (nextCursor: string | null = null) => {
      if (!token || !token.address || isSolana) return;

      setLoading(true);
      try {
        let url = `https://deep-index.moralis.io/api/v2.2/erc20/${token.address}/owners?chain=${chainId}&order=DESC`;
        if (nextCursor) url += `&cursor=${nextCursor}`;

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            "X-API-Key": API_KEY!,
          },
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        if (data && data.result) {
          setHolders((prev) =>
            nextCursor ? [...prev, ...data.result] : data.result
          );
          setCursor(data.cursor);
          setHasMore(data.result.length > 0 && !!data.cursor);
        }
      } catch (err) {
        console.error("Error fetching holders:", err);
        setError("Failed to load holders data");
      } finally {
        setLoading(false);
      }
    },
    [token, chainId, isSolana]
  );

  useEffect(() => {
    if (token && token.address && !isSolana) {
      fetchHolders();
    }
  }, [token, chainId, fetchHolders, isSolana]);

  const loadMore = () => {
    if (cursor && hasMore && !loading) {
      fetchHolders(cursor);
    }
  };

  const formatWalletAddress = (address: string | undefined) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  const getWalletExplorerUrl = (walletAddress: string) => {
    const explorer = blockExplorers[chainId] || "";
    return `${explorer}/address/${walletAddress}`;
  };

  const formatNumber = (num: number | string | undefined, decimals = 0) => {
    if (num == null) return "0";
    const parsed = typeof num === "string" ? parseFloat(num) : num;
    return parsed.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatUsd = (value: number | string | undefined) => {
    if (!value) return "$0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const formatPercentage = (value: number | undefined) => {
    if (!value) return "0%";
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  if (isSolana)
    return (
      <div className="p-4 text-center text-dex-text-secondary">
        Holder data is not available for Solana tokens
      </div>
    );

  if (!token)
    return (
      <div className="p-4 text-center text-dex-text-secondary">
        No token data available
      </div>
    );

  if (loading && holders.length === 0)
    return (
      <div className="p-4 text-center text-dex-text-secondary">
        Loading holders data...
      </div>
    );

  if (error && holders.length === 0)
    return (
      <div className="p-4 text-center text-dex-text-secondary">{error}</div>
    );

  return (
    <div className="flex flex-col w-full">
      <div
        className="overflow-auto border border-dex-border bg-dex-bg-primary"
        style={{ height: `${tableHeight}px` }}
      >
        <table ref={tableRef} className="w-full text-sm text-left border-collapse">
          <thead className="text-xs uppercase bg-dex-bg-secondary sticky top-0 z-10">
            <tr className="border-b border-dex-border">
              <th className="px-4 py-3">RANK</th>
              <th className="px-4 py-3">WALLET</th>
              <th className="px-4 py-3">ENTITY</th>
              <th className="px-4 py-3">TYPE</th>
              <th className="px-4 py-3 text-right">BALANCE</th>
              <th className="px-4 py-3 text-right">VALUE (USD)</th>
              <th className="px-4 py-3 text-right">% OF SUPPLY</th>
              <th className="px-4 py-3 text-right">EXP</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder, index) => (
              <tr key={`${holder.owner_address}_${index}`} className="border-b border-dex-border hover:bg-dex-bg-secondary/50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <a
                    href={getWalletExplorerUrl(holder.owner_address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono hover:text-dex-blue flex items-center"
                  >
                    <span className="bg-dex-bg-tertiary text-dex-text-primary px-1 rounded mr-1">
                      {holder.is_contract ? "📄" : "👤"}
                    </span>
                    {formatWalletAddress(holder.owner_address)}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {holder.owner_address_label ? (
                    <div className="flex items-center">
                      {holder.entity_logo && (
                        <Image
                          src={holder.entity_logo}
                          alt={holder.entity || "Entity"}
                          width={16}
                          height={16}
                          className="mr-1 rounded-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      )}
                      <span className="text-dex-text-primary">{holder.owner_address_label}</span>
                    </div>
                  ) : (
                    <span className="text-dex-text-secondary">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {holder.is_contract ? (
                    <span className="bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded text-xs">Contract</span>
                  ) : (
                    <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded text-xs">Wallet</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  {formatNumber(holder.balance_formatted, 4)}
                </td>
                <td className="px-4 py-3 text-right">{formatUsd(holder.usd_value)}</td>
                <td className="px-4 py-3 text-right">
                  {formatPercentage(holder.percentage_relative_to_total_supply)}
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={getWalletExplorerUrl(holder.owner_address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-dex-text-secondary hover:text-dex-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-2 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-dex-bg-secondary hover:bg-dex-blue/20 text-dex-text-primary rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <div
        ref={resizeRef}
        className="h-2 bg-dex-bg-secondary hover:bg-dex-blue cursor-ns-resize flex items-center justify-center"
      >
        <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default TokenHolders;
