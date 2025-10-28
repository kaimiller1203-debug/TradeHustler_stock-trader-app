"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

type Tab = {
    label: string;
    href: string;
};

const TABS: Tab[] = [
    { label: "Community", href: "/community" },
    { label: "Home Feed", href: "/home" },
    { label: "Alerts", href: "/alerts" },
];

export default function HeaderTabs() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div
            className="
        relative
        w-full
        flex
        items-center
        justify-start
        gap-2
        px-3 py-2
        rounded-[45px]
        border border-[rgba(242,115,3,0.20)]
        bg-[rgba(242,115,3,0.10)]
        backdrop-blur-lg
        overflow-hidden
      "
            style={{ height: "90px" }}
        >
            {TABS.map((tab) => {
                const active = pathname === tab.href;

                return (
                    <button
                        key={tab.href}
                        onClick={() => router.push(tab.href)}
                        className={`
              relative z-10 px-6 py-2 rounded-[45px] text-sm font-medium transition
              ${
                            active
                                ? "bg-[rgba(242,115,3,0.25)] text-white shadow-[0_0_20px_rgba(242,115,3,0.25)]"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                        }
            `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
