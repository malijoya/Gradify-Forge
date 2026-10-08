/*
 * Faint light strands drifting behind the home page sections, echoing the hero ribbons.
 * Static SVG: painted once and scrolled with the page, so it costs nothing per frame.
 */

const sets = [
    { top: "4%", flip: false, grad: "strand-a" },
    { top: "38%", flip: true, grad: "strand-b" },
    { top: "70%", flip: false, grad: "strand-a" },
];

const r = (n: number) => Math.round(n * 10) / 10;
const paths = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13;
    return `M -60 ${r(120 + t * 260)} C ${r(380 + t * 80)} ${r(-40 + t * 120)} ${r(760 - t * 60)} ${r(820 - t * 140)} 1500 ${r(380 + t * 220)}`;
});

export default function PageStrands() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="strand-a" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="#8b5cf6" stopOpacity="0" />
                        <stop offset="0.45" stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="strand-b" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="#ec4899" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#e879f9" />
                        <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
            {sets.map((s) => (
                <svg
                    key={s.top}
                    className="absolute left-0 w-full h-[900px] opacity-[0.28]"
                    style={{ top: s.top, transform: s.flip ? "scaleX(-1)" : undefined }}
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMid slice"
                    fill="none"
                >
                    {paths.map((d, i) => (
                        <path key={i} d={d} stroke={`url(#${s.grad})`} strokeWidth={i % 4 === 0 ? 1.4 : 0.8} strokeOpacity={0.35 + (i % 5) * 0.12} />
                    ))}
                </svg>
            ))}
        </div>
    );
}
