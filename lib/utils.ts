import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTrendingMemeCoins } from "../services/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncAddress(str: string) {
  if (!str || typeof str !== "string" || str.length < 5) {
    return "Invalid address"; // or return an empty string or any fallback message
  }
  return `${str.slice(0, 5)}...${str.slice(str.length - 3, str.length)}`;
}


export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

/**
 * Fetch meme coin data from the real API
 * @returns {Promise} - Returns a promise resolving to an array of meme coins data
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchMemeCoinData(): Promise<any[]> {
  try {
    // Fetch the trending meme coins data from the API (you can specify a chain and limit if needed)
    const data = await getTrendingMemeCoins(); // Fetch the real meme coin data

    const delay = Math.floor(Math.random() * 3000) + 1000; // Random delay between 1-4 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        // Randomize and select a subset of 15 meme coins
        const randomSubset = data.sort(() => 0.5 - Math.random()).slice(0, 15);
        resolve(randomSubset);
      }, delay);
    });
  } catch (error) {
    console.error("Error fetching meme coin data:", error);
    return [];
  }
}

export function formatNumber(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

export function themeMode() {
  return {
    // save to localstorage and get from there too;
    getFromStore(key = "theme") {
      return window.localStorage.getItem(key) || false;
    },
    setToStore(key, value) {
      if (!key) return;
      window.localStorage.setItem(key, value);
    },
    effect(mode: "light" | "dark") {
      return (document.documentElement.className = mode);
    },

    // switch the theme 0 - dark,  theme 1 - light
    switch() {
      const gtTheme = this.getFromStore();
      if (gtTheme == "0") {
        // from dark to light
        this.effect("light");
        this.setToStore("theme", "1");
        return true;
      }
      // dark
      this.effect("dark");
      this.setToStore("theme", "0");
      return false;
    },

    default() {
      // check device
      const prefersDefaultScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      const gtTheme = this.getFromStore("theme");

      if (gtTheme) {
        if (gtTheme == "0") {
          // from dark to light
          this.effect("dark");
          this.setToStore("theme", "0");
          return true;
        }
        // dark
        this.effect("light");
        this.setToStore("theme", "1");
      }

      if (prefersDefaultScheme.matches) {
        this.effect("dark");
        return this.setToStore("theme", "0");
      }
      this.effect("light");
      this.setToStore("theme", "1");
    },
  };
}

export function updateUrlParams(params: Record<string, string>) {
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    // Always replace the entire value
    url.searchParams.set(key, value);
  });

  window.history.pushState({}, "", url);
}

export function localStore(key: string) {
  if (typeof window == "undefined") return;
  return window.localStorage.getItem(key);
}
