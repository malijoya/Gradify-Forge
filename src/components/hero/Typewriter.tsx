"use client";

import { useEffect, useState } from "react";

/**
 * Types `text` out one character at a time. The full string reserves the space up front
 * (so nothing shifts) and is what screen readers get.
 */
export default function Typewriter({ text, delay = 0, speed = 38 }: { text: string; delay?: number; speed?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let timer: ReturnType<typeof setTimeout>;
        const tick = (n: number) => {
            setCount(n);
            if (n < text.length) timer = setTimeout(() => tick(n + 1), speed);
        };
        timer = instant ? setTimeout(() => setCount(text.length), 0) : setTimeout(() => tick(1), delay);
        return () => clearTimeout(timer);
    }, [text, delay, speed]);

    const done = count >= text.length;

    return (
        <span className="relative inline-block">
            <span className="sr-only">{text}</span>
            <span aria-hidden className="invisible">{text}</span>
            <span aria-hidden className="absolute inset-0 whitespace-pre-wrap">
                {text.slice(0, count)}
                {count > 0 && !done && <span className="opacity-70">▍</span>}
            </span>
        </span>
    );
}
