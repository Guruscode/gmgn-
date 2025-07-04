"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthLayout from "../components/common/authLayout";
import Header from "../components/common/header";
import MemeCoinsWidget from "@/components/common/widget";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set up Solana network and wallets
  const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  const pathname = usePathname();
  const isTokenDetailsPage = /^\/[a-zA-Z0-9]+\/token\/[a-zA-Z0-9]+$/.test(pathname || "");

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`${poppins.variable} antialiased dark:bg-[#111111] bg-[#f4f4f5] text-[#111111] dark:text-[#f4f4f5] min-h-screen flex flex-col`}
      >
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <QueryClientProvider client={queryClient}>
                <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
                  <AuthLayout />
                </Suspense>
                <div className="flex flex-col flex-1">
                  <Suspense fallback={<div className="h-[56px] flex items-center justify-center">Loading header...</div>}>
                    <Header />
                  </Suspense>
                  <Suspense fallback={null}>
                    {!isTokenDetailsPage && <MemeCoinsWidget />}
                  </Suspense>
                  <main className="flex-1">
                    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading page...</div>}>
                      {children}
                    </Suspense>
                  </main>
                </div>
              </QueryClientProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}