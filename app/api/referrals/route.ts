import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("referral_code")
    .eq("address", address)
    .single();

  const { data: referrals, error: referralsError } = await supabase
    .from("referrals")
    .select("referred_address, created_at")
    .eq("referrer_address", address);

  if (userError || referralsError) {
    return NextResponse.json({ error: userError?.message || referralsError?.message }, { status: 500 });
  }

  return NextResponse.json({ user, referrals: referrals || [] });
}

export async function POST(req: NextRequest) {
  const { referrer_code, referred_address, new_referral_code } = await req.json();

  if (!referred_address) {
    return NextResponse.json({ error: "Referred address required" }, { status: 400 });
  }

  // Check if user already has a referral code
  const { data: existingUser, error: userError } = await supabase
    .from("users")
    .select("referral_code")
    .eq("address", referred_address)
    .single();

  if (userError && userError.code !== "PGRST116") { // PGRST116: No rows found
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  if (!existingUser && new_referral_code) {
    // Insert new user with referral code
    const { error: insertError } = await supabase.from("users").insert({
      address: referred_address,
      referral_code: new_referral_code,
    });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  if (referrer_code) {
    // Find referrer by referral code
    const { data: referrer, error: referrerError } = await supabase
      .from("users")
      .select("address")
      .eq("referral_code", referrer_code)
      .single();

    if (referrerError || !referrer) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
    }

    // Check if user already referred
    const { data: existingReferral, error: existingError } = await supabase
      .from("referrals")
      .select("id")
      .eq("referred_address", referred_address)
      .single();

    if (existingReferral) {
      return NextResponse.json({ error: "User already referred" }, { status: 400 });
    }

    // Insert referral
    const { error } = await supabase.from("referrals").insert({
      referrer_address: referrer.address,
      referred_address,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}