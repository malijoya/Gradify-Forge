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
            <LogoMark className="transition-transform group-hover:scale-105" />
            <span className="font-semibold tracking-tight text-white text-[17px]">{site.name}</span>
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
        <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
            <nav
                className={clsx(
                    "relative w-full max-w-5xl h-14 flex items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-300",
                    scrolled || open
                        ? "bg-[#0b0b14]/75 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
                        : "bg-white/[0.03] border-white/[0.07] backdrop-blur-md"
                )}
            >
                {/* Hairline highlight along the top edge */}
                <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <Logo />

                <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={clsx(
                                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                    isActive(item.href) ? "text-white bg-white/[0.08]" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {item.name}
                                {isActive(item.href) && (
                                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-5 h-[2px] rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <Link
                        href="/contact"
                        className="hidden sm:inline-flex items-center gap-1.5 h-10 pl-4 pr-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shadow-[0_0_24px_-6px_rgba(255,255,255,0.5)] group"
                    >
                        Start a Project
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                        "md:hidden absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white/10 bg-[#0b0b14]/95 backdrop-blur-xl p-2 shadow-2xl transition-all duration-200",
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
