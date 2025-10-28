"use client";
import { Glass } from "../ui/Glass";

import React from "react";
import Image from "next/image";
import GlassIcon from "@/components/post/GlassIcon";
import type { Post } from "@/types/post";
import LikeIcon from "@/components/icons/LikeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import MoreIcon from "@/components/icons/MoreIcon";

export default function FeedPostCard({ post }: { post: Post }) {
    const hasMedia = !!post.mediaUrl;

    return (
        <div className="relative w-full mb-6">
            {/* Outer glass card */}
            <Glass tint="dark" intensity={65} cornerRadius={24}>
                <article
                    className="
            relative
            w-full
            rounded-[24px]
            border border-[rgba(242,115,3,0.20)]
            px-4 py-3
            overflow-visible
          "
                >
                    {/* LEFT: More (centered) */}
                    <div
                        className={`
              absolute
              ${hasMedia ? "top-1/2 -translate-y-1/2" : "top-1/2 -translate-y-1/2"}
              left-[12px]
              z-30
              flex flex-col justify-center
              h-[36px]
            `}
                    >
                        <GlassIcon><MoreIcon /></GlassIcon>
                    </div>

                    {/* RIGHT: Like/Comment/Share (dynamic height) */}
                    <div
                        className={`
              absolute
              ${hasMedia ? "top-1/2 -translate-y-1/2 h-[147px]" : "top-1/2 -translate-y-1/2 h-[90px]"}
              right-[12px]
              z-30
              flex flex-col justify-between items-center
            `}
                    >
                        <GlassIcon><LikeIcon /></GlassIcon>
                        <GlassIcon><CommentIcon /></GlassIcon>
                        <GlassIcon><ShareIcon /></GlassIcon>
                    </div>

                    {/* Header */}
                    <header className="flex items-center gap-3">
                        <div
                            className="
                h-10 w-10 rounded-full
                bg-[rgba(242,115,3,0.18)]
                border border-[rgba(242,115,3,0.25)]
                flex items-center justify-center
              "
                        >
                            <span className="text-xs">HP</span>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">{post.user.name}</span>
                                <span className="text-xs text-white/60">@{post.user.handle}</span>
                            </div>
                        </div>
                    </header>

                    {/* Text */}
                    {post.text && (
                        <p className="mt-3 text-[14px] leading-6 text-white/90">
                            {post.text}
                        </p>
                    )}

                    {/* Media (optional, full-bleed inside card body) */}
                    {hasMedia && (
                        <div
                            className="
                relative
                mt-3 overflow-hidden rounded-2xl
                border border-[rgba(242,115,3,0.20)]
                bg-black/20
              "
                        >
                            <Image
                                src={post.mediaUrl}
                                alt="media"
                                width={1200}
                                height={800}
                                className="h-auto w-full object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                </article>
            </Glass>
        </div>
    );
}
