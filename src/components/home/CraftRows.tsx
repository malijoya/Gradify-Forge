import { Check } from "lucide-react";
import { clsx } from "clsx";
import LogoMark from "@/components/LogoMark";
import SectionHeading from "./SectionHeading";
import { delay } from "./anim";

/* Three alternating rows, each a short claim beside a small product-style card. */

function BuildCard() {
    const rows = [
        { target: "web app", stack: "next.js", w: "100%" },
        { target: "ios", stack: "react native", w: "100%" },
        { target: "android", stack: "react native", w: "100%" },
        { target: "admin panel", stack: "next.js", w: "64%", live: true },
    ];
    return (
        <div className="home-card rounded-[18px] p-6 font-mono text-[12px]">
            <div className="flex items-center justify-between text-gray-500">
                <span>release 1.4</span>
                <span>4 targets / 1 plan</span>
            </div>
            <ul className="mt-6 space-y-4">
                {rows.map((r, i) => (
                    <li key={r.target} className="anim-fade grid grid-cols-[18px_96px_1fr_86px] items-center gap-3" style={delay(i * 120)}>
                        {r.live ? (
                            <span className="w-1.5 h-1.5 ml-1 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.9)]" />
                        ) : (
                            <Check className="w-3.5 h-3.5 text-violet-300" />
                        )}
                        <span className="text-gray-300 truncate">{r.target}</span>
                        <span className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <span
                                className={clsx("anim-grow-x block h-full rounded-full", r.live ? "bg-white/40" : "bg-gradient-to-r from-violet-400 to-fuchsia-400")}
                                style={delay(150 + i * 120, { width: r.w })}
                            />
                        </span>
                        <span className="text-right text-gray-500 truncate">{r.stack}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-6 pt-3 border-t border-white/[0.06] flex justify-between text-[11px] text-gray-600">
                {["plan", "design", "build", "test", "ship"].map((s) => (
                    <span key={s}>{s}</span>
                ))}
            </div>
        </div>
    );
}

function ApprovalCard() {
    return (
        <div className="home-card rounded-[18px] p-6">
            <div className="flex items-center justify-between font-mono text-[12px] text-gray-500">
                <span># client-portal</span>
                <span>today</span>
            </div>
            <div className="mt-6 flex gap-3">
                <LogoMark className="w-8 h-8" />
                <div className="min-w-0">
                    <div className="flex items-baseline gap-2 text-[13px]">
                        <span className="font-medium text-white">GradifyForge</span>
                        <span className="font-mono text-[11px] text-gray-600">10:24</span>
                    </div>
                    <p className="mt-1 text-[14px] leading-relaxed text-gray-300">
                        Dashboard designs v2 are ready. Approve them and we start the build on Monday.
                    </p>
                    <div className="anim-pop mt-3 flex flex-wrap gap-2 origin-left" style={delay(250)}>
                        <span className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white text-black text-[13px] font-medium">
                            <Check className="w-3.5 h-3.5" /> Approve
                        </span>
                        <span className="inline-flex items-center h-8 px-3 rounded-full border border-white/15 text-[13px] text-gray-300">Leave a comment</span>
                    </div>
                </div>
            </div>
            <p className="anim-fade mt-6 pt-4 border-t border-white/[0.06] font-mono text-[12px] text-gray-500" style={delay(800)}>
                <span className="text-violet-300">you</span> approved · build starts mon
            </p>
        </div>
    );
}

function WeeksCard() {
    const weeks = [28, 40, 52, 64, 78, 100];
    return (
        <div className="home-card rounded-[18px] p-6">
            <div className="flex items-center justify-between font-mono text-[12px] text-gray-500">
                <span>demos shared</span>
                <span>one every week</span>
            </div>
            <div className="mt-8 h-[150px] flex items-end justify-between gap-3 px-1">
                {weeks.map((h, i) => {
                    const last = i === weeks.length - 1;
                    return (
                        <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-3">
                            <div className="anim-grow-y relative w-full max-w-[44px]" style={delay(i * 90, { height: `calc(${h}% - 28px)` })}>
                                {/* top face */}
                                <span
                                    className={clsx(
                                        "absolute -top-[9px] left-0 right-0 h-[10px] origin-bottom [transform:skewX(-45deg)_translateX(5px)]",
                                        last ? "bg-fuchsia-300" : "bg-white/25"
                                    )}
                                />
                                {/* front face */}
                                <span
                                    className={clsx(
                                        "absolute inset-0",
                                        last ? "bg-gradient-to-b from-violet-400 to-fuchsia-600/60" : "bg-gradient-to-b from-white/15 to-white/[0.03]"
                                    )}
                                />
                            </div>
                            <span className={clsx("font-mono text-[11px]", last ? "text-violet-300" : "text-gray-600")}>w{i + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const rows = [
    {
        n: "01",
        title: "One codebase, every screen",
        text: "Web, iOS, Android and the admin panel come from one plan and ship together, so nothing drifts out of sync.",
        card: <BuildCard />,
    },
    {
        n: "02",
        title: "Approvals where you already are",
        text: "Every design and milestone waits for your yes by email or chat. Nothing gets built on a guess.",
        card: <ApprovalCard />,
    },
    {
        n: "03",
        title: "Every week is on the record",
        text: "A demo every week shows what was built, what comes next and what is blocked. No surprises at launch.",
        card: <WeeksCard />,
    },
];

export default function CraftRows() {
    return (
        <section aria-labelledby="craft-title" className="relative mx-auto max-w-[1188px] px-6 py-24">
            <SectionHeading
                id="craft-title"
                kicker="how projects run"
                title={
                    <>
                        Most of a product is <em>the in-between.</em>
                    </>
                }
                aside="Design, code and launch are easy to describe. The calls, approvals and fixes between them are where projects slip, so that is where we put the structure."
            />
            <div className="mt-20 space-y-20 md:space-y-28">
                {rows.map((r, i) => (
                    <div
                        key={r.n}
                        className={clsx(
                            "home-reveal grid gap-8 md:gap-16 items-center",
                            i % 2 === 1 ? "md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]" : "md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
                        )}
                    >
                        <div className={clsx("max-w-[340px]", i % 2 === 1 && "md:order-2 md:justify-self-end")}>
                            <span className="font-mono text-[12px] text-gray-600">{r.n}</span>
                            <h3 className="mt-3 text-[20px] font-medium tracking-tight text-white">{r.title}</h3>
                            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">{r.text}</p>
                        </div>
                        <div className={clsx(i % 2 === 1 && "md:order-1")}>{r.card}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
