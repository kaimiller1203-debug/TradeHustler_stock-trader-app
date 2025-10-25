"use client";
import { createBrowserClient } from "@supabase/ssr";
import { createClient as createServerClient } from "@supabase/supabase-js";


export const createSupabaseBrowser = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );


export const createSupabaseServer = () =>
    createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    );


// lib/supabase/types.ts (minimal)
export type Profile = {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    gems: number;
    chests: number;
    wins: number;
    losses: number;
    win_rate: number; // stored percent
    best_streak: number;
    current_streak: number;
};


export type Alert = {
    id: string;
    user_id: string;
    symbol: string;
    direction: 'long' | 'short';
    timeframe: string | null;
    entry_price: number | null;
    stop_loss: number | null;
    take_profit: number | null;
    content: string | null;