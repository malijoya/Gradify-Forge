import { ChevronsRight } from "lucide-react";

/** Full-width accent band with the studio's one-line philosophy. Scales up as it scrolls in (.home-band). */
export default function QuoteBand() {
    return (
        <section aria-label="What we believe" className="px-3 sm:px-6 py-16">
            <div className="home-band relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 px-6 py-24 sm:py-32 text-center">
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1.4px)] [background-size:26px_26px]"
                />
                <div className="home-reveal relative mx-auto max-w-[760px]">
                    <p className="font-mono text-[12px] text-white/70">what we build for</p>
                    <p className="mt-6 text-[2rem] sm:text-[3.25rem] leading-[1.06] font-medium tracking-[-0.035em] text-white">
                        The best software is the kind your team <span className="font-serif italic font-normal tracking-[-0.01em]">never</span> has
                        to think about.
                    </p>
                    <span className="mt-10 inline-grid place-items-center w-12 h-12 rounded-[14px] bg-[#0b0b14] text-violet-300 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
                        <ChevronsRight className="w-6 h-6" strokeWidth={2.5} />
                    </span>
                </div>
            </div>
        </section>
    );
}
