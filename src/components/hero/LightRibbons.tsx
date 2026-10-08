/*
 * A bundle of light strands that sweep in from the top right, fold into a bright knot left of
 * centre and fan out towards the bottom right. They fade in as the hero scrolls (see .hero-ribbons),
 * so the first screen stays calm. Paths are generated once, deterministically, on the server.
 */

const STRANDS = 26;
const FOCUS = { x: 500, y: 430 };
const gradients = ["hero-rib-a", "hero-rib-b", "hero-rib-c"];

const r = (n: number) => Math.round(n * 10) / 10;

const strands = Array.from({ length: STRANDS }, (_, i) => {
    const t = i / (STRANDS - 1);
    const wobble = r(Math.sin(i * 2.3) * 18);
    const fx = FOCUS.x + t * 70 + wobble * 0.6;
    const fy = FOCUS.y + (t - 0.5) * 40;
    const k = 90 + t * 160;
    const d = [
        `M ${1520 - t * 140} ${-120 + t * 260 + wobble}`,
        `C ${1020 - t * 120} ${40 + t * 160} ${fx} ${fy - k * 1.4} ${fx} ${fy}`,
        `C ${fx} ${fy + k} ${880 + t * 260} ${640 + t * 80} ${1180 + t * 320} ${1000 + wobble}`,
    ].join(" ");
    return { d: d.replace(/-?\d+\.\d+/g, (n) => String(r(+n))), width: r(0.7 + ((i * 7) % 5) * 0.22), opacity: r(0.35 + ((i * 5) % 7) * 0.09), grad: gradients[i % 3] };
});

const motes = Array.from({ length: 34 }, (_, i) => ({
    cx: 560 + ((i * 197) % 760),
    cy: 120 + ((i * 131) % 760),
    r: r(0.8 + ((i * 3) % 4) * 0.45),
    o: r(0.2 + ((i * 11) % 6) * 0.1),
}));

export default function LightRibbons() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_92%)]">
            <div className="hero-ribbons absolute inset-0">
                {/* Bright knot where the strands fold */}
                <div className="absolute left-[34%] top-[47%] -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.35)_0%,rgba(167,139,250,0.12)_30%,transparent_65%)]" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
                    <defs>
                        <linearGradient id="hero-rib-a" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="1440" y2="900">
                            <stop offset="0" stopColor="#c4b5fd" />
                            <stop offset="0.5" stopColor="#a78bfa" />
                            <stop offset="1" stopColor="#38bdf8" />
                        </linearGradient>
                        <linearGradient id="hero-rib-b" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="1440" y2="900">
                            <stop offset="0" stopColor="#f5d0fe" />
                            <stop offset="0.5" stopColor="#e879f9" />
                            <stop offset="1" stopColor="#8b5cf6" />
                        </linearGradient>
                        <linearGradient id="hero-rib-c" gradientUnits="userSpaceOnUse" x1="500" y1="0" x2="1440" y2="900">
                            <stop offset="0" stopColor="#ffffff" />
                            <stop offset="0.45" stopColor="#7dd3fc" />
                            <stop offset="1" stopColor="#f472b6" />
                        </linearGradient>
                    </defs>

                    {/* Soft halo, then the crisp strands */}
                    <g opacity={0.14}>
                        {strands.map((s, i) => (
                            <path key={i} d={s.d} stroke={`url(#${s.grad})`} strokeWidth={7} />
                        ))}
                    </g>
                    {strands.map((s, i) => (
                        <path key={i} d={s.d} stroke={`url(#${s.grad})`} strokeWidth={s.width} strokeOpacity={s.opacity} />
                    ))}
                    {motes.map((m, i) => (
                        <circle key={i} cx={m.cx} cy={m.cy} r={m.r} fill="#ddd6fe" opacity={m.o} />
                    ))}
                </svg>
            </div>
        </div>
    );
}
