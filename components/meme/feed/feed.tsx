"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { fetchMemeCoinData } from '@/lib/utils';
import { memeCoins, memeCoinsInterface } from '@/lib/faker-data';
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, formatNumber, truncAddress } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function FeedPane({ whichFeed, switchTabs }) {
    const [memeData, setMemeData] = useState<memeCoinsInterface[]>([]);
    const [isLoading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const getChain = useCallback(() => searchParams.get("chain"), [searchParams]);

    useEffect(() => {
        fetchMemeCoinData(memeCoins).then((data) => {
            setLoading(false);
            setMemeData(data);
        });
    }, []);

    const getFeedTitle = () => {
        switch (whichFeed) {
            case "1": return "🌱 New Pool";
            case "2": return switchTabs === "1" ? "💊 Completing" : "🌜 Completing";
            case "3": return "🐣 Completed";
            default: return "";
        }
    };

    return (
        <div className='w-full max-h-[787px] bg-accent-2 pb-5 rounded-lg pt-2'>
            <div className="flex items-center p-4 w-full justify-between">
                <div className="text-[14px] font-[600]">
                    {getFeedTitle()}
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="text-[14px] flex gap-2 cursor-pointer items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#6E727D" viewBox="0 0 16 16">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z" />
                            </svg>
                            Filter
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="width">Width</label>
                                    <input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxWidth">Max. width</label>
                                    <input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="height">Height</label>
                                    <input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxHeight">Max. height</label>
                                    <input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="overflow-y-auto h-full">
                {isLoading ? (
                    <div className="px-4 mt-5 space-y-2">
                        {Array(10).fill(0).map((_, index) => (
                            <Skeleton className='w-full h-[80px]' key={index} />
                        ))}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="sticky top-0 z-[2] bg-accent-2">
                            <tr className="text-left text-[12px] text-[#6E727D]">
                                <th className="py-2 px-2 sticky left-0 z-[3] bg-accent-2">Token</th>
                                <th className="py-2 px-2 hidden md:table-cell">Status</th>
                                <th className="py-2 px-2">Age</th>
                                <th className="py-2 px-2">Price</th>
                                <th className="py-2 px-2">Holders</th>
                                <th className="py-2 px-2">1h TXs</th>
                                <th className="py-2 px-2">1h Vol</th>
                                <th className="py-2 px-2">Mkt Cap</th>
                                <th className="py-2 px-2">Last</th>
                                <th className="py-2 px-2">Action</th>
                                <th className="py-2 px-2 sticky right-0 z-[3] bg-accent-2">Buy</th>
                            </tr>
                        </thead>
                        <tbody className="md:text-[14px] text-[13px] divide-y">
                            {memeData.map((token) => (
                                <tr key={token.address} className={token.isNew ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                                    <td className="py-3 px-2 sticky z-[1] left-0 bg-accent-2">
                                        <Link 
                                            role="button" 
                                            className="flex items-center md:w-[321px] w-[136px] md:flex-[321px] flex-[136px]" 
                                            href={`/${getChain()}/token/${token.address}`}
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
                                                        <div className="flex items-center gap-1">
                                                            <h1 className="uppercase md:text-[14px] text-[13px] font-[400]">
                                                                {token.symbol || truncAddress(token.address)}
                                                            </h1>
                                                            <div className="flex gap-1">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Link 
                                                                                href={`https://twitter.com/search?q=${encodeURIComponent(token.name || token.symbol || token.address)}`} 
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

                                                                <svg 
                                                                    onClick={() => copyToClipboard(token.address)} 
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

                                                                <Link 
                                                                    href={`https://dexscreener.com/${getChain() === "sol" ? "solana" : "ethereum"}/${token.address}`} 
                                                                    target="_blank" 
                                                                    className="md:block hidden"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#6E727D" viewBox="0 0 12 12">
                                                                        {/* DexScreener icon paths */}
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <div className="md:flex hidden items-center gap-1">
                                                                <p className='text-[#AEB2DB] text-[12px]'>{truncAddress(token.address)}</p>
                                                                <button onClick={() => copyToClipboard(token.address)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12">
                                                                        <path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"/>
                                                                        <path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"/>
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            {token.website && (
                                                                <Link href={token.website} target='_blank' className="hidden md:block">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 20 20">
                                                                        {/* Website icon paths */}
                                                                    </svg>
                                                                </Link>
                                                            )}

                                                            {token.twitter && (
                                                                <Link href={`https://twitter.com/${token.twitter}`} target='_blank' className="hidden md:block">
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

                                    <td className="py-3 px-2 hidden md:block">
                                        <div className="flex md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <p className="text-accent-aux-1">{token.change24h ? `${token.change24h}%` : "--"}</p>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <p className="text-accent-aux-1">{token.age ? `${token.age}d` : "--"}</p>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="dark:text-white">
                                                {token.price ? token.price.toFixed(4) : "--"}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px] text-accent-1">
                                            {token.holders ? formatNumber(token.holders) : "--"}
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="text-accent-1">{token.txCount || "--"}</div>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="text-[#AEB2DB]">
                                                {token.volume24h ? `$${formatNumber(token.volume24h)}` : "--"}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="text-accent-green">
                                                {token.marketCap ? `$${formatNumber(token.marketCap)}` : "--"}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="text-accent-green">{token.lastActivity ? `${token.lastActivity}s` : "--"}</div>
                                        </div>
                                    </td>

                                    <td className="py-3 px-2">
                                        <div className="md:w-[119px] w-[92px] md:flex-[119px] flex-[92px]">
                                            <div className="text-accent-1">--</div>
                                            <div className="text-accent-green text-[13px]">{token.recommendation || "HODL"}</div>
                                        </div>
                                    </td>

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
                    </table>
                )}
            </div>
        </div>
    );
}