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
      window.destroyMyWidget(PRICE_CHART_ID);
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

  const reinitializeWidget = useCallback(() => {
    cleanup();
    initializeWidget();
  }, [cleanup, initializeWidget]);

  const debounce = useCallback(<T extends (...args: unknown[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth <= 768) {
        cleanup();
      } else {
        reinitializeWidget();
      }
    }, 250);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cleanup, reinitializeWidget, debounce]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeWidget();
    }
    return cleanup;
  }, [initializeWidget, cleanup]);

  useEffect(() => {
    if (pair) {
      const checkMobile = () => {
        if (window.innerWidth <= 768) {
          cleanup();
        }
      };
      checkMobile();
    }
  }, [pair, cleanup]);

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