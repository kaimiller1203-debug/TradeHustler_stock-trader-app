"use client";

import { useEffect, useState } from 'react';
import PostComposer from '@/components/feed/PostComposer';
import PostCard from '@/components/feed/PostCard';
import { Post } from '@/types/post';
import { loadFeed, saveFeed } from '@/lib/storage';

export default function HomePage() {
    const [feed, setFeed] = useState<Post[]>([]);

    useEffect(() => {
        const initial = loadFeed<Post[]>() ?? demoSeed();
        setFeed(initial);
    }, []);

    useEffect(() => {
        if (feed.length) saveFeed(feed);
    }, [feed]);

    const addPost = (p: Post) => {
        setFeed((prev) => [p, ...prev]);
    };

    return (
        <main className="mx-auto w-full max-w-2xl px-3 py-4">
            {/* Header bar (same layout; keep it subtle) */}
            <div className="sticky top-0 z-10 -mx-3 mb-3 border-b border-muted/30 bg-background/60 px-3 py-2 backdrop-blur">
                <h1 className="text-xl font-semibold">Home</h1>
            </div>

            <PostComposer onCreate={addPost} />

            <div className="mt-2 divide-y divide-muted/30">
                {feed.map((p) => (
                    <PostCard key={p.id} post={p} />
                ))}
            </div>
        </main>
    );
}

function demoSeed(): Post[] {
    const now = Date.now();
    return [
        {
            id: 'seed1',
            userId: 'u1',
            username: 'TraderPioneer',
            avatarUrl: '/assets/avatars/default.png',
            createdAt: new Date(now - 1000 * 60 * 60).toISOString(),
            html:
                '<b>Welcome!</b> This is your new <i>Home</i> feed. Use the composer above to post with <u>formatting</u> and <span style="color:#22d3ee">color</span>.',
            attachments: [{ type: 'link', url: 'https://tradingview.com', title: 'TradingView' }],
            metrics: { likes: 3, replies: 1, reposts: 0 },
            animation: 'none',
        },
        {
            id: 'seed2',
            userId: 'u2',
            username: 'MarketBot',
            avatarUrl: '/assets/avatars/default.png',
            createdAt: new Date(now - 1000 * 60 * 20).toISOString(),
            html: 'Daily reminder: Protect capital. Set <u>stops</u>. Trade your plan.',
            attachments: [],
            metrics: { likes: 5, replies: 0, reposts: 2 },
            animation: 'jump',
        },
    ];
}
