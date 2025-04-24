import React, { useState } from "react";
import Image from "next/image";

import { Pair } from "@/lib/tokenTypes"; 


// interface Pair {
//   pairAddress: string;
//   pairLabel: string;
//   exchangeName: string;
//   exchangeLogo?: string;
//   liquidityUsd?: number;
//   pair: Token[];
// }



interface PairSelectorProps {
  pairs: Pair[] | null; // Change this line to expect an array of Pair objects
  selectedPair: Pair | null;
  onSelect: (pairAddress: string) => void;
}


const PairSelector: React.FC<PairSelectorProps> = ({ pairs, selectedPair, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatLiquidity = (value?: number) => {
    if (!value) return "$0";

    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (pairAddress: string) => {
    onSelect(pairAddress);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full p-2 bg-dex-bg-tertiary rounded hover:bg-dex-bg-highlight transition-colors"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
          <Image
          src={
            selectedPair?.exchangeLogo ||
            "/images/exchanges/default-exchange.svg"
          }
          alt={selectedPair?.exchangeName || "Exchange"}
          width={20}
          height={20}
          className="w-5 h-5 mr-2 rounded-full object-cover"
        />

            <span className="font-medium">{selectedPair?.pairLabel}</span>
          </div>
          <span className="text-dex-text-secondary text-xs ml-7">
            on {selectedPair?.exchangeName}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-dex-text-secondary text-xs mr-3">
            Liquidity: {formatLiquidity(selectedPair?.liquidityUsd)}
          </span>
          <svg
            className="inline-block w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-dex-bg-tertiary rounded-md shadow-lg max-h-60 overflow-auto">
          {pairs?.map((pair) => (
            <button
              key={pair.pairAddress}
              className={`flex items-center justify-between w-full p-3 text-left hover:bg-dex-bg-highlight ${
                selectedPair?.pairAddress === pair.pairAddress
                  ? "bg-dex-bg-highlight"
                  : ""
              }`}
              onClick={() => handleSelect(pair.pairAddress)}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                <Image
              src={
                pair.exchangeLogo ||
                "/images/exchanges/default-exchange.svg"
              }
              alt={pair.exchangeName || "Exchange"}
              width={20}
              height={20}
              className="w-5 h-5 mr-2 rounded-full object-cover"
            />

                  <span className="font-medium">{pair.pairLabel}</span>
                </div>
                <span className="text-dex-text-secondary text-xs ml-7">
                  on {pair.exchangeName}
                </span>
              </div>
              <div className="text-dex-text-secondary text-xs">
                {formatLiquidity(pair.liquidityUsd)}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PairSelector;