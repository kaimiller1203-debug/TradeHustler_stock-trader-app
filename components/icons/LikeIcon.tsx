"use client";
import React from "react";

export default function LikeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width="29.8065"
                height="26"
                rx="13"
                fill="black"
                fillOpacity="0.01"
            />
            <rect
                x="0.5"
                y="0.5"
                width="28.8065"
                height="25"
                rx="12.5"
                stroke="#F27303"
                strokeOpacity="0.2"
            />
            <path
                d="M14.7181 8.24538C12.6303 3.41535 5.32263 3.92979 5.32263 10.1031C5.32263 16.2765 14.7181 21.4211 14.7181 21.4211C14.7181 21.4211 24.1137 16.2765 24.1137 10.1031C24.1137 3.92979 16.806 3.41535 14.7181 8.24538Z"
                stroke="#F9F8F8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
