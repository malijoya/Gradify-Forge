import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BrainCircuit, CodeXml, Cpu, PenTool, Rocket, TabletSmartphone } from "lucide-react";
import { services } from "@/lib/site";
import PageHero from "@/components/PageHero";
import FinalCta from "@/components/home/FinalCta";
import PageStrands from "@/components/home/PageStrands";
import ProcessBento from "@/components/home/ProcessBento";
import SectionHeading from "@/components/home/SectionHeading";

export const metadata: Metadata = { title: "Services" };

const icons = { CodeXml, TabletSmartphone, BrainCircuit, Cpu, PenTool, Rocket };

export default function Services() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                kicker={`services / ${services.length} disciplines / 1 team`}
                title={
                    <>
                        Everything it takes to <em>ship.</em>
                    </>
                }
                lead="Comprehensive digital solutions tailored to your business needs, designed, built and supported by the same people."
                aside={
                    <div className="flex flex-wrap gap-2.5 lg:justify-end">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-black text-[15px] font-medium shadow-[0_0_30px_-8px_rgba(255,255,255,0.55)] hover:bg-gray-200 transition-colors"
                        >
                            Get a free estimate
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center h-11 px-5 rounded-full border border-white/15 bg-white/[0.04] text-[15px] text-white hover:bg-white/[0.09] transition-colors"
                        >
                            See our work
                        </Link>
                    </div>
                }
            />

            <div className="relative isolate">
                <PageStrands />

                <section aria-labelledby="services-list" className="mx-auto w-full max-w-[1188px] px-6 py-16">
                    <h2 id="services-list" className="sr-only">
                        Our services
                    </h2>
                    <ul className="home-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s, i) => {
                            const Icon = icons[s.icon];
                            return (
                                <li key={s.title} className="home-card group rounded-[18px] p-6 sm:p-7 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="grid place-items-center w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-violet-300 transition-colors group-hover:border-violet-300/30 group-hover:bg-violet-500/10">
                                            <Icon className="w-5 h-5" strokeWidth={1.75} />
                                        </span>
                                        <span className="font-mono text-[12px] text-gray-600">0{i + 1}</span>
                                    </div>
                                    <h3 className="mt-6 text-[18px] font-medium tracking-tight text-white">{s.title}</h3>
                                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-gray-400">{s.description}</p>
                                    <Link
                                        href="/contact"
                                        className="mt-6 inline-flex items-center gap-1.5 self-start font-mono text-[13px] text-gray-400 hover:text-white transition-colors"
                                    >
                                        get a quote <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <section aria-labelledby="included-title" className="mx-auto w-full max-w-[1188px] px-6 py-16">
                    <SectionHeading
                        id="included-title"
                        kicker="with every project"
                        title={
                            <>
                                What you get, <em>whatever</em> you build.
                            </>
                        }
                    />
                    <dl className="home-stagger mt-12 grid gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { t: "Free estimate", d: "Scope, timeline and price within 24 hours of your first message." },
                            { t: "Designs first", d: "You approve the screens before a line of code is written." },
                            { t: "Weekly demos", d: "See real progress every week, not a big reveal at the end." },
                            { t: "Support after launch", d: "Deployment, handover and help once you are live." },
                        ].map((f) => (
                            <div key={f.t} className="bg-[#09090f] p-6">
                                <dt className="text-[15px] font-medium text-white">{f.t}</dt>
                                <dd className="mt-2 text-[13px] leading-relaxed text-gray-400">{f.d}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <ProcessBento />
                <FinalCta />
            </div>
        </div>
    );
}
