"use client";

import { useEffect } from "react";

/**
 * Tilts the workflow panel towards the pointer by setting --mx/--my (-1..1) on it, and marks the
 * hero `hero-offscreen` when it scrolls out of view so its looping animation pauses.
 * Scroll effects live in CSS (scroll-driven animations), so nothing here runs per scroll frame.
 */
export default function HeroMotion({ sectionId, panelId }: { sectionId: string; panelId: string }) {
    useEffect(() => {
        const section = document.getElementById(sectionId);
        const panel = document.getElementById(panelId);
        if (!section || !panel) return;

        const observer = new IntersectionObserver(([entry]) => section.classList.toggle("hero-offscreen", !entry.isIntersecting));
        observer.observe(section);

        const tilt = window.matchMedia("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
        let frame = 0;
        let visible = true;
        let mx = 0;
        let my = 0;
        const apply = () => {
            frame = 0;
            panel.style.setProperty("--mx", mx.toFixed(3));
            panel.style.setProperty("--my", my.toFixed(3));
        };
        const onPointer = (e: PointerEvent) => {
            if (!visible) return;
            mx = (e.clientX / window.innerWidth) * 2 - 1;
            my = (e.clientY / window.innerHeight) * 2 - 1;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        const visibility = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
        if (tilt) {
            visibility.observe(panel);
            window.addEventListener("pointermove", onPointer, { passive: true });
        }

        return () => {
            observer.disconnect();
            visibility.disconnect();
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onPointer);
        };
    }, [sectionId, panelId]);

    return null;
}
