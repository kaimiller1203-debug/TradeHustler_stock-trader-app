"use client";

import React from "react";
import { Glass } from "../ui/Glass";


export default function RightPanel() {
    return (
        <div className="w-full h-fit space-y-4">
            {/* Chart widget card */}
            <Glass tint="dark" intensity={60} cornerRadius={24}>
                <div
                    className="
            w-full h-[260px]
            rounded-[24px]
            border border-[rgba(242,115,3,0.25)]
            flex items-center justify-center
            shadow-[0_8px_40px_rgba(242,115,3,0.25)]
          "
                >
                    <span className="text-[12px] text-white/60">TradingView Chart (embed next)</span>
                </div>
            </Glass>

            {/* More right-side widgets can stack here later */}
            <Glass tint="dark" intensity={50} cornerRadius={24}>
                <div
                    className="
            w-full h-[160px]
            rounded-[24px]
            border border-[rgba(242,115,3,0.25)]
            flex items-center justify-center
          "
                >
                    <span className="text-[12px] text-white/50">Stats / Leaderboard</span>
                </div>
            </Glass>
        </div>
    );
}
