import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-gide-default">
                <Link href="/" className="auth-logo">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Trader Pioneer logo"
                        width={140}
                        height={30}
                        className="h-8 w-auto"
                    />
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>
            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lgmb-16">
                    <blockquote className="auth-blockquote">
                        "Trader Pioneer is where traders evolve into pioneers, tracking the markets in real time, learning from live data, and growing with community insight."
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-tetimonial-author">- Honest P</cite>
                            <p className="max-md:text-xs text-orange-500">CEO&Day Trader</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Image src="/assets/icons/star.svg" alt="star" key={star} width={20} height={20} className="w-5 h-5" />
                        ))}
                    </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <Image src="/assets/images/dashboard.png" alt="Dashboard Preview" width={1400} height={1150} className="auth-dashboard-preview absolute top-0"/>

                </div>
            </section>
        </main>
    );
};
console.log("AUTH LAYOUT LOADING");

export default Layout;

