import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select("address").limit(1);
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}