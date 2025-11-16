// Basic post + alert types used across feed & composer

export type AlertSide = "buy" | "sell";
export type EntryType = "market" | "limit" | "stop";

export interface AlertData {
    symbol: string;         // e.g. "AAPL", "BTCUSD", "GBPJPY"
    side: AlertSide;        // "buy" | "sell"
    tp?: number;            // take profit
    sl?: number;            // stop loss
    entryType: EntryType;   // "market" | "limit" | "stop"
    premium?: boolean;      // if true -> hide details & show Buy Now CTA
}

export interface Post {
    id: string;
    user: {
        name: string;
        handle: string;
        avatarUrl?: string;
    };
    createdAt: string;  // ISO string
    text?: string;
    mediaUrl?: string;
    alert?: AlertData;  // optional alert payload
}
