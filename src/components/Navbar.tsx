"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home, Briefcase, Layers, ShoppingCart, LayoutDashboard } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Portfolio", href: "/portfolio", icon: Layers },
    { name: "Order", href: "/order", icon: ShoppingCart },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                GradifyForge
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={twMerge(
                                            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                            isActive
                                                ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={clsx("md:hidden", isOpen ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-xl border-b border-white/10">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={twMerge(
                                    "block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
