// components/forms/FooterLink.tsx
"use client";
import Link from "next/link";

type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
};

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
    return (
        <div className="text-center pt-4">
        <p className="text-sm text-gray-500">
                {text}{" "}
                <Link rel="canonical" href={href} className="footer-link text-orange-400 hover:underline">
                    {linkText}
                </Link>
            </p>
        </div>
    );
};

export default FooterLink;
