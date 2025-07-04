// const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
const MEME_COINS_API_URL = "https://deep-index.moralis.io/api/v2.2/tokens"; // Replace with the correct API URL

/**
 * Fetch trending meme coins
 * @param {string} chain - Optional chain ID filter
 * @param {number} limit - Number of results to return
 * @returns {Promise} Promise resolving to meme coin data
 */



export const getTrendingTokens = async (chain = "", limit = 100) => {
  try {
    // Only add chain parameter if it's not empty
    const chainParam = chain ? `&chain=${chain}` : "";
    const url = `https://deep-index.moralis.io/api/v2.2/tokens/trending?limit=${limit}${chainParam}`;
    console.log("Fetching trending tokens from:", url);

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
    return Array.isArray(data) ? data : data.result || [];
  } catch (error) {
    console.error("Error fetching trending tokens:", error);
    throw error;
  }
};

export const getTrendingMemeCoins = async (chain = "", limit = 100, timeFrame = "24h") => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const chainParam = chain ? `&chain=${chain}` : "";
    
    // Try different API approaches for time-based data
    let url;
    
    // Approach 1: Try different parameter names
    if (timeFrame && timeFrame !== "24h") {
      // Convert time frame to different formats the API might expect
      const timeFrameFormats = {
        "1m": ["1m", "1", "60", "60s", "1min"],
        "5m": ["5m", "5", "300", "300s", "5min"],
        "1h": ["1h", "1h", "3600", "3600s", "60min"],
        "6h": ["6h", "6h", "21600", "21600s", "360min"],
        "24h": ["24h", "24h", "86400", "86400s", "1440min"]
      };
      
      const formatsToTry = timeFrameFormats[timeFrame] || [timeFrame];
      
      // Try various parameter names that APIs commonly use
      const timeParams = [
        `&timeframe=${timeFrame}`,
        `&period=${timeFrame}`,
        `&interval=${timeFrame}`,
        `&time_period=${timeFrame}`,
        `&window=${timeFrame}`
      ];
      
      // Try each parameter with different time frame formats
      for (const param of timeParams) {
        for (const format of formatsToTry) {
          try {
            const testUrl = `${MEME_COINS_API_URL}/trending?limit=${limit}${chainParam}${param.replace(timeFrame, format)}`;
            console.log("Trying API URL:", testUrl);
            
            const testResponse = await fetch(testUrl, {
              headers: new Headers({
                accept: "application/json",
                "X-API-Key": API_KEY,
              }),
            });
            
            if (testResponse.ok) {
              const testData = await testResponse.json();
              if (testData && testData.length > 0) {
                console.log(`Success with parameter: ${param} and format: ${format}`);
                url = testUrl;
                break;
              }
            }
          } catch (e) {
            console.log(`Failed with parameter: ${param} and format: ${format}`, e);
          }
        }
        if (url) break;
      }
      
      // If no format worked, try the original approach
      if (!url) {
        for (const param of timeParams) {
          try {
            const testUrl = `${MEME_COINS_API_URL}/trending?limit=${limit}${chainParam}${param}`;
            console.log("Trying API URL:", testUrl);
            
            const testResponse = await fetch(testUrl, {
              headers: new Headers({
                accept: "application/json",
                "X-API-Key": API_KEY,
              }),
            });
            
            if (testResponse.ok) {
              const testData = await testResponse.json();
              if (testData && testData.length > 0) {
                console.log(`Success with parameter: ${param}`);
                url = testUrl;
                break;
              }
            }
          } catch (e) {
            console.log(`Failed with parameter: ${param}`, e);
          }
        }
      }
    }
    
    // If no time-based approach worked, use the default
    if (!url) {
      url = `${MEME_COINS_API_URL}/trending?limit=${limit}${chainParam}`;
    }

    console.log("Final API URL:", url);

    const headers = new Headers({
      accept: "application/json",
      "X-API-Key": API_KEY,
    });

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data.length, "tokens");
    return Array.isArray(data) ? data : data.result || [];
  } catch (error) {
    console.error("Error fetching trending meme coins:", error);
    throw error;
  }
};

/**
 * Search for meme coins
 * @param {string} query - Search query
 * @param {Array} chains - Array of chain IDs to search
 * @param {number} limit - Number of results to return
 * @returns {Promise} Promise resolving to search results
 */
export const searchMemeCoins = async (
  query: string,
  chains = ["eth", "solana", "bsc", "base"],
  limit = 20
) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const chainsParam = chains.join(",");
    const url = `${MEME_COINS_API_URL}/search?query=${encodeURIComponent(query)}&chains=${chainsParam}&limit=${limit}`;

    const headers = new Headers({
      accept: "application/json",
      "X-API-Key": API_KEY,
    });

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error("Error searching meme coins:", error);
    throw error;
  }
};

/**
 * Get meme coin price
 * @param {string} chainId - Chain ID
 * @param {string} tokenAddress - Token address
 * @returns {Promise} Promise resolving to meme coin price data
 */
export const getMemeCoinPrice = async (chainId: string, tokenAddress: string) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const chain = formatChainForApi(chainId);

    const url = `${MEME_COINS_API_URL}/${chain}/${tokenAddress}/price`;

    const headers = new Headers({
      accept: "application/json",
      "X-API-Key": API_KEY,
    });

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching meme coin price:", error);
    throw error;
  }
};

/**
 * Helper to format chain ID for API
 * @param {string} chainId - Chain ID in URL format
 * @returns {string} Chain ID in API format
 */
const formatChainForApi = (chainId: string) => {
  const chainMap = {
    ethereum: "0x1",
    eth: "0x1",
    bsc: "0x38",
    polygon: "0x89",
    arbitrum: "0xa4b1",
    optimism: "0xa",
    base: "0x2105",
    solana: "solana",
  };

  return chainMap[chainId] || chainId;
};

export const getWalletNetWorth = async (address: string) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const chains = [
      "eth",
      "bsc",
      "polygon",
      "arbitrum",
      "avalanche",
      "optimism",
      "linea",
      "pulse",
      "ronin",
      "base",
      "fantom",
    ];
    const chainParams = chains
      .map((chain, index) => `chains[${index}]=${chain}`)
      .join("&");

    const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/net-worth?${chainParams}&exclude_spam=true&exclude_unverified_contracts=true`;

    const headers = new Headers({
      accept: "application/json",
      "X-API-Key": API_KEY,
    });

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet net worth:", error);
    throw error;
  }
};

export const getWalletTokens = async (address: string, chain: string) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is not defined");
    }

    const url = `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=${chain}`;

    const headers = new Headers({
      accept: "application/json",
      "X-API-Key": API_KEY,
    });

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet tokens:", error);
    throw error;
  }
};
