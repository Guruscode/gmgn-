import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, formatNumber, truncAddress } from "@/lib/utils";
import { getTrendingMemeCoins } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface TimeData {
  '1h': number;
  '4h': number;
  '12h': number;
  '24h': number;
}

interface MemeCoin {
  id?: string;
  chainId: string;
  tokenAddress: string;
  name: string;
  symbol: string;
  uniqueName?: string;
  decimals?: number;
  logo?: string;
  createdAt?: number;
  usdPrice?: number;
  pricePercentChange?: {
    '1h': number;
    '4h': number;
    '24h': number;
  };
  marketCap?: number;
  liquidityUsd?: number;
  holders?: number;
  transactions?: TimeData;
  buyTransactions?: TimeData;
  sellTransactions?: TimeData;
  buyers?: TimeData;
  sellers?: TimeData;
  totalVolume?: TimeData;
  socials?: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
}

export default function TableBody() {
  const searchParams = useSearchParams();
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getChain = useCallback(() => searchParams.get("chain") || "eth", [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMemeCoins(getChain(), 100);
        setMemeCoins(data);
      } catch (err) {
        console.error("Failed to fetch meme coins:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getChain]);

  const formatAge = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays}d`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo`;
    return `${Math.floor(diffDays / 365)}y`;
  };

  const getChainLogo = (chainId: string) => {
    switch (chainId.toLowerCase()) {
      case 'eth':
      case 'ethereum':
        return "/static/ether.webp";
      case 'bsc':
        return "/static/bsc.png";
      case 'polygon':
        return "/static/polygon.png";
      case 'sol':
      case 'solana':
        return "/static/solana.png";
      default:
        return "/static/ether.webp";
    }
  };

  const formatPercentage = (value?: number) => {
    if (value === undefined) return "0%";
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getPercentageColor = (value?: number) => {
    if (value === undefined) return "text-[#AEB2DB]";
    return value > 0 ? "text-accent-green" : "text-accent-red";
  };

  if (loading) {
    return (
      <tbody className="md:text-[14px] text-[13px] divide-y">
        <tr>
          <td colSpan={15} className="py-8 text-center">
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody className="md:text-[14px] text-[13px] divide-y">
        <tr>
          <td colSpan={15} className="py-8 text-center text-accent-red">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  if (!memeCoins.length) {
    return (
      <tbody className="md:text-[14px] text-[13px] divide-y">
        <tr>
          <td colSpan={15} className="py-8 text-center">
            No meme coins found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="md:text-[14px] text-[13px] divide-y">
      {memeCoins.map((coin) => (
        <tr key={coin.tokenAddress}>
          <td className="py-3 px-2 sticky z-[1] left-0 bg-accent-2">
            <div className="flex items-center md:w-[290px] w-[136px] md:flex-[290px] flex-[136px]">
              {/* Main content */}
              <Link 
                role="button" 
                className="flex items-center" 
                href={`/${coin.chainId}/token/${coin.tokenAddress}`}
              >
                <div className="flex items-center gap-2">
                  <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[16px] w-[13px]" width="16px" height="16px" fill="#AEB2BD" viewBox="0 0 16 16">
                      <g clipPath="url(#clip0_6939_489)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.421.99a1.754 1.754 0 013.158 0l1.587 3.127 3.352.603c1.414.254 1.976 2.051.975 3.121l-2.37 2.536.484 3.5c.204 1.477-1.267 2.587-2.554 1.93L8 14.245l-3.053 1.56c-1.287.658-2.758-.452-2.554-1.929l.484-3.5L.507 7.84c-1-1.07-.439-2.867.975-3.121l3.352-.603L6.421.99z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="rounded-full border w-fit relative">
                      <Image 
                        src={coin.logo || "/static/3717.png"} 
                        className='md:w-[30px] w-[25px] md:h-[30px] h-[25px]' 
                        width={35} 
                        height={35} 
                        alt={`${coin.name} logo`} 
                      />
                      <Image 
                        src={getChainLogo(coin.chainId)} 
                        className='md:w-[15px] w-[10px] md:h-[15px] h-[10px] absolute bottom-0 right-0' 
                        width={15} 
                        height={15} 
                        alt={`${coin.chainId} logo`} 
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-1">
                        <h1 className="uppercase md:text-[14px] text-[13px] font-[400]">{coin.symbol}</h1>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="md:flex hidden items-center gap-1">
                          <p className='text-[#AEB2DB] text-[12px]'>{truncAddress(coin.tokenAddress)}</p>
                          <button onClick={(e) => {
                            e.stopPropagation(); // Prevent parent Link click
                            copyToClipboard(coin.tokenAddress);
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                              <path d="M8.25 1.5H3a.75.75 0 00-.75.75v7.5a.75.75 0 00.75.75h1.5v-1.5H3.75v-6h4.5V1.5zm.75 3h-3a.75.75 0 00-.75.75v7.5a.75.75 0 00.75.75h5.25a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75zm-.75 7.5h-3.75v-6h4.5v6z"></path>
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <p className="text-accent-aux-1 text-[12px]">{formatAge(coin.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Social media links outside the main Link */}
              <div className="flex items-center ml-1">
                <div className="flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={(e) => {
                          e.preventDefault();
                          if (coin.socials?.twitter) {
                            window.open(`https://twitter.com/search?q=${coin.symbol}`, '_blank');
                          }
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                            <path d="M9.535 3.205c.01.144.01.288.01.432 0 4.41-3.357 9.49-9.495 9.49A9.43 9.43 0 010 11.637a6.77 6.77 0 004.93-1.38 3.38 3.38 0 01-3.15-2.34c.21.03.408.04.627.04.298 0 .597-.04.875-.11a3.373 3.373 0 01-2.705-3.31v-.04c.448.25.975.4 1.532.42a3.36 3.36 0 01-1.502-2.8c0-.62.17-1.21.468-1.71a9.568 9.568 0 006.93 3.51 3.36 3.36 0 01-.094-.77 3.37 3.37 0 013.373-3.37c.97 0 1.846.41 2.46 1.06a6.733 6.733 0 002.14-.81 3.364 3.364 0 01-1.482 1.86A6.77 6.77 0 0012 2.294a7.26 7.26 0 01-1.67 1.74l-.002-.002z"></path>
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                        <p>Search on twitter</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={(e) => {
                          e.preventDefault();
                          if (coin.socials?.twitter) {
                            window.open(coin.socials.twitter, '_blank');
                          }
                        }} className="md:block hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                            <path d="M6.375 3.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 3.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 3.75a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                        <p className="">Twitter Rename</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`https://dexscreener.com/${coin.chainId}/${coin.tokenAddress}`, '_blank');
                    }} 
                    className="md:block hidden"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                      <path d="M10.5 1.5h-9a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75zm-.75 7.5h-7.5v-6h7.5v6zM3.75 6h1.5v1.5h-1.5V6zm2.25 0h1.5v1.5H6V6zm-2.25-2.25h1.5v1.5h-1.5v-1.5zm2.25 0h1.5v1.5H6v-1.5z"></path>
                    </svg>
                  </button>
                  
                  {coin.socials?.twitter && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(coin.socials!.twitter, '_blank');
                      }} 
                      className="hidden md:block"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                        <path d="M9.535 3.205c.01.144.01.288.01.432 0 4.41-3.357 9.49-9.495 9.49A9.43 9.43 0 010 11.637a6.77 6.77 0 004.93-1.38 3.38 3.38 0 01-3.15-2.34c.21.03.408.04.627.04.298 0 .597-.04.875-.11a3.373 3.373 0 01-2.705-3.31v-.04c.448.25.975.4 1.532.42a3.36 3.36 0 01-1.502-2.8c0-.62.17-1.21.468-1.71a9.568 9.568 0 006.93 3.51 3.36 3.36 0 01-.094-.77 3.37 3.37 0 013.373-3.37c.97 0 1.846.41 2.46 1.06a6.733 6.733 0 002.14-.81 3.364 3.364 0 01-1.482 1.86A6.77 6.77 0 0012 2.294a7.26 7.26 0 01-1.67 1.74l-.002-.002z"></path>
                      </svg>
                    </button>
                  )}

                  {coin.socials?.website && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(coin.socials!.website, '_blank');
                      }} 
                      className="hidden md:block"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                        <path d="M6 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM0 6a6 6 0 1112 0A6 6 0 010 6zm6.75-3a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zM6 4.5a.75.75 0 110 1.5.75.75 0 010-1.5z"></path>
                      </svg>
                    </button>
                  )}

                  {coin.socials?.telegram && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(coin.socials!.telegram, '_blank');
                      }} 
                      className="hidden md:block"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                        <path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path>
                      </svg>
                    </button>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(`https://dexscreener.com/${coin.chainId}/${coin.tokenAddress}`, '_blank');
                    }} 
                    className="md:hidden block"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                      <path d="M10.5 1.5h-9a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75zm-.75 7.5h-7.5v-6h7.5v6zM3.75 6h1.5v1.5h-1.5V6zm2.25 0h1.5v1.5H6V6zm-2.25-2.25h1.5v1.5h-1.5v-1.5zm2.25 0h1.5v1.5H6v-1.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </td>

          <td className="py-3 px-2 hidden md:block">
            <div className="flex md:w-[107px] w-[84px] md:flex-[107px] flex-[84px]">
              <p className="text-accent-aux-1">{formatAge(coin.createdAt)}</p>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[131px] w-[84px] md:flex-[131px] flex-[84px]">
              <div className="">USDT <span className="text-accent-red">{formatNumber(coin.liquidityUsd || 145400)}</span>/<span>5</span></div>
              <div className="text-accent-green text-[12px]">+5.2k%</div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-accent-1">${formatNumber(coin.holders || 25000)}</div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-[#ff9839] text-[13px]">3,500</div>
              <div className="flex text-[12px] items-center">
                <span className="text-accent-green">1,023</span>/
                <span className="text-accent-red">1045</span>
              </div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-accent-1">0%</div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-[#AEB2DB]">${formatNumber(coin.usdPrice || 1000)}</div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className={getPercentageColor(coin.pricePercentChange?.['1h'])}>
                {formatPercentage(coin.pricePercentChange?.['1h'])}
              </div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className={getPercentageColor(coin.pricePercentChange?.['4h'])}>
                {formatPercentage(coin.pricePercentChange?.['4h'])}
              </div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className={getPercentageColor(coin.pricePercentChange?.['24h'])}>
                {formatPercentage(coin.pricePercentChange?.['24h'])}
              </div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="flex items-center justify-start gap-2 w-[351px] flex-[351px]">
              <div className="">
                <div className="text-[13px] uppercase text-accent-green">No</div>
                {getChain() == "sol" ? (
                  <div className="text-accent-1 font-[300] text-[12px]">NoMint</div>
                ) : (
                  <div className="text-accent-1 font-[300] text-[12px]">Honeypot</div>
                )}
              </div>
              <div className="">
                <div className="text-[13px] uppercase text-accent-green">yes</div>
                {getChain() == "sol" ? (
                  <div className="text-accent-1 font-[300] text-[12px]">Blacklist</div>
                ) : (
                  <div className="text-accent-1 font-[300] text-[12px]">Verified</div>
                )}
              </div>
              <div className="">
                <div className="text-[13px] uppercase text-accent-green">yes</div>
                {getChain() == "sol" ? (
                  <div className="text-accent-1 font-[300] text-[12px]">Burnt</div>
                ) : (
                  <div className="text-accent-1 font-[300] text-[12px]">Renounced</div>
                )}
              </div>
              <div className="">
                <div className="text-[13px] uppercase text-accent-green">?</div>
                {getChain() == "sol" ? (
                  <div className="text-accent-1 font-[300] text-[12px]">Top 10</div>
                ) : (
                  <div className="text-accent-1 font-[300] text-[12px]">Locked</div>
                )}
              </div>
              <div className="">
                <div className="text-[13px] uppercase text-accent-green/50">23.7%</div>
                <div className="text-accent-1 font-[300] text-[12px]">Insiders</div>
              </div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-accent-1">0%/0%</div>
            </div>
          </td>

          <td className="py-3 px-2">
            <div className="md:w-[96px] w-[84px] md:flex-[96px] flex-[84px]">
              <div className="text-accent-1">--</div>
              <div className="text-accent-green text-[13px]">HODL</div>
            </div>
          </td>


          <td className="py-3 px-2 sticky right-0 z-[1] bg-accent-2">
            <div className="md:w-[111px] md:flex-[111px] w-[48px] flex-[48px]">
              <button className="flex items-center justify-center w-full gap-1 hover:bg-[rgb(238,239,242)] hover:text-[rgb(41,44,51)]">
                {getChain() == "sol" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#88D693" viewBox="0 0 16 16">
                    <g clipPath="url(#clip0_9339_171)">
                      <path d="M3.229 9.046L9.756 0 8.452 6.637h3.757a.2.2 0 01.162.317L5.844 16 7.03 9.363H3.39a.2.2 0 01-.161-.317z"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.5 8a6.5 6.5 0 017.933-6.341L9.63.678A7.5 7.5 0 004.9 14.832l.187-1.02A6.5 6.5 0 011.5 8zm4.663 6.237l-.174.99a7.5 7.5 0 004.781-14.2l-.231.987a6.502 6.502 0 01-4.376 12.223z"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.711 1.63c.508-.133 1.013.827.681 1.602-.335.78.978-.978 1.497-1.866L7.023.813l-.312.818zm1.575 10.985c-.345.54-.673 1.897.343 1.85 1.052-.049-.925.19-2.074.124 0 0 2.075-2.513 1.73-1.974z"></path>
                    </g>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[12px] w-[20px]" fill="currentColor" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" fill="#595000"></circle>
                    <path d="M8.327 12.602l3.39-5.086a.435.435 0 00-.36-.676H8.69V3.638a.435.435 0 00-.797-.241l-3.39 5.086a.435.435 0 00.362.676H7.53v3.202a.435.435 0 00.796.241z" fill="#FFEC42"></path>
                  </svg>
                )}
                <div className="text-[12px] md:block hidden">Buy</div>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}