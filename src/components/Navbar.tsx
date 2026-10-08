"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { site } from "@/lib/site";
import LogoMark from "./LogoMark";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
];

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <LogoMark className="w-7 h-7 transition-transform group-hover:scale-105" />
            <span className="font-medium tracking-tight text-white text-[17px]">{site.name}</span>
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    return (
        <header
            className={clsx(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
                scrolled || open ? "bg-[#06060c]/90 border-b border-white/[0.06]" : "border-b border-transparent"
            )}
        >
            <nav className="relative mx-auto max-w-[1188px] h-20 px-6 flex items-center justify-between">
                <Logo />

                <ul className="hidden md:flex items-center gap-1.5">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={isActive(item.href) ? "page" : undefined}
                                className={clsx(
                                    "px-3.5 py-2 text-[13px] transition-colors",
                                    isActive(item.href) ? "text-white" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2.5">
                    <span className="hidden lg:inline-flex items-center gap-2 h-10 px-3.5 rounded-full border border-white/15 bg-black/40 font-mono text-[13px] text-gray-200">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                        open for new projects
                    </span>
                    <Link
                        href="/contact"
                        className="hidden sm:inline-flex items-center h-9 px-5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_24px_-6px_rgba(255,255,255,0.5)]"
                    >
                        Start a Project
                    </Link>
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="md:hidden grid place-items-center w-10 h-10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                <div
                    className={clsx(
                        "md:hidden absolute inset-x-4 top-full origin-top rounded-3xl border border-white/10 bg-[#0b0b14] p-2 shadow-2xl transition-all duration-200",
                        open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={clsx(
                                "flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors",
                                isActive(item.href) ? "bg-white/[0.08] text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {item.name}
                            {isActive(item.href) && <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-2 flex items-center justify-center gap-1.5 h-12 rounded-2xl bg-white text-black font-semibold"
                    >
                        Start a Project <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
