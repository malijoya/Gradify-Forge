"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Inbox, Layers, LayoutDashboard, LogOut, Plus, UploadCloud } from "lucide-react";
import { clsx } from "clsx";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";
import { logout } from "../actions";

type Props = { projectCount: number; unread: number };

export default function AdminNav({ projectCount, unread }: Props) {
    const pathname = usePathname();
    const items = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard, badge: null },
        { href: "/admin/projects", label: "Projects", icon: Layers, badge: projectCount ? { n: projectCount, hot: false } : null },
        { href: "/admin/inquiries", label: "Inquiries", icon: Inbox, badge: unread ? { n: unread, hot: true } : null },
    ];
    const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/[0.07] bg-black/30 backdrop-blur-xl p-4">
                <Link href="/admin" className="flex items-center gap-2.5 px-2 py-2 mb-6">
                    <LogoMark />
                    <span className="font-semibold tracking-tight">{site.name}</span>
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-400">Admin</span>
                </Link>

                <Link
                    href="/admin/projects/new"
                    className="mb-6 flex items-center justify-center gap-2 h-10 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shadow-[0_0_24px_-8px_rgba(255,255,255,0.6)]"
                >
                    <Plus className="w-4 h-4" /> New project
                </Link>

                <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">Manage</div>
                <nav className="space-y-1">
                    {items.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "relative flex items-center gap-3 px-3 h-10 rounded-xl text-sm font-medium transition-colors",
                                    active ? "bg-white/[0.07] text-white" : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                                )}
                            >
                                {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-violet-400 to-pink-500" />}
                                <item.icon className="w-4 h-4" />
                                {item.label}
                                {item.badge && (
                                    <span
                                        className={clsx(
                                            "ml-auto min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold grid place-items-center",
                                            item.badge.hot ? "bg-pink-600 text-white" : "bg-white/[0.08] text-gray-300"
                                        )}
                                    >
                                        {item.badge.n}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto mb-4 rounded-xl border border-sky-400/15 bg-sky-500/[0.06] p-3 text-xs text-gray-400 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-semibold text-sky-300 mb-1">
                        <UploadCloud className="w-3.5 h-3.5" /> Publishing
                    </div>
                    Changes here are saved on this computer. Run <code className="text-gray-200">npm run publish</code> to push them to GitHub and update the live site.
                </div>
                <div className="space-y-1 pt-4 border-t border-white/[0.07]">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                        <ExternalLink className="w-4 h-4" /> View website
                    </Link>
                    <form action={logout}>
                        <button className="w-full flex items-center gap-3 px-3 h-10 rounded-xl text-sm text-gray-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                            <LogOut className="w-4 h-4" /> Log out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile top bar */}
            <header className="lg:hidden sticky top-0 z-40 border-b border-white/[0.07] bg-black/60 backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href="/admin" className="flex items-center gap-2">
                        <LogoMark className="w-8 h-8" />
                        <span className="font-semibold tracking-tight text-sm">{site.name}</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Link href="/admin/projects/new" aria-label="New project" className="grid place-items-center w-9 h-9 rounded-lg bg-white text-black">
                            <Plus className="w-4 h-4" />
                        </Link>
                        <Link href="/" target="_blank" aria-label="View website" className="grid place-items-center w-9 h-9 rounded-lg text-gray-400 hover:bg-white/10">
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                        <form action={logout}>
                            <button aria-label="Log out" className="grid place-items-center w-9 h-9 rounded-lg text-gray-400 hover:bg-white/10">
                                <LogOut className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
                <nav className="flex gap-1 px-3 pb-2 overflow-x-auto">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-2 px-3 h-9 rounded-lg text-sm font-medium whitespace-nowrap",
                                isActive(item.href) ? "bg-white/[0.08] text-white" : "text-gray-400"
                            )}
                        >
                            <item.icon className="w-4 h-4" /> {item.label}
                            {item.badge?.hot && <span className="min-w-5 h-5 px-1 rounded-full bg-pink-600 text-white text-[11px] font-bold grid place-items-center">{item.badge.n}</span>}
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
