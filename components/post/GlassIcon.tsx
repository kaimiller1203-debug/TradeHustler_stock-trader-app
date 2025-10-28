import React from "react";

interface GlassIconProps {
    children: React.ReactNode;
    className?: string;
}

const GlassIcon: React.FC<GlassIconProps> = ({ children, className = "" }) => {
    return (
        <div
            className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-2 flex items-center justify-center ${className}`}
        >
            {children}
        </div>
    );
};

export default GlassIcon;
