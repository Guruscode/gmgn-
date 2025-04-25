import React from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

type Token = {
  tokenAddress: string;
  chainId: string;
  logo?: string;
  symbol: string;
  name: string;
  usdPrice?: number;
  usdPricePercentChange?: {
    oneDay?: number;
  };
};

type SearchResultsProps = {
  results: Token[];
  onClose: () => void;

};

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {

  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const formatPrice = (price?: number): string => {
    if (!price) return "$0.00";

    if (price < 0.00001) {
      return "$" + price.toFixed(10).replace(/\.?0+$/, "");
    }

    if (price < 0.01) {
      return "$" + price.toFixed(6);
    }

    if (price < 1000) {
      return "$" + price.toFixed(4);
    }

    return (
      "$" +
      price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const formatPercentChange = (change?: number): string => {
    if (change === undefined || change === null) return "N/A";
    return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  };

  const getChainIcon = (chainId: string): string => {
    const chainMap: Record<string, string> = {
      "0x1": "ethereum",
      solana: "solana",
      bsc: "binance",
      "0x38": "binance",
      polygon: "polygon",
      "0x89": "polygon",
      base: "base",
      "0x2105": "base",
      arbitrum: "arbitrum",
      "0xa4b1": "arbitrum",
      optimism: "optimism",
      "0xa": "optimism",
      linea: "linea",
      "0xe708": "linea",
      fantom: "fantom",
      "0xfa": "fantom",
      pulse: "pulse",
      "0x171": "pulse",
      ronin: "ronin",
      "0x7e4": "ronin",
    };

    const chain = chainMap[chainId] || "generic";
    return `/images/chains/${chain}.svg`;
  };
  const handleTokenClick = async (token: Token) => {
    const chainPathMap: Record<string, { path: string; query: string }> = {
      "0x1": { path: "ethereum", query: "eth" },
      solana: { path: "solana", query: "sol" },
      bsc: { path: "bsc", query: "bsc" },
      polygon: { path: "polygon", query: "polygon" },
      base: { path: "base", query: "base" },
      arbitrum: { path: "arbitrum", query: "arbitrum" },
      optimism: { path: "optimism", query: "optimism" },
    };
  
    const chainData = chainPathMap[token.chainId] || { path: token.chainId, query: token.chainId };
    const path = `/${chainData.path}/token/${token.tokenAddress}?chain=${chainData.query}`;
    
    // Close the modal first
    onClose();
    
    // Small delay to ensure modal is closed before navigation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Then navigate
    handleNavigate(path);
  };
  
  if (results.length === 0) {
    return <div className="p-4 text-center text-gray-400">No results found</div>;
  }

  return (
    <div>
      {results.map((token) => (
       <div
       key={`${token.chainId}-${token.tokenAddress}`}
       className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 flex items-center"
       onClick={() => handleTokenClick(token)}
       onTouchEnd={() => handleTokenClick(token)}
     >
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 relative mr-3">
            <Image
            src={token.logo || "/images/default-token.png"}
            alt={token.symbol}
            width={40}
            height={40}
            className="rounded-full bg-gray-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzU0NTQ1NCIvPjwvc3ZnPg==";
            }}
          />

<Image
  src={getChainIcon(token.chainId)}
  alt="Chain"
  width={20}
  height={20}
  className="absolute -right-1 -bottom-1 rounded-full border border-gray-700 bg-gray-800"
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "/images/chains/generic.svg";
  }}
/>

            </div>
            <div>
              <div className="font-medium flex items-center">
                <span className="text-white">{token.symbol}</span>
                <span className="ml-2 text-xs text-gray-400">
                  {token.chainId === "solana" ? "SOL" : "ETH"}
                </span>
              </div>
              <div className="text-sm text-gray-400">{token.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{formatPrice(token.usdPrice)}</div>
            {token.usdPricePercentChange?.oneDay !== undefined && (
              <div
                className={`text-sm ${
                  token.usdPricePercentChange.oneDay >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {formatPercentChange(token.usdPricePercentChange.oneDay)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
