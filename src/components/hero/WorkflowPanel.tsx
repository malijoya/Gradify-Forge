import { MousePointer2, Plus, Redo2 } from "lucide-react";
import { clsx } from "clsx";

/*
 * A project pipeline drawn as a workflow-builder canvas. Laid out on a fixed 600×555 grid
 * (nodes may hang off the left edge) and scaled by the parent per breakpoint.
 */

type Node = { x: number; y: number; w: number; title: string; sub: string; active?: boolean; delay: number };

const nodes: Node[] = [
    { x: -97, y: 226, w: 168, title: "Brief received", sub: "contact form", delay: 0.9 },
    { x: 140, y: 156, w: 184, title: "Scope is clear", sub: "condition", active: true, delay: 1.05 },
    { x: 141, y: 298, w: 183, title: "Discovery call", sub: "30 min, free", delay: 1.15 },
    { x: 396, y: 228, w: 166, title: "Design & build", sub: "weekly demos", delay: 1.3 },
];

const NODE_H = 66;

// Connector curves between node ports, in panel coordinates.
const live = ["M71 259 C106 259 106 189 140 189", "M324 189 C362 189 360 262 396 262"];
const idle = ["M71 259 C106 259 106 331 141 331", "M324 331 C362 331 360 262 396 262"];

const updates = [
    { time: "09:41:02", label: "design review approved", took: "2 d", live: true },
    { time: "14:08:57", label: "build deployed to staging", took: "4 min" },
    { time: "16:30:14", label: "weekly demo shared", took: "30 min" },
];

function Port({ x, y }: { x: number; y: number }) {
    return <span className="absolute w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full bg-white/70" style={{ left: x, top: y }} />;
}

export default function WorkflowPanel() {
    return (
        <div aria-hidden className="relative w-[600px] h-[555px] select-none" style={{ transformStyle: "preserve-3d" }}>
            {/* Panel body with an accent-tinted top-left edge */}
            <div className="absolute inset-0 rounded-[22px] p-px bg-gradient-to-br from-violet-400/45 via-white/10 to-white/[0.04] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                <div className="h-full w-full rounded-[21px] bg-[linear-gradient(160deg,#121219_0%,#0b0b11_55%,#09090e_100%)]" />
            </div>

            {/* Header */}
            <div className="absolute inset-x-0 top-0 h-[82px] flex items-center justify-between px-[34px] border-b border-white/[0.07]">
                <div className="flex items-center gap-4 text-[15px]">
                    <span className="text-gray-400">Client portal MVP</span>
                    <span className="h-4 w-px bg-white/15" />
                    <span className="font-mono text-[13px] text-gray-300">4 steps / 1 branch</span>
                </div>
                <span className="font-mono text-[13px] text-violet-300">in progress</span>
            </div>

            {/* Toolbar */}
            <div className="absolute left-[36px] top-[103px] flex flex-col gap-[9px]">
                {[MousePointer2, Plus, Redo2].map((Icon, i) => (
                    <span
                        key={i}
                        className={clsx(
                            "grid place-items-center w-[30px] h-[30px] rounded-md border",
                            i === 0 ? "border-white/20 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.03] text-gray-400"
                        )}
                    >
                        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                ))}
            </div>

            {/* Zoom */}
            <span className="absolute right-[34px] top-[100px] h-7 px-2.5 grid place-items-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-[12px] text-gray-400">
                100%
            </span>

            {/* Connectors */}
            <svg className="absolute top-0 -left-[100px] w-[760px] h-[555px] overflow-visible" viewBox="-100 0 760 555" fill="none">
                <defs>
                    <linearGradient id="hero-live" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#e879f9" />
                    </linearGradient>
                </defs>
                {idle.map((d, i) => (
                    <path key={d} d={d} pathLength={1} stroke="rgba(255,255,255,0.22)" strokeWidth={1.4} className="hero-draw" style={{ animationDelay: `${1.5 + i * 0.25}s` }} />
                ))}
                {live.map((d, i) => (
                    <g key={d}>
                        <path d={d} stroke="url(#hero-live)" strokeOpacity={0.35} strokeWidth={6} className="hero-draw blur-[3px]" pathLength={1} style={{ animationDelay: `${1.45 + i * 0.25}s` }} />
                        <path d={d} stroke="url(#hero-live)" strokeWidth={1.6} className="hero-draw" pathLength={1} style={{ animationDelay: `${1.45 + i * 0.25}s` }} />
                    </g>
                ))}
            </svg>

            {/* Signal travelling along the live branch */}
            <span className="hero-travel absolute -left-1 -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(192,132,252,0.9)]" />

            {/* Branch labels */}
            {[
                { label: "true", y: 200 },
                { label: "else", y: 290 },
            ].map((b) => (
                <span
                    key={b.label}
                    className="hero-pop absolute left-[84px] h-[22px] px-1.5 grid place-items-center rounded border border-white/10 bg-[#0d0d13] font-mono text-[12px] text-gray-400"
                    style={{ top: b.y, animationDelay: "1.6s" }}
                >
                    {b.label}
                </span>
            ))}

            {/* Nodes */}
            {nodes.map((n) => (
                <div
                    key={n.title}
                    className="hero-pop absolute"
                    style={{ left: n.x, top: n.y, width: n.w, height: NODE_H, animationDelay: `${n.delay}s` }}
                >
                    <div
                        className={clsx(
                            "h-full rounded-[11px] border px-4 flex flex-col justify-center gap-1 bg-[#131319]/95",
                            n.active
                                ? "border-violet-300/25 shadow-[0_0_34px_-6px_rgba(167,139,250,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
                                : "border-white/10 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]"
                        )}
                    >
                        <span className="text-[15px] font-medium text-white/90 leading-none">{n.title}</span>
                        <span className="font-mono text-[13px] text-gray-500 leading-none mt-1">{n.sub}</span>
                    </div>
                </div>
            ))}
            <Port x={71} y={259} />
            <Port x={140} y={189} />
            <Port x={324} y={189} />
            <Port x={141} y={331} />
            <Port x={324} y={331} />
            <Port x={396} y={262} />

            {/* Estimate chip */}
            <span
                className="hero-pop absolute left-[396px] top-[305px] h-6 px-2.5 flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] font-mono text-[12px] text-gray-400"
                style={{ animationDelay: "1.9s" }}
            >
                <span className="w-1 h-1 rounded-full bg-gray-400" /> 24 h estimate
            </span>

            {/* Recent updates */}
            <div className="absolute left-[34px] right-[34px] top-[395px] border-t border-white/[0.07] pt-[18px] font-mono text-[13px]">
                <div className="text-gray-500 mb-3">recent updates</div>
                <ul className="space-y-[9px]">
                    {updates.map((u, i) => (
                        <li key={u.time} className="hero-pop flex items-center gap-3" style={{ animationDelay: `${2.2 + i * 0.35}s` }}>
                            <span className={clsx("w-[5px] h-[5px] rounded-full", u.live ? "bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.9)]" : "bg-gray-600")} />
                            <span className="text-gray-500">{u.time}</span>
                            <span className="text-gray-300 truncate">{u.label}</span>
                            <span className="ml-auto text-gray-500">{u.took}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
