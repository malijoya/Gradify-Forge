import Link from "next/link";
import { ArrowRight, ChevronsRight, Mail } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";

/** Closing pair of cards: who we are on the left, the ask on the right. */
export default function FinalCta() {
    return (
        <section aria-labelledby="cta-title" className="relative mx-auto max-w-[1188px] px-6 pt-16 pb-28">
            <div className="home-stagger grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
                <div className="home-card relative overflow-hidden rounded-[22px] p-7 sm:p-8 flex flex-col justify-between min-h-[300px]">
                    <ChevronsRight aria-hidden className="absolute -right-10 top-1/2 -translate-y-1/2 w-72 h-72 text-white/[0.035]" strokeWidth={1.5} />
                    <div className="relative flex items-center gap-2.5">
                        <LogoMark className="w-8 h-8" />
                        <span className="font-medium tracking-tight text-white">{site.name}</span>
                    </div>
                    <div className="relative">
                        <p className="max-w-[300px] text-[15px] leading-relaxed text-gray-400">{site.tagline}</p>
                        <a href={`mailto:${site.email}`} className="mt-5 inline-flex items-center gap-2 font-mono text-[13px] text-gray-300 hover:text-white transition-colors">
                            <Mail className="w-3.5 h-3.5" /> {site.email}
                        </a>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-7 sm:p-10">
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1.4px)] [background-size:24px_24px]"
                    />
                    <div className="relative">
                        <p className="font-mono text-[12px] text-white/75">what&apos;s next</p>
                        <h2 id="cta-title" className="mt-4 text-[2rem] sm:text-[2.6rem] leading-[1.06] font-medium tracking-[-0.035em] text-white">
                            Tell us the idea you <span className="font-serif italic font-normal tracking-[-0.01em]">can&apos;t</span> stop thinking about.
                        </h2>
                        <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-white/80">
                            Share what you are building and get ideas, a timeline and a free estimate within 24 hours.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2.5">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#0b0b14] text-white text-[15px] font-medium hover:bg-black transition-colors"
                            >
                                Get a free consultation
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link href="/portfolio" className="inline-flex items-center h-11 px-5 rounded-full border border-white/40 text-white text-[15px] hover:bg-white/10 transition-colors">
                                See our work
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
