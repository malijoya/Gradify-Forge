import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { listProjects } from "@/lib/db";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import FinalCta from "@/components/home/FinalCta";
import PageStrands from "@/components/home/PageStrands";

export const metadata: Metadata = { title: "Portfolio" };

export default async function Portfolio() {
    const projects = await listProjects({ publishedOnly: true });
    const categories = new Set(projects.map((p) => p.category)).size;

    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                kicker={`portfolio / ${projects.length} live project${projects.length === 1 ? "" : "s"}`}
                title={
                    <>
                        Work that <em>shipped.</em>
                    </>
                }
                lead="Real products we've shipped for our clients. Click any project to see it live."
                aside={
                    projects.length > 0 && (
                        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-white/[0.08] bg-white/[0.06] font-mono">
                            <div className="bg-[#09090f] p-4">
                                <dt className="text-[11px] text-gray-500">projects live</dt>
                                <dd className="mt-1 font-sans text-[28px] font-medium tracking-tight text-white">{projects.length}</dd>
                            </div>
                            <div className="bg-[#09090f] p-4">
                                <dt className="text-[11px] text-gray-500">categories</dt>
                                <dd className="mt-1 font-sans text-[28px] font-medium tracking-tight text-white">{categories}</dd>
                            </div>
                        </dl>
                    )
                }
            />

            <div className="relative isolate">
                <PageStrands />
                <section aria-label="Projects" className="mx-auto w-full max-w-[1188px] px-6 py-12">
                    {projects.length > 0 ? (
                        <PortfolioGrid projects={projects} />
                    ) : (
                        <div className="home-card rounded-[18px] p-12 text-center max-w-xl mx-auto">
                            <span className="mx-auto grid place-items-center w-12 h-12 rounded-[12px] border border-white/10 bg-white/[0.03] text-violet-300">
                                <Layers className="w-6 h-6" />
                            </span>
                            <h2 className="mt-5 text-[20px] font-medium text-white">New projects coming soon</h2>
                            <p className="mt-2 text-[14px] text-gray-400">
                                We&apos;re putting together our latest work. In the meantime, let&apos;s talk about yours.
                            </p>
                            <Link
                                href="/contact"
                                className="group mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-black text-[15px] font-medium hover:bg-gray-200 transition-colors"
                            >
                                Contact us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    )}
                </section>
                <FinalCta />
            </div>
        </div>
    );
}
