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

// interface WidgetOptions {
//   autoSize: boolean;
//   chainId: string;
//   pairAddress: string;
//   defaultInterval: string;
//   timeZone: string;
//   backgroundColor: string;
//   gridColor: string;
//   textColor: string;
//   candleUpColor: string;
//   candleDownColor: string;
//   borderColor: string;
//   tooltipBackgroundColor: string;
//   volumeUpColor: string;
//   volumeDownColor: string;
//   lineColor: string;
//   locale: string;
//   hideLeftToolbar: boolean;
//   hideTopToolbar: boolean;
//   hideBottomToolbar: boolean;
// }

const PRICE_CHART_ID = "price-chart-widget-container";

const TokenChart: React.FC<TokenChartProps> = ({ pair, timeFrame }) => {
 
  const containerRef = useRef<HTMLDivElement>(null);

  // const timeframeMap: Record<string, string> = {
  //   "5m": "5",
  //   "15m": "15",
  //   "1h": "60",
  //   "4h": "240",
  //   "1d": "1D",
  // };
  
  useEffect(() => {
    const timeframeMap: Record<string, string> = {
      "5m": "5",
      "15m": "15",
      "1h": "60",
      "4h": "240",
      "1d": "1D",
    };
  
    if (!pair || !pair.pairAddress || typeof window === "undefined") return;
  
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
  
        window.createMyWidget(PRICE_CHART_ID, {
          autoSize: true,
          chainId: chartChainId,
          pairAddress: pair.pairAddress,
          defaultInterval: timeframeMap[timeFrame] || "1D",
          timeZone:
            Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Etc/UTC",
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
          hideLeftToolbar: false,
          hideTopToolbar: false,
          hideBottomToolbar: false,
        });
      }
    };
  
    const existingWidget = document.getElementById(PRICE_CHART_ID);
    if (existingWidget) {
      while (existingWidget.firstChild) {
        existingWidget.removeChild(existingWidget.firstChild);
      }
    }
  
    if (!document.getElementById("moralis-chart-widget")) {
      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = loadWidget;
      script.onerror = () => {
        console.error("Failed to load the chart widget script.");
        const chartContainer = document.getElementById(PRICE_CHART_ID);
        if (chartContainer) {
          chartContainer.innerHTML = `<div class="h-full flex items-center justify-center text-dex-text-secondary">
            Failed to load chart. Please try again later.
          </div>`;
        }
      };
      document.body.appendChild(script);
    } else {
      loadWidget();
    }
  
    return () => {
      if (typeof window.destroyMyWidget === "function") {
        window.destroyMyWidget(PRICE_CHART_ID);
      }
    };
  }, [pair, timeFrame]);
  

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
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

          <div className="text-dex-text-secondary text-sm">
            <span className="mr-2">
              Volume: ${(pair.volume24hrUsd || 0).toLocaleString()}
            </span>
            <span>|</span>
            <span className="mx-2">
              Liquidity: ${(pair.liquidityUsd || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="inline-flex rounded-md mr-4"></div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 bg-dex-bg-secondary rounded-lg">
        <div
          id={PRICE_CHART_ID}
          ref={containerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default TokenChart;