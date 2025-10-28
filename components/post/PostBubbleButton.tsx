"use client";

import React, { useEffect } from "react";

type Props = {
  onClick: () => void;
};

export default function PostBubbleButton({ onClick }: Props) {
  // Optional: keyboard shortcut (press "p" to open)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "p") onClick();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClick]);

  return (
    <button
      aria-label="Create post"
      onClick={onClick}
      className="
        fixed left-2 top-1/2 -translate-y-1/2
        z-50
        h-12 w-12 rounded-full
        backdrop-blur-md bg-white/10 hover:bg-white/15
        border border-white/20
        shadow-lg
        transition-transform duration-150 active:scale-95
        outline-none focus:ring-2 focus:ring-white/30
      "
    >
      {/* Simple plus icon */}
      <svg
        viewBox="0 0 24 24"
        className="m-auto h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
}
