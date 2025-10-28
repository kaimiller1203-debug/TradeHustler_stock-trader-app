"use client";

import React from "react";
import Image from "next/image";
import GlassIcon from "./GlassIcon";
import type { Post } from "@/types/post";
import LikeIcon from "@/components/icons/LikeIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import MoreIcon from "@/components/icons/MoreIcon";
import { Glass } from "../ui/Glass";
export default function AlertPostCard({ post }: { post: Post }) {
    const hasMedia = !!post.mediaUrl;
    const alert = post.alert!; // safe: router guarantees alerts only

    return (
        <div className="relative w-full mb-6">
            <Glass className="rounded-3xl p-4">
                <article
                    className="
                        relative
                        w-full
                        rounded-[24px]
                        border border-[rgba(242,115,3,0.25)]
                        px-4 py-3
                        overflow-visible
                      "
                >
                    {/* Unified Alert Header (2 rows) */}
                    <Glass className="rounded-3xl p-4">

                    <div
                            className="
                w-full
                rounded-[20px]
                border border-[rgba(242,115,3,0.25)]
                px-3 py-3 mb-3
                flex flex-col gap-2
              "
                        >
                            {/* Row 1: Live + Symbol */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[rgb(242,115,3)]" />
                                    <div className="absolute inset-0 rounded-full animate-ping bg-[rgba(242,115,3,0.35)]" />
                                </div>

                                <span className="uppercase text-[12px] tracking-wide">
                  {alert.symbol} • {alert.side.toUpperCase()} • {alert.entryType}
                </span>

                                {alert.premium && (
                                    <span className="ml-auto text-[11px] bg-[rgba(242,115,3,0.25)] px-2 py-1 rounded-full">
                    Premium
                  </span>
                                )}
                            </div>

                            {/* Row 2: Metrics */}
                            <div className="flex items-center gap-4 text-[12px]">
                                <div className="flex items-center gap-1">
                                    <span className="text-white/90 font-medium">252.5M</span>
                                    <span className="text-white/40">Vol</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className="text-white/90 font-medium">25K</span>
                                    <span className="text-white/40">Sentiment</span>
                                </div>
                            </div>
                        </div>
                    </Glass>

                    {/* Floating icon stacks */}
                    {hasMedia ? (
                        <>
                            {/* Right */}
                            <div
                                className="
                  absolute
                  top-1/2 -translate-y-1/2
                  right-[12px]
                  z-30
                  flex flex-col justify-between items-center
                  h-[147px]
                "
                            >
                                <GlassIcon><LikeIcon /></GlassIcon>
                                <GlassIcon><CommentIcon /></GlassIcon>
                                <GlassIcon><ShareIcon /></GlassIcon>
                            </div>

                            {/* Left */}
                            <div
                                className="
                  absolute
                  top-1/2 -translate-y-1/2
                  left-[12px]
                  z-30
                  flex flex-col justify-center
                  h-[36px]
                "
                            >
                                <GlassIcon><MoreIcon /></GlassIcon>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="
                  absolute
                  top-1/2 -translate-y-1/2
                  right-[12px]
                  z-30
                  flex flex-col justify-between items-center
                  h-[90px]
                "
                            >
                                <GlassIcon><LikeIcon /></GlassIcon>
                                <GlassIcon><CommentIcon /></GlassIcon>
                                <GlassIcon><ShareIcon /></GlassIcon>
                            </div>

                            <div
                                className="
                  absolute
                  top-1/2 -translate-y-1/2
                  left-[12px]
                  z-30
                  flex flex-col justify-center
                  h-[36px]
                "
                            >
                                <GlassIcon><MoreIcon /></GlassIcon>
                            </div>
                        </>
                    )}

                    {/* Text */}
                    {post.text && (
                        <p className="text-[14px] leading-6 text-white/90 mb-3">
                            {post.text}
                        </p>
                    )}

                    {/* Media (optional, still inside the card) */}
                    {hasMedia && (
                        <div
                            className="
                relative
                mt-2 overflow-hidden rounded-2xl
                border border-[rgba(242,115,3,0.20)]
                bg-black/20
              "
                        >
                            <Image
                                src={post.mediaUrl}
                                alt="alert-media"
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
