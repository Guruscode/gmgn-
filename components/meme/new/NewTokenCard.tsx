import React from "react";
import Image from "next/image";

interface Token {
  tokenAddress: string;
  symbol?: string;
  name?: string;
  logo?: string;
  priceUsd?: string;
  liquidity?: string;
  fullyDilutedValuation?: string;
  createdAt?: string;
  isNew?: boolean;
}

interface NewTokenCardProps {
  token: Token;
  formatPrice: (price?: string) => string;  // Add formatPrice
  formatNumber: (num?: string) => string;
  formatTimeAgo: (dateString?: string) => string;  // Add formatTimeAgo
  onClick: () => void;
}


const NewTokenCard: React.FC<NewTokenCardProps> = ({
  token,
  formatNumber,
  onClick,
}) => {
  const percentage = "3%";

  return (
    <div
      className="flex items-center p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-2 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
        {token.logo ? (
          <Image
            src={token.logo}
            alt={token.symbol || "token"}
            width={32}
            height={32}
            className="rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzJmNGEyNSIvPjwvc3ZnPg==";
            }}
          />
        ) : (
          <span className="text-white text-xs">
            {token.symbol ? token.symbol.charAt(0) : "?"}
          </span>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="text-white font-semibold">
                {token.symbol || "UNKNOWN"}
              </span>
              <span className="text-gray-400 text-xs">
                @{token.symbol?.toLowerCase() || "unknown"}
              </span>
            </div>

            <div className="flex items-center text-xs">
              <span className="text-gray-400">1h: </span>
              <span className="text-xs pl-1 pr-2">
                0x{token.tokenAddress?.substring(0, 4)}...
                {token.tokenAddress?.substring(token.tokenAddress?.length - 3) ||
                  ""}
              </span>
              <span className="bg-red-900/30 text-red-400 rounded-sm px-1">
                Run
              </span>
              <span className="text-red-400 pl-1">{percentage}</span>
            </div>

            <div className="flex items-center text-xs text-gray-400">
              <span>100% •</span>
              <span className="flex items-center mx-1">X</span>
              <span>🔥</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end">
              <span className="text-yellow-500 text-xs mr-1">⭐ Buy</span>
            </div>

            <div className="flex items-center text-xs text-gray-400 justify-end">
              <span>Liq: {formatNumber(token.liquidity)} •</span>
              <span className="mx-1">178 •</span>
              <span>
                $
                {token.priceUsd
                  ? parseFloat(token.priceUsd).toFixed(1)
                  : "0"}
                k MC: $
                {token.fullyDilutedValuation
                  ? parseFloat(token.fullyDilutedValuation).toFixed(1)
                  : "0"}
                k
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTokenCard;
