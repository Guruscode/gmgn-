import React, { useEffect, useCallback, useRef } from "react";
import { Pair } from "@/lib/tokenTypes";

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

const PRICE_CHART_ID = "price-chart";

const TokenChart: React.FC<TokenChartProps> = ({ pair, timeFrame, onTimeFrameChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanup = useCallback(() => {
    const el = document.getElementById(PRICE_CHART_ID);
    if (el) {
      el.innerHTML = "";
    }
    if (typeof window.destroyMyWidget === "function") {
      try {
        window.destroyMyWidget(PRICE_CHART_ID);
      } catch (e) {
        console.error("Destroy widget error:", e);
      }
    }
  }, []);

  const initializeWidget = useCallback(() => {
    if (!pair || !pair.pairAddress || typeof window === "undefined" || !containerRef.current) return;

    const timeframeMap = {
      "5m": "5",
      "15m": "15",
      "1h": "60",
      "4h": "240",
      "1d": "1D",
    };

    if (typeof window.createMyWidget === "function") {
      window.createMyWidget(PRICE_CHART_ID, {
        chainId: pair.chainId,
        pairAddress: pair.pairAddress,
        defaultInterval: timeframeMap[timeFrame] || "1D",
        backgroundColor: "#0f1118",
        width: "100%",
        height: "100%",
        autoSize: true,
        isMobile: false,
        onIntervalChange: (newInterval: string) => {
          const reverseTimeframeMap: Record<string, string> = {
            "5": "5m",
            "15": "15m",
            "60": "1h",
            "240": "4h",
            "1D": "1d",
          };
          onTimeFrameChange(reverseTimeframeMap[newInterval] || "1d");
        },
      });
    }
  }, [pair, timeFrame, onTimeFrameChange]);

  useEffect(() => {
    if (!pair) return;

    const loadScript = () => {
      if (document.getElementById("moralis-chart-widget")) {
        const interval = setInterval(() => {
          if (typeof window.createMyWidget === "function") {
            clearInterval(interval);
            initializeWidget();
          }
        }, 200);
        return;
      }

      const script = document.createElement("script");
      script.id = "moralis-chart-widget";
      script.src = "https://moralis.com/static/embed/chart.js";
      script.async = true;

      script.onload = () => {
        const interval = setInterval(() => {
          if (typeof window.createMyWidget === "function") {
            clearInterval(interval);
            initializeWidget();
          }
        }, 200);
      };

      script.onerror = () => console.error("Script load failed");
      document.body.appendChild(script);
    };

    cleanup();
    loadScript();

    return cleanup;
  }, [pair, timeFrame, initializeWidget, cleanup]);

  if (!pair) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-dex-text-secondary">Select a pair to view chart</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full" ref={containerRef}>
      <div id={PRICE_CHART_ID} className="w-full h-full" />
    </div>
  );
};

export default TokenChart;