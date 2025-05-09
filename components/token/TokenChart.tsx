import React, { useEffect, useRef, useState } from "react";
import { Pair } from "@/lib/tokenTypes";
import Image from 'next/image';

interface TokenChartProps {
  pair: Pair | null;
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

declare global {
  interface Window {
    createMyWidget?: (id: string, options: unknown) => void;
    destroyMyWidget?: (id: string) => void;
  }
}

const PRICE_CHART_ID = "price-chart-widget-container";

const TokenChart: React.FC<TokenChartProps> = ({ pair, timeFrame }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsMobile] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [containerHeight, setContainerHeight] = useState('400px'); // Default fixed height

  // Track mobile state and handle resize
  useEffect(() => {
   // Replace this in your checkMobile function:
     // Replace your mobile height calculation with:
        const checkMobile = () => {
          const mobile = window.innerWidth <= 768;
          setIsMobile(mobile);
          // Set fixed height that matches the screenshot
          setContainerHeight(mobile ? '280px' : '400px');
        };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Force chart redraw on resize to ensure proper rendering
    const handleResize = () => {
      if (widgetLoaded && pair) {
        reinitializeWidget();
      }
    };
    
    const resizeDebounce = debounce(handleResize, 250);
    window.addEventListener('resize', resizeDebounce);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', resizeDebounce);
    };
  }, [pair, widgetLoaded]);

  // Debounce function to prevent excessive widget reinitialization
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const reinitializeWidget = () => {
    cleanup();
    initializeWidget();
  };

  const cleanup = () => {
    const existingWidget = document.getElementById(PRICE_CHART_ID);
    if (existingWidget) existingWidget.innerHTML = '';
    if (typeof window.destroyMyWidget === "function") {
      try {
        window.destroyMyWidget(PRICE_CHART_ID);
      } catch (error) {
        console.error("Widget cleanup error:", error);
      }
    }
    setWidgetLoaded(false);
  };

  const initializeWidget = () => {
    if (!pair || !pair.pairAddress || typeof window === "undefined" || 
        !containerRef.current || typeof window.createMyWidget !== "function") {
      return;
    }

    const timeframeMap = {
      "5m": "5",
      "15m": "15",
      "1h": "60",
      "4h": "240",
      "1d": "1D",
    };

    const getChartChainId = () => {
      if (pair.chainId === "solana" || pair.exchangeName?.toLowerCase().includes("solana")) {
        return "solana";
      }
      return pair.chainId || "0x1";
    };

    const chartChainId = getChartChainId();
    const container = containerRef.current;

    // Set container size consistently regardless of device
    container.style.height = containerHeight;
    container.style.width = '100%';
    container.style.minHeight = '400px';

    try {
     // In your initializeWidget function:
        window.createMyWidget(PRICE_CHART_ID, {
          chainId: chartChainId,
          pairAddress: pair.pairAddress,
          defaultInterval: timeframeMap[timeFrame] || "1D",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
          backgroundColor: "#0f1118",
          width: "100%",
          height: "100%",
          autoSize: true,
          // Mobile-specific options
          isMobile: window.innerWidth <= 768,
          mobileScale: 0.8 // Adjust if needed
        });
      setWidgetLoaded(true);
    } catch (error) {
      console.error("Widget initialization error:", error);
      showErrorFallback();
    }
  };
// Add this to your component to verify mobile rendering
useEffect(() => {
  console.log('Current container dimensions:', {
    width: containerRef.current?.offsetWidth,
    height: containerRef.current?.offsetHeight,
    mobile: window.innerWidth <= 768
  });
}, [containerHeight, widgetLoaded]);


  useEffect(() => {
    if (!pair || !pair.pairAddress || typeof window === "undefined") return;

    const loadScript = () => {
      if (document.getElementById("moralis-chart-widget")) {
        initializeWidget();
        return;
      }

      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        const readyCheckInterval = setInterval(() => {
          if (typeof window.createMyWidget === "function") {
            clearInterval(readyCheckInterval);
            initializeWidget();
          }
        }, 200);
      };

      script.onerror = () => {
        console.error("Failed to load Moralis chart script");
        showErrorFallback();
      };

      document.body.appendChild(script);
    };

    cleanup();
    loadScript();

    return cleanup;
  }, [pair, timeFrame]);

  // Handle widget updates when needed properties change
  useEffect(() => {
    if (widgetLoaded && pair) {
      reinitializeWidget();
    }
  }, [containerHeight]);

  const showErrorFallback = (message = "Failed to load chart. Please refresh or try again later.") => {
    const chartContainer = document.getElementById(PRICE_CHART_ID);
    if (chartContainer) {
      chartContainer.innerHTML = `
        <div class="h-full flex items-center justify-center text-dex-text-secondary p-4 text-center">
          ${message}
        </div>
      `;
    }
  };

  useEffect(() => {
    console.log("Chart mounted", pair);
  }, []);

  if (!pair) {
    return (
      <div className="h-full flex items-center justify-center text-dex-text-secondary">
        No chart data available
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top bar with pair info and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex items-center mr-4">
            <Image
              src={pair.exchangeLogo || "/images/exchanges/default-exchange.svg"}
              alt={pair.exchangeName}
              width={24}
              height={24}
              className="mr-2 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0Mzk0NyIvPjwvc3ZnPg==";
              }}
            />
            <span className="font-medium text-dex-text-primary">
              {pair.pairLabel}
            </span>
            <span className="ml-2 text-dex-text-secondary">
              on {pair.exchangeName}
            </span>
          </div>

          <div className="text-dex-text-secondary text-sm mt-2 sm:mt-0">
            <span className="mr-2">
              Volume: ${(pair.volume24hrUsd || 0).toLocaleString()}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="mx-2">
              Liquidity: ${(pair.liquidityUsd || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container with fixed responsive height */}
   
        <div 
          id={PRICE_CHART_ID}
          ref={containerRef}
          className="bg-dex-bg-secondary rounded-lg w-full"
          style={{ 
            height: containerHeight,
            minHeight: '300px', // Lower minimum for mobile
            maxHeight: '70vh', // Prevent being too tall
            overflow: 'hidden',
          
            position: 'relative' // Important for widget positioning
          }}
        />
    </div>
  );
};

export default TokenChart;