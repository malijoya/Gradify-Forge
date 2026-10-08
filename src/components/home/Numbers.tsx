import SectionHeading from "./SectionHeading";
import { delay } from "./anim";

/** Three figures we can stand behind, each with a small decorative trace. */
export default function Numbers({ projectCount, serviceCount }: { projectCount: number; serviceCount: number }) {
    const stats = [
        {
            value: String(projectCount),
            label: "projects live right now",
            note: "Every one is linked below, so you can click through and use it.",
            decor: (
                <svg viewBox="0 0 200 40" className="w-full h-10" preserveAspectRatio="none" fill="none">
                    <path d="M0 34 L30 30 L55 32 L80 24 L105 26 L130 16 L155 18 L180 8 L200 6" pathLength={1} className="anim-draw" stroke="#a78bfa" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>
            ),
        },
        {
            value: String(serviceCount),
            label: "services under one roof",
            note: "Design, web, mobile, AI, IoT and launch, without juggling agencies.",
            decor: (
                <div className="flex gap-1 h-10 items-end">
                    {Array.from({ length: serviceCount }, (_, i) => (
                        <span key={i} className="anim-grow-y flex-1 rounded-sm bg-gradient-to-t from-violet-500 to-fuchsia-400" style={delay(200 + i * 70, { height: `${40 + i * (60 / Math.max(1, serviceCount - 1))}%` })} />
                    ))}
                </div>
            ),
        },
        {
            value: "24 h",
            label: "to a free estimate",
            note: "Tell us what you are building and get a scope and timeline within a day.",
            decor: (
                <div className="h-10 flex items-center">
                    <span className="relative w-full h-1 rounded-full bg-white/[0.07]">
                        <span className="anim-grow-x absolute inset-y-0 left-0 w-[86%] rounded-full bg-gradient-to-r from-violet-400 to-pink-400" style={delay(400)} />
                    </span>
                </div>
            ),
        },
    ];

    return (
        <section aria-labelledby="numbers-title" className="relative mx-auto max-w-[1188px] px-6 py-24">
            <SectionHeading
                id="numbers-title"
                kicker="in numbers"
                title={
                    <>
                        Numbers we can <em>actually</em> back up.
                    </>
                }
                aside="No inflated client counts or vanity metrics. These come straight from the work on this site."
            />
            <dl className="home-stagger mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-4 border-t border-white/[0.08] pt-6">
                        <dt className="font-mono text-[12px] text-gray-500">{s.label}</dt>
                        <dd className="text-[3.25rem] leading-none font-medium tracking-[-0.04em] text-white">{s.value}</dd>
                        <div aria-hidden>{s.decor}</div>
                        <p className="text-[13px] leading-relaxed text-gray-400">{s.note}</p>
                    </div>
                ))}
            </dl>
        </section>
    );
}
