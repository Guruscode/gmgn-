import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pair } from "@/lib/tokenTypes";
// import { Checkbox } from "@/components/ui/checkbox"
import { formatPriceWithColor, getBaseTokenValue, formatValueWithColor } from '@/lib/utils';
interface Token {
  symbol: string;
  address: string;
}

interface Transaction {
  transactionHash: string;
  transactionType: string;
  baseTokenAmount: string;
  quoteTokenAmount: string;
  totalValueUsd: string;
  baseTokenPriceUsd: string;
  blockTimestamp: string;
  walletAddress: string;
}

interface PairData {
  baseToken?: Token;
  quoteToken?: Token;
  pairLabel?: string;
}

interface TokenTransactionsProps {
  pair: Pair | null;
  chainId: string;
}

const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

const TokenTransactions: React.FC<TokenTransactionsProps> = ({ pair, chainId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTransactionIds, setNewTransactionIds] = useState<Set<string>>(new Set());
  const [, setPairData] = useState<PairData | null>(null);
  const [tableHeight] = useState(500); // Default height
  const pollInterval = useRef<NodeJS.Timeout | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  // const resizeRef = useRef<HTMLDivElement>(null);


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

  const fetchTransactions = useCallback(async () => {
    if (!pair || !pair.pairAddress) return;
  
    setLoading(true);
    try {
      let url;
      if (isSolana) {
        url = `https://solana-gateway.moralis.io/token/mainnet/pairs/${pair.pairAddress}/swaps?order=DESC`;
      } else {
        url = `https://deep-index.moralis.io/api/v2.2/pairs/${pair.pairAddress}/swaps?chain=${chainId}&order=DESC`;
      }
  
      const response = await fetch(url, {
        headers: new Headers({
          accept: "application/json",
          "X-API-Key": API_KEY || "",
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      if (data) {
        setPairData({
          baseToken: data.baseToken || null,
          quoteToken: data.quoteToken || null,
          pairLabel: data.pairLabel || null,
        });
  
        if (data.result) {
          setTransactions(data.result);
        }
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [pair, chainId, isSolana]);  // Add isSolana as a dependency

 const fetchNewTransactions = useCallback(async () => {
  if (!pair || !pair.pairAddress) return;

  try {
    let url;
    if (isSolana) {
      url = `https://solana-gateway.moralis.io/token/mainnet/pairs/${pair.pairAddress}/swaps?order=DESC`;
    } else {
      url = `https://deep-index.moralis.io/api/v2.2/pairs/${pair.pairAddress}/swaps?chain=${chainId}&order=DESC`;
    }

    const response = await fetch(url, {
      headers: new Headers({
        accept: "application/json",
        "X-API-Key": API_KEY || "",
      }),
    });

    if (!response.ok) {
      console.error(`API error during polling: ${response.status}`);
      return;
    }

    const data = await response.json();
    if (data && data.result && data.result.length > 0) {
      const currentTransactionIds = new Set(transactions.map((tx) => tx.transactionHash));
      const newTxs = data.result.filter((tx: Transaction) => !currentTransactionIds.has(tx.transactionHash));

      if (newTxs.length > 0) {
        const newIds: Set<string> = new Set(newTxs.map((tx: Transaction) => tx.transactionHash));
        setNewTransactionIds(newIds);
        setTransactions((prevTxs) => [...newTxs, ...prevTxs]);

        setTimeout(() => {
          setNewTransactionIds(new Set());
        }, 5000);
      }
    }
  } catch (err) {
    console.error("Error polling for new transactions:", err);
  }
}, [pair, chainId, transactions, isSolana]);  // Add isSolana as a dependency

  useEffect(() => {
    fetchTransactions();
    pollInterval.current = setInterval(fetchNewTransactions, 10000);

    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
      }
    };
  }, [fetchTransactions, fetchNewTransactions]);

  const formatTimeAgo = (dateString: string | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return `${Math.floor(diffSec / 86400)}d ago`;
  };

  // Format numbers with commas
  const formatNumber = (num: string | number | undefined, decimals = 0) => {
    if (num === undefined || num === null) return "0";

    const parsedNum = typeof num === "string" ? parseFloat(num) : num;
    return parsedNum.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format prices with appropriate decimal places

  // Get wallet explorer URL
  const getWalletExplorerUrl = (walletAddress: string) => {
    const explorer = blockExplorers[chainId] || "";

    if (!explorer) return "#";

    if (isSolana) {
      return `${explorer}/account/${walletAddress}`;
    } else {
      return `${explorer}/address/${walletAddress}`;
    }
  };

  // Format wallet address (truncate)
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get transaction direction text and color
  const getTransactionType = (type: string | undefined) => {
    if (!type) return { text: "Unknown", color: "text-gray-500" };

    switch (type.toLowerCase()) {
      case "buy":
        return { text: "Buy", color: "text-green-500" };
      case "sell":
        return { text: "Sell", color: "text-red-500" };
      case "addliquidity":
        return { text: "Add Liquidity", color: "text-green-500" };
      case "removeliquidity":
        return { text: "Remove Liquidity", color: "text-red-500" };
      default:
        return {
          text: type.charAt(0).toUpperCase() + type.slice(1),
          color: "text-gray-500",
        };
    }
  };

  if (!pair) {
    return (
      <div className="p-4 text-center text-dex-text-secondary">
        No pair data available
      </div>
    );
  }

  if (loading && transactions.length === 0) {
    return (
      <div className="p-4 text-center text-dex-text-secondary">
        Loading transactions...
      </div>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <div className="p-4 text-center text-dex-text-secondary">{error}</div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-accent-2 text-white">
      <div
        className="overflow-auto border border-gray-800 bg-accent-2"
        style={{ height: `${tableHeight}px` }}
      >
        <table
          ref={tableRef}
          className="w-full text-sm text-left border-collapse"
        >
        <thead className="text-xs uppercase bg-[#17181b] sticky top-0 z-10">
  <tr className="border-b border-accent-3 text-accent-aux-1">
    {/* th 1 */}
    <th className="py-[10px] px-[12px] w-[14.11%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="flex gap-[4px] items-center">
        <div className="text-[12px]">Time</div>
        <div className="scale-80">
          <div className="flex cursor-pointer rotate-180 text-accent-aux-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 7 7">
              <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
            </svg>
          </div>
          <div className="flex cursor-pointer dark:text-[#f5f5f5]">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 7 7">
              <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
            </svg>
          </div>
        </div>
      </div>
    </th>

    {/* th 2 */}
    <th className="py-[10px] px-[10.58px] w-[14%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="flex gap-[4px] items-center">
        <div className="text-[12px]">Type</div>
        <div className="flex cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16">
            <path d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path>
          </svg>
        </div>
      </div>
    </th>

    {/* th 3 */}
    <th className="py-[10px] px-[12px] w-[14.11%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="flex gap-[4px] items-center">
        <div className="text-[12px]">Total</div>
        <div className="space-x-1 flex items-center text-[12px]">
          <span>USD</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#5C6068" viewBox="0 0 16 16">
            <g clipPath="url(#clip0_7009_491)">
              <path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path>
            </g>
          </svg>
        </div>
        <div className="flex cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16">
            <path d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path>
          </svg>
        </div>
      </div>
    </th>

    {/* th 4 */}
    <th className="py-[10px] px-[12px] w-[10.58%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="text-[12px]">Amount</div>
    </th>

    {/* th 5 */}
    <th className="py-[10px] px-[12px] w-[11.76%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="text-[12px]">Price</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#5C6068" viewBox="0 0 16 16">
        <path d="M9.37 1.846a.6.6 0 01.654.13l4 4a.6.6 0 01-.848.848L10.2 7.616a.6.6 0 01-.848-.848l3.474-3.474a.6.6 0 01.492-.195z"></path>
      </svg>
    </th>

    <th className="py-[10px] px-[12px] w-[11.76%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="text-[12px]">Price</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#5C6068" viewBox="0 0 16 16">
        <path d="M9.37 1.846a.6.6 0 01.654.13l4 4a.6.6 0 01-.848.848L10.2 7.616a.6.6 0 01-.848-.848l3.474-3.474a.6.6 0 01.492-.195z"></path>
      </svg>
    </th>
    <th className="py-[10px] px-[12px] w-[11.76%] text-left whitespace-nowrap dark:text-[f5f5f5]">
      <div className="text-[12px]">Price</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#5C6068" viewBox="0 0 16 16">
        <path d="M9.37 1.846a.6.6 0 01.654.13l4 4a.6.6 0 01-.848.848L10.2 7.616a.6.6 0 01-.848-.848l3.474-3.474a.6.6 0 01.492-.195z"></path>
      </svg>
    </th>
  </tr>
</thead>

          <tbody>
            {transactions.map((tx, index) => {
    
              const txType = getTransactionType(tx.transactionType);
              const baseToken = getBaseTokenValue(tx);
         
              const usdValue = formatValueWithColor(
                isNaN(parseFloat(tx.totalValueUsd)) ? 0 : parseFloat(tx.totalValueUsd),
                tx.transactionType
              );
              const price = formatPriceWithColor(isNaN(parseFloat(tx.baseTokenPriceUsd)) ? 0 : parseFloat(tx.baseTokenPriceUsd));
              const isNew = newTransactionIds.has(tx.transactionHash);

              // Create a unique key using transaction hash and index
              const uniqueKey = `${tx.transactionHash}_${index}`;

              return (
                <tr
                  key={uniqueKey}
                  className={`border-b border-gray-800  ${
                    isNew ? "animate-fade-in bg-accent-2" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-gray-400  whitespace-nowrap">
                    {formatTimeAgo(tx.blockTimestamp)}
                  </td>
                  <td
                  className={`w-24 font-medium ${txType.color}`}
                  >
                  <div className="bg-[rgba(136,214,147,0.2)] text-center rounded px-2 py-0.5 w-16">{txType.text}</div>
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${usdValue.color} whitespace-nowrap`}
                  >
                    {usdValue.text}
                  </td>
                  <td className="px-4 py-3 text-right text-prettyGreen whitespace-nowrap">
                    {baseToken.value ? formatNumber(baseToken.value, 2) : "-"}
                  </td>
                  <td
                    className={`px-4 py-3 text-right text-prettyGreen ${price.color} whitespace-nowrap`}
                  >
                    {price.text}
                  </td>
                  <td className="px-4 py-3 text-prettyGreen whitespace-nowrap">
                    <a
                      href={getWalletExplorerUrl(tx.walletAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono hover:text-blue-400 flex items-center"
                    >
                      <span className="bg-gray-700 text-white px-1 rounded mr-1">
                        ✦
                      </span>
                      {formatWalletAddress(tx.walletAddress || '0x0')}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href="#"
                      className="inline-block text-gray-400 hover:text-blue-400"
                    >
                     <div className="flex py-[10px] items-center w-[15.29%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M4 6a2 2 0 012-2h2a1 1 0 000-2H6a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4v-2a1 1 0 10-2 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm7-3a1 1 0 011-1h4a2 2 0 012 2v4a1 1 0 11-2 0V5.414l-5.293 5.293a1 1 0 01-1.414-1.414L14.586 4H12a1 1 0 01-1-1z"></path></svg>
                                        <div className="flex text-[12px] ml-[0.1rem]">Share</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#9AA0AA" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zM6.465 5.501a.386.386 0 00-.266.11L4.39 7.42a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.109l1.81-1.81a.188.188 0 00-.133-.32H6.465zm0 6.758a.376.376 0 00-.266.11l-1.81 1.81a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.11l1.81-1.81a.188.188 0 00-.133-.32H6.465zm7.487-3.289a.376.376 0 00-.266-.11H4.522a.188.188 0 00-.133.321l1.81 1.81c.07.07.165.11.266.11h9.164a.188.188 0 00.133-.32l-1.81-1.81z"></path></svg>
                                </div>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Resize handle */}
      {/* <div
        ref={resizeRef}
        className="h-2 bg-gray-800 hover:bg-blue-500 cursor-ns-resize flex items-center justify-center"
      >
        <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
      </div> */}
    </div>
  );
};

export default TokenTransactions;