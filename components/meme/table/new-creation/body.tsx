import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, formatNumber, truncAddress } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Token {
  tokenAddress: string;
  name?: string;
  symbol?: string;
  image?: string;
  status?: string;
  age?: string;
  solBalance?: number;
  holders?: number;
  txCount1h?: number;
  volume1h?: number;
  marketCap?: number;
  lastActivity?: string;
  recommendation?: string;
  socials?: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
  isNew?: boolean;
}

interface TableBodyProps {
  tokens: Token[];
  loading: boolean;
  error: string | null;
}

export default function TableBody({ tokens, loading, error }: TableBodyProps) {
  const searchParams = useSearchParams();
  const getChain = useCallback(() => searchParams.get("chain"), [searchParams]);

  if (loading) {
    return (
      <tbody>
        {Array(10).fill(0).map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="py-3 px-2 sticky left-0 bg-accent-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full border w-[25px] h-[25px] bg-gray-200"></div>
                  <div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
                  </div>
                </div>
              </div>
            </td>
            {Array(9).fill(0).map((_, i) => (
              <td key={i} className="py-3 px-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td colSpan={10} className="py-8 text-center text-red-500">
            {error}
          </td>
        </tr>
      </tbody>
    );
  }

  if (!tokens || tokens.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={10} className="py-8 text-center text-gray-500">
            No tokens found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="md:text-[14px] text-[13px] divide-y">
      {tokens.map((token) => (
        <tr key={token.tokenAddress} className={token.isNew ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
          <td className="py-3 px-2 sticky z-[1] left-0 bg-accent-2">
            {/* Token Info */}
            <Link 
              role="button" 
              className="flex items-center md:w-[321px] w-[136px] md:flex-[321px] flex-[136px]" 
              href={`/${getChain()}/token/${token.tokenAddress}`}
            >
              <div className="flex items-center gap-2">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[16px] w-[13px]" width="16px" height="16px" fill="#AEB2BD" viewBox="0 0 16 16">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.421.99a1.754 1.754 0 013.158 0l1.587 3.127 3.352.603c1.414.254 1.976 2.051.975 3.121l-2.37 2.536.484 3.5c.204 1.477-1.267 2.587-2.554 1.93L8 14.245l-3.053 1.56c-1.287.658-2.758-.452-2.554-1.929l.484-3.5L.507 7.84c-1-1.07-.439-2.867.975-3.121l3.352-.603L6.421.99z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full border w-fit relative">
                    <Image 
                      src={token.image || "/static/default-token.png"} 
                      className='md:w-[30px] w-[25px] md:h-[30px] h-[25px]' 
                      width={35} 
                      height={35} 
                      alt={token.name || "Token"}
                    />
                    <Image 
                      src={getChain() === "sol" ? "/static/solana.webp" : "/static/ether.webp"} 
                      className='md:w-[15px] w-[10px] md:h-[15px] h-[10px] absolute bottom-0 right-0' 
                      width={15} 
                      height={15} 
                      alt={getChain() === "sol" ? "Solana" : "Ethereum"}
                    />
                  </div>
                  <div>
                    {/* Token Name and Actions */}
                    <div className="flex items-center gap-1">
                      <h1 className="uppercase md:text-[14px] text-[13px] font-[400]">
                        {token.symbol || truncAddress(token.tokenAddress)}
                      </h1>
                      <div className="flex gap-1">
                        {/* Twitter Search */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link 
                                href={`https://twitter.com/search?q=${encodeURIComponent(token.name || token.symbol || token.tokenAddress)}`} 
                                target="_blank"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12">
                                  <path d="M5.406 0a5.355 5.355 0 015.351 5.425c-.026 2.942-2.46 5.334-5.402 5.312A5.385 5.385 0 010 5.299C.031 2.349 2.44-.011 5.406 0zm-.043 9.457a4.105 4.105 0 004.13-4.059c.03-2.269-1.848-4.151-4.133-4.143a4.112 4.112 0 00-4.087 4.107 4.091 4.091 0 004.09 4.095z"/>
                                  <path d="M10.843 11.676l-.93-.93a.562.562 0 010-.792l.041-.04a.562.562 0 01.792 0l.93.93a.562.562 0 010 .792l-.04.04a.562.562 0 01-.793 0z"/>
                                </svg>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                              <p>Search on Twitter</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Copy Address (Mobile) */}
                        <svg 
                          onClick={() => copyToClipboard(token.tokenAddress)} 
                          className="md:hidden block cursor-pointer" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12px" 
                          height="12px" 
                          fill="#AEB2BD" 
                          viewBox="0 0 12 12"
                        >
                          <path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"/>
                          <path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"/>
                        </svg>

                        {/* DexScreener */}
                        <Link 
                          href={`https://dexscreener.com/${getChain() === "sol" ? "solana" : "ethereum"}/${token.tokenAddress}`} 
                          target="_blank" 
                          className="md:block hidden"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#6E727D" viewBox="0 0 12 12">
                            {/* DexScreener icon paths */}
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Address and Social Links */}
                    <div className="flex items-center gap-1">
                      <div className="md:flex hidden items-center gap-1">
                        <p className='text-[#AEB2DB] text-[12px]'>{truncAddress(token.tokenAddress)}</p>
                        <button onClick={() => copyToClipboard(token.tokenAddress)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12">
                            <path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"/>
                            <path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"/>
                          </svg>
                        </button>
                      </div>

                      {/* Social Links */}
                      {token.socials?.website && (
                        <Link href={token.socials.website} target='_blank' className="hidden md:block">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 20 20">
                            {/* Website icon paths */}
                          </svg>
                        </Link>
                      )}

                      {token.socials?.twitter && (
                        <Link href={`https://twitter.com/${token.socials.twitter}`} target='_blank' className="hidden md:block">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12">
                            {/* Twitter icon paths */}
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </td>

          {/* Status */}
          <td className="py-3 px-2 hidden md:block">
            <div className="flex md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <p className="text-accent-aux-1">{token.status || "--"}</p>
            </div>
          </td>

          {/* Age */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <p className="text-accent-aux-1">{token.age || "--"}</p>
            </div>
          </td>

          {/* SOL Balance */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="dark:text-white">
                {token.solBalance ? token.solBalance.toFixed(4) : "--"}
              </div>
            </div>
          </td>

          {/* Holders */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px] text-accent-1">
              {token.holders ? formatNumber(token.holders) : "--"}
            </div>
          </td>

          {/* 1h Transactions */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="text-accent-1">{token.txCount1h || "--"}</div>
            </div>
          </td>

          {/* 1h Volume */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="text-[#AEB2DB]">
                {token.volume1h ? `$${formatNumber(token.volume1h)}` : "--"}
              </div>
            </div>
          </td>

          {/* Market Cap */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="text-accent-green">
                {token.marketCap ? `$${formatNumber(token.marketCap)}` : "--"}
              </div>
            </div>
          </td>

          {/* Last Activity */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="text-accent-green">{token.lastActivity || "--"}</div>
            </div>
          </td>

          {/* Recommendation */}
          <td className="py-3 px-2">
            <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
              <div className="text-accent-1">--</div>
              <div className="text-accent-green text-[13px]">{token.recommendation || "HODL"}</div>
            </div>
          </td>

          {/* Buy Button */}
          <td className="py-3 px-2 sticky right-0 z-[1] bg-accent-2">
            <div className="md:w-[101px] md:flex-[101px] w-[48px] flex-[48px]">
              <button className="flex items-center justify-center h-[25px] px-[6px] rounded-md gap-1 hover:bg-[rgb(238,239,242)] dark:hover:bg-[rgb(82,86,93)] dark:hover:text-[rgb(245,245,245)] hover:text-[rgb(41,44,51)] w-fit">
                {getChain() === "sol" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#88D693" viewBox="0 0 16 16">
                    {/* Solana icon */}
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[12px] w-[20px]" fill="currentColor" viewBox="0 0 16 16">
                    {/* Ethereum icon */}
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