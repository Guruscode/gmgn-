import { Poppins } from "next/font/google";
import "./globals.css";
import AuthLayout from "../components/common/authLayout";
import Header from "../components/common/header";
import { Suspense } from "react";
import { Metadata } from 'next'
import MemeCoinsWidget from "@/components/common/widget";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Nordic.AI - Instant Autonomous Trading',
  description: 'Connect your Telegram to Trade Anywhere, Anytime.'
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased dark:bg-[#111111] bg-[#f4f4f5] text-[#111111] dark:text-[#f4f4f5]`}
      >
        {/* here will have the auth modal */}
        <Suspense>
          <AuthLayout />
          <MemeCoinsWidget />
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
