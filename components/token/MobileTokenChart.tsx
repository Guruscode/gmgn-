import React, { useEffect, useCallback, useRef } from "react";
import { Pair } from "@/lib/tokenTypes";

interface TradingViewWidgetConfig {
  container_id: string;
  symbol: string;
  interval: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  hide_side_toolbar: boolean;
  allow_symbol_change: boolean;
  save_image: boolean;
  height: string;
  width: string;
}

interface TradingViewWidget {
  onChartReady: (callback: () => void) => void;
  setSymbol: (symbol: string, interval: string) => void;
  remove: () => void;
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: TradingViewWidgetConfig) => TradingViewWidget;
    };
  }
}

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

  const initializeWidget = useCallback(() => {
    cleanup();
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          container_id: "tradingview_widget",
          symbol: pair?.pairAddress || "",
          interval: timeFrame,
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          height: "100%",
          width: "100%",
        });
      }
    };
    document.head.appendChild(script);
  }, [pair, timeFrame]);

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
  }, [pair, timeFrame, initializeWidget]);

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
