"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Home, Bell, User, Settings } from "lucide-react";

type NavItem = {
    label: string;
    href: string;
    icon?: React.ReactNode; // placeholder slot for your icons later
};

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/home", icon: <Home className="h-4 w-4" /> },
    { label: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
    { label: "Alerts", href: "/alerts", icon: <Bell className="h-4 w-4" /> },
    { label: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-[260px] shrink-0 p-3">
            <div
                className="
          sticky top-3 h-[calc(100vh-24px)]
          w-full
          rounded-2xl
          border border-[rgba(242,115,3,0.20)]
          bg-[rgba(242,115,3,0.10)]
          backdrop-blur-md
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          flex flex-col
        "
            >
                {/* Brand */}
                <div className="px-4 pt-4 pb-2">
                    <div className="text-2xl font-extrabold tracking-wide">
                        Trader <span className="text-[rgb(242,115,3)]">Pioneer</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-white/10" />

                {/* Nav */}
                <nav className="flex-1 px-2 py-2 overflow-y-auto scrollbar-thin">
                    <ul className="space-y-2">
                        {NAV_ITEMS.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={[
                                            "group flex items-center gap-3 rounded-xl px-3 py-2",
                                            "transition-colors duration-150",
                                            "border border-transparent",
                                            active
                                                ? "bg-white/10 border-white/15"
                                                : "hover:bg-white/5",
                                        ].join(" ")}
                                    >
                                        {/* icon slot */}
                                        <span
                                            className={[
                                                "inline-flex h-6 w-6 items-center justify-center rounded-lg",
                                                active
                                                    ? "bg-[rgba(242,115,3,0.25)]"
                                                    : "bg-[rgba(242,115,3,0.15)]",
                                            ].join(" ")}
                                        >
                      {/* Replace with your icon later */}
                                            <span className="text-[10px] leading-none">★</span>
                    </span>

                                        <span className="text-sm font-medium">{item.icon}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer / profile mini (optional placeholder) */}
                <div className="px-4 py-3 border-t border-white/10 text-xs text-white/60">
                    v0.1 • HP
                </div>
            </div>
        </aside>
    );
}
