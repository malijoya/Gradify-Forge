import type { ReactNode } from "react";

/**
 * Header for inner pages, in the same language as the home hero: mono kicker, a heading whose
 * <em> renders in the italic serif, a short lead and optional actions or meta on the right.
 */
export default function PageHero({
    kicker,
    title,
    lead,
    aside,
}: {
    kicker: string;
    title: ReactNode;
    lead?: ReactNode;
    aside?: ReactNode;
}) {
    return (
        <section className="relative -mt-20 pt-20 overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#06060c]/80 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]" />
            <div aria-hidden className="hero-dots pointer-events-none absolute inset-0" />
            <div
                aria-hidden
                className="pointer-events-none absolute right-[-10%] top-[-30%] w-[48rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.22)_0%,rgba(192,38,211,0.07)_45%,transparent_70%)]"
            />

            <div className="relative mx-auto max-w-[1188px] px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end">
                <div>
                    <p className="hero-blur-in inline-flex items-center gap-2.5 h-8 px-3 rounded-md border border-violet-400/35 bg-violet-500/[0.04] font-mono text-[12px] sm:text-[13px] text-gray-200">
                        <span aria-hidden className="w-1.5 h-1.5 bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                        {kicker}
                    </p>
                    <h1
                        className="hero-blur-in mt-8 max-w-[760px] text-[2.6rem] sm:text-[3.5rem] lg:text-[4rem] leading-[1.04] font-semibold tracking-[-0.035em] text-white [&_em]:font-serif [&_em]:italic [&_em]:font-normal [&_em]:tracking-[-0.01em] [&_em]:text-white/85"
                        style={{ animationDelay: "0.12s" }}
                    >
                        {title}
                    </h1>
                    {lead && (
                        <p className="hero-blur-in mt-6 max-w-[520px] text-[16px] sm:text-[17px] leading-[1.55] text-gray-400" style={{ animationDelay: "0.24s" }}>
                            {lead}
                        </p>
                    )}
                </div>
                {aside && (
                    <div className="hero-blur-in" style={{ animationDelay: "0.36s" }}>
                        {aside}
                    </div>
                )}
            </div>
        </section>
    );
}
