"use client";

import { usePathname } from "next/navigation";
import Background from "./Background";

/** Wraps public pages with the navbar and footer; the admin panel renders its own chrome. */
export default function SiteShell({
    navbar,
    footer,
    children,
}: {
    navbar: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) return <>{children}</>;

    return (
        <div className="relative isolate">
            <Background />
            {navbar}
            <main className="pt-20 min-h-screen">{children}</main>
            {footer}
        </div>
    );
}
