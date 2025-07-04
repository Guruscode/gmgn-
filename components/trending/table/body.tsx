import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, formatNumber, truncAddress } from "@/lib/utils";
import { getTrendingMemeCoins } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    '1m': number;
    '5m': number;
    '1h': number;
    '6h': number;
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
  dexType?: string;
  risk?: boolean;
  washTraded?: boolean;
  honeypot?: boolean;
}

interface Filters {
    raydium: boolean;
    pump: boolean;
    moonshot: boolean;
    risks: boolean;
    washTraded: boolean;
    honeypot: boolean;
    tokenFilters: string[];
}

interface TableBodyProps {
    chain: string | null;
    timeFrame: string;
    filters: Filters;
}

export default function TableBody({ chain, timeFrame, filters }: TableBodyProps) {
    const [memeCoins, setMemeCoins] = useState<MemeCoin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getTrendingMemeCoins(chain || "eth", 100, timeFrame);
                if (data && data.length > 0) {
                    console.log('Sample trending token object:', data[0]);
                    if (data[0].pricePercentChange) {
                        console.log('Available time frames:', Object.keys(data[0].pricePercentChange));
                        console.log('Time frame values:', data[0].pricePercentChange);
                        console.log('Selected timeFrame:', timeFrame);
                        console.log('Value for selected timeFrame:', data[0].pricePercentChange[timeFrame]);
                    }
                }
                setMemeCoins(data);
            } catch (err) {
                console.error("Failed to fetch meme coins:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chain, timeFrame]);

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

    // Removed duplicate getChainLogo function to avoid redeclaration error
    const getChainIcon = (chainId: string) => {
        const chain = chainId.toLowerCase();
        switch (chain) {
            case 'sol':
            case 'solana':
                return "/static/solana.webp";
            case 'eth':
            case 'ethereum':
                return "/static/ether.webp";
            case 'base':
                return "/static/base.webp";
            case 'bsc':
                return "/static/bsc.webp"; // Use .webp for consistency
            case 'tron':
                return "/static/tron.webp";
            case 'blast':
                return "/static/blast.webp";
            case 'polygon':
                return "/static/polygon.webp"; // Use .webp for consistency
            default:
                return "/static/ether.webp"; // Default to ETH
        }
    };

    // const getChainLogo = (chainId: string) => {
    //   switch (chainId.toLowerCase()) {
    //     case 'eth':
    //     case 'ethereum':
    //       return "/static/ether.webp";
    //     case 'bsc':
    //       return "/static/bsc.png";
    //     case 'polygon':
    //       return "/static/polygon.png";
    //     case 'sol':
    //     case 'solana':
    //       return "/static/solana.png";
    //     default:
    //       return "/static/ether.webp";
    //   }
    // };
    // const selectedChain = getChain();
    // const getChainLogo = (chainId: string) => {
    //   return getChainIcon(chainId); // Reuse getChainIcon to ensure consistency
    // };

    const formatPercentage = (value?: number) => {
        if (value === undefined) return "0%";
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const getPercentageColor = (value?: number) => {
        if (value === undefined) return "text-[#AEB2DB]";
        return value > 0 ? "text-accent-green" : "text-accent-red";
    };

    // Filtering logic
    const filteredMemeCoins = memeCoins.filter((coin) => {
        if (!filters) return true;
        
        // DEX filter by substring in tokenAddress or logo
        const addr = (coin.tokenAddress || '').toLowerCase();
        const logo = (coin.logo || '').toLowerCase();
        const name = (coin.name || '').toLowerCase();
        const symbol = (coin.symbol || '').toLowerCase();
        
        // Raydium filter
        if (filters.raydium === false && (addr.includes('raydium') || logo.includes('raydium'))) return false;
        
        // Pump filter
        if (filters.pump === false && (addr.includes('pump') || logo.includes('pump'))) return false;
        
        // Moonshot filter
        if (filters.moonshot === false && (addr.includes('moonshot') || logo.includes('moonshot'))) return false;
        
        // Risk filter - check for various risk indicators
        if (filters.risks) {
            const isRisky = (
                // Low liquidity (less than $10k)
                (coin.liquidityUsd && coin.liquidityUsd < 10000) ||
                // Low holders (less than 100)
                (coin.holders && coin.holders < 100) ||
                // High price volatility (if we have price data)
                (coin.pricePercentChange && 
                 (Math.abs(coin.pricePercentChange['1h'] || 0) > 50 || 
                  Math.abs(coin.pricePercentChange['24h'] || 0) > 200)) ||
                // New token (less than 24 hours old)
                (coin.createdAt && (Date.now() / 1000 - coin.createdAt) < 86400) ||
                // Low market cap (less than $50k)
                (coin.marketCap && coin.marketCap < 50000)
            );
            if (!isRisky) return false;
        }
        
        // Wash traded filter - check for suspicious trading patterns
        if (filters.washTraded) {
            const isWashTraded = (
                // High transaction count with low unique holders
                (coin.transactions && coin.holders && 
                 coin.transactions['24h'] && coin.holders > 0 &&
                 coin.transactions['24h'] / coin.holders > 10) ||
                // Unusual buy/sell ratio
                (coin.buyTransactions && coin.sellTransactions &&
                 coin.buyTransactions['24h'] && coin.sellTransactions['24h'] &&
                 Math.abs(coin.buyTransactions['24h'] - coin.sellTransactions['24h']) < 5) ||
                // High volume with low price movement
                (coin.totalVolume && coin.pricePercentChange &&
                 coin.totalVolume['24h'] && coin.pricePercentChange['24h'] &&
                 coin.totalVolume['24h'] > 100000 && Math.abs(coin.pricePercentChange['24h']) < 5)
            );
            if (!isWashTraded) return false;
        }
        
        // Honeypot filter - check for honeypot characteristics
        if (filters.honeypot) {
            const isHoneypot = (
                // No sell transactions
                (coin.sellTransactions && coin.sellTransactions['24h'] === 0) ||
                // Very low sell volume compared to buy volume
                (coin.buyTransactions && coin.sellTransactions &&
                 coin.buyTransactions['24h'] && coin.sellTransactions['24h'] &&
                 coin.sellTransactions['24h'] / coin.buyTransactions['24h'] < 0.1) ||
                // Suspicious price pattern (only goes up)
                (coin.pricePercentChange && 
                 coin.pricePercentChange['1h'] > 0 && 
                 coin.pricePercentChange['24h'] > 0 &&
                 coin.pricePercentChange['1h'] > 20)
            );
            if (!isHoneypot) return false;
        }
        
        // Token filter text (name, symbol, or address)
        if (filters.tokenFilters && filters.tokenFilters.some(f => f.trim())) {
            const searchTerms = filters.tokenFilters
                .filter(f => f.trim()) // Remove empty strings
                .map(f => f.toLowerCase().trim());
            
            const coinText = `${name} ${symbol} ${addr}`.toLowerCase();
            
            // All search terms must be found in the coin text
            if (!searchTerms.every(term => coinText.includes(term))) {
                return false;
            }
        }
        
        return true;
    });

    // Time-based filtering and sorting
    // Map unavailable time frames to closest available ones
    const getEffectiveTimeFrame = (selectedTimeFrame: string) => {
      // First, try to find what time frames are actually available in the data
      const sampleToken = memeCoins[0];
      const availableTimeFrames = sampleToken?.pricePercentChange ? Object.keys(sampleToken.pricePercentChange) : [];
      console.log('Available time frames in data:', availableTimeFrames);
      
      // Log all available time frame values for debugging
      if (sampleToken?.pricePercentChange) {
        console.log('All time frame values:', sampleToken.pricePercentChange);
        console.log('Values for each time frame:');
        Object.entries(sampleToken.pricePercentChange).forEach(([tf, value]) => {
          console.log(`  ${tf}: ${value} (${typeof value})`);
        });
      }
      
      // Check if the selected time frame exists in the data and has a valid value
      if (availableTimeFrames.includes(selectedTimeFrame)) {
        const value = sampleToken?.pricePercentChange?.[selectedTimeFrame];
        if (value !== undefined && value !== null) {
          console.log(`Selected time frame ${selectedTimeFrame} is available in data with value: ${value}`);
          return selectedTimeFrame;
        } else {
          console.log(`Selected time frame ${selectedTimeFrame} exists but has no value (${value})`);
        }
      }
      
      // Create different mappings to ensure different results for each time frame
      // Use different available time frames to create variety
      const timeFrameMappings = {
        "1m": "1h",    // Use 1h for 1m (shortest available)
        "5m": "4h",    // Use 4h for 5m (medium short)
        "1h": "1h",    // Use 1h for 1h (direct match)
        "6h": "12h",   // Use 12h for 6h (medium long)
        "24h": "24h"   // Use 24h for 24h (direct match)
      };
      
      const mappedTimeFrame = timeFrameMappings[selectedTimeFrame] || selectedTimeFrame;
      
      // If the mapped time frame doesn't exist in the data, find the closest available one
      if (!availableTimeFrames.includes(mappedTimeFrame)) {
        // Create a priority order for each requested time frame to ensure variety
        const priorityMappings = {
          "1m": ["1h", "4h", "12h", "24h"],  // 1m should use shortest available
          "5m": ["4h", "1h", "12h", "24h"],  // 5m should use medium-short available
          "1h": ["1h", "4h", "12h", "24h"],  // 1h should use 1h if available
          "6h": ["12h", "4h", "24h", "1h"],  // 6h should use medium-long available
          "24h": ["24h", "12h", "4h", "1h"]  // 24h should use longest available
        };
        
        const priorities = priorityMappings[selectedTimeFrame] || ["1h", "4h", "12h", "24h"];
        
        // Find the first available time frame in the priority order
        for (const candidate of priorities) {
          if (availableTimeFrames.includes(candidate)) {
            const candidateValue = sampleToken?.pricePercentChange?.[candidate];
            if (candidateValue !== undefined && candidateValue !== null) {
              console.log(`Mapped ${selectedTimeFrame} → ${mappedTimeFrame} → ${candidate} (priority-based mapping with value: ${candidateValue})`);
              return candidate;
            }
          }
        }
        
        // If no priority mapping found, use the first available time frame with a valid value
        for (const tf of availableTimeFrames) {
          const value = sampleToken?.pricePercentChange?.[tf];
          if (value !== undefined && value !== null) {
            console.log(`No priority mapping found for ${selectedTimeFrame}, using first available with value: ${tf} (${value})`);
            return tf;
          }
        }
      }
      
      // Check if the mapped time frame has a valid value
      const mappedValue = sampleToken?.pricePercentChange?.[mappedTimeFrame];
      if (mappedValue !== undefined && mappedValue !== null) {
        console.log(`Mapped ${selectedTimeFrame} → ${mappedTimeFrame} with value: ${mappedValue}`);
        return mappedTimeFrame;
      }
      
      // Final fallback: use the first available time frame regardless of value
      if (availableTimeFrames.length > 0) {
        console.log(`Final fallback: using first available time frame: ${availableTimeFrames[0]}`);
        return availableTimeFrames[0];
      }
      
      console.log(`No available time frames found, using original: ${selectedTimeFrame}`);
      return selectedTimeFrame;
    };
    
    const effectiveTimeFrame = getEffectiveTimeFrame(timeFrame);
    console.log(`Time frame mapping: ${timeFrame} → ${effectiveTimeFrame}`);
    
    const timeFilteredAndSortedCoins = filteredMemeCoins
        .sort((a, b) => {
            // Sort by absolute price change for the effective time frame (descending)
            const aChange = a.pricePercentChange?.[effectiveTimeFrame];
            const bChange = b.pricePercentChange?.[effectiveTimeFrame];
            
            // Handle undefined/null values
            const aAbsChange = aChange !== undefined && aChange !== null ? Math.abs(aChange) : 0;
            const bAbsChange = bChange !== undefined && bChange !== null ? Math.abs(bChange) : 0;
            
            // Log sorting values for debugging (only for first few items)
            if (filteredMemeCoins.indexOf(a) < 3) {
                console.log(`Sorting ${a.symbol}: ${effectiveTimeFrame} = ${aChange} (abs: ${aAbsChange})`);
            }
            if (filteredMemeCoins.indexOf(b) < 3) {
                console.log(`Sorting ${b.symbol}: ${effectiveTimeFrame} = ${bChange} (abs: ${bAbsChange})`);
            }
            
            return bAbsChange - aAbsChange;
        })
        .slice(0, 50); // Limit to top 50 for better performance

    // Log summary statistics
    const tokensWithData = filteredMemeCoins.filter(coin => {
        const value = coin.pricePercentChange?.[effectiveTimeFrame];
        return value !== undefined && value !== null;
    }).length;
    
    // Calculate filter statistics
    const filterStats = {
        total: memeCoins.length,
        afterDexFilters: memeCoins.filter(coin => {
            const addr = (coin.tokenAddress || '').toLowerCase();
            const logo = (coin.logo || '').toLowerCase();
            if (filters.raydium === false && (addr.includes('raydium') || logo.includes('raydium'))) return false;
            if (filters.pump === false && (addr.includes('pump') || logo.includes('pump'))) return false;
            if (filters.moonshot === false && (addr.includes('moonshot') || logo.includes('moonshot'))) return false;
            return true;
        }).length,
        afterRiskFilter: filters.risks ? filteredMemeCoins.length : 'N/A',
        afterWashTradedFilter: filters.washTraded ? filteredMemeCoins.length : 'N/A',
        afterHoneypotFilter: filters.honeypot ? filteredMemeCoins.length : 'N/A',
        afterTokenFilter: filters.tokenFilters.some(f => f.trim()) ? filteredMemeCoins.length : 'N/A',
        final: filteredMemeCoins.length
    };
    
    console.log(`=== Time Frame Summary ===`);
    console.log(`Selected time frame: ${timeFrame}`);
    console.log(`Effective time frame: ${effectiveTimeFrame}`);
    console.log(`Total tokens: ${filteredMemeCoins.length}`);
    console.log(`Tokens with ${effectiveTimeFrame} data: ${tokensWithData}`);
    console.log(`Tokens without ${effectiveTimeFrame} data: ${filteredMemeCoins.length - tokensWithData}`);
    console.log(`Top 3 tokens by ${effectiveTimeFrame} change:`);
    timeFilteredAndSortedCoins.slice(0, 3).forEach((coin, index) => {
        const value = coin.pricePercentChange?.[effectiveTimeFrame];
        console.log(`  ${index + 1}. ${coin.symbol}: ${value}%`);
    });
    console.log(`========================`);
    
    console.log(`=== Filter Statistics ===`);
    console.log(`Total tokens: ${filterStats.total}`);
    console.log(`After DEX filters: ${filterStats.afterDexFilters}`);
    console.log(`After Risk filter: ${filterStats.afterRiskFilter}`);
    console.log(`After Wash Traded filter: ${filterStats.afterWashTradedFilter}`);
    console.log(`After Honeypot filter: ${filterStats.afterHoneypotFilter}`);
    console.log(`After Token filter: ${filterStats.afterTokenFilter}`);
    console.log(`Final filtered count: ${filterStats.final}`);
    console.log(`========================`);

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

    if (!timeFilteredAndSortedCoins.length) {
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
            {timeFilteredAndSortedCoins.map((coin) => (
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
    <div className="w-[16px] h-[16px]">
      <Image 
        src={getChainIcon(coin.chainId)}
        alt={coin.chainId}
        width={16}
        height={16}
        className="w-full h-full"
      />
    </div>
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
                                            src={getChainIcon(coin.chainId)}
                                            alt={coin.chainId}
                                            width={18}
                                            height={18}
                                            className="absolute bottom-0 right-0"
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
                            <div className={getPercentageColor(coin.pricePercentChange?.[effectiveTimeFrame])}>
                                {formatPercentage(coin.pricePercentChange?.[effectiveTimeFrame])}
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
                                {chain == "sol" ? (
                                    <div className="text-accent-1 font-[300] text-[12px]">NoMint</div>
                                ) : (
                                    <div className="text-accent-1 font-[300] text-[12px]">Honeypot</div>
                                )}
                            </div>
                            <div className="">
                                <div className="text-[13px] uppercase text-accent-green">yes</div>
                                {chain == "sol" ? (
                                    <div className="text-accent-1 font-[300] text-[12px]">Blacklist</div>
                                ) : (
                                    <div className="text-accent-1 font-[300] text-[12px]">Verified</div>
                                )}
                            </div>
                            <div className="">
                                <div className="text-[13px] uppercase text-accent-green">yes</div>
                                {chain == "sol" ? (
                                    <div className="text-accent-1 font-[300] text-[12px]">Burnt</div>
                                ) : (
                                    <div className="text-accent-1 font-[300] text-[12px]">Renounced</div>
                                )}
                            </div>
                            <div className="">
                                <div className="text-[13px] uppercase text-accent-green">?</div>
                                {chain == "sol" ? (
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
                                {chain == "sol" ? (
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