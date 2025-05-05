import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!pair || !pair.pairAddress || typeof window === "undefined") return;
  
    const timeframeMap: Record<string, string> = {
      "5m": "5",
      "15m": "15",
      "1h": "60",
      "4h": "240",
      "1d": "1D",
    };
  
    const getChartChainId = () => {
      if (
        pair.chainId === "solana" ||
        pair.exchangeName?.toLowerCase().includes("solana")
      ) {
        return "solana";
      }
      return pair.chainId || "0x1";
    };
  
    const loadWidget = () => {
      if (typeof window.createMyWidget === "function") {
        const chartChainId = getChartChainId();
        console.log("Initializing widget with pair:", pair.pairAddress, "timeFrame:", timeFrame);
        
        // Mobile detection
        const isMobile = window.innerWidth <= 768;
        
        window.createMyWidget(PRICE_CHART_ID, {
          autoSize: true,
          chainId: chartChainId,
          pairAddress: pair.pairAddress,
          defaultInterval: timeframeMap[timeFrame] || "1D",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
          backgroundColor: "#0f1118",
          gridColor: "#1D2330",
          textColor: "#7F85A1",
          candleUpColor: "#16C784",
          candleDownColor: "#EA3943",
          borderColor: "#0D111C",
          tooltipBackgroundColor: "#171D2E",
          volumeUpColor: "rgba(22, 199, 132, 0.5)",
          volumeDownColor: "rgba(234, 57, 67, 0.5)",
          lineColor: "#3576F2",
          locale: "en",
          hideLeftToolbar: isMobile, // Only hide on mobile
          hideTopToolbar: isMobile,
          hideBottomToolbar: isMobile,
          width: "100%",
          height: "100%"
        });
      }
    };
  
    const cleanup = () => {
      const existingWidget = document.getElementById(PRICE_CHART_ID);
      if (existingWidget) {
        while (existingWidget.firstChild) {
          existingWidget.removeChild(existingWidget.firstChild);
        }
      }
      
      if (typeof window.destroyMyWidget === "function") {
        window.destroyMyWidget(PRICE_CHART_ID);
      }
    };
    
    cleanup();

    if (!document.getElementById("moralis-chart-widget")) {
      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;
      
      let loadTimeout: NodeJS.Timeout;
      let readyCheckInterval: ReturnType<typeof setInterval>;
      
      script.onload = () => {
        readyCheckInterval = setInterval(() => {
          if (typeof window.createMyWidget === "function") {
            clearInterval(readyCheckInterval as unknown as number);
            clearTimeout(loadTimeout);
            loadWidget();
          }
        }, 100);
        
        loadTimeout = setTimeout(() => {
          clearInterval(readyCheckInterval);
          if (!window.createMyWidget) {
            console.error("Widget initialization timed out");
            showErrorFallback();
          }
        }, 10000);
      };
      
      script.onerror = () => {
        clearInterval(readyCheckInterval);
        clearTimeout(loadTimeout);
        console.error("Failed to load Moralis chart script");
        showErrorFallback();
      };
      
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  
    return cleanup;
  }, [pair, timeFrame]);
  
  const showErrorFallback = () => {
    const chartContainer = document.getElementById(PRICE_CHART_ID);
    if (chartContainer) {
      chartContainer.innerHTML = `
        <div class="h-full flex items-center justify-center text-dex-text-secondary p-4 text-center">
          Failed to load chart. Please refresh or try again later.
        </div>
      `;
    }
  };

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

      {/* Chart Container */}
      <div className="bg-dex-bg-secondary rounded-lg flex-1 min-h-[300px] w-full">
        <div
          id={PRICE_CHART_ID}
          ref={containerRef}
          className="w-full h-full"
          style={{ minHeight: '300px' }}
        />
      </div>
    </div>
  );
};

export default TokenChart;