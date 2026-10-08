/** The stack named across our services, drawn as a chain of tiles. */
const tools = [
    { short: "Nx", name: "next.js" },
    { short: "Re", name: "react" },
    { short: "No", name: "node.js" },
    { short: "Fl", name: "flutter" },
    { short: "RN", name: "react native" },
    { short: "Fi", name: "figma" },
    { short: "32", name: "esp32" },
    { short: "Ar", name: "arduino" },
    { short: "Pi", name: "raspberry pi" },
];

export default function ToolStrip() {
    return (
        <section aria-label="Tools we build with" className="relative mx-auto max-w-[1188px] px-6 pt-6 pb-24">
            <p className="home-reveal font-mono text-[12px] text-gray-500">
                builds with {tools.length} tools we trust, and plugs into whatever you already run
            </p>
            <ul className="home-stagger mt-6 flex flex-wrap items-start gap-y-6">
                {tools.map((t, i) => (
                    <li key={t.name} className="flex items-start">
                        <div className="flex flex-col items-center gap-2 w-[68px]">
                            <span
                                className={
                                    i === 0
                                        ? "grid place-items-center w-10 h-10 rounded-[10px] bg-gradient-to-br from-violet-400 to-fuchsia-500 text-[#06060c] font-mono text-[13px] font-semibold shadow-[0_0_24px_-4px_rgba(167,139,250,0.7)]"
                                        : "grid place-items-center w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-gray-300 font-mono text-[13px]"
                                }
                            >
                                {t.short}
                            </span>
                            <span className="font-mono text-[11px] text-gray-500 text-center leading-tight">{t.name}</span>
                        </div>
                        {i < tools.length - 1 && (
                            <span aria-hidden className="mt-5 flex items-center gap-1 w-6 sm:w-10 justify-center">
                                <span className="w-1 h-1 rounded-full bg-white/25" />
                                <span className="flex-1 border-t border-dashed border-white/15" />
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
