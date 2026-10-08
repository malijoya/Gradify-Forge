"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `is-visible` to `.home-reveal` / `.home-stagger` elements the first time they scroll into
 * view, which plays their CSS transitions (see globals.css). One observer per page, and each
 * element is dropped from it as soon as it has been revealed.
 */
export default function RevealObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const targets = document.querySelectorAll(".home-reveal:not(.is-visible), .home-stagger:not(.is-visible)");
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
        );
        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    return null;
}
