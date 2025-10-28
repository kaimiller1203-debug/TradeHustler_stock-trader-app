import React from "react";

interface GlassProps {
    children?: React.ReactNode;
    className?: string;
}

export const Glass: React.FC<GlassProps> = ({ children, className = "" }) => {
    return (
        <div
            className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl ${className}`}
        >
            {children}
        </div>
    );
};
