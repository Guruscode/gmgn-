"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";

interface User {
  address: string;
  referral_code: string | null;
}

interface Referral {
  referrer_address: string;
  referred_address: string;
  created_at: string;
}

interface UserWithReferrals extends User {
  referrals: Referral[];
  totalEarnings: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserWithReferrals[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsersAndReferrals() {
      try {
        // Fetch all users
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("address, referral_code");

        if (usersError) throw usersError;

        // Fetch all referrals
        const { data: referralsData, error: referralsError } = await supabase
          .from("referrals")
          .select("referrer_address, referred_address, created_at");

        if (referralsError) throw referralsError;

        // Combine users with their referrals
        const usersWithReferrals: UserWithReferrals[] = usersData.map((user) => {
          const userReferrals = referralsData.filter(
            (ref) => ref.referrer_address === user.address
          );
          return {
            ...user,
            referrals: userReferrals,
            totalEarnings: userReferrals.length * 500,
          };
        });

        setUsers(usersWithReferrals);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Failed to fetch data: ${error.message}`);
        } else {
          toast.error("Failed to fetch data: Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsersAndReferrals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Users & Referrals</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg text-gray-300 text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left">User Address</th>
                <th className="py-3 px-4 text-left">Referral Code</th>
                <th className="py-3 px-4 text-left">Referred Users</th>
                <th className="py-3 px-4 text-left">Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.address} className="border-b border-gray-700">
                    <td className="py-3 px-4 font-mono">
                      {user.address.slice(0, 6)}...{user.address.slice(-4)}
                    </td>
                    <td className="py-3 px-4 font-mono">{user.referral_code || "N/A"}</td>
                    <td className="py-3 px-4">
                      {user.referrals.length === 0 ? (
                        "None"
                      ) : (
                        <ul className="list-disc list-inside">
                          {user.referrals.map((ref, index) => (
                            <li key={index} className="text-xs">
                              {ref.referred_address.slice(0, 6)}...{ref.referred_address.slice(-4)} (
                              {new Date(ref.created_at).toLocaleDateString()})
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="py-3 px-4">${user.totalEarnings}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}