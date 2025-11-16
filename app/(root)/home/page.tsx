"use client";

import React, { useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderTabs from "@/components/layout/HeaderTabs";
import PostBubbleButton from "@/components/post/PostBubbleButton";
import PostCard from "@/components/post/PostCard";
import type { Post } from "@/types/post";
import RightPanel from "@/components/layout/RightPanel";

export default function HomePage() {
    const handleOpenComposer = () => {
        console.log("PostBubble clicked");
    };

    // Demo feed — alerts + normal
    const feed: Post[] = useMemo(
        () => [
            {
                id: "1",
                user: { name: "Kai Dion", handle: "KaiDionKing" },
                createdAt: new Date().toISOString(),
                text: "Mars pattern breaking out. Watching momentum on the 15m.",
                mediaUrl: "/assets/sample/mars.jpg",
                alert: {
                    symbol: "GBPJPY",
                    side: "buy",
                    tp: 252.5,
                    sl: 251.8,
                    entryType: "market",
                    premium: false,
                },
            },
            {
                id: "2",
                user: { name: "Hustler Pioneer", handle: "HustlerPioneer" },
                createdAt: new Date().toISOString(),
                text: "Alpha drop: private alert. Unlock to view full levels.",
                alert: {
                    symbol: "AAPL",
                    side: "sell",
                    entryType: "limit",
                    premium: true,
                },
            },
            {
                id: "3",
                user: { name: "Trader P", handle: "pioneer" },
                createdAt: new Date().toISOString(),
                text: "New UI glass pass. Thoughts?",
            },
        ],
        []
    );

    return (
        <div className="w-full min-h-screen flex bg-black text-white">
            <Sidebar />

            {/* Center column */}
            <main className="flex-1 max-w-[650px] mx-auto border-r border-white/10 p-4 relative">
                <HeaderTabs />

                <div className="mt-6">
                    {feed.map((p) => (
                        <PostCard key={p.id} post={p} />
                    ))}
                </div>

                <PostBubbleButton onClick={handleOpenComposer} />
            </main>

            {/* Right widgets column */}
            <aside className="hidden xl:flex w-[360px] p-4">
                <RightPanel />
            </aside>
        </div>
    );
}
