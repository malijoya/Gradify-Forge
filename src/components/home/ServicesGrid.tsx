import Link from "next/link";
import { ArrowUpRight, BrainCircuit, ChevronsRight, CodeXml, Cpu, PenTool, Rocket, TabletSmartphone } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { delay } from "./anim";

const icons = { CodeXml, TabletSmartphone, BrainCircuit, Cpu, PenTool, Rocket };

/** Web: one hub connected to the stack around it. */
function HubDiagram() {
    const nodes = [
        { label: "next.js", x: 14, y: 22 },
        { label: "react", x: 86, y: 22 },
        { label: "node.js", x: 14, y: 78 },
        { label: "your api", x: 86, y: 78 },
    ];
    return (
        <div className="relative h-[190px] font-mono text-[11px]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                {nodes.map((n) => (
                    <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(167,139,250,0.45)" strokeWidth="0.4" strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
                ))}
            </svg>
            {nodes.map((n, i) => (
                <span
                    key={n.label}
                    className="anim-pop absolute -translate-x-1/2 -translate-y-1/2 h-7 px-2.5 grid place-items-center rounded-md border border-white/10 bg-[#0d0d14] text-gray-400"
                    style={delay(250 + i * 90, { left: `${n.x}%`, top: `${n.y}%` })}
                >
                    {n.label}
                </span>
            ))}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 anim-pop grid place-items-center w-14 h-14 rounded-[14px] bg-gradient-to-br from-violet-400 to-fuchsia-500 text-[#0b0b14] shadow-[0_0_40px_-6px_rgba(167,139,250,0.8)]">
                <ChevronsRight className="w-7 h-7" strokeWidth={2.5} />
            </span>
        </div>
    );
}

/** AI: data in, model in the middle, feature out. */
function ModelFlow() {
    const steps = ["your data", "model", "your product"];
    return (
        <div className="h-[190px] flex flex-col justify-center gap-5 font-mono text-[11px]">
            <div className="flex items-center">
                {steps.map((s, i) => (
                    <div key={s} className="anim-pop flex items-center flex-1 last:flex-none" style={delay(150 + i * 150)}>
                        <span
                            className={
                                i === 1
                                    ? "h-9 px-3 grid place-items-center rounded-md border border-violet-300/30 bg-violet-500/10 text-violet-200 shadow-[0_0_24px_-6px_rgba(167,139,250,0.6)]"
                                    : "h-9 px-3 grid place-items-center rounded-md border border-white/10 bg-[#0d0d14] text-gray-400"
                            }
                        >
                            {s}
                        </span>
                        {i < steps.length - 1 && <span className="flex-1 mx-2 border-t border-dashed border-white/20" />}
                    </div>
                ))}
            </div>
            <div className="anim-fade flex flex-wrap gap-2" style={delay(650)}>
                {["chatbots", "computer vision", "nlp", "predictions"].map((c) => (
                    <span key={c} className="h-6 px-2 grid place-items-center rounded border border-white/10 text-gray-500">
                        {c}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function ServicesGrid() {
    const [web, mobile, ai, ...rest] = services;
    const featured = [
        { s: web, visual: <HubDiagram /> },
        { s: ai, visual: <ModelFlow /> },
    ];
    const small = [mobile, ...rest];

    return (
        <section aria-labelledby="services-title" className="relative mx-auto max-w-[1188px] px-6 py-24">
            <SectionHeading
                id="services-title"
                kicker="what we do"
                title={
                    <>
                        Built <em>properly,</em> in the ways that matter.
                    </>
                }
                aside="End-to-end product development under one roof, from the first wireframe to support after launch."
            />

            <div className="home-stagger mt-14 grid gap-4 md:grid-cols-2">
                {featured.map(({ s, visual }) => (
                    <article key={s.title} className="home-card rounded-[18px] p-6 sm:p-7">
                        <h3 className="text-[17px] font-medium text-white">{s.title}</h3>
                        <p className="mt-2 max-w-[420px] text-[14px] leading-relaxed text-gray-400">{s.description}</p>
                        <div className="mt-6">{visual}</div>
                    </article>
                ))}
            </div>

            <div className="home-stagger mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {small.map((s) => {
                    const Icon = icons[s.icon];
                    return (
                        <article key={s.title} className="home-card rounded-[18px] p-6">
                            <span className="grid place-items-center w-9 h-9 rounded-[10px] border border-white/10 bg-white/[0.03] text-violet-300">
                                <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                            </span>
                            <h3 className="mt-5 text-[15px] font-medium text-white">{s.title}</h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-gray-400">{s.description}</p>
                        </article>
                    );
                })}
            </div>

            <Link href="/services" className="home-reveal group mt-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-gray-400 hover:text-white transition-colors">
                all services <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
        </section>
    );
}
