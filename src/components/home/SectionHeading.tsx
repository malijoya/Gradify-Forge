import type { ReactNode } from "react";

/** Mono kicker chip, a heading (italicise a word with <em>) and an optional note on the right. */
export default function SectionHeading({ kicker, title, aside, id }: { kicker: string; title: ReactNode; aside?: ReactNode; id?: string }) {
    return (
        <div className="home-reveal grid gap-6 md:grid-cols-[1fr_minmax(0,320px)] md:items-end">
            <div>
                <span className="inline-flex items-center gap-2 h-6 px-2.5 rounded-md border border-white/10 bg-white/[0.03] font-mono text-[11px] text-gray-400">
                    <span aria-hidden className="w-1 h-1 bg-violet-400" />
                    {kicker}
                </span>
                <h2
                    id={id}
                    className="mt-5 text-[2rem] sm:text-[2.5rem] leading-[1.08] font-medium tracking-[-0.03em] text-white [&_em]:font-serif [&_em]:font-normal [&_em]:tracking-[-0.01em] [&_em]:text-white/85"
                >
                    {title}
                </h2>
            </div>
            {aside && <p className="text-[14px] leading-relaxed text-gray-500 md:pb-1.5">{aside}</p>}
        </div>
    );
}
