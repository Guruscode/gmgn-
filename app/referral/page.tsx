"use client";

import { useState, useEffect } from "react";
import { Copy, Coins } from "lucide-react";
import { useAccount } from "wagmi";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface CommissionData {
  amount: number;
  volume: string;
  position: { x: number; y: number };
}

interface ReferredUser {
  referred_address: string;
  created_at: string;
}

function getPointOnCurve(t: number) {
  const p0 = { x: 8, y: 90 };
  const p1 = { x: 30, y: 88 };
  const p2 = { x: 70, y: 60 };
  const p3 = { x: 100, y: 30 };

  const x =
    Math.pow(1 - t, 3) * p0.x +
    3 * Math.pow(1 - t, 2) * t * p1.x +
    3 * (1 - t) * Math.pow(t, 2) * p2.x +
    Math.pow(t, 3) * p3.x;
  const y =
    Math.pow(1 - t, 3) * p0.y +
    3 * Math.pow(1 - t, 2) * t * p1.y +
    3 * (1 - t) * Math.pow(t, 2) * p2.y +
    Math.pow(t, 3) * p3.y;

  return { x, y };
}

const generateReferralCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

export default function DiagonalCommissionChart() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const chain = searchParams.get("chain") || "sol";
  const refCode = searchParams.get("ref");

  const commissionData: CommissionData[] = [
    { amount: 200, volume: "Vol.50k", position: getPointOnCurve(0.2) },
    { amount: 500, volume: "Vol.250k", position: getPointOnCurve(0.4) },
    { amount: 2000, volume: "Vol.500k", position: getPointOnCurve(0.65) },
    { amount: 5000, volume: "Vol.1000k", position: getPointOnCurve(0.85) },
  ];

  const getCommissionIndex = (referralCount: number) => {
    if (referralCount >= 20) return 3;
    if (referralCount >= 10) return 2;
    if (referralCount >= 5) return 1;
    return 0;
  };

  const currentIndex = getCommissionIndex(referredUsers.length);
  const currentCommission = commissionData[currentIndex];

  useEffect(() => {
    if (isConnected && address) {
      fetch(`/api/referrals?address=${address}`)
        .then((res) => res.json())
        .then(async (data) => {
          let code = data.user?.referral_code;
          if (!code) {
            code = generateReferralCode();
            await fetch("/api/referrals", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ referrer_code: refCode || null, referred_address: address, new_referral_code: code }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  toast.error(data.error);
                }
              })
              .catch(() => toast.error("Failed to register referral"));
          }
          setReferralCode(code);

          if (data.referrals) {
            setReferredUsers(data.referrals);
            setTotalEarnings(data.referrals.length * 500);
          }
        })
        .catch(() => toast.error("Failed to fetch user data"));
    } else {
      setReferralCode(null);
      setReferredUsers([]);
      setTotalEarnings(0);
    }
  }, [isConnected, address, refCode]);

  const currentUrl = typeof window !== "undefined" ? window.location.origin + pathname : "https://gmgn.ai";
  const queryParams = new URLSearchParams(searchParams.toString());
  if (referralCode) {
    queryParams.set("ref", referralCode);
  }
  if (chain) {
    queryParams.set("chain", chain);
  }
  const referralLink = referralCode ? `${currentUrl}?${queryParams.toString()}` : "";

  const ReferralCard = () => (
    <div className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4 m-4 lg:m-4 lg:w-80">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-gray-300 text-sm">Your referral code</span>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
        <span className="text-white font-mono text-lg">{referralCode}</span>
        <Copy
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white"
          onClick={() => copyToClipboard(referralCode!)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Coins className="w-4 h-4 text-yellow-500" />
        <span className="text-gray-300 text-sm">Share and Earn</span>
      </div>
      <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
        <span className="text-gray-400 text-sm truncate">{referralLink}</span>
        <Copy
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white flex-shrink-0"
          onClick={() => copyToClipboard(referralLink)}
        />
      </div>
      <p className="text-gray-400 text-xs">
        Earn $500 per user by sharing your referral link.
      </p>
      <div className="bg-gray-900 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-xs">Gem 100X - GMGN</span>
       

 </div>
        <div className="bg-gray-800 rounded px-2 py-1 text-xs text-gray-300 font-mono">
          gmgn.ai/eth/token/<span className="text-red-400">xxxxxxxx</span>_0x123
        </div>
      </div>
      <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 px-4 text-sm transition-colors">
        View Tutorial
      </button>
      <div>
        <h3 className="text-white font-medium mb-2">Total Earnings: ${totalEarnings}</h3>
        <h3 className="text-white font-medium mb-2">Invited Friends ({referredUsers.length})</h3>
        {referredUsers.length === 0 ? (
          <p className="text-gray-400 text-sm">You have not yet invited anyone.</p>
        ) : (
          <ul className="text-gray-400 text-sm max-h-40 overflow-y-auto">
            {referredUsers.map((user, index) => (
              <li key={index} className="mb-2">
                <span className="font-mono">{user.referred_address.slice(0, 6)}...{user.referred_address.slice(-4)}</span>
                <span className="ml-2 text-xs">
                  ({new Date(user.created_at).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      <div className="lg:hidden flex flex-col">
        {isConnected && referralCode && <ReferralCard />}
        <div className="relative h-[400px] p-4">
          <div className="mb-6">
            <h2 className="text-xl font-normal mb-4 leading-relaxed text-gray-200">
              Invite Friends and Earn
              <br />
              Commissions Get up to
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-green-400 text-4xl font-bold">$</span>
              <span className="text-blue-400 text-4xl font-bold">
                {currentCommission.amount}
              </span>
              <span className="text-white text-xl ml-2">Commission</span>
            </div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-48 absolute bottom-0 left-0" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M 8 90 C 30 88, 70 60, 100 30 L 100 100 L 8 100 Z" fill="url(#areaGradient)" />
            <path
              d="M 8 90 C 30 88, 70 60, 100 30"
              stroke="url(#lineGradient)"
              strokeWidth="0.3"
              fill="none"
              filter="url(#glow)"
            />
            {commissionData.map((data, index) => (
              <circle
                key={index}
                cx={data.position.x}
                cy={data.position.y}
                r="0.3"
                fill="white"
                stroke="white"
                strokeWidth="0.1"
                className={`transition-all duration-300 ${index === currentIndex ? "opacity-100" : "opacity-80"}`}
                style={{
                  filter: index === currentIndex ? "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))" : "none",
                  shapeRendering: "geometricPrecision",
                }}
              />
            ))}
          </svg>
          <div
            className="absolute transition-all duration-1000 ease-in-out z-20"
            style={{
              left: `${currentCommission.position.x}%`,
              bottom: `${100 - currentCommission.position.y + 5}%`, // Adjusted to position above the dot
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Earn commission</div>
              <div className="text-white font-semibold text-sm whitespace-nowrap">
                ${currentCommission.amount}/month
              </div>
              <svg width="2" height="12" className="mx-auto">
                <path d="M 1 0 L 1 12" stroke="#6b7280" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
            </div>
          </div>
          {commissionData.map((data, index) => (
            <div
              key={index}
              className="absolute bottom-4 z-10"
              style={{
                left: `${data.position.x}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span
                className={`text-xs transition-colors duration-300 ${
                  index === currentIndex ? "text-green-400" : "text-gray-500"
                }`}
              >
                {data.volume}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex h-[600px] relative overflow-hidden gap-6">
        {isConnected && referralCode && (
          <div className="order-last">
            <ReferralCard />
          </div>
        )}
        <div className="flex-1 relative h-[480px]">
          <div className="absolute top-8 z-10" style={{ left: `${getPointOnCurve(0).x - 2}%` }}>
            <h2 className="text-xl font-normal mb-4 leading-relaxed text-gray-200">
              Invite Friends and Earn
              <br />
              Commissions Get up to
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-green-400 text-4xl font-bold">$</span>
              <span className="text-blue-400 text-4xl font-bold">
                {currentCommission.amount}
              </span>
              <span className="text-white text-xl ml-2">Commission</span>
            </div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradientDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#064e3B" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGradientDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M 8 90 C 30 88, 70 60, 100 30 L 100 100 L 8 100 Z" fill="url(#areaGradientDesktop)" />
            <path
              d="M 8 90 C 30 88, 70 60, 100 30"
              stroke="url(#lineGradientDesktop)"
              strokeWidth="0.3"
              fill="none"
            />
            {commissionData.map((data, index) => (
              <circle
                key={index}
                cx={data.position.x}
                cy={data.position.y}
                r="0.3"
                fill="white"
                className={`transition-all duration-1 ${index === currentIndex ? '' : 'opacity-80'}`}
              />
            ))}
          </svg>
          <div
            className="absolute z-10"
            style={{
              left: `${currentCommission.position.x}%`,
              top: `${currentCommission.position.y - 12}%`, // Position above the dot
              transform: "translateX(-50%)",
            }}
          >
            <div className="text-center">
              <div className="text-white text-xs opacity-60 mb-1">Earn commission</div>
              <div className="text-white font-semibold text-sm whitespace-nowrap">
                ${currentCommission.amount}
              </div>
              <svg width="2" height="24" className="mx-auto">
                <path d="M 1 0 L 1 24" stroke="#6b7280" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
            </div>
          </div>
          {commissionData.map((data, index) => (
            <div
              key={index}
              className="absolute bottom-4 z-10"
              style={{
                left: `${data.position.x}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span
                className={`text-xs transition-colors duration-300 ${
                  index === currentIndex ? "text-green-400" : "text-gray-500"
                }`}
              >
                {data.volume}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}