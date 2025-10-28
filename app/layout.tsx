// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-dvh bg-black text-white">
        {children}  {/* ⛳ This is what was missing */}
        </body>
        </html>
    );
}
