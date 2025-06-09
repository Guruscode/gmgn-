import React, { useEffect, useRef } from "react";
import { Pair } from "@/lib/tokenTypes";

interface TokenChartProps {
  pair: Pair | null;
  timeFrame: string;
}

const PRICE_CHART_ID = "mobile-price-chart-widget-container";

const MobileTokenChart: React.FC<TokenChartProps> = ({ pair, timeFrame }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanup = () => {
    const el = document.getElementById(PRICE_CHART_ID);
    if (el) el.innerHTML = "";
    if (typeof window.destroyMyWidget === "function") {
      try {
        window.destroyMyWidget(PRICE_CHART_ID);
      } catch (e) {
        console.error("Destroy widget error:", e);
      }
    }
  };

  const initializeWidget = () => {
    if (!pair || !pair.pairAddress || typeof window === "undefined" || !containerRef.current) return;

    const timeframeMap = {
      "5m": "5",
      "15m": "15",
      "1h": "60",
      "4h": "240",
      "1d": "1D",
    };

    window.createMyWidget?.(PRICE_CHART_ID, {
      chainId: pair.chainId,
      pairAddress: pair.pairAddress,
      defaultInterval: timeframeMap[timeFrame] || "1D",
      backgroundColor: "#0f1118",
      width: "100%",
      height: "100%",
      autoSize: true,
      isMobile: true,
      mobileScale: 0.8,
    });
  };

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
  }, [pair, timeFrame]);

  if (!pair) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Chart */}
      <div
        id={PRICE_CHART_ID}
        ref={containerRef}
        className="bg-dex-bg-secondary rounded-lg w-full"
        style={{ height: "280px", minHeight: "280px", overflow: "hidden" }}
      />
    </div>
  );
};

export default MobileTokenChart;
