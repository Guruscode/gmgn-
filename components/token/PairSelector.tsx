import React from "react";
// import Image from "next/image";

import { Pair, TokenMetadata } from "@/lib/tokenTypes"; 


// interface Pair {
//   pairAddress: string;
//   pairLabel: string;
//   exchangeName: string;
//   exchangeLogo?: string;
//   liquidityUsd?: number;
//   pair: Token[];
// }



interface PairSelectorProps {
  tokenMetadata: TokenMetadata | null;
  pair: Pair | null;
  // Remove unused props
  // pairs: Pair[] | null;
  // selectedPair: Pair | null;
  // onSelect: (pair: Pair) => void;
}


const PairSelector: React.FC<PairSelectorProps> = ({ tokenMetadata, pair }) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const formatLiquidity = (value?: number) => {
  //   if (!value) return "$0";

  //   if (value >= 1000000000) {
  //     return `$${(value / 1000000000).toFixed(2)}B`;
  //   } else if (value >= 1000000) {
  //     return `$${(value / 1000000).toFixed(2)}M`;
  //   } else if (value >= 1000) {
  //     return `$${(value / 1000).toFixed(2)}K`;
  //   } else {
  //     return `$${value.toFixed(2)}`;
  //   }
  // };

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleSelect = (pairAddress: string) => {
  //   onSelect(pairAddress);
  //   setIsOpen(false);
  // };

  return (
    <div className="relative">
      {/* <button
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
      </button> */}
{/* 
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
      )} */}

<div className="flex items-center text-[12px] text-[400] gap-3">
                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Sniper {">"}</p>
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><rect x="8" y="1" width="4" height="2" fill="#FFCF39"></rect><rect x="19" y="8" width="4" height="2" transform="rotate(90 19 8)" fill="#FFCF39"></rect><rect x="3" y="8" width="4" height="2" transform="rotate(90 3 8)" fill="#FFCF39"></rect><rect x="8" y="17" width="4" height="2" fill="#FFCF39"></rect><circle cx="10" cy="10.001" r="2.7" fill="#FFCF39"></circle><path fillRule="evenodd" clipRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1116 0 8 8 0 01-16 0z" fill="#FFCF39"></path></svg>
                                <div className="flex items-center text-[13px]">
                                    <span>0</span>
                                    <span>/</span>
                                    <span>70</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>BlueChip {">"}</p>
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M16.102 9.215a8.041 8.041 0 00-8.365 0L5.966 5.998a11.44 11.44 0 015.954-1.67c2.168 0 4.201.608 5.953 1.67l-1.771 3.218z" fill="url(#paint0_linear_2044_2363)"></path><path d="M6.776 9.901C4.808 11.51 3.542 14.02 3.542 16.84c0 1.026-.793 1.858-1.771 1.858C.793 18.697 0 17.865 0 16.84c0-4.196 1.97-7.91 4.993-10.178l1.783 3.24z" fill="#F04866"></path><path d="M20.296 16.84c0-2.82-1.265-5.33-3.233-6.939l1.782-3.24c3.023 2.268 4.993 5.982 4.993 10.178 0 1.026-.793 1.858-1.77 1.858-.979 0-1.772-.832-1.772-1.858z" fill="#62BA01"></path><path d="M6.001 15.85l5.818-.085a1.65 1.65 0 11-.822 3.066l-4.996-2.982z" fill="#F04866"></path><defs><linearGradient id="paint0_linear_2044_2363" x1="17.096" y1="7.441" x2="8.112" y2="7.441" gradientUnits="userSpaceOnUse"><stop stopColor="#E6D119"></stop><stop offset="1" stopColor="#E6AC19"></stop></linearGradient></defs></svg>
                                <p className='text-[13px]'>1.2%</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Top 10 {">"}</p>
                            <div className="flex items-center gap-1">
                                <div className="flex text-[13px] items-center text-accent-green">
                                    12.5%
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Audit {">"}</p>
                            <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-1 text-[13px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                                        <p className='text-accent-green'>Safe</p>
                                        <p className='h-[18px] min-w-[30px] text-accent-green text-center text-[12px] rounded-[4px] bg-[rgba(136,214,147,0.2)]'>4/4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex h-[32px] border-r-8 justify-between bg-accent-3 py-[6px] pb-[6px] w-full'>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href={tokenMetadata?.links?.twitter || `https://x.com/search?q=$${tokenMetadata?.symbol || ''}`}>
                        <div className='flex items-center gap-[2px] text-[#f5f5f5]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.213 1.988a7.14 7.14 0 017.135 7.234c-.035 3.922-3.28 7.111-7.203 7.082-3.985-.03-7.181-3.276-7.14-7.25.042-3.933 3.253-7.081 7.208-7.066zm-.058 12.61a5.473 5.473 0 005.508-5.412c.04-3.025-2.465-5.536-5.51-5.524-3.007.012-5.45 2.467-5.45 5.476a5.455 5.455 0 005.452 5.46z"></path>
                                <path d="M16.666 17.795l-1.24-1.24a.75.75 0 010-1.056l.055-.055a.75.75 0 011.056 0l1.24 1.24a.75.75 0 010 1.057l-.054.054a.75.75 0 01-1.057 0z"></path>
                            </svg>
                            Name
                        </div>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href={`https://x.com/search?q=${pair?.pairAddress || ''}`}>
                        <div className='flex items-center gap-[2px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.213 1.988a7.14 7.14 0 017.135 7.234c-.035 3.922-3.28 7.111-7.203 7.082-3.985-.03-7.181-3.276-7.14-7.25.042-3.933 3.253-7.081 7.208-7.066zm-.058 12.61a5.473 5.473 0 005.508-5.412c.04-3.025-2.465-5.536-5.51-5.524-3.007.012-5.45 2.467-5.45 5.476a5.455 5.455 0 005.452 5.46z"></path>
                                <path d="M16.666 17.795l-1.24-1.24a.75.75 0 010-1.056l.055-.055a.749.749 0 011.056 0l1.24 1.24a.75.75 0 010 1.057l-.054.054a.75.75 0 01-1.057 0z"></path>
                            </svg>
                            CA
                        </div>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href={tokenMetadata?.links?.website || `https://www.google.com/search?q=${tokenMetadata?.name || ''} token`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                            <g clipPath="url(#clip0_1553_2200)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM6.446 2.831A8.037 8.037 0 003.07 6h2.323c.212-1.023.505-1.96.865-2.77.06-.136.123-.269.188-.399zM2 10c0-.69.088-1.36.252-2h2.842a21.008 21.008 0 000 4H2.252A8.013 8.013 0 012 10zm1.07 4a8.037 8.037 0 003.376 3.169 9.877 9.877 0 01-.188-.399c-.36-.81-.653-1.747-.865-2.77H3.07zm4.372 0c.173.732.392 1.392.643 1.958.328.738.693 1.273 1.047 1.61.35.333.641.432.868.432.227 0 .518-.1.867-.432.355-.337.72-.872 1.048-1.61.251-.566.47-1.226.643-1.958H7.442zm7.165 0a13.716 13.716 0 01-.865 2.77c-.06.136-.123.269-.188.399A8.037 8.037 0 0016.93 14h-2.323zm3.14-2h-2.841a21.027 21.027 0 000-4h2.842c.165.64.252 1.31.252 2s-.087 1.36-.252 2zm-4.851 0H7.104A18.907 18.907 0 017 10c0-.693.037-1.362.104-2h5.792c.067.638.104 1.307.104 2 0 .693-.037 1.362-.104 2zm1.71-6h2.324a8.037 8.037 0 00-3.376-3.169c.065.13.128.263.188.399.36.81.653 1.747.865 2.77zm-6.52-1.958c-.252.566-.47 1.226-.644 1.958h5.116a11.248 11.248 0 00-.643-1.958c-.328-.738-.693-1.273-1.047-1.61C10.518 2.099 10.226 2 10 2c-.227 0-.518.1-.868.432-.354.337-.719.872-1.047 1.61z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1553_2200">
                                    <rect width="20" height="20"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href={tokenMetadata?.links?.twitter || `https://x.com/search?q=$${tokenMetadata?.symbol || ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_7920_513)">
                                <path d="M9.282 1h1.71L7.255 5.27l4.394 5.809H8.21L5.515 7.555 2.43 11.08H.721l3.995-4.567L.5 1h3.528l2.436 3.22L9.282 1zm-.6 9.056h.947L3.513 1.97H2.497l6.185 8.086z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_7920_513">
                                    <rect width="12" height="12"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href={tokenMetadata?.links?.telegram || `https://t.me/s/${tokenMetadata?.symbol?.toLowerCase() || ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_7920_515)">
                                <path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_7920_515">
                                    <rect width="12" height="12"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <div className='flex px-[8px] items-center justify-center'>
                        <div className='flex gap-[4px] items-center justify-center min-w-[80px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#FFD039" viewBox="0 0 14 14">
                                <g clipPath="url(#clip0_9436_2400)">
                                    <path d="M3.252 4.28L1.75 5.784l1.75 1.75 1.75-1.75-1.503-1.502a.35.35 0 00-.495 0z"></path>
                                    <path d="M10.253 4.28L8.75 5.784l1.75 1.75 1.75-1.75-1.502-1.502a.35.35 0 00-.495 0z"></path>
                                    <path d="M.488 4.516c-.117-.66.741-1.023 1.132-.478L2.9 5.819a.56.56 0 00.894.02l2.712-3.432a.63.63 0 01.989 0l2.711 3.433a.56.56 0 00.894-.02l1.28-1.782c.391-.545 1.25-.183 1.132.478l-1.056 5.911a1.4 1.4 0 01-1.378 1.154H2.922a1.4 1.4 0 01-1.378-1.154L.488 4.516z"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_9436_2400">
                                        <rect width="14" height="14"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg viewBox="0 0 44.54999923706055 17" className='w-[41px]'>
                                <defs>
                                    <linearGradient id="gridient6ffd6a03d473ff4b" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="26.87%" stopColor="#FFCD1C"></stop>
                                        <stop offset="64.85%" stopColor="#FF41E1"></stop>
                                    </linearGradient>
                                </defs>
                                <text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="url(#gridient6ffd6a03d473ff4b)" fontSize="12px" fontWeight="500">
                                    <tspan>Update</tspan>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
    </div>
    
  );
};

export default PairSelector;