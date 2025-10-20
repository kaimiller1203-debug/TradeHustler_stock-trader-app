import Image from 'next/image';
import Link from 'next/link';
import NavItems from "@/components/NavItems";
import UserDropDown from "@/components/UserDropDown";

const Header = () => {
    return (
        <header className="sticky top-0 header">
            <div className="container flex items-center justify-between gap-4 py-4">
                <Link href="/public">
                    <Image
                        src="/public/assets/icons/logo.svg"
                        alt="logo"
                        width={140}
                        height={32}
                        className="h-8 w-auto cursor-pointer"
                    />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>
                <UserDropDown/>
            </div>
        </header>
    );
};

export default Header;